// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HintLadderPanel } from "./HintLadderPanel";

describe("HintLadderPanel answer modes", () => {
  it("uses code-friendly copy and hides the math palette for Python challenges", () => {
    render(
      <HintLadderPanel
        problem={{
          id: "python-answer",
          prompt: "Write one line of Python.",
          solution: "print(1)",
          rubric: "Print one.",
          answerMode: "code",
        }}
        token={null}
        hasTwin={false}
        onSolved={vi.fn()}
        onTwin={vi.fn()}
      />,
    );

    expect(screen.getByRole("textbox", { name: "Your Python answer" })).toBeTruthy();
    expect(screen.queryByText("Insert symbol")).toBeNull();
  });

  it("keeps the symbol palette for math challenges", () => {
    render(
      <HintLadderPanel
        problem={{ id: "math-answer", prompt: "Prove it.", solution: "Proof", rubric: "Valid proof" }}
        token={null}
        hasTwin={false}
        onSolved={vi.fn()}
        onTwin={vi.fn()}
      />,
    );

    expect(screen.getByRole("textbox", { name: "Your answer" })).toBeTruthy();
    expect(screen.getByText("Insert symbol")).toBeTruthy();
  });
});
