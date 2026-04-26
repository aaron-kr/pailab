# PAI LAB — Authentication & Admin/Members Area

---

## Overview

| Route | Who can access | Purpose |
|---|---|---|
| `/login` | Public | Google sign-in |
| `/members` | Members + Admin | Lab dashboard, checklist, projects |
| `/members/profile` | Self only | Edit profile, photo URL, bio |
| `/members/projects` | Self only | View assigned projects |
| `/members/notes` | Members + Admin | Notes reference + link to public site |
| `/admin` | Admin only | Dashboard with live stats |
| `/admin/tracker` | Admin only | Research ideas tracker (Firestore) |
| `/admin/members-list` | Admin only | Quick member access overview |
| `/admin/students` | Admin only | Full profile management + role assignment |
| `/admin/publications` | Admin only | Paper records from content collection |
| `/admin/grants` | Admin only | Grant tracker (Firestore) |
| `/admin/content` | Admin only | Project CRUD + shortcuts |
| `/admin/settings` | Admin only | Onboarding checklist + paper templates |

---

## Initial Firebase setup

See **FIREBASE_SETUP.md** for step-by-step instructions. Summary:

1. Create Firebase project, enable Google Auth, create Firestore (Seoul region: `asia-northeast3`)
2. Register a web app, copy config into `.env`
3. `npm install firebase`
4. `firebase deploy --only firestore:rules`
5. Add your live domain to Firebase Auth → Authorized domains

---

## Admin account

The admin email is pulled into `src/lib/firebase.ts` via an `.env` variable (private):
```typescript
/** Admin email loaded from env — never hardcode here.
 *  Set PUBLIC_FIREBASE_ADMIN_EMAIL in .env / Vercel env settings. */
export const ADMIN_EMAIL = import.meta.env.PUBLIC_FIREBASE_ADMIN_EMAIL ?? "";
```

On first login, your Firestore user document is created with `role: "member"`. To upgrade to admin:
1. Firebase Console → Firestore → `users` collection → find your UID document
2. Set the `role` field to `"admin"`
3. Sign out and back in

---

## Adding a student member

The `allowed_members` Firestore collection controls who can log in as a member:

1. Firebase Console → Firestore → `allowed_members` collection → **Add document**
2. Document ID: the student's Google email address (e.g. `student@jbnu.ac.kr`)
3. Fields: `displayName` (string), `addedAt` (timestamp)

The student can now sign in at `/login` and access `/members`.  
To remove access: delete their document from `allowed_members`.

---

## Role system

Roles are stored in `users/{uid}.role` in Firestore.

| Role | Access |
|---|---|
| `admin` | Full admin + members area |
| `member` | Members area only |
| `public` | No protected access |

The `getRole()` function in `firebase.ts` checks the email against `ADMIN_EMAIL`. Firestore role takes precedence for all in-app checks.

Role is fetched from Firestore once per session and cached in `sessionStorage` (clears when the browser tab closes — role changes take effect at the next session).

---

## ProtectedLayout and the auth pattern

All admin and members pages use `ProtectedLayout.astro` as their layout.

```astro
---
import ProtectedLayout from "@/layouts/ProtectedLayout.astro";
---
<ProtectedLayout
  title="My Page"
  area="admin"          <!-- "admin" | "members" | "auto" -->
  requireAdmin={true}   <!-- true = redirect to /members if not admin -->
>
  <!-- page content -->
</ProtectedLayout>
```

`area="auto"` (default) detects admin vs members from the URL path.

**How auth works in the layout:**
1. `<body style="visibility:hidden">` — page is hidden immediately on load
2. Firebase initializes using config from a server-rendered JSON script tag
3. `onAuthStateChanged` fires → checks user → fetches role from Firestore
4. If checks pass → `document.body.style.visibility = "visible"` → page shown
5. If checks fail → redirect to `/login` or `/members` — body never shown

**Flash prevention:** The `visibility:hidden` trick means unauthenticated users never see the protected page content, even for a fraction of a second.

---

## Writing page scripts (the pailab:auth-ready pattern)

Every admin/members page script must wait for Firebase to initialize before querying Firestore. Use the `pailab:auth-ready` event dispatched by `ProtectedLayout`:

```typescript
// ✅ Correct — in page <script> block
import { getFirestore, collection, getDocs } from "firebase/firestore";

document.addEventListener("pailab:auth-ready", async (e: Event) => {
  const { user, db, role } = (e as CustomEvent).detail;
  //       ↑ user = Firebase Auth user
  //              ↑ db  = already-initialized Firestore instance
  //                     ↑ role = "admin" | "member"

  const snap = await getDocs(collection(db, "your-collection"));
  // render...
});

// For mutations after the initial load (e.g. save button click):
// Get db from the window-stored app instance:
import { getFirestore } from "firebase/firestore";
const db = getFirestore((window as any).__pailab_firebase_app);
```

**❌ Do NOT do this in page scripts:**
```typescript
// Wrong — causes double-initialization
import { app } from "@/lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(app);
onAuthStateChanged(auth, ...);
```

---

## Member checklist

The onboarding checklist on `/members` is configurable from `/admin/settings`.

- Items are stored in Firestore `checklist_items` collection
- Each member's checked state is in `users/{uid}/checklist/{itemId}`
- State persists across sessions (it's in Firestore, not localStorage)
- When all items are checked, a completion message appears with a link to Projects

To add/edit/reorder checklist items: go to `/admin/settings` → New Member Checklist Items.

---

## Paper templates tracker

Managed from `/admin/settings` → Paper Templates section.

- Each template has: society name, venue format, Google Drive link, last verified date
- Items with `last_checked` older than 2 years show a ⚠ warning
- Click "✓" to mark as verified today
- Students see this on `/members` dashboard

---

## Grant tracker

`/admin/grants` — all data stored in Firestore `grants` collection. Admin-only.

Status options: `planning`, `drafting`, `submitted`, `under-review`, `awarded`, `active`, `rejected`, `closed`

Active/awarded grants count appears on the admin dashboard stats.

---

## Assigning students to projects

Currently done manually in Firestore Console:

1. Firebase Console → Firestore → `projects` collection → open the project document
2. Edit the `members` array — add the student's Firebase UID
3. Or set `lead_uid` to the student's UID to make them the project lead

The student will then see the project on their `/members/projects` page.

A proper assignment UI in `/admin/students` is on the planned improvements list.

---

## Profile photos

Student photos are URL strings — no Firebase Storage needed.

Students paste a public image URL in `/members/profile`:
- GitHub avatar: `https://avatars.githubusercontent.com/u/[USER_ID]`
- Google Photos shared link
- Any other publicly accessible image URL

The URL is saved to `users/{uid}.photoURL` in Firestore and synced to Firebase Auth's user profile.

---

## Firestore security rules

Deploy with: `firebase deploy --only firestore:rules`

Summary of what the rules enforce:
- `users`: owners read/write their own document; public profiles world-readable; admin reads all
- `users/{uid}/checklist`: owner + admin only
- `checklist_items`: authenticated users read; admin writes
- `projects`: assigned members read; admin writes
- `research_ideas`: authenticated users read; admin writes
- `paper_templates`: authenticated users read; admin writes
- `grants`: admin only
