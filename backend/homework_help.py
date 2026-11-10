"""Help a student start a CSCI 1100 homework without writing the solution."""

from __future__ import annotations

import base64
import re
from typing import Any

MAX_ASSIGNMENT_CHARS = 12_000
MAX_PDF_BYTES = 8 * 1024 * 1024
MAX_PDF_PAGES = 8
WRITE_IT = "Write that part yourself. Use the idea above, and check it on a tiny example you make up."
EMPTY_REPLY = (
    "Start by naming the inputs and the output in words. "
    "Then open the lecture that matches that idea, and try the first step on a two-item example you make up."
)

_FENCE = re.compile(r"```[\s\S]*?```", re.I)
_WRAP = re.compile(r"^```(?:markdown|md)?\s*\n([\s\S]*?)\n```\s*$", re.I)
_ASSIGN = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*\s*(?:\+|-|\*|//|/|)?=\s*\S")
_KEYWORD = (
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
)


class HomeworkInputError(Exception):
    pass


_FOCS = re.compile(
    r"\bfocs\b|foundations of computer science|strong induction|proof by induction|"
    r"mathematical induction|discrete mathematics|discrete objects|making precise statements|"
    r"turing machines?|finite automata|context[- ]free|asymptotics|number theory|"
    r"conditional probability|random variables|expected value|unsolvable problems|"
    r"\bnp-complete\b|recursive objects|matching and coloring|proving [\"“']for all",
    re.I,
)


def strip_focs_mentions(answer: str) -> str:
    lines: list[str] = []
    for line in (answer or "").splitlines():
        kept = [part.strip() for part in re.split(r"(?<=[.!?])\s+", line) if part.strip() and not _FOCS.search(part)]
        lines.append(" ".join(kept))
    return re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()


def system_prompt(outline: str) -> str:
    loaded = (outline or "").strip() or "Lectures 2 and later that are loaded in the tutor."
    return (
        "You help a CSCI 1100 student get started on a homework assignment. "
        "The student pasted the assignment. You do not have a solution key.\n"
        "Rules:\n"
        "- Do not write Python code, pseudocode, or a finished function.\n"
        "- Do not fill in the answer, the output, or the numbers the program should print.\n"
        "- Do not complete any step of the assignment.\n"
        "- Never mention FOCS or Foundations of Computer Science. That is a different course. "
        "Do not name its chapters or topics.\n"
        "- Name the ideas they should use, and name which loaded lecture covers each idea. "
        "Use only lectures in the outline below.\n"
        "- Return ONLY a JSON array of 4 to 6 tasks, in order. No other text.\n"
        '- Each task is {"title":"short name","lecture":"a loaded lecture, or empty","try":"one sentence they do by hand"}.\n'
        "- If they ask for the code or the answer, refuse and point them back to the idea and the lecture.\n"
        "- If the assignment is unclear, say what is missing. Do not invent a different assignment.\n\n"
        f"Loaded lectures:\n{loaded}"
    )


_CALL = re.compile(r"^[A-Za-z_][\w.]*\s*\(")
_EXCEPT = re.compile(r"^except(?:\s*:|\s+[A-Z(])")


def is_code_line(line: str) -> bool:
    stripped = line.strip()
    if not stripped or stripped.startswith("#"):
        return False
    token = stripped.split()[0].split("#", 1)[0].rstrip(":")
    if token in {"pass", "break", "continue"} and stripped.startswith(token):
        rest = stripped[len(token):].lstrip()
        if not rest or rest.startswith("#") or rest.startswith(":"):
            return True
    if stripped.startswith(_KEYWORD):
        return True
    if _EXCEPT.match(stripped):
        return True
    if stripped.startswith("if ") and (stripped.endswith(":") or "(" in stripped):
        return True
    if _CALL.match(stripped) and not stripped.endswith("."):
        return True
    return bool(_ASSIGN.match(stripped) and not stripped.endswith("."))


def strip_solution_code(answer: str) -> str:
    text = (answer or "").strip()
    wrapped = _WRAP.match(text)
    if wrapped:
        text = wrapped.group(1).strip()
    text = _FENCE.sub(WRITE_IT, text)
    lines = text.splitlines()
    kept: list[str] = []
    code_run = False
    for line in lines:
        if is_code_line(line):
            if not code_run:
                kept.append(WRITE_IT)
                code_run = True
            continue
        code_run = False
        kept.append(line)
    cleaned = "\n".join(kept)
    cleaned = re.sub(rf"(?:{re.escape(WRITE_IT)}\n?){{2,}}", WRITE_IT + "\n", cleaned)
    return strip_focs_mentions(cleaned.strip())


def assignment_text(assignment: str, pdf_b64: str | None) -> str:
    parts: list[str] = []
    pasted = (assignment or "").strip()
    if pasted:
        parts.append(pasted)
    raw_b64 = (pdf_b64 or "").strip()
    if raw_b64:
        payload = raw_b64.split(",", 1)[-1]
        try:
            pdf_bytes = base64.b64decode(payload, validate=False)
        except Exception as exc:
            raise HomeworkInputError("That file is not a readable PDF. Paste the assignment instead.") from exc
        if len(pdf_bytes) > MAX_PDF_BYTES:
            raise HomeworkInputError("That PDF is too large. Paste the assignment instead.")
        if not pdf_bytes.startswith(b"%PDF"):
            raise HomeworkInputError("That file is not a PDF. Paste the assignment instead.")
        try:
            import learning_resources as lr

            extracted = lr.extract_pdf_pages_text(pdf_bytes, 1, MAX_PDF_PAGES, max_chars=MAX_ASSIGNMENT_CHARS)
        except Exception as exc:
            raise HomeworkInputError("That PDF could not be read. Paste the assignment instead.") from exc
        extracted = (extracted or "").strip()
        if not extracted:
            raise HomeworkInputError("That PDF had no readable text. Paste the assignment instead.")
        parts.append(extracted)
    text = "\n\n".join(parts).strip()
    if len(text) > MAX_ASSIGNMENT_CHARS:
        text = text[:MAX_ASSIGNMENT_CHARS]
    return text


def sanitize_history(history: list[dict[str, Any]] | None) -> list[dict[str, str]]:
    cleaned: list[dict[str, str]] = []
    for item in history or []:
        if not isinstance(item, dict):
            continue
        role = item.get("role")
        content = str(item.get("content") or "").strip()
        if role not in ("user", "assistant") or not content:
            continue
        if role == "assistant":
            content = strip_solution_code(content)
        cleaned.append({"role": role, "content": content[:4000]})
    return cleaned[-8:]


def user_message(assignment: str, follow_up: str, language: str) -> str:
    parts: list[str] = []
    if assignment:
        parts.append("Assignment:\n" + assignment)
    follow = (follow_up or "").strip()
    if follow:
        parts.append(follow)
    text = "\n\n".join(parts).strip()
    hint = (language or "").strip()
    if hint:
        text = f"{text}\n\n{hint[:400]}"
    return text
