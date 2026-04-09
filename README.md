# PAI LAB — Physical AI Laboratory

> **`pailab.io` v3** (update `astro.config.mjs` once domain is confirmed)

A bilingual (EN / 한국어) academic lab website for the Physical AI Laboratory.
Built with [Astro](https://astro.build) v4, deployed on [Vercel](https://vercel.com) or
[Netlify](https://netlify.com). Zero JS on the client by default — the only
client-side JS is the theme toggle and language switcher.

---

## Quick start

```bash
# 1 — Clone
git clone https://github.com/aaronkr-classroom/pailab.git
cd pailab

# 2 — Install
npm install

# 3 — Dev server (http://localhost:4321)
npm run dev

# 4 — Build for production
npm run build

# 5 — Preview production build
npm run preview
```

---

## Project structure

```
pailab/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Nav.astro          ← sticky nav, lang toggle, theme toggle
│   │   ├── Hero.astro         ← homepage hero section
│   │   ├── Footer.astro
│   │   ├── ResearchCard.astro ← paper card (used on home + /research)
│   │   ├── ProjectRow.astro   ← project table row
│   │   └── NoteRow.astro      ← note list row with lang badge
│   ├── content/
│   │   ├── config.ts          ← Zod schemas for all collections
│   │   ├── research/          ← one .md per paper
│   │   ├── curriculum/        ← one .md per track
│   │   ├── projects/          ← one .md per project
│   │   ├── modules/           ← one .md per plug-in module
│   │   └── notes/             ← blog posts (MDX supported)
│   ├── i18n/
│   │   └── translations.ts    ← all UI strings in EN + KO
│   ├── layouts/
│   │   ├── BaseLayout.astro   ← HTML shell, SEO, theme init script
│   │   └── PostLayout.astro   ← individual note/post layout with prev/next
│   ├── pages/
│   │   ├── index.astro        ← EN homepage (all sections)
│   │   ├── research.astro
│   │   ├── curriculum.astro
│   │   ├── projects.astro
│   │   ├── modules.astro
│   │   ├── about.astro
│   │   ├── notes/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── ko/                ← Korean mirrors (same structure)
│   │   │   ├── index.astro
│   │   │   ├── research.astro
│   │   │   └── notes/
│   │   │       ├── index.astro
│   │   │       └── [slug].astro
│   │   └── 404.astro
│   └── styles/
│       └── global.css         ← CSS custom properties, light/dark, layout
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Light / dark mode

Theme is controlled by a `data-theme="light|dark"` attribute on `<html>`.
The `BaseLayout` reads `localStorage` before first paint to avoid flash.
The toggle button (`#theme-toggle` in `Nav.astro`) writes to `localStorage`.

CSS custom properties in `global.css`:

```css
:root           { --bg: #f9f8f6; --accent: #0a7c6e; /* ... */ }
[data-theme="dark"] { --bg: #111110; --accent: #2dd4bf; /* ... */ }
```

To change the brand colour, update `--accent` / `--accent-bg` / `--accent-text`
in both `:root` and `[data-theme="dark"]`.

---

## Bilingual (EN / 한국어)

### URL structure

| Path          | Language |
|---------------|----------|
| `/`           | English  |
| `/research`   | English  |
| `/notes/slug` | English  |
| `/ko/`        | Korean   |
| `/ko/research`| Korean   |
| `/ko/notes/slug` | Korean |

The `Nav` component automatically generates the correct alternate URL and
passes it to the language toggle `<a>` link.

### Adding translations

All UI strings live in `src/i18n/translations.ts`. Add a key to both
the `en` and `ko` objects, then use `t(lang, "your_key")` in any `.astro` file.

### Bilingual content fields

Content collection items support `title_ko`, `description_ko`, `summary_ko`.
If the Korean field is absent, the English field is used as fallback everywhere.

### Cross-linking to Naver blog

For notes with `lang: "both"`, add a `naver_url` frontmatter field.
`PostLayout` and `NoteRow` automatically render a "한국어로 읽기 ↗" link.

---

## Adding content

### New research paper

Create `src/content/research/your-paper-slug.md`:

```markdown
---
title: "Your paper title"
title_ko: "논문 제목 (한국어)"
authors: "A. Snowberger, Co-Author"
venue: "IEEE ICTC"
year: 2025
status: "published"           # published | in-review | preprint
doi: "https://doi.org/..."    # optional
pdf: "https://..."            # optional
tags: ["Physical AI", "Edge ML"]
featured: false
---

Abstract or summary here.
```

### New note / blog post

Create `src/content/notes/your-post-slug.md` (or `.mdx` for components):

```markdown
---
title: "Post title"
title_ko: "게시물 제목"
pubDate: 2025-06-01
lang: "both"                  # en | ko | both
tags: ["Tutorial", "ROS 2"]
summary: "One-sentence description for SEO and list previews."
naver_url: "https://blog.naver.com/aaron_kr/..."   # if lang: both
---

Post content in Markdown or MDX.
```

### New project

```markdown
---
title: "Project name"
title_ko: "프로젝트 이름"
year: "2025–"
status: "active"              # active | published | planned | archived
tags: ["Physical AI", "Arduino"]
github: "https://github.com/aaronkr-classroom/..."
order: 5                      # controls display order
---
```

### New curriculum track

```markdown
---
title: "Track title"
title_ko: "트랙 제목"
track: "05"
level: "intermediate"         # beginner | intermediate | advanced | open
units: 8
bilingual: true
description: "English description."
description_ko: "한국어 설명."
order: 5
---
```

### New plug-in module

```markdown
---
title: "Module title"
title_ko: "모듈 제목"
course_tag: "Python"          # displayed as the course type label
duration: "2 weeks"
description: "English description."
description_ko: "한국어 설명."
order: 5
---
```

## Firebase Storage rules (add to your Storage rules) - when ready for uploading student images ($)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Profile photos: only the owner can write, anyone can read
    match /profiles/{uid}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel --prod
```

Set the following in Vercel project settings:
- **Framework preset**: Astro
- **Build command**: `npm run build`
- **Output directory**: `dist`

### Netlify

Add `netlify.toml`:

```toml
[build]
  command   = "npm run build"
  publish   = "dist"

[[redirects]]
  from   = "/*"
  to     = "/404"
  status = 404
```

### GitHub Pages

Astro supports GitHub Pages via `@astrojs/github-pages`. Add to `astro.config.mjs`:

```js
import github from "@astrojs/github-pages";
export default defineConfig({
  integrations: [github()],
});
```

---

## Connecting courses.aaron.kr

The courses site at `aaronkr-courses.github.io` can be served under
`courses.aaron.kr` by adding a CNAME record in your DNS:

```
courses  CNAME  aaronkr-courses.github.io.
```

Then in the GitHub Pages repo settings, set the custom domain to `courses.aaron.kr`.

---

## Planned improvements

- [ ] OG image generation (Astro + Satori)
- [ ] RSS feed for notes (EN + KO separate feeds)
- [ ] Search (Pagefind — runs at build time, no server needed)
- [ ] Dark mode colour refinement pass
- [ ] Mobile hamburger menu for nav links
- [ ] Curriculum track detail pages (`/curriculum/[slug]`)
- [ ] Dataset download pages under `/curriculum/datasets`
