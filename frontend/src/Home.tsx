import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./Home.css";

export default function Home() {
  const { user, loading, setShowSignIn } = useAuth();

  return (
    <div className="home-scrap">
      <div className="home-inner">
        {/* scattered CS1 / Python glyphs */}
        <div className="hs-glyphs" aria-hidden>
          <span className="hs-g g1 mono">def</span>
          <span className="hs-g g2 mono">for</span>
          <span className="hs-g g3 mono">if</span>
          <span className="hs-g g4 mono">[]</span>
          <span className="hs-g g5 mono">{}</span>
          <span className="hs-g g6 mono">len</span>
          <span className="hs-g g7 mono">print</span>
          <span className="hs-g g8 mono">True</span>
          <span className="hs-g g9 mono">while</span>
          <span className="hs-g g10 mono">class</span>
        </div>

        <div className="hs-wrap">
          {/* HERO */}
          <section className="hs-hero">
            <div className="hs-hero-copy">
              <span className="hs-eyebrow">RPI CSCI 1100 · Fall 2026</span>
              <h1 className="hs-headline">
                CS1 Tutor<br />
                for <span className="hs-mark">Everyone</span>
              </h1>
              <p className="hs-lede">
                Ask a question, follow lecture and lab topics, practice Python, build computational thinking.
              </p>

              {!loading && user && (
                <div className="hs-signedin">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="hs-signedin-avatar" referrerPolicy="no-referrer" />
                  ) : null}
                  <span>
                    Signed in as <strong>{user.isAnonymous ? "Guest" : user.displayName || user.email}</strong>
                  </span>
                </div>
              )}

              <div className="hs-cta-row">
                <Link to="/learning" className="hs-btn-primary">
                  {user ? "Continue to Learning Mode" : "Start learning"} <span className="hs-arrow">→</span>
                </Link>
                {!loading && !user && <span className="hs-note">↜ free for students!</span>}
              </div>

              {!loading && !user && (
                <div className="hs-cta-row hs-cta-row--sub">
                  <button type="button" className="hs-btn-ghost" onClick={() => setShowSignIn(true)}>
                    Sign in
                  </button>
                  <p className="hs-microcopy">
                    Open Learning Mode without an account. <span className="hs-dot">●</span> Sign in to save
                    chats &amp; sync progress.
                  </p>
                </div>
              )}
            </div>

            {/* COLLAGE */}
            <div className="hs-collage">
              <figure className="hs-card hs-polaroid">
                <span className="hs-tape hs-tape--top" />
                <div className="hs-photo">
                  <svg viewBox="0 0 220 200" aria-hidden>
                    <g stroke="#0c1222" strokeWidth="2.4" fill="none">
                      <rect x="48" y="40" width="124" height="110" rx="6" />
                      <line x1="48" y1="62" x2="172" y2="62" />
                      <line x1="68" y1="88" x2="140" y2="88" />
                      <line x1="68" y1="108" x2="152" y2="108" />
                      <line x1="68" y1="128" x2="120" y2="128" />
                    </g>
                    <g fill="#14b8a6">
                      <circle cx="64" cy="51" r="5" />
                      <circle cx="80" cy="51" r="5" fill="#0c1222" />
                      <circle cx="96" cy="51" r="5" fill="#0c1222" />
                    </g>
                  </svg>
                  <span className="hs-glabel">print(&quot;hello&quot;)</span>
                </div>
                <figcaption className="hs-cap">
                  matched to your course <span className="hs-chk">✓</span>
                </figcaption>
              </figure>

              <div className="hs-card hs-sticky">
                <span className="hs-pin" />
                <div className="hs-kicker">Topic checklist</div>
                <ul>
                  <li className="done"><span className="hs-box">✓</span><span>Variables &amp; types</span></li>
                  <li className="done"><span className="hs-box">✓</span><span>Conditionals</span></li>
                  <li><span className="hs-box" /><span>Loops &amp; lists</span></li>
                  <li><span className="hs-box" /><span>Functions &amp; files</span></li>
                </ul>
              </div>

              <div className="hs-card hs-chat">
                <div className="hs-dots"><i /><i /><i /></div>
                <div className="hs-bubble q">
                  <code>for x in xs:</code> vs <code>while</code>?
                </div>
                <div className="hs-bubble a">
                  Use <code>for</code> when you know the sequence; use <code>while</code> when you stop on a condition.
                </div>
                <span className="hs-srctag">▦ CS1 · loops</span>
              </div>

              <div className="hs-card hs-formula">
                <span className="hs-pin hs-pin--pen" />
                <div className="hs-formula-lbl">list slice</div>
                <div className="hs-formula-eq">a[1:3]</div>
                <div className="hs-formula-sub">elements 1..2</div>
              </div>
            </div>
          </section>

          {/* PIPELINE */}
          <section className="hs-pipeline-sec">
            <div className="hs-pipeline">
              <div className="hs-pipeline-grid">
                <div className="hs-pl-copy">
                  <span className="hs-pl-label">how your tutor thinks</span>
                  <h2>
                    Personalize your <span className="hs-hl"><span>learning.</span></span>
                  </h2>
                  <p>
                    It doesn't just answer. It grounds explanations in your CS1 lecture and lab topics, lays
                    out a solution plan, then turns it into practice you can check.
                  </p>
                </div>
                <div className="hs-agents" aria-label="teaching pipeline">
                  <article className="hs-agent s1">
                    <div className="hs-agent-id">STEP 01 · COURSE</div>
                    <div className="hs-agent-t">Read the source</div>
                    <p>Definitions, examples, and in-class patterns from the section you're on get pulled into one grounded packet.</p>
                  </article>
                  <span className="hs-arrow-cx" aria-hidden />
                  <article className="hs-agent s2">
                    <div className="hs-agent-id">STEP 02 · PLAN</div>
                    <div className="hs-agent-t">Build the solution plan</div>
                    <p>Inputs, control flow, and the helpers you'll need get ordered like a study guide before any code dump.</p>
                  </article>
                  <span className="hs-arrow-cx" aria-hidden />
                  <article className="hs-agent s3">
                    <div className="hs-agent-id">STEP 03 · CHECK</div>
                    <div className="hs-agent-t">Teach, then test</div>
                    <p>The explanation becomes small exercises and checks — not a paragraph you trust blindly.</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* TOOLS */}
          <section className="hs-tools">
            <div className="hs-tools-head">
              <h2>Three ways to study.</h2>
              <p>pick one — they all share your progress.</p>
            </div>
            <div className="hs-tools-grid">
              <Link to="/learning" className="hs-tool">
                <span className="hs-tab">/learning</span>
                <div className="hs-ic">∴</div>
                <h3>Learning Mode</h3>
                <p>Ask in plain language. Get a course-matched explanation, step by step, with your topic checklist on the side.</p>
                <span className="hs-go">Start learning <span className="hs-arrow">→</span></span>
              </Link>
              <Link to="/autograder" className="hs-tool">
                <span className="hs-tab">/autograder</span>
                <div className="hs-ic">✓</div>
                <h3>Auto Grader</h3>
                <p>Drop a Question PDF and an Answer PDF. Get structured, criterion-by-criterion grading on problem sets.</p>
                <span className="hs-go">Grade a paper <span className="hs-arrow">→</span></span>
              </Link>
              <Link to="/profile" className="hs-tool">
                <span className="hs-tab">/profile</span>
                <div className="hs-ic">☺</div>
                <h3>My profile</h3>
                <p>Your course materials, appearance, and saved progress — synced across every session once you sign in.</p>
                <span className="hs-go">Open profile <span className="hs-arrow">→</span></span>
              </Link>
            </div>
          </section>
        </div>

        {/* ACES YOUR EXAMS */}
        <footer className="hs-acefoot">
          <div className="hs-acefoot-inner">
            <div className="hs-acefoot-grid">
              <div>
                <span className="hs-ace-eyebrow">last page before the exam</span>
                <h2>Aces Your Exams.</h2>
                <p className="hs-ace-sub">Your notes, your lectures, one workspace.</p>
                {user ? (
                  <Link to="/learning" className="hs-btn-create">
                    Continue learning <span>→</span>
                  </Link>
                ) : (
                  <button type="button" className="hs-btn-create" onClick={() => setShowSignIn(true)}>
                    Create free account <span>→</span>
                  </button>
                )}
                <div className="hs-ace-meta">© 2026 CS1 Tutor · equal education for everyone</div>
              </div>
              <aside className="hs-ace-checklist" aria-label="exam prep checklist">
                <div className="hs-ace-grade">A+</div>
                <h3>before test day</h3>
                <ul>
                  <li>Loops &amp; lists drilled</li>
                  <li>Functions practiced</li>
                  <li>Files &amp; dicts reviewed</li>
                </ul>
              </aside>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
