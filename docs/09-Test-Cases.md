---
title: Test Cases
tags: [testing, qa]
status: draft
updated: 2026-11-08
---

# Test Cases

IDs map to [[02-Requirements-Spec]]. Level: **U** unit, **A** API/integration (Vitest + Workers pool, real D1), **C** component (Testing Library), **E** end-to-end (Playwright, desktop **and** 375 px mobile), **M** manual.

## Strategy

| Level | Tool | Scope |
|---|---|---|
| Unit | Vitest | Recurrence engine, visibility rules, years-serving, screening, form validator, hashing |
| API | Vitest + `@cloudflare/vitest-pool-workers` | Every endpoint: success, validation, auth, role, soft delete |
| Component | Testing Library | Form renderer, filter chips, admin forms |
| E2E | Playwright (Chromium + mobile emulation) | Critical journeys below |
| Manual | Checklists | Accessibility, real phone, email rendering |

**Rules**
- Fix "now" with a fake clock in unit/API tests.
- Each bug fix adds a regression test.
- UI elements keep `data-testid` attributes (existing repo convention).
- CI blocks merge if tests or `npm run check` fail.

## Church profile

| ID | L | Case | Expected |
|---|---|---|---|
| TC-CH-01 | A | `GET /public/church` on seeded DB | 200, name "Hope", placeholders present |
| TC-CH-02 | A | Admin updates name to "Faith Test" | Public GET returns new name; audit row written |
| TC-CH-03 | U | founded_year 2001, now 2026 | `years_serving = 25` |
| TC-CH-04 | U | founded_year in the future | `years_serving = 0` |
| TC-CH-05 | U | Year boundary: 31 Dec 23:30 UTC in Manila is already next year | Uses church timezone |
| TC-CH-06 | A | Editor calls `PUT /admin/church` | 403 |
| TC-CH-07 | A | Invalid email/phone/negative members | 400 `VALIDATION_ERROR` |
| TC-CH-08 | E | Change name in admin, reload public site (mobile) | Header, hero, footer, tab title updated |
| TC-CH-09 | M | Static search of `client/src` for literal church names | None outside tests |

## Announcements

| ID | L | Case | Expected |
|---|---|---|---|
| TC-AN-01 | U | Visibility: truth table rows from spec (6 cases) | Matches table exactly |
| TC-AN-02 | U | `expires_at == now` | Not visible (strict `>`) |
| TC-AN-03 | U | `effective_at == now` | Visible (`<=`) |
| TC-AN-04 | A | Create with `expires_at < effective_at` | 400 |
| TC-AN-05 | A | `GET public?scope=weekly` | Only weekly, only visible |
| TC-AN-06 | A | `scope=all` | All visible scopes |
| TC-AN-07 | A | Invalid scope `yearly` | 400 |
| TC-AN-08 | A | Soft delete then public GET | 404 / absent; admin `includeDeleted` shows it |
| TC-AN-09 | A | Restore | Visible again if rules allow |
| TC-AN-10 | A | Advance fake clock past expiry | Disappears with no job run |
| TC-AN-11 | A | Video URL on non-allowlisted host | 400 |
| TC-AN-12 | A | Upload 6 MB image / `.exe` | 400 |
| TC-AN-13 | A | Pinned first, then newest | Order verified |
| TC-AN-14 | C | Filter chips switch list without page reload | Correct items, active chip styled |
| TC-AN-15 | E | Admin schedules for tomorrow; visit public today | Not shown |
| TC-AN-16 | E | Mobile: carousel swipe/buttons, fullscreen opens/closes | Works at 375 px |
| TC-AN-17 | A | Editor role creates; prayer_team tries | 201; 403 |

## Service hours

| ID | L | Case | Expected |
|---|---|---|---|
| TC-SV-01 | A | Fresh seed | Two Sunday services 09:00–12:00 and 15:00–18:00 |
| TC-SV-02 | U | Weekly Sunday, now = Sunday 10:00 | Next occurrence = *today* only if end not passed; else next Sunday |
| TC-SV-03 | U | 3rd Tuesday of Nov 2026 | 17 Nov 2026 |
| TC-SV-04 | U | After 3rd Tuesday has passed | Next month's 3rd Tuesday |
| TC-SV-05 | U | "Last Friday" in a 5-Friday month | Correct date |
| TC-SV-06 | U | 5th-weekday request | Rejected by schema (only 1–4, −1) |
| TC-SV-07 | U | Cancelled exception date | Skipped to following occurrence |
| TC-SV-08 | U | Effective window ended | Hidden |
| TC-SV-09 | A | end_time ≤ start_time | 400 |
| TC-SV-10 | A | Soft delete service | Gone from public, restorable |
| TC-SV-11 | A | Human-readable text for 3rd Tuesday 19–21 | "Every 3rd Tuesday, 7:00–9:00 PM" |
| TC-SV-12 | E | Admin adds the 3rd Tuesday service | Public card shows correct next date (mobile) |

## Get involved

| ID | L | Case | Expected |
|---|---|---|---|
| TC-MN-01 | A | Seed contains five ministries | Present |
| TC-MN-02 | A | Create/edit/soft delete/restore | State transitions correct, never hard deleted (DB check) |
| TC-MN-03 | A | Inactive ministry | Hidden publicly |
| TC-MN-04 | A | Reorder | Public order follows `sort_order` |
| TC-MN-05 | A | Interest submit w/o Turnstile | 403 `CAPTCHA_FAILED` |
| TC-MN-06 | E | Admin adds "Ushering Ministry" | Appears on public page |

## Events

| ID | L | Case | Expected |
|---|---|---|---|
| TC-EV-01 | A | Publish with `requires_registration` and no form | 409/400 |
| TC-EV-02 | A | Event without registration | Public payload has `requiresRegistration:false`, no form |
| TC-EV-03 | C | Event card without registration | No Register button |
| TC-EV-04 | U | Form validator: required missing | Error per field |
| TC-EV-05 | U | Number out of min/max; bad email; select value not in options | Errors |
| TC-EV-06 | U | Unknown extra field in answers | Ignored/stripped |
| TC-EV-07 | A | Valid registration | 201, stored with `form_snapshot` |
| TC-EV-08 | A | Same email twice | 409 `CONFLICT` |
| TC-EV-09 | A | After close date / capacity reached | 409 `REGISTRATION_CLOSED` |
| TC-EV-10 | A | Edit label after responses | Old responses still render (snapshot) |
| TC-EV-11 | A | Change field key after responses | 409 |
| TC-EV-12 | A | CSV export | UTF-8 BOM, header row = labels, escapes commas/quotes/newlines, formula-injection guarded (`=`, `+`, `-`, `@` prefixed) |
| TC-EV-13 | A | Past event | Not in public list |
| TC-EV-14 | A | Clone form | New id, independent edits |
| TC-EV-15 | E | Full journey "Kingdom Family": admin builds form → visitor registers on mobile → admin exports | Row present in CSV |
| TC-EV-16 | A | Registration w/o Turnstile or rate-limit exceeded | 403 / 429 |

## Prayer requests

| ID | L | Case | Expected |
|---|---|---|---|
| TC-PR-01 | A | Submit text only | 200 success shape; stored `clean` |
| TC-PR-02 | A | DB inspection after submit | No IP/UA/email columns populated; `client_hash` only |
| TC-PR-03 | A | Honeypot filled | Success-looking response, stored `spam` or dropped; never in inbox |
| TC-PR-04 | A | Missing/invalid Turnstile | 403 `CAPTCHA_FAILED` |
| TC-PR-05 | A | 4th submit within an hour (same client) | 429 + `Retry-After` |
| TC-PR-06 | A | Body < 10 or > 1000 chars | 400 |
| TC-PR-07 | U | Contains URL / email / phone | `quarantined` with reasons |
| TC-PR-08 | U | Profanity/abuse list match | `quarantined` |
| TC-PR-09 | U | Repeated chars / ALL CAPS spam / duplicate of recent | `quarantined` |
| TC-PR-10 | U | Crisis phrases | `urgent` flag; inbox shows urgent |
| TC-PR-11 | A | Response for quarantined vs clean | Identical shape (no oracle) |
| TC-PR-12 | A | Editor/admin GET inbox | 403 |
| TC-PR-13 | A | prayer_team GET inbox | 200, quarantined excluded by default |
| TC-PR-14 | A | Status transitions | Only forward by default; archived terminal; audited |
| TC-PR-15 | A | Block client hash, then submit | Throttled/blocked silently |
| TC-PR-16 | A | Daily salt rotation | Same IP yields different hash next day |
| TC-PR-17 | A | Log capture during submit | Request text absent from logs and audit |
| TC-PR-18 | C | `<script>` in body | Rendered as text in inbox (no execution) |
| TC-PR-19 | A | Purge by super admin | Audited; admin role 403 |
| TC-PR-20 | E | Mobile: submit, see thank-you + crisis resources text | Works at 375 px |

## Subscriptions

| ID | L | Case | Expected |
|---|---|---|---|
| TC-SB-01 | A | Subscribe new email | Pending; confirmation email queued |
| TC-SB-02 | A | Subscribe existing confirmed email | Same response, no leak, no duplicate |
| TC-SB-03 | A | Confirm with valid / invalid / reused token | Confirmed / 404 / idempotent |
| TC-SB-04 | A | Daily job with pending subscriber | No email to pending |
| TC-SB-05 | A | Daily job with 2 confirmed (1 topic each) | Only devotion subscribers receive it |
| TC-SB-06 | A | Unsubscribe link | Immediate; no further sends |
| TC-SB-07 | A | Manage topics | Reflected in next send |
| TC-SB-08 | A | Email provider fails | Outbox `failed`, retried up to N, admin sees error |
| TC-SB-09 | A | Invalid email, disposable-domain policy (S) | 400 |
| TC-SB-10 | A | Rate limit / missing Turnstile | 429 / 403 |
| TC-SB-11 | U | Devotion date vs timezone | Sent on church-local date |
| TC-SB-12 | A | Export CSV | Correct columns, no unsubscribed unless filtered |
| TC-SB-13 | M | Render emails in Gmail/Outlook mobile | Readable, unsubscribe visible |
| TC-SB-14 | A | Email content contains tokens only as hashes at rest | DB has hashes, not raw tokens |

## Live stream

| ID | L | Case | Expected |
|---|---|---|---|
| TC-LS-01 | A | Default state | `is_live=false`, next streamed service present |
| TC-LS-02 | A | Go live, then GET stream | `is_live=true`, embed URL valid |
| TC-LS-03 | A | End stream | Back to offline |
| TC-LS-04 | A | Non-allowlisted host | 400 |
| TC-LS-05 | U | YouTube channel/video/watch URL → embed URL | Correct conversion |
| TC-LS-06 | C | Offline state | Countdown + replay, no iframe |
| TC-LS-07 | E | Toggle live in admin; public page within 30 s | Player appears (mobile) |
| TC-LS-08 | A | Replays CRUD soft delete | Hidden when deleted |

## Auth, roles, audit, soft delete (cross-cutting)

| ID | L | Case | Expected |
|---|---|---|---|
| TC-AD-01 | A | Login success/failure | Cookie `HttpOnly; Secure; SameSite=Lax` |
| TC-AD-02 | A | 5 failures | Locked 15 min |
| TC-AD-03 | A | Every admin route without cookie | 401 (table-driven over route list) |
| TC-AD-04 | A | Role matrix | Each role × route family matches [[02-Requirements-Spec#Roles and access]] |
| TC-AD-05 | A | Create/update/delete/restore | Audit row each time |
| TC-AD-06 | A | Attempt hard delete via SQL helper in code | Lint/test rule: no `DELETE FROM`/`db.delete` outside purge module |
| TC-AD-07 | A | Expired/tampered cookie | 401 |
| TC-AD-08 | A | Error responses | Never include stack traces |
| TC-AD-09 | M | Lighthouse a11y/perf on Home (mobile) | ≥ 90 target |
| TC-AD-10 | M | axe scan + keyboard-only pass on Home and admin forms | No critical issues |
| TC-AD-11 | M | Real iPhone and Android phone smoke | Layout, forms, stream embed OK |
| TC-AD-12 | A | Security headers present (CSP, X-Content-Type-Options, Referrer-Policy) | Verified |

## Critical journeys (E2E smoke, run on every deploy)

1. Visitor loads Home on 375 px: sections render, no console errors.
2. Visitor filters announcements Daily/Weekly/Monthly.
3. Visitor submits prayer request; admin (prayer_team) sees it.
4. Visitor registers for an event; admin exports CSV.
5. Admin changes church name; public site updates.
6. Admin toggles live stream.
7. Visitor subscribes, confirms, unsubscribes (console email provider).

## Traceability

Each `FR-*` should have ≥ 1 test. Maintain with a quick grep in CI: every FR ID in [[02-Requirements-Spec]] appears in a test title or in this note.
