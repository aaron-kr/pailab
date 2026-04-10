# Pagefind Setup — PAI Lab

## 1. Install

```bash
npm install @astrojs/pagefind
# or just the CLI:
npm install -D pagefind
```

## 2. Wire into your build (astro.config.mjs)

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import pagefind from '@astrojs/pagefind';  // add this

export default defineConfig({
  site: 'https://pailab.io',
  integrations: [
    pagefind(),   // add this — runs `pagefind --site dist` after build
  ],
  // ... rest of your config
});
```

If you prefer to run it manually (e.g. in CI):
```bash
npm run build && npx pagefind --site dist
```

## 3. Add the Search button to Nav.astro

In `src/components/Nav.astro`, import and add `<SiteSearch />` to the `.nav-controls` div:

```astro
---
import SiteSearch from "@/components/SiteSearch.astro";
// ... existing imports
---

<!-- Inside .nav-controls (near the theme toggle): -->
<div class="nav-controls">
  <SiteSearch variant="compact" />          <!-- ADD THIS -->
  <!-- existing theme toggle + lang toggle -->
</div>
```

## 4. Exclude admin/members from the index

Pagefind respects `data-pagefind-ignore` attributes. In `ProtectedLayout.astro`, add this to the `<main>` wrapper:

```astro
<main class="app-main" data-pagefind-ignore>
```

This keeps the search index public-only.

## 5. Tag content for better results (optional but nice)

In `BaseLayout.astro`, add metadata tags that Pagefind reads:

```astro
<!-- Page title weight -->
<h1 data-pagefind-meta="title">{title}</h1>

<!-- Exclude the nav + footer from excerpts -->
<nav data-pagefind-ignore>...</nav>
<footer data-pagefind-ignore>...</footer>
```

## 6. Add a /search link to the nav (optional)

In `Nav.astro`'s `NAV` array, you can add:
```ts
{ label: "Search", href: "/search", hideOnKo: false },
```

Or keep it icon-only via the compact trigger — up to you.

## 7. Dev mode note

During `npm run dev`, Pagefind JS won't exist (it's generated at build time).
The component handles this gracefully — the search input shows but returns no results.
Run `npm run build` once to generate `/dist/pagefind/` and test fully.
