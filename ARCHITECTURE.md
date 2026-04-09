# PAI LAB — Data Architecture

## What goes where

| Data | Storage | Why |
|---|---|---|
| Light/dark theme | `localStorage` | Pure UI preference, no server needed |
| Language (en/ko) | `localStorage` | Same |
| User auth state | Firebase Auth | Required for identity |
| User role | Firestore `users/{uid}.role` | Source of truth; cached in `sessionStorage` for perf |
| User profile | Firestore `users/{uid}` | Single source of truth; powers both /members/profile and /team |
| Checklist state | Firestore `users/{uid}/checklist/{id}` | Per-user, persistent |
| Checklist config | Firestore `checklist_items` | Admin-editable |
| Projects | Firestore `projects` | Shared, live data |
| Research tracker | Firestore `research_ideas` | Shared, live data |
| Paper templates | Firestore `paper_templates` | Admin-managed, verifiable |
| Grants | Firestore `grants` | PI-private (only admin sees) |
| Images / files | URL strings only (no Storage) | Storage costs money |

**Nothing else in localStorage.**

---

## Team page question — answered

**Use Firestore profiles directly. No separate .md files.**

Reasoning:
- Students update `/members/profile` → data is in `users/{uid}`
- Public `/team` page queries `users` where `public_profile: true`
- Admin controls visibility in `/admin/students` (toggle `public_profile`)
- Admin controls display ORDER via `users/{uid}.team_order` field (default 99)
- No duplicate data. No manual syncing.

The only thing the admin controls that students don't is:
1. `public_profile` visibility toggle (can be overridden by admin)
2. `team_order` display order (set in `/admin/students`)
3. `role` (admin only)

Students control everything else in their own profile.

---

## Firestore collections

```
users/
  {uid}/
    displayName, email, photoURL, role, bio, interests, university, major,
    year, github, scholar, linkedin, website, public_profile, team_order,
    joined_at, updated_at

  {uid}/checklist/
    {itemId}/
      checked (bool), checkedAt (timestamp)

checklist_items/
  {id}/
    text, link, order

projects/
  {id}/
    title, description, status, tags, github, members (array of uid),
    lead_uid, created_at, updated_at

research_ideas/
  {id}/
    title, description, category, tags, status, priority, venue, notes,
    assignedTo, deadline, created_at, updated_at

paper_templates/
  {id}/
    society, venue, link, notes, last_checked, created_at

grants/
  {id}/
    name, agency, amount, status, deadline, url, notes, createdAt, updatedAt
    (Admin-only: Firestore rules should restrict read/write to admin role)
```
