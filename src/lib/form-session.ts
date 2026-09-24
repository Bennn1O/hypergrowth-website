import { NextResponse } from "next/server";

import {
  getSessionCookieName,
  isClientFormKind,
  isValidAccessToken,
  type ClientFormKind,
} from "@/lib/client-forms";

// Le token du lien est posé en cookie HttpOnly à l'ouverture, puis relu par
// les routes /api/forms/[kind]/* : il n'apparaît jamais dans le JS de la page.

export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export const INVALID_LINK_MESSAGE =
  "Ce lien n’est plus valide. Demande un nouveau lien à l’équipe HyperGrowth.";

export function getCookieValue(request: Request, name: string): string {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (!match) return "";
  return decodeURIComponent(match.slice(name.length + 1));
}

export async function resolveFormRequest(
  request: Request,
  params: Promise<{ kind: string }>,
): Promise<
  { kind: ClientFormKind; token: string } | { response: NextResponse }
> {
  const { kind } = await params;
  if (!isClientFormKind(kind)) {
    return {
      response: NextResponse.json(
        { error: "Formulaire inconnu." },
        { status: 404 },
      ),
    };
  }
  const token = getCookieValue(request, getSessionCookieName(kind));
  if (!isValidAccessToken(token)) {
    return {
      response: NextResponse.json(
        { error: INVALID_LINK_MESSAGE },
        { status: 401 },
      ),
    };
  }
  return { kind, token };
}
