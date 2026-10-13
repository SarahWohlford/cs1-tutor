import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  PRACTICAL_PROGRAMMING_MISSING,
  PRACTICAL_PROGRAMMING_PDF_URL,
} from "../data/practicalProgramming";

GlobalWorkerOptions.workerSrc = pdfWorker;

const SCALE = 1.5;

let documentPromise: Promise<PDFDocumentProxy> | null = null;

function loadDocument(): Promise<PDFDocumentProxy> {
  if (!documentPromise) {
    documentPromise = getDocument(PRACTICAL_PROGRAMMING_PDF_URL).promise.catch((error: unknown) => {
      documentPromise = null;
      throw error;
    });
  }
  return documentPromise;
}

export async function renderPracticalProgrammingPages(
  startPage: number,
  endPage: number
): Promise<string[]> {
  if (startPage < 1 || endPage < startPage) {
    throw new Error(PRACTICAL_PROGRAMMING_MISSING);
  }

  let pdf: PDFDocumentProxy;
  try {
    pdf = await loadDocument();
  } catch {
    throw new Error(PRACTICAL_PROGRAMMING_MISSING);
  }
  if (endPage > pdf.numPages) {
    throw new Error(PRACTICAL_PROGRAMMING_MISSING);
  }

  const images: string[] = [];
  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: SCALE });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) {
      throw new Error(PRACTICAL_PROGRAMMING_MISSING);
    }
    await page.render({ canvasContext, viewport }).promise;
    images.push(canvas.toDataURL("image/png"));
    page.cleanup();
  }
  return images;
}
