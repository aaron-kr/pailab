// src/scripts/tracker.ts
// Full CRUD logic for the /admin/tracker page.

import { getAllIdeas, addIdea, updateIdea, deleteIdea, type ResearchIdea, type Status } from "../lib/tracker";

let allIdeas: ResearchIdea[] = [];

// ── Load & render ──────────────────────────────────────────────────

async function loadIdeas() {
  allIdeas = await getAllIdeas();
  renderTable(allIdeas);
  const loading = document.getElementById("loading-msg");
  const wrap    = document.getElementById("table-wrap");
  if (loading) loading.style.display = "none";
  if (wrap)    wrap.style.display = "block";
}

function renderTable(ideas: ResearchIdea[]) {
  const tbody   = document.getElementById("ideas-tbody");
  const emptyEl = document.getElementById("empty-msg");
  const wrap    = document.getElementById("table-wrap");
  if (!tbody) return;

  const isEmpty = ideas.length === 0;
  if (emptyEl) emptyEl.style.display = isEmpty ? "block" : "none";
  if (wrap)    wrap.style.display    = isEmpty ? "none"  : "block";

  tbody.innerHTML = ideas.map(idea => `
    <tr data-id="${idea.id}">
      <td>
        <select class="status-select" data-id="${idea.id}">
          ${(["💡","⏳","▶️","✅","⛔"] as Status[]).map(s =>
            `<option ${s === idea.status ? "selected" : ""}>${s}</option>`
          ).join("")}
        </select>
      </td>
      <td>
        <strong>${idea.title}</strong>
        ${idea.githubUrl
          ? `<br><a href="${idea.githubUrl}" target="_blank" rel="noopener" style="font-size:0.75rem;color:var(--accent);">GitHub ↗</a>`
          : ""}
      </td>
      <td><span class="area-badge">${idea.area}</span></td>
      <td style="color:var(--fg-muted);font-size:0.8rem;">${idea.stage || "—"}</td>
      <td class="target-cell">${idea.target || "—"}</td>
      <td>${idea.paiLink?.trim()
        ? `<span class="pai-dot" title="${idea.paiLink}"></span>Yes`
        : `<span style="color:var(--fg-muted);font-size:0.8rem;">—</span>`
      }</td>
      <td class="note-cell" title="${idea.notes || ""}">${idea.notes || "—"}</td>
      <td><button class="btn edit-btn" data-id="${idea.id}" style="padding:3px 10px;font-size:0.75rem;">Edit</button></td>
    </tr>
  `).join("");

  // Inline status change
  tbody.querySelectorAll<HTMLSelectElement>(".status-select").forEach(sel => {
    sel.addEventListener("change", async () => {
      await updateIdea(sel.dataset.id!, { status: sel.value as Status });
    });
  });

  // Edit buttons
  tbody.querySelectorAll<HTMLButtonElement>(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.id!));
  });
}

// ── Filters ───────────────────────────────────────────────────────

function applyFilters() {
  const text   = (document.getElementById("filter-text") as HTMLInputElement).value.toLowerCase();
  const status = (document.getElementById("filter-status") as HTMLSelectElement).value;
  const area   = (document.getElementById("filter-area") as HTMLSelectElement).value;
  const pai    = (document.getElementById("filter-pai") as HTMLSelectElement).value;

  const filtered = allIdeas.filter(i => {
    if (text && !`${i.title} ${i.notes} ${i.area}`.toLowerCase().includes(text)) return false;
    if (status && i.status !== status) return false;
    if (area && i.area !== area) return false;
    if (pai === "yes" && !i.paiLink?.trim()) return false;
    if (pai === "no"  &&  i.paiLink?.trim()) return false;
    return true;
  });

  renderTable(filtered);
}

["filter-text","filter-status","filter-area","filter-pai"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input",  applyFilters);
    el.addEventListener("change", applyFilters);
  }
});

// ── Modal ─────────────────────────────────────────────────────────

function getVal(id: string) { return (document.getElementById(id) as HTMLInputElement)?.value ?? ""; }
function setVal(id: string, val: string) {
  const el = document.getElementById(id) as HTMLInputElement;
  if (el) el.value = val;
}

function openModal(id?: string) {
  const modal  = document.getElementById("modal");
  const delBtn = document.getElementById("modal-delete") as HTMLElement;
  const title  = document.getElementById("modal-title");
  if (!modal || !delBtn || !title) return;

  title.textContent    = id ? "Edit Idea" : "Add Idea";
  delBtn.style.display = id ? "inline-block" : "none";

  if (id) {
    const idea = allIdeas.find(i => i.id === id);
    if (!idea) return;
    setVal("f-id",      id);
    setVal("f-title",   idea.title);
    setVal("f-area",    idea.area);
    setVal("f-status",  idea.status);
    setVal("f-stage",   idea.stage || "");
    setVal("f-target",  idea.target || "");
    setVal("f-pailink", idea.paiLink || "");
    setVal("f-notes",   idea.notes || "");
    setVal("f-github",  idea.githubUrl || "");
    setVal("f-order",   String(idea.order ?? 99));
  } else {
    (document.getElementById("idea-form") as HTMLFormElement)?.reset();
    setVal("f-id", "");
  }

  modal.classList.add("open");
}

function closeModal() {
  document.getElementById("modal")?.classList.remove("open");
}

document.getElementById("add-btn")?.addEventListener("click", () => openModal());
document.getElementById("modal-cancel")?.addEventListener("click", closeModal);

document.getElementById("modal-delete")?.addEventListener("click", async () => {
  const id = getVal("f-id");
  if (!id) return;
  if (!confirm("Delete this idea? This cannot be undone.")) return;
  await deleteIdea(id);
  closeModal();
  await loadIdeas();
});

document.getElementById("idea-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = getVal("f-id");
  const data = {
    title:     getVal("f-title").trim(),
    area:      getVal("f-area"),
    status:    getVal("f-status") as Status,
    stage:     getVal("f-stage").trim(),
    target:    getVal("f-target").trim(),
    paiLink:   getVal("f-pailink").trim(),
    notes:     getVal("f-notes").trim(),
    githubUrl: getVal("f-github").trim(),
    order:     parseInt(getVal("f-order")) || 99,
  };
  id ? await updateIdea(id, data) : await addIdea(data);
  closeModal();
  await loadIdeas();
});

// ── Init ──────────────────────────────────────────────────────────
loadIdeas();
