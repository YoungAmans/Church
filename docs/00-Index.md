---
title: Hope Church Web App — Documentation Index
tags: [index, moc]
status: living
updated: 2026-11-08
---

# Hope Church Web App — Documentation

> [!info] How to use this vault
> Open the `docs/` folder as an Obsidian vault. Every note links to related notes with wikilinks (double square brackets). Diagrams use Mermaid (built into Obsidian).
> The AI memory file is `CLAUDE.md` in the repo root. Keep its **Status** block in sync with [[06-Development-Phases]].

## Read in this order

1. [[01-App-Overview]] — what the app is and who it's for
2. [[02-Requirements-Spec]] — every requirement with acceptance criteria
3. [[13-Current-State-Gap-Analysis]] — what exists in the repo today vs what's required
4. [[14-Decisions-and-Open-Questions]] — decisions made and questions waiting for you
5. [[03-Architecture]] → [[04-Data-Model]] → [[05-API-Reference]]
6. [[06-Development-Phases]] — the build plan
7. [[07-How-To-Run]] — run, test, deploy
8. [[08-Feature-Configuration-Guide]] — how an admin configures each feature
9. [[09-Test-Cases]] — test case catalogue
10. [[10-Code-Guide]] — conventions, patterns, how to add a feature
11. [[11-Security-and-Abuse-Prevention]] — prayer request abuse controls, privacy
12. [[12-Deployment-and-Operations]] — environments, backups, monitoring

## Status board

| Area | Status |
|---|---|
| Documentation | ✅ Draft v1 written 2026-11-08 — awaiting your review |
| Public UI (landing page) | 🟡 Exists, hardcoded content |
| API | ⬜ Not started |
| Database | ⬜ Not started |
| Admin UI | ⬜ Not started |
| Live stream | 🟡 Hardcoded YouTube embed |
| Prayer requests | 🟡 Fake form (toast only) |
| Email subscriptions | ⬜ Not started |
| Tests | ⬜ None |

## Feature quick links

| Feature | Requirement | Config guide | Tests |
|---|---|---|---|
| Church setup | [[02-Requirements-Spec#FR-CH Church profile]] | [[08-Feature-Configuration-Guide#1. Church setup]] | [[09-Test-Cases#Church profile]] |
| Announcements | [[02-Requirements-Spec#FR-AN Announcements]] | [[08-Feature-Configuration-Guide#2. Announcements]] | [[09-Test-Cases#Announcements]] |
| Service hours | [[02-Requirements-Spec#FR-SV Service hours]] | [[08-Feature-Configuration-Guide#3. Service hours]] | [[09-Test-Cases#Service hours]] |
| Get involved | [[02-Requirements-Spec#FR-MN Get involved]] | [[08-Feature-Configuration-Guide#4. Get involved (ministries)]] | [[09-Test-Cases#Get involved]] |
| Events + registration | [[02-Requirements-Spec#FR-EV Events]] | [[08-Feature-Configuration-Guide#5. Events and registration forms]] | [[09-Test-Cases#Events]] |
| Prayer requests | [[02-Requirements-Spec#FR-PR Prayer requests]] | [[08-Feature-Configuration-Guide#6. Prayer requests]] | [[09-Test-Cases#Prayer requests]] |
| Email updates | [[02-Requirements-Spec#FR-SB Email subscriptions]] | [[08-Feature-Configuration-Guide#7. Email subscribers and devotions]] | [[09-Test-Cases#Subscriptions]] |
| Live stream | [[02-Requirements-Spec#FR-LS Live stream]] | [[08-Feature-Configuration-Guide#8. Live stream]] | [[09-Test-Cases#Live stream]] |
