import { describe, expect, it } from "vitest";
import { looksLikePdf } from "./practicalProgrammingFile";

describe("looksLikePdf", () => {
  it("accepts a PDF header and rejects other files", () => {
    const pdf = new TextEncoder().encode("%PDF-1.4").buffer;
    const text = new TextEncoder().encode("not a pdf").buffer;
    expect(looksLikePdf(pdf)).toBe(true);
    expect(looksLikePdf(text)).toBe(false);
    expect(looksLikePdf(new ArrayBuffer(0))).toBe(false);
  });
});
