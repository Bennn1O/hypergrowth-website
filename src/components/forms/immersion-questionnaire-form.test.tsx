import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ImmersionQuestionnaireForm } from "@/components/forms/immersion-questionnaire-form";

beforeEach(() => {
  window.sessionStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ImmersionQuestionnaireForm", () => {
  it("blocks a questionnaire opened without its private token", () => {
    render(<ImmersionQuestionnaireForm />);

    expect(
      screen.getByRole("button", { name: /commencer le questionnaire/i }),
    ).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent(/lien est incomplet/i);
  });

  it("starts with the first Typeform question", () => {
    render(<ImmersionQuestionnaireForm hasAccess />);

    fireEvent.click(
      screen.getByRole("button", { name: /commencer le questionnaire/i }),
    );

    expect(
      screen.getByRole("heading", {
        name: /décrire ton entreprise en une phrase/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 / 15")).toBeInTheDocument();
  });

  it("keeps focus in the active field while typing", async () => {
    render(<ImmersionQuestionnaireForm hasAccess />);
    fireEvent.click(
      screen.getByRole("button", { name: /commencer le questionnaire/i }),
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

  it("allows every optional question to be skipped", async () => {
    render(<ImmersionQuestionnaireForm hasAccess />);
    fireEvent.click(
      screen.getByRole("button", { name: /commencer le questionnaire/i }),
    );

    fireEvent.click(screen.getByRole("button", { name: "Passer" }));
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /quel est ton CA actuel/i }),
      ).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByRole("button", { name: "Passer" }));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", {
          name: /comment tes clients arrivent-ils majoritairement/i,
        }),
      ).toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: "Passer" })).toBeInTheDocument();
  });

  it("remains usable when session storage is unavailable", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage unavailable");
    });
    render(<ImmersionQuestionnaireForm hasAccess />);
    fireEvent.click(
      screen.getByRole("button", { name: /commencer le questionnaire/i }),
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
});
