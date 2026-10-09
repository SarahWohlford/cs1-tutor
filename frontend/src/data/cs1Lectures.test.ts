import { describe, expect, it } from "vitest";
import { CS1_LECTURES, lectureBarTitle, lectureForHint } from "./cs1Lectures";
import { FOCS_SECTION_NOTES } from "./focsSectionNotes";
import { getPracticeSet } from "./focsPracticeSets";
import { isProblemsSection } from "../practice/isProblemsSection";

describe("CS1 lectures", () => {
  it("groups each loaded lecture and keeps the textbook label separate", () => {
    expect(CS1_LECTURES.map((lecture) => lecture.id)).toEqual(["2", "3", "4"]);
    for (const lecture of CS1_LECTURES) {
      expect(lecture.practiceTitle.startsWith(`Lecture ${lecture.id}`)).toBe(true);
      expect(lecture.textbookLabel).toContain("Practical Programming");
      expect(lecture.textbookLabel).toContain(lecture.id === "4" ? "chapters 2 and 4" : `chapter ${lecture.id}`);
      expect(isProblemsSection(lecture.problemsTitle)).toBe(true);
      expect(getPracticeSet(lecture.id)).not.toBeNull();
      for (const section of lecture.sections) {
        expect(FOCS_SECTION_NOTES[section.id], section.id).toBeTruthy();
        expect(section.outlineTitle.startsWith(section.id)).toBe(true);
      }
    }
  });

  it("names a clicked section by lecture, and a problem set by the lecture only", () => {
    expect(lectureForHint("2.2")?.id).toBe("2");
    expect(lectureBarTitle("2.2", false)).toBe(
      "Lecture 2 · Python as a calculator · Whole-number division"
    );
    expect(lectureBarTitle("2.13", true)).toBe("Lecture 2 · Python as a calculator");
  });
});
