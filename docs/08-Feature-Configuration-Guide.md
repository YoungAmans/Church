---
title: Feature Configuration Guide
tags: [admin, how-to, configuration]
status: draft
updated: 2026-11-08
---

# Feature Configuration Guide

How an **admin** configures each feature once it is built. Every section lists: where, steps, what the public sees, and gotchas. Developer-side "how to add a new feature" is in [[10-Code-Guide#How to add a new configurable feature]].

> [!note] Screens are planned
> Menu names are the design; they will be verified against the real UI in each phase.

## 0. Sign in and roles

1. Go to `/admin` and sign in with email + password.
2. After 5 wrong attempts the account locks for 15 minutes.
3. What you can see depends on your role ([[02-Requirements-Spec#Roles and access]]).

Soft delete applies everywhere: **Delete** hides an item; **Show deleted → Restore** brings it back.

---

## 1. Church setup

**Where:** Admin → **Church**

| Field | Example | Public effect |
|---|---|---|
| Church name | Hope | Header, hero, footer, page title, link previews |
| Tagline | Fulfilling the Great Commission | Hero |
| Mission | Love Neighbours • Make Disciples • Plant Churches | About |
| Vision | To fulfill the great commission | About |
| Founded year | 2001 | **Years serving** = this year − 2001 (automatic) |
| Community members | 500 | About stats |
| Address, Phone, Email | | Contact, Location, Footer |
| Timezone | Asia/Manila | All schedules and dates |

Steps: edit → **Save** → refresh the public site.

> [!tip] Renaming the church
> Because "Hope" is a working name, change **Church name** here and nothing else. If link previews (Facebook/Messenger) still show the old name, they are cached by the platform; use the platform's re-scrape tool.

Gotchas: Years serving can't be typed; change **Founded year** instead. Keep placeholder contact details until the church approves the real ones.

---

## 2. Announcements

**Where:** Admin → **Announcements**

1. **New announcement**.
2. Choose **Type**: Article (text), Image (upload), or Video (YouTube/Facebook link).
3. Fill **Title** and **Summary** (+ body/media).
4. Choose **Scope**: Daily, Weekly or Monthly (this powers the public filter).
5. Set **Effective date** (when it starts showing) and optionally **Expiration date** (when it stops).
6. Toggle **Published** and **Save**.

Status badges:

| Badge | Meaning |
|---|---|
| Draft | Not published — nobody sees it |
| Scheduled | Published, but the effective date is in the future |
| Live | Showing now |
| Expired | Past the expiration date — hidden automatically |
| Deleted | Soft-deleted |

Public site: filter chips **All · Daily · Weekly · Monthly**. Nothing needs to be switched on or off manually when dates pass.

Gotchas: expiration must be after effective; time uses the church timezone; **Pinned** keeps an item at the top.

---

## 3. Service hours

**Where:** Admin → **Service hours**

Defaults (already there): **Sunday Morning 9:00 AM–12:00 PM**, **Sunday Afternoon 3:00 PM–6:00 PM**.

**Add a weekly service**
1. **Add service** → name, description, audience.
2. Repeat: **Every week** → pick the day → start/end time → **Save**.

**Add a monthly service (example: Corporate Prayer, 3rd Tuesday, 7–9 PM)**
1. **Add service** → name "Corporate Prayer Meeting".
2. Repeat: **Monthly on the Nth weekday** → **3rd** → **Tuesday**.
3. Times **7:00 PM – 9:00 PM** → **Save**.

Public sees: "Every 3rd Tuesday, 7:00–9:00 PM" plus the **next date**.

Other actions: **Cancel one date** (e.g. holiday), **Delete** (soft), **Restore**, **Active** toggle, tick **Streamed online** for the live-stream countdown.

---

## 4. Get involved (ministries)

**Where:** Admin → **Get involved**

1. **Add ministry** → name (e.g. Life Groups, Shepherding, Music Ministry, Sound System, Ushering Ministry), description, optional image, leader, contact.
2. Drag to reorder.
3. **Edit** anytime. **Delete** is always soft.

Public sees the cards in your order; inactive/deleted ones are hidden.

---

## 5. Events and registration forms

**Where:** Admin → **Events** (and **Forms**)

### Event without registration (e.g. Christmas Event)
1. **New event** → title, date/time, location, category, image.
2. Leave **Requires registration** **off** → **Publish**.
3. Public sees the event with no Register button.

### Event with registration (e.g. Kingdom Family)
1. **New event** → fill details.
2. Switch **Requires registration** **on**.
3. Choose a **Form**, or **Create new form**:
   - **Add field** → pick type (text, long text, email, phone, number, dropdown, radio, checkbox, date).
   - Set label, required, help text, options.
   - Reorder with drag handles. **Preview** to test.
4. Optionally set **Registration closes** and **Capacity**.
5. **Publish**.

Viewing responses: Events → open the event → **Registrations** → **Export CSV**.

Reuse: Forms → **Clone** to start next year's form from this year's.

Gotchas: you can't publish a registration-required event without a form; field **keys** can't change once responses exist (labels can); past events disappear from the public list.

---

## 6. Prayer requests

**Who:** `prayer_team` and super admin only.
**Where:** Admin → **Prayer requests**

Visitors submit anonymously (no email needed). Your inbox shows **New** requests.

Workflow: **New → Reviewed → Relayed** (to pastors/prayer meeting) **→ Archived**.

| Tab | Contents |
|---|---|
| Inbox | Clean requests |
| Urgent | Possible crisis wording — **review first** and follow your pastoral care process |
| Quarantine | Held by the abuse filter (links, contact info, profanity, repeats). **Release** if legitimate, **Spam** if not, **Block** to stop that sender |

Rules of thumb: never copy requests into public channels unless **Share with congregation** is ticked; do not forward screenshots with names; a request can't be answered by email because it's anonymous.

Settings (Admin → Church → Prayer): crisis-resources message shown after submission (e.g. a local hotline and "talk to a pastor"), retention days, notify-by-email on/off.

More: [[11-Security-and-Abuse-Prevention]].

---

## 7. Email subscribers and devotions

**Who:** devotions — editors+; subscribers — admin+.

### Write a devotion
1. Admin → **Devotions** → **New** → date, title, scripture reference, body.
2. **Publish**. At 5:00 AM (church time) on that date it is emailed to confirmed subscribers of **Daily devotion**.

### Bible reading
Add reading references (e.g. "Psalm 23; John 1") to the devotion; subscribers of **Bible reading** receive them with a link to a free Bible site. (Full copyrighted Bible text is not stored unless licensed.)

### Announcements and events emails
Subscribers of those topics get a digest of live announcements/upcoming events on the schedule configured under Admin → **Email**.

### Subscribers
Admin → **Subscribers**: filter by topic/status, search, **Export CSV**. Status meanings: Pending (not confirmed), Confirmed, Unsubscribed.

Gotchas: nobody receives email until they click the confirmation link; every email has an unsubscribe link; sending requires the church's verified email domain.

---

## 8. Live stream

**Where:** Admin → **Live stream**

1. Choose platform (YouTube / Facebook) and paste the **channel**, **video**, or **embed URL**. Only allowed hosts are accepted.
2. Start broadcasting on that platform as usual.
3. Press **Go live** → the public Watch Online area shows the player within ~30 seconds.
4. When finished press **End stream** → the site shows the next service countdown and the latest replay.
5. Add a **Replay** entry (title, date, URL) afterwards.

Tip: a YouTube **channel** source auto-points to whatever the channel is streaming; you still press Go live/End so the site only shows the player when you intend it.

---

## 9. Admin accounts (super admin)

Admin → **Users**: add user, choose role, deactivate (soft). Share the temporary password out-of-band and require change on first login.

---

## Configuration checklist for a new install

- [ ] Sign in as the seeded super admin and change the password
- [ ] Church setup filled (name, mission, vision, founded year, members, address, phone, email, timezone)
- [ ] Default services verified (Sun 9–12, 3–6); extra services added
- [ ] Ministries reviewed
- [ ] Stream source configured and tested with Go live/End
- [ ] Crisis message and prayer team users set
- [ ] Email sender domain verified and a test subscription completed
- [ ] First announcement and event created
