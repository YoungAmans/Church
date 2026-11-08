---
title: API Reference
tags: [api]
status: draft
updated: 2026-11-08
---

# API Reference (planned contract)

The frontend talks **only** to these endpoints. This is the contract to build and test against; when code diverges, update this note.

## Conventions

| Topic | Rule |
|---|---|
| Base | Same origin: `/api/...` |
| Public | `/api/public/*` — no auth, cacheable GETs |
| Admin | `/api/admin/*` — session cookie, role checked per route |
| Format | JSON, UTF-8. Timestamps are ISO-8601 UTC strings in responses |
| Success | `{ "data": … }` (lists add `"meta": { "page", "pageSize", "total" }`) |
| Error | `{ "error": { "code", "message", "details?" } }` |
| Delete | `DELETE` = **soft delete**. Restore with `POST /:id/restore` |
| Pagination | `?page=1&pageSize=20` (max 100) |
| Admin lists | `?q=`, `?includeDeleted=true`, `?status=` where relevant |

### Error codes

| Code | HTTP | Meaning |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Body/query failed Zod validation; `details` has field errors |
| `UNAUTHENTICATED` | 401 | No/expired session |
| `FORBIDDEN` | 403 | Role not allowed |
| `NOT_FOUND` | 404 | Missing or soft-deleted (for public) |
| `CONFLICT` | 409 | Duplicate (e.g. registration), invalid state |
| `CAPTCHA_FAILED` | 403 | Turnstile failed |
| `RATE_LIMITED` | 429 | Includes `Retry-After` |
| `REGISTRATION_CLOSED` | 409 | Event closed or full |
| `INTERNAL` | 500 | Never leaks internals |

## Public endpoints

| Method | Path | Purpose | Notes |
|---|---|---|---|
| GET | `/api/public/home` | Everything the landing page needs in one call | Cache ~60 s |
| GET | `/api/public/church` | Church profile + computed `years_serving` | |
| GET | `/api/public/announcements?scope=all\|daily\|weekly\|monthly&page=` | Visible announcements | Visibility rule FR-AN-03 |
| GET | `/api/public/announcements/:id` | One visible announcement | 404 if not visible |
| GET | `/api/public/services` | Active services with `next_occurrence_at` | |
| GET | `/api/public/ministries` | Active, non-deleted ministries | |
| GET | `/api/public/events` | Upcoming/ongoing published events | |
| GET | `/api/public/events/:id` | Event + registration form definition (if required) | |
| POST | `/api/public/events/:id/register` | Submit registration | Turnstile + rate limit |
| GET | `/api/public/stream` | `{ is_live, embed_url, title, next_service, latest_replay }` | Cache ≤ 15 s |
| POST | `/api/public/prayer-requests` | Anonymous prayer request | Turnstile + honeypot + rate limit + screening |
| POST | `/api/public/subscribe` | Start subscription (double opt-in) | Same response whether or not email exists |
| GET | `/api/public/subscribe/confirm?token=` | Confirm | |
| GET/POST | `/api/public/subscribe/manage?token=` | View/change topics | |
| POST | `/api/public/unsubscribe` | `{ token }` one-click unsubscribe | Also supports `List-Unsubscribe` |
| POST | `/api/public/ministries/:id/interest` | "I'm interested" (S) | Turnstile + rate limit |
| GET | `/api/public/devotions/today` | Today's devotion (web view, S) | |

### Example: `GET /api/public/announcements?scope=weekly`

```json
{
  "data": [
    {
      "id": "7f1c…",
      "title": "Kingdom Family Weekend",
      "summary": "Registration is open.",
      "type": "article",
      "body": "…",
      "imageUrl": null,
      "videoEmbedUrl": null,
      "scope": "weekly",
      "effectiveAt": "2026-11-08T00:00:00.000Z",
      "expiresAt": "2026-11-22T15:59:59.000Z",
      "isPinned": false
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "total": 1 }
}
```

### Example: `GET /api/public/services`

```json
{
  "data": [
    {
      "id": "a1…",
      "name": "Corporate Prayer Meeting",
      "recurrence": { "type": "monthly_nth", "dayOfWeek": 2, "weekOfMonth": 3 },
      "startTime": "19:00",
      "endTime": "21:00",
      "humanReadable": "Every 3rd Tuesday, 7:00–9:00 PM",
      "nextOccurrenceAt": "2026-11-17T11:00:00.000Z",
      "audience": "All members"
    }
  ]
}
```

### Example: `POST /api/public/prayer-requests`

Request:

```json
{
  "body": "Please pray for my family during this season.",
  "category": "family",
  "displayName": "",
  "shareWithCongregation": false,
  "turnstileToken": "<token>",
  "website": ""
}
```

`website` is the **honeypot** — must be empty. Response is always:

```json
{ "data": { "received": true, "message": "Thank you. Our prayer team will pray for you.", "resources": "<crisis_message or null>" } }
```

Quarantined or blocked submissions return the **same success shape** so abusers get no feedback; real throttling returns `RATE_LIMITED`.

## Admin endpoints

All require a session. Roles in brackets: **SA** super_admin, **A** admin, **E** editor, **P** prayer_team.

### Auth

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/admin/auth/login` | `{ email, password }` → sets cookie (lockout after 5 failures) |
| POST | `/api/admin/auth/logout` | Clears cookie |
| GET | `/api/admin/auth/me` | Current user + role |
| POST | `/api/admin/auth/change-password` | |

### Resource CRUD pattern

For each resource below: `GET /` (list), `POST /` (create), `GET /:id`, `PUT /:id`, `DELETE /:id` (**soft**), `POST /:id/restore`.

| Resource | Base path | Roles | Extras |
|---|---|---|---|
| Church profile | `/api/admin/church` | SA, A | `GET`, `PUT` only (singleton) |
| Announcements | `/api/admin/announcements` | SA, A, E | `POST /:id/publish`, `POST /:id/unpublish`; list `?status=draft\|scheduled\|live\|expired` |
| Services | `/api/admin/services` | SA, A, E | `POST /:id/exceptions` (cancel a date), `DELETE /:id/exceptions/:exId` |
| Ministries | `/api/admin/ministries` | SA, A, E | `PUT /reorder` |
| Events | `/api/admin/events` | SA, A, E | `POST /:id/publish`; `GET /:id/registrations`; `GET /:id/registrations.csv` |
| Forms | `/api/admin/forms` | SA, A, E | `POST /:id/clone` |
| Registrations | `/api/admin/registrations/:id` | SA, A | `PUT` status; `DELETE` soft |
| Devotions | `/api/admin/devotions` | SA, A, E | |
| Subscribers | `/api/admin/subscribers` | SA, A | `GET ?status=&topic=&q=`, `GET .csv`, `DELETE` = soft unsubscribe |
| Email sends | `/api/admin/email/outbox` | SA, A | read-only log; `POST /digest/send-now` |
| Stream | `/api/admin/stream` | SA, A | `PUT` settings; `POST /go-live`; `POST /end`; replays CRUD at `/replays` |
| Media | `/api/admin/media` | SA, A, E | `POST` multipart upload (type/size limited) |
| Admin users | `/api/admin/users` | SA | |
| Audit log | `/api/admin/audit` | SA | read-only |

### Prayer requests

| Method | Path | Roles | Purpose |
|---|---|---|---|
| GET | `/api/admin/prayer-requests?status=&screening=&q=` | SA, P | Inbox (quarantined hidden unless `screening=quarantined`) |
| GET | `/api/admin/prayer-requests/:id` | SA, P | Detail |
| PUT | `/api/admin/prayer-requests/:id/status` | SA, P | `new → reviewed → relayed → archived` |
| POST | `/api/admin/prayer-requests/:id/release` | SA, P | Release from quarantine |
| POST | `/api/admin/prayer-requests/:id/spam` | SA, P | Mark spam |
| POST | `/api/admin/prayer-requests/:id/block` | SA, P | Block that client hash |
| DELETE | `/api/admin/prayer-requests/:id` | SA, P | Soft delete |
| POST | `/api/admin/prayer-requests/purge` | SA | Audited privacy purge (documented exception) |

### Example: create announcement

```http
POST /api/admin/announcements
Content-Type: application/json

{
  "title": "Christmas Eve Service",
  "summary": "Join us at 6 PM.",
  "type": "article",
  "body": "…",
  "scope": "monthly",
  "effectiveAt": "2026-12-01T00:00:00+08:00",
  "expiresAt": "2026-12-25T00:00:00+08:00",
  "isPublished": true
}
```

→ `201 { "data": { "id": "…", "status": "scheduled", … } }`

### Example: create service ("3rd Tuesday")

```json
{
  "name": "Corporate Prayer Meeting",
  "recurrence": { "type": "monthly_nth", "dayOfWeek": 2, "weekOfMonth": 3 },
  "startTime": "19:00",
  "endTime": "21:00",
  "audience": "All members",
  "isActive": true
}
```

### Example: event with registration form

```json
{
  "title": "Kingdom Family Weekend",
  "requiresRegistration": true,
  "formId": "f0rm-id",
  "registrationClosesAt": "2026-12-10T23:59:00+08:00",
  "capacity": 120,
  "startsAt": "2026-12-14T09:00:00+08:00"
}
```

Form definition (`POST /api/admin/forms`):

```json
{
  "name": "Kingdom Family Registration",
  "fields": [
    { "key": "fullName", "label": "Full name", "type": "text", "required": true },
    { "key": "email", "label": "Email", "type": "email", "required": true },
    { "key": "adults", "label": "Adults attending", "type": "number", "required": true, "min": 1, "max": 10 },
    { "key": "kids", "label": "Children attending", "type": "number", "required": false },
    { "key": "meal", "label": "Meal preference", "type": "radio", "required": true, "options": ["Regular", "Vegetarian"] }
  ],
  "confirmationMessage": "See you there!"
}
```

## Rate limits (defaults, configurable)

| Endpoint | Limit |
|---|---|
| `POST /prayer-requests` | 3/hour, 10/day per client hash |
| `POST /subscribe` | 5/hour per client hash, 3/day per email |
| `POST /events/:id/register` | 10/hour per client hash |
| `POST /admin/auth/login` | 10/15 min per client hash + per-account lockout |

## Versioning

v1 is unversioned in the path for simplicity. Breaking changes require a new `/api/v2` prefix and an entry in [[14-Decisions-and-Open-Questions]].
