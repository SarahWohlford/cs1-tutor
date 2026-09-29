import type { OutlineSectionPreviewDetail } from "../LearningBarPanel";

/** Onboarding preview targets. No course section is loaded. */
export const ONBOARDING_NOTE_SECTION: OutlineSectionPreviewDetail = {
  sectionTitle: "Course outline not loaded",
  path: "",
  startBook: 0,
  endBook: 0,
  sectionHint: "",
};

/** Nothing to expand until an outline is loaded. */
export const ONBOARDING_INDUCTION_EXPAND_PATHS: string[] = [];

/** Onboarding practice-step target. No problem bank is loaded. */
export const ONBOARDING_PROBLEMS_SECTION: OutlineSectionPreviewDetail = {
  sectionTitle: "Practice bank not loaded",
  path: "",
  startBook: 0,
  endBook: 0,
  sectionHint: "",
};
