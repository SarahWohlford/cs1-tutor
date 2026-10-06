import { describe, expect, it } from "vitest";
import { courseHasTextbookPdf } from "./learningTextbooks";

describe("courseHasTextbookPdf", () => {
  it("keeps the built-in CSCI 1100 course off the FOCS textbook PDF", () => {
    expect(courseHasTextbookPdf("focs")).toBe(false);
    expect(courseHasTextbookPdf("")).toBe(false);
  });

  it("still shows pages for an uploaded textbook", () => {
    expect(courseHasTextbookPdf("user_abc123")).toBe(true);
  });
});
