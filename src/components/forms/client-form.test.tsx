import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ClientForm } from "@/components/forms/client-form";

type DraftResponse = {
  answers?: Record<string, unknown>;
  currentRef?: string;
  submittedAt?: string | null;
} | null;

function mockApi(draft: DraftResponse = null) {
  const calls: Array<{ body: unknown; method: string; url: string }> = [];
  const fetchMock = vi.fn(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method ?? "GET";
      const body =
        typeof init?.body === "string" ? JSON.parse(init.body) : init?.body;
      calls.push({ body, method, url });

      if (url.endsWith("/draft") && method === "GET") {
        return Response.json({
          draft: draft
            ? {
                answers: {},
                currentRef: null,
                startedAt: "2026-09-24T10:00:00Z",
                submittedAt: null,
                updatedAt: "2026-09-24T10:00:00Z",
                ...draft,
              }
            : null,
        });
      }
      if (url.endsWith("/draft") && method === "PUT") {
        return Response.json({ saved: true });
      }
      if (url.endsWith("/submit")) return Response.json({ ok: true });
      return new Response(null, { status: 404 });
    },
  );
  vi.stubGlobal("fetch", fetchMock);
  return calls;
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("ClientForm", () => {
  it("starts the immersion questionnaire with the first Typeform question", async () => {
    mockApi();
    render(<ClientForm kind="immersion" />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: /commencer le questionnaire/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /décrire ton entreprise en une phrase/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 / 15")).toBeInTheDocument();
  });

  it("allows optional immersion questions to be skipped", async () => {
    mockApi();
    render(<ClientForm kind="immersion" />);
    fireEvent.click(
      await screen.findByRole("button", {
        name: /commencer le questionnaire/i,
      }),
    );

    fireEvent.click(screen.getByRole("button", { name: "Passer" }));
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /quel est ton CA actuel/i }),
      ).toBeInTheDocument(),
    );
  });

  it("blocks a required onboarding question until it is answered", async () => {
    mockApi();
    render(<ClientForm kind="onboarding" />);
    fireEvent.click(await screen.findByRole("button", { name: /commencer/i }));

    expect(
      screen.queryByRole("button", { name: "Passer" }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Continuer" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/nécessaire/);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Jean Dupont" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continuer" }));
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /nom complet de ton entreprise/i }),
      ).toBeInTheDocument(),
    );
  });

  it("saves the draft to Cockpit when moving to the next question", async () => {
    const calls = mockApi();
    render(<ClientForm kind="onboarding" />);
    fireEvent.click(await screen.findByRole("button", { name: /commencer/i }));

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Jean Dupont" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continuer" }));

    await waitFor(() => {
      const put = calls.find((call) => call.method === "PUT");
      expect(put?.body).toEqual({
        answers: { contact_nom: "Jean Dupont" },
        currentRef: "raison_sociale",
      });
    });
    expect(
      JSON.parse(
        window.localStorage.getItem("hypergrowth-onboarding-form-v1")!,
      ),
    ).toMatchObject({ currentRef: "raison_sociale" });
  });

  it("offers to resume from the Cockpit draft", async () => {
    mockApi({
      answers: { contact_nom: "Jean Dupont", raison_sociale: "ACME" },
      currentRef: "siret",
    });
    render(<ClientForm kind="onboarding" />);

    fireEvent.click(
      await screen.findByRole("button", { name: /reprendre à la question 4/i }),
    );

    expect(
      screen.getByRole("heading", { name: /numéro de SIRET/i }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retour" }));
    await waitFor(() =>
      expect(
        screen.getByRole("heading", {
          name: /adresse postale de ton entreprise/i,
        }),
      ).toBeInTheDocument(),
    );
  });

  it("falls back to the local draft when Cockpit has none", async () => {
    window.localStorage.setItem(
      "hypergrowth-onboarding-form-v1",
      JSON.stringify({
        answers: { contact_nom: "Jean Dupont" },
        currentRef: "raison_sociale",
      }),
    );
    mockApi();
    render(<ClientForm kind="onboarding" />);

    expect(
      await screen.findByRole("button", { name: /reprendre à la question 2/i }),
    ).toBeInTheDocument();
  });

  it("shows the already-sent screen for a submitted form", async () => {
    mockApi({ submittedAt: "2026-09-20T10:00:00Z" });
    render(<ClientForm kind="onboarding" />);

    expect(
      await screen.findByRole("heading", { name: /déjà été envoyé/i }),
    ).toBeInTheDocument();
  });

  it("remains usable when local storage is unavailable", async () => {
    mockApi();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage unavailable");
    });
    render(<ClientForm kind="immersion" />);
    fireEvent.click(
      await screen.findByRole("button", {
        name: /commencer le questionnaire/i,
      }),
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Une entreprise" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continuer" }));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /quel est ton CA actuel/i }),
      ).toBeInTheDocument(),
    );
  });

  it("keeps focus in the active field while typing", async () => {
    mockApi();
    render(<ClientForm kind="immersion" />);
    fireEvent.click(
      await screen.findByRole("button", {
        name: /commencer le questionnaire/i,
      }),
    );

    const input = screen.getByRole("textbox");
    input.focus();
    fireEvent.change(input, { target: { value: "Une entreprise" } });
    await act(
      () =>
        new Promise<void>((resolve) => {
          window.requestAnimationFrame(() => resolve());
        }),
    );

    expect(input).toHaveFocus();
  });
});
