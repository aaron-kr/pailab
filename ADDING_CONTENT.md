# PAI LAB — Adding Content

All public content lives in `src/content/` as Markdown (or MDX) files.  
Each subfolder is an Astro "content collection" with a schema defined in `src/content/config.ts`.

---

## Research Papers (`src/content/research/`)

Create one `.md` file per paper. Filename becomes the URL slug.

```markdown
---
title: "Your paper title"
title_ko: "논문 제목 (한국어)"           # optional Korean title
authors: "Snowberger, A., Co-Author B"
venue: "IEEE ICTC"
year: 2025
status: "published"    # published | in-review | preprint
doi: "https://doi.org/10.1234/..."       # optional
pdf: "https://link-to-pdf.com"           # optional
tags: ["Physical AI", "Edge ML", "YOLO"]
featured: false        # true = appears in "Featured" section on research page
thumbnailUrl: "/papers/my-paper-fig1.jpg"  # optional small figure image (68×68px crop)
                                           # place the image in /public/papers/
---

Abstract or summary text here. This appears on the paper's detail card.
```

**Status options:**
- `published` — green indicator
- `in-review` — cyan indicator  
- `preprint` — blue indicator

**Thumbnail:** A small figure or diagram from the paper. Place the image in `public/papers/` and use a path like `/papers/filename.jpg`. It renders as a 68×68px thumbnail beside the paper row — optional, does not break layout if absent.

---

## Notes / Blog Posts (`src/content/notes/`)

The main lab blog. Supports Markdown and MDX (`.md` or `.mdx`).

```markdown
---
title: "Post title"
title_ko: "게시물 제목"                  # optional Korean title
pubDate: 2025-06-01                      # YYYY-MM-DD
lang: "both"                             # en | ko | both
tags: ["Tutorial", "ROS 2", "Edge AI"]
category: "edge-ai"                      # optional — matches area filename slug
                                         # see src/content/areas/ for valid slugs
categoryFeatured: false                  # true = shown as "Featured Post" on category page
summary: "One-sentence description for SEO and list previews."
naver_url: "https://blog.naver.com/aaron_kr/..."  # if lang: "both"

# Optional images:
featuredImage: "/images/posts/my-post-hero.jpg"
# ↑ Large photo shown ABOVE the post body (full container width, 480px max height)
# Place in /public/images/posts/

headerBgImage: "/images/posts/my-header-bg.jpg"
# ↑ Subtle background behind the page header strip (blended at 25% opacity)
# Place in /public/images/posts/
---

Post content here in Markdown or MDX.
```

**Category field:** Links this post to a research area. Value must match the filename of an area in `src/content/areas/` (without `.md`). For example, `category: "edge-ai"` links to `src/content/areas/edge-ai.md`.

**Featured post:** Set `categoryFeatured: true` on ONE post per category to make it the "definitive" post shown at the top of that category archive page.

**Language field:**
- `en` — English only (appears on `/notes`, not `/ko/notes`)
- `ko` — Korean only (appears on `/ko/notes`)
- `both` — bilingual; appears on both, shows Naver link if `naver_url` is set

---

## Projects (`src/content/projects/`)

```markdown
---
title: "Gesture-Controlled Robotic Arm"
title_ko: "제스처 제어 로봇 팔"           # optional
year: "2025–"
status: "active"       # active | published | planned | archived
tags: ["ROS 2", "Edge AI", "Arduino"]
github: "https://github.com/aaronkr-classroom/..."  # optional
order: 1               # display order on the page (lower = first)
description: "One-sentence project description for the card."  # optional
thumbnailUrl: "/images/projects/arm-thumb.jpg"  # optional project image
---

Full project description in Markdown. This appears on the individual project page at `/projects/your-filename`.
```

**Status groups:** Projects are grouped by status on the projects page (active first, then published, planned, archived).

---

## Curriculum Tracks (`src/content/curriculum/`)

```markdown
---
title: "Track 01: Physical AI Foundations"
title_ko: "트랙 01: 피지컬 AI 기초"
track: "01"            # track number string
level: "beginner"      # beginner | intermediate | advanced | open
units: 8               # number of course units
bilingual: true        # true = shows EN · 한국어 badge
description: "English description shown on curriculum page."
description_ko: "한국어 설명."             # optional
order: 1               # display order
---

Optional extended description or syllabus outline in Markdown.
```

---

## Course Plug-in Modules (`src/content/modules/`)

```markdown
---
title: "Sensor Fusion for IoT Courses"
title_ko: "IoT 과목용 센서 융합"
course_tag: "IoT"      # short label shown as the course type badge
duration: "2 weeks"
description: "English description."
description_ko: "한국어 설명."
order: 1
---

Extended module description in Markdown.
```

---

## Research Areas (`src/content/areas/`)

One file per research area. The **filename (without `.md`)** is used as the category slug — it must match the `category` field in any notes you want to link.

```markdown
---
title: "Edge AI & Deployment"
title_ko: "엣지 AI 및 배포"
# ⚠ Do NOT add a `slug` field — Astro auto-generates it from the filename.
icon: "⚡"
description: "English description shown on the areas page and category archives."
description_ko: "한국어 설명."
color: "#f59e0b"       # CSS color for the area chip/badge
order: 5               # display order on the areas page
---
```

**Valid area slugs** (existing files):
- `embodied-intelligence`
- `autonomous-robotics`
- `digital-twin`
- `sensor-fusion`
- `edge-ai`
- `human-robot`
- `pai-education`
- `open-datasets`

To add a new area: create `src/content/areas/your-new-slug.md` — the nav and category pages update automatically.

---

## Background images

### Hero section (homepage)
Uncomment the `background-image` line in `Hero.astro` and place `hero.jpg` in `/public/`:
```css
/* In Hero.astro <style> or inside the hero-bg inline style: */
background-image: url('/hero.jpg');
```

### Page headers (PageHeader component)
Pass `bgImage` to any `<PageHeader>`:
```astro
<PageHeader title="Research" bgImage="/images/research-header.jpg" />
```
The image is blended at 25% opacity over the mesh gradient — adds texture without fighting the text.

### Note / post header background
Add to frontmatter:
```yaml
headerBgImage: "/images/posts/my-bg.jpg"
```

### Note / post featured image (above body)
Add to frontmatter:
```yaml
featuredImage: "/images/posts/my-hero.jpg"
```

### Project card thumbnail
Add to project frontmatter:
```yaml
thumbnailUrl: "/images/projects/my-project.jpg"
```

### Paper row thumbnail
Add to research paper frontmatter:
```yaml
thumbnailUrl: "/papers/my-figure.jpg"
```

---

## Page header sizes

All content pages use `<PageHeader>` with a `size` prop:
- `size="sm"` — 200px height (compact)
- `size="md"` — 280px height (standard, recommended)
- `size="lg"` — 380px height (spacious)

**For all notes pages at once:** change the `size` prop in `src/layouts/PostLayout.astro` (line ~77, labelled with a comment).

**For an individual page:** change the prop in that page's `<PageHeader>` call.

---

## Team members (public team page)

Team members are managed through their own profiles at `/members/profile`.  
The public `/team` page reads directly from Firestore `users` where `public_profile: true`.

**Workflow:**
1. Student logs in → goes to `/members/profile`
2. Fills in name, bio, university, interests, photo URL, links
3. Sets "Show on public Team page" toggle ON
4. Admin can override visibility and set display order in `/admin/students`

**Photo URL:** Students paste any public image URL (GitHub avatar, Google Photos share link, etc.). No file upload — no Firebase Storage cost.

**Display order:** Set `team_order` field in Firestore for each user document (lower = appears first). Default is 99. PI is always shown first as a static card.

---

## Homepage sections

The homepage (`src/pages/index.astro`) contains these sections in order:
1. Hero — `Hero.astro` component
2. Partner strip — university affiliations
3. Research Areas (00) — links to `/areas`
4. Research Papers (01) — from `content/research/`
5. Curriculum (02) — from `content/curriculum/`
6. Projects (03) — from `content/projects/`
7. Modules (04) — from `content/modules/`
8. Notes (05) — from `content/notes/`
9. Join section — links to `/join`
10. About (06) — PI profile
11. Team (07) — `TeamSection.astro` (optional, Firestore)

**To show/hide the Team section:** Add or remove `<TeamSection />` in `index.astro`.  
**To reorder sections:** Move the section blocks in `index.astro`.
