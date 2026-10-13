import { useEffect, useState } from "react";
import { CS1_LECTURES, practicePreview } from "../data/cs1Lectures";
import { getPracticeSet } from "../data/focsPracticeSets";
import type { OutlineSectionPreviewDetail } from "../LearningBarPanel";
import { computeTier } from "../practice/masteryEngine";
import type { Tier } from "../practice/types";
import { PRACTICE_PROGRESS_EVENT, loadProgress } from "../utils/practiceProgress";

const TIER_LABEL: Record<Tier, string> = {
  not_started: "Not started",
  familiar: "Familiar",
  proficient: "Proficient",
  mastered: "Mastered",
};

const BUILTIN_BOOK = "focs";

export function LectureProgress({
  onOpen,
}: {
  onOpen: (detail: OutlineSectionPreviewDetail) => void;
}) {
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const refresh = () => setRevision((n) => n + 1);
    window.addEventListener(PRACTICE_PROGRESS_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(PRACTICE_PROGRESS_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return (
    <ul className="sb-lecture-list" aria-label="Learning progress by lecture">
      {CS1_LECTURES.map((lecture) => {
        const set = getPracticeSet(lecture.id);
        const tier = set ? computeTier(set, loadProgress(BUILTIN_BOOK, lecture.id)) : "not_started";
        return (
          <li key={`${lecture.id}-${revision}`}>
            <button
              type="button"
              className="sb-lecture-btn"
              onClick={() => onOpen(practicePreview(lecture))}
            >
              <span className="sb-lecture-name">{lecture.practiceTitle}</span>
              <span className="sb-lecture-source">{lecture.textbookLabel}</span>
              <span className={`sb-lecture-tier sb-lecture-tier--${tier}`}>{TIER_LABEL[tier]}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
