# CLAUDE.md — PAI LAB Project Briefing

> Read this first in any new conversation about this project.  
> Last updated: April 2026.

---

## What this project is

A bilingual (EN / 한국어) academic lab website for the Physical AI Laboratory (PAI Lab), run by Aaron Snowberger at universities in Jeonju, Korea. Built with Astro v4. Has a public-facing site AND a Firebase-authenticated admin/members backend.

**Live:** pailab.io (deployment in progress)  
**Repo:** https://github.com/aaron-kr/pailab (public)  
**Owner:** Aaron Snowberger (aaronkr.trainer@gmail.com = admin account)

---

## Tech stack

- **Astro v4** — static site generator, content collections for all content
- **CSS custom properties** — all styling in `src/styles/global.css`, no Tailwind
- **Fonts:** Oxanium (display/headings), DM Sans (body), JetBrains Mono (labels/code)
- **Firebase Auth** — Google sign-in only
- **Firestore** — all dynamic data (profiles, tracker, grants, projects)
- **No Firebase Storage** — images are URL strings only (too expensive)
- **Vercel** — deployment
- **Pagefind** — build-time search index (CLI only, no integration)
- **@astrojs/rss** — RSS feeds for notes (EN + KO)

---

## Design system

Dark-first navy-teal palette. Key CSS variables:

```css
--bg-deep:    #040c14   /* darkest backgrounds, hero, join section */
--bg:         #040c14   /* dark mode body */
--cyan:       #24fffc   /* primary highlight */
--green-glow: #2dd4bf   /* stat numbers, success states */
--blue:       #3d92f5   /* secondary accent */
--pink:       #ff2d84   /* used sparingly, error/logout states */
```

All content pages have a `<PageHeader>` component with the same animated mesh gradient + grid overlay as the hero/join section. Size: `sm` (200px), `md` (280px, default), `lg` (380px).

---

## Content architecture

All static content in `src/content/` (Markdown files):

| Collection | Folder | URL pattern |
|---|---|---|
| `areas` | `content/areas/` | Links to `/notes/category/[slug]` |
| `research` | `content/research/` | `/research` (list), no individual pages |
| `curriculum` | `content/curriculum/` | `/curriculum` (list) + `/curriculum/[slug]` (detail) |
| `projects` | `content/projects/` | `/projects` + `/projects/[slug]` |
| `modules` | `content/modules/` | `/modules` (list only) |
| `notes` | `content/notes/` | `/notes` + `/notes/[slug]` |

**Critical schema note:** Do NOT put `slug` in any content collection schema. Astro auto-generates it from the filename. Use `entry.slug`, never `entry.data.slug`.

---

## Dynamic data (Firestore)

```
users/{uid}              → profile, role, photo URL, bio, interests, links
users/{uid}/checklist/   → per-member onboarding checklist state
checklist_items/         → admin-configured checklist item definitions
projects/                → lab projects (members: string[], lead_uid: string)
research_ideas/          → research tracker (13 seeded ideas available)
paper_templates/         → conference template links with stale-date checking
grants/                  → grant tracker (admin-only)
```

Nothing dynamic on the public site except `/team` (reads `users` where `public_profile:true`) and `TeamSection.astro` on the homepage.

---

## Authentication flow

1. `/login` page — Google sign-in via Firebase
2. On success → check email against `ADMIN_EMAIL` in `firebase.ts` → redirect to `/admin` or `/members`
3. `ProtectedLayout.astro` — sets `body { visibility: hidden }`, initializes Firebase, calls `onAuthStateChanged`
4. After auth confirmed → fetches role from Firestore → shows/hides admin link → sets `visibility: visible`
5. Dispatches `CustomEvent("pailab:auth-ready", { detail: { user, db, role } })`
6. ALL page scripts listen for `pailab:auth-ready` to get `db` — they do NOT call `onAuthStateChanged` themselves

**Critical pattern** — page scripts MUST use:
```typescript
document.addEventListener("pailab:auth-ready", async (e: Event) => {
  const { user, db, role } = (e as CustomEvent).detail;
  // Firestore queries here
});
```
NOT `import { app } from "@/lib/firebase"` in page scripts — this causes double-initialization.

---

## Key files to know

| File | What it does |
|---|---|
| `src/lib/firebase.ts` | Single Firebase init, exports `auth`, `db`, `googleProvider`, `getRole()`, `ADMIN_EMAIL` |
| `src/lib/auth.ts` | `signIn()`, `signOut()`, `guardPage()` helpers |
| `src/layouts/ProtectedLayout.astro` | Auth shell — inline script handles all auth logic |
| `src/layouts/BaseLayout.astro` | Public shell — RSS autodiscovery, OG tags, Twitter card, `<TranslationBanner />` |
| `src/layouts/PostLayout.astro` | Notes/posts — has breadcrumb, sidebar (meta, tags, related), prev/next |
| `src/components/Nav.astro` | Dropdown nav + hamburger menu — edit `NAV` array at top to change menu structure |
| `src/components/SiteSearch.astro` | Pagefind search UI — `variant="compact"` (nav trigger) or `variant="full"` (search page) |
| `src/components/PageHeader.astro` | Reusable mesh-gradient header strip — `size`, `title`, `bgImage` props |
| `src/components/TranslationBanner.astro` | Shown when `?notranslated=1` in URL |
| `src/i18n/translations.ts` | All UI strings + `altLangUrl()` (fixed for /ko/ko/ko bug) |
| `src/content/config.ts` | Zod schemas for all collections — areas schema has NO `slug` field |
| `src/styles/global.css` | Everything — CSS variables, layout, all component styles |
| `src/pages/rss.xml.ts` | EN RSS feed at `/rss.xml` — notes where `lang: en` or `both` |
| `src/pages/ko/rss.xml.ts` | Korean RSS feed at `/ko/rss.xml` — notes where `lang: ko` or `both` |
| `src/pages/search.astro` | Public search page at `/search` |
| `src/pages/api/og.png.ts` | Dynamic OG image endpoint (requires hybrid output + `@vercel/og`) |
| `firestore.rules` | Security rules — deploy with `firebase deploy --only firestore:rules` |
| `.env.example` | Template for all 6 `PUBLIC_FIREBASE_*` env vars |
| `astro.config.mjs` | Integrations: `mdx()`, `sitemap()` — NO pagefind integration (see below) |

---

## Navigation structure (as of April 2026)

Configured in `NAV` array at top of `src/components/Nav.astro`:

```
Research ▾            Learn ▾         Team    Join    About
├ Areas               ├ Curriculum
├ Papers              ├ Modules
└ Projects            └ Notes
```

Controls area (right side): Search button → `SiteSearch variant="compact"` | Language toggle | Theme toggle | Hamburger (mobile only, ≤640px)

Dropdowns use click (not hover) for touch compatibility. Hamburger slides in a right-panel menu with all items flat. Admin/members area has its own sidebar nav inside `ProtectedLayout`.

---

## Pagefind search

Pagefind runs as a with `astro build`. There is a double-UI bug (inserting its own search input) from `astro-pagefind`, so we tried to remove `pagefind` as an integration and run it in the CLI _after_ `build`. However, this caused it not to function, so we undid those changes.

**`package.json` build script:**
```json
"build": "astro build"
```

The index is generated into `dist/pagefind/` and served as static files. `SiteSearch.astro` loads `pagefind-ui.js` via a runtime-injected `<script>` tag (not `import()`) to bypass Vite's static analysis.

Search does NOT work in `npm run dev` — only after a full build. This is expected.

**Exclude admin/members from the index:**
In `ProtectedLayout.astro`, add `data-pagefind-ignore` to the `<main>` wrapper.

---

## RSS feeds

- **EN feed:** `/rss.xml` — includes notes where `lang: "en"` or `lang: "both"`
- **KO feed:** `/ko/rss.xml` — includes notes where `lang: "ko"` or `lang: "both"`, uses `title_ko` if present
- Autodiscovery `<link>` tags are in `BaseLayout.astro` `<head>` automatically
- Requires `@astrojs/rss`: `npm install @astrojs/rss`

---

## OG image generation

`src/pages/api/og.png.ts` — dynamic endpoint that generates branded 1200×630 images.

**Current status: NOT yet active.** Requires:
1. `npm install @vercel/og @astrojs/vercel`
    - [ ] However, there is an installation error. See `README.md`.
2. `output: "hybrid"` in `astro.config.mjs`
3. `adapter: vercel()` added to integrations

Until then, `BaseLayout.astro` falls back to `/og-default.png` (place a static fallback image there). The `ogImage` prop on `BaseLayout` lets individual pages override with a specific image path.

---

## Bilingual system

Three layers — keep all three, do not bypass:

1. **`src/i18n/translations.ts`** — UI strings for all components. Use `t(lang, "key")`. The `altLangUrl()` helper lives here too. Always add new translatable UI strings here first.

2. **`_ko` fields in YAML frontmatter** — for content data (paper titles, descriptions, etc.). All collections have `title_ko` and `description_ko` where applicable. Components fall back to the English field when the `_ko` variant is absent.

3. **`src/pages/ko/`** — Korean URL space for SEO. Each page sets `const lang = "ko" as const`, renders `_ko` data and Korean UI strings via `t()`. Pages without Korean content are redirect stubs.

**Korean pages status:**
| Page | Status |
|---|---|
| `/ko/` index | ✅ Full Korean |
| `/ko/research` | ✅ Full Korean |
| `/ko/areas` | ✅ Full Korean |
| `/ko/curriculum` | ✅ Full Korean (list + `[slug]`) |
| `/ko/projects` | ✅ Full Korean |
| `/ko/modules` | ✅ Full Korean |
| `/ko/about` | ✅ Full Korean |
| `/ko/notes` | ✅ Full Korean |
| `/ko/notes/[slug]` | ✅ KO + bilingual notes only |
| `/ko/join` | ↩ Redirect stub |
| `/ko/404` | ↩ Strips `/ko`, redirects to EN |

**Notes strategy:** Notes are written in English. If a Korean version exists externally (Naver), add `naver_url` to the frontmatter and set `lang: both`. The KO detail page only serves notes with `lang: ko` or `lang: both`.

**`altLangUrl()`** strips ALL `/ko` prefixes before rebuilding (fixes the `/ko/ko/ko` accumulation bug).
`TranslationBanner.astro` reads `?notranslated=1`, shows banner, cleans URL.

---

## Known history of bugs (now fixed)

| Bug | Root cause | Fix |
|---|---|---|
| `ContentSchemaContainsSlugError` | `slug: z.string()` in areas schema | Removed — Astro auto-generates from filename |
| Firestore "Loading..." forever | `<script src="...protected.ts">` treated as static asset, TS never compiled | Inline all auth logic in ProtectedLayout `<script>` block |
| Firebase double-init / Firestore fails | `import { app } from "@/lib/firebase"` resolving to different instances | Layout initializes Firebase once, dispatches `pailab:auth-ready`, page scripts use `db` from event |
| Sign-out not working | Same as above | Fixed by inlining in ProtectedLayout |
| `/ko/ko/ko` URL accumulation | `altLangUrl` only stripped ONE `/ko` | Regex changed to `/^(\/ko)+/` (strips all) |
| Flash of protected page before redirect | Body visible before auth confirmed | `<body style="visibility:hidden">` + set visible after auth check passes |
| Stale bugs persist after fixes | Vite/Astro module cache | `rm -rf node_modules/.vite .astro` |
| Pagefind Vite import error | Vite statically resolves all `import()` paths at build time | Load `pagefind-ui.js` via injected `<script>` tag instead of `import()` |
| Double search box | `astro-pagefind` integration auto-injects its own Svelte UI | Trying to hide it with a CSS rule in `global.css`. Not quite working. |
| Sitemap `reduce` of undefined | `@astrojs/sitemap` v3.7.1 has a regression with Astro v4 | Pin to `@astrojs/sitemap@3.6.0` |
| `/notes/category/category` URL instead of `/notes/category/[slug]` | Dynamic route file was named `category.astro` instead of `[category].astro` | Renamed file |
| `students.astro` Firestore never loads | Used `import { app }` + `onAuthStateChanged` directly (double-init) | Rewritten to use `pailab:auth-ready` event |

---

## Seeded data

13 research ideas can be imported with:
```bash
npm install tsx firebase-admin dotenv
# Download service account → save as service-account.json
npx tsx src/scripts/seed-research.ts
```

Topics: Mapping PAI Landscape, Sim-to-Real, Edge Vision, Gesture Arm, Physical LLM Interface, PAI-9 Framework, ACGAN extension, Kalman IMU, ROS2 navigation, Digital Twin, Human-in-the-Loop, Grapheme classification, Sensor fusion baseline.

---

## What's NOT done yet (as of April 2026)

- [ ] Korean pages for individual project detail (`/ko/projects/[slug]`)
- [ ] Korean category pages (`/ko/notes/category/[category]`)
- [ ] OG image endpoint live (needs `output: "hybrid"` + `@astrojs/vercel` adapter)
- [ ] Place a static `/public/og-default.png` fallback image
- [ ] Mobile hamburger nav menu refinements (currently functional, may need polish)
- [ ] SiteSearch modal works, but has a double-injected input field. Removing pagefind's injected input field disables Search.
- [ ] The full `/search` page has a single input field, but does not return results.

### Recently completed
- [x] Curriculum track detail pages `/curriculum/[slug]` (EN + KO)
- [x] RSS feeds (EN `/rss.xml` + KO `/ko/rss.xml`)
- [x] Pagefind search (`/search` page + compact nav trigger)
- [x] Mobile hamburger menu
- [x] BaseLayout — RSS autodiscovery, Twitter card, dynamic OG URL
- [x] All `/ko/` list pages — areas, curriculum, projects, modules, about (April 2026)
- [x] `private: true` frontmatter — hides content from public, reveals on Firebase login
- [x] Nav login → profile avatar + dropdown when authenticated
- [x] Admin email moved to `PUBLIC_FIREBASE_ADMIN_EMAIL` env var (no hardcoded secrets)
- [x] CSS consolidated from per-page `<style>` blocks into `global.css`

---

## Owner context

Aaron Snowberger teaches CS/AI at 5 Korean universities (adjunct/visiting), not yet tenured. Running the lab independently. Students are undergraduates writing conference papers. Publishing budget is shared with students (KCI/Scopus first, SCIE later). Key affiliations: KSPAI society (kspai.org), KIICE, KLife. CV-based Physical AI threads: CNN/OCR → edge deployment, ACGAN → robotic perception, mask detection → edge vision.
