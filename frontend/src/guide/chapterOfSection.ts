/** Chapter token (e.g. "5") from "5.1 Foo" or "5 Induction…", or null. */
export function chapterOfSectionTitle(title: string | null | undefined): string | null {
  if (!title) return null;
  const first = title.trim().split(/\s+/)[0] ?? "";
  const m = first.match(/^(\d+)/);
  return m ? m[1] : null;
}

/**
 * FOCS Ch.5 induction guided walkthrough — disabled until a CS1 guide is authored.
 */
export function isInductionGuideSection(_title: string | null | undefined): boolean {
  return false;
}
