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

function sectionsFor(lecture: Cs1Lecture): BookSection[] {
  return lecture.sections.map((section) => ({
    id: `note-${section.id}`,
    title: section.title,
    noteHint: section.id,
  }));
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
