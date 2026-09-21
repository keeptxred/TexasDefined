# Event ticketing provider architecture

TexasDefined treats ticketing as an outbound-link concern, not a checkout platform. Event records may carry verified provider metadata, but presentation components render at most one resolved ticket CTA and hand the visitor to the external ticket provider for purchase.

## Provider-neutral contract

The canonical contract lives in `src/data/events/texas-event-record.ts` and supports these provider identifiers:

- `official`
- `ticketmaster`
- `seatgeek`
- `vivid-seats`
- `other`

Each `TexasEventTicketLink` carries a provider, optional official ticket URL, optional affiliate/deep-link URL, sale status, source metadata, last-verified timestamp, optional priority, and independent official/affiliate expiry timestamps.

No provider credentials, affiliate secrets, partner IDs, signing keys, or checkout state belong in these records. Future provider adapters must read sensitive configuration only from server-side environment/secrets manager configuration and emit already-resolved outbound URLs into the canonical event record.

Ticketmaster, SeatGeek, Vivid Seats, and any future provider remain optional adapters. The presence of a provider type does not imply an active commercial agreement or granted API capability.

## CTA resolution

`src/data/events/ticketing.ts` is the single decision layer. Presentation code must not choose a provider itself.

Resolution rules:

1. Ignore explicitly non-actionable sale states: `not-on-sale-yet`, `sold-out`, `off-sale`, and `cancelled`.
2. Accept only valid HTTPS outbound URLs.
3. Ignore URLs whose matching expiry timestamp has passed or is invalid.
4. Sort candidate link records by optional numeric `priority`, preserving source order as the stable fallback.
5. If a current affiliate/deep link exists, emit one `Find Tickets →` CTA with `rel="sponsored nofollow noopener noreferrer"` and visible affiliate/checkout disclosure.
6. Otherwise, if a current official ticket URL exists, emit one `Official Tickets →` CTA with `rel="noopener noreferrer"`.
7. Otherwise emit no ticket CTA. Do not render disabled, placeholder, or fake commercial buttons.

This guarantees no duplicate competing ticket buttons by default even if several providers are represented in the underlying event record.

## Existing official ticket data

`src/data/events/texas-event-records.server.ts` currently maps source-qualified schema `Offer` URLs into provider `official` ticket links. Identical official ticket links are deduplicated by destination URL before CTA resolution, while the underlying `Offer` rows remain intact so distinct prices and admission tiers are not discarded. It does **not** convert the generic official event homepage into a ticket CTA, and it does **not** fabricate an affiliate URL.

When a future affiliate integration becomes valid, enrich the canonical `ticketing.links` record server-side. Do not modify the carousel or calendar to special-case the provider.

## Calendar workstream

The global calendar already consumes the architecture through `buildGlobalEventCalendarServer` and `buildTexasEventCarouselItemsServer` in `src/data/events/texas-event-calendar.server.ts`.

Exact integration rules:

1. Load canonical `TexasEventRecord` rows from `loadUpcomingTexasEventRecordsServer` or the existing calendar data boundary.
2. Keep `ticketing` normalization on the server.
3. Use `buildTexasEventCarouselItemsServer(records)` for shared carousel payloads; it adds a resolved `ticketCta`.
4. Use `buildGlobalEventCalendarServer(records, search)` for calendar results; each displayed result also receives a resolved `ticketCta`.
5. Render `EventTicketCta` with the resolved `ticketCta` value.
6. Do not read raw ticketing.links in presentation components and do not add provider-specific CTA branches.
7. Keep the generic `Official event site ↗` link separate from ticket purchasing because an event homepage is not necessarily a ticket endpoint.

## Venue-page workstream

Venue pages already flow through `getSportsVenueUpcomingEvents` in `src/data/sports-venue-events.functions.ts`.

Exact integration rules:

1. Keep `getSportsVenueUpcomingEvents` as the server boundary for venue-scoped events.
2. It loads canonical records and calls `buildTexasEventCarouselItemsServer`.
3. `TexasEventCarousel` renders `EventTicketCta` from the returned `ticketCta` automatically.
4. Do not add Ticketmaster-, SeatGeek-, Vivid Seats-, or provider-specific buttons to venue components.
5. Do not duplicate ticket priority/fallback logic inside `SportsVenueGuidePage` or its pilot content.
6. If venue-specific ticket metadata becomes available, attach it to the canonical event record before the shared builder runs.

## Validation and production verification

Three layers guard the ticketing architecture:

1. `scripts/data/validate-event-ticketing-architecture.mjs` verifies the provider-neutral contract, resolver behavior, external-link safety, disclosure semantics, presentation boundaries, and official-link deduplication policy.
2. `scripts/data/validate-event-ticket-positive-path.mjs` loads the real canonical event normalizer and shared carousel projection, using GrapeFest's reviewed official ticket source to prove that multiple price offers deduplicate to one outbound link and resolve as `Official Tickets →` without affiliate semantics.
3. `scripts/ci/verify-event-ticketing-production.mjs` uses a cache-busted valid `/events` request after production deployment and verifies that the live page contains the source-qualified GrapeFest event, the `Official Tickets` CTA, and its reviewed official purchase URL without marking that URL as sponsored.

`.github/workflows/validate-event-ticketing.yml` runs the architecture and canonical positive-path checks on relevant pull requests. `.github/workflows/verify-event-ticketing-production.yml` runs the live positive-path smoke check after a successful `Deploy TexasDefined production` workflow.

## Affiliate activation

Ticketmaster/Impact approval for TexasDefined was confirmed on 2026-09-21. The approved program is now supported by `src/lib/ticketmaster-affiliate.server.ts`, but the adapter remains fail-closed until the exact approved Impact tracking template is configured in the deployment environment.

Set `TICKETMASTER_IMPACT_TRACKING_TEMPLATE` to the approved Ticketmaster Impact deep-link template. The template must be HTTPS and must contain `{url}`; it may also contain `{campaign}`. Example shape only:

`https://<approved-impact-tracking-host>/...?...&u={url}&subId1={campaign}`

Do not copy placeholder partner IDs or campaign IDs from documentation into production. The exact tracking path must come from TexasDefined's approved Ticketmaster/Impact account.

When configured, `src/data/events/texas-event-records.server.ts` automatically recognizes verified `ticketmaster.com` offer URLs, preserves the official Ticketmaster destination as fallback, and adds the approved Impact affiliate URL. Shared calendar, event, and sports-venue surfaces then resolve the existing single `Find Tickets →` CTA through the provider-neutral ticketing layer. Non-Ticketmaster destinations are never wrapped, and malformed or missing Impact configuration falls back to the verified official ticket URL.

Recommended activation sequence:

1. Store partner tracking configuration in the deployment environment, never in content records or presentation components.
2. Resolve or generate the provider deep link server-side from a verified Ticketmaster destination only.
3. Preserve the official ticket URL as fallback when available.
4. Set the provider identifier, source, sale status, last verified timestamp, priority, and expiry values.
5. Run `node scripts/data/validate-event-ticketing-architecture.mjs`, `node scripts/data/validate-event-ticket-positive-path.mjs`, the normal validation suite, production build, and bundle budget before merge.
6. Verify the rendered CTA text changes from `Official Tickets →` to `Find Tickets →` only when the affiliate URL is valid, and that the rendered link carries `rel="sponsored nofollow noopener noreferrer"` plus first-party `ticketmaster` attribution metadata.
7. After deployment, require `node scripts/ci/verify-event-ticketing-production.mjs` to pass against the live site. Add a Ticketmaster-specific live conversion smoke only after at least one reviewed canonical event carries a verified Ticketmaster destination; do not fabricate inventory just to exercise the affiliate path.

## No checkout

TexasDefined does not collect ticket payment, seat selection, billing data, order data, or ticket inventory. `EventTicketCta` always opens the external provider in a new browsing context. The provider owns checkout, fulfillment, refunds, fees, inventory, availability, and customer-service obligations.
