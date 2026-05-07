# CLAUDE.md — PAI LAB Project Briefing

> Read this first in any new conversation about this project.  
> Last updated: May 2026.

---

## What this project is

A bilingual (EN / 한국어) academic lab website for the Physical AI Laboratory (PAI Lab), run by Aaron Snowberger at universities in Jeonju, Korea. Built with Astro v6. Has a public-facing site AND a Firebase-authenticated admin/members backend.

**Live:** pailab.io (deployment in progress)  
**Repo:** https://github.com/aaron-kr/pailab (public)  
**Owner:** Aaron Snowberger (aaronkr.trainer@gmail.com = admin account)

---

## Tech stack

- **Astro v6** — static site generator, Content Layer API for all collections (Node >=22.12.0 required)
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
| `curriculum` | `content/curriculum/` | `/curriculum` (list) + `/curriculum/[slug]` (detail with unit grid) |
| `units` | `content/units/[track-slug]/` | `/curriculum/[track-slug]/[unit-slug]` |
| `projects` | `content/projects/` | `/projects` + `/projects/[slug]` |
| `modules` | `content/modules/` | `/modules` (list only) |
| `notes` | `content/notes/[year]/` | `/notes` + `/notes/[year]/[slug]` |
| `pages` | `content/pages/` | `/pages/[slug]` (freeform static pages) |

**Curriculum → Units → Lessons hierarchy:**
- `src/content/curriculum/track-05-arduino.md` → `/curriculum/track-05-arduino`  
- `src/content/units/track-05-arduino/unit-01-intro.md` → `/curriculum/track-05-arduino/unit-01-intro`
- Unit files use `track: "track-05-arduino"` frontmatter to associate with their parent track.
- The track detail page queries units where `unit.data.track === track.slug`.

**Curriculum + Units schema additions (May 2026):**

| Field | Collection | Type | Purpose |
|---|---|---|---|
| `thumbnailUrl` | curriculum | `string?` | Card image on `/curriculum` list (hover-zooms, dark overlay) |
| `featuredImgUrl` | curriculum, units | `string?` | Hero image above content grid on track/unit detail page |
| `featuredYouTubeUrl` | curriculum, units | `string?` | YouTube embed above content grid (normalized to `youtube-nocookie.com`). Takes precedence over `featuredImgUrl` |

**Progress tracking (localStorage, no login):**
- LocalStorage key: `pailab:done:{unitId}` where `unitId` is the compound path e.g. `track-05-arduino/unit-01-intro`
- Value: `{ done: true, at: "ISO_DATE_STRING" }`
- Toggled via "Mark as Complete" button on every unit page (EN + KO)
- Auto-marked after `duration` time on page (`parseDurationMs` parses "10 minutes", "1 hour", "2 hours 30 minutes")
- Progress reads on track detail page: green ✓ badge on unit cards, progress bar in units section header
- Progress is per-browser/device — each student's computer keeps its own state. No UUID or server-side tracking needed since localStorage is inherently per-browser.

**YouTube URL normalization:**  
Pass any of: `https://youtu.be/VIDEO_ID`, `https://www.youtube.com/watch?v=VIDEO_ID`, or `https://www.youtube.com/embed/VIDEO_ID`. All are normalized to `https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0` at build time by the `youtubeEmbed()` helper in the page frontmatter.

**Pages collection:**
- Freeform static content pages at `/pages/[slug]`
- `parent_page: "slug"` creates breadcrumb navigation and shows a sidebar child list on the parent
- `show_in_nav: true` signals intent to add the page to the nav (still requires manual NAV array edit)
- See `ADDING_CONTENT.md` for full instructions including how to add pages to the nav

**Critical schema note (Astro 6 Content Layer API):** Collections are defined in `src/content.config.ts` (NOT `src/content/config.ts`) using `loader: glob({...})`. Each entry's identifier is now `.id` (not `.slug`). Never use `entry.slug` — it no longer exists.

**Units id pattern:** Unit files in subdirectories produce compound IDs: `track-05-arduino/unit-01-intro`. Split with `unit.id.split("/")` to get `[trackSlug, unitSlug]` for routing.

**Rendering content:** Use `import { render } from 'astro:content'` and `await render(entry)`. The old `await entry.render()` method is removed in Astro 6.

**Year-folder pattern (notes + research):**
- Notes are organized by year: `content/notes/2025/some-note.md` → id `2025/some-note` → URL `/notes/2025/some-note`
- Route uses `[...slug].astro` (rest parameter) to handle the compound id. `params: { slug: note.id }` works as-is.
- Research is organized by year too: `content/research/conferences/2025/paper.md` — id not used for routing (no individual pages).
- Do NOT add year prefix to the filename if it's already in the folder. The folder IS the year.

**Research year folders:**
- `content/research/conferences/[year]/` — files do NOT include year in filename (folder provides it)
- `content/research/journals/[year]/` — same pattern
- `content/research/dissertations/` — no year subfolder (rare, few files)

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
| `src/content.config.ts` | Astro 6 Content Layer config — all 8 collections with `loader: glob({...})` and Zod schemas |
| `src/styles/global.css` | Everything — CSS variables, layout, all component styles |
| `src/pages/rss.xml.ts` | EN RSS feed at `/rss.xml` — notes where `lang: en` or `both` |
| `src/pages/ko/rss.xml.ts` | Korean RSS feed at `/ko/rss.xml` — notes where `lang: ko` or `both` |
| `src/pages/search.astro` | Public search page at `/search` |
| `src/pages/api/og.png.ts` | Dynamic OG image endpoint (requires hybrid output + `@vercel/og`) |
| `firestore.rules` | Security rules — deploy with `firebase deploy --only firestore:rules` |
| `.env.example` | Template for all 6 `PUBLIC_FIREBASE_*` env vars |
| `astro.config.mjs` | Integrations: `mdx()`, `sitemap()`, `pagefind()` — and `@astrojs/vercel` adapter |

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

**`package.json` build scripts:**
```json
"build":       "astro build"          ← used by Vercel (no type check to avoid blocking deploys)
"build:check": "astro check && astro build"  ← run locally before pushing
```
Run `pnpm run build:check` before pushing to catch type errors. Vercel runs `astro build` directly.

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

**Bilingual single-file notes (the "third way"):**

For notes and simple markdown files, you can put BOTH English and Korean text in the same `.md` file using a `<!-- ko -->` divider:

```markdown
[English content here]

<!-- ko -->

[Korean content here]
```

The `src/plugins/remark-bilingual.mjs` remark plugin (wired into `astro.config.mjs`) detects this marker and wraps each half in:
- `<div class="lang-block lang-block-en">` — shown by default, hidden on `html[lang="ko"]` pages
- `<div class="lang-block lang-block-ko">` — hidden by default, shown on `html[lang="ko"]` pages

CSS in `global.css` handles show/hide. `BaseLayout.astro` already sets `<html lang={lang}>` so no JS is needed.

**When to use each approach:**
| Content type | Approach |
|---|---|
| Note body text | Single file with `<!-- ko -->` divider |
| Paper/project titles, descriptions | `_ko` frontmatter fields |
| UI strings (buttons, nav, headings) | `translations.ts` |
| Complex index pages with HTML | `translations.ts` + `t()` |

**Notes without Korean translation:**
- Set `lang: "en"` in frontmatter (default)
- `/ko/notes/[year]/[slug]` still renders — but shows the English content with an inline banner saying "아직 한국어로 제공되지 않습니다"
- The banner has a "영어로 보기 →" link to the canonical EN URL
- This eliminates the redirect loop (`?notranslated=1` bounce) that was the old behavior

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

## What's NOT done yet (as of May 2026)

- [ ] Korean pages for individual project detail (`/ko/projects/[slug]`)
- [ ] Korean category pages (`/ko/notes/category/[category]`)
- [ ] OG image endpoint live (needs `output: "hybrid"` + `@astrojs/vercel` adapter)
- [ ] Place a static `/public/og-default.png` fallback image
- [ ] Pre-existing implicit-any TypeScript errors in `index.astro` (IDE reports them; `astro check` behavior pending verification)
- [ ] `unit.data` / `track.data` typed as `unknown` in IDE (pre-existing Astro 6 Content Layer + deprecated `z` from `astro:content` — `astro check` is authoritative, not the IDE)

### Recently completed (April–May 2026)
- [x] **Search page fixed** — full-variant SiteSearch uses `pf-full-input`/`pf-full-results` IDs (separate from compact overlay); split into `pfCompact`/`pfFull` instances so `/search` page initializes independently of Nav's compact trigger
- [x] **Double search bar fixed** — `.pagefind-ui__form { display:none !important }` in global.css hides pagefind's injected input while leaving results visible; `triggerSearch()` is programmatic so it still works
- [x] **Nav split-button** — dropdown groups with `href?` (e.g. About) get a clickable label link + separate chevron button; touch-friendly (tap label = navigate, tap arrow = open dropdown)
- [x] **Multiple simultaneous dropdowns** — removed "close others" logic; clicking a trigger toggles only that dropdown
- [x] **Sub-group accordion** — add `{ groupLabel: "Label", items: [...] }` in any dropdown's `items` array; expands downward inline with darker background (`rgba(0,0,0,.28)` dark / `.12` light); chevron rotates right→down
- [x] **Unit prev/next navigation** — bottom of each unit page; arrows + unit number + title
- [x] **Featured media on units + tracks** — `featuredImgUrl` (hero image) or `featuredYouTubeUrl` (embedded video) in frontmatter; shown above the content grid; YouTube normalized to `youtube-nocookie.com/embed/` format
- [x] **Track thumbnails on curriculum list** — `thumbnailUrl` in track frontmatter; image shown at top of track card with hover zoom + overlay gradient; same design as project cards
- [x] **Mark as Complete button** — on every unit page (EN + KO); localStorage key `pailab:done:{unitId}`; toggleable; shows completion date; auto-marks after `duration` time on page (via `setTimeout`)
- [x] **Auto-complete toast** — pops up from bottom of screen when auto-marked or manually marked; fades out after 3 s
- [x] **Unit completion overlay on track page** — green ✓ badge on unit card when completed; progress bar (`X / N completed`) in units section header; reads localStorage on page load
- [x] Curriculum track detail pages `/curriculum/[slug]` (EN + KO)
- [x] RSS feeds (EN `/rss.xml` + KO `/ko/rss.xml`)
- [x] Pagefind search (`/search` page + compact nav trigger)
- [x] Mobile hamburger menu
- [x] BaseLayout — RSS autodiscovery, Twitter card, dynamic OG URL
- [x] All `/ko/` list pages — areas, curriculum, projects, modules, about (April 2026)
- [x] `private: true` frontmatter — hides content from public, reveals on Firebase login
- [x] Nav login → profile avatar + dropdown when authenticated
- [x] CSS consolidated from per-page `<style>` blocks into `global.css`
- [x] `units` collection + `/curriculum/[track]/[unit]` routing (EN + KO)
- [x] `pages` collection + `/pages/[slug]` routing — parent/child hierarchy, optional nav linking
- [x] Arduino (Track 05) + ESP32 (Track 06) curriculum tracks with 8 units each
- [x] Notes + research year folders with compound-slug routing
- [x] `remark-bilingual.mjs` plugin — `<!-- ko -->` marker splits a .md file into EN/KO halves

---

## Code quality

**Astro check** — runs as part of `npm run build` (`astro check && astro build`). Type-checks all `.astro` files. Also available as `npm run check` standalone.

**TypeScript** — `npm run typecheck` runs `tsc --noEmit --noUnusedLocals --noUnusedParameters`. Enforces no unused imports. _NOT correct. Astro uses virtual modules (astro:content, astro:middleware) and Vite's import.meta.env that only exist inside Astro's own build context. Therefore, the correct implementation is `astro check`._

**Stylelint** — `.stylelintrc.json`. Checks `src/styles/global.css`. `no-descending-specificity` disabled.

**Pre-commit (Husky + lint-staged)** — runs Stylelint `--fix` on `*.css` before every commit.

**GitHub Actions CI** — `.github/workflows/lint.yml`. TypeScript → Astro check → Stylelint on every push/PR to `main`.

```bash
npm run check         # astro check only
npm run typecheck     # astro check only - tsc --noEmit cannot be used
npm run lint:css      # Stylelint over src/styles/global.css
```

**History (April 2026):** Fixed unused `redirect` destructure in `middleware.ts`; duplicate `.project-body` / `.project-desc` selectors scoped under `.projects-list` to eliminate homepage style conflicts; RSS feed type error (`note.data.description` → `note.data.summary`); `areaMap` using non-existent `a.data.slug` removed from `notes/index.astro`.

**CSS note:** `.project-body` and `.project-desc` appear twice in `global.css` — this is intentional. The bare selectors are compact styles for the homepage grid. The `.projects-list`-scoped versions at line ~1060 are the fuller styles for the `/projects` page. Do not merge them.

---

## AI-assisted development

When using Claude Code or any AI assistant on this codebase:

- **`npm run build` runs `astro check` first** — type errors block deployment. Fix them before pushing.
- **CI enforces quality on every push** — TypeScript → Astro check → Stylelint. All three must pass before a branch can merge.
- **Never add `slug` to content collection schemas** — Astro generates it from the filename. Use `entry.slug`, never `entry.data.slug`. This bug has appeared multiple times (see Known bugs table).
- **Firebase page script pattern is critical** — use `pailab:auth-ready` event to get `db`. Never `import { app }` in page scripts — causes double initialization and silent Firestore failures.
- **Run `astro check` on `src/` only** — do not point it at `dist/` (minified Firebase SDK generates thousands of false warnings).
- **Keep CLAUDE.md current** — if a new collection, Firestore path, or page pattern is added, document it here so future AI sessions don't rediscover it the hard way.
- **New notes go in the correct year folder** — e.g., a 2026 note goes in `content/notes/2026/`. Do NOT place notes in `content/notes/` directly.
- **New conference/journal papers go in year folders** — `content/research/conferences/[year]/` and `content/research/journals/[year]/`. Do NOT include the year in the filename (the folder provides it).
- **Bilingual notes**: use `<!-- ko -->` as the ONLY divider. Do NOT use headings or `---` for this. The remark plugin only recognizes the exact HTML comment `<!-- ko -->`.

---

## Owner context

Aaron Snowberger teaches CS/AI at 5 Korean universities (adjunct/visiting), not yet tenured. Running the lab independently. Students are undergraduates writing conference papers. Publishing budget is shared with students (KCI/Scopus first, SCIE later). Key affiliations: KSPAI society (kspai.org), KIICE, KLife. CV-based Physical AI threads: CNN/OCR → edge deployment, ACGAN → robotic perception, mask detection → edge vision.
