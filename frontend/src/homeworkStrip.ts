export const WRITE_IT =
  "Write that part yourself. Use the idea above, and check it on a tiny example you make up.";

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

export function homeworkChatMessage(assignment: string, followUp: string, language: string): string {
  const parts = [
    "This is the student's homework. Help them start.",
    "Do not write Python code, pseudocode, or a finished function.",
    "Do not fill in the answer, the output, or a worked example.",
    "Name the ideas and which loaded CSCI 1100 lecture covers each idea.",
    "Give a start plan in plain sentences: what to read, what to try by hand on a two-item example, and what to check.",
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
