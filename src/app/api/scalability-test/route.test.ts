import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/scalability-test/route";
import {
  isAnswerableField,
  SCALABILITY_TEST_STEPS,
} from "@/lib/scalability-test";
import type { Answers } from "@/lib/scalability-test";

function buildValidAnswers(): Answers {
  const answers: Answers = {};

  for (const field of SCALABILITY_TEST_STEPS.filter(isAnswerableField)) {
    if (!field.validations?.required) continue;
    if (field.type === "opinion_scale") {
      answers[field.ref] = 5;
      continue;
    }
    if (field.type === "email") {
      answers[field.ref] = "test@hypergrowth.fr";
      continue;
    }
    if (
      field.type === "multiple_choice" ||
      field.type === "picture_choice" ||
      field.type === "dropdown"
    ) {
      const choiceRef = field.properties?.choices?.[0]?.ref;
      if (!choiceRef) continue;
      answers[field.ref] = field.properties?.allow_multiple_selection
        ? [choiceRef]
        : choiceRef;
      continue;
    }
    answers[field.ref] = "Réponse de test";
  }

  return answers;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("POST /api/scalability-test", () => {
  it("sends the validated result and answers to n8n", async () => {
    const webhookFetch = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", webhookFetch);

    const response = await POST(
      new Request("http://localhost/api/scalability-test", {
        body: JSON.stringify({ answers: buildValidAnswers(), website: "" }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }),
    );
    const body = (await response.json()) as { ok: boolean };

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(webhookFetch).toHaveBeenCalledOnce();
    expect(webhookFetch).toHaveBeenCalledWith(
      "https://n8nfastscribe.convertlabs.fr/webhook/f8aada19-fa30-401d-bebb-f21bd7e48e28",
      expect.any(Object),
    );

    const options = webhookFetch.mock.calls[0][1] as RequestInit;
    const payload = JSON.parse(String(options.body)) as {
      answers: unknown[];
      contact: { email: string };
      event: string;
      score: number;
    };
    expect(payload.event).toBe("scalability_test.completed");
    expect(payload.contact.email).toBe("test@hypergrowth.fr");
    expect(payload.answers.length).toBeGreaterThan(30);
    expect(payload.score).toBeGreaterThanOrEqual(0);
  });
});
