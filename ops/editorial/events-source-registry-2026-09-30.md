# TexasDefined Events source registry

Reviewed: 2026-09-30

## Source policy

TexasDefined treats first-party organizers, venues, public agencies and event-owning institutions as the authority for dates, cancellations, postponements, venue changes, ticket status and operating details. Destination marketing organizations and local calendars are discovery/secondary sources unless they are themselves the event owner. Ticket marketplaces are commercial inventory sources, not the authority for whether an event exists or has changed.

A permanent event guide may enter the rolling weekend and regional collections only after a current occurrence has a named official source and `sourceCheckedAt`. Never infer a new annual date from last year's weekend. Never turn an event-directory listing into a permanent guide without resolving the first-party organizer or host source.

## Automated discovery sources already in production

| Source | Coverage | Role | Publication rule |
| --- | --- | --- | --- |
| Texas Parks & Wildlife Department calendar | Statewide public-land events | First-party discovery | Auto-publish only records that clear the existing confidence/editorial gate |
| Ticketmaster bounded Texas discovery | Statewide ticketed entertainment | Commercial discovery/ticketing | Stale, cancelled or >48-hour-old inventory is hidden; permanent-guide facts remain organizer-controlled |
| First-party annual anchor pages in the event sync | Major recurring Texas events | First-party date discovery | Only publish when a current date can be parsed from the official source |
| Permanent major-event authority catalog | Statewide named events | First-party curated authority | Stable guide + explicit date/source review |

## Austin-area discovery and authority

Primary current sources include Austin City Limits Music Festival, Austin Saengerrunde, Austin Zoo, School of Indian Percussion & Music, Austin Film Festival, SXSW, Rodeo Austin, Austin Marathon, Austin-area sports organizers and other permanent authority guides already registered in the repository. Visit Austin is useful as a secondary discovery layer; first-party organizer pages control final facts.

The September 30 expansion adds current October 2-4 authority coverage for:

- AustOberfest — Austin Saengerrunde
- Boo at the Zoo — Austin Zoo
- Ta Se Dhin Tak Tabla Festival — School of Indian Percussion & Music
- Austin City Limits Music Festival was already a permanent first-party guide

This brings the current Austin-area weekend above the four-guide indexing threshold without padding the page with one-line calendar listings.

## San Antonio-area discovery and authority

Primary current sources include Fiesta San Antonio, San Antonio Stock Show & Rodeo, the City of San Antonio/Market Square, The Alamo, San Antonio Black International Film Festival, Project Bloom, Wurstfest and Comal/Guadalupe/Kendall-area permanent authority guides. Visit San Antonio is useful as a secondary discovery layer; first-party organizer and venue pages control final facts.

The September 30 expansion adds current October 2-4 authority coverage for:

- San Antonio Black International Film Festival — SABIFF
- Historic Market Square 12th Annual Car Show — City-supported Historic Market Square
- Tejanos at the Alamo — The Alamo
- Monarch Butterfly & Pollinator Festival — Project Bloom/Blooming with Birdie

This supplies at least four current San Antonio-area permanent guides for the rolling weekend page.

## Geographic coverage audit

| Region/corridor | Current state | Next source-expansion priority |
| --- | --- | --- |
| Houston/Gulf Coast core | Strong | Maintain organizer freshness; extend beyond Houston toward Beaumont, Galveston, Coastal Bend and small coastal towns when first-party calendars support permanent guides |
| Dallas-Fort Worth/North Texas | Strong | Maintain fair, festival, sports and municipal-calendar freshness |
| Austin/Central Texas | Strengthened in this pass | Keep Travis/Williamson/Hays/Bastrop balanced; do not let Austin-city inventory crowd out surrounding counties |
| San Antonio corridor | Strengthened in this pass | Keep Bexar/Comal/Guadalupe/Kendall balanced and source from event owners |
| East Texas/Piney Woods | Moderate | Add city/chamber/venue-owned calendars for Tyler, Nacogdoches, Lufkin, Longview and Beaumont-area events |
| South Texas/Rio Grande Valley | Moderate/seasonal | Add first-party calendars for McAllen, Brownsville, Harlingen, Edinburg, Laredo and regional cultural institutions |
| Panhandle/High Plains | Thin | Prioritize Amarillo, Canyon, Lubbock, state-park and museum/event-owner calendars |
| Big Bend/Far West | Thin but intentionally selective | Prioritize Marfa, Alpine, Fort Davis and destination-scale first-party events; avoid padding sparse periods |

Thin regions remain discoverable through durable regional pages but should not receive new indexable rolling doorway pages until sustained source-qualified inventory supports them.

## Interest/category coverage audit

The catalog has durable topic pages for rodeos/western events, food festivals, music festivals, arts/culture, seasonal/holiday events, sports events and tournaments. The rolling statewide weekend product can editorially group family-friendly, outdoor, free and Worth-the-Drive items when the underlying event metadata supports the claim.

Dedicated `family-events-this-weekend`, `free-events-this-weekend`, `outdoor-events-this-weekend` or similar search landing pages are **not** being created in this pass. A new dedicated indexable interest page should require at least six source-qualified permanent guides in the live window and should meet that threshold across repeated refreshes, not just one unusually busy weekend. Until then, those intents belong as sections/filters within stronger parent pages.

## Cancellation, postponement and reschedule monitoring

- First-party organizer/venue source is authoritative.
- The canonical event record supports `scheduled`, `cancelled`, `postponed` and `rescheduled` states.
- Ticketmaster inventory is suppressed when cancelled or stale and is not allowed to override organizer facts.
- A cancellation/reschedule should update the permanent guide and remove the occurrence from active weekend/month discovery as soon as the official source is rechecked.
- If a recurring annual guide has no newly announced dates, retain the evergreen guide but do not invent an occurrence or emit scheduled Event schema for an unverified date.

## Image and social source policy

Event images may render only when item-level reuse rights are verified. `official-source-only` and `unknown` images are not silently republished. A missing safe image is preferable to an unauthorized organizer image. Social previews may use the existing compliant brand fallback when an event-specific reusable asset is unavailable; the page title, description, canonical and current event facts must remain event-specific.
