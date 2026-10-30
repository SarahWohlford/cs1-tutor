// Turn raw textbook text into a short passage. The PDF stays on this computer;
// nothing from the book is stored in the repo.

const TITLE_WORD = /[^a-z0-9]+/;

export function pickBookExcerpt(pageText: string, title: string): string {
  const lines = pageText
    .replace(/\u00ad/g, "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line && !isNoiseLine(line));
  const cleaned = lines
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/([a-z])-\s+([a-z])/g, "$1$2")
    .trim();
  if (!cleaned) return "";

  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter((sentence) => sentence.length > 40);
  const pool = sentences.length > 0 ? sentences : [cleaned];
  const words = title.toLowerCase().split(TITLE_WORD).filter((word) => word.length > 3);
  let start = 0;
  let best = -1;
  pool.forEach((sentence, index) => {
    const low = sentence.toLowerCase();
    const score = words.reduce((total, word) => total + wordScore(low, word), 0);
    if (score > best) {
      best = score;
      start = index;
    }
  });
  const passage = pool.slice(start, start + 2).join(" ").trim();
  if (passage.length <= 420) return passage;
  const cut = passage.slice(0, 400);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 240 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function wordScore(sentence: string, word: string): number {
  if (sentence.includes(word)) return 2;
  const stem = word.endsWith("s") ? word.slice(0, -1) : word;
  return stem.length > 3 && sentence.includes(stem) ? 1 : 0;
}

function isNoiseLine(line: string): boolean {
  if (/^\d{1,3}$/.test(line)) return true;
  if (/^[A-Z0-9][A-Z0-9 ,'"’-]{7,}$/.test(line)) return true;
  if (/^download\b/i.test(line)) return true;
  return /^\d+\.\d+(\.\d+)?\s+\S/.test(line) && line.length < 80;
}
