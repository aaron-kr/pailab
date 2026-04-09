// src/content/config.ts
import { defineCollection, z } from "astro:content";

const research = defineCollection({
  type: "content",
  schema: z.object({
    title:       z.string(),
    title_ko:    z.string().optional(),
    authors:     z.string(),
    venue:       z.string(),
    year:        z.number(),
    status:      z.enum(["published", "in-review", "preprint"]),
    doi:         z.string().optional(),
    pdf:         z.string().optional(),
    tags:        z.array(z.string()).default([]),
    featured:    z.boolean().default(false),
  }),
});

const curriculum = defineCollection({
  type: "content",
  schema: z.object({
    title:        z.string(),
    title_ko:     z.string().optional(),
    track:        z.string(),
    level:        z.enum(["beginner", "intermediate", "advanced", "open"]),
    units:        z.number(),
    bilingual:    z.boolean().default(false),
    description:  z.string(),
    description_ko: z.string().optional(),
    order:        z.number().default(99),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title:    z.string(),
    title_ko: z.string().optional(),
    year:     z.string(),
    status:   z.enum(["active", "published", "planned", "archived"]),
    tags:     z.array(z.string()).default([]),
    github:   z.string().optional(),
    order:    z.number().default(99),
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
    summary:        z.string().optional(),
    naver_url:      z.string().optional(),
    // ── Image fields ────────────────────────────────────
    featuredImage:  z.string().optional(), // wide image above post body
    headerBgImage:  z.string().optional(), // subtle bg behind the page header strip
  }),
});

export const collections = {
  research,
  curriculum,
  projects,
  modules,
  notes,
};
