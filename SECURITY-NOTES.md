# Security Audit Notes — PAI Lab

> Audited: April 2026  
> Scope: `src/` directory — Astro + Firebase Auth + Firestore  
> Author references anonymised as `git_author@email`

---

## 1. Hardcoded Secrets / Private Keys

**Result: PASS** (after one fix applied — see §5)

- All Firebase client config values are loaded from `import.meta.env.PUBLIC_FIREBASE_*` in `src/lib/firebase.ts` and `src/layouts/ProtectedLayout.astro`. No values are hardcoded in source.
- `GOOGLE_APPLICATION_CREDENTIALS` (service account path) lives only in `.env`, which is gitignored.
- `service-account.json` is explicitly listed in `.gitignore`.
- No private keys, API secrets, or database credentials were found hardcoded in any `src/` file.

---

## 2. Firebase Config — Client/Server Scoping

**Result: PASS**

Firebase is a **client-only** integration in this project (no Firebase Admin SDK used in server routes or SSR):

| File | Role | Safe? |
|---|---|---|
| `src/lib/firebase.ts` | Client-side SDK init via `import.meta.env.PUBLIC_*` | ✅ |
| `src/layouts/ProtectedLayout.astro` | Passes `PUBLIC_*` vars to an inline `<script>` via a JSON `<script type="application/json">` data element | ✅ |
| `src/lib/auth.ts` | Auth helpers — client-side only, imported in `<script>` blocks | ✅ |
| `src/pages/admin/*.astro` | All scripts are `<script>` (client) blocks, not frontmatter | ✅ |

Firebase `PUBLIC_*` client keys (apiKey, appId, etc.) are **intentionally public** — Firebase security is enforced entirely through Firestore security rules, not by keeping these values secret. This is the correct Firebase web-app pattern.

---

## 3. Admin Route Authentication Guards

**Result: PASS**

Every page under `src/pages/admin/` uses `ProtectedLayout` with `requireAdmin={true}`:

| Page | Guard |
|---|---|
| `admin/index.astro` | `requireAdmin={true}` ✅ |
| `admin/tracker.astro` | `requireAdmin={true}` ✅ |
| `admin/members-list.astro` | `requireAdmin={true}` ✅ |
| `admin/publications.astro` | `requireAdmin={true}` ✅ |
| `admin/grants.astro` | `requireAdmin={true}` ✅ |
| `admin/students.astro` | `requireAdmin={true}` ✅ |
| `admin/content.astro` | `requireAdmin={true}` ✅ |
| `admin/settings.astro` | `requireAdmin={true}` ✅ |

Auth flow in `ProtectedLayout.astro`:
1. Page renders with `<body style="visibility:hidden">` (prevents flash of protected content).
2. `onAuthStateChanged` fires; if no user → redirect to `/login`.
3. Role is read from Firestore `users/{uid}.role` (with `sessionStorage` cache per session).
4. If `requireAdmin` and `role !== "admin"` → redirect to `/members`.
5. Only after role confirmed does `visibility: visible` get set and `pailab:auth-ready` fire.

**Note:** The Firestore role field is the authoritative source of truth. The `getRole()` helper in `firebase.ts` (which uses `ADMIN_EMAIL`) acts as a fallback for `auth.ts`'s `guardPage()` helper, but all protected pages in this project use `ProtectedLayout` instead of `guardPage()`.

Members pages (`src/pages/members/`) use `ProtectedLayout` without `requireAdmin`, meaning any authenticated user can access them — which is the intended behaviour.

---

## 4. Exposed Personal Information

**Result: PASS** (after one fix applied — see §5)

| Type | Found | Location | Status |
|---|---|---|---|
| Email addresses (HTML templates) | None | — | ✅ Clean |
| Email addresses (JS source) | 1 | `src/lib/firebase.ts` `ADMIN_EMAIL` | ✅ Fixed (§5) |
| Phone numbers | None | — | ✅ Clean |
| Physical addresses | None | — | ✅ Clean |
| Student PII | None in source | Firestore only | ✅ Clean |

The `join.astro` page contains the phrase *"send a short email"* as plain prose — no actual email address is rendered in HTML.

Public GitHub org links in `Footer.astro` (`github.com/aaronkr-classroom`) are intentionally public.

---

## 5. Fixes Applied

### 5a — `ADMIN_EMAIL` removed from source code

**Before** (`src/lib/firebase.ts`):
```ts
export const ADMIN_EMAIL = "git_author@email";
```

**After**:
```ts
export const ADMIN_EMAIL = import.meta.env.PUBLIC_FIREBASE_ADMIN_EMAIL ?? "";
```

The value is now set in `.env` (gitignored) and must be added to Vercel / hosting environment variables before deployment.

**Vercel action required:** Add `PUBLIC_FIREBASE_ADMIN_EMAIL` = `git_author@email` in the Vercel project's Environment Variables settings.

> Note: `PUBLIC_*` variables in Astro are still included in the client-side JS bundle by the build. Removing the value from source prevents it from appearing in git history. For additional protection, role assignment should be managed exclusively through Firestore `users/{uid}.role` (already implemented), making the client-side email check purely a UX shortcut rather than a security gate.

---

## 6. Remaining Recommendations (not yet implemented)

| Priority | Issue | Recommendation |
|---|---|---|
| Medium | `PUBLIC_FIREBASE_ADMIN_EMAIL` still reaches the JS bundle | Migrate admin check fully to Firestore; remove `getRole()` / `ADMIN_EMAIL` from `firebase.ts` entirely |
| Medium | Firestore security rules not audited | Run `firebase emulators:start` + rules unit tests; confirm `/users` write is locked to the owning UID |
| Low | Unused `guardPage()` / `auth.ts` | Remove or document — currently dead code since all pages use `ProtectedLayout` |
| Low | `sessionStorage` role cache | If a user's role is downgraded in Firestore mid-session, they retain elevated access until tab close. Acceptable for this scale; mitigated by Firestore rules. |
| Low | No `Content-Security-Policy` header | Add a CSP via `vercel.json` headers to reduce XSS risk |

---

## 7. Files Checked

```
src/lib/firebase.ts
src/lib/auth.ts
src/layouts/ProtectedLayout.astro
src/pages/admin/*.astro   (8 files)
src/pages/members/*.astro (4 files)
src/pages/join.astro
src/pages/about.astro
src/components/Footer.astro
src/content/**            (markdown content)
.env / .gitignore
```
