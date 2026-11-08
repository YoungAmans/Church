---
title: How To Run
tags: [setup, run, deploy]
status: draft
updated: 2026-11-08
---

# How To Run

Two sections: what works **today** (current scaffold) and what will work **after Phase 1**. Commands in the second section don't exist yet.

## Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node.js | 22 LTS (the scaffold was verified with 22) | `node -v` |
| npm | 10+ | `npm -v` |
| Git | any recent | `git --version` |
| Cloudflare account | free | for deploy |
| VS Code (recommended) | | `.vscode/launch.json` exists |

## Get the code (Windows)

```powershell
cd C:\dev
git clone https://github.com/YoungAmans/Church.git
cd Church
```

> [!note] If you received a docs zip from Claude
> Unzip `CLAUDE.md` and the `docs\` folder into `C:\dev\Church`, then see [[07-How-To-Run#Commit the documentation]].

## Today: run the current scaffold

```powershell
npm install
npm run dev
```

Open <http://localhost:5000>. This runs Express + Vite together. Data is hardcoded in components; there is no database yet, so no env vars are needed.

Other working scripts:

| Command | What it does |
|---|---|
| `npm run check` | TypeScript type check |
| `npm run build` | Builds client to `dist/public` and server to `dist/index.cjs` |

> [!bug] Known Windows issue
> `npm start` sets `NODE_ENV=production` inline, which PowerShell/cmd don't support. Use: `npx cross-env NODE_ENV=production node dist/index.cjs`. This script is replaced in Phase 1.

`npm run db:push` requires `DATABASE_URL` (Postgres) and is **not used** by the target design.

## After Phase 1: target workflow

> [!warning] Planned commands
> Names below are the plan; Phase 1 will create them and this section will be verified and corrected.

### 1. One-time setup

```powershell
npm install
copy .dev.vars.example .dev.vars        # then edit values
npx wrangler login
npx wrangler d1 create church-db        # paste database_id into wrangler.jsonc
npx wrangler r2 bucket create church-media
npm run db:migrate:local
npm run db:seed
```

### 2. Dev vars (never commit)

File: `.dev.vars`

| Variable | Example | Purpose |
|---|---|---|
| `SESSION_SECRET` | 32+ random chars | Signs the admin cookie |
| `CLIENT_HASH_SECRET` | 32+ random chars | Salts the daily client hash |
| `SEED_ADMIN_EMAIL` | you@example.com | First super admin |
| `SEED_ADMIN_PASSWORD` | strong password | Change after first login |
| `TURNSTILE_SECRET` | from Cloudflare | Server verification (use Cloudflare's documented test keys locally) |
| `TURNSTILE_SITE_KEY` | from Cloudflare | Exposed to client as `VITE_TURNSTILE_SITE_KEY` |
| `EMAIL_PROVIDER` | `console` | `console` prints emails; `resend` sends |
| `RESEND_API_KEY` | | only for `resend` |
| `EMAIL_FROM` | `Hope Church <hello@yourdomain>` | Verified domain required |
| `APP_BASE_URL` | `http://localhost:5173` | Links inside emails |

### 3. Daily development

```powershell
npm run dev            # Vite (client) + wrangler dev (API + local D1)
npm run check          # types
npm test               # API + component tests (Vitest)
npm run test:e2e       # Playwright, desktop + mobile viewport
npm run db:generate    # after editing shared/schema.ts → creates a migration
npm run db:migrate:local
```

### 4. Test a scheduled job locally

```powershell
npx wrangler dev --test-scheduled
# then: curl "http://localhost:8787/__scheduled?cron=0+21+*+*+*"
```

### 5. Deploy

```powershell
npm run build
npm run db:migrate:remote      # applies new migrations to production D1
npx wrangler secret put SESSION_SECRET   # repeat for each secret (once)
npm run deploy                 # wrangler deploy
```

Production URL today: <https://church.paul-amancioiii.workers.dev/>.

See [[12-Deployment-and-Operations]] for the release checklist and rollback.

## Commit the documentation

```powershell
cd C:\dev\Church
git checkout -b docs/initial-documentation
git add CLAUDE.md docs
git commit -m "docs: add project memory and Obsidian documentation"
git push -u origin docs/initial-documentation
```

## Open the docs in Obsidian

Obsidian → **Open folder as vault** → `C:\dev\Church\docs`. Start at [[00-Index]].
(Alternative: open the whole repo as a vault; Obsidian will also index `CLAUDE.md`.)

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `EADDRINUSE :5000` | Another process on 5000. Set `PORT=5001` (cross-env) |
| `DATABASE_URL` error on `db:push` | Scaffold's Postgres config; ignore until Phase 1 replaces it |
| Replit plugin errors in Vite | `REPL_ID` is unset locally; the plugin is conditional. Removed in Phase 1 |
| Tailwind classes missing | Repo has both Tailwind 3.4 and `@tailwindcss/vite` 4 listed; verify `postcss.config.js` path is used. Cleaned in Phase 1 |
| CORS errors (after Phase 1) | Calling the API from a different origin. Use the Vite proxy or the same-origin Worker |
| Login works locally, fails in prod | Missing `wrangler secret` values, or cookie `Secure` over http |
| Emails not arriving | `EMAIL_PROVIDER=console` (prints to terminal), or unverified sender domain |
