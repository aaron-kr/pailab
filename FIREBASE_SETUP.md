# Firebase Auth & Research Tracker — Setup Guide

## What this adds

| Route | Access | What it does |
|-------|--------|--------------|
| `/login` | Public | Google sign-in page |
| `/members` | Member + Admin | Lab resources, onboarding checklist, project links |
| `/admin` | Admin only | Dashboard with stats |
| `/admin/tracker` | Admin only | Full Firestore-backed research idea tracker |

---

## Step 1 — Create a Firebase project (10 min)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `pailab` → disable Google Analytics (not needed)
3. In the project dashboard, click **Authentication** → **Get started**
4. Under **Sign-in method**, enable **Google** → set your support email → Save
5. Click **Firestore Database** → **Create database** → choose a region close to Korea (e.g. `asia-northeast3` = Seoul) → **Start in production mode**

---

## Step 2 — Register a web app & get config keys (5 min)

1. In Firebase Console → Project Settings (⚙️) → **Your apps** → click `</>`  (Web)
2. Register app with nickname `pailab-web`
3. Copy the `firebaseConfig` object values into your `.env` file (use `.env.example` as template)

---

## Step 3 — Add the Firebase SDK (2 min)

```bash
npm install firebase
```

That's the only new dependency.

---

## Step 4 — Set environment variables

**Local dev:** copy `.env.example` → `.env` and fill in values.

**Vercel:**
1. Vercel Dashboard → your project → Settings → Environment Variables
2. Add all 6 `PUBLIC_FIREBASE_*` variables

**Netlify:**
1. Site settings → Environment variables → Add all 6 variables

---

## Step 5 — Deploy Firestore security rules (3 min)

```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login
firebase login

# Init (select Firestore only, use existing project)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

---

## Step 6 — Authorize your domain (2 min)

In Firebase Console → Authentication → **Settings** → **Authorized domains**

Add your live domain (e.g. `pailab.io`) — `localhost` is already there by default.

---

## Step 7 — First login & test

1. Deploy or run `npm run dev`
2. Go to `/login` → sign in with `aaronkr.trainer@gmail.com`
3. You should land on `/admin`
4. Go to `/admin/tracker` → add your first research idea

---

## Adding a student member

Open **Firestore Console** → Collection `allowed_members` → **Add document**

- Document ID: `student@example.com` (their Google email)
- Fields: `displayName` (string), `addedAt` (timestamp)

The student can now sign in at `/login` and access `/members`.

To remove access: delete their document from `allowed_members`.

---

## Admin email

The admin email is hardcoded in `src/lib/firebase.ts`:

```ts
export const ADMIN_EMAIL = "aaronkr.trainer@gmail.com";
```

Also update `firestore.rules` if you change it.

---

## New files added to the project

```
src/
├── lib/
│   ├── firebase.ts      ← Firebase init, role helpers
│   ├── auth.ts          ← signIn/out, guardPage()
│   └── tracker.ts       ← Firestore CRUD for research ideas
├── layouts/
│   └── ProtectedLayout.astro   ← auth-gated page shell
└── pages/
    ├── login.astro
    ├── members/
    │   └── index.astro
    └── admin/
        ├── index.astro
        └── tracker.astro

firestore.rules            ← deploy with Firebase CLI
.env.example               ← copy → .env, fill in values
```
