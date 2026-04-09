// src/scripts/admin-dashboard.ts
// Loads research idea stats for the admin dashboard.

import { getAllIdeas } from "../lib/tracker";

async function init() {
  const ideas = await getAllIdeas();

  const total  = document.getElementById("stat-total");
  const active = document.getElementById("stat-active");
  const done   = document.getElementById("stat-done");
  const pai    = document.getElementById("stat-pai");

  if (total)  total.textContent  = String(ideas.length);
  if (active) active.textContent = String(ideas.filter(i => i.status === "▶️").length);
  if (done)   done.textContent   = String(ideas.filter(i => i.status === "✅").length);
  if (pai)    pai.textContent    = String(ideas.filter(i => i.paiLink?.trim()).length);
}

init();
