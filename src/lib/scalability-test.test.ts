import { describe, expect, it } from "vitest";

import {
  buildWebhookAnswers,
  getNextStep,
  sanitizeAnswers,
  SCALABILITY_TEST_STEPS,
} from "@/lib/scalability-test";

describe("scalability test definition", () => {
  it("preserves the 54 Typeform steps", () => {
    expect(SCALABILITY_TEST_STEPS).toHaveLength(54);
  });

  it("skips the follow-up when costs can be reduced quickly", () => {
    const next = getNextStep("b9bffe14-550f-4bad-b7a4-011e9b631708", {
      "b9bffe14-550f-4bad-b7a4-011e9b631708":
        "8ccd9cf6-4693-47ef-bb5b-40b949c0f1e2",
    });

    expect(next).toEqual({
      ref: "e11dd474-d6fa-4861-af8b-db469f2293ba",
      type: "field",
    });
  });

  it("rejects an opinion scale value outside 0 to 10", () => {
    const ref = "12d502d9-dc33-4d5c-af31-d567da3b89d9";

    expect(sanitizeAnswers({ [ref]: 10 })).toEqual({ [ref]: 10 });
    expect(sanitizeAnswers({ [ref]: 11 })).toEqual({});
  });

  it("maps choice references to readable labels for n8n", () => {
    const answers = {
      "a5213698-173e-47d4-8c01-7b3413042380": "Léa",
      "f815968e-027b-4142-8aee-6d4a1b98d8cf": "Omen Studio",
      "5fd040ec-81c8-46eb-b7fd-72674f14dec5":
        "0c59e48c-1b4e-457b-ab7e-f35acac249e1",
    };
    const revenue = buildWebhookAnswers(answers).find(
      (answer) => answer.fieldRef === "5fd040ec-81c8-46eb-b7fd-72674f14dec5",
    );

    expect(revenue?.label).toBe("Entre 100k - 500k€");
    expect(revenue?.question).toBe("Quel est ton CA annuel ?");
  });
});
