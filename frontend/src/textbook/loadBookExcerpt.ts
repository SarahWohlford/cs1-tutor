import { PRACTICAL_PROGRAMMING_MISSING } from "../data/practicalProgramming";
import { publicPracticalProgrammingPdf, readSavedPracticalProgrammingPdf } from "./practicalProgrammingFile";
import { pickBookExcerpt } from "./bookExcerpt";

type TextItem = { str?: string; transform?: number[] };

let workerReady = false;

export async function loadBookExcerpt(startPage: number, endPage: number, title: string): Promise<string> {
  if (startPage < 1 || endPage < startPage) throw new Error(PRACTICAL_PROGRAMMING_MISSING);
  const bytes = await pdfBytes();
  if (!bytes) throw new Error(PRACTICAL_PROGRAMMING_MISSING);
  const pdfjs = await import("pdfjs-dist");
  if (!workerReady) {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
    workerReady = true;
  }
  const doc = await pdfjs.getDocument({ data: bytes }).promise;
  const last = Math.min(endPage, startPage + 7, doc.numPages);
  const chunks: string[] = [];
  for (let pageNumber = startPage; pageNumber <= last; pageNumber += 1) {
    const page = await doc.getPage(pageNumber);
    const content = await page.getTextContent();
    chunks.push(linesFromItems(content.items as TextItem[]));
  }
  const excerpt = pickBookExcerpt(chunks.join("\n"), title);
  if (!excerpt) throw new Error(PRACTICAL_PROGRAMMING_MISSING);
  return excerpt;
}

async function pdfBytes(): Promise<Uint8Array | null> {
  const published = await publicPracticalProgrammingPdf();
  if (published) return published.slice();
  const saved = await readSavedPracticalProgrammingPdf();
  return saved ? new Uint8Array(saved) : null;
}

function linesFromItems(items: TextItem[]): string {
  const rows: { y: number; parts: string[] }[] = [];
  for (const item of items) {
    const text = item.str?.trim();
    if (!text) continue;
    const y = Math.round(item.transform?.[5] ?? 0);
    const last = rows[rows.length - 1];
    if (last && Math.abs(last.y - y) <= 2) last.parts.push(text);
    else rows.push({ y, parts: [text] });
  }
  rows.sort((a, b) => b.y - a.y);
  return rows.map((row) => row.parts.join(" ")).join("\n");
}
