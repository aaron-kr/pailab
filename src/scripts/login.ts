// src/scripts/login.ts
// Runs on the /login page. Handles Google sign-in and role-based redirect.

import { signInWithGoogle, waitForAuth } from "../lib/auth";
import { getRole } from "../lib/firebase";

async function init() {
  // If already signed in, redirect immediately
  const { user } = await waitForAuth();
  if (user) {
    const role = getRole(user.email ?? null);
    if (role !== "public") {
      redirect(role);
      return;
    }
  }

  const btn = document.getElementById("google-signin");
  const errMsg = document.getElementById("error-msg");
  if (!btn || !errMsg) return;

  btn.addEventListener("click", async () => {
    try {
      await signInWithGoogle();
      const { user: u } = await waitForAuth();
      const r = getRole(u?.email ?? null);
      if (r === "public") {
        errMsg.style.display = "block";
      } else {
        redirect(r);
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      errMsg.style.display = "block";
    }
  });
}

function redirect(role: string) {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");
  if (next) { window.location.href = next; return; }
  window.location.href = role === "admin" ? "/admin" : "/members";
}

init();
