import { PRACTICAL_PROGRAMMING_PDF_URL } from "../data/practicalProgramming";

const DB_NAME = "cs1-tutor";
const STORE = "pdfs";
const KEY = "practical-programming";

export function looksLikePdf(bytes: ArrayBuffer): boolean {
  const head = new Uint8Array(bytes.slice(0, 5));
  return head.length >= 4 && head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Could not open textbook storage."));
  });
}

export async function readSavedPracticalProgrammingPdf(): Promise<ArrayBuffer | null> {
  try {
    const db = await openDb();
    const bytes = await new Promise<ArrayBuffer | null>((resolve, reject) => {
      const request = db.transaction(STORE, "readonly").objectStore(STORE).get(KEY);
      request.onsuccess = () => {
        const value = request.result;
        resolve(value instanceof ArrayBuffer ? value : null);
      };
      request.onerror = () => reject(request.error ?? new Error("Could not read the textbook."));
    });
    db.close();
    return bytes && looksLikePdf(bytes) ? bytes : null;
  } catch {
    return null;
  }
}

export async function savePracticalProgrammingPdf(bytes: ArrayBuffer): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const request = db.transaction(STORE, "readwrite").objectStore(STORE).put(bytes, KEY);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error ?? new Error("Could not save the textbook."));
  });
  db.close();
}

async function fetchPublicPdf(): Promise<Uint8Array | null> {
  try {
    const response = await fetch(PRACTICAL_PROGRAMMING_PDF_URL);
    if (!response.ok) return null;
    const bytes = await response.arrayBuffer();
    return looksLikePdf(bytes) ? new Uint8Array(bytes) : null;
  } catch {
    return null;
  }
}

export async function loadPracticalProgrammingBytes(): Promise<Uint8Array> {
  const fromDisk = await fetchPublicPdf();
  if (fromDisk) return fromDisk;
  const saved = await readSavedPracticalProgrammingPdf();
  if (saved) return new Uint8Array(saved);
  throw new Error("missing");
}
