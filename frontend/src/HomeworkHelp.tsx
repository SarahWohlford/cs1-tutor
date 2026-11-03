import { useRef, useState } from "react";
import { apiUrl } from "./apiBase";
import { homeworkChatMessage, stripSolutionCode } from "./homeworkStrip";
import MarkdownMessage from "./MarkdownMessage";
import { useLocale } from "./i18n/LocaleContext";
import "./HomeworkHelp.css";

type Turn = { role: "user" | "assistant"; content: string };

const TEXT_EXT = /\.(txt|md|py|csv|json|text)$/i;
const MAX_TEXT_FILE = 200_000;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === "string" ? reader.result : "";
      const payload = value.split(",")[1] ?? "";
      if (!payload) reject(new Error("empty"));
      else resolve(payload);
    };
    reader.onerror = () => reject(reader.error ?? new Error("read"));
    reader.readAsDataURL(file);
  });
}

async function postJson(path: string, body: unknown) {
  const response = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json().catch(() => ({}))) as { reply?: string; detail?: string };
  return { ok: response.ok, status: response.status, data };
}

function detailMessage(detail: string | undefined): string {
  const text = (detail || "").trim();
  if (!text || text === "Not Found") return "";
  return text;
}

async function requestStart(
  pasted: string,
  pdfB64: string | null,
  turns: Turn[],
  message: string,
  language: string,
): Promise<string> {
  const dedicated = await postJson("/api/homework_help", {
    assignment: pasted,
    pdf_b64: pdfB64,
    history: turns,
    message,
    language,
  });
  if (dedicated.ok) return stripSolutionCode(dedicated.data.reply || "");
  if (dedicated.status !== 404) {
    throw new Error(detailMessage(dedicated.data.detail));
  }
  const chat = await postJson("/api/chat", {
    message: homeworkChatMessage(pasted, message, language),
    history: turns.map((turn) => ({
      sender: turn.role === "assistant" ? "ai" : "user",
      text: turn.content,
    })),
    pdf_b64: pasted ? null : pdfB64,
    textbook_id: "focs",
    silent: true,
  });
  if (!chat.ok) throw new Error(detailMessage(chat.data.detail));
  return stripSolutionCode(chat.data.reply || "");
}

function fileToText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(reader.error ?? new Error("read"));
    reader.readAsText(file);
  });
}

export default function HomeworkHelp() {
  const { t, chatLanguageSuffix } = useLocale();
  const fileRef = useRef<HTMLInputElement>(null);
  const [assignment, setAssignment] = useState("");
  const [pdfB64, setPdfB64] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [followUp, setFollowUp] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const ask = async (message: string) => {
    const pasted = assignment.trim();
    if (!pasted && !pdfB64 && !message.trim()) {
      setError(t("homework.needText"));
      return;
    }
    setBusy(true);
    setError("");
    try {
      const reply = await requestStart(pasted, pdfB64, turns, message, chatLanguageSuffix());
      if (!reply) {
        setError(t("homework.errRequest"));
        return;
      }
      const next: Turn[] = [];
      if (message.trim()) next.push({ role: "user", content: message.trim() });
      next.push({ role: "assistant", content: reply });
      setTurns((prev) => [...prev, ...next]);
      setFollowUp("");
    } catch (err) {
      const detail = err instanceof Error ? err.message.trim() : "";
      setError(detail || t("homework.errRequest"));
    } finally {
      setBusy(false);
    }
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    try {
      if (isPdf) {
        const payload = await fileToBase64(file);
        setPdfB64(payload);
        setFileName(file.name);
        return;
      }
      if (!TEXT_EXT.test(file.name) && !file.type.startsWith("text/")) {
        setError(t("homework.fileError"));
        return;
      }
      if (file.size > MAX_TEXT_FILE) {
        setError(t("homework.fileError"));
        return;
      }
      const text = (await fileToText(file)).trim();
      if (!text) {
        setError(t("homework.fileError"));
        return;
      }
      setPdfB64(null);
      setFileName(file.name);
      setAssignment(text);
    } catch {
      setError(t("homework.fileError"));
    }
  };

  const clearAll = () => {
    setAssignment("");
    setPdfB64(null);
    setFileName("");
    setTurns([]);
    setFollowUp("");
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const latestReply = [...turns].reverse().find((turn) => turn.role === "assistant");

  return (
    <div className="hw-page">
      <header className="hw-head">
        <div>
          <h1 className="hw-title">{t("homework.title")}</h1>
          <p className="hw-lede">{t("homework.lede")}</p>
        </div>
        <button type="button" className="hw-clear" onClick={clearAll}>
          {t("homework.clear")}
        </button>
      </header>

      <div className="hw-grid">
        <section className="hw-card" aria-label={t("homework.pasteLabel")}>
          <label className="hw-label" htmlFor="hw-assignment">
            {t("homework.pasteLabel")}
          </label>
          <textarea
            id="hw-assignment"
            className="hw-paste"
            value={assignment}
            placeholder={t("homework.pastePlaceholder")}
            onChange={(event) => setAssignment(event.target.value)}
          />
          <div className="hw-file-row">
            <button type="button" className="hw-file" onClick={() => fileRef.current?.click()}>
              {t("homework.file")}
            </button>
            <input
              ref={fileRef}
              className="hw-file-input"
              type="file"
              accept=".pdf,.txt,.md,.py,.csv,.json,text/plain,application/pdf"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                void onFile(file);
              }}
            />
            {fileName ? <span className="hw-file-name">{t("homework.usingFile", { name: fileName })}</span> : null}
          </div>
          <p className="hw-hint">{t("homework.fileHint")}</p>
          {error ? (
            <p className="hw-error" role="alert">
              {error}
            </p>
          ) : null}
          <button type="button" className="hw-start" disabled={busy} onClick={() => void ask("")}>
            {busy ? t("homework.working") : t("homework.start")}
          </button>
        </section>

        <section className="hw-card" aria-live="polite" aria-label={t("homework.replyTitle")}>
          <h2 className="hw-reply-title">{t("homework.replyTitle")}</h2>
          <p className="hw-nocode">{t("homework.noCode")}</p>
          {latestReply ? (
            <div className="hw-reply">
              <MarkdownMessage>{latestReply.content}</MarkdownMessage>
            </div>
          ) : (
            <p className="hw-waiting">{busy ? t("homework.working") : t("homework.pastePlaceholder")}</p>
          )}
          {latestReply ? (
            <form
              className="hw-follow"
              onSubmit={(event) => {
                event.preventDefault();
                if (!followUp.trim() || busy) return;
                void ask(followUp);
              }}
            >
              <label className="hw-label" htmlFor="hw-follow">
                {t("homework.followLabel")}
              </label>
              <div className="hw-follow-row">
                <input
                  id="hw-follow"
                  className="hw-follow-input"
                  value={followUp}
                  placeholder={t("homework.followPlaceholder")}
                  onChange={(event) => setFollowUp(event.target.value)}
                />
                <button type="submit" className="hw-send" disabled={busy || !followUp.trim()}>
                  {t("homework.send")}
                </button>
              </div>
            </form>
          ) : null}
        </section>
      </div>
    </div>
  );
}
