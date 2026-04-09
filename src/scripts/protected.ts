// src/scripts/protected.ts
// Auth guard for ALL protected pages.
// Role is read from Firestore users/{uid}.role on first load,
// then cached in sessionStorage (clears on tab close — so role
// changes take effect at the next session, not requiring a full logout).

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { app } from "@/lib/firebase";

const auth = getAuth(app);
const db   = getFirestore(app);

const config       = document.getElementById("layout-config");
const requireAdmin = config?.dataset.requireAdmin === "true";

// ── Sign-out (shared by both buttons) ───────────────────
async function doSignOut() {
  sessionStorage.removeItem("pailab-role");
  sessionStorage.removeItem("pailab-uid");
  try { await signOut(auth); } catch {}
  window.location.href = "/login";
}
document.getElementById("app-logout")?.addEventListener("click", doSignOut);
document.getElementById("app-logout-top")?.addEventListener("click", doSignOut);

// ── Auth state ───────────────────────────────────────────
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/login";
    return;
  }

  // ── Role — read from Firestore, cache in sessionStorage ──
  let role = sessionStorage.getItem("pailab-role");

  if (!role || sessionStorage.getItem("pailab-uid") !== user.uid) {
    // Cache miss or different user — fetch from Firestore
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        role = snap.data().role ?? "member";
      } else {
        // First-ever login: bootstrap user document
        role = "member";
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName ?? "",
          email:       user.email ?? "",
          photoURL:    user.photoURL ?? "",
          role:        "member",
          public_profile: false,
          team_order:  99,
          joined_at:   serverTimestamp(),
          updated_at:  serverTimestamp(),
        }, { merge: true });
      }
    } catch (e) {
      console.warn("Firestore role fetch failed:", e);
      role = "member";
    }

    sessionStorage.setItem("pailab-role", role!);
    sessionStorage.setItem("pailab-uid",  user.uid);
  }

  // ── Guard ────────────────────────────────────────────────
  if (requireAdmin && role !== "admin") {
    window.location.href = "/members";
    return;
  }

  // ── Show admin link on members pages ─────────────────────
  if (role === "admin") {
    const link = document.getElementById("admin-link");
    if (link) link.style.display = "flex";
  }

  // ── Avatar ───────────────────────────────────────────────
  const avatarEl = document.getElementById("app-user-avatar");
  if (avatarEl) {
    if (user.photoURL) {
      avatarEl.innerHTML = `<img src="${user.photoURL}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
    } else if (user.displayName) {
      avatarEl.textContent = user.displayName.split(" ").map((n: string) => n[0]).join("").slice(0,2).toUpperCase();
    } else {
      avatarEl.textContent = user.email?.[0]?.toUpperCase() ?? "?";
    }
  }
  const badge = document.getElementById("app-user-badge");
  if (badge && user.email) badge.setAttribute("title", user.email);
});
