# Texas Defined air-show authority launch — October 17, 2026

## Scope and publishing standards

- Permanent editorial hub: `/events/air-shows`. It has confirmed 2026/2027 show cards, planning guidance, a careful historical-discovery backlog, FAQ and contextual lodging affiliate CTA.
- Event authority pages (new): `/event/amigo-airsho`, `/event/texas-capital-air-show`, `/event/bluebonnet-airshow`, and `/event/wings-over-cowtown-airshow`.
- Event authority page (updated): `/event/wings-over-houston-airshow`.
- Existing core event registry and existing major-event server render the pages. They inherit the site's approved Hotels.com/CJ stay fallback and contextual Expedia/Stay Nearby system.
- Current official organizer ticket pages are shown as NON-affiliate links when no matching current approved Ticketmaster/Impact listing is available. The existing Ticketmaster importer remains the only authority for Ticketmaster affiliate deep links.
- Confirmed source dates are not projected forward automatically. The historical watchlist is not a 2027 schedule.

## First-party source evidence

- El Paso Amigo Airsho: https://www.amigoairsho.com/home ; https://www.amigoairsho.com/faqs ; https://www.amigoairsho.com/tickets (2026-10-24/25).
- Wings Over Houston: https://wingsoverhouston.com/ ; https://wingsoverhouston.com/travel/ (2026-10-31/11-01; free ticket-included shuttles and last inbound at 2:30 p.m.).
- Texas Capital Air Show: https://texascapitalairshow.com/guest-information/schedule/ ; https://texascapitalairshow.com/tickets/ ; https://texascapitalairshow.com/guest-information/accessibility/ (2026-11-07/08; airport parking separately ticketed).
- CAF Highland Lakes Bluebonnet: https://www.bluebonnetairshow.com/ (2027-03-20; no general public parking at the airport).
- Wings Over Cowtown: https://www.wingsovercowtown.com/ ; https://www.blueangels.navsea.cloud.navy.mil/show/ (2027-04-24/25 on official U.S. Navy team schedule; host ticket/parking details not yet published).

## Monetization guardrails

- Ticketmaster app has approved affiliate publisher 7758914 and merchant 4272; link must originate from an exact supported Ticketmaster Discovery feed match, not a hand-built generic ticket link. See `docs/ticketmaster-affiliate-integration.md`.
- Hotels.com/CJ publisher 101876465 via the existing affiliate route; visible sponsored disclosure is mandatory.
- Event pages automatically receive the platform's existing stays search/affiliate offers. Avoid duplicate global hotel widgets.
- No unverified Viator activity, parking marketplace, merchandise or car-rental commissions are claimed. Partners must be added only after a verified relevant offer/contract is confirmed.

## Remaining work, with launch gates

- Real imagery: New event pages may remain `noindex,follow` until an approved compliant, rights-proven event hero is registered. Do not bypass image governance or use an unrelated aircraft photograph.
- Historical shows: verify the next occurrence from the actual host before adding permanent authority pages. Do not generate cloned guides solely to reach a page count.
- Recurrence maintenance: update new year only when organizer or official performer schedule confirms dates, and recheck sale state, parking, ID rules, accessibility, lineup, cancellation, hotel relevance and affiliate target.
- After merge/deploy: check hub HTTP 200, all five guide routes, canonical/structured data, sponsor disclosures, no fabricated Ticketmaster CTA, and exact appearance of published organizer rules. Check sitemap inclusion and image eligibility before announcing full SEO completion.
