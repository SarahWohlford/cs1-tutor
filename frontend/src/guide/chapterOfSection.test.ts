import { describe, it, expect } from "vitest";
import { chapterOfSectionTitle, isInductionGuideSection } from "./chapterOfSection";

describe("isInductionGuideSection", () => {
  it("is disabled until a CS1 guide is authored", () => {
    expect(isInductionGuideSection('5 Induction: Proving "FOR ALL ..." ')).toBe(false);
    expect(isInductionGuideSection("5.1 Ordinary Induction")).toBe(false);
    expect(isInductionGuideSection("5.3 Problems")).toBe(false);
    expect(isInductionGuideSection(null)).toBe(false);
  });

  it("chapterOfSectionTitle extracts chapter token", () => {
    expect(chapterOfSectionTitle("5.1 Ordinary Induction")).toBe("5");
    expect(chapterOfSectionTitle('5 Induction: Proving "FOR ALL ..." ')).toBe("5");
    expect(chapterOfSectionTitle("Week 3 — Lists")).toBe(null);
  });
});
