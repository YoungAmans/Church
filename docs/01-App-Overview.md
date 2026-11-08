---
title: App Overview
tags: [overview]
status: draft
updated: 2026-11-08
---

# App Overview

## One-paragraph summary

A mobile-friendly church web app. Visitors see a public site for **Hope Church** (working name): a live stream, announcements, service hours, ways to get involved, upcoming events (with optional registration), a safe anonymous prayer request form, and email updates. Church staff use an admin area to configure all of it. The frontend never holds content; it only talks to the API.

> [!note] Why "Hope"?
> This is a personal project that will later be proposed to the real church. The church identity (name, mission, vision, address, etc.) is therefore **configuration, not code**. Changing the name is a one-minute admin edit (see [[08-Feature-Configuration-Guide#1. Church setup]]).

## Who uses it

| Role | Who | What they do |
|---|---|---|
| **Visitor** | Anyone on the internet, mostly on a phone | Read, watch the stream, register for events, send prayer requests, subscribe |
| **Editor** | Communications volunteer | Manage announcements, events, ministries, devotions |
| **Prayer team** | Pastors / prayer coordinators | See and triage prayer requests only |
| **Admin** | Church administrator | Everything above + church setup, service hours, subscribers, stream |
| **Super admin** | You (developer/owner) | Everything + admin accounts, privacy purge, audit log |

## Feature summary

| # | Feature | Visitor sees | Admin controls |
|---|---|---|---|
| 1 | Church setup | Name, mission, vision, address, phone, email, member count, years serving | Edit all of these |
| 2 | Announcements | Carousel/list filtered by All / Daily / Weekly / Monthly | Create with effective and expiration dates; draft/schedule/expire automatically |
| 3 | Service hours | Cards with next occurrence | Defaults: Sunday 9–12 and 3–6. Add/soft-delete others (e.g. 3rd Tuesday prayer) |
| 4 | Get involved | Ministry cards | Add, edit, soft-delete (Life Groups, Shepherding, Music, Sound System, Ushering…) |
| 5 | Upcoming events | Event cards; Register button only when required | Toggle "requires registration"; build a form; view/export responses |
| 6 | Prayer requests | Anonymous form | Triage inbox, mark relayed, block abuse |
| 7 | Email updates | Subscribe form (devotion, Bible reading, announcements, events) | Write devotions, send digests, manage subscribers |
| 8 | Live stream | "Live now" player or "next service" countdown + replays | Go live / end, set stream source |

## Principles

1. **API-first.** Anything the UI shows is fetched from the API. This is what makes a mobile app or another client possible later.
2. **Configure, don't code.** A non-developer can run the church's content.
3. **Soft delete everywhere.** Nothing is lost by accident.
4. **Safe by default.** Anonymous prayer requests are protected from abuse and from leaking personal data.
5. **Mobile first.** Most visitors will arrive from a phone, often on Sunday morning.
6. **Document first.** Specs and test cases exist before code.

## Out of scope for v1 (can revisit)

- Online giving / payments (the design guideline mentions a "Give" button — see [[14-Decisions-and-Open-Questions]])
- Member directory / member login
- Native mobile apps (the API-first design keeps this possible)
- Broadcasting video *from* the app itself (v1 embeds a stream hosted elsewhere — see [[14-Decisions-and-Open-Questions#ADR-005]])
- Multi-church / multi-tenant

## Success criteria

- An admin can change the church name, add an announcement, add a service, and toggle the stream without a developer.
- The public site scores well on mobile (Lighthouse performance and accessibility ≥ 90 as a target).
- A spam burst against the prayer request form does not reach the prayer team's inbox.
- Every feature has docs and test cases before it ships.

## Glossary

| Term | Meaning |
|---|---|
| Effective date | When an announcement starts being public |
| Expiration date | When it stops being public (optional) |
| Scope | Daily / Weekly / Monthly tag on an announcement |
| Soft delete | Row is hidden via `deleted_at`, never physically removed |
| Nth weekday rule | Recurrence like "3rd Tuesday of the month" |
| Double opt-in | Subscriber must click an emailed link to confirm |
| Turnstile | Cloudflare's CAPTCHA alternative used to block bots |
