import { describe, expect, it } from "vitest";

import {
  buildImmersionWebhookAnswers,
  cleanTypeformText,
  getImmersionProgress,
  IMMERSION_QUESTIONNAIRE_STEPS,
  isValidImmersionAccessToken,
  sanitizeImmersionAnswers,
} from "@/lib/immersion-questionnaire";

describe("immersion questionnaire definition", () => {
  it("preserves the 15 Typeform questions", () => {
    expect(IMMERSION_QUESTIONNAIRE_STEPS).toHaveLength(15);
    expect(
      IMMERSION_QUESTIONNAIRE_STEPS.map(({ ref, type }) => ({ ref, type })),
    ).toEqual([
      { ref: "944fee07-ccc0-4728-9b02-4046a8684842", type: "short_text" },
      { ref: "9cc9b347-d7a2-48fa-8769-4cd1dddd47f2", type: "short_text" },
      {
        ref: "3edf0953-2dea-44f6-ad0e-17eba4f58e63",
        type: "multiple_choice",
      },
      { ref: "837b4b75-3883-4947-a38c-76c6be62352c", type: "long_text" },
      { ref: "1436d17b-6910-4acb-9749-fa822f8f998b", type: "long_text" },
      { ref: "ae1bd5d6-f665-414b-82c4-4f502d240398", type: "long_text" },
      {
        ref: "e18c95d1-4302-415e-9dde-43c21d961041",
        type: "opinion_scale",
      },
      { ref: "2a8717f3-880f-47c3-8406-f892a74b0cc5", type: "long_text" },
      { ref: "939608b9-a98d-48d1-892b-df6a4a4550d3", type: "long_text" },
      {
        ref: "3b12b851-2dcc-4baf-8f41-87acfadeb3a0",
        type: "multiple_choice",
      },
      { ref: "9d0d2853-b5d0-48f3-bd27-69a896cbc0f0", type: "long_text" },
      { ref: "6f160894-1aed-4c1a-9062-a39899994655", type: "long_text" },
      { ref: "42729e53-28f1-4037-af11-f1e3dc439483", type: "long_text" },
      { ref: "3f669dfd-5694-4ec3-a023-6358eb4ee1c4", type: "file_upload" },
      { ref: "019e3137-7744-490d-9cb4-d6943b1f2452", type: "long_text" },
    ]);
  });

  it("keeps Typeform paragraph breaks while removing its markup", () => {
    expect(
      cleanTypeformText("Premier paragraphe.\n\n_Second paragraphe_."),
    ).toBe("Premier paragraphe.\n\nSecond paragraphe.");
  });

  it("calculates progress across every question", () => {
    const lastQuestion = IMMERSION_QUESTIONNAIRE_STEPS.at(-1);

    expect(getImmersionProgress(IMMERSION_QUESTIONNAIRE_STEPS[0].ref)).toEqual({
      current: 1,
      percent: 100 / 15,
      total: 15,
    });
    expect(getImmersionProgress(lastQuestion?.ref || "")).toEqual({
      current: 15,
      percent: 100,
      total: 15,
    });
  });

  it("rejects invalid scale and choice values", () => {
    expect(
      sanitizeImmersionAnswers({
        "e18c95d1-4302-415e-9dde-43c21d961041": 11,
        "3edf0953-2dea-44f6-ad0e-17eba4f58e63": "invalid-choice",
      }),
    ).toEqual({});
  });

  it("maps Typeform choice references to readable labels", () => {
    const answers = sanitizeImmersionAnswers({
      "3edf0953-2dea-44f6-ad0e-17eba4f58e63":
        "c6328d34-38aa-4f11-b721-2486f99d1d9c",
    });

    expect(buildImmersionWebhookAnswers(answers)[0].label).toBe(
      "Bouche-à-oreille",
    );
  });

  it("accepts only a Cockpit mission and client target", () => {
    expect(
      isValidImmersionAccessToken(
        "11111111-1111-4111-8111-111111111111.22222222-2222-4222-8222-222222222222",
      ),
    ).toBe(true);
    expect(isValidImmersionAccessToken("client-token_123456789")).toBe(false);
    expect(isValidImmersionAccessToken("short")).toBe(false);
    expect(isValidImmersionAccessToken("token avec espaces 123")).toBe(false);
  });
});
