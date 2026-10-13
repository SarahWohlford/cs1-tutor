import { PRACTICAL_PROGRAMMING_MISSING, PRACTICAL_PROGRAMMING_PDF_URL } from "../data/practicalProgramming";
import {
  clearPublicPracticalProgrammingCache,
  publicPracticalProgrammingPdf,
  readSavedPracticalProgrammingPdf,
} from "./practicalProgrammingFile";

let blobUrl: string | null = null;

export function clearPracticalProgrammingCache(): void {
  clearPublicPracticalProgrammingCache();
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
    blobUrl = null;
  }
}

export function pageFrameUrls(base: string, startPage: number, endPage: number): string[] {
  const urls: string[] = [];
  for (let page = startPage; page <= endPage; page += 1) {
    urls.push(`${base}#page=${page}`);
  }
  return urls;
}

async function viewerBase(): Promise<string> {
  const fromDisk = await publicPracticalProgrammingPdf();
  if (fromDisk) return PRACTICAL_PROGRAMMING_PDF_URL;

  const saved = await readSavedPracticalProgrammingPdf();
  if (!saved) throw new Error(PRACTICAL_PROGRAMMING_MISSING);
  if (!blobUrl) {
    blobUrl = URL.createObjectURL(new Blob([saved], { type: "application/pdf" }));
  }
  return blobUrl;
}

export async function renderPracticalProgrammingPages(
  startPage: number,
  endPage: number
): Promise<string[]> {
  if (startPage < 1 || endPage < startPage) {
    throw new Error(PRACTICAL_PROGRAMMING_MISSING);
  }
  const base = await viewerBase();
  return pageFrameUrls(base, startPage, endPage);
}
