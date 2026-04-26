import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(_ctx: APIContext) {
  const allNotes = await getCollection("notes");

  const notes = allNotes
    .filter((n) => !n.data.private)
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
    )
    .slice(0, 8)
    .map((n) => ({
      title: n.data.title,
      date: n.data.pubDate.toISOString().slice(0, 7), // "YYYY-MM"
      tag: n.data.tags?.[0] ?? n.data.category ?? "",
      url: `/notes/${n.slug}/`,
      summary: n.data.summary ?? "",
    }));

  return new Response(JSON.stringify({ notes }), {
    headers: { "Content-Type": "application/json" },
  });
}
