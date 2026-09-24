import { describe, expect, it } from "vitest";

import {
  buildWebhookAnswers,
  cleanTypeformText,
  countAnswers,
  formatAddress,
  getFormDefinition,
  getFormProgress,
  isValidAccessToken,
  parseServerDraft,
  sanitizeAnswers,
  validateAnswer,
  validateAnswers,
} from "@/lib/client-forms";

const immersion = getFormDefinition("immersion");
const onboarding = getFormDefinition("onboarding");

describe("form definitions", () => {
  it("keeps the 15 immersion questions in Typeform order", () => {
    expect(immersion.fields).toHaveLength(15);
    expect(immersion.fields[0].ref).toBe(
      "944fee07-ccc0-4728-9b02-4046a8684842",
    );
    expect(immersion.fields.at(-2)?.type).toBe("file_upload");
  });

  it("exposes the 8 onboarding fields mapped to Cockpit", () => {
    expect(onboarding.fields.map((field) => field.ref)).toEqual([
      "contact_nom",
      "raison_sociale",
      "adresse_facturation",
      "siret",
      "tva_intra",
      "email_facturation",
      "telephone",
      "adresse_livraison",
    ]);
  });

  it("keeps Typeform paragraph breaks while removing its markup", () => {
    expect(
      cleanTypeformText("Premier paragraphe.\n\n_Second paragraphe_."),
    ).toBe("Premier paragraphe.\n\nSecond paragraphe.");
  });

  it("calculates progress across every question", () => {
    expect(getFormProgress(immersion, immersion.fields[0].ref)).toMatchObject({
      current: 1,
      total: 15,
    });
    expect(getFormProgress(onboarding, "adresse_livraison")).toMatchObject({
      current: 8,
      percent: 100,
      total: 8,
    });
  });
});

describe("sanitizeAnswers", () => {
  it("rejects invalid scale and choice values", () => {
    expect(
      sanitizeAnswers(immersion, {
        "e18c95d1-4302-415e-9dde-43c21d961041": 11,
        "3edf0953-2dea-44f6-ad0e-17eba4f58e63": "invalid-choice",
      }),
    ).toEqual({});
  });

  it("normalises addresses and drops unknown fields", () => {
    expect(
      sanitizeAnswers(onboarding, {
        adresse_facturation: {
          cp: " 75001 ",
          ligne1: "1 rue de Rivoli",
          ville: "Paris",
        },
        adresse_livraison: {},
        inconnu: "x",
        siret: " 123 456 789 00012 ",
      }),
    ).toEqual({
      adresse_facturation: {
        cp: "75001",
        ligne1: "1 rue de Rivoli",
        ligne2: "",
        pays: "",
        ville: "Paris",
      },
      siret: "123 456 789 00012",
    });
  });
});

describe("validation", () => {
  const byRef = (ref: string) =>
    onboarding.fields.find((field) => field.ref === ref)!;

  it("requires an answer only on required fields", () => {
    expect(validateAnswer(byRef("contact_nom"), "")).toMatch(/nécessaire/);
    expect(validateAnswer(byRef("tva_intra"), "")).toBeNull();
  });

  it("checks email, phone and SIRET formats", () => {
    expect(validateAnswer(byRef("email_facturation"), "compta@")).toMatch(
      /email/,
    );
    expect(validateAnswer(byRef("email_facturation"), "a@b.fr")).toBeNull();
    expect(validateAnswer(byRef("telephone"), "06 12")).toMatch(/numéro/);
    expect(validateAnswer(byRef("telephone"), "+33 6 12 34 56 78")).toBeNull();
    expect(validateAnswer(byRef("siret"), "1234")).toMatch(/14 chiffres/);
    expect(validateAnswer(byRef("siret"), "123 456 789 00012")).toBeNull();
  });

  it("requires the main lines of a required address", () => {
    expect(
      validateAnswer(byRef("adresse_facturation"), {
        cp: "",
        ligne1: "1 rue",
        ligne2: "",
        pays: "France",
        ville: "",
      }),
    ).toMatch(/code postal/);
  });

  it("reports the first invalid field of a submission", () => {
    expect(validateAnswers(onboarding, { contact_nom: "Jean" })).toEqual({
      message: expect.stringMatching(/nécessaire/),
      ref: "raison_sociale",
    });
    expect(validateAnswers(immersion, {})).toBeNull();
  });
});

describe("webhook and drafts", () => {
  it("maps choice references and addresses to readable labels", () => {
    const answers = buildWebhookAnswers(immersion, {
      "3edf0953-2dea-44f6-ad0e-17eba4f58e63":
        "813a9a64-7fa0-4859-9e1f-54cc0b62d1b3",
    });
    expect(answers[0].label).toBe("Réseau");

    expect(
      formatAddress({
        cp: "75001",
        ligne1: "1 rue de Rivoli",
        ligne2: "",
        pays: "France",
        ville: "Paris",
      }),
    ).toBe("1 rue de Rivoli, 75001 Paris, France");
  });

  it("counts answered fields", () => {
    expect(countAnswers(onboarding, { contact_nom: "Jean", siret: "" })).toBe(
      1,
    );
  });

  it("parses a server draft and rejects garbage", () => {
    expect(parseServerDraft(null)).toBeNull();
    expect(
      parseServerDraft({
        answers: { contact_nom: "Jean" },
        currentRef: "siret",
        startedAt: "2026-09-24T10:00:00Z",
        submittedAt: null,
        updatedAt: "2026-09-24T10:05:00Z",
      }),
    ).toMatchObject({ currentRef: "siret", submittedAt: null });
  });

  it("validates the mission.client token", () => {
    expect(
      isValidAccessToken(
        "11111111-1111-4111-8111-111111111111.22222222-2222-4222-8222-222222222222",
      ),
    ).toBe(true);
    expect(isValidAccessToken("11111111-1111-4111-8111-111111111111")).toBe(
      false,
    );
  });
});
