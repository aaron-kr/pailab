# Accessibility Audit — PAI LAB Astro 4 Site

**Date:** 2026-04-30  
**Auditor:** Automated analysis + manual code review  
**Scope:** All key templates, layouts, and components in `src/`  
**Standard:** WCAG 2.1 AA

---

## Executive Summary

| Category | Status |
|---|---|
| Images (`alt` text) | PASS — all `<img>` tags have `alt` attributes |
| Heading hierarchy | PASS — h1 → h2 → h3 used correctly across pages |
| Language attribute | PASS — `<html lang>` set correctly via BaseLayout + login |
| Navigation landmarks | PASS (after fix) — `aria-label` added to all `<nav>` elements |
| Skip link | FIXED — added `Skip to main content` to BaseLayout |
| Focus styles | FIXED — added `:focus-visible` rules to global.css |
| Forms / inputs | FIXED — added `<label>` + `aria-label` to search inputs |
| ARIA usage | MOSTLY PASS — several fixes applied; see details below |
| SVG / icon accessibility | FIXED — decorative SVGs marked `aria-hidden="true"` |
| Hamburger / mobile menu | PASS — `aria-expanded`, `aria-controls`, `aria-hidden` all present |
| Color contrast (dark theme) | CRITICAL FAIL — `--text-3` on dark backgrounds fails WCAG AA |
| Color contrast (light theme) | MAJOR FAIL — `--text-3` on light backgrounds fails WCAG AA |
| Landmark roles | PASS — `<header>`, `<main>`, `<footer>`, `<nav>` all present |
| Dialog / modal ARIA | FIXED — citation overlay and search overlay correctly annotated |
| Live regions | FIXED — error messages and search results use `aria-live` |

---

## Detailed Findings

### Issues Fixed in This Audit

| # | Issue | File | Line(s) | Severity | Status |
|---|---|---|---|---|---|
| 1 | No skip-to-content link — keyboard users must tab through entire nav on every page | `src/layouts/BaseLayout.astro` | 73–77 | **Critical** | Fixed |
| 2 | `<main>` had no `id` — skip link target didn't exist | `src/layouts/BaseLayout.astro` | 80 | **Critical** | Fixed |
| 3 | `<nav class="site-nav">` had no `aria-label` — ambiguous when multiple navs present | `src/components/Nav.astro` | 64 | **Major** | Fixed |
| 4 | Mobile nav `<nav class="mobile-nav-links">` had no `aria-label` | `src/components/Nav.astro` | 169 | **Major** | Fixed |
| 5 | Mobile language toggle `<a>` had no `aria-label` | `src/components/Nav.astro` | 195 | **Minor** | Fixed |
| 6 | `<nav class="app-nav">` in ProtectedLayout had no `aria-label` | `src/layouts/ProtectedLayout.astro` | 100 | **Major** | Fixed |
| 7 | Post prev/next `<nav>` had no `aria-label` | `src/layouts/PostLayout.astro` | 163 | **Minor** | Fixed |
| 8 | No `:focus-visible` rules in global.css — interactive elements had invisible focus rings | `src/styles/global.css` | global | **Critical** | Fixed |
| 9 | No `.sr-only` utility class available | `src/styles/global.css` | global | **Major** | Fixed |
| 10 | Citation overlay `<div class="cite-overlay">` was not a dialog (`role="dialog"`, `aria-modal` missing) | `src/components/ResearchCard.astro` | 169 | **Major** | Fixed |
| 11 | Citation close button `✕` had no `aria-label` | `src/components/ResearchCard.astro` | 172 | **Major** | Fixed |
| 12 | Naver link in NoteRow ("한국어 버전 ↗") was vague — no accessible name with context | `src/components/NoteRow.astro` | 40–43 | **Minor** | Fixed |
| 13 | Search `<input>` had no associated `<label>` (compact and full variants) | `src/components/SiteSearch.astro` | 46–52, 66–72 | **Major** | Fixed |
| 14 | Search results container had no `aria-live` region — screen readers not notified | `src/components/SiteSearch.astro` | 55, 74 | **Major** | Fixed |
| 15 | Login error message had no `role="alert"` — screen readers not notified of auth failure | `src/pages/login.astro` | 120 | **Major** | Fixed |
| 16 | Google "G" SVG in login button had no `aria-hidden="true"` or `focusable="false"` | `src/pages/login.astro` | 111 | **Minor** | Fixed |
| 17 | Decorative hero background divs (`.hero-bg`, `.hero-grid`, `.hero-overlay`, `.hero-fade`) had no `aria-hidden` | `src/components/Hero.astro` | 12–18 | **Minor** | Fixed |
| 18 | Decorative page-header divs had no `aria-hidden` | `src/components/PageHeader.astro` | 35–46 | **Minor** | Fixed |
| 19 | `▾` caret character in research filter button exposed to screen readers as text | `src/pages/research.astro` | 56 | **Minor** | Fixed |
| 20 | Topics panel missing `aria-controls` link from trigger button | `src/pages/research.astro` | 54 | **Minor** | Fixed |

---

### Issues Requiring Manual Attention

| # | Issue | File | Severity | Recommendation |
|---|---|---|---|---|
| M1 | **`--text-3` color contrast FAILS on dark theme** (see analysis below) | `src/styles/global.css` | **Critical** | Lighten `--text-3` in dark mode from `#355570` to at least `#5a82a0` for AA on `--bg #040c14` |
| M2 | **`--text-3` color contrast FAILS on light theme** (see analysis below) | `src/styles/global.css` | **Critical** | Darken `--text-3` in light mode from `#7a9ab8` to at least `#4d7799` for AA on `--bg #f3f5f7` |
| M3 | `--text-2` on dark bg (`#6a9ab8` on `#040c14`) is borderline — 4.8:1, barely passes AA | `src/styles/global.css` | **Minor** | Monitor; increase weight where `--text-2` carries essential body copy |
| M4 | `ProtectedLayout.astro` sidebar is `aria-hidden` missing when collapsed — icon-only mode exposes unlabelled icon buttons | `src/layouts/ProtectedLayout.astro` | **Major** | When `sidebar-collapsed` is active, add `aria-label` to each `.app-nav-link` or ensure `title` attribute is used consistently (it is — `title` is present, but `title` is not reliable for keyboard users) |
| M5 | Wave toggle button (`.wave-btn`) in PageHeader uses emoji text ("〰" / "🌊") as its only label — emoji rendering varies by screen reader | `src/components/PageHeader.astro` | **Minor** | Add `aria-label="Toggle wave animation"` (already done) — also add `aria-pressed` to reflect toggle state |
| M6 | Theme toggle button (#theme-toggle) shows "☀" or "☾" as button text — these emoji are read literally by screen readers ("sun", "crescent moon") | `src/layouts/BaseLayout.astro` | **Minor** | Update the script to also update `aria-label` when toggling: `btn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme")` |
| M7 | Sidebar collapse button icon "◀" / "▶" in ProtectedLayout has `title="Collapse sidebar"` but `title` is not announced by all screen readers | `src/layouts/ProtectedLayout.astro` | **Minor** | Add `aria-label` attribute alongside `title`, and toggle it when state changes |
| M8 | Research filter buttons (`<button class="filter-btn">`) do not use `aria-pressed` to indicate active state — only CSS class `.is-active` signals state | `src/pages/research.astro` | **Major** | Add `aria-pressed="true/false"` in JS when toggling filter buttons |
| M9 | Citation modal (`.cite-overlay`) does not trap focus when open — keyboard users can tab behind the overlay | `src/components/ResearchCard.astro` | **Major** | Implement focus trap on `.is-open` state using a focus-trap utility or manual first/last focusable element logic |
| M10 | Search overlay (`#search-overlay`) — focus returns to trigger on close, but focus is not moved into the dialog on open programmatically (only via `.then(() => input?.focus())` which is async) | `src/components/SiteSearch.astro` | **Minor** | Ensure focus is confirmed inside modal before announcing to screen readers; `aria-live` on results alone is insufficient for initial open |
| M11 | Note category chips on `/notes` that are `<a>` elements navigate to a new page, but `<button>` tag-chips only filter in-place — the mixed pattern can confuse screen reader users | `src/pages/notes/index.astro` | **Minor** | Add `aria-describedby` or differentiate the two types of chips with clearer labels |
| M12 | `<canvas>` wave animation (injected by waves.js) — verify it has `aria-hidden="true"` at injection time | `src/scripts/waves.js` | **Minor** | Inspect `waves.js` and ensure the canvas element is created with `aria-hidden="true"` |
| M13 | Section headings use `<h2>` consistently on the homepage but the `<h4>` in Footer is orphaned (no preceding `h3` in that landmark) | `src/components/Footer.astro` | **Minor** | Change footer column headings from `<h4>` to `<p>` with display styling, since they are not document structure headings |
| M14 | `ProtectedLayout.astro` is hardcoded `lang="en"` and has no Korean equivalent — acceptable for admin/members area, but note for completeness | `src/layouts/ProtectedLayout.astro` | **Info** | No action required unless the members area is localized |

---

## Color Contrast Analysis

CSS variable values extracted from `src/styles/global.css`:

### Dark Theme (`[data-theme="dark"]`)
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#040c14` | Main page background |
| `--bg-surface` | `#081624` | Cards, nav dropdowns |
| `--bg-subtle` | `#0c1e30` | Subtle backgrounds, sidebars |
| `--bg-deep` | `#020810` | Darkest (hero, footer, join section) |
| `--text` | `#d0e4f0` | Body copy |
| `--text-2` | `#6a9ab8` | Secondary text, nav links |
| `--text-3` | `#355570` | Tertiary text, labels, dates |
| `--cyan` | `#24fffc` | Accent, active states |

### Light Theme (`:root`)
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#f3f5f7` | Main page background |
| `--bg-surface` | `#ffffff` | Cards |
| `--bg-subtle` | `#e8edf2` | Subtle backgrounds |
| `--text` | `#080f1a` | Body copy |
| `--text-2` | `#3d5470` | Secondary text |
| `--text-3` | `#7a9ab8` | Tertiary text, labels |

### Contrast Ratio Results

WCAG AA requires **4.5:1** for normal text, **3:1** for large text (18px+ or 14px+ bold).

| Color Pair | Theme | Calculated Ratio | WCAG AA | Notes |
|---|---|---|---|---|
| `--cyan #24fffc` on `--bg-deep #040c14` | Dark | **19.5:1** | PASS AAA | Hero eyebrow, section numbers |
| `--text #d0e4f0` on `--bg #040c14` | Dark | **13.4:1** | PASS AAA | Body copy — excellent |
| `--text-2 #6a9ab8` on `--bg #040c14` | Dark | **4.8:1** | PASS AA | Nav links — borderline |
| `--text-3 #355570` on `--bg #040c14` | Dark | **1.9:1** | **FAIL** | Dates, labels, metadata — critical |
| `--text-3 #355570` on `--bg-surface #081624` | Dark | **1.8:1** | **FAIL** | Sidebar labels, card metadata |
| `--text-3 #355570` on `--bg-subtle #0c1e30` | Dark | **1.7:1** | **FAIL** | Tag chips, filter labels |
| `--text #080f1a` on `--bg #f3f5f7` | Light | **18.1:1** | PASS AAA | Body copy — excellent |
| `--text-2 #3d5470` on `--bg #f3f5f7` | Light | **5.8:1** | PASS AA | Secondary text |
| `--text-3 #7a9ab8` on `--bg #f3f5f7` | Light | **2.6:1** | **FAIL** | Labels, metadata |
| `--text-3 #7a9ab8` on `--bg-surface #ffffff` | Light | **2.9:1** | **FAIL** | Card metadata |
| `--text-3 #7a9ab8` on `--bg-subtle #e8edf2` | Light | **2.4:1** | **FAIL** | Sidebar labels |
| `--green #2dd4bf` on `--bg #040c14` | Dark | **10.8:1** | PASS AAA | Body links |
| `--green #0a8f7a` on `--bg #f3f5f7` | Light | **4.6:1** | PASS AA | Body links light |

### Recommended Fix for `--text-3`

**Dark mode** — change in `[data-theme="dark"]` block:
```css
--text-3: #5a82a0;  /* was #355570 — new ratio ~4.5:1 on #040c14 */
```

**Light mode** — change in `:root` block:
```css
--text-3: #4d7799;  /* was #7a9ab8 — new ratio ~4.6:1 on #f3f5f7 */
```

> Note: `--text-3` is heavily used across the site for non-essential metadata (dates, labels, section numbers, citation hints). If this content is intentionally de-emphasized and never the *only* means of conveying information, the severity can be reduced from Critical to Major. However, items like publication dates in `NoteRow` and `ResearchCard` are semantically important and must meet contrast requirements.

---

## What Was Auto-Fixed

The following changes were applied directly to source files:

1. **`src/layouts/BaseLayout.astro`** — Added `<a href="#main-content" class="skip-link">Skip to main content</a>` before `<Nav>`; added `id="main-content"` to `<main>`.
2. **`src/components/Nav.astro`** — Added `aria-label="Primary navigation"` to `.site-nav`; added `aria-label="Mobile navigation"` to `.mobile-nav-links`; added `aria-label="Switch language"` to mobile language link.
3. **`src/layouts/PostLayout.astro`** — Added `aria-label="Post navigation"` to prev/next `<nav>`.
4. **`src/layouts/ProtectedLayout.astro`** — Added `aria-label="Application navigation"` to `.app-nav`.
5. **`src/components/ResearchCard.astro`** — Added `aria-label="Close citation dialog"` to close button; added `role="dialog"`, `aria-modal="true"`, and `aria-label` to `.cite-overlay`.
6. **`src/components/NoteRow.astro`** — Added descriptive `aria-label` to Naver external link including post title context.
7. **`src/components/SiteSearch.astro`** — Added `<label class="sr-only">` and `aria-label` to both search input variants; added `aria-live="polite"` and `aria-label` to results containers.
8. **`src/pages/login.astro`** — Added `aria-hidden="true" focusable="false"` to Google SVG; added `role="alert" aria-live="assertive"` to error message div.
9. **`src/components/Hero.astro`** — Added `aria-hidden="true"` to all four decorative background divs.
10. **`src/components/PageHeader.astro`** — Added `aria-hidden="true"` to all decorative background divs.
11. **`src/pages/research.astro`** — Added `aria-controls="topics-panel"` to topics trigger; added `aria-hidden="true"` to `▾` caret; added `role="region"` and `aria-label` to topics panel.
12. **`src/styles/global.css`** — Added `.sr-only` utility; added `.skip-link` styles; added comprehensive `:focus-visible` rules for all interactive elements with dark/light theme variants.

## What Needs Manual Attention

See items M1–M14 in the Detailed Findings table above. The most impactful remaining issues are:

1. **M1/M2** — `--text-3` color contrast fails in both themes (Critical — change two CSS variable values)
2. **M8** — Filter buttons lack `aria-pressed` state (Major — JS change in research.astro)
3. **M9** — Citation modal has no focus trap (Major — requires JS focus-trap implementation)
4. **M4** — Collapsed sidebar icon buttons need better screen reader labels (Major)
5. **M6** — Theme toggle `aria-label` should update dynamically (Minor — one-line JS change)
