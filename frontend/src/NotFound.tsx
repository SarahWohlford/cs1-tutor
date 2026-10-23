import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found__code">404 · LOST IN THE SYLLABUS</p>
      <h1>This page is not in the lesson plan.</h1>
      <p>The link may be outdated, or the page may have moved.</p>
      <div className="not-found__actions">
        <Link to="/" className="not-found__primary">Back home</Link>
        <Link to="/learning" className="not-found__secondary">Open Learning Mode</Link>
      </div>
    </main>
  );
}
