import { describe, expect, it } from "vitest";
import { CS1_LECTURES } from "./cs1Lectures";
import {
  PRACTICAL_PROGRAMMING_GROUPS,
  bookSectionPreview,
  formatBookPages,
  isPracticalProgrammingHint,
} from "./practicalProgramming";

describe("Practical Programming outline", () => {
  it("opens a study note for every lecture section, including lectures 2–4", () => {
    expect(PRACTICAL_PROGRAMMING_GROUPS.map((group) => group.lectureId)).toEqual(
      CS1_LECTURES.map((lecture) => lecture.id),
    );
    const seen = new Set<string>();
    for (const group of PRACTICAL_PROGRAMMING_GROUPS) {
      expect(group.bookLabel).toContain("Practical Programming");
      const lecture = CS1_LECTURES.find((item) => item.id === group.lectureId);
      expect(lecture).toBeTruthy();
      expect(group.sections.map((section) => section.noteHint)).toEqual(
        lecture!.sections.map((section) => section.id),
      );
      for (const section of group.sections) {
        expect(seen.has(section.id), section.id).toBe(false);
        seen.add(section.id);
        const preview = bookSectionPreview(section);
        expect(section.startPage).toBeUndefined();
        expect(section.endPage).toBeUndefined();
        expect(formatBookPages(section)).toBe("");
        expect(preview.startBook).toBe(0);
        expect(preview.endBook).toBe(0);
        expect(preview.sectionHint).toBe(section.noteHint);
        expect(isPracticalProgrammingHint(preview.sectionHint)).toBe(false);
      }
    }
  });

  it("opens the Lecture 2 expressions note instead of a printed page", () => {
    const expressions = PRACTICAL_PROGRAMMING_GROUPS[0]?.sections.find(
      (section) => section.noteHint === "2.12",
    );
    expect(expressions).toMatchObject({ title: "Expressions", noteHint: "2.12" });
    expect(formatBookPages(expressions!)).toBe("");
    expect(bookSectionPreview(expressions!).sectionHint).toBe("2.12");
    expect(bookSectionPreview(expressions!).startBook).toBe(0);
  });
});
