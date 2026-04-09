/**
 * src/lib/firebase.ts
 * ------------------------------------------------------------------
 * Single Firebase initializer used by all client-side scripts.
 * Import this wherever you need auth or Firestore.
 *
 * All PUBLIC_ vars are set in Vercel/Netlify env settings, or in
 * a local `.env` file (never commit the real values).
 * ------------------------------------------------------------------
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  type Auth,
} from "firebase/auth";
import {
  getFirestore,
  type Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:            import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain:        import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// Prevent double-init in Astro dev (HMR re-runs modules)
const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth: Auth             = getAuth(app);
export const db: Firestore          = getFirestore(app);
export const googleProvider         = new GoogleAuthProvider();

// ----------------------------------------------------------------
// Role helpers
// ----------------------------------------------------------------

/** Your Google account email — the only admin. */
export const ADMIN_EMAIL = "aaronkr.trainer@gmail.com";

/** Student emails or domains that get member access.
 *  Add student emails here, or use a Firestore allowlist (see auth.ts). */
export const MEMBER_DOMAINS: string[] = [];   // e.g. ["jbnu.ac.kr"]
export const MEMBER_EMAILS:  string[] = [];   // e.g. ["student@example.com"]

export type Role = "admin" | "member" | "public";

export function getRole(email: string | null): Role {
  if (!email) return "public";
  if (email === ADMIN_EMAIL) return "admin";
  if (MEMBER_EMAILS.includes(email)) return "member";
  if (MEMBER_DOMAINS.some((d) => email.endsWith("@" + d))) return "member";
  return "public";
}
