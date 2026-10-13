import { describe, expect, it } from "vitest";
import { CS1_LECTURES } from "./cs1Lectures";
import {
  PRACTICAL_PROGRAMMING_GROUPS,
  bookSectionPreview,
  formatBookPages,
  isPracticalProgrammingHint,
} from "./practicalProgramming";

describe("Practical Programming pages", () => {
  it("lists the book sections under each lecture, with page numbers", () => {
    expect(PRACTICAL_PROGRAMMING_GROUPS.map((group) => group.lectureId)).toEqual(["2", "3", "4"]);
    const lectureOutline = new Set(
      CS1_LECTURES.flatMap((lecture) => lecture.sections.map((section) => section.outlineTitle))
    );
    const seen = new Set<string>();
    const ranges: { start: number; end: number }[] = [];
    for (const group of PRACTICAL_PROGRAMMING_GROUPS) {
      expect(group.bookLabel).toContain("Practical Programming");
      expect(group.sections.length).toBeGreaterThan(0);
      for (const section of group.sections) {
        expect(lectureOutline.has(section.title), section.title).toBe(false);
        expect(seen.has(section.id), section.id).toBe(false);
        seen.add(section.id);
        expect(section.startPage).toBeGreaterThanOrEqual(17);
        expect(section.endPage).toBeLessThanOrEqual(67);
        expect(section.endPage).toBeGreaterThanOrEqual(section.startPage);
        ranges.push({ start: section.startPage, end: section.endPage });
        const preview = bookSectionPreview(section);
        expect(preview.startBook).toBe(section.startPage);
        expect(preview.endBook).toBe(section.endPage);
        expect(isPracticalProgrammingHint(preview.sectionHint)).toBe(true);
        expect(formatBookPages(section)).toContain(String(section.startPage));
      }
    }
    for (let i = 0; i < ranges.length; i += 1) {
      for (let j = i + 1; j < ranges.length; j += 1) {
        const a = ranges[i];
        const b = ranges[j];
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
