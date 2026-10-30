import { describe, expect, it } from "vitest";
import { CS1_LECTURES } from "./cs1Lectures";
import {
  PRACTICAL_PROGRAMMING_GROUPS,
  bookSectionPreview,
  formatBookPages,
  isPracticalProgrammingHint,
} from "./practicalProgramming";

const LATER_PAGES: Record<string, { id: string; title: string; start: number; end: number }[]> = {
  "5": [
    { id: "l5-function-basics", title: "Function Basics", start: 30, end: 32 },
    { id: "l5-importing", title: "Importing Modules", start: 50, end: 53 },
  ],
  "6": [
    { id: "boolean-logic", title: "Boolean Logic", start: 108, end: 117 },
    { id: "if-statements", title: "if Statements", start: 118, end: 124 },
    { id: "storing-conditionals", title: "Storing Conditionals", start: 125, end: 125 },
    { id: "ch6-summary", title: "Summary", start: 126, end: 126 },
    { id: "ch6-exercises", title: "Exercises", start: 127, end: 130 },
  ],
  "7": [
    { id: "l7-importing", title: "Importing Modules", start: 50, end: 53 },
    { id: "images", title: "Images", start: 64, end: 67 },
    { id: "sequences", title: "Other Kinds of Sequences", start: 99, end: 100 },
  ],
  "8": [
    { id: "lists-indices", title: "Lists and Indices", start: 81, end: 84 },
    { id: "modifying-lists", title: "Modifying Lists", start: 85, end: 86 },
    { id: "list-builtins", title: "Built-in Functions on Lists", start: 87, end: 88 },
    { id: "list-methods", title: "List Methods", start: 95, end: 96 },
    { id: "nested-lists", title: "Nested Lists", start: 97, end: 98 },
  ],
};

describe("Practical Programming pages", () => {
  it("opens a confirmed book section for every lecture, including 5–8", () => {
    expect(PRACTICAL_PROGRAMMING_GROUPS.map((group) => group.lectureId)).toEqual(
      CS1_LECTURES.map((lecture) => lecture.id),
    );
    const lectureOutline = new Set(
      CS1_LECTURES.flatMap((lecture) => lecture.sections.map((section) => section.outlineTitle))
    );
    const seen = new Set<string>();
    const earlyRanges: { start: number; end: number }[] = [];
    for (const group of PRACTICAL_PROGRAMMING_GROUPS) {
      expect(group.bookLabel).toContain("Practical Programming");
      expect(group.sections.length).toBeGreaterThan(0);
      const early = group.lectureId === "2" || group.lectureId === "3" || group.lectureId === "4";
      if (!early) {
        expect(group.sections.map(({ id, title, startPage, endPage }) => ({
          id,
          title,
          start: startPage,
          end: endPage,
        }))).toEqual(LATER_PAGES[group.lectureId]);
      }
      for (const section of group.sections) {
        expect(lectureOutline.has(section.title), section.title).toBe(false);
        expect(seen.has(section.id), section.id).toBe(false);
        seen.add(section.id);
        const preview = bookSectionPreview(section);
        expect(section.startPage).toBeGreaterThanOrEqual(17);
        expect(section.endPage).toBeLessThanOrEqual(early ? 67 : 130);
        expect(section.endPage).toBeGreaterThanOrEqual(section.startPage!);
        if (early) earlyRanges.push({ start: section.startPage!, end: section.endPage! });
        expect(preview.startBook).toBe(section.startPage);
        expect(preview.endBook).toBe(section.endPage);
        expect(isPracticalProgrammingHint(preview.sectionHint)).toBe(true);
        expect(formatBookPages(section)).toContain(String(section.startPage));
      }
    }
    for (let i = 0; i < earlyRanges.length; i += 1) {
      for (let j = i + 1; j < earlyRanges.length; j += 1) {
        const a = earlyRanges[i];
        const b = earlyRanges[j];
        expect(a.start <= b.end && b.start <= a.end).toBe(false);
      }
    }
  });

  it("opens Expressions on the printed pages for that section", () => {
    const expressions = PRACTICAL_PROGRAMMING_GROUPS[0]?.sections.find((section) => section.id === "expressions");
    expect(expressions).toMatchObject({ title: "Expressions", startPage: 19, endPage: 21 });
    expect(formatBookPages(expressions!)).toBe("pp. 19–21");
    expect(bookSectionPreview(expressions!).sectionHint).toBe("pp.expressions");
  });
});
