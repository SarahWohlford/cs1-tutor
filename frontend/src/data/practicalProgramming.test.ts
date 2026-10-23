import { describe, expect, it } from "vitest";
import { CS1_LECTURES } from "./cs1Lectures";
import {
  PRACTICAL_PROGRAMMING_GROUPS,
  bookSectionPreview,
  formatBookPages,
  isPracticalProgrammingHint,
} from "./practicalProgramming";

describe("Practical Programming pages", () => {
  it("lists paged book sections for lectures 2–4 and notes without pages after that", () => {
    expect(PRACTICAL_PROGRAMMING_GROUPS.map((group) => group.lectureId)).toEqual(
      CS1_LECTURES.map((lecture) => lecture.id),
    );
    const lectureOutline = new Set(
      CS1_LECTURES.flatMap((lecture) => lecture.sections.map((section) => section.outlineTitle))
    );
    const seen = new Set<string>();
    const ranges: { start: number; end: number }[] = [];
    for (const group of PRACTICAL_PROGRAMMING_GROUPS) {
      expect(group.bookLabel).toContain("Practical Programming");
      expect(group.sections.length).toBeGreaterThan(0);
      const lecture = CS1_LECTURES.find((item) => item.id === group.lectureId);
      expect(lecture).toBeTruthy();
      const paged = group.lectureId === "2" || group.lectureId === "3" || group.lectureId === "4";
      if (!paged) {
        expect(group.sections.map((section) => section.noteHint)).toEqual(
          lecture!.sections.map((section) => section.id),
        );
      }
      for (const section of group.sections) {
        expect(lectureOutline.has(section.title), section.title).toBe(false);
        expect(seen.has(section.id), section.id).toBe(false);
        seen.add(section.id);
        const preview = bookSectionPreview(section);
        if (paged) {
          expect(section.startPage).toBeGreaterThanOrEqual(17);
          expect(section.endPage).toBeLessThanOrEqual(67);
          expect(section.endPage).toBeGreaterThanOrEqual(section.startPage!);
          ranges.push({ start: section.startPage!, end: section.endPage! });
          expect(preview.startBook).toBe(section.startPage);
          expect(preview.endBook).toBe(section.endPage);
          expect(isPracticalProgrammingHint(preview.sectionHint)).toBe(true);
          expect(formatBookPages(section)).toContain(String(section.startPage));
        } else {
          expect(section.startPage).toBeUndefined();
          expect(section.endPage).toBeUndefined();
          expect(formatBookPages(section)).toBe("");
          expect(preview.startBook).toBe(0);
          expect(preview.endBook).toBe(0);
          expect(preview.sectionHint).toBe(section.noteHint);
          expect(isPracticalProgrammingHint(preview.sectionHint)).toBe(false);
        }
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
