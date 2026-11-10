// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "./i18n/LocaleContext";
import HomeworkHelp from "./HomeworkHelp";
import { parseHomeworkSteps } from "./homeworkStrip";
import { hideFocsReply } from "./stripFocs";

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
          reply: JSON.stringify([
            {
              title: "Use a loop",
              lecture: "lists lecture",
              try: "Try two grades by hand.\n```python\ndef calculate_average(grades):\n    return 0\n```",
            },
            { title: "Check the letters", lecture: "Lecture 6", try: "Compare one high grade and one low grade." },
          ]),
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
    expect(screen.queryByText("Check the letters")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Done with this part" }));
    expect(screen.getByText("Check the letters")).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Use a loop" })).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const chatBody = JSON.parse(String(fetchMock.mock.calls[1][1].body)) as { message: string };
    expect(chatBody.message).toContain("Average the grades.");
    expect(chatBody.message).toContain("Do not write Python code");
  });

  it("restores the assignment and the part you were on", () => {
    localStorage.setItem(
      "cs1-homework.v1",
      JSON.stringify({
        assignment: "Average the grades.",
        fileName: "grades.pdf",
        steps: [
          { title: "Name the inputs", lecture: "Lecture 3", tryThis: "Write the inputs." },
          { title: "Pick the letter", lecture: "Lecture 6", tryThis: "Compare 90 and 80." },
        ],
        stepIndex: 1,
      }),
    );
    renderPage();
    expect(screen.getByDisplayValue("Average the grades.")).toBeTruthy();
    expect(screen.getByText("Using grades.pdf")).toBeTruthy();
    expect(screen.getByText("Pick the letter")).toBeTruthy();
    expect(screen.queryByText("Name the inputs")).toBeNull();
  });
});

describe("homework steps", () => {
  it("keeps one CSCI 1100 step and drops a FOCS step", () => {
    const steps = parseHomeworkSteps(
      JSON.stringify([
        { title: "Name the inputs", lecture: "Lecture 8 Lists", try: "Write the inputs in words." },
        { title: "Read FOCS induction", lecture: "FOCS chapter 5", try: "See Foundations of Computer Science." },
      ]),
    );
    expect(steps).toHaveLength(1);
    expect(steps[0].title).toBe("Name the inputs");
    expect(steps[0].lecture).toContain("Lecture 8");
  });

  it("removes a FOCS sentence from a tutor reply", () => {
    const cleaned = hideFocsReply("Use a loop. Open the FOCS induction chapter. Try two numbers.");
    expect(cleaned).toContain("Use a loop");
    expect(cleaned).toContain("two numbers");
    expect(cleaned.toLowerCase()).not.toContain("focs");
  });
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.unstubAllGlobals();
});
