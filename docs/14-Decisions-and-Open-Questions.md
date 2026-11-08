---
title: Decisions and Open Questions
tags: [adr, decisions, questions]
status: living
updated: 2026-11-08
---

# Decisions and Open Questions

Answer the open questions (or tell Claude to go with the defaults) before Phase 1. Defaults let work continue; each one lists what changes if you disagree.

## Open questions

| ID | Question | Default assumed | Blocks |
|---|---|---|---|
| [[#OQ-01]] | What is Rentspot's exact stack? | Cloudflare Workers + Hono + D1 + Drizzle | Phase 1 |
| [[#OQ-02]] | Announcement filter wording and meaning | All / Daily / Weekly / Monthly tags | Phase 3 |
| [[#OQ-03]] | "Make live church stream": embed or broadcast from the app? | Embed YouTube Live | Phase 3 |
| [[#OQ-04]] | What is "bible streams reading"? | Daily Bible reading references by email | Phase 6 |
| [[#OQ-05]] | Admin people and roles | You + editors + a prayer team | Phase 1 |
| [[#OQ-06]] | Email domain/provider | Resend + a custom domain later | Phase 6 |
| [[#OQ-07]] | Service-hours discrepancies | Use your times (9–12, 3–6); drop Mon–Sat card | Phase 2 |
| [[#OQ-08]] | Repo privacy and placeholder identity | Make repo private; placeholders in seed | Phase 1 |
| [[#OQ-09]] | Prayer request retention and who relays | 90 d archive, 12 mo purge; prayer team | Phase 5 |
| [[#OQ-10]] | Event rules: capacity, waitlist, fees | Capacity yes, waitlist no, no payments | Phase 4 |
| [[#OQ-11]] | "Give" button and App Download section | Out of scope v1 | Phase 2 |
| [[#OQ-12]] | Languages | English only, i18n-ready | Later |
| [[#OQ-13]] | Images | Upload to R2 | Phase 3 |

### OQ-01
**Rentspot stack.** You asked to match Rentspot "if possible", but its code wasn't available to me. Please tell me (or paste its `package.json`, `wrangler`/deploy config, and folder tree): frontend framework, API framework, database, ORM, auth, hosting, test tools. If it differs from the default, update [[#ADR-001]] and the stack tables in [[03-Architecture]] and `CLAUDE.md`.

### OQ-02
**Announcement filters.** Your request says "all announcement, monthly announcement, monthly announcement, daily announcement" — "monthly" appears twice. Assumed **All, Daily, Weekly, Monthly**. Also assumed the filter is a **tag the admin chooses** (the announcement's cadence) rather than "effective today/this week/this month". Alternative: filter by effective date window. Tell me which you meant.

### OQ-03
**Live stream.** "Able to make live church stream" can mean (a) show the church's YouTube/Facebook live inside the site (assumed; cheap, reliable, existing code already does this) or (b) broadcast from the web app (needs Cloudflare Stream or similar, paid, more complexity). Also: which platform does the church use?

### OQ-04
**Bible streams reading.** Assumed a daily Bible reading plan (references like "Psalm 23") emailed alongside the devotion. Another reading: "streaks" (tracking readers). Also decide the Bible version; many translations are copyrighted, so storing only references + links is the safe default.

### OQ-05
**Admin people.** How many admins, who is on the prayer team, who may edit the church profile? Will the church want their own accounts later?

### OQ-06
**Email.** Sending needs a verified domain (not `workers.dev`). Do you have a domain? Preferred provider? Daily volume estimate (subscribers)?

### OQ-07
**Service hours.** Code says 9:30–12:00 and 3:30–6:00 plus a Mon–Sat office-hours card; your requirement says 9–12 and 3–6. Assumed your requirement wins. Do you want an "office hours" field in the church profile?

### OQ-08
**Repo privacy.** The GitHub repo is public and contains an address/phone that appear real. Make it private? Should the published site stay up with the real name until the church approves? Seeds will use placeholders either way.

### OQ-09
**Prayer retention and relay.** Who receives and relays requests (pastor, prayer coordinator)? Retention proposal: archive after 90 days, purge after 12 months. Is a daily email digest to the team wanted, or in-app only?

### OQ-10
**Events.** Need capacity limits, waitlist, payments/fees, cancellation by registrant, reminders? Assumed capacity only.

### OQ-11
**Give / App Download.** The design guideline mentions a "Give" CTA and the UI has an App Download section, neither in your requirements. Keep, hide or build later?

### OQ-12
**Languages.** English only, or English + Filipino?

### OQ-13
**Images.** Admin uploads (stored in R2) or paste external image URLs? Assumed uploads with size/type limits.

---

## Decisions (ADRs)

### ADR-001
**Stack: Cloudflare Workers + Hono + D1 + Drizzle + React/Vite.** Status: **Proposed (pending OQ-01)**.
Context: the app is already deployed on Cloudflare Workers; Express can't run there natively; the owner wants the same stack as Rentspot "if possible". Decision: keep React/Vite/Tailwind/shadcn/TanStack Query on the frontend; replace Express with Hono; replace Postgres with D1 via Drizzle (same ORM, SQLite dialect); R2 for files. Consequences: single deployable, free-tier friendly; SQLite-flavoured SQL; no Node-only libs (bcrypt, passport) — use WebCrypto and custom middleware. Alternative if Rentspot differs: adopt Rentspot's stack and keep the same API contract and docs.

### ADR-002
**One Worker serves assets and API** (same origin). Status: Accepted. No CORS, one deploy, cookies simple. `assets.run_worker_first` routes `/api/*` to the Worker. Revisit if the API must be consumed by a separate mobile app domain (then enable CORS for that origin only).

### ADR-003
**Soft delete everywhere.** Status: Accepted (owner requirement). `deleted_at` on every table; repositories filter by default. One audited exception: privacy purge ([[11-Security-and-Abuse-Prevention#7. Documented exception to "always soft delete"|privacy purge section]]).

### ADR-004
**Registration forms stored as JSON definitions** on a `forms` table, responses as JSON with a snapshot of the definition. Status: Accepted. Why: "do whatever is easier" — fastest builder, simple CSV export, clonable. Trade-off: ad-hoc SQL reporting on answers is harder; acceptable at church scale. Alternative: normalized fields/answers tables.

### ADR-005
**Live stream by embedding an external stream.** Status: Accepted for v1 (pending OQ-03). YouTube Live (or Facebook) hosts the video; the app controls presentation (live vs offline), source and replays. Native broadcasting deferred to backlog.

### ADR-006
**Prayer requests are anonymous and layered against abuse.** Status: Accepted. No contact info, no IP storage, daily-rotating hash, Turnstile + honeypot + rate limit + screening + quarantine, role-restricted inbox, uniform responses. Details in [[11-Security-and-Abuse-Prevention]].

### ADR-007
**Time handling.** Status: Accepted. UTC instants in DB, wall-clock schedules interpreted in church timezone (`Asia/Manila`), recurrence computed on the server.

### ADR-008
**Visibility is evaluated at read time**, not by jobs flipping flags. Status: Accepted. A missed cron can't leave expired content public.

### ADR-009
**Documentation lives in the repo (`docs/`) as an Obsidian vault; `CLAUDE.md` is the AI memory.** Status: Accepted. `CLAUDE.md` chosen over `AGENTS.md` because Claude Code reads it automatically; if other tools are used later, add an `AGENTS.md` that points to `CLAUDE.md`.

## Change log

| Date | Change |
|---|---|
| 2026-11-08 | Initial documentation set created (Phase 0) |
