/**
 * src/lib/auth.ts
 * ------------------------------------------------------------------
 * Auth helpers (sign in/out, role check, redirect guard).
 * Import in client-side <script> blocks or client:only islands.
 * ------------------------------------------------------------------
 */

import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth, googleProvider, getRole, type Role } from "./firebase";

// ── Sign in / out ──────────────────────────────────────────────────

export async function signInWithGoogle(): Promise<void> {
  await signInWithPopup(auth, googleProvider);
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
  window.location.href = "/";
}

// ── Auth state listener ────────────────────────────────────────────

/**
 * Attaches an auth listener and resolves once the initial state is known.
 * Returns the current user (or null) and their role.
 */
export function waitForAuth(): Promise<{ user: User | null; role: Role }> {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve({ user, role: getRole(user?.email ?? null) });
    });
  });
}

// ── Page guard ────────────────────────────────────────────────────

/**
 * Call at the top of any protected page script.
 * If the user doesn't have the required role, redirects to /login.
 *
 * Usage (inside an Astro page <script>):
 *   import { guardPage } from "../lib/auth";
 *   const { user, role } = await guardPage("member");
 */
export async function guardPage(
  required: Role
): Promise<{ user: User; role: Role }> {
  const { user, role } = await waitForAuth();

  const roleRank: Record<Role, number> = { public: 0, member: 1, admin: 2 };

  if (!user || roleRank[role] < roleRank[required]) {
    const next = encodeURIComponent(window.location.pathname);
    window.location.replace(`/login?next=${next}`);
    // Returning a never-resolved promise keeps the page blank while redirecting
    return new Promise(() => {});
  }

  return { user, role };
}
