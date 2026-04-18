# PAI LAB — Physical AI Laboratory

A bilingual (EN / 한국어) academic lab website for the Physical AI Laboratory.  
Built with **Astro v4**, deployed on **Vercel**.  
Authenticated members and admin areas powered by **Firebase Auth + Firestore**.

**Live:** [pailab.io](https://pailab.io) · **Repo:** [github.com/aaron-kr/pailab](https://github.com/aaron-kr/pailab)

---

## Quick start

```bash
git clone https://github.com/aaron-kr/pailab.git
cd pailab
npm install

# Copy env template and fill in Firebase values
cp .env.example .env

npm run dev        # → http://localhost:4321
npm run build      # production build + Pagefind index
npm run preview    # preview production build locally
```

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Astro v4 (static) |
| Styling | CSS custom properties (`global.css`), no Tailwind |
| Fonts | Oxanium (display), DM Sans (body), JetBrains Mono (code/labels) |
| Auth + DB | Firebase Auth (Google only) + Firestore |
| Hosting | Vercel |
| Content | Astro content collections (Markdown / MDX) |
| Search | Pagefind (build-time CLI) |
| Feeds | `@astrojs/rss` — EN + KO separate feeds |

---

## Project structure

```
pailab/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Nav.astro              ← sticky nav, dropdowns, hamburger menu
│   │   ├── SiteSearch.astro       ← Pagefind search UI (compact + full variants)
│   │   ├── Hero.astro             ← homepage hero (mesh gradient)
│   │   ├── Footer.astro
│   │   ├── PageHeader.astro       ← page header strip (all content pages)
│   │   ├── TranslationBanner.astro← "no Korean translation" alert
│   │   ├── TeamSection.astro      ← homepage team grid (reads Firestore)
│   │   ├── PaperRow.astro         ← paper list row with optional thumbnail
│   │   ├── ResearchCard.astro     ← paper card alternative
│   │   ├── ProjectRow.astro       ← project table row
│   │   └── NoteRow.astro          ← note list row with lang badge
│   ├── content/
│   │   ├── config.ts              ← Zod schemas for all collections
│   │   ├── areas/                 ← one .md per research area (8 areas)
│   │   ├── research/              ← one .md per paper
│   │   ├── curriculum/            ← one .md per track
│   │   ├── projects/              ← one .md per project
│   │   ├── modules/               ← one .md per plug-in module
│   │   └── notes/                 ← blog posts (MDX supported)
│   ├── i18n/
│   │   └── translations.ts        ← all UI strings EN + KO, altLangUrl helper
│   ├── layouts/
│   │   ├── BaseLayout.astro       ← public HTML shell, SEO, OG tags, RSS autodiscovery
│   │   ├── PostLayout.astro       ← note/post layout with sidebar
│   │   └── ProtectedLayout.astro  ← auth-gated shell for /admin + /members
│   ├── lib/
│   │   ├── firebase.ts            ← Firebase init, auth, db, role helpers
│   │   └── auth.ts                ← signIn/out, guardPage()
│   ├── pages/
│   │   ├── index.astro            ← EN homepage
│   │   ├── research.astro
│   │   ├── curriculum.astro
│   │   ├── projects.astro
│   │   ├── modules.astro
│   │   ├── about.astro
│   │   ├── areas.astro
│   │   ├── join.astro
│   │   ├── team.astro             ← public team page (reads Firestore)
│   │   ├── search.astro           ← /search page (Pagefind)
│   │   ├── login.astro
│   │   ├── rss.xml.ts             ← EN RSS feed
│   │   ├── api/
│   │   │   └── og.png.ts          ← dynamic OG image (needs hybrid output)
│   │   ├── notes/
│   │   │   ├── index.astro
│   │   │   ├── [slug].astro
│   │   │   └── category/
│   │   │       └── [category].astro
│   │   ├── curriculum/
│   │   │   └── [slug].astro       ← curriculum track detail pages
│   │   ├── projects/
│   │   │   └── [slug].astro
│   │   ├── admin/
│   │   │   ├── index.astro
│   │   │   ├── tracker.astro
│   │   │   ├── members-list.astro
│   │   │   ├── publications.astro
│   │   │   ├── grants.astro
│   │   │   ├── students.astro     ← member management + project assignment
│   │   │   ├── content.astro
│   │   │   └── settings.astro
│   │   ├── members/
│   │   │   ├── index.astro
│   │   │   ├── projects.astro
│   │   │   ├── notes.astro
│   │   │   └── profile.astro
│   │   └── ko/                    ← Korean mirrors
│   │       ├── index.astro
│   │       ├── research.astro
│   │       ├── join.astro         ← redirects to EN + shows banner
│   │       ├── rss.xml.ts         ← KO RSS feed
│   │       ├── curriculum/
│   │       │   └── [slug].astro
│   │       └── notes/
│   │           ├── index.astro
│   │           └── [slug].astro
│   └── styles/
│       └── global.css
├── firestore.rules
├── CLAUDE.md                      ← AI assistant briefing (read this first)
├── ADDING_CONTENT.md              ← how to add papers, notes, projects, etc.
├── MEMBERS_ADMIN.md               ← Firebase auth setup, member management
├── TRANSLATIONS_NAV.md            ← bilingual system, nav configuration
├── .env.example
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Environment variables

Copy `.env.example` → `.env` and fill in your Firebase project values:

```bash
PUBLIC_FIREBASE_API_KEY=
PUBLIC_FIREBASE_AUTH_DOMAIN=
PUBLIC_FIREBASE_PROJECT_ID=
PUBLIC_FIREBASE_STORAGE_BUCKET=
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
PUBLIC_FIREBASE_APP_ID=
```

All six are required. Get them from Firebase Console → Project Settings → Your apps → Web app.

---

## Search (Pagefind)

Search is powered by [Pagefind](https://pagefind.app/), which indexes the built HTML at `npm run build` time.

```json
// package.json — build script runs pagefind CLI after astro build
"build": "astro build"
```

Search works at `/search` (full page) and via the Search button in the nav (overlay). It does **not** work in `npm run dev` — only after a full build. However, it auto-injects its own search box which needs CSS styling to hide. 

- [ ] We tried the following but it doesn't seem to work...

```css
/* ── Hide auto-injected astro-pagefind UI ────────────────────
   The integration injects its own PagefindUI component which
   we don't want. Our custom UI lives inside .search-results
   (overlay) or .search-full (search page). Hide everything
   else. This survives Svelte hash changes between builds.
   ──────────────────────────────────────────────────────────── */
.pagefind-ui:not(.search-results .pagefind-ui):not(.search-full .pagefind-ui) {
  display: none !important;
}
```

---

## RSS feeds

| Feed | URL | Includes |
|---|---|---|
| English | `/rss.xml` | Notes with `lang: en` or `lang: both` |
| Korean | `/ko/rss.xml` | Notes with `lang: ko` or `lang: both` |

RSS autodiscovery `<link>` tags are included in every page's `<head>` automatically via `BaseLayout.astro`. Requires `@astrojs/rss` (`npm install @astrojs/rss`).

---

## OG images

`BaseLayout.astro` constructs a dynamic OG image URL pointing to `/api/og.png?title=...&description=...`. The endpoint at `src/pages/api/og.png.ts` generates branded 1200×630 images using `@vercel/og`.

**To activate:** `npm install @vercel/og @astrojs/vercel` and set `output: "hybrid"` + `adapter: vercel()` in `astro.config.mjs`.

- [ ] There is a problem with the package install:

```bash
npm error peer astro@"^6.0.0" from @astrojs/vercel@10.0.4
npm error node_modules/@astrojs/vercel
npm error   @astrojs/vercel@"*" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error C:\Users\User\AppData\Local\npm-cache\_logs\2026-04-10T05_04_44_955Z-eresolve-report.txt
npm error A complete log of this run can be found in: C:\Users\User\AppData\Local\npm-cache\_logs\2026-04-10T05_04_44_955Z-debug-0.log
```

**Until then:** place a static `/public/og-default.png` file — `BaseLayout` will use it as the fallback automatically.

---

## Light / dark mode

Default: **dark**. Controlled by `data-theme="dark|light"` on `<html>`.  
Saved in `localStorage` key `pailab-theme`. Toggle button (`#theme-toggle`) is in `Nav.astro`.  
The protected area (admin/members) is always dark — no toggle there.

---

## Bilingual (EN / 한국어)

| URL | Language |
|---|---|
| `/` | English |
| `/ko/` | Korean |
| `/notes/[slug]` | English |
| `/ko/notes/[slug]` | Korean (only notes with `lang: ko` or `lang: both`) |

### i18n architecture

Three layers work together — do not bypass any of them:

1. **`src/i18n/translations.ts`** — UI strings for components (nav, hero, about text, footer, status pills, etc.). Used by 15+ files. Always add new UI strings here first, then use `t(lang, "key")` in the component. The `altLangUrl()` helper is also exported from here.

2. **`_ko` fields in content YAML** — for content data (paper titles, descriptions, etc.). All collections support `title_ko`, `description_ko` where relevant. The page or component falls back to the English field when the `_ko` variant is absent.

3. **`src/pages/ko/`** — Korean URL mirror. Each page sets `const lang = "ko" as const` and renders `_ko` data + Korean UI strings via `t()`. This is the correct SEO approach: separate URLs get `<html lang="ko">` and proper `hreflang` links.

**Notes strategy:** Notes are written in English. If a Korean version exists on Naver, add `naver_url` to the frontmatter and set `lang: both`. `/ko/notes/[slug]` only serves notes with `lang: ko` or `lang: both`.

**Private content:** Add `private: true` to any content item's frontmatter. On list pages, the element gets `data-private="true"` and is hidden by CSS until the user logs in (Nav's `onAuthStateChanged` removes the attribute). On homepages, private items are filtered out at query time. On detail pages (`privatePage` prop on BaseLayout), the body is invisible and unauthenticated visitors are redirected to `/login`.

### Korean pages status

| Page | Status |
|---|---|
| `/ko/` | ✅ Full Korean |
| `/ko/research` | ✅ Full Korean |
| `/ko/areas` | ✅ Full Korean |
| `/ko/curriculum` | ✅ Full Korean (list + `[slug]`) |
| `/ko/projects` | ✅ Full Korean |
| `/ko/modules` | ✅ Full Korean |
| `/ko/about` | ✅ Full Korean |
| `/ko/notes` | ✅ Full Korean |
| `/ko/notes/[slug]` | ✅ Korean notes only |
| `/ko/join` | ↩ Redirects to EN + banner |
| `/ko/404` | ↩ Redirects to EN equivalent + banner |

Korean pages that haven't been translated are stubs that redirect to the EN version with `?notranslated=1`, triggering a dismissible banner via `TranslationBanner.astro`.

See **TRANSLATIONS_NAV.md** for adding translations and configuring the nav.

---

## Authentication

See **MEMBERS_ADMIN.md** for full setup instructions.

- Admin email is hardcoded in `src/lib/firebase.ts` → `ADMIN_EMAIL`
  - [ ] Hmm... should we?
- Sign in at `/login` with Google
- Admin lands on `/admin`, members land on `/members`
- Protected pages use `ProtectedLayout.astro` — body is hidden until auth confirms
- Role is fetched from Firestore `users/{uid}.role` and cached in `sessionStorage`
- **All page scripts** must use the `pailab:auth-ready` event — never import Firebase directly in page scripts

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel --prod
```

Project settings: Framework = Astro, Build command = `npm run build`, Output = `dist`.  
Add all 6 `PUBLIC_FIREBASE_*` environment variables in the Vercel dashboard.

---

## Troubleshooting

**Firestore pages show "Loading..." forever**  
Page script must use `document.addEventListener("pailab:auth-ready", ...)` — never call `onAuthStateChanged` or `import { app }` directly in page scripts. See MEMBERS_ADMIN.md for the exact pattern.

**Search not working**  
Pagefind only works after `npm run build`. In dev mode the overlay opens but returns no results — this is expected.

**Double search box appears**  
Caused by the `astro-pagefind` integration auto-injecting its own UI. We tried to remove `pagefind()` from `astro.config.mjs` integrations and use the CLI script in `package.json` instead, but then search didn't work. We then tried to hide it with a CSS rule (see above), but this also didn't work yet. I'll try to fix it myself with CSS.

**Sitemap build error: `reduce` of undefined**  
`@astrojs/sitemap` v3.7.1 has a regression with Astro v4. Pin to v3.6.0: `npm install @astrojs/sitemap@3.6.0`.

**Stale bugs after file changes**  
```bash
rm -rf node_modules/.vite .astro
npm run dev
```

**ContentSchemaContainsSlugError**  
Do not include `slug` in any content collection schema. Use `entry.slug` (not `entry.data.slug`).

---

## Planned improvements

- [ ] Korean translations for individual project detail pages (`/ko/projects/[slug]`)
- [ ] Korean category pages (`/ko/notes/category/[category]`)
- [ ] OG image endpoint live (activate `output: "hybrid"` + `@astrojs/vercel`)
- [ ] Static `/public/og-default.png` fallback image (ideal size: `1200 x 630px`)
- [ ] Hamburger menu refinements (currently functional)
- [ ] SiteSearch: double-injected input field (removing pagefind integration disables search)
- [ ] `/search` page returns no results (pagefind only indexes after `npm run build`)

### Completed (April 2026)
- [x] Curriculum track detail pages (`/curriculum/[slug]`, EN + KO)
- [x] RSS feeds (`/rss.xml` EN, `/ko/rss.xml` KO)
- [x] Pagefind full-text search (`/search` + nav overlay)
- [x] Mobile hamburger menu
- [x] RSS autodiscovery + Twitter card in BaseLayout
- [x] OG image endpoint (ready, needs hybrid mode enabled to activate)
- [x] All `/ko/` list pages (areas, curriculum, projects, modules, about)
- [x] `private: true` frontmatter support — hides content from public, reveals on login
- [x] Nav login button → profile avatar + dropdown when authenticated (Firebase Auth)
- [x] Admin email moved from hardcoded to `PUBLIC_FIREBASE_ADMIN_EMAIL` env var
