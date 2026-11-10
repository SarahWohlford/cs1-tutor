import { stripFocsMentions } from "./stripFocs";

export const WRITE_IT =
  "Write that part yourself. Use the idea above, and check it on a tiny example you make up.";

export type HomeworkStep = { title: string; lecture: string; tryThis: string };

const FENCE = /```[\s\S]*?```/gi;
const WRAP = /^```(?:markdown|md)?\s*\n([\s\S]*?)\n```\s*$/i;
const ASSIGN = /^[A-Za-z_][A-Za-z0-9_]*\s*(?:\+|-|\*|\/\/|\/|)?=\s*\S/;
const CALL = /^[A-Za-z_][\w.]*\s*\(/;
const EXCEPT = /^except(?:\s*:|\s+[A-Z(])/;
const KEYWORD = [
  "def ",
  "class ",
  "for ",
  "while ",
  "elif ",
  "else:",
  "return ",
  "import ",
  "from ",
  "print(",
  "try:",
  "with ",
];

function isCodeLine(line: string): boolean {
  const stripped = line.trim();
  if (!stripped || stripped.startsWith("#")) return false;
  const token = stripped.split(/\s/)[0].split("#")[0].replace(/:$/, "");
  if (token === "pass" || token === "break" || token === "continue") {
    const rest = stripped.slice(token.length).trimStart();
    if (!rest || rest.startsWith("#") || rest.startsWith(":")) return true;
  }
  if (KEYWORD.some((word) => stripped.startsWith(word))) return true;
  if (EXCEPT.test(stripped)) return true;
  if (stripped.startsWith("if ") && (stripped.endsWith(":") || stripped.includes("("))) return true;
  if (CALL.test(stripped) && !stripped.endsWith(".")) return true;
  return ASSIGN.test(stripped) && !stripped.endsWith(".");
}

export function stripSolutionCode(answer: string): string {
  let text = (answer || "").trim();
  const wrapped = WRAP.exec(text);
  if (wrapped) text = wrapped[1].trim();
  text = text.replace(FENCE, WRITE_IT);
  const kept: string[] = [];
  let codeRun = false;
  for (const line of text.split("\n")) {
    if (isCodeLine(line)) {
      if (!codeRun) {
        kept.push(WRITE_IT);
        codeRun = true;
      }
      continue;
    }
    codeRun = false;
    kept.push(line);
  }
  return kept
    .join("\n")
    .replace(new RegExp(`(?:${WRITE_IT.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n?){2,}`, "g"), `${WRITE_IT}\n`)
    .trim();
}

function extractJsonArray(text: string): unknown[] | null {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start < 0 || end <= start) return null;
  try {
    const parsed = JSON.parse(text.slice(start, end + 1)) as unknown;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function cleanField(value: string): string {
  return stripFocsMentions(stripSolutionCode(value)).trim();
}

function stepFromRecord(item: unknown): HomeworkStep | null {
  if (!item || typeof item !== "object") return null;
  const record = item as Record<string, unknown>;
  const title = cleanField(String(record.title || ""));
  const lecture = cleanField(String(record.lecture || ""));
  const tryThis = cleanField(String(record.try || record.tryThis || record.detail || ""));
  if (!title && !tryThis) return null;
  return {
    title: title || "Next part",
    lecture,
    tryThis: tryThis || title,
  };
}

export function parseHomeworkSteps(raw: string): HomeworkStep[] {
  const fromJson = extractJsonArray(raw || "")
    ?.map(stepFromRecord)
    .filter((step): step is HomeworkStep => !!step);
  if (fromJson && fromJson.length) return fromJson.slice(0, 6);
  const stripped = stripFocsMentions(stripSolutionCode(raw || ""));
  const chunks = stripped
    .split(/\n(?=\s*\d+[.)]\s+)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  if (chunks.length >= 2) {
    return chunks.slice(0, 6).map((chunk) => {
      const lines = chunk
        .replace(/^\d+[.)]\s*/, "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      return {
        title: lines[0] || "Next part",
        lecture: "",
        tryThis: lines.slice(1).join(" ") || lines[0] || "Next part",
      };
    });
  }
  if (!stripped) return [];
  return [{ title: "Start here", lecture: "", tryThis: stripped }];
}

export function homeworkChatMessage(assignment: string, followUp: string, language: string): string {
  const parts = [
    "This is the student's CSCI 1100 Python homework. Help them start one part at a time.",
    "Never mention FOCS or Foundations of Computer Science. That is a different course.",
    "Do not write Python code, pseudocode, or a finished function.",
    "Do not fill in the answer, the output, or a worked example.",
    "Return ONLY a JSON array of 4 to 6 tasks, in order. No other text.",
    'Each task is {"title":"short name","lecture":"a loaded CSCI 1100 lecture, or empty","try":"one sentence they do by hand"}.',
  ];
  const pasted = assignment.trim();
  if (pasted) parts.push("", "Assignment:", pasted);
  else parts.push("", "The assignment is the attached PDF.");
  const follow = followUp.trim();
  if (follow) parts.push("", follow);
  const hint = language.trim();
  if (hint) parts.push("", hint.slice(0, 400));
  return parts.join("\n");
}
