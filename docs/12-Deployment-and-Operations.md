---
title: Deployment and Operations
tags: [deploy, ops]
status: draft
updated: 2026-11-08
---

# Deployment and Operations

Run commands: [[07-How-To-Run]]. Architecture: [[03-Architecture]].

## Current deployment (as found)

- Production: <https://church.paul-amancioiii.workers.dev/>
- `wrangler.jsonc` deploys **static assets only** (`dist/public`, SPA fallback). There is no Worker script, so no API can run in production until Phase 1.

## Target deployment

One Cloudflare Worker named `church` with: static assets, Hono API, D1 (`DB`), R2 (`MEDIA`), Cron Trigger, secrets.

| Resource | Name | Notes |
|---|---|---|
| Worker | `church` | `npm run deploy` |
| D1 | `church-db` | migrations in `/migrations` |
| R2 | `church-media` | public via Worker route or custom domain |
| Secrets | see [[07-How-To-Run#2. Dev vars (never commit)]] | `wrangler secret put` |
| Cron | `0 21 * * *` | = 05:00 Asia/Manila |

## Release procedure

1. Merge to `main` (CI green: types, unit/API, component, e2e smoke).
2. `npm run build`.
3. **Back up** D1 (export) if the release has a migration.
4. `npm run db:migrate:remote` (forward-only migrations; write them to be backward compatible with the previous Worker version so rollback is safe).
5. `npm run deploy`.
6. Run the smoke checklist below.
7. Update `CLAUDE.md` status and [[06-Development-Phases]].

### Smoke checklist (production)

- [ ] `/` loads on a phone; no console errors
- [ ] `/api/public/home` returns data
- [ ] Admin login works; logout works
- [ ] Toggle stream on/off
- [ ] Submit a test prayer request (then archive it)
- [ ] Test subscription flow with a test email

### Rollback

- Code: redeploy the previous Worker version (Wrangler versions/rollback).
- Data: restore from the pre-release export; avoid destructive migrations (add columns, don't drop, until the next release).

## Backups

| What | How | Frequency |
|---|---|---|
| D1 | `wrangler d1 export church-db --remote --output backup.sql` (or platform time-travel if enabled) | Before each migration + weekly |
| R2 | Periodic copy to a second bucket/local | Monthly |
| Config | Git (wrangler.jsonc, migrations) | Always |

Store backups **encrypted** and outside the repo: they contain prayer requests and subscriber emails. Test a restore into a scratch D1 database at least once before launch.

## Monitoring

- Workers observability (enabled in `wrangler.jsonc`) for errors and latency.
- Uptime ping on `/api/public/health` (free monitor).
- Email: watch outbox `failed` count and provider dashboard (bounces/complaints).
- Weekly glance: prayer inbox size, quarantine size, subscriber growth.

## Domain and email

- `*.workers.dev` is fine for demo. For the real church use a custom domain (Cloudflare DNS).
- Email sending needs SPF + DKIM (+ DMARC) records for the sending domain. Until then use `EMAIL_PROVIDER=console`.

## Environments and data hygiene

- Never copy production prayer requests/subscribers into local or preview databases. Use seed/fake data.
- Preview deployments (optional) use a separate D1 and `console` email provider.

## Costs (check current pricing)

The plan assumes Cloudflare's free tiers fit a single church's traffic; email provider and domain are the likely paid items. Verify current limits/pricing during the Phase 1 spike and record them here.

## Production readiness checklist

- [ ] All placeholders replaced with approved church content
- [ ] Privacy notice published and linked
- [ ] Super admin password rotated; named accounts created
- [ ] Backups run + restore tested
- [ ] Security checklist in [[11-Security-and-Abuse-Prevention#8. Pre-launch security checklist]] done
- [ ] Lighthouse/a11y targets met
- [ ] Runbook (this note) shared with a second person
- [ ] Church leadership sign-off recorded
