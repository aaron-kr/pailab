# PAI LAB — Translations & Navigation

---

## Translation system

All UI strings live in `src/i18n/translations.ts`.

### Adding a new UI string

```typescript
// In translations.ts:
const translations = {
  en: {
    // existing keys...
    my_new_key: "English text",
  },
  ko: {
    // existing keys...
    my_new_key: "한국어 텍스트",
  },
} as const;
```

Then use it in any `.astro` file:
```astro
---
import { t } from "@/i18n/translations";
const lang = "en"; // or from props
---
<p>{t(lang, "my_new_key")}</p>
```

### altLangUrl helper

Generates the correct URL for the language toggle button:
```typescript
import { altLangUrl } from "@/i18n/translations";
const toggleHref = altLangUrl(currentPath, lang);
```

**Bug note:** The `/ko/ko/ko` accumulation bug was fixed — the function now strips ALL leading `/ko` prefixes before rebuilding the URL:
```typescript
const cleanPath = currentPath.replace(/^(\/ko)+/, "") || "/";
return currentLang === "en" ? `/ko${cleanPath}` : cleanPath;
```

---

## Korean page mirrors

### URL structure

| English | Korean |
|---|---|
| `/` | `/ko/` |
| `/research` | `/ko/research` |
| `/notes` | `/ko/notes` |
| `/notes/slug` | `/ko/notes/slug` |
| `/join` | `/ko/join` ← redirects to EN + shows banner |

All Korean pages are in `src/pages/ko/`. They mirror the structure of the English pages.

### Pages NOT yet translated

These pages redirect to the English version with a "no translation" banner:
- `/ko/join` → `/join?notranslated=1`
- Any `/ko/*` path with no matching file → `404.astro` detects `/ko/` prefix → redirects to EN + banner

To add a Korean translation for a page:
1. Create `src/pages/ko/pagename.astro`
2. Duplicate the English page, change `lang = "ko"` and translate strings
3. The redirect stub (`src/pages/ko/join.astro`) can be replaced by the full translation

### Translation banner

`TranslationBanner.astro` reads `?notranslated=1` from the URL, shows a dismissible blue banner, then cleans the URL with `history.replaceState`. It is included in `BaseLayout.astro` automatically.

---

## Content collection bilingual fields

Most content types support Korean frontmatter fields. If absent, the English value is used as fallback:

```yaml
title: "English title"
title_ko: "한국어 제목"           # optional, used on /ko/ pages
description: "English description"
description_ko: "한국어 설명."    # optional
```

Notes also support:
```yaml
lang: "both"                      # shows on both /notes and /ko/notes
naver_url: "https://..."          # link to Naver blog Korean post
```

---

## Configuring the navigation

The nav is configured at the **top of `src/components/Nav.astro`** in the `NAV` array. No separate config file needed.

### Nav item types

**Direct link:**
```typescript
{ label: "About", href: `${p}/about` }
```
- `${p}` is the lang prefix (`"/ko"` on Korean pages, `""` on English)
- `hideOnKo: true` hides this item on Korean pages

**Dropdown group:**
```typescript
{
  label: "Research",
  items: [
    { label: "Areas",   href: `${p}/areas` },
    { label: "Papers",  href: `${p}/research` },
    { label: "Projects", href: `${p}/projects` },
  ],
}
```

### Current nav structure

```typescript
const NAV = [
  {
    label: "Research",
    items: [
      { label: "Areas",       href: `${p}/areas` },
      { label: "Papers",      href: `${p}/research` },
      { label: "Projects",    href: `${p}/projects` },
    ],
  },
  {
    label: "Learn",
    items: [
      { label: "Curriculum",  href: `${p}/curriculum` },
      { label: "Modules",     href: `${p}/modules` },
      { label: "Notes",       href: `${p}/notes` },
    ],
  },
  { label: "Team",   href: `/team` },
  { label: "Join",   href: `${p}/join` },
  { label: "About",  href: `${p}/about` },
];
```

### Dropdown behavior

- Opens on click (not hover — more accessible on touch devices)
- Closes on outside click or Escape key
- The trigger button inherits the same height and font as anchor links via shared `.nav-link` class
- Active state highlights both the trigger (if any child is active) and individual child items

### Adding a link to the nav

1. Open `src/components/Nav.astro`
2. Add to `NAV` array at the top — either a new direct link or a new item inside an existing dropdown's `items` array
3. No rebuild needed for dev — Astro hot-reloads

---

## Hreflang SEO

`BaseLayout.astro` automatically generates `hreflang` link tags:
```html
<!-- On English pages: -->
<link rel="alternate" hreflang="ko" href="/ko/current-path" />
<!-- On Korean pages: -->
<link rel="alternate" hreflang="en" href="/current-path" />
<link rel="alternate" hreflang="x-default" href="/current-path" />
```
