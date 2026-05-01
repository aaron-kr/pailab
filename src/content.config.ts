// src/content.config.ts  (Astro 6 Content Layer API)
// Migrated from src/content/config.ts — all collections now use glob() loaders.
// Entry IDs are now file-path relative to base (e.g. "2024/my-note" for notes).

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    title_ko: z.string().optional(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    status: z.enum(["published", "in-review", "preprint"]).default("published"),
    private: z.boolean().default(false),
    type: z.enum(["journal", "conference", "thesis"]).default("conference"),
    doi: z.string().optional(),
    pdf: z.string().optional(),
    researchgate_url: z.string().optional(),
    proceedings_url: z.string().optional(),
    slides_url: z.string().optional(),
    video_url: z.string().optional(),
    riss: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    thumbnailUrl: z.string().optional(),
    issn: z.string().optional(),
    volume: z.string().optional(),
    awards: z.string().optional(),
    awards_ko: z.string().optional(),
    awards_url: z.string().optional(),
  }),
});

const curriculum = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/curriculum" }),
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
    private:        z.boolean().default(false),
  }),
});

const units = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/units" }),
  schema: z.object({
    title:          z.string(),
    title_ko:       z.string().optional(),
    track:          z.string(),
    unit_number:    z.number(),
    description:    z.string().optional(),
    description_ko: z.string().optional(),
    duration:       z.string().optional(),
    image:          z.string().optional(),
    objectives:     z.array(z.string()).default([]),
    order:          z.number().default(99),
    private:        z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title:          z.string(),
    title_ko:       z.string().optional(),
    description:    z.string().optional(),
    description_ko: z.string().optional(),
    parent_page:    z.string().optional(),
    eyebrow:        z.string().optional(),
    nav_label:      z.string().optional(),
    nav_label_ko:   z.string().optional(),
    show_in_nav:    z.boolean().default(false),
    nav_order:      z.number().default(99),
    order:          z.number().default(99),
    private:        z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/projects" }),
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
    private:      z.boolean().default(false),
  }),
});

const modules = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/modules" }),
  schema: z.object({
    title:          z.string(),
    title_ko:       z.string().optional(),
    course_tag:     z.string(),
    duration:       z.string(),
    description:    z.string(),
    description_ko: z.string().optional(),
    order:          z.number().default(99),
    private:        z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title:            z.string(),
    title_ko:         z.string().optional(),
    pubDate:          z.date(),
    lang:             z.enum(["en", "ko", "both"]).default("en"),
    tags:             z.array(z.string()).default([]),
    category:         z.string().optional(),
    summary:          z.string().optional(),
    naver_url:        z.string().optional(),
    categoryFeatured: z.boolean().default(false),
    featuredImage:    z.string().optional(),
    headerBgImage:    z.string().optional(),
    private:          z.boolean().default(false),
  }),
});

const areas = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/areas" }),
  schema: z.object({
    title:          z.string(),
    title_ko:       z.string().optional(),
    icon:           z.string().optional(),
    description:    z.string(),
    description_ko: z.string().optional(),
    color:          z.string().optional(),
    order:          z.number().default(99),
  }),
});

export const collections = { research, curriculum, units, pages, projects, modules, notes, areas };
