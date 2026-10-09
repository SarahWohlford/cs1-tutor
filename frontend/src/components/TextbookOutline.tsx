import { CS1_LECTURES, CS1_TEXTBOOK_NAME, sectionPreview } from "../data/cs1Lectures";
import type { OutlineSectionPreviewDetail } from "../LearningBarPanel";

export function TextbookOutline({
  onOpen,
}: {
  onOpen: (detail: OutlineSectionPreviewDetail) => void;
}) {
  return (
    <div className="sb-textbook-list" aria-label={CS1_TEXTBOOK_NAME}>
      <p className="sb-textbook-kicker">{CS1_TEXTBOOK_NAME}</p>
      {CS1_LECTURES.map((lecture) => (
        <section key={lecture.id}>
          <p className="sb-lecture-group">{lecture.practiceTitle}</p>
          <p className="sb-textbook-source">{lecture.textbookLabel}</p>
          <ul>
            {lecture.sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  className="sb-textbook-sec"
                  onClick={() => onOpen(sectionPreview(lecture, section))}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
