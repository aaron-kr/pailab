// src/content/config.ts
import { defineCollection, z } from "astro:content";

// ── Research papers ───────────────────────────────────────
const research = defineCollection({
  type: "content",
  schema: z.object({
    title:    z.string(),
    title_ko: z.string().optional(),
    authors:  z.string(),
    venue:    z.string(),
    year:     z.number(),
    status:   z.enum(["published", "in-review", "preprint"]),
    doi:      z.string().url().optional(),
    pdf:      z.string().url().optional(),
    tags:     z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

// ── Curriculum tracks ─────────────────────────────────────
const curriculum = defineCollection({
  type: "content",
  schema: z.object({
    title:      z.string(),
    title_ko:   z.string().optional(),
    track:      z.string(),          // "01", "02", etc.
    level:      z.enum(["beginner", "intermediate", "advanced", "open"]),
    units:      z.number(),
    bilingual:  z.boolean().default(true),
    description:    z.string(),
    description_ko: z.string().optional(),
    order:      z.number().default(99),
  }),
});

// ── Projects ──────────────────────────────────────────────
const projects = defineCollection({
  type: "content",
  schema: z.object({
    title:    z.string(),
    title_ko: z.string().optional(),
    year:     z.string(),            // "2025" or "2024–2025"
    status:   z.enum(["active", "published", "planned", "archived"]),
    tags:     z.array(z.string()).default([]),
    github:   z.string().url().optional(),
    demo:     z.string().url().optional(),
    order:    z.number().default(99),
  }),
});

// ── Course plug-in modules ────────────────────────────────
const modules = defineCollection({
  type: "content",
  schema: z.object({
    title:      z.string(),
    title_ko:   z.string().optional(),
    course_tag: z.string(),          // "C++", "IoT", "Database", "Circuits"
    duration:   z.string(),          // "3 weeks", "1 week"
    description:    z.string(),
    description_ko: z.string().optional(),
    order:      z.number().default(99),
  }),
});

// ── Notes (blog) ──────────────────────────────────────────
const notes = defineCollection({
  type: "content",
  schema: z.object({
    title:    z.string(),
    title_ko: z.string().optional(),
    pubDate:  z.date(),
    lang:     z.enum(["en", "ko", "both"]).default("en"),
    tags:     z.array(z.string()).default([]),
    summary:  z.string().optional(),
    summary_ko: z.string().optional(),
    naver_url:  z.string().url().optional(),  // cross-link to Naver for "both" posts
  }),
});

export const collections = { research, curriculum, projects, modules, notes };
