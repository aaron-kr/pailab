// src/scripts/protected.ts
// Runs on every page that uses ProtectedLayout.
// Reads required role from data attribute, calls guardPage, shows content.

import { guardPage, signOut } from "../lib/auth";

async function init() {
  const loadingEl = document.getElementById("auth-loading");
  const contentEl = document.getElementById("protected-content");
  if (!loadingEl || !contentEl) return;

  const requiredRole = (loadingEl.dataset.requiredRole ?? "member") as "member" | "admin";

  const { user, role: userRole } = await guardPage(requiredRole);

  // Auth passed — reveal content
  loadingEl.remove();
  contentEl.style.display = "block";

  // Populate user-info placeholders
  document.querySelectorAll<HTMLElement>("[data-user-email]")
    .forEach(el => { el.textContent = user.email ?? ""; });
  document.querySelectorAll<HTMLElement>("[data-user-role]")
    .forEach(el => { el.textContent = userRole; });

  // Wire sign-out buttons
  document.querySelectorAll("[data-signout]")
    .forEach(btn => btn.addEventListener("click", () => signOut()));
}

init();
