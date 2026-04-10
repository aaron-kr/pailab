import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const allNotes = await getCollection("notes");

  // Korean feed: include posts where lang is "ko" or "both"
  const notes = allNotes
    .filter((note) => note.data.lang === "ko" || note.data.lang === "both")
    .sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());

  return rss({
    title: "PAI Lab 노트",
    description: "전주 물리적 AI 연구실(PAI Lab)의 연구 노트, 튜토리얼, 업데이트.",
    site: context.site ?? "https://pailab.io",
    items: notes.map((note) => ({
      title: note.data.title_ko ?? note.data.title,
      description: note.data.summary ?? note.data.description ?? "",
      pubDate: new Date(note.data.pubDate),
      link: `/ko/notes/${note.slug}/`,
      categories: note.data.tags ?? [],
    })),
    customData: `<language>ko</language>`,
    stylesheet: "/rss-styles.xsl",
  });
}
