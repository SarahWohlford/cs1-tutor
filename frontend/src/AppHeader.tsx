import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLocale } from "./i18n/LocaleContext";

export const OPEN_TEXTBOOK_EVENT = "cs1-open-textbook";

export function requestOpenTextbook(): void {
  try {
    localStorage.setItem("sidebar-open-textbook", "1");
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(OPEN_TEXTBOOK_EVENT));
}

export default function AppHeader() {
  const { t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const onLearning = location.pathname.startsWith("/learning");
  const onHomework = location.pathname.startsWith("/homework");

  const openTextbook = () => {
    requestOpenTextbook();
    if (!onLearning) navigate("/learning");
  };

  return (
    <header className="cs1-header">
      <Link to="/" className="cs1-logo">
        <span className="cs1-logo-mark" aria-hidden="true">Py</span>
        <span className="cs1-logo-text">
          <span className="cs1-logo-name">CS1 Tutor</span>
          <span className="cs1-logo-sub">Python · CSCI 1100</span>
        </span>
      </Link>
      <nav className="cs1-nav" aria-label="Study">
        <Link to="/learning" className={onLearning ? "is-active" : undefined}>
          {t("sidebar.learningMode")}
        </Link>
        <button type="button" onClick={openTextbook}>
          Textbook
        </button>
        <Link to="/homework" className={onHomework ? "is-active" : undefined}>
          {t("sidebar.homework")}
        </Link>
      </nav>
    </header>
  );
}
