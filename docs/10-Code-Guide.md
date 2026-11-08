---
title: Code Guide
tags: [code, conventions, guide]
status: draft
updated: 2026-11-08
---

# Code Guide

Conventions and patterns so features look the same and stay safe. Architecture context: [[03-Architecture]]. Models: [[04-Data-Model]].

## Layout (target)

```
client/src/
  pages/            route-level screens (home.tsx, admin/*)
  components/       public sections; components/admin/* ; components/ui = shadcn (don't edit casually)
  lib/api.ts        typed fetch helpers (one function per endpoint)
  lib/queryKeys.ts  TanStack Query keys
  hooks/            useChurch(), useAnnouncements(scope)…
api/
  index.ts          Hono app, middleware, route mounting, scheduled()
  routes/public/*.ts, routes/admin/*.ts
  services/         business logic (visibility, recurrence, screening, email)
  db/               client, queries (repositories), seed
  middleware/       auth, roles, rateLimit, turnstile, errors, audit
  jobs/             cron handlers
shared/
  schema.ts         Drizzle tables
  validation/*.ts   Zod schemas (used by api AND client)
  enums.ts, types.ts
tests/ api/ e2e/
```

## Naming

| Thing | Convention | Example |
|---|---|---|
| Files | kebab-case (routes/services), PascalCase (React components) | `service-schedules.ts`, `AnnouncementFilter.tsx` |
| DB | snake_case | `effective_at` |
| JSON/API/TS | camelCase | `effectiveAt` (mapped in one place) |
| Zod schemas | `<thing>Schema`, input types via `z.infer` | `announcementInputSchema` |
| Test ids | `data-testid="<kind>-<name>"` | `button-submit-prayer` |
| Env | UPPER_SNAKE | `SESSION_SECRET` |

## Patterns

### Response helpers

```ts
// api/lib/respond.ts
export const ok = <T>(c: Context, data: T, status = 200) => c.json({ data }, status);
export const fail = (code: ErrorCode, message: string, details?: unknown) =>
  new AppError(code, message, details); // caught by errorHandler → { error: {...} }
```

### Validation (shared)

```ts
// shared/validation/announcement.ts
export const announcementInputSchema = z.object({
  title: z.string().min(1).max(120),
  summary: z.string().max(280).optional(),
  type: z.enum(["article", "image", "video"]),
  scope: z.enum(["daily", "weekly", "monthly"]),
  effectiveAt: z.coerce.date(),
  expiresAt: z.coerce.date().nullable().optional(),
  isPublished: z.boolean().default(false),
}).refine(v => !v.expiresAt || v.expiresAt > v.effectiveAt, {
  path: ["expiresAt"], message: "Must be after the effective date",
});
```

The same schema drives `react-hook-form` (`zodResolver`) and the API (`zValidator`).

### Soft delete

- Repositories expose `list({ includeDeleted })`, `softDelete(id, actor)`, `restore(id, actor)`.
- The base query helper always adds `isNull(table.deletedAt)` unless `includeDeleted`.
- **Never** call `db.delete(...)`. A lint/test rule fails the build if it appears outside `api/services/privacy-purge.ts`.

### Visibility (announcements)

```ts
export const visibleAnnouncement = (now: number) => and(
  isNull(a.deletedAt),
  eq(a.isPublished, true),
  lte(a.effectiveAt, now),
  or(isNull(a.expiresAt), gt(a.expiresAt, now)),
);
```

Put the rule in **one** place and unit-test it ([[09-Test-Cases#Announcements]]).

### Recurrence

`services/recurrence.ts` exports `nextOccurrence(rule, from, tz)`. It is pure (no DB), takes the clock as an argument, and is table-tested. Never do date math for schedules in React.

### Auth and roles

```ts
admin.use("*", requireAuth);
announcements.post("/", requireRole("super_admin", "admin", "editor"), handler);
prayer.use("*", requireRole("super_admin", "prayer_team"));
```

Every admin route lists roles explicitly; a test iterates the route table to enforce this.

### Audit

`audit(c, { action: "update", entity: "announcement", id, summary })` after every mutation. Never put prayer text, tokens, or passwords in `summary`.

### Frontend data access

```ts
// lib/api.ts
export const getAnnouncements = (scope: Scope) =>
  api<Announcement[]>(`/api/public/announcements?scope=${scope}`);
// hooks/useAnnouncements.ts
export const useAnnouncements = (scope: Scope) =>
  useQuery({ queryKey: ["announcements", scope], queryFn: () => getAnnouncements(scope) });
```

- Components never call `fetch` directly.
- Replace the current global `staleTime: Infinity` (in `lib/queryClient.ts`) with per-query values: church/services `5 min`, announcements `60 s`, stream `15–30 s` with `refetchInterval`.
- Always render loading, empty and error states (mobile networks fail).
- Dates arrive as ISO strings; format with `date-fns` in the church timezone.

### Forms (dynamic registration)

One `DynamicForm` component renders from `forms.fields`, and `buildZodFromFields(fields)` (in `shared/`) creates the validator used on both sides.

### Mobile-first UI

Design at 375 px; use Tailwind mobile-first classes; min 44 px tap targets; no hover-only actions; test the carousel with touch. Follow `design_guidelines.md` (repo root) for visuals.

### Security rules (summary)

Parse with Zod, never trust client-sent roles/ids; render user text as text (no `dangerouslySetInnerHTML`); iframe `src` only from allowlisted embed builders; secrets via `wrangler secret`; log IDs, not content. Full list: [[11-Security-and-Abuse-Prevention]].

## How to add a new configurable feature

A repeatable checklist (this is the "configure a web app feature" recipe):

1. **Spec:** add `FR-xx` rows to [[02-Requirements-Spec]] with acceptance criteria.
2. **Model:** add table to `shared/schema.ts` (with `deleted_at`, audit columns) → `npm run db:generate` → review SQL → update [[04-Data-Model]].
3. **Validation:** add Zod schemas in `shared/validation/`.
4. **Repository + service:** queries in `api/db/`, rules in `api/services/` (pure functions where possible).
5. **Routes:** public (read) + admin (CRUD, soft delete, restore) with roles; audit calls; update [[05-API-Reference]].
6. **Tests first/with:** unit for rules, API for endpoints; add rows to [[09-Test-Cases]].
7. **Admin UI:** list (status, search, show deleted), form (shared schema), delete/restore.
8. **Public UI:** hook + component with loading/empty/error states; mobile check.
9. **Docs:** add a section in [[08-Feature-Configuration-Guide]]; update [[06-Development-Phases]] checkbox and `CLAUDE.md` Status.
10. **PR checklist:** types clean, tests green, no hardcoded church data, no hard delete, no sensitive logging.

## Git workflow

- `main` = deployable. Work in `feature/<name>`; small PRs.
- Commit format: `type(scope): summary` — `feat(announcements): add scope filter`.
- Never commit `.dev.vars`, `.local/`, `node_modules`, `dist`.
- Migrations are committed and never edited after merge (add a new one).

## Definition of done

See [[06-Development-Phases#Development Phases]].

## Working with Claude Code in this repo

- `CLAUDE.md` is loaded automatically; keep its Status block current.
- Ask Claude to read the relevant `docs/` note before coding a feature, and to update docs in the same change.
- Good prompt shape: "Implement FR-SV-03 per docs/02 and docs/04; add tests TC-SV-02..07; update docs/05 and docs/08."
