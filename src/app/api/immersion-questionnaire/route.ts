import { NextResponse } from "next/server";

import {
  buildImmersionWebhookAnswers,
  IMMERSION_FORM_ID,
  IMMERSION_FORM_TITLE,
  IMMERSION_SESSION_COOKIE,
  isValidImmersionAccessToken,
  sanitizeImmersionAnswers,
} from "@/lib/immersion-questionnaire";

export const runtime = "nodejs";

const ALLOWED_DECK_EXTENSIONS = new Set(["key", "pdf", "ppt", "pptx"]);
const ALLOWED_DECK_MIME_TYPES = new Set([
  "application/octet-stream",
  "application/pdf",
  "application/vnd.apple.keynote",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);
const FORM_SOURCE = "immersion_questionnaire";
const MAX_DECK_SIZE = 10 * 1024 * 1024;
const MAX_PAYLOAD_SIZE = 100_000;
const MAX_REQUEST_SIZE = MAX_DECK_SIZE + MAX_PAYLOAD_SIZE + 50_000;

interface ImmersionRequestPayload {
  answers?: unknown;
  submissionId?: unknown;
}

function getFileExtension(fileName: string): string {
  return fileName.split(".").at(-1)?.toLowerCase() || "";
}

function isValidSubmissionId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}

function getCookieValue(request: Request, name: string): string {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (!match) return "";
  return decodeURIComponent(match.slice(name.length + 1));
}

async function hasValidDeckSignature(
  deck: File,
  extension: string,
): Promise<boolean> {
  const bytes = new Uint8Array(await deck.slice(0, 8).arrayBuffer());
  const isPdf =
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d;
  const isZip =
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    bytes[2] === 0x03 &&
    bytes[3] === 0x04;
  const isOle =
    bytes[0] === 0xd0 &&
    bytes[1] === 0xcf &&
    bytes[2] === 0x11 &&
    bytes[3] === 0xe0 &&
    bytes[4] === 0xa1 &&
    bytes[5] === 0xb1 &&
    bytes[6] === 0x1a &&
    bytes[7] === 0xe1;

  if (extension === "pdf") return isPdf;
  if (extension === "ppt") return isOle;
  return isZip;
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { error: "Requête trop volumineuse." },
        { status: 413 },
      );
    }

    const requestData = await request.formData();
    const rawPayload = requestData.get("payload");

    if (typeof rawPayload !== "string") {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
    }

    if (new TextEncoder().encode(rawPayload).byteLength > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        { error: "Requête trop volumineuse." },
        { status: 413 },
      );
    }

    let body: ImmersionRequestPayload;
    try {
      body = JSON.parse(rawPayload) as ImmersionRequestPayload;
    } catch {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
    }

    const accessToken = getCookieValue(request, IMMERSION_SESSION_COOKIE);
    if (!isValidImmersionAccessToken(accessToken)) {
      return NextResponse.json(
        {
          error:
            "Ce lien n’est plus valide. Demande un nouveau lien à l’équipe HyperGrowth.",
        },
        { status: 401 },
      );
    }

    if (!isValidSubmissionId(body.submissionId)) {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
    }

    const rawDeck = requestData.get("deck");
    const deck = rawDeck instanceof File && rawDeck.size > 0 ? rawDeck : null;

    if (deck) {
      if (deck.size > MAX_DECK_SIZE) {
        return NextResponse.json(
          { error: "Le deck dépasse la taille maximale de 10 Mo." },
          { status: 413 },
        );
      }

      const extension = getFileExtension(deck.name);
      if (!ALLOWED_DECK_EXTENSIONS.has(extension)) {
        return NextResponse.json(
          { error: "Le deck doit être un fichier PDF, PowerPoint ou Keynote." },
          { status: 422 },
        );
      }

      if (deck.type && !ALLOWED_DECK_MIME_TYPES.has(deck.type.toLowerCase())) {
        return NextResponse.json(
          { error: "Le type du fichier transmis n’est pas accepté." },
          { status: 422 },
        );
      }

      if (!(await hasValidDeckSignature(deck, extension))) {
        return NextResponse.json(
          { error: "Le contenu du fichier transmis n’est pas valide." },
          { status: 422 },
        );
      }
    }

    const webhookUrl = process.env.IMMERSION_QUESTIONNAIRE_WEBHOOK_URL;
    const webhookSecret = process.env.IMMERSION_QUESTIONNAIRE_WEBHOOK_SECRET;
    if (!webhookUrl || !webhookSecret) {
      console.error("Immersion questionnaire webhook is not configured");
      return NextResponse.json(
        {
          error:
            "L’enregistrement est temporairement indisponible. Réessaie dans un instant.",
        },
        { status: 503 },
      );
    }

    const answers = sanitizeImmersionAnswers(body.answers);
    const submittedAt = new Date().toISOString();
    const submission = {
      accessToken,
      answers: buildImmersionWebhookAnswers(answers),
      deck: deck
        ? {
            name: deck.name,
            size: deck.size,
            type: deck.type,
          }
        : null,
      event: "immersion_questionnaire.completed",
      form: {
        id: IMMERSION_FORM_ID,
        name: IMMERSION_FORM_TITLE,
        source: FORM_SOURCE,
        version: 1,
      },
      formsSource: FORM_SOURCE,
      submissionId: body.submissionId,
      submittedAt,
    };
    const webhookData = new FormData();
    webhookData.set("payload", JSON.stringify(submission));
    if (deck) webhookData.set("deck", deck);

    const webhookResponse = await fetch(webhookUrl, {
      body: webhookData,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${webhookSecret}`,
      },
      method: "POST",
      signal: AbortSignal.timeout(15_000),
    });

    if (!webhookResponse.ok) {
      if ([401, 404, 410].includes(webhookResponse.status)) {
        return NextResponse.json(
          {
            error:
              "Ce lien n’est plus valide. Demande un nouveau lien à l’équipe HyperGrowth.",
          },
          { status: webhookResponse.status },
        );
      }

      console.error(
        `Immersion questionnaire webhook failed with status ${webhookResponse.status}`,
      );
      return NextResponse.json(
        {
          error:
            "Tes réponses n’ont pas pu être enregistrées. Réessaie dans un instant.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, submittedAt });
  } catch (error) {
    console.error("Immersion questionnaire submission failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      {
        error:
          "Tes réponses n’ont pas pu être enregistrées. Réessaie dans un instant.",
      },
      { status: 502 },
    );
  }
}
