---
title: Requirements Specification
tags: [spec, requirements]
status: draft
updated: 2026-11-08
---

# Requirements Specification

Priority: **M** = must (v1), **S** = should (v1 if time), **C** = could (later).
Each requirement has an ID used by [[09-Test-Cases]] and [[06-Development-Phases]].

> [!warning] Assumptions to confirm
> Items marked ⚠ interpret an ambiguous line from the original request. See [[14-Decisions-and-Open-Questions]].

## Roles and access

| Role | Access |
|---|---|
| `super_admin` | Everything, including admin accounts, audit log, privacy purge |
| `admin` | Everything except admin accounts and purge |
| `editor` | Announcements, events, ministries, devotions, services |
| `prayer_team` | Prayer requests only |
| anonymous | Public endpoints only |

---

## FR-CH Church profile

The church identity is configuration. "Hope" is a working name.

| ID | Pri | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-CH-01 | M | Admin can set church **name**, **mission**, **vision**, **members count**, **address**, **phone**, **email**, **founding year** | Saved values appear on the public site without a code change or redeploy |
| FR-CH-02 | M | **Years serving** is derived from founding year | `years_serving = current year − founded_year` (min 0), computed server-side in the church timezone. Not editable directly |
| FR-CH-03 | M | Church name is never hardcoded in the UI | Searching `client/src` for the literal church name finds nothing outside tests/fixtures |
| FR-CH-04 | M | Page title and meta description use the configured name | Browser tab shows configured name after load |
| FR-CH-05 | S | Server rewrites `<title>`/Open Graph tags so link previews (Facebook/Messenger) show the configured name | Sharing the URL shows correct name and description |
| FR-CH-06 | S | Admin can set timezone (default `Asia/Manila`), logo, hero image, social links, map link | Values persist and render |
| FR-CH-07 | M | A first-run seed creates the profile with placeholder values (Hope, placeholder address) | Fresh DB → public site renders without errors |

## FR-AN Announcements

| ID | Pri | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-AN-01 | M | Admin can create/edit/soft-delete/restore announcements | Deleted ones vanish from public and default admin list; "Show deleted" reveals them |
| FR-AN-02 | M | Fields: title, summary, type (`article`/`image`/`video`), body or media URL, **scope** (`daily`/`weekly`/`monthly`), **effective date**, optional **expiration date**, published flag | Validation errors shown inline |
| FR-AN-03 | M | **Visibility rule:** public iff published ∧ `effective_at ≤ now` ∧ (`expires_at` null ∨ `expires_at > now`) ∧ not deleted | See truth table below; no manual job needed — evaluated at read time |
| FR-AN-04 | M | `expires_at` must be after `effective_at` | API rejects otherwise (`VALIDATION_ERROR`) |
| FR-AN-05 | M | Public filter: **All**, **Daily**, **Weekly**, **Monthly** ⚠ | Filter returns only matching scope; All returns every visible announcement |
| FR-AN-06 | M | Admin list shows derived **status**: Draft, Scheduled, Live, Expired, Deleted | Status badge matches the rule |
| FR-AN-07 | M | Public ordering: newest `effective_at` first; optional "pinned" ones first | Deterministic order |
| FR-AN-08 | S | Video type supports YouTube/Facebook URLs, converted to a safe embed | Non-allowlisted hosts rejected |
| FR-AN-09 | S | Image upload to storage with size/type limits | >5 MB or non-image rejected |
| FR-AN-10 | S | Announcements can be included in the email digest | Appears in next digest to subscribers of "announcements" |

⚠ The original request lists "all announcement, monthly announcement, monthly announcement, daily announcement". This spec assumes **All / Daily / Weekly / Monthly**.

### Visibility truth table

Assume `now` = 10 Nov, 09:00.

| Published | Effective | Expires | Deleted | Public? | Admin status |
|---|---|---|---|---|---|
| no | 1 Nov | — | no | ❌ | Draft |
| yes | 15 Nov | — | no | ❌ | Scheduled |
| yes | 1 Nov | — | no | ✅ | Live |
| yes | 1 Nov | 30 Nov | no | ✅ | Live |
| yes | 1 Nov | 9 Nov | no | ❌ | Expired |
| yes | 1 Nov | — | yes | ❌ | Deleted |

## FR-SV Service hours

| ID | Pri | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-SV-01 | M | Seeded defaults: **Sunday Morning Service 9:00 AM–12:00 PM** and **Sunday Afternoon Service 3:00 PM–6:00 PM**, every Sunday | Present on fresh install |
| FR-SV-02 | M | Admin can add, edit, soft-delete, restore services | As FR-AN-01 |
| FR-SV-03 | M | Recurrence types: **Weekly** (day of week) and **Monthly Nth weekday** (e.g. 3rd Tuesday; also "last") | "3rd Tuesday 7–9 PM" displays correctly and computes the right next date |
| FR-SV-04 | M | Fields: name, description, audience, day, start/end time, recurrence, icon, sort order, active flag | Validation: end after start |
| FR-SV-05 | M | Public list shows each service's **next occurrence** | Computed server-side in church timezone, DST-agnostic for `Asia/Manila` |
| FR-SV-06 | S | Optional "effective from/to" for seasonal services (e.g. Christmas Eve) | Outside the window the service is hidden |
| FR-SV-07 | S | Admin can mark a single occurrence as cancelled | That date is skipped; next one shown |
| FR-SV-08 | S | Services can be flagged "streamed online" → drives the live stream countdown | Countdown targets the next streamed service |

## FR-MN Get involved

| ID | Pri | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-MN-01 | M | Admin can add/edit/soft-delete/restore ministries | Always soft delete |
| FR-MN-02 | M | Fields: name, description, image, leader (optional), contact (optional), sort order, active flag | |
| FR-MN-03 | M | Seeded: Life Groups, Shepherding, Music Ministry, Sound System, Ushering Ministry (admin may change) | Present on fresh install |
| FR-MN-04 | S | "I'm interested" action sends an inquiry to admin (reuses the contact/inquiry pipeline, no account needed) | Rate limited; admin sees it |
| FR-MN-05 | M | Public list excludes deleted and inactive | |

## FR-EV Events

| ID | Pri | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-EV-01 | M | Admin can add/edit/soft-delete/restore events | |
| FR-EV-02 | M | Fields: title, description, image, location, start/end, category, **requires registration** (bool), registration open/close, capacity (optional) | |
| FR-EV-03 | M | If registration **not** required → no Register button (e.g. Christmas event) | |
| FR-EV-04 | M | If required → admin attaches a **registration form** (e.g. Kingdom Family) | Event cannot be published with "requires registration" and no form |
| FR-EV-05 | M | **Form builder**: admin adds fields — text, long text, email, phone, number, dropdown, radio, checkbox, date — with label, required, help text, options | Public form renders from this definition |
| FR-EV-06 | M | Visitor submits registration; server validates against the stored form definition | Missing required field → rejected; unknown fields ignored |
| FR-EV-07 | M | Admin can view responses per event and export **CSV** | CSV opens in Excel with correct columns |
| FR-EV-08 | M | Registration closes automatically at close date or when capacity reached | Further submits get a clear message |
| FR-EV-09 | S | Duplicate prevention (same email + event) | Second attempt rejected or updates the first |
| FR-EV-10 | S | Confirmation email to registrant | Sent if email field present and consented |
| FR-EV-11 | S | Forms are reusable templates (clone "Kingdom Family" form for next year) | Clone creates independent copy |
| FR-EV-12 | M | Only upcoming/ongoing events are shown publicly | Past events hidden |

## FR-PR Prayer requests

This is the anonymous part of "Get in Touch".

> [!important] Intent
> People can **anonymously** send a prayer request; admins see it to **relay to the church**; it must **not be abusable**.

| ID | Pri | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-PR-01 | M | Public form: request text (required), category (optional), display name (optional), "OK to share with congregation?" (default no). **No email or phone required** | Submission works with only text |
| FR-PR-02 | M | Server stores no IP address in plain text | Only a salted, daily-rotating hash for rate limiting |
| FR-PR-03 | M | Bot protection: Turnstile + hidden honeypot field | Missing/invalid token → rejected |
| FR-PR-04 | M | Rate limit per client: e.g. 3 / hour, 10 / day (configurable) | 4th in an hour → `RATE_LIMITED` |
| FR-PR-05 | M | Length limits (e.g. 10–1000 chars), plain text only | HTML rendered as text, never executed |
| FR-PR-06 | M | **Content screening:** links, emails, phone numbers, repeated characters, profanity/abuse terms, duplicates → request is **quarantined** (stored, flagged, not shown in main inbox) | Quarantined items reviewable and releasable by admin |
| FR-PR-07 | M | Possible self-harm/crisis wording → marked **urgent** for pastoral attention, and the submitter sees configurable crisis-resources text | Urgent badge in inbox; confirmation page shows resources |
| FR-PR-08 | M | Inbox for `prayer_team`: statuses **New → Reviewed → Relayed → Archived**; soft delete | Status transitions audited |
| FR-PR-09 | M | Admin can block abusive clients (hash-based) and mark a request as spam | Blocked client gets generic success-looking or `RATE_LIMITED` response |
| FR-PR-10 | M | Only `prayer_team` and `super_admin` can read request text | Editor/admin → 403 |
| FR-PR-11 | S | Notify prayer team by email digest (not per request) | Daily/instant setting |
| FR-PR-12 | S | Retention policy: auto-archive after N days, purge after M | Configurable; purge audited |
| FR-PR-13 | M | Never include request text in logs or analytics | Log inspection test |

## FR-SB Email subscriptions

> [!note]
> The original request mixes "Get in Touch" and email updates. This spec separates them: **prayer requests** (anonymous, no email) and **subscriptions** (email required).

| ID | Pri | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-SB-01 | M | Visitor subscribes with email (+ optional name) and picks topics: **Daily devotion**, **Bible reading**, **Announcements**, **Upcoming events** ⚠ | |
| FR-SB-02 | M | **Double opt-in**: confirmation email with token link | Unconfirmed subscribers never receive content |
| FR-SB-03 | M | Every email has a one-click **unsubscribe** link | Unsubscribe takes effect immediately |
| FR-SB-04 | M | Subscribers can change topics via a manage link | |
| FR-SB-05 | M | Admin can write **devotions** (date, title, scripture reference, body) and schedule them | Daily job sends that day's devotion to confirmed subscribers of the topic |
| FR-SB-06 | S | Bible reading = daily reading reference(s) with link to a free Bible site; no copyrighted translation text stored unless licensed ⚠ | |
| FR-SB-07 | S | Weekly/monthly announcement digest | Includes live announcements since last send |
| FR-SB-08 | M | Admin subscriber list with counts per topic, search, export CSV | |
| FR-SB-09 | M | Send log (what, when, to how many, failures) | |
| FR-SB-10 | M | Subscription form is abuse-protected (Turnstile, rate limit) and never reveals whether an email is already subscribed | Same response either way |
| FR-SB-11 | S | Bounce/complaint handling suppresses address | |

## FR-LS Live stream

| ID | Pri | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-LS-01 | M | Public site shows a **Watch Online** area: live player when live, otherwise "next service" countdown and latest replay | |
| FR-LS-02 | M | Admin sets stream source (YouTube channel/video, Facebook video URL) and toggles **Go Live / End Stream** ⚠ | Toggle reflects on public site within ~30 s |
| FR-LS-03 | M | Only allowlisted embed hosts are accepted | Arbitrary iframe URLs rejected |
| FR-LS-04 | S | Replay list (title, date, URL), soft-deletable | |
| FR-LS-05 | S | Optional auto-live window based on streamed services | |
| FR-LS-06 | C | Native in-app broadcasting (Cloudflare Stream live) | Deferred — [[14-Decisions-and-Open-Questions#ADR-005]] |

## FR-AD Admin and platform

| ID | Pri | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-AD-01 | M | Email + password login, secure session cookie, logout | |
| FR-AD-02 | M | Lockout after repeated failures | 5 failures → 15 min lock |
| FR-AD-03 | M | Role-based access as in the table above | |
| FR-AD-04 | M | Audit log of create/update/delete/restore/status changes | Who, what, when |
| FR-AD-05 | M | Admin UI usable on a phone | All screens work at 375 px |
| FR-AD-06 | S | Two-factor authentication (TOTP) | |
| FR-AD-07 | M | **Soft delete only** with restore | Exception: audited privacy purge |

## Non-functional requirements

| ID | Requirement |
|---|---|
| NFR-01 | **Mobile first:** all public and admin pages usable at 375 px, touch targets ≥ 44 px |
| NFR-02 | **Performance:** public home loads from one aggregated call (`/api/public/home`); LCP < 2.5 s on mid-range phone over 4G (target) |
| NFR-03 | **Accessibility:** WCAG 2.1 AA target (labels, contrast, keyboard, focus) |
| NFR-04 | **Security:** see [[11-Security-and-Abuse-Prevention]] |
| NFR-05 | **Privacy:** compliant in spirit with the Philippines Data Privacy Act of 2012 (RA 10173): consent, purpose limitation, retention, access/erasure rights |
| NFR-06 | **Reliability:** public read endpoints cacheable; admin outages must not break the public site |
| NFR-07 | **Maintainability:** shared Zod schemas, ≥ 80% coverage on API business logic |
| NFR-08 | **Documentation:** each feature ships with config guide, test cases and API docs |
| NFR-09 | **i18n-ready:** UI strings centralised so Filipino can be added later (C) |

## Traceability to the original request

| Original request | Requirements |
|---|---|
| Public view + live church stream | FR-LS-* |
| Announcements with filters, effective and expiration dates | FR-AN-* |
| Members count, years serving, founding setup (name, mission, vision, members, address, phone, email) | FR-CH-* |
| Service hours default Sunday, admin add/soft-delete, e.g. 3rd Tuesday prayer | FR-SV-* |
| Get involved: add/edit/soft delete | FR-MN-* |
| Events, optional registration, Google-Forms-like forms | FR-EV-* |
| Anonymous prayer requests, abuse-proof, admin relay | FR-PR-* |
| Email updates: devotion, Bible reading, announcements, events | FR-SB-* |
| FE only needs API, mobile view | NFR-01, [[03-Architecture]] |
| Dev docs, config docs, test cases, code guide, models | [[00-Index]] |
