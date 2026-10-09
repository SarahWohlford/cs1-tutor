import type { OutlineSectionPreviewDetail } from "../LearningBarPanel";
import { CS1_LECTURES, CS1_TEXTBOOK_NAME } from "./cs1Lectures";

// Served by Vite from frontend/public. The PDF itself is gitignored.
export const PRACTICAL_PROGRAMMING_PDF_URL = "/textbooks/practical-programming.pdf";

export const PRACTICAL_PROGRAMMING_MISSING =
  "Save Practical Programming as frontend/public/textbooks/practical-programming.pdf, then refresh.";

export type BookSection = {
  id: string;
  title: string;
  startPage: number;
  endPage: number;
};

export type BookGroup = {
  lectureId: "2" | "3" | "4";
  lectureTitle: string;
  bookLabel: string;
  sections: BookSection[];
};

function range(id: string, title: string, startPage: number, endPage: number): BookSection {
  return { id, title, startPage, endPage };
}

// Printed page numbers match this PDF: page 19 is PDF page 19.
// Lecture 2 uses the calculator pages in chapter 2. Function Basics and
// Built-in Functions are also chapter 2, and this course teaches them in Lecture 4.
const SECTIONS: Record<"2" | "3" | "4", BookSection[]> = {
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
};

export const PRACTICAL_PROGRAMMING_GROUPS: BookGroup[] = CS1_LECTURES.map((lecture) => ({
  lectureId: lecture.id,
  lectureTitle: lecture.practiceTitle,
  bookLabel: lecture.textbookLabel,
  sections: SECTIONS[lecture.id],
}));

export function isPracticalProgrammingHint(hint: string): boolean {
  return hint.startsWith("pp.");
}

export function bookSectionPreview(section: BookSection): OutlineSectionPreviewDetail {
  return {
    sectionTitle: section.title,
    path: `${CS1_TEXTBOOK_NAME}/${section.title}`,
    startBook: section.startPage,
    endBook: section.endPage,
    sectionHint: `pp.${section.id}`,
  };
}

export function formatBookPages(section: BookSection): string {
  return section.startPage === section.endPage
    ? `p. ${section.startPage}`
    : `pp. ${section.startPage}–${section.endPage}`;
}
