import { afterEach, describe, expect, it, vi } from "vitest";

import {
  GET as getDraft,
  PUT as putDraft,
} from "@/app/api/forms/[kind]/draft/route";
import { POST as postSession } from "@/app/api/forms/[kind]/session/route";
import { POST as postSubmit } from "@/app/api/forms/[kind]/submit/route";

const TOKEN =
  "11111111-1111-4111-8111-111111111111.22222222-2222-4222-8222-222222222222";

const params = (kind: string) => ({ params: Promise.resolve({ kind }) });

function withCookie(request: Request, kind: string, token = TOKEN) {
  request.headers.set("cookie", `hg_${kind}_session=${token}`);
  return request;
}

function jsonRequest(url: string, method: string, body: unknown) {
  return new Request(`http://localhost${url}`, {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method,
  });
}

function submitRequest(kind: string, answers: unknown, deck?: File) {
  const data = new FormData();
  data.set("payload", JSON.stringify({ answers }));
  if (deck) data.set("deck", deck);
  return withCookie(
    new Request(`http://localhost/api/forms/${kind}/submit`, {
      body: data,
      method: "POST",
    }),
    kind,
  );
}

function stubCockpit() {
  vi.stubEnv("COCKPIT_URL", "https://cockpit.test");
  vi.stubEnv("FORMS_WEBHOOK_SECRET", "cockpit-secret");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/forms/[kind]/session", () => {
  it("sets the session cookie for a valid token", async () => {
    const response = await postSession(
      jsonRequest("/api/forms/onboarding/session", "POST", { token: TOKEN }),
      params("onboarding"),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toContain(
      `hg_onboarding_session=${TOKEN}`,
    );
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
  });

  it("rejects an unknown form or a malformed token", async () => {
    expect(
      (
        await postSession(
          jsonRequest("/api/forms/x/session", "POST", { token: TOKEN }),
          params("x"),
        )
      ).status,
    ).toBe(404);
    expect(
      (
        await postSession(
          jsonRequest("/api/forms/onboarding/session", "POST", {
            token: "nope",
          }),
          params("onboarding"),
        )
      ).status,
    ).toBe(400);
  });
});

describe("/api/forms/[kind]/draft", () => {
  it("requires the session cookie", async () => {
    const response = await getDraft(
      new Request("http://localhost/api/forms/onboarding/draft"),
      params("onboarding"),
    );
    expect(response.status).toBe(401);
  });

  it("reads the draft from Cockpit with the shared secret", async () => {
    stubCockpit();
    const cockpitFetch = vi.fn().mockResolvedValue(
      Response.json({
        draft: {
          answers: { contact_nom: "Jean" },
          currentRef: "siret",
          startedAt: "2026-09-24T10:00:00Z",
          submittedAt: null,
          updatedAt: "2026-09-24T10:00:00Z",
        },
      }),
    );
    vi.stubGlobal("fetch", cockpitFetch);

    const response = await getDraft(
      withCookie(
        new Request("http://localhost/api/forms/onboarding/draft"),
        "onboarding",
      ),
      params("onboarding"),
    );
    const body = (await response.json()) as { draft: { currentRef: string } };

    expect(body.draft.currentRef).toBe("siret");
    expect(cockpitFetch.mock.calls[0][0]).toBe(
      `https://cockpit.test/api/forms/onboarding/draft?t=${encodeURIComponent(TOKEN)}`,
    );
    expect(
      (cockpitFetch.mock.calls[0][1] as RequestInit).headers,
    ).toMatchObject({ Authorization: "Bearer cockpit-secret" });
  });

  it("answers with no draft when Cockpit is not configured", async () => {
    const response = await getDraft(
      withCookie(
        new Request("http://localhost/api/forms/onboarding/draft"),
        "onboarding",
      ),
      params("onboarding"),
    );
    expect(await response.json()).toEqual({ draft: null });
  });

  it("sanitises answers before saving them to Cockpit", async () => {
    stubCockpit();
    const cockpitFetch = vi
      .fn()
      .mockResolvedValue(Response.json({ draft: {} }));
    vi.stubGlobal("fetch", cockpitFetch);

    const response = await putDraft(
      withCookie(
        jsonRequest("/api/forms/onboarding/draft", "PUT", {
          answers: { contact_nom: " Jean ", inconnu: "x" },
          currentRef: "siret",
        }),
        "onboarding",
      ),
      params("onboarding"),
    );

    expect(await response.json()).toEqual({ saved: true });
    const sent = JSON.parse(
      String((cockpitFetch.mock.calls[0][1] as RequestInit).body),
    );
    expect(sent).toEqual({
      answers: { contact_nom: "Jean" },
      currentRef: "siret",
      t: TOKEN,
    });
  });

  it("relays a Cockpit conflict when the form was already sent", async () => {
    stubCockpit();
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          Response.json(
            { error: "Formulaire déjà envoyé", submittedAt: "2026-09-20" },
            { status: 409 },
          ),
        ),
    );

    const response = await putDraft(
      withCookie(
        jsonRequest("/api/forms/onboarding/draft", "PUT", { answers: {} }),
        "onboarding",
      ),
      params("onboarding"),
    );
    expect(response.status).toBe(409);
  });
});

describe("POST /api/forms/[kind]/submit", () => {
  const validOnboarding = {
    adresse_facturation: {
      cp: "75001",
      ligne1: "1 rue de Rivoli",
      ligne2: "",
      pays: "France",
      ville: "Paris",
    },
    contact_nom: "Jean Dupont",
    email_facturation: "compta@acme.fr",
    raison_sociale: "ACME",
    siret: "123 456 789 00012",
    telephone: "06 12 34 56 78",
  };

  it("rejects a request without a valid private token", async () => {
    const request = submitRequest("onboarding", validOnboarding);
    request.headers.set("cookie", "hg_onboarding_session=invalid");
    expect((await postSubmit(request, params("onboarding"))).status).toBe(401);
  });

  it("refuses an incomplete onboarding before touching Cockpit", async () => {
    stubCockpit();
    const cockpitFetch = vi.fn();
    vi.stubGlobal("fetch", cockpitFetch);

    const response = await postSubmit(
      submitRequest("onboarding", { ...validOnboarding, siret: "12" }),
      params("onboarding"),
    );

    expect(response.status).toBe(400);
    expect(cockpitFetch).not.toHaveBeenCalled();
  });

  it("sends a complete onboarding to Cockpit", async () => {
    stubCockpit();
    const cockpitFetch = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    vi.stubGlobal("fetch", cockpitFetch);

    const response = await postSubmit(
      submitRequest("onboarding", validOnboarding),
      params("onboarding"),
    );

    expect(response.status).toBe(200);
    expect(cockpitFetch.mock.calls[0][0]).toBe(
      "https://cockpit.test/api/forms/onboarding/submit",
    );
    const sent = JSON.parse(
      String((cockpitFetch.mock.calls[0][1] as RequestInit).body),
    );
    expect(sent.answers.siret).toBe("123 456 789 00012");
    expect(sent.t).toBe(TOKEN);
  });

  it("fails loudly when Cockpit refuses an onboarding", async () => {
    stubCockpit();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 500 })),
    );

    const response = await postSubmit(
      submitRequest("onboarding", validOnboarding),
      params("onboarding"),
    );
    expect(response.status).toBe(502);
  });

  it("forwards the immersion answers and deck to n8n, then marks Cockpit", async () => {
    stubCockpit();
    vi.stubEnv("IMMERSION_QUESTIONNAIRE_WEBHOOK_URL", "https://n8n.test/hook");
    vi.stubEnv("IMMERSION_QUESTIONNAIRE_WEBHOOK_SECRET", "webhook-secret");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      .mockResolvedValueOnce(Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    const deck = new File(["%PDF-1.7"], "presentation.pdf", {
      type: "application/pdf",
    });

    const response = await postSubmit(
      submitRequest(
        "immersion",
        {
          "944fee07-ccc0-4728-9b02-4046a8684842": "Une entreprise de services",
          "3edf0953-2dea-44f6-ad0e-17eba4f58e63":
            "813a9a64-7fa0-4859-9e1f-54cc0b62d1b3",
        },
        deck,
      ),
      params("immersion"),
    );

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toBe("https://n8n.test/hook");
    const options = fetchMock.mock.calls[0][1] as RequestInit;
    expect(options.headers).toEqual({ Authorization: "Bearer webhook-secret" });
    const payload = JSON.parse(
      String((options.body as FormData).get("payload")),
    ) as {
      accessToken: string;
      answers: Array<{ label: string }>;
      event: string;
      formsSource: string;
    };
    expect(payload.accessToken).toBe(TOKEN);
    expect(payload.event).toBe("immersion_questionnaire.completed");
    expect(payload.formsSource).toBe("immersion_questionnaire");
    expect(payload.answers[1].label).toBe("Réseau");
    expect(((options.body as FormData).get("deck") as File).name).toBe(
      "presentation.pdf",
    );
    expect(fetchMock.mock.calls[1][0]).toBe(
      "https://cockpit.test/api/forms/immersion/submit",
    );
  });

  it("rejects a renamed executable before calling the webhook", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const deck = new File(["MZ executable"], "presentation.pdf", {
      type: "application/pdf",
    });

    const response = await postSubmit(
      submitRequest("immersion", {}, deck),
      params("immersion"),
    );

    expect(response.status).toBe(422);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns a service error until the immersion webhook is configured", async () => {
    const response = await postSubmit(
      submitRequest("immersion", {}),
      params("immersion"),
    );
    expect(response.status).toBe(503);
  });
});
