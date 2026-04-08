import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://pailab.io",
  integrations: [mdx(), sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
