# TexasDefined — statewide Chamber media, event and source partnership program

**Sender:** admin@texasdefined.com using Microsoft 365 Outlook only. **Never use Gmail.**  
**Checkpoint:** https://github.com/keeptxred/TexasDefined/issues/7548  
**Opened:** November 22, 2026. This program has started, but does not claim 254 active relationships.

## Objectives

Improve local festivals, community celebrations, parades, holiday programming and annual traditions on TexasDefined county guides and the statewide events calendar. Build reliable announcements and media relationships with organizations serving **all 254 Texas counties**. Invite independently earned resource links to genuinely useful TexasDefined coverage; no payment, reciprocal exchange or coverage-for-link arrangement.

A county may have several city Chambers or no distinct countywide Chamber. A Chamber may cover multiple counties. Where needed, expand to official city tourism, CVBs, fair boards, organizers and regional Chambers. Never invent a source for an unserved county.

## Existing systems to extend rather than duplicate

- Editorial outreach intake and protected administration: src/data/editorial-outreach.server.ts and /admin/editorial-outreach.
- Existing protected Backlink Command Center and docs/seo/backlink-command-center.md.
- Authoritative event calendar, permanent event guides and protected refresh: src/data/events/texas-event-records.server.ts and .github/workflows/sync-texas-events.yml.
- Canonical 254-county registry: src/data/texas-places.ts.
- Newly introduced public-source discovery: ops/editorial/chamber-event-sources.json, scripts/events/audit-chamber-event-sources.mjs, and .github/workflows/audit-chamber-event-sources.yml.

## Verified outreach workflow

1. Research verified official Chambers for each county, using the TCCE and U.S. Chamber directories as starting points, followed by first-party sites. Register all counties covered by one Chamber, but do not mistake a nearby Chamber for a representative of an unrelated county.
2. Find a published email, media contact or contact form. Check the existing O365 Sent Items and protected outreach records to avoid duplicate messages. Do not guess addresses or scrape Chamber member lists.
3. From the O365 sender, introduce the existing TexasDefined events calendar and exact relevant county guide. Request opt-in to press releases, official annual-festival and holiday announcements, material date changes and corrections, and any available media kit, press photography and publication terms.
4. Optional reference invitation: if the Chamber finds a specific TexasDefined guide independently useful, it may link to it from an appropriate visitor/media resource page. No paid, traded, required or guaranteed backlink; no editorial preference in exchange.
5. Store responses, press-list acceptance, contact data, email and image rights in O365 and existing protected outreach systems. Public GitHub contains only official source names/URLs and the nonpersonal county coverage queue.
6. Offer at most one courteous unanswered follow-up after approximately ten business days. Honor declines and stop requests. Use tailored one-organization messages rather than a 254-recipient blast.
7. Request preliminary holiday calendars August–October, follow updates through December, and check recurring festivals ahead of each organizer's normal announcement cycle.

## Automated source discovery when mailings are unavailable

- Prefer explicitly published event RSS, iCalendar or public structured-data feeds and first-party public Chamber calendars, respecting robots exclusions, publisher terms, access limits, and rate limits. Never bypass authentication or robots rules.
- The new GitHub source audit fetches **at most the single registered public calendar URL** per organization in a due review cycle, identifies candidate event titles/dates/source URLs, and records missing geographic coverage. As registration expands beyond twelve sources, fetch checks are distributed over seven days; holiday-priority sources can be checked more often.
- A Chamber calendar is for **discovery**, not authoritative publication. The event organizer/venue or competent city authority must independently confirm current event dates, location, organizer, tickets, changes, cancellation status and media reuse permission.
- Do not copy event descriptions/photos, guess subsequent years, move source verification dates following a mere HTTP 200, or emit Event schema for an unverified future occurrence.
- Resolved, current events belong in the **existing** authoritative calendar and permanent event guide lifecycle, with applicable county-page and regional crosslinks. No separate thin county/event doorway pages.
- If automated access fails or is forbidden, leave it as manual research, honor access restrictions, and use email or official human-submitted media lists.

## County-level acceptance standard

Each of the 254 counties eventually needs reviewed first-party discovery sources; a clear record of whether the Chamber actually agreed to ongoing media list inclusion; current organizer-verified events; appropriate county/event/region links; holidays monitored on season; exact-date validation and annual refresh without unsupported date rollover; image permissions; factual AEO and SEO; and search-safe event structured data.

**Do not equate source-mapped with subscription confirmed, event coverage complete or an earned backlink.** County coverage progresses separately through research, outreach, source accepted, verified-event publication and link verification.

## Verified launch cohort and honest gap

- Gregg and Upshur counties: Gladewater Chamber of Commerce — https://gladewaterchamber.org/
- Angelina County: Lufkin/Angelina County Chamber — https://www.lufkintexas.org/
- Kimble County: Kimble County Chamber — https://www.kimblecountychamber.com/
- Jefferson County: Greater Port Arthur Chamber — https://chamber.portarthurtexas.com/

**Source-mapped: 5 / 254 counties. Remaining: 249 counties requiring verified source research.**

On November 22, 2026, initial outreach messages were sent from O365 to Gladewater and Lufkin/Angelina. Subscription success, delivery receipts, media rights and backlinks remain unconfirmed until the organizations respond or a live linking URL is independently observed.

## Source references

- https://www.texas.gov/government-information/local-government-resources
- https://business.tcce.org/active-member-directory
- https://www.uschamber.com/co/chambers/texas/
- https://developers.google.com/search/docs/essentials/spam-policies
- docs/seo/backlink-command-center.md

Keep checkpoint #7548 open until statewide source discovery is complete, current event coverage reaches county and event pages with source verification, scheduled refresh evidence exists, and the external relationship outcomes are truthfully documented. Never promise third-party links or media-kit delivery.
