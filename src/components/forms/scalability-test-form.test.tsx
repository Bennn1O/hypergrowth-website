import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScalabilityTestForm } from "@/components/forms/scalability-test-form";

describe("ScalabilityTestForm", () => {
  it("starts with the first Typeform question", () => {
    render(<ScalabilityTestForm />);

    fireEvent.click(screen.getByRole("button", { name: /commencer le test/i }));

    expect(
      screen.getByRole("heading", { name: /quel est ton prénom/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 / 50")).toBeInTheDocument();
  });

  it("keeps focus in the active field while typing", async () => {
    render(<ScalabilityTestForm />);

    fireEvent.click(screen.getByRole("button", { name: /commencer le test/i }));

    const input = screen.getByRole("textbox");
    input.focus();
    fireEvent.change(input, { target: { value: "L" } });

    await act(
      () =>
        new Promise<void>((resolve) => {
          window.requestAnimationFrame(() => resolve());
        }),
    );

    expect(input).toHaveFocus();
  });
});
