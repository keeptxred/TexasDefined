# Event ticketing provider architecture

TexasDefined treats ticketing as an outbound-link concern, not a checkout platform. Event records may carry verified provider metadata, but presentation components render at most one resolved ticket CTA and hand the visitor to the external ticket provider for purchase.

## Provider-neutral contract

The canonical contract lives in `src/data/events/texas-event-record.ts` and supports these provider identifiers:

- `official`
- `ticketmaster`
- `seatgeek`
- `vivid-seats`
- `ticketweb`
- `live-nation`
- `etix`
- `axs`
- `eventbrite`
- `other`

Each `TexasEventTicketLink` carries a provider, optional official ticket URL, optional affiliate/deep-link URL, sale status, source metadata, last-verified timestamp, optional priority, and independent official/affiliate expiry timestamps.

No provider credentials, affiliate secrets, partner IDs, signing keys, or checkout state belong in these records. Future provider adapters must read sensitive configuration only from server-side environment/secrets manager configuration and emit already-resolved outbound URLs into the canonical event record.

Ticketmaster, SeatGeek, Vivid Seats, and any future provider remain optional adapters. The presence of a provider type does not imply an active commercial agreement or granted API capability.

## Active outbound integrations vs future inventory integrations (October 2026)

TexasDefined has one live commercial metadata feed: **Ticketmaster Discovery API**, refreshed by the protected `Sync Texas Events` workflow with the existing `TICKETMASTER_API_KEY` secret. The existing Impact deep-link template belongs to the Ticketmaster program and is constructed only inside the vetted importer. A successfully generated tracking URL is not a guarantee of commission, ticket inventory or partner privileges.

The common outbound resolver also supports **TicketWeb, Live Nation, Etix, AXS, Eventbrite, SeatGeek and Vivid Seats** event-ticket destinations supplied by verified organizers. `src/data/events/ticket-provider.ts` classifies exact or subdomain-matching HTTPS provider hosts (never deceptive suffixes or credentialed URLs). These are *external checkout links*, **not** fabricated affiliate links or newly installed provider API accounts. Other source-qualified organizer HTTPS URLs remain `official`. There is no fake price, held seat, embedded checkout, or promise of commission.

**The public Ticketmaster Discovery API does not grant seat-level inventory, reserves or payments.** Ticketmaster restricts the Partner API / Availability / Inventory Status and Top Picks features to separately approved commercial/distribution partners. TexasDefined must not call these restricted APIs using the Discovery API key, scrape interactive seat maps, bypass CAPTCHA, or claim exact ticket quantities. Official Ticketmaster `onsale` indicates a sale window, not a specific available seat. SeatGeek, Vivid Seats, AXS, Etix and other providers likewise require their own explicit commercial authorization before any inventory synchronization or affiliate payouts can be enabled.

**Activation for a new provider**: secure actual partnership and approved API scope; configure its secret only in the trusted server/GitHub Actions environment; implement a bounded provider-specific importer with date+venue+event-ID matching, freshness expiry, status validation, and fail-closed behavior; validate the outbound provider deep link and program-approved commission tracking; add real positive and negative tests; then ship through a protected PR and production smoke. Never manufacture an API key, assume commercial approval, treat a ticketing homepage as proof of availability, or promote a reseller listing as primary admission.


## Authorized affiliate deep-link integrity (October 25, 2026)

The shared resolver **must not treat an arbitrary HTTPS URL as an approved affiliate**. Only the existing Ticketmaster/Impact publisher 7758914 importer currently qualifies for sponsored CTAs. To qualify, a link must come from the `Ticketmaster` provider feed, use exact `ticketmaster.evyy.net` with publisher 7758914, approved Ticketmaster merchant 264167, and configured route suffix 4272, include exactly one `u` destination, and match that embedded event-specific Ticketmaster or TicketWeb URL against the paired official event URL. A different performance, forged merchant, unapproved provider or mismatched venue must **fall back to the official event URL**, with no sponsored claim.

Adding a new provider or affiliate network later requires its own reviewed verification adapter, contract and regression tests. Do not relax this rule for hypothetical future agreements. Ticketmaster's Discovery status `onsale` is not proof of specific remaining inventory, and no external checkout price is cached here.

The evidence/checkpoint ledger is `ops/editorial/event-ticketing-verification-ledger.json`. The independently sourced Alley Theatre final performance is December 27, 2026 at **1:30 p.m.**; exact official checkout: `https://cart.alleytheatre.org/10216/10226`. That page identifies the performance but does not establish available seat quantity. Preserve the distinct general production page for show background.

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

The approved Ticketmaster/Impact adapter is now implemented in `ticketmaster-events.server.ts`, with a secret-backed daily Discovery API refresh and generated outbound tracking links. See [Ticketmaster integration](ticketmaster-affiliate-integration.md) for activation, freshness limits, and verification. The general requirements below continue to govern other providers.

A future provider adapter should only populate `affiliateUrl` after the applicable affiliate/partner capability has actually been approved and the resulting deep link has been verified. Ticketmaster/Impact approval is not assumed by this architecture.

Recommended activation sequence:

1. Store credentials or partner configuration in the deployment environment/secrets manager, never source code.
2. Resolve or generate the provider deep link server-side.
3. Preserve the official ticket URL as fallback when available.
4. Set the provider identifier, source, sale status, last verified timestamp, priority, and expiry values.
5. Run `node scripts/data/validate-event-ticketing-architecture.mjs`, `node scripts/data/validate-event-ticket-positive-path.mjs`, the normal validation suite, production build, and bundle budget before merge.
6. Verify the rendered CTA text changes from `Official Tickets →` to `Find Tickets →` only when the affiliate URL is valid.
7. After deployment, require `node scripts/ci/verify-event-ticketing-production.mjs` to pass against the live site.

## Event-specific affiliate click attribution

The shared outbound `EventTicketCta` now carries each canonical event ID from both calendar results and carousel records. Sponsored checkout clicks emit `affiliate_event_id` alongside the existing partner, placement, module and page path in the first-party `affiliate_click` dataLayer event. An official/non-affiliate ticket URL does not gain partner metadata or a commercial event-click event. Do not treat this first-party event as evidence that a commission was earned or a checkout was completed.

## Daily public purchase-link health checks

The existing `Sync Texas Events` scheduled workflow now probes **40 deterministic, rotating, future Ticketmaster/TicketWeb primary-admission URL records** after each Discovery refresh. It uses public `HEAD`, with one ordinary `GET` only if the host returns HTTP 405; redirect following is disabled. Requests have a seven-second timeout and four-way concurrency. An official event URL is restricted to approved ticketing hosts and an event path; localhost, IP addresses, userinfo, non-HTTPS and unrelated redirect targets cannot be trusted.

Results and the next cursor are persisted in the **single authoritative** `ops/editorial/event-ticketing-verification-ledger.json` under `statewide.ticketLinkProbes` and `statewide.ticketLinkProbeCursor`. A successful HTTP response is recorded as `REACHABLE_NO_INVENTORY_CLAIM` and status `IN_PROGRESS`, **never** as event `VERIFIED`. 401, 403, CAPTCHA, 429, 5xx and timeouts remain inconclusive; HTTP 404/410 and mismatched redirects create explicit review warnings. Probes never scrape restricted partner APIs, infer commission, inventory or sale price, or automatically replace a ticket URL based only on a bot-blocked response. The existing protected event-refresh PR/merge gate is retained; no separate cron job exists.

## Major-event guide attribution and status wording

Major-event authority pages use the same reviewed provider-neutral outbound resolver and must expose `data-affiliate-event-id` only for authorized affiliate CTAs. The event ID comes from the **exact** Ticketmaster occurrence, including its showtime/venue-sensitive provider identity; the first-party `partner_referral_clicked` record preserves the existing partner and placement and adds the event ID as `stepId`. Official fallback buttons have no affiliate metadata. This is a referral metric, **not** a verified conversion or commission.

The heading is **Check ticket options** rather than **Current ticket availability**. A provider record marked on-sale, a valid destination URL, and a click are not evidence of seats in inventory. The provider determines current prices, final fees and purchase eligibility. Each distinct session remains independently identified and is never combined with another venue, matinee or add-on.

## Rolling catalog drift protection

The daily scan uses the event-ID/date/official-URL evidence already saved in the ledger to prioritize the **soonest future records that have not been probed at their current identity**. It does not advance blindly by a shifting numeric index when yesterday's concerts expire or today's provider snapshot inserts events. Same-date, same-URL HTTP probes are not needlessly repeated within 14 days; new event URLs or corrected performance dates become eligible immediately. Older inconclusive probes may be retried after 14 days but remain `IN_PROGRESS`, never an inventory-certified `VERIFIED`. The checkpoint continues recording its cursor and also records `pendingToCheck` for operational visibility.

## Provider-specific HTTP failure reporting

The daily rotating Ticketmaster/TicketWeb public-link probe now writes `providerOutcomes` to `statewide.ticketLinkProbeLatestRun` in the authoritative ledger and prints the same breakdown in workflow logs. A Ticketmaster HTTP 403 is `ACCESS_RESTRICTED_INCONCLUSIVE`; a TicketWeb HTTP 530 is `PROVIDER_SERVER_ERROR_INCONCLUSIVE`. Neither is proof of a broken admission link, sold-out seats, or stale event identity. If every probe is inconclusive, the workflow emits a **notice**, not a false-positive validation failure or an automatic deletion. Genuine 404/410 or unrelated redirects still require explicit review before any purchase URL changes. New tests cover the per-provider classifications and missing-result behavior.

## No checkout

TexasDefined does not collect ticket payment, seat selection, billing data, order data, or ticket inventory. `EventTicketCta` always opens the external provider in a new browsing context. The provider owns checkout, fulfillment, refunds, fees, inventory, availability, and customer-service obligations.
