---
title: Current State and Gap Analysis
tags: [analysis, gap]
status: draft
updated: 2026-11-08
---

# Current State and Gap Analysis

Reviewed on 2026-11-08 from the cloned repo `YoungAmans/Church` (latest commit `f0cb0f9`) and the published site `church.paul-amancioiii.workers.dev`.

## What exists

| Area | Finding |
|---|---|
| Origin | Generated on Replit ("Published your App"), later edited with commits from another contributor (PR #1) |
| Frontend | React 18, Vite 7, Tailwind 3.4, shadcn/ui (Radix), wouter, TanStack Query (configured, **not used for data**), framer-motion, react-hook-form + zod (installed), dark mode toggle |
| Page | Single route `/` composed of: Header, Hero, Announcements, About, Service Times, Ministries (Get Involved), Events, Location, Contact, App Download, Footer |
| Backend | Express scaffold. `routes.ts` is empty. `storage.ts` is an in-memory `users` map. No real endpoints |
| Schema | `shared/schema.ts` has only a `users` table (Postgres, Drizzle). `drizzle.config.ts` requires `DATABASE_URL` |
| Deploy | `wrangler.jsonc`: `assets` directory + SPA fallback only. No `main`, no D1/R2 bindings. Observability on |
| Design | `design_guidelines.md` exists and is a good visual reference |
| Assets | AI-generated images and logo/favicons in `attached_assets/` |
| Live stream | Hardcoded YouTube embed in `home.tsx`; the "Watch Online" opens a fullscreen theater |
| Tests | None |
| Docs | `README.MD` contains only `npm run dev` |

## Requirement coverage

| Requirement | Today | Gap |
|---|---|---|
| Public mobile view | ✅ Responsive layout exists | Verify at 375 px; wire to API |
| Live stream | 🟡 hardcoded embed + fullscreen | Admin control, live/offline states, replays |
| Announcements + filters + effective/expiry | 🟡 carousel with 5 **hardcoded** items (dated Dec 2024) | Whole backend, filter chips, dates, admin |
| Church setup (name, mission, vision, members, address, phone, email, years) | 🟡 values hardcoded; stats "500+", "25+" | Config table + admin + computed years |
| Service hours (+ add/soft delete, Nth weekday) | 🟡 3 hardcoded cards | Model, recurrence engine, admin |
| Get involved | 🟡 6 hardcoded ministries | CRUD + soft delete |
| Events + registration + forms | 🟡 4 hardcoded events (marked `todo: remove mock`) | Entire feature incl. form builder |
| Prayer requests (anonymous, abuse-safe) | 🔴 form only shows a "Message Sent" toast; **nothing is sent**. Requires name and email (not anonymous) | Entire feature + abuse controls |
| Email updates | 🔴 none | Entire feature |
| Admin | 🔴 none | Auth, roles, UI |
| FE talks only to API | 🔴 no API | Phase 1 |
| Documentation + tests | 🔴 | This vault + Phase 1 harness |

Legend: ✅ done · 🟡 UI mock only · 🔴 not started/not functional.

## Discrepancies with your requirements

| Item | Found in code | Your requirement |
|---|---|---|
| Sunday morning | 9:30 AM–12:00 PM | 9:00 AM–12:00 PM |
| Sunday afternoon | 3:30–6:00 PM | 3:00–6:00 PM |
| Extra card | "Monday–Saturday 9–6 church office hours" | Not in requirements (decide: office hours field or drop) |
| Label | "Opening Soon" under Service Hours | Remove/make configurable |
| Church name | "Welcome to **Faith** Church" in About; email `hello@**grace**community.church` | Name is **Hope** and must be configurable |
| Contact form | Name + email required, subject dropdown, fake submit | Prayer requests must be anonymous; email updates are a separate subscribe form |
| Event categories/dates | Mock data | Admin-managed |
| Announcement types | video / article / image (good) | Keep; add scope + dates |

## Repo hygiene issues

| Issue | Why it matters | Fix (Phase 1) |
|---|---|---|
| `.local/state/replit/agent/*.bin` committed | Replit agent state in the repo | `git rm -r --cached .local`, ignore |
| `.gitignore` last line is `*.tar.gz.local/` (two entries merged) | `.local/` is **not** ignored | Split into `*.tar.gz` and `.local/` |
| `.replit`, Replit Vite plugins | Not needed outside Replit | Remove |
| `package.json` name `rest-express` | Template name | `hope-church` |
| `script/build.ts` allowlists `stripe`, `openai`, `nodemailer`, `xlsx`… | Unused template leftovers | Replace with Worker build |
| `tailwindcss` 3.4 plus `@tailwindcss/vite` 4 in devDependencies | Conflicting majors; Vite config doesn't use the v4 plugin | Remove unused one |
| `server/` Express + `pg`, `passport`, `express-session`, `memorystore`, `ws` | Won't run on Workers | Replace with Hono |
| `npm start` uses inline `NODE_ENV=` | Fails on Windows shells | Removed with Express build |
| Global `staleTime: Infinity`, `refetchOnWindowFocus: false` | Stale announcements/stream | Per-query settings |
| Large AI images imported directly | Heavy on mobile | Optimise/serve from R2 |
| README is one line | | Real README linking to `docs/` |

## Privacy and exposure notes

> [!warning]
> The repo is **public** (it cloned without credentials) and contains what looks like a real street address, phone number and church name in source files. You said the church name is private for now. Options: make the repo private, and/or move all identity to DB config with placeholder seeds (planned in FR-CH-07). Note that git history keeps old values; if the details are sensitive, rewrite history or recreate the repo after cleanup. Also, the **published site** currently shows the church name publicly.

## What can be reused

- Visual design, sections and component library (shadcn) — keep.
- Announcement theater/fullscreen UX, hero, cards — keep, rewire to API.
- `data-testid` attributes — great for Playwright.
- Cloudflare deployment pipeline (account, Worker name) — extend.

## Migration plan summary

1. Clean hygiene issues. 2. Introduce `api/` (Hono) + D1 + shared Zod. 3. Replace each hardcoded section with an API-backed hook, one phase at a time ([[06-Development-Phases]]). 4. Delete `server/` when nothing references it.
