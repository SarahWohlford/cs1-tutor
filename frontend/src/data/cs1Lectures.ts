import type { OutlineSectionPreviewDetail } from "../LearningBarPanel";

// Practical Programming is the course book. Lecture numbers are the course,
// not printed page numbers, so the two stay labeled apart.
export const CS1_TEXTBOOK_NAME = "Practical Programming";

export type Cs1Section = {
  id: string;
  title: string;
  outlineTitle: string;
};

export type Cs1Lecture = {
  id: "2" | "3" | "4";
  practiceTitle: string;
  textbookLabel: string;
  problemsTitle: string;
  problemsHint: string;
  sections: Cs1Section[];
};

function section(id: string, title: string): Cs1Section {
  return { id, title, outlineTitle: `${id} ${title}` };
}

export const CS1_LECTURES: Cs1Lecture[] = [
  {
    id: "2",
    practiceTitle: "Lecture 2 · Python as a calculator",
    textbookLabel: `${CS1_TEXTBOOK_NAME}, chapter 2`,
    problemsTitle: "2.13 Problems",
    problemsHint: "2.13",
    sections: [
      section("2.1", "Expressions and values"),
      section("2.2", "Whole-number division"),
      section("2.3", "float and int"),
      section("2.4", "Precedence"),
      section("2.5", "Variables and assignment"),
      section("2.6", "print"),
      section("2.7", "Variable names"),
      section("2.8", "Programs in a file"),
      section("2.9", "Syntax and semantic errors"),
      section("2.10", "Python keywords"),
      section("2.11", "Mixed operators"),
      section("2.12", "Expressions"),
    ],
  },
  {
    id: "3",
    practiceTitle: "Lecture 3 · Strings",
    textbookLabel: `${CS1_TEXTBOOK_NAME}, chapter 3`,
    problemsTitle: "3.7 Problems",
    problemsHint: "3.7",
    sections: [
      section("3.1", "Strings"),
      section("3.2", "Quotes and multiline strings"),
      section("3.3", "Escape characters"),
      section("3.4", "Concatenation and replication"),
      section("3.5", "len, str, int, and float"),
      section("3.6", "print and input"),
    ],
  },
  {
    id: "4",
    practiceTitle: "Lecture 4 · Functions and modules",
    textbookLabel: `${CS1_TEXTBOOK_NAME}, chapter 4`,
    problemsTitle: "4.8 Problems",
    problemsHint: "4.8",
    sections: [
      section("4.1", "Built-in functions"),
      section("4.2", "Objects and methods"),
      section("4.3", "String methods"),
      section("4.4", "The format method"),
      section("4.5", "Modules"),
      section("4.6", "How import works"),
      section("4.7", "Program structure"),
    ],
  },
];

export function lectureById(id: string): Cs1Lecture | null {
  return CS1_LECTURES.find((lecture) => lecture.id === id) ?? null;
}

export function lectureForHint(hint: string): Cs1Lecture | null {
  const chapter = hint.trim().split(".")[0] ?? "";
  return lectureById(chapter);
}

export function sectionInLecture(lecture: Cs1Lecture, hint: string): Cs1Section | null {
  return lecture.sections.find((section) => section.id === hint) ?? null;
}

export function practicePreview(lecture: Cs1Lecture): OutlineSectionPreviewDetail {
  return {
    sectionTitle: lecture.problemsTitle,
    path: `${lecture.practiceTitle}/${lecture.problemsTitle}`,
    startBook: 0,
    endBook: 0,
    sectionHint: lecture.problemsHint,
  };
}

export function lectureBarTitle(hint: string, problems: boolean): string | null {
  const lecture = lectureForHint(hint);
  if (!lecture) return null;
  if (problems) return lecture.practiceTitle;
  const section = sectionInLecture(lecture, hint);
  return section ? `${lecture.practiceTitle} · ${section.title}` : lecture.practiceTitle;
}

export function sectionPreview(lecture: Cs1Lecture, section: Cs1Section): OutlineSectionPreviewDetail {
  return {
    sectionTitle: section.outlineTitle,
    path: `${lecture.practiceTitle}/${section.outlineTitle}`,
    startBook: 0,
    endBook: 0,
    sectionHint: section.id,
  };
}
