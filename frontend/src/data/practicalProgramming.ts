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

function range(id: string, title: string, startPage: number, endPage: number): BookSection {
  return { id, title, startPage, endPage };
}

// Printed page numbers match this PDF: page 19 is PDF page 19.
// A section runs from its contents entry through the page before the next one.
// Lecture 2 uses the calculator pages in chapter 2. Function Basics and
// Built-in Functions are also chapter 2, and this course teaches them in Lecture 4.
// This edition numbers decisions as chapter 6 and lists as chapter 5. The course
// labels stay on the lecture; the rows below are the book sections those lectures use.
const PAGED: Record<"2" | "3" | "4" | "5" | "6" | "7" | "8", BookSection[]> = {
  "2": [
    range("big-picture", "The Big Picture", 17, 18),
    range("expressions", "Expressions", 19, 21),
    range("types", "What Is a Type?", 22, 24),
    range("variables", "Variables and the Assignment Statement", 25, 28),
    range("errors", "When Things Go Wrong", 29, 29),
    range("ch2-style", "Style Notes", 34, 34),
    range("ch2-summary", "Summary", 35, 35),
    range("ch2-exercises", "Exercises", 36, 38),
  ],
  "3": [
    range("strings", "Strings", 39, 41),
    range("escape", "Escape Characters", 42, 42),
    range("multiline", "Multiline Strings", 43, 43),
    range("print", "Print", 44, 44),
    range("formatted", "Formatted Printing", 45, 45),
    range("input", "User Input", 46, 46),
    range("ch3-summary", "Summary", 47, 47),
    range("ch3-exercises", "Exercises", 48, 49),
  ],
  "4": [
    range("function-basics", "Function Basics", 30, 32),
    range("builtins", "Built-in Functions", 33, 33),
    range("importing", "Importing Modules", 50, 53),
    range("own-modules", "Defining Your Own Modules", 54, 59),
    range("objects", "Objects and Methods", 60, 67),
  ],
  "5": [
    range("l5-function-basics", "Function Basics", 30, 32),
    range("l5-importing", "Importing Modules", 50, 53),
  ],
  "6": [
    range("boolean-logic", "Boolean Logic", 108, 117),
    range("if-statements", "if Statements", 118, 124),
    range("storing-conditionals", "Storing Conditionals", 125, 125),
    range("ch6-summary", "Summary", 126, 126),
    range("ch6-exercises", "Exercises", 127, 130),
  ],
  "7": [
    range("l7-importing", "Importing Modules", 50, 53),
    // "Images" begins on page 64. The next contents entry, Pixels and Colors, is page 68.
    range("images", "Images", 64, 67),
    // Tuple indexing starts on page 99. Immutability is at the top of page 100,
    // before section 5.10 Files as Lists begins on that same page.
    range("sequences", "Other Kinds of Sequences", 99, 100),
  ],
  "8": [
    range("lists-indices", "Lists and Indices", 81, 84),
    range("modifying-lists", "Modifying Lists", 85, 86),
    range("list-builtins", "Built-in Functions on Lists", 87, 88),
    range("list-methods", "List Methods", 95, 96),
    range("nested-lists", "Nested Lists", 97, 98),
  ],
};

function sectionsFor(lecture: Cs1Lecture): BookSection[] {
  return PAGED[lecture.id];
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
    sectionHint: hasPages ? `pp.${section.id}` : (section.noteHint ?? section.id),
  };
}

export function formatBookPages(section: BookSection): string {
  if (section.startPage == null || section.endPage == null) return "";
  return section.startPage === section.endPage
    ? `p. ${section.startPage}`
    : `pp. ${section.startPage}–${section.endPage}`;
}
