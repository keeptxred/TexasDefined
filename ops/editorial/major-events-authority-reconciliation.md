# Major Texas events authority reconciliation

Last reviewed: 2026-08-27

## Purpose

The supplied `texas_major_events_75.pdf` is a discovery inventory, not a publication authority. Permanent `/event/{slug}` pages may use an inventory item only after current organizer, host, government, league, or similarly authoritative evidence supports the event identity and date treatment.

Do not publish guessed future dates. A future occurrence may be represented when either:

1. the organizer explicitly publishes that year's dates; or
2. the organizer publishes a stable annual recurrence rule and the page clearly labels the calculated dates as recurrence-derived pending the year-specific program.

When the discovery inventory is stale, Texas Defined should correct or replace the seed rather than preserve an obsolete name, venue, city, or date.

## Corrections already resolved in the authority layer

- Central Texas State Fair: corrected from September 4-6 to September 3-6, 2026 using the official fair calendar.
- Austin Film Festival: current organizer dates supersede the discovery inventory's October 22-29 range.
- SXSW 2027: corrected to March 15-21, 2027 from the organizer's published 2027 announcement.
- Texas SandFest 2027: corrected to April 16-18, 2027 from the official organizer schedule rather than the inventory's May dates.
- Charro Days Fiesta: uses the organizer's current core 2027 festival/parade window instead of the broader seed range.
- George West Storyfest: not copied as a current event; the active literary event was reconciled to Dobie Dichos.
- General Granbury's Birthday Festival: reconciled to Granbury Founder's Day Jubilee and Cook-Off and moved from the seed's May placement to the organizer's third-weekend-in-March recurrence.
- Larry Joe Taylor Coastal Cowboy Festival: not copied as an April Galveston event. The organizer's confirmed April 19-24, 2027 flagship is Larry Joe Taylor's Texas Music Festival at Melody Mountain Ranch in Stephenville; the Galveston-linked Coastin' & Cruisin' event is separate and occurs in January 2027.
- Juneteenth Freedom Fest: not treated as one statewide single-day event. Visit Galveston currently publishes Galveston Juneteenth Celebrations across June 1-30, 2027; individual programs must still be checked by date and venue.
- San Antonio Rock 'n' Roll Marathon: retired seed identity. Rock 'n' Roll left San Antonio after 2024; the current locally organized San Antonio Marathon Weekend is December 4-6, 2026.
- Terlingua / Chili Appreciation Society entries: avoid creating duplicate authority pages for the same CASI championship identity.

## Current hold queue

These inventory items are deliberately **not** promoted to a dated permanent authority occurrence until stronger current evidence appears.

| Inventory item | Seed timing | Current disposition | Required evidence before promotion |
| --- | --- | --- | --- |
| Washington-on-the-Brazos Celebration | Feb. 27-28, 2027 | Hold | Official 2027 celebration dates/program from Texas Historical Commission or event organizer. |
| Borderfest | Mar. 4-7, 2027 | Hold | Explicit official 2027 dates. Do not infer from inconsistent annual timing language. |
| Contemporary Austin Critter Ball | Mar. 2027 | Hold | Current organizer 2027 date plus confirmation that it belongs in the statewide major-event authority set. |
| Texas Ranger Association Gathering | Mar. 2027 | Hold | Identifiable current organizer event and explicit 2027 date/location. |
| Poteet Strawberry Festival | Apr. 9-11, 2027 | Hold | Official Poteet organizer currently says forthcoming event details will be shared; wait for explicit 2027 dates. |
| Austin Reggae Festival | Apr. 16-18, 2027 | Hold | Explicit organizer/City of Austin 2027 dates; current official material still centers on 2026. |
| Inks Lake Spring Wildflower Viewing | Apr. 2027 | Hold | Evidence that this is a discrete recurring event rather than seasonal visitation, plus official dates. |
| Stagecoach Ballroom Western Days | May 2027 | Hold | Current organizer page identifying the event and 2027 dates. |
| Texas State Arts & Crafts Fair | May 2027 | Hold / seed timing suspect | Official Hill Country Arts Foundation 2027 dates. Current event identity remains valid, but the seed's May timing should not be assumed. |
| Tejano Conjunto Festival | May 19-23, 2027 | Hold | Guadalupe Cultural Arts Center currently publishes the 2026 festival; wait for explicit 2027 dates. |
| Comicpalooza | May 21-23, 2027 | Hold | Official 2027 show dates/hours; organizer currently says 2027 information is coming soon. |
| Arlington Highlands Summer Fest | Jun. 2027 | Hold | Current organizer identity plus 2027 dates and statewide-significance review. |
| Texas Shakespeare Festival | Jun.-Jul. 2027 | Hold | Official 2027 season dates. Current official material does not yet establish the 2027 performance window. |
| Great Texas Balloon Race | Jun. 11-13, 2027 | Hold | Official 50th-anniversary 2027 dates. Organizer is promoting the anniversary but has not yet posted the dates. |
| Billy Bob's July 4th Picnic | Jul. 3-4, 2027 | Hold | Official Billy Bob's 2027 event listing and dates. |
| Viva! El Paso | Jul.-Aug. 2027 | Hold | Official 2027 season dates. |
| Rockport Art Festival | Jul. 3-4, 2027 | Hold | Official Rockport Center for the Arts 2027 dates; prior-year weekend patterns are not enough. |
| Great American Scrapbook Convention | Jul. 2027 | Hold / seed may be stale | Current organizer event page, current Arlington venue, and explicit 2027 dates. |
| Texas Legacies Outdoor Drama | Jul. 2027 | Hold / obsolete identity | Current production is `TEXAS Outdoor Musical`; organizer says to check back for 2027 dates. Reconcile to the current identity only after those dates publish. |
| Texas Rangers Fan Fest | Jan. 2027 | Hold | Official Rangers 2027 Fan Fest announcement/date. Do not substitute the separate 2027 Rangers Fantasy Camp. |

## Research notes for future passes

- Tejano Conjunto Festival remains a strong authority candidate because the Guadalupe Cultural Arts Center describes it as the first and longest-running conjunto festival in the country, but its current page still publishes the May 14-17, 2026 program rather than 2027.
- Great Texas Balloon Race is explicitly preparing for its 50th celebration in 2027, but the organizer's current schedule still displays the 2026 event. Treat the anniversary as evidence the event will continue, not as evidence of exact dates.
- Texas Rangers have already published the 2027 regular-season schedule and a separate January 6-10, 2027 Fantasy Camp. Neither is evidence for the seed's January 2027 Fan Fest date.
- The current `TEXAS Outdoor Musical` site says the 2026 season has ended and directs visitors to check back for 2027 dates. Do not preserve the stale `Texas Legacies Outdoor Drama` name from the seed.

## Publication checklist for every additional event

Before adding a new permanent authority guide:

- confirm the event still exists under the current name;
- confirm city/venue and organizer identity;
- verify exact dates from an official current-year source, or document an explicit recurrence rule;
- record `sourceCheckedAt`;
- keep long-form planning copy server-only;
- add sitemap discovery when the event is not represented in `majorEventIndexRecords`;
- use Event structured data only for a defensible occurrence window;
- avoid duplicate pages for renamed or overlapping event identities;
- run the full protected validation suite and client-performance budget;
- reconcile with current `main` immediately before merge.
