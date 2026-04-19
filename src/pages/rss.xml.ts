import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const allNotes = await getCollection("notes");

  // English feed: include posts where lang is "en" or "both"
  const notes = allNotes
    .filter((note) => !note.data.lang || note.data.lang === "en" || note.data.lang === "both")
    .sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());

  return rss({
    title: "PAI Lab Notes",
    description: "Research notes, tutorials, and updates from the Physical AI Laboratory at Jeonju, Korea.",
    site: context.site ?? "https://pailab.io",
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.summary ?? "",
      pubDate: new Date(note.data.pubDate),
      link: `/notes/${note.slug}/`,
      categories: note.data.tags ?? [],
    })),
    customData: `<language>en-us</language>`,
    stylesheet: "/rss-styles.xsl",
  });
}
