// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LocaleProvider } from "./i18n/LocaleContext";
import HomeworkHelp from "./HomeworkHelp";

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
});
