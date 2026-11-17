import { useState } from "react";
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
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="sb-textbook-list" aria-label={CS1_TEXTBOOK_NAME}>
      <p className="sb-textbook-kicker">{CS1_TEXTBOOK_NAME}</p>
      {PRACTICAL_PROGRAMMING_GROUPS.map((group) => {
        const open = openId === group.lectureId;
        return (
          <section key={group.lectureId}>
            <button
              type="button"
              className="sb-textbook-lecture"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : group.lectureId)}
            >
              <span className="sb-lecture-group">{group.lectureTitle}</span>
              <span className="sb-textbook-source">{group.bookLabel}</span>
            </button>
            {open ? (
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
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
