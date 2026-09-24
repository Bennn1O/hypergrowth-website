import { NextResponse } from "next/server";

import {
  getFormDefinition,
  parseServerDraft,
  sanitizeAnswers,
} from "@/lib/client-forms";
import { cockpitGetDraft, cockpitWrite } from "@/lib/cockpit-forms";
import { resolveFormRequest } from "@/lib/form-session";

export const runtime = "nodejs";

type Params = { params: Promise<{ kind: string }> };

const noStore = { headers: { "Cache-Control": "no-store" } };

// Lecture du brouillon : Cockpit est la source de vérité. Sans Cockpit
// configuré ou injoignable, on répond `draft: null`, la page se rabat sur
// le brouillon local du navigateur.
export async function GET(request: Request, { params }: Params) {
  const resolved = await resolveFormRequest(request, params);
  if ("response" in resolved) return resolved.response;

  try {
    const upstream = await cockpitGetDraft(resolved.kind, resolved.token);
    if (!upstream) return NextResponse.json({ draft: null }, noStore);
    if (upstream.status === 404 || upstream.status === 400) {
      return NextResponse.json(
        { error: "Ce lien ne correspond à aucun dossier." },
        { status: 404 },
      );
    }
    if (!upstream.ok) return NextResponse.json({ draft: null }, noStore);

    const payload = (await upstream.json()) as { draft?: unknown };
    return NextResponse.json(
      { draft: parseServerDraft(payload.draft) },
      noStore,
    );
  } catch (error) {
    console.error("[forms/draft] lecture impossible", error);
    return NextResponse.json({ draft: null }, noStore);
  }
}

export async function PUT(request: Request, { params }: Params) {
  const resolved = await resolveFormRequest(request, params);
  if ("response" in resolved) return resolved.response;

  let body: { answers?: unknown; currentRef?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps invalide." }, { status: 400 });
  }

  const definition = getFormDefinition(resolved.kind);
  const answers = sanitizeAnswers(definition, body.answers);
  const currentRef =
    typeof body.currentRef === "string" ? body.currentRef : null;

  try {
    const upstream = await cockpitWrite(
      resolved.kind,
      "draft",
      resolved.token,
      {
        answers,
        currentRef,
      },
    );
    if (!upstream) return NextResponse.json({ saved: false }, noStore);
    if (upstream.status === 409) {
      const payload = (await upstream.json()) as { submittedAt?: string };
      return NextResponse.json(
        { error: "Formulaire déjà envoyé.", submittedAt: payload.submittedAt },
        { status: 409 },
      );
    }
    return NextResponse.json({ saved: upstream.ok }, noStore);
  } catch (error) {
    console.error("[forms/draft] sauvegarde impossible", error);
    return NextResponse.json({ saved: false }, noStore);
  }
}
