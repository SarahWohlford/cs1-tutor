import type { GuideScript } from "./types";

/** Guided-lesson slot. No course walkthrough is loaded. */
export const INDUCTION_GUIDE: GuideScript = {
  chapter: "",
  title: "No guided lesson loaded",
  steps: [
    {
      id: "guide-empty",
      label: "Note",
      kind: "read",
      title: "No guided lesson is loaded",
      body: "A course walkthrough has not been added. This panel does not teach a syllabus.",
    },
  ],
};
