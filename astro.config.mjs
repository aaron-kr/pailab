import { defineConfig } from "astro/config";
import pagefind from 'astro-pagefind';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  site: "https://pailab.io",
  integrations: [pagefind(), mdx(), sitemap()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
