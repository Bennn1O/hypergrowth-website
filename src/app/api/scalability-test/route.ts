import { NextResponse } from "next/server";

import {
  buildWebhookAnswers,
  getScalabilityResult,
  sanitizeAnswers,
  SCALABILITY_CONTACT_REFS,
  SCALABILITY_FORM_ID,
  validateSubmission,
} from "@/lib/scalability-test";

export const runtime = "nodejs";

const DEFAULT_WEBHOOK_URL =
  "https://n8nfastscribe.convertlabs.fr/webhook/f8aada19-fa30-401d-bebb-f21bd7e48e28";
const MAX_BODY_SIZE = 100_000;
const FORM_SOURCE = "scalability_test";

function getContactValue(
  entries: ReturnType<typeof buildWebhookAnswers>,
  fieldRef: string,
  useLabel = false,
): string {
  const entry = entries.find((answer) => answer.fieldRef === fieldRef);
  if (!entry) return "";
  return useLabel ? entry.label : String(entry.value);
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "Requête trop volumineuse." },
        { status: 413 },
      );
    }

    let body: { answers?: unknown; website?: unknown };
    try {
      body = JSON.parse(rawBody) as typeof body;
    } catch {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
    }
    const answers = sanitizeAnswers(body.answers);
    const result = getScalabilityResult(answers);

    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ ok: true, result });
    }

    const errors = validateSubmission(answers);
    if (errors.length) {
      return NextResponse.json(
        {
          error: "Certaines réponses sont manquantes ou invalides.",
          fields: errors.map(({ field, message }) => ({
            fieldRef: field.ref,
            message,
          })),
        },
        { status: 422 },
      );
    }

    const entries = buildWebhookAnswers(answers);
    const webhookUrl =
      process.env.SCALABILITY_TEST_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
    const payload = {
      answers: entries,
      contact: {
        annualRevenue: getContactValue(
          entries,
          SCALABILITY_CONTACT_REFS.annualRevenue,
          true,
        ),
        company: getContactValue(entries, SCALABILITY_CONTACT_REFS.company),
        email: getContactValue(entries, SCALABILITY_CONTACT_REFS.email),
        firstName: getContactValue(entries, SCALABILITY_CONTACT_REFS.firstName),
        phone: getContactValue(entries, SCALABILITY_CONTACT_REFS.phone),
      },
      event: "scalability_test.completed",
      form: {
        id: SCALABILITY_FORM_ID,
        name: "Calcule ton potentiel de croissance",
        source: FORM_SOURCE,
        version: 1,
      },
      formsSource: FORM_SOURCE,
      result,
      score: result.score,
      submittedAt: new Date().toISOString(),
    };

    const webhookResponse = await fetch(webhookUrl, {
      body: JSON.stringify(payload),
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      signal: AbortSignal.timeout(15_000),
    });

    if (!webhookResponse.ok) {
      console.error(
        `Scalability webhook failed with status ${webhookResponse.status}`,
      );
      return NextResponse.json(
        {
          error:
            "Le résultat n'a pas pu être enregistré. Réessaie dans un instant.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Scalability form submission failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      {
        error:
          "Le résultat n'a pas pu être enregistré. Réessaie dans un instant.",
      },
      { status: 502 },
    );
  }
}
