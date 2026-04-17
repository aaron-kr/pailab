// src/content/config.ts
// FIX: removed `slug` field from areas schema.
// Astro auto-generates `slug` from the filename — you cannot declare it in the schema.
// Access it as `area.slug` (not `area.data.slug`) everywhere.

import { defineCollection, z } from "astro:content";

const research = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    title_ko: z.string().optional(),
    authors: z.string(),
    venue: z.string(),                             // Short venue name: "JPEE", "KIICE ICFICE", etc.
    year: z.number(),
    status: z.enum(["published", "in-review", "preprint"]).default("published"),

    // === Type ===
    type: z.enum(["journal", "conference", "thesis"]).default("conference"),

    // === Link fields ===
    doi: z.string().optional(),                    // Journals: canonical DOI URL
    pdf: z.string().optional(),                    // Direct PDF link (rarely needed)
    researchgate_url: z.string().optional(),       // RG PDF / open-access mirror
    proceedings_url: z.string().optional(),        // Conference proceedings index URL
    slides_url: z.string().optional(),             // SlideDeck or Google Slides URL
    video_url: z.string().optional(),              // YouTube recording URL

    // === Display ===
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    thumbnailUrl: z.string().optional(),           // 68×68px figure crop (journals only)

    // === Korean app fields (KORUS) — optional metadata ===
    issn: z.string().optional(),
    volume: z.string().optional(),                 // e.g. "21 (2), 167-173"
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
    demo:         z.string().url().optional(),
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
    title:            z.string(),
    title_ko:         z.string().optional(),
    pubDate:          z.date(),
    lang:             z.enum(["en", "ko", "both"]).default("en"),
    tags:             z.array(z.string()).default([]),
    category:         z.string().optional(),   // matches area file slug (filename without .md)
    summary:          z.string().optional(),
    naver_url:        z.string().optional(),
    categoryFeatured: z.boolean().default(false),
    featuredImage:    z.string().optional(),
    headerBgImage:    z.string().optional(),
  }),
});

const areas = defineCollection({
  type: "content",
  schema: z.object({
    title:          z.string(),
    title_ko:       z.string().optional(),
    // ↑ NO `slug` field — Astro auto-generates slug from filename.
    // Use area.slug (not area.data.slug) when you need the slug value.
    icon:           z.string().optional(),
    description:    z.string(),
    description_ko: z.string().optional(),
    color:          z.string().optional(),
    order:          z.number().default(99),
  }),
});

export const collections = { research, curriculum, projects, modules, notes, areas };
