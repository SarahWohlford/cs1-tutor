import { describe, expect, it } from "vitest";
import { CS1_LECTURES } from "./cs1Lectures";
import { FOCS_SECTION_NOTES } from "./focsSectionNotes";
import {
  PRACTICAL_PROGRAMMING_GROUPS,
  bookSectionPreview,
  formatBookPages,
} from "./practicalProgramming";

const LATER_PAGES: Record<string, { id: string; title: string; start?: number; end?: number; note: string }[]> = {
  "5": [
    { id: "note-5.1", title: "Why functions", start: 30, end: 32, note: "5.1" },
    { id: "note-5.2", title: "def, return, and indentation", start: 30, end: 32, note: "5.2" },
    { id: "note-5.3", title: "Parameters, arguments, and local variables", start: 30, end: 33, note: "5.3" },
    { id: "note-5.4", title: "Flow of control", start: 30, end: 32, note: "5.4" },
    { id: "note-5.5", title: "Functions calling functions", start: 30, end: 32, note: "5.5" },
    { id: "note-5.6", title: "Multiple parameters", start: 30, end: 32, note: "5.6" },
    { id: "note-5.7", title: "math.pi", start: 50, end: 53, note: "5.7" },
    { id: "note-5.8", title: "Program structure", start: 54, end: 59, note: "5.8" },
    { id: "note-5.9", title: "Encapsulation", start: 32, end: 33, note: "5.9" },
  ],
  "6": [
    { id: "note-6.1", title: "Boolean values", start: 108, end: 117, note: "6.1" },
    { id: "note-6.2", title: "Relational operators", start: 108, end: 117, note: "6.2" },
    { id: "note-6.3", title: "== versus =", start: 108, end: 117, note: "6.3" },
    { id: "note-6.4", title: "if and else", start: 118, end: 124, note: "6.4" },
    { id: "note-6.5", title: "elif", start: 118, end: 124, note: "6.5" },
    { id: "note-6.6", title: "and, or, and not", start: 108, end: 117, note: "6.6" },
    { id: "note-6.7", title: "Inclusive or", start: 108, end: 117, note: "6.7" },
  ],
  "7": [
    { id: "note-7.1", title: "Tuple indexing", start: 99, end: 100, note: "7.1" },
    { id: "note-7.2", title: "Immutability", start: 99, end: 100, note: "7.2" },
    { id: "note-7.3", title: "Multiple assignment", note: "7.3" },
    { id: "note-7.4", title: "Returning two values", note: "7.4" },
    { id: "note-7.5", title: "Import and module functions", start: 50, end: 53, note: "7.5" },
    { id: "note-7.6", title: "Images", start: 64, end: 67, note: "7.6" },
    { id: "note-7.7", title: "Skills already taught", note: "7.7" },
  ],
  "8": [
    { id: "note-8.1", title: "List syntax and indexing", start: 81, end: 84, note: "8.1" },
    { id: "note-8.2", title: "Changing items and negative indexes", start: 84, end: 86, note: "8.2" },
    { id: "note-8.3", title: "sum, max, and min", start: 87, end: 88, note: "8.3" },
    { id: "note-8.4", title: "sort versus sorted", start: 95, end: 96, note: "8.4" },
    { id: "note-8.5", title: "append, insert, pop, and remove", start: 95, end: 96, note: "8.5" },
    { id: "note-8.6", title: "Lists of lists", start: 97, end: 98, note: "8.6" },
  ],
};

describe("Practical Programming pages", () => {
  it("keeps a study note and confirmed pages for every lecture, including 5–8", () => {
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
        expect(group.sections.map(({ id, title, startPage, endPage, noteHint }) => ({
          id,
          title,
          start: startPage,
          end: endPage,
          note: noteHint,
        }))).toEqual(LATER_PAGES[group.lectureId]);
      }
      for (const section of group.sections) {
        expect(lectureOutline.has(section.title), section.title).toBe(false);
        expect(seen.has(section.id), section.id).toBe(false);
        seen.add(section.id);
        const preview = bookSectionPreview(section);
        expect(FOCS_SECTION_NOTES[preview.sectionHint], preview.sectionHint).toBeTruthy();
        if (section.startPage == null || section.endPage == null) {
          expect(preview.startBook).toBe(0);
          expect(preview.endBook).toBe(0);
          expect(formatBookPages(section)).toBe("");
          continue;
        }
        expect(section.startPage).toBeGreaterThanOrEqual(17);
        expect(section.endPage).toBeLessThanOrEqual(early ? 67 : 130);
        expect(section.endPage).toBeGreaterThanOrEqual(section.startPage);
        if (early) earlyRanges.push({ start: section.startPage, end: section.endPage });
        expect(preview.startBook).toBe(section.startPage);
        expect(preview.endBook).toBe(section.endPage);
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
    expect(bookSectionPreview(expressions!).sectionHint).toBe("2.1");
  });
});
