// src/content/config.ts
// FIX: removed `slug` field from areas schema.
// Astro auto-generates `slug` from the filename — you cannot declare it in the schema.
// Access it as `area.slug` (not `area.data.slug`) everywhere.

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
