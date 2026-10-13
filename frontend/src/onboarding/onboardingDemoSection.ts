import type { OutlineSectionPreviewDetail } from "../LearningBarPanel";

// Onboarding opens Lecture 2 notes. There is no textbook PDF, so page numbers stay unset.
export const ONBOARDING_NOTE_SECTION: OutlineSectionPreviewDetail = {
  sectionTitle: "2.1 Expressions and values",
  path: "2 Python as a Calculator/2.1 Expressions and values",
  startBook: 0,
  endBook: 0,
  sectionHint: "2.1",
};

// Expand Lecture 2 in the progress tree during the tour.
export const ONBOARDING_INDUCTION_EXPAND_PATHS: string[] = ["2 Python as a Calculator"];

// Onboarding practice-step target: Lecture 2 exercises.
export const ONBOARDING_PROBLEMS_SECTION: OutlineSectionPreviewDetail = {
  sectionTitle: "2.13 Problems",
  path: "2 Python as a Calculator/2.13 Problems",
  startBook: 0,
  endBook: 0,
  sectionHint: "2.13",
};
