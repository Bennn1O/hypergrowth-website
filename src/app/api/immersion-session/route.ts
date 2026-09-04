import { NextResponse } from "next/server";

import {
  IMMERSION_SESSION_COOKIE,
  isValidImmersionAccessToken,
} from "@/lib/immersion-questionnaire";

export const runtime = "nodejs";

const MAX_BODY_SIZE = 5_000;
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_SIZE) {
    return NextResponse.json(
      { error: "Requête trop volumineuse." },
      { status: 413 },
    );
  }

  let body: { accessToken?: unknown };
  try {
    body = JSON.parse(rawBody) as typeof body;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!isValidImmersionAccessToken(body.accessToken)) {
    return NextResponse.json(
      {
        error:
          "Ce lien n’est plus valide. Demande un nouveau lien à l’équipe HyperGrowth.",
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    httpOnly: true,
    maxAge: SESSION_MAX_AGE,
    name: IMMERSION_SESSION_COOKIE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    value: body.accessToken,
  });
  response.headers.set("Cache-Control", "no-store");

  return response;
}
