// Practice bank registry. FOCS chapter content removed for the CS1 retarget.
import focsTree from "./focsTree.json";
import { chapterOfProblems } from "../practice/isProblemsSection";
import type { PracticeSet } from "../practice/types";

const ALL_CHAPTER_SETS: PracticeSet[] = [];

export const FOCS_PROBLEM_CHAPTERS: string[] = (() => {
  const chapters = new Set<string>();
  collectProblemChapters(focsTree as Record<string, unknown>, chapters);
  return [...chapters].sort((a, b) => Number(a) - Number(b));
})();

export const FOCS_PRACTICE_SETS: Record<string, PracticeSet> = Object.fromEntries(
  ALL_CHAPTER_SETS.map((set) => [set.chapter, set]),
);

/** Practice set for a chapter token (e.g. "4"), or null if none is authored. */
export function getPracticeSet(chapter: string): PracticeSet | null {
  return FOCS_PRACTICE_SETS[chapter] ?? null;
}

function collectProblemChapters(node: Record<string, unknown>, chapters: Set<string>): void {
  for (const [key, value] of Object.entries(node)) {
    if (key === "_range" || key === "start" || key === "end") continue;
    const ch = chapterOfProblems(key);
    if (ch) chapters.add(ch);
    if (value && typeof value === "object") {
      collectProblemChapters(value as Record<string, unknown>, chapters);
    }
  }
}
