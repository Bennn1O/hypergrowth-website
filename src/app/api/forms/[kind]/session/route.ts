import { NextResponse } from "next/server";

import {
  getSessionCookieName,
  isClientFormKind,
  isValidAccessToken,
} from "@/lib/client-forms";
import { INVALID_LINK_MESSAGE, SESSION_MAX_AGE } from "@/lib/form-session";

export const runtime = "nodejs";

// Pose le token du lien en cookie HttpOnly. Rejouable : rouvrir le lien
// prolonge simplement la session, le brouillon reste côté Cockpit.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ kind: string }> },
) {
  const { kind } = await params;
  if (!isClientFormKind(kind)) {
    return NextResponse.json({ error: "Formulaire inconnu." }, { status: 404 });
  }

  let body: { token?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (!isValidAccessToken(body.token)) {
    return NextResponse.json({ error: INVALID_LINK_MESSAGE }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getSessionCookieName(kind), body.token, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
