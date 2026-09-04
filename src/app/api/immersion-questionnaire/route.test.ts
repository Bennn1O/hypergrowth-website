import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/immersion-questionnaire/route";

const ACCESS_TOKEN =
  "11111111-1111-4111-8111-111111111111.22222222-2222-4222-8222-222222222222";
const SUBMISSION_ID = "123e4567-e89b-42d3-a456-426614174000";

function buildRequest({
  accessToken = ACCESS_TOKEN,
  deck,
}: {
  accessToken?: string;
  deck?: File;
} = {}) {
  const requestData = new FormData();
  requestData.set(
    "payload",
    JSON.stringify({
      answers: {
        "944fee07-ccc0-4728-9b02-4046a8684842": "Une entreprise de services",
        "3edf0953-2dea-44f6-ad0e-17eba4f58e63":
          "813a9a64-7fa0-4859-9e1f-54cc0b62d1b3",
      },
      submissionId: SUBMISSION_ID,
    }),
  );
  if (deck) requestData.set("deck", deck);

  const request = new Request("http://localhost/api/immersion-questionnaire", {
    body: requestData,
    method: "POST",
  });
  request.headers.set("cookie", `hg_immersion_session=${accessToken}`);
  return request;
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/immersion-questionnaire", () => {
  it("forwards the answers and deck to the configured webhook", async () => {
    vi.stubEnv(
      "IMMERSION_QUESTIONNAIRE_WEBHOOK_URL",
      "https://example.com/immersion",
    );
    vi.stubEnv("IMMERSION_QUESTIONNAIRE_WEBHOOK_SECRET", "webhook-secret");
    const webhookFetch = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", webhookFetch);
    const deck = new File(["%PDF-1.7"], "presentation.pdf", {
      type: "application/pdf",
    });

    const response = await POST(buildRequest({ deck }));
    const body = (await response.json()) as { ok: boolean };

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(webhookFetch).toHaveBeenCalledOnce();
    expect(webhookFetch).toHaveBeenCalledWith(
      "https://example.com/immersion",
      expect.any(Object),
    );

    const options = webhookFetch.mock.calls[0][1] as RequestInit;
    expect(options.headers).toEqual({
      Authorization: "Bearer webhook-secret",
    });
    const webhookData = options.body as FormData;
    const payload = JSON.parse(String(webhookData.get("payload"))) as {
      accessToken: string;
      answers: Array<{ label: string }>;
      event: string;
      formsSource: string;
      submissionId: string;
    };

    expect(payload.accessToken).toBe(ACCESS_TOKEN);
    expect(payload.event).toBe("immersion_questionnaire.completed");
    expect(payload.formsSource).toBe("immersion_questionnaire");
    expect(payload.submissionId).toBe(SUBMISSION_ID);
    expect(payload.answers).toHaveLength(2);
    expect(payload.answers[1].label).toBe("Réseau");
    expect((webhookData.get("deck") as File).name).toBe("presentation.pdf");
  });

  it("rejects a request without a valid private token", async () => {
    const response = await POST(buildRequest({ accessToken: "invalid" }));

    expect(response.status).toBe(401);
  });

  it("rejects a renamed executable before calling the webhook", async () => {
    const webhookFetch = vi.fn();
    vi.stubGlobal("fetch", webhookFetch);
    const deck = new File(["MZ executable"], "presentation.pdf", {
      type: "application/pdf",
    });

    const response = await POST(buildRequest({ deck }));

    expect(response.status).toBe(422);
    expect(webhookFetch).not.toHaveBeenCalled();
  });

  it("returns a service error until the webhook is configured", async () => {
    const response = await POST(buildRequest());

    expect(response.status).toBe(503);
  });
});
