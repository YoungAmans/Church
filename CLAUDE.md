# Hope Church Web App — Project Memory

> This file is Claude Code's memory for this repo. Read it first every session.
> Full documentation lives in `docs/` (open that folder as an Obsidian vault). Start at `docs/00-Index.md`.

## Status (update this block at the end of every work session)

- **Date last updated:** 2026-11-08
- **Current phase:** Phase 0 — Documentation (see `docs/06-Development-Phases.md`)
- **Built so far:** public landing page UI only (React). All content is hardcoded. No working API, no database, no admin.
- **Next up:** answer open questions in `docs/14-Decisions-and-Open-Questions.md`, then start Phase 1.

## What this is

A web app for **Hope Church** (working name; a personal project to later propose to the church).
Two faces:

1. **Public site** — mobile-first, shows the church, announcements, service hours, ministries, events, live stream, prayer request, email sign-up.
2. **Admin** — church staff configure everything. The frontend only talks to the **API**; no content lives in the frontend code.

## Golden rules

1. **Document first.** Update `docs/` before or with the code, never after. A feature isn't done until its docs and test cases are updated.
2. **No hardcoded church data in components.** Name, mission, vision, address, phone, email, members, founding year, services, ministries, events all come from the API (`church_profile` etc.). The church name is configurable because "Hope" is a working name.
3. **Always soft delete.** Every table has `deleted_at`. Never `DELETE FROM`. Only documented exception: privacy purge of subscribers/prayer requests by a super admin, audited (see `docs/11-Security-and-Abuse-Prevention.md`).
4. **Frontend ↔ API only.** The React app calls `/api/public/*` (anonymous) and `/api/admin/*` (authenticated). It never touches the DB.
5. **Mobile first.** Design at 375px width, then scale up. Touch targets ≥ 44px.
6. **Validate once, share the schema.** Zod schemas live in `shared/` and are used by both API and frontend forms.
7. **Prayer requests are sensitive.** Anonymous by default, abuse-protected, visible only to `prayer_team`/`super_admin`. Never log their text.
8. **Times:** store UTC, interpret schedules in the church timezone (`Asia/Manila` default). Never compute "3rd Tuesday" in the browser.

## Stack

| Layer | Current repo (Replit scaffold) | Target (proposed, pending confirmation — ADR-001) |
|---|---|---|
| Frontend | React 18, Vite 7, Tailwind 3.4, shadcn/ui (Radix), wouter, TanStack Query, framer-motion | Same — keep |
| API | Express 4 + in-memory storage (empty routes) | Hono on Cloudflare Workers |
| DB | Drizzle + Postgres config (unused) | Cloudflare D1 (SQLite) + Drizzle |
| Files | none | Cloudflare R2 |
| Hosting | Cloudflare Workers static assets only (`wrangler.jsonc`) | One Worker: static assets + `/api/*` |
| Abuse protection | none | Turnstile + rate limiting |
| Email | none | Provider behind an interface (Resend default) + Cron Trigger |
| Tests | none | Vitest (+ Workers pool), Testing Library, Playwright |

The target mirrors the "FE needs only the API" pattern used in the owner's Rentspot project. **Rentspot's exact stack was not visible when this was written — confirm in ADR-001 before Phase 1.**

## Commands

Work today (current scaffold):

```bash
npm install
npm run dev        # Express + Vite dev server on http://localhost:5000
npm run check      # TypeScript check
npm run build      # client -> dist/public, server -> dist/index.cjs
```

Planned after Phase 1 (do not assume they exist yet): `npm run db:migrate:local`, `npm run db:seed`, `npm test`, `npm run test:e2e`, `npm run deploy`. See `docs/07-How-To-Run.md`.

> Windows note: `npm start` uses `NODE_ENV=production node ...`, which fails in PowerShell/cmd. Use `cross-env` (already installed).

## Repo map

```
client/src/            React app (pages/, components/, components/ui = shadcn, lib/, hooks/)
server/                Express scaffold (to be replaced by api/ in Phase 1)
shared/schema.ts       Drizzle + Zod schemas (only a `users` table today)
attached_assets/       Images used by the UI
docs/                  Obsidian vault: all project documentation
wrangler.jsonc         Cloudflare deploy config (assets only today)
design_guidelines.md   Visual design reference for the public site
```

## Key business rules (details in docs/02 and docs/08)

- **Announcement is public when:** published AND `effective_at <= now` AND (`expires_at` is null OR `expires_at > now`) AND not soft-deleted. Public filter: All / Daily / Weekly / Monthly.
- **Years serving** = current year − `founded_year`, computed server-side.
- **Default services:** Sunday morning 9:00 AM–12:00 PM, Sunday afternoon 3:00 PM–6:00 PM. Admin can add/soft-delete others, including "Nth weekday of month" (e.g. corporate prayer, 3rd Tuesday, 7–9 PM).
- **Events** can require registration. If so, the admin builds a form (field types: text, textarea, email, phone, number, select, radio, checkbox, date).
- **Subscribers** use double opt-in and one-click unsubscribe.

## Conventions

- TypeScript strict. No `any` without a comment.
- API responses use the envelope `{ data }` or `{ error: { code, message, details? } }`.
- Every interactive element gets a `data-testid` (existing pattern in this repo).
- Branches: `feature/<short-name>`; commits: `type(scope): message` (feat, fix, docs, chore, test).
- Don't commit secrets, `.dev.vars`, `.local/`, or Replit agent state.

## Known cleanup (tracked in docs/13)

Replit leftovers (`.replit`, `.local/` agent state), `package.json` name `rest-express`, `build.ts` allowlist of unused packages, placeholder data from other church names ("Grace", "Faith"), and real-looking address/phone committed to a public repo.
