import { useEffect, useState } from "react";
import { PRACTICAL_PROGRAMMING_MISSING } from "../data/practicalProgramming";
import { useLocale } from "../i18n/LocaleContext";
import { loadBookExcerpt } from "./loadBookExcerpt";

type BookExcerptCardProps = {
  title: string;
  startPage: number;
  endPage: number;
  revision: number;
  onChooseFile: (file: File) => Promise<void>;
};

export function BookExcerptCard({
  title,
  startPage,
  endPage,
  revision,
  onChooseFile,
}: BookExcerptCardProps) {
  const { t } = useLocale();
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    void loadBookExcerpt(startPage, endPage, title)
      .then((excerpt) => {
        if (cancelled) return;
        setText(excerpt);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setText(null);
        setError(err instanceof Error && err.message ? err.message : PRACTICAL_PROGRAMMING_MISSING);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [title, startPage, endPage, revision]);

  const pages = startPage === endPage ? `p. ${startPage}` : `pp. ${startPage}–${endPage}`;

  return (
    <div className="section-note-card section-note-card--excerpt" id="book-excerpt">
      <div className="section-note-card-icon" aria-hidden>
        “
      </div>
      <div className="section-note-card-body">
        <h3 className="left-panel-section-note-heading">{t("note.fromTheBook")}</h3>
        <p className="section-note-excerpt-pages">{pages}</p>
        {loading ? (
          <p className="left-panel-section-note-text" role="status">
            {t("note.readingExcerpt")}
          </p>
        ) : null}
        {text ? <p className="left-panel-section-note-text">{text}</p> : null}
        {error ? (
          <div className="section-note-excerpt-missing">
            <p className="outline-preview-error" role="alert">
              {error}
            </p>
            {error === PRACTICAL_PROGRAMMING_MISSING ? (
              <label className="textbook-pdf-pick">
                Choose Practical Programming PDF
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (!file) return;
                    setLoading(true);
                    setError(null);
                    void onChooseFile(file).catch((err: unknown) => {
                      setLoading(false);
                      setError(
                        err instanceof Error && err.message ? err.message : PRACTICAL_PROGRAMMING_MISSING
                      );
                    });
                  }}
                />
              </label>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
