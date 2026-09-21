# Ticketmaster recurring-event authority audit — 2026-09-21

## Scope

This audit starts from the first successful TexasDefined Ticketmaster affiliate snapshot fetched on 2026-09-21. The snapshot contains 3,559 Texas event rows covering the next 90 days.

Every row was scanned for recurring-event signals. A second high-signal pass focuses on festival, fair, rodeo, parade, marathon, championship, convention, expo, Oktoberfest, fiesta, gathering, balloon, comic-con, car-show and market language while excluding obvious touring productions, generic concerts, aftershows and add-ons.

The scan is a discovery layer, not permission to publish a permanent page. A durable `/event/:slug` authority guide requires a stable event identity, a current verified occurrence, organizer/host evidence, and enough planning or destination value to justify a permanent page.

Run the reproducible candidate scan with:

`node scripts/events/audit-recurring-ticketmaster-events.mjs`

## Wave 1: permanent authority guides added

The first wave promotes these current Ticketmaster discoveries into permanent TexasDefined authority pages:

| Permanent route | 2026 occurrence | Why it qualifies |
|---|---|---|
| `/event/fiesta-de-palmas` | Oct. 16–18, McAllen | Established McAllen signature festival with city/visitor-bureau support and a durable cultural identity. |
| `/event/mcallen-holiday-parade` | Dec. 5, McAllen | Annual city parade with a stable parent event, destination scale and recurring holiday planning value. |
| `/event/south-pole-illuminated-festival` | Nov. 27–29 currently ticketed, McAllen | City-supported recurring signature holiday event; page explicitly avoids projecting unannounced 2026 dates beyond confirmed inventory. |
| `/event/bands-of-america-san-antonio-super-regional` | Nov. 6–7, San Antonio | Recurring Music for All championship at the Alamodome with meaningful family/travel logistics. |
| `/event/big-12-football-championship` | Dec. 4, Arlington | Annual conference championship with a stable event identity and major North Texas travel demand. |
| `/event/el-paso-film-festival` | Sep. 24–26, El Paso | Recurring downtown film festival; multiple Ticketmaster screening rows belong under one parent guide. |
| `/event/way-out-west-festival-el-paso` | Sep. 26, El Paso | Established El Paso festival with official producer and destination-organization support. |
| `/event/state-fair-classic` | Sep. 26, Dallas | Annual HBCU football tradition embedded in the State Fair of Texas. |
| `/event/beaumont-comic-con` | Oct. 3–4, Beaumont | Recurring two-day Southeast Texas convention with a stable venue and organizer identity. |
| `/event/eagle-fest-the-woodlands` | Oct. 3, The Woodlands | Same organizer and venue in 2025 and 2026, with the 2025 recap explicitly inviting fans back the following year. |
| `/event/bill-pickett-rodeo-fort-worth` | Five Fort Worth dates in 2026 | BPIR is in its 42nd year and explicitly identifies a recurring Fort Worth Texas Connection series at Cowtown Coliseum. |
| `/event/hollydays-market-corpus-christi` | Nov. 6–8, Corpus Christi | Recurring Corpus Christi holiday market with documented 2024, 2025 and 2026 editions and a stable Hilliard Center venue. |

Ticketmaster child rows for these families point to their parent guide rather than only a date-filtered calendar view.

## Existing authority coverage retained

The scan also surfaced Ticketmaster rows for recurring events that already have permanent TexasDefined authority coverage. No competing page should be created for these parent events. Examples include:

- Austin City Limits Music Festival
- Austin Food + Wine Festival
- Red Steagall Cowboy Gathering
- Houston Ballet Nutcracker Market
- San Antonio Stock Show & Rodeo
- State Fair of Texas and its existing destination/event cluster

Individual Ticketmaster day/session/add-on records remain useful live inventory but should not become separate permanent SEO pages when a reviewed parent guide already owns the topic.

## Deliberately not promoted in this wave

The following types remain in the live calendar, venue pages or future-review queue instead of receiving a permanent annual-event page:

- **Austin Championship / 2026 PGA TOUR Austin event** — current PGA TOUR material identifies 2026 as the first year, so annual recurrence is not established yet.
- **Breakaway Music Festival Houston** — the Houston 2026 event is verified, but a durable Houston recurrence is not yet established by the current 2027 rollout.
- **Eric Clapton's Crossroads Guitar Festival** — a recognizable event brand, but historically intermittent rather than a dependable annual Texas occurrence.
- **Stockyards Championship Rodeo** — recurring year-round/series inventory is better represented through Cowtown Coliseum and the live calendar than an "annual" guide.
- **Water Lantern Festival** — touring-market event; recurrence in McAllen should be established from organizer history before a permanent Texas-specific authority page is created.
- **Grand Prairie Comedy Festival, King of Cars Custom Car Show & Culture Fest, Card Expo and similar current listings** — current occurrence is real, but the available evidence does not yet justify presenting them as durable annual Texas traditions.
- **Nutcracker, Christmas Carol and other productions** — production titles can recur, but different companies, venues and touring runs are not one statewide annual event identity.
- **ACL Fest Nights, film screenings, prelims/finals, day tickets, early-bird passes and other child inventory** — these should resolve to the parent event or remain live ticket inventory, not become thin pages.

## Monetization safeguard found during the audit

Before this audit, exact editorial/Ticketmaster duplicates favored the reviewed editorial record and could suppress the provider affiliate ticket metadata. The recurring-event work now merges provider ticketing into the richer editorial record, preserving TexasDefined's reviewed guide/county/venue context while retaining a current Impact-tracked Ticketmaster CTA.

The shared ticket resolver remains authoritative: a current affiliate deep link produces one sponsored `Find Tickets →` action; otherwise a verified official ticket URL can be used. No checkout is hosted by TexasDefined.

## Continuing rule

Future Ticketmaster refreshes should be treated as discovery input. New event families can graduate to permanent authority pages only after recurrence and current organizer facts are verified. Child tickets should link upward to the permanent parent guide whenever a safe family match exists.
