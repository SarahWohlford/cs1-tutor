import type { OutlineSectionPreviewDetail } from "../LearningBarPanel";
import { CS1_LECTURES, CS1_TEXTBOOK_NAME, type Cs1Lecture } from "./cs1Lectures";

// Served by Vite from frontend/public. The PDF itself is gitignored.
export const PRACTICAL_PROGRAMMING_PDF_URL = "/textbooks/practical-programming.pdf";

export const PRACTICAL_PROGRAMMING_MISSING =
  "Choose your Practical Programming PDF. It stays on this computer and is not uploaded.";

export type BookSection = {
  id: string;
  title: string;
  startPage?: number;
  endPage?: number;
  noteHint?: string;
};

export type BookGroup = {
  lectureId: Cs1Lecture["id"];
  lectureTitle: string;
  bookLabel: string;
  sections: BookSection[];
};

function range(
  id: string,
  title: string,
  startPage: number,
  endPage: number,
  noteHint: string
): BookSection {
  return { id, title, startPage, endPage, noteHint };
}

// Printed page numbers match this PDF: page 19 is PDF page 19.
// A section runs from its contents entry through the page before the next one.
// Lecture 2 uses the calculator pages in chapter 2. Function Basics and
// Built-in Functions are also chapter 2, and this course teaches them in Lecture 4.
// This edition numbers decisions as chapter 6 and lists as chapter 5. The course
// labels stay on the lecture; the rows below are the book sections those lectures use.
const PAGED: Record<"2" | "3" | "4", BookSection[]> = {
  "2": [
    range("big-picture", "The Big Picture", 17, 18, "2"),
    range("expressions", "Expressions", 19, 21, "2.1"),
    range("types", "What Is a Type?", 22, 24, "2.3"),
    range("variables", "Variables and the Assignment Statement", 25, 28, "2.5"),
    range("errors", "When Things Go Wrong", 29, 29, "2.9"),
    range("ch2-style", "Style Notes", 34, 34, "2.7"),
    range("ch2-summary", "Summary", 35, 35, "2"),
    range("ch2-exercises", "Exercises", 36, 38, "2.13"),
  ],
  "3": [
    range("strings", "Strings", 39, 41, "3.1"),
    range("escape", "Escape Characters", 42, 42, "3.3"),
    range("multiline", "Multiline Strings", 43, 43, "3.2"),
    range("print", "Print", 44, 44, "3.6"),
    range("formatted", "Formatted Printing", 45, 45, "3.6"),
    range("input", "User Input", 46, 46, "3.6"),
    range("ch3-summary", "Summary", 47, 47, "3"),
    range("ch3-exercises", "Exercises", 48, 49, "3.7"),
  ],
  "4": [
    range("function-basics", "Function Basics", 30, 32, "5.2"),
    range("builtins", "Built-in Functions", 33, 33, "4.1"),
    range("importing", "Importing Modules", 50, 53, "4.6"),
    range("own-modules", "Defining Your Own Modules", 54, 59, "4.5"),
    range("objects", "Objects and Methods", 60, 67, "4.2"),
  ],
};

// Later lectures keep one row per study note. Pages are only where this PDF
// actually covers that idea. A click opens the note, plus a short excerpt.
const LATER_PAGES: Record<string, { start: number; end: number }> = {
  "5.1": { start: 30, end: 32 },
  "5.2": { start: 30, end: 32 },
  "5.3": { start: 30, end: 33 },
  "5.4": { start: 30, end: 32 },
  "5.5": { start: 30, end: 32 },
  "5.6": { start: 30, end: 32 },
  "5.7": { start: 50, end: 53 },
  "5.8": { start: 54, end: 59 },
  "5.9": { start: 32, end: 33 },
  "6.1": { start: 108, end: 117 },
  "6.2": { start: 108, end: 117 },
  "6.3": { start: 108, end: 117 },
  "6.4": { start: 118, end: 124 },
  "6.5": { start: 118, end: 124 },
  "6.6": { start: 108, end: 117 },
  "6.7": { start: 108, end: 117 },
  "7.1": { start: 99, end: 100 },
  "7.2": { start: 99, end: 100 },
  "7.5": { start: 50, end: 53 },
  "7.6": { start: 64, end: 67 },
  "8.1": { start: 81, end: 84 },
  "8.2": { start: 84, end: 86 },
  "8.3": { start: 87, end: 88 },
  "8.4": { start: 95, end: 96 },
  "8.5": { start: 95, end: 96 },
  "8.6": { start: 97, end: 98 },
};

function sectionsFor(lecture: Cs1Lecture): BookSection[] {
  if (lecture.id === "2" || lecture.id === "3" || lecture.id === "4") return PAGED[lecture.id];
  return lecture.sections.map((section) => {
    const pages = LATER_PAGES[section.id];
    return {
      id: `note-${section.id}`,
      title: section.title,
      startPage: pages?.start,
      endPage: pages?.end,
      noteHint: section.id,
    };
  });
}

export const PRACTICAL_PROGRAMMING_GROUPS: BookGroup[] = CS1_LECTURES.map((lecture) => ({
  lectureId: lecture.id,
  lectureTitle: lecture.practiceTitle,
  bookLabel: lecture.textbookLabel,
  sections: sectionsFor(lecture),
}));

export function isPracticalProgrammingHint(hint: string): boolean {
  return hint.startsWith("pp.");
}

export function bookSectionPreview(section: BookSection): OutlineSectionPreviewDetail {
  const hasPages = section.startPage != null && section.endPage != null;
  return {
    sectionTitle: section.title,
    path: `${CS1_TEXTBOOK_NAME}/${section.title}`,
    startBook: hasPages ? section.startPage! : 0,
    endBook: hasPages ? section.endPage! : 0,
    sectionHint: section.noteHint ?? section.id,
  };
}

export function formatBookPages(section: BookSection): string {
  if (section.startPage == null || section.endPage == null) return "";
  return section.startPage === section.endPage
    ? `p. ${section.startPage}`
    : `pp. ${section.startPage}–${section.endPage}`;
}
