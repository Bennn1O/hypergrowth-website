import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import {
  buildWebhookAnswers,
  getFormDefinition,
  sanitizeAnswers,
  validateAnswers,
  type ClientFormKind,
  type FormAnswers,
} from "@/lib/client-forms";
import { cockpitWrite } from "@/lib/cockpit-forms";
import { resolveFormRequest } from "@/lib/form-session";

export const runtime = "nodejs";

const FORM_SOURCE = "immersion_questionnaire";
const MAX_DECK_SIZE = 10 * 1024 * 1024;
const ALLOWED_DECK_EXTENSIONS = new Set(["key", "pdf", "ppt", "pptx"]);

function hasValidDeckSignature(bytes: Uint8Array, extension: string) {
  const startsWith = (signature: number[]) =>
    signature.every((byte, index) => bytes[index] === byte);
  if (extension === "pdf") return startsWith([0x25, 0x50, 0x44, 0x46, 0x2d]);
  if (extension === "pptx" || extension === "key")
    return startsWith([0x50, 0x4b, 0x03, 0x04]);
  return startsWith([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
}

function badRequest(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

async function relayImmersionToN8n(
  token: string,
  answers: FormAnswers,
  deck: File | null,
  submissionId: string,
) {
  const webhookUrl = process.env.IMMERSION_QUESTIONNAIRE_WEBHOOK_URL;
  const webhookSecret = process.env.IMMERSION_QUESTIONNAIRE_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) return "unconfigured" as const;

  const definition = getFormDefinition("immersion");
  const formData = new FormData();
  formData.set(
    "payload",
    JSON.stringify({
      accessToken: token,
      answers: buildWebhookAnswers(definition, answers),
      deck: deck ? { name: deck.name, size: deck.size, type: deck.type } : null,
      event: "immersion_questionnaire.completed",
      form: {
        id: definition.id,
        name: definition.title,
        source: FORM_SOURCE,
        version: 1,
      },
      formsSource: FORM_SOURCE,
      submissionId,
      submittedAt: new Date().toISOString(),
    }),
  );
  if (deck) formData.set("deck", deck, deck.name);

  const upstream = await fetch(webhookUrl, {
    body: formData,
    headers: { Authorization: `Bearer ${webhookSecret}` },
    method: "POST",
  });
  if (!upstream.ok) {
    throw new Error(`Webhook immersion en erreur (${upstream.status}).`);
  }
  return "ok" as const;
}

async function readDeck(
  formData: FormData,
): Promise<File | NextResponse | null> {
  const deck = formData.get("deck");
  if (!(deck instanceof File) || deck.size === 0) return null;
  if (deck.size > MAX_DECK_SIZE) {
    return badRequest(
      "Le deck dépasse 10 Mo. Choisis un fichier plus léger.",
      413,
    );
  }
  const extension = deck.name.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_DECK_EXTENSIONS.has(extension)) {
    return badRequest("Ajoute un fichier PDF, PowerPoint ou Keynote.", 422);
  }
  const bytes = new Uint8Array(await deck.slice(0, 8).arrayBuffer());
  if (!hasValidDeckSignature(bytes, extension)) {
    return badRequest(
      "Le fichier ne correspond pas à un PDF, PowerPoint ou Keynote valide.",
      422,
    );
  }
  return deck;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ kind: string }> },
) {
  const resolved = await resolveFormRequest(request, params);
  if ("response" in resolved) return resolved.response;
  const { kind, token } = resolved;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return badRequest("Corps invalide.");
  }

  let rawAnswers: unknown;
  try {
    rawAnswers = JSON.parse(String(formData.get("payload") || "{}")).answers;
  } catch {
    return badRequest("Réponses illisibles.");
  }

  const definition = getFormDefinition(kind);
  const answers = sanitizeAnswers(definition, rawAnswers);
  const invalid = validateAnswers(definition, answers);
  if (invalid) return badRequest(invalid.message);

  const deckResult = kind === "immersion" ? await readDeck(formData) : null;
  if (deckResult instanceof NextResponse) return deckResult;

  const submissionId = randomUUID();

  if (kind === "immersion") {
    try {
      const relayed = await relayImmersionToN8n(
        token,
        answers,
        deckResult,
        submissionId,
      );
      if (relayed === "unconfigured") {
        return badRequest("Service indisponible pour le moment.", 503);
      }
    } catch (error) {
      console.error("[forms/submit] relais n8n", error);
      return badRequest(
        "L’envoi n’a pas abouti. Réessaie dans un instant.",
        502,
      );
    }
  }

  const alreadySubmitted = await submitToCockpit(kind, token, answers);
  if (alreadySubmitted === "conflict") {
    return NextResponse.json(
      { error: "Formulaire déjà envoyé." },
      { status: 409 },
    );
  }
  if (alreadySubmitted === "failed" && kind === "onboarding") {
    return badRequest(
      "L’enregistrement n’a pas abouti. Réessaie dans un instant.",
      502,
    );
  }

  return NextResponse.json({ ok: true, submissionId });
}

// Pour l'onboarding, Cockpit est la destination ; pour l'immersion, n8n a
// déjà tout reçu et Cockpit sert seulement à marquer le formulaire envoyé.
async function submitToCockpit(
  kind: ClientFormKind,
  token: string,
  answers: FormAnswers,
): Promise<"conflict" | "failed" | "ok"> {
  try {
    const upstream = await cockpitWrite(kind, "submit", token, { answers });
    if (!upstream) return "failed";
    if (upstream.status === 409) return "conflict";
    if (!upstream.ok) {
      console.error("[forms/submit] Cockpit", upstream.status);
      return "failed";
    }
    return "ok";
  } catch (error) {
    console.error("[forms/submit] Cockpit injoignable", error);
    return "failed";
  }
}
