// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "./i18n/LocaleContext";
import HomeworkHelp from "./HomeworkHelp";
import { stripSolutionCode } from "./homeworkStrip";

function renderPage() {
  return render(
    <LocaleProvider>
      <HomeworkHelp />
    </LocaleProvider>,
  );
}

describe("Homework help", () => {
  it("asks for an assignment before calling the tutor", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Help me start" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Paste the assignment or choose a file.");
  });

  it("reads a text file into the assignment box", async () => {
    renderPage();
    const input = document.querySelector("input[type=file]") as HTMLInputElement;
    const file = new File(["Count the even numbers."], "hw1.txt", { type: "text/plain" });
    fireEvent.change(input, { target: { files: [file] } });
    expect(await screen.findByDisplayValue("Count the even numbers.")).toBeTruthy();
    expect(screen.getByText("Using hw1.txt")).toBeTruthy();
  });

  it("asks the existing tutor when the homework route is missing and hides code", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ detail: "Not Found" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          reply:
            "Use a loop from the lists lecture.\n```python\ndef calculate_average(grades):\n    return 0\n```\nTry two grades by hand.",
        }),
      });
    vi.stubGlobal("fetch", fetchMock);
    renderPage();
    fireEvent.change(screen.getByPlaceholderText("Paste the homework here."), {
      target: { value: "Average the grades." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Help me start" }));
    expect(await screen.findByText(/lists lecture/)).toBeTruthy();
    expect(screen.queryByText(/calculate_average/)).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const chatBody = JSON.parse(String(fetchMock.mock.calls[1][1].body)) as { message: string };
    expect(chatBody.message).toContain("Average the grades.");
    expect(chatBody.message).toContain("Do not write Python code");
  });
});

describe("stripSolutionCode", () => {
  it("removes a fenced function and keeps the plan", () => {
    const cleaned = stripSolutionCode("Read the lists lecture.\n```python\ndef f():\n    return 1\n```");
    expect(cleaned).toContain("lists lecture");
    expect(cleaned).not.toContain("def f");
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
