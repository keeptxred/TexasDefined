# Annual Texas festivals: organizer-source reconciliation — October 21, 2026

This file records how the supplied annual-Texas-festivals seed was reconciled to the **current TexasDefined event authority registry**. The source list was treated as a discovery list, never as proof of a scheduled event.

## Reconciled event guides — eleven new guides

Each is implemented in `src/data/major-event-expanded-authority-tranche55.server.ts`, resolved in `major-event-page.server.ts`, and registered for calendar discovery and the sitemap in `major-event-supplemental-registry.server.ts`.

| Guide | Source-verified occurrence | Scheduling treatment |
|---|---|---|
| `/event/diwalisa-san-antonio` | Nov 7, 2026 | Confirmed |
| `/event/homestead-fair-waco` | Nov 27–29, 2026 | Confirmed |
| `/event/waco-wonderland` | Dec 4–6, 2026 | Confirmed |
| `/event/whooping-crane-festival` | Feb 25–28, 2027 | Confirmed; festival's 2027 page still contains some historical 2026 daily hours |
| `/event/dallas-international-film-festival` | Apr 22–29, 2027 | Confirmed; film program and venue details not final |
| `/event/worldfest-houston` | Apr 30–May 8, 2027 | Confirmed; public screenings still developing |
| `/event/cliburn-international-young-pianists-competition` | Jun 10–19, 2027 | Confirmed; this is not the main nonannual Van Cliburn piano competition |
| `/event/waco-independent-film-festival` | Jul 15–18, 2027 | Confirmed in-person edition; online encore follows |
| `/event/texas-international-fishing-tournament` | Jul 28–Aug 1, 2027 | Confirmed headline dates; do not reuse prior-year captains-meeting details |
| `/event/texas-food-truck-showdown` | Apr 11, 2026 | Last confirmed completed edition; 2027 date TBA |
| `/event/san-jacinto-day-celebration` | Apr 18, 2026 | Last confirmed completed reenactment; 2027 program TBA |

GrapeFest already had `/event/grapefest`: its official 2027 dates (September 16–19) were refreshed in `major-event-index.ts`, and the existing long-form guide was upgraded in `major-event-authority.server.ts`. The official page's Sunday timetable contains a date typo; the event's published four-day header governs the 2027 window until corrected.

## Statewide topic hubs

- `/events/dia-de-los-muertos` — curated, city-specific permanent guides for San Antonio, Houston and Austin. One city event is **not** assigned another city's parade time, prices or organizers.
- `/events/texas-independence` — Washington-on-the-Brazos and San Jacinto linked as two distinct Texas history celebrations. March 2 and April 21 are different commemorative dates. The hub remains noindex under the existing three-guide quality threshold until more independently verified entries are added.

Both use the existing `/events/$collection` collection route and evergreen indexability policy. No artificial multi-city Event JSON-LD objects are created.

## Existing event coverage: do not duplicate

The existing permanent-guide registry already includes GrapeFest, Tejano Conjunto Festival, Mardi Gras! Galveston, Texas Book Festival, San Antonio Book Festival, Fiesta San Antonio, Houston's Original Greek Festival, San Antonio Muertos Fest, Austin Viva la Vida, Houston MECA Día de Muertos, Heart O' Texas Fair & Rodeo, Terlingua chili championship, Fredericksburg Food & Wine Festival, Rockport Art Festival and the Washington-on-the-Brazos Texas Independence Day celebration.

The existing major-event inventory/other page families also include the Texas football championships, Ironman Texas, Bayou City Art Festival, and Chappell Hill Bluebonnet Festival. Do not create alternate aliases without a clear canonical/redirect strategy.

## Do not publish speculative or incorrect events

| Supplied seed | Editorial treatment |
|---|---|
| American Royal World Series of Barbecue | **Exclude from Texas**: 2026 competition took place in Kansas City, Kansas. https://americanroyal.com/events/world-series-of-barbecue/ |
| Waco Cultural Arts Fest | **Do not present as an upcoming annual festival**: organizer states 20th anniversary was its final edition. https://wacoartsfest.org/ |
| Houston Turkish Festival | **Hold dates**: official organizer lists its next date as TBA. https://www.houstonturkishfest.com/festival-program/ |
| Brazos Nights | Guide uses completed four-date 2026 series; organizer promises 2027 updates but no date or lineup. https://www.brazosnightswaco.com/brazos-nights |
| Texas Food Truck Showdown | Guide uses completed April 11, 2026, not a projected 2027 Saturday. https://wacochamber.com/the-texas-food-truck-showdown/ |
| San Jacinto reenactment | April 21 is the 1836 historical anniversary, not proof of a reenactment that specific day every year. https://www.sanjacinto-museum.org/Visit/Calendar/San_Jacinto_Day_Celebration/ |
| USA Track & Field Championships | Do not assign a Texas venue to a movable national championship without year-specific confirmation. |
| Houston Jazz Festival, Houston Tech Rodeo, Innovate Tech Conference, Big Tex BBQ Fest | Event identity/organizer and new edition not verified strongly enough for a current occurrence. |
| Landlock Fest and Legends of Texas Whiskey Festival | Recheck organizer recurrence; the seed has no reliable current-year event evidence. |
| Great American Shoot-Out and Texas State Chess Championships | Treat as separate sports-competition inventory, not verified festival guides with invented city/date. |
| Texas Greek Festival | City-specific organizers and locations matter; never merge unrelated Houston/Dallas celebrations into a false statewide occurrence. |

## Publication / affiliate standards

- Use official organizer occurrence dates, not the supplied text's "typically in" patterns. Show last confirmed editions as expired until replaced by official new announcements.
- Keep organizer ticket purchase links primary. The standard event-page template already contains sponsored Hotels.com lodging placement. Only add Viator experiences or Ticketmaster tickets when a current, exact matching experience or event and **the site's configured affiliate/deep-link** are verified; generic partner links are not meaningful recommendations.
- Use exact venue image rights and source provenance. Do not substitute irrelevant regional stock photos for an event's hero, and do not copy protected organizer imagery without permission.
- Follow `AGENTS.md`: canonical premerge contract, protected merge gate, normal GitHub-to-Cloudflare deploy, public smoke checks, no routine cache purge and no Cloudflare reconnection prompts.

## Organizer source set

- https://anujasa.com/diwalisa
- https://www.homesteadfair.com/
- https://www.wacowonderland.com/
- https://www.portaransas.org/whooping-crane-festival/the-2027-festival/
- https://oldsettlersmusicfest.org/
- https://diffdallas.org/
- https://www.worldfest.org/
- https://cliburn.org/competitions/2027-young-pianists
- https://www.wacoindie.com/
- https://www.tift.org/
- https://www.grapevinetexasusa.com/grapefest/general-information/

## Concurrent work preserved

The latest `main` already has Old Settler's Music Festival and Brazos Nights in tranche 53 and further music and whiskey guides in tranche 54. These are deliberately not duplicated here. Main's Mardi Gras tranche 52 and associated schema batch 27 remain untouched; this addition uses tranche 55 and schema batch 29.
