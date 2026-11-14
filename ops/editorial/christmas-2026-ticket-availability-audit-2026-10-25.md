# TexasDefined — 2026 Christmas ticket audit

**Observed October 25, 2026.** Independent public organizer/venue/provider page audit. These observations document event purchase paths, not guaranteed seats or checkout prices. No tickets were held or purchased. JS/cookie/bot-gated inventory is *not verified*, even when a listing says Buy Tickets.

| Event | Featured date 2026 | Independently checked source | Verified public signal | Seat-level inventory |
|---|---|---|---|---|
| Grinch musical Dallas | Nov 27 | https://broadwaydallas.org/shows/dr-seuss-how-the-grinch-stole-christmas-the-musical/ | Organizer lists three Nov 27 showtimes and Buy Tickets | Unverified |
| for KING + COUNTRY Fort Worth | Dec 5 | https://www.livenation.com/event/vvG1YZ_Cx4afyp/for-king-country-a-drummer-boy-christmas | Live Nation exact 7pm show, Buy Tickets | Unverified |
| Bruton Christmas/Kwanzaa Dallas | Dec 11 | https://www.ticketmaster.com/promising-young-artist-series-33rd-annual-dallas-texas-12-11-2026/event/0C00653DBA7FA947 | Ticketmaster exact event 7:30pm; venue listings Find Tickets | JS-gated |
| A Christmas Story Conroe | Dec 13 | https://www.etix.com/ticket/v/32639/crighton-theatre | Official Etix venue; Downtown Conroe separately links exact Dec 13 2pm show | Etix JS/bot challenge; reseller counts not official |
| Pentatonix Fort Worth | Dec 16 | https://dickiesarena.com/event/2026-12-16-pentatonix/ | Arena says On Sale Now and Ticketmaster purchase link | Individual seat inventory unverified; group checkout presents sections |
| A Jazzy Christmas Concert Dallas | Dec 17 | https://www.ticketmaster.com/a-jazzy-christmas-concert-dallas-texas-12-17-2026/event/0C00653DB901A616 | Ticketmaster confirms 7pm; venue Find Tickets | JS-gated |
| A Very Merry Symphony Cedar Park | Dec 20 | https://www.hebcenter.com/events/detail/a-very-merry-symphony | Venue On Sale Now and Buy Tickets 7pm | Unverified |
| A Celtic Christmas McAllen | Dec 20 | https://experiencemcallen.com/event/a-celtic-christmas-mcallen-2026/ | City/venue event 4pm, official Ticketmaster TICKETS link | Unverified |
| Grand Ol Christmas Houston | Dec 22 | https://www.livenation.com/event/G5dIZ_GluCTsV/grand-ol-christmas | Live Nation exact 7pm Buy Tickets; Ticketmaster Reserve Tickets interface | Selection session-dependent |
| Grand Ol Christmas Dallas | Dec 23 | https://www.ticketmaster.com/grand-ol-christmas-dallas-texas-12-23-2026/event/0C0064CA0668F4BE | Ticketmaster artist schedule confirms Find Tickets, doors 5pm/show 6pm | Unverified |
| Cirque Musica Cedar Park | Dec 24 | https://www.hebcenter.com/events/detail/cirque-musica-holiday-wonderland-2026 | Venue On Sale Now and Buy Tickets, 2pm | Unverified |
| A Christmas Carol Houston Alley Theatre | Dec 27 | https://www.alleytheatre.org/plays/christmas-carol-2026/ | Houston Alley Theatre Nov 15–Dec 27 with Get Tickets cart (not Buffalo Alleyway) | Dec 27 seat selection unverified |

## Rules
- All twelve have a publicly displayed organizer or ticket provider path. On-sale status is attributed to organizers only when expressly stated.
- Do not claim tickets are available or prices/quantities as facts unless directly checked in the current event-specific seat inventory. Ticketmaster and Etix may gate inventory behind a JavaScript session.
- Only primary event admission links count. Parking, VIP upgrades without admission, and fast-lane passes are not concert tickets.
- Keep the curated saleStatus value as unknown unless current provider data explicitly indicates a status; third-party resale listings are not authoritative primary inventory.
- The follow-up production verifier inspects the canonical date- and city-filtered /events SSR cards individually, checks for duplicates and safe ticket destinations, and expires event-specific assertions after the featured date.
- This document is a timestamped evidence ledger, not a promise of future availability.