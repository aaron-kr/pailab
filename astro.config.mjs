import { defineConfig } from "astro/config";
import pagefind from 'astro-pagefind';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/static";
import remarkBilingual from "./src/plugins/remark-bilingual.mjs";

export default defineConfig({
  site: "https://pailab.io",
  integrations: [mdx(), sitemap(), pagefind()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  markdown: {
    remarkPlugins: [remarkBilingual],
  },
});
