/**
 * src/lib/tracker.ts
 * ------------------------------------------------------------------
 * Firestore CRUD for the private research tracker.
 * Collection: `research_ideas/{id}`
 * ------------------------------------------------------------------
 */

import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ── Types ─────────────────────────────────────────────────────────

export type Status = "⏳" | "▶️" | "✅" | "⛔" | "💡";

export interface ResearchIdea {
  id?:        string;
  title:      string;
  area:       string;         // e.g. "Physical AI", "OCR", "Edu"
  status:     Status;
  stage:      string;         // e.g. "Data collection", "Writing"
  target:     string;         // e.g. "KIICE Spring", "JPEE", "Scopus"
  paiLink:    string;         // Physical AI connection note
  notes:      string;         // private notes
  githubUrl?: string;
  order:      number;
  updatedAt?: Timestamp;
}

const COL = "research_ideas";

// ── Read ──────────────────────────────────────────────────────────

export async function getAllIdeas(): Promise<ResearchIdea[]> {
  const q = query(collection(db, COL), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ResearchIdea));
}

// ── Write ─────────────────────────────────────────────────────────

export async function addIdea(
  idea: Omit<ResearchIdea, "id" | "updatedAt">
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...idea,
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateIdea(
  id: string,
  fields: Partial<Omit<ResearchIdea, "id">>
): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    ...fields,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteIdea(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
