// src/content/config.ts
import { defineCollection, z } from "astro:content";

const research = defineCollection({
  type: "content",
  schema: z.object({
    title:        z.string(),
    title_ko:     z.string().optional(),
    authors:      z.string(),
    venue:        z.string(),
    year:         z.number(),
    status:       z.enum(["published", "in-review", "preprint"]),
    doi:          z.string().url().optional(),
    pdf:          z.string().url().optional(),
    tags:         z.array(z.string()).default([]),
    featured:     z.boolean().default(false),
    // Optional thumbnail — a small image from the paper (figure, diagram, etc.)
    // Use a URL or a path relative to /public/  e.g. "/papers/my-paper-thumb.jpg"
    thumbnailUrl: z.string().optional(),
  }),
});

const curriculum = defineCollection({
  type: "content",
  schema: z.object({
    title:          z.string(),
    title_ko:       z.string().optional(),
    track:          z.string(),
    level:          z.enum(["beginner", "intermediate", "advanced", "open"]),
    units:          z.number(),
    bilingual:      z.boolean().default(false),
    description:    z.string(),
    description_ko: z.string().optional(),
    order:          z.number().default(99),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title:        z.string(),
    title_ko:     z.string().optional(),
    year:         z.string(),
    status:       z.enum(["active", "published", "planned", "archived"]),
    tags:         z.array(z.string()).default([]),
    github:       z.string().optional(),
    order:        z.number().default(99),
    description:  z.string().optional(),
    thumbnailUrl: z.string().optional(),
  }),
});

const modules = defineCollection({
  type: "content",
  schema: z.object({
    title:          z.string(),
    title_ko:       z.string().optional(),
    course_tag:     z.string(),
    duration:       z.string(),
    description:    z.string(),
    description_ko: z.string().optional(),
    order:          z.number().default(99),
  }),
});

const notes = defineCollection({
  type: "content",
  schema: z.object({
    title:          z.string(),
    title_ko:       z.string().optional(),
    pubDate:        z.date(),
    lang:           z.enum(["en", "ko", "both"]).default("en"),
    tags:           z.array(z.string()).default([]),
    // ── Category links to Research Areas ──────────────────
    // Matches the slug in src/pages/notes/category/[category].astro
    // e.g. "embodied-intelligence" | "edge-vision" | "sensor-fusion"
    category:       z.string().optional(),
    // ── Summary / metadata ─────────────────────────────────
    summary:        z.string().optional(),
    naver_url:      z.string().optional(),
    // ── Mark as the definitive/featured post for its category ─
    categoryFeatured: z.boolean().default(false),
    // ── Images ────────────────────────────────────────────
    featuredImage:  z.string().optional(),
    headerBgImage:  z.string().optional(),
  }),
});

// ── Research area categories (for /notes/category/[slug] pages) ──
// These are defined statically in src/content/areas/ — one .md per area.
const areas = defineCollection({
  type: "content",
  schema: z.object({
    title:        z.string(),
    title_ko:     z.string().optional(),
    slug:         z.string(),       // must match the category field in notes
    icon:         z.string().optional(),
    description:  z.string(),
    description_ko: z.string().optional(),
    color:        z.string().optional(), // CSS color for the area chip
    order:        z.number().default(99),
  }),
});

export const collections = {
  research,
  curriculum,
  projects,
  modules,
  notes,
  areas,
};
