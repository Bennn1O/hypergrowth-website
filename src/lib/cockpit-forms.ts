import type { ClientFormKind } from "@/lib/client-forms";

// Relais vers Cockpit (/api/forms) : brouillons et réponses des formulaires.
// FORMS_WEBHOOK_SECRET est le même secret que celui posé côté Cockpit.

const DEFAULT_COCKPIT_URL = "https://cockpit.hypergrowth.fr";

function getConfig() {
  const secret = process.env.FORMS_WEBHOOK_SECRET;
  if (!secret) return null;
  const baseUrl = (process.env.COCKPIT_URL || DEFAULT_COCKPIT_URL).replace(
    /\/$/,
    "",
  );
  return { baseUrl, secret };
}

export function isCockpitConfigured(): boolean {
  return getConfig() !== null;
}

export async function cockpitGetDraft(
  kind: ClientFormKind,
  token: string,
): Promise<Response | null> {
  const config = getConfig();
  if (!config) return null;
  return fetch(
    `${config.baseUrl}/api/forms/${kind}/draft?t=${encodeURIComponent(token)}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${config.secret}` },
      signal: AbortSignal.timeout(10_000),
    },
  );
}

export async function cockpitWrite(
  kind: ClientFormKind,
  action: "draft" | "submit",
  token: string,
  body: Record<string, unknown>,
): Promise<Response | null> {
  const config = getConfig();
  if (!config) return null;
  return fetch(`${config.baseUrl}/api/forms/${kind}/${action}`, {
    body: JSON.stringify({ ...body, t: token }),
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${config.secret}`,
      "Content-Type": "application/json",
    },
    method: action === "draft" ? "PUT" : "POST",
    signal: AbortSignal.timeout(10_000),
  });
}
