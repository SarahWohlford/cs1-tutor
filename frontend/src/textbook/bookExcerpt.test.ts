import { describe, expect, it } from "vitest";
import { pickBookExcerpt } from "./bookExcerpt";

describe("pickBookExcerpt", () => {
  it("keeps two sentences that match the section, not the whole page", () => {
    const page = [
      "EXPRESSIONS",
      "19",
      "2.2 Expressions",
      "Download basic/expressions.cmd",
      "A value is a single piece of data. An expression combines values and operators into a mathemat-",
      "ical result.",
      "Python evaluates an expression to a value. The shell prints that value for you.",
      "Later pages keep going with operators, precedence, and a long worked example that should not all appear in the excerpt.",
    ].join("\n");
    const excerpt = pickBookExcerpt(page, "Expressions");
    expect(excerpt).toContain("expression");
    expect(excerpt).toContain("mathematical");
    expect(excerpt).not.toContain("mathemat-");
    expect(excerpt.length).toBeLessThan(420);
    expect(excerpt).not.toContain("Later pages");
    expect(excerpt).not.toContain("EXPRESSIONS");
    expect(excerpt).not.toContain("Download");
    expect(excerpt).not.toContain("2.2");
  });
});
