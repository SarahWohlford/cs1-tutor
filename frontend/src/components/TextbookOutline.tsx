import { CS1_TEXTBOOK_NAME } from "../data/cs1Lectures";
import {
  PRACTICAL_PROGRAMMING_GROUPS,
  bookSectionPreview,
  formatBookPages,
} from "../data/practicalProgramming";
import type { OutlineSectionPreviewDetail } from "../LearningBarPanel";

export function TextbookOutline({
  onOpen,
}: {
  onOpen: (detail: OutlineSectionPreviewDetail) => void;
}) {
  return (
    <div className="sb-textbook-list" aria-label={CS1_TEXTBOOK_NAME}>
      <p className="sb-textbook-kicker">{CS1_TEXTBOOK_NAME}</p>
      {PRACTICAL_PROGRAMMING_GROUPS.map((group) => (
        <section key={group.lectureId}>
          <p className="sb-lecture-group">{group.lectureTitle}</p>
          <p className="sb-textbook-source">{group.bookLabel}</p>
          <ul>
            {group.sections.map((section) => {
              const pages = formatBookPages(section);
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    className="sb-textbook-sec"
                    onClick={() => onOpen(bookSectionPreview(section))}
                  >
                    <span className="sb-textbook-title">{section.title}</span>
                    {pages ? <span className="sb-textbook-pages">{pages}</span> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
