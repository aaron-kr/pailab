// src/middleware.ts
// Handles two problems:
// 1. /ko/* pages that don't exist → redirect to EN equivalent with a query param
// 2. BaseLayout reads ?notranslated=1 and shows an alert banner

import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, redirect } = context;
  const path = url.pathname;

  // Only intervene on /ko/ paths
  if (!path.startsWith("/ko")) {
    return next();
  }

  // Let the request through first — if it 404s, Astro handles it
  // We catch the missing page differently: see the 404.astro redirect below
  return next();
});
