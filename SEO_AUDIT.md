# SEO Audit — pailab.io (Astro)

**Date:** 2026-05-01  
**Auditor:** Claude Code (automated analysis + fixes)  
**Standard:** Lighthouse SEO + general completeness

---

## Summary

| Check | Status | Severity |
|-------|--------|----------|
| `<title>` — unique per page | PASS | — |
| `<meta name="description">` | PASS | — |
| `<link rel="canonical">` | PASS | — |
| Open Graph tags | PASS | — |
| Twitter Card tags | PASS | — |
| `<meta name="robots">` | PASS | — |
| `<meta name="viewport">` | PASS | — |
| `<html lang>` | PASS | — |
| `robots.txt` | PASS | — |
| Sitemap (`@astrojs/sitemap`) | PASS | — |
| RSS autodiscovery | PASS | — |
| hreflang (EN/KO) | PASS | — |
| JSON-LD: Organization (all pages) | PASS | — |
| JSON-LD: BlogPosting (notes) | **FIXED** | High |
| Heading hierarchy (one h1) | PASS | — |
| Descriptive link text | PASS | — |
| Crawlable links | PASS | — |

---

## Fixes Applied

### 1. BlogPosting JSON-LD slot placement (Critical)

**Issue:** In `PostLayout.astro`, the BlogPosting JSON-LD was wrapped in a conditional:
```astro
{!privatePage && (
  <script is:inline type="application/ld+json" slot="head" ... />
)}
```
In Astro, `slot="head"` only works on **direct children** of the component — not on elements wrapped inside `{}` JSX expressions. The JSON-LD was silently rendering inside `<main>` (the default slot body), not inside `<head>`.

**Fix:** Wrapped in `<Fragment slot="head">` so the slot directive is always resolved correctly, with the conditional inside:
```astro
<Fragment slot="head">
  {!privatePage && (
    <script is:inline type="application/ld+json" set:html={JSON.stringify({...})} />
  )}
</Fragment>
```

**File changed:** `src/layouts/PostLayout.astro`

---

## What Was Already Correct

`BaseLayout.astro` was already comprehensive:

- **Title:** `fullTitle` built from `title + siteName`; defaults to the lab name
- **Description:** passed as prop, defaults to lab description
- **Canonical:** `<link rel="canonical" href={Astro.url.href} />`
- **hreflang:** EN→KO and KO→EN alternates + `x-default`; dynamically computed from `Astro.url.pathname`
- **Open Graph:** `og:title`, `og:description`, `og:image` (resolved via `Astro.site`), `og:url`, `og:type` (overridable to `"article"`), `og:site_name`, `og:locale`
- **Twitter Card:** `summary_large_image`, title, description, image
- **Robots:** `index, follow` on public pages; private pages suppress the tag entirely (hidden via `privatePage` prop)
- **JSON-LD Organization:** Organization schema with founder, logo, sameAs links — rendered on all public pages
- **RSS autodiscovery:** EN and KO RSS feed links in `<head>`
- **Sitemap:** `@astrojs/sitemap` configured in `astro.config.mjs` — generates `sitemap-index.xml` at build time

---

## Recommendations (Not Fixed — Design Decisions)

1. **`og:image` for individual notes:** Currently all pages use `ogImage="/og-default.png"`. Consider generating per-post OG images using Astro's `@astrojs/og-image` or a Vercel OG edge function using the note's title and category color.

2. **`dateModified` in BlogPosting JSON-LD:** The schema currently only has `datePublished`. If notes are ever updated, add `dateModified` from the note's frontmatter (or git history).

3. **`robots.txt` — confirm sitemap URL:** `robots.txt` should reference the full absolute sitemap URL. Verify it includes `Sitemap: https://pailab.io/sitemap-index.xml` after the first Vercel build.

4. **Private pages:** Pages with `privatePage=true` suppress the robots meta entirely (no `index` or `noindex`). Consider explicitly adding `<meta name="robots" content="noindex, nofollow" />` for private pages so crawlers don't index partially-visible content.
