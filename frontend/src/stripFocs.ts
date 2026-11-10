const FOCS_PHRASES = [
  /\bfocs\b/i,
  /foundations of computer science/i,
  /strong induction/i,
  /proof by induction/i,
  /mathematical induction/i,
  /discrete mathematics/i,
  /discrete objects/i,
  /making precise statements/i,
  /turing machines?/i,
  /finite automata/i,
  /context[- ]free/i,
  /asymptotics/i,
  /number theory/i,
  /conditional probability/i,
  /random variables/i,
  /expected value/i,
  /unsolvable problems/i,
  /\bnp-complete\b/i,
  /recursive objects/i,
  /matching and coloring/i,
  /proving ["“']for all/i,
];

export const FOCS_FALLBACK =
  "That topic is from a different course. Stay with the CSCI 1100 Python lectures in this tutor.";

export function mentionsFocs(text: string): boolean {
  return FOCS_PHRASES.some((pattern) => pattern.test(text));
}

export function stripFocsMentions(text: string): string {
  const lines = (text || "").split("\n").map((line) => {
    const kept = line
      .split(/(?<=[.!?])\s+/)
      .map((part) => part.trim())
      .filter((part) => part && !mentionsFocs(part));
    return kept.join(" ");
  });
  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function hideFocsReply(text: string): string {
  const cleaned = stripFocsMentions(text);
  if (cleaned) return cleaned;
  if (mentionsFocs(text)) return FOCS_FALLBACK;
  return text;
}
