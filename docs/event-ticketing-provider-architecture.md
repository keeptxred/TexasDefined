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


## Follow-up ticket lifecycle, attribution and session identity (October 26, 2026)

Organizer source-schema `Offer` tickets are excluded before calendar normalization if explicitly sold out, not yet valid, expired, or carrying malformed sale dates. Date-only `validFrom`/`validThrough` apply at America/Chicago local day boundaries (last date inclusive), while timezone-qualified timestamps are compared at the exact instant. This is offer-source metadata, not proof of seats. The independent organizer-event URL remains available.

The shared live Ticketmaster/Impact resolver matches the full managed-snapshot attribution contract: exact publisher 7758914, merchant campaign 264167, merchant 4272, `u` equal to the same official event, plus one each of `subId1=texasdefined`, `partnerpropertyid=8837726`, `MediaPartnerPropertyId=8837726`; no extraneous query fields. A mismatch results in a nonsponsored official URL, not a broken sponsored promise.

Multi-performance major-event guides display exact source-published show date, local time, venue and show title in both row content and the accessible CTA label. Missing or malformed times are explicitly unconfirmed. No showtime conversion, seat availability, final cart cost or commission eligibility is inferred.

## Authorized affiliate deep-link integrity (October 25, 2026)

The shared resolver **must not treat an arbitrary HTTPS URL as an approved affiliate**. Only the existing Ticketmaster/Impact publisher 7758914 importer currently qualifies for sponsored CTAs. To qualify, a link must come from the `Ticketmaster` provider feed, use exact `ticketmaster.evyy.net` with publisher 7758914, approved Ticketmaster merchant 264167, and configured route suffix 4272, include exactly one `u` destination, and match that embedded event-specific Ticketmaster or TicketWeb URL against the paired official event URL. A different performance, forged merchant, unapproved provider or mismatched venue must **fall back to the official event URL**, with no sponsored claim.

Adding a new provider or affiliate network later requires its own reviewed verification adapter, contract and regression tests. Do not relax this rule for hypothetical future agreements. Ticketmaster's Discovery status `onsale` is not proof of specific remaining inventory, and no external checkout price is cached here.

The evidence/checkpoint ledger is `ops/editorial/event-ticketing-verification-ledger.json`. The independently sourced Alley Theatre final performance is December 27, 2026 at **1:30 p.m.**; exact official checkout: `https://cart.alleytheatre.org/10216/10226`. That page identifies the performance but does not establish available seat quantity. Preserve the distinct general production page for show background.

## Prevent directories masquerading as event admission (October 26, 2026)

The shared purchase CTA resolver rejects general school ticket catalogs, venue/browse indexes and provider category pages **even when the URL is HTTPS and belongs to a known ticket seller**. This protects future event records without inventing a game-specific ticket ID. Verified event-source links remain separately available as **Official event site** or organizer schedule links, from which visitors may choose the correct date and ticket type. Examples rejected as specific checkout CTAs include a GoFan `/app/school/` listing, Etix `/ticket/v/` venue schedules, generic Ticketmaster/TicketWeb directories, organizer-only Eventbrite URLs and broad SeatGeek/Vivid Seats resale-category pages. Exact Conroe Etix `/ticket/p/` event admission, Ticketmaster/TicketWeb event pages and independently verified official organizer purchase endpoints remain supported.

This is a **negative safety filter**, not positive proof of ticket inventory, seat quantity, public sale status, price, commission or purchase. Choctaw Stadium's five sourced 2026 football fixtures illustrate the distinction: the venue itself publishes different games and a shared GoFan school selector, so TexasDefined links the exact stadium game page instead of labeling the entire school catalog as a confirmed game checkout. See the five-item checkpoint in `ops/editorial/event-ticketing-verification-ledger.json` and `scripts/data/validate-official-venue-ticketing.mjs`.

## One canonical checkout identity per performance

When a source-reviewed editorial event is enriched by a matching approved provider feed, the merger identifies duplicates by the **exact underlying official admission URL**, not by the distinct Impact redirect wrapper. It drops fragment-only duplicates but preserves differing query parameters because they may identify different showtimes. An approved, event-exact Ticketmaster/Impact publisher 7758914 link wins over an unsigned duplicate; an unauthorized or wrong-performance affiliate redirect never gains sponsored treatment. If the provider marks the exact admission off-sale, that authoritative state overrides an older editorial `unknown` status for that duplicate destination. One ticket CTA remains visible per event and independently date/venue-qualified performances retain separate records. This neither establishes live seats nor promises an event-specific commission.

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

## Authority-guide cancellation and postponement overrides

Major-event authority guides render a separate optional Ticketmaster/Impact ticket section. That section must not bypass a current organizer-sourced lifecycle change in the canonical major-event schema. `buildMajorEventTicketingMarkupServer` now checks `getMajorEventSchemaOccurrenceEnrichmentServer(slug)?.lifecycle.status` before considering either its single-performance or multi-performance ticket CTA. A `cancelled`, `postponed` or `rescheduled` authority guide retains normal visitor/organizer source content but does **not** promote stale checkout, admission or affiliate tracking. Scheduled guides and guides with no verified lifecycle reversal retain the usual exact-event provider matching. This guard does not determine provider seats or prices.

`scripts/data/validate-major-event-ticket-lifecycle.mjs` tests the actual guide server module against all lifecycle statuses, guards both one- and multiple-session sections, and is required in the canonical premerge and dedicated event-ticketing workflow.

## Event-level cancellation and postponement fail closed

The canonical event record's `status` is independently authoritative. When a source-qualified event is `cancelled`, `postponed` or `rescheduled`, the shared carousel and statewide calendar retain the event (so readers can see the organizer's change) but **suppress the ticket CTA regardless of stale provider `Offer` metadata**. The calendar visibly identifies the status and directs readers to the original organizer link. Only `scheduled` records can resolve the existing safe official/affiliate purchase CTA. This protects future editorial, venue, festival and holiday events, and does not infer refunds, seats, alternative dates, prices or commission eligibility.

`scripts/data/validate-event-ticket-positive-path.mjs` asserts all three changed lifecycle states suppress both calendar and carousel CTAs, while a legitimate scheduled Wurstfest ticket remains actionable. The canonical architecture validator separately requires the lifecycle gate and visible status disclosure.

## Major-event guide performance date boundaries

Major-event guide ticket sections use the same injected clock as the Ticketmaster provider snapshot. Sessions are filtered using **America/Chicago** day boundaries, not UTC day rollover, and the related `Compare ticketed sessions` date window is drawn only from the displayed upcoming sessions. A Ticketmaster event identity or on-sale status still does **not** prove seats or final checkout price. `scripts/data/validate-major-event-ticket-lifecycle.mjs` asserts Texas midnight and daylight-saving examples, preserved organizer cancellation suppression, and this consistent date-range behavior.

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

## Source-qualified editorial checkout HTTP probes

The existing scheduled `Sync Texas Events` job also checks up to **25 future, scheduled, non-affiliate editorial ticket URLs** per run from the canonical merged event registry (official venue events, seasonal events, organizer guides and other supported providers). These are separate from Ticketmaster's Discovery snapshot. It selects pending records in stable date/ID order, suppresses repetitions for 14 days unless the exact event URL or date changes, and writes evidence to the **same** `statewide.ticketLinkProbes` map with `editorial:`-prefixed IDs. Results and counts are stored under `ticketLinkProbeLatestRun.editorialOfficial` so the existing generated-refresh protected ledger allowlist remains strict. **No additional scheduled workflow is introduced.**

Only explicit public ticket-provider hosts are fetched (Etix, TicketSignup, Eventbrite, AXS, Ticketmaster, TicketWeb, SeatGeek, Vivid Seats, GoFan, Live Nation, Tixr, TicketSpice, TicketLeap, ShowClix, Tix and Universe, plus an approved Wurstfest Ronin POS host). Unlisted organizer/custom hosts are **not fetched** and are recorded as inconclusive—not declared broken. HEAD is used first, GET only on HTTP 405, redirects are not followed, concurrency is three with six-second timeouts. CAPTCHA, 401, 403, 429, 5xx, timeouts and unknown redirects are inconclusive; 404/410 and changed event destinations require manual review and never trigger automatic replacement. A 2xx response is HTTP reachability, **not** proof of the correct checkout, seat availability, price or commission.

## Query-safe external ticket redirects

Official editorial ticket links can identify a specific date, showtime, section or performance in their query parameters. The existing bounded public HTTP checker now treats a redirect as the **same destination** only if the trusted provider host, URL path **and entire query string** match the verified source URL. A changed query parameter returns `REDIRECT_DIFFERENT_DESTINATION_REVIEW` even when the pathname is unchanged; fragment-only links do not change performance identity. An HTTP 2xx/3xx result is **not** inventory, checkout price, proof of commission, or completed booking. This guard does not bypass 403, CAPTCHA, 429 or any restricted partner API; the organizer URL remains independently available.

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

## October 26, 2026: Fort Worth arena naming-rights change

Trail Drive Management Corp. and Ariat officially announced that **Dickies Arena is renamed Ariat Arena effective October 26, 2026**. Primary-source release: `https://www.endurancesportswire.com/aria-international-to-become-the-official-naming-rights-partner-of-fort-worths-beloves-arena/` (body names Ariat Arena; headline contains a typographical error). The operator's official venue domain is `https://www.ariatarena.com`. Old Live Nation/Ticketmaster Discovery event names and links may still say Dickies Arena during migration; do **not** invent revised event purchase URLs while those provider entries remain valid.

The shared venue matcher accepts **only the reviewed exact former/new Fort Worth facility names**, optionally with a Fort Worth suffix, while refusing parking, VIP suites, alternate rooms, mismatched venue IDs and unrelated arenas. Curated 2026 for KING + COUNTRY (Dec. 5) and Pentatonix (Dec. 16) list Ariat Arena, and source-derived Ticketmaster rows show Ariat Arena while maintaining the pre-existing canonical `/sports-venue/dickies-arena` entity and partner links. This is the **same physical building**, not another venue or another performance. The December Christmas city/date/live acceptance remains mandatory after deployment. New venue branding is not evidence of seats, a new commercial agreement, or a new provider affiliate entitlement.

## Whole-catalog structural integrity, distinct from HTTP probes

The existing daily `Sync Texas Events` job evaluates **every row of the current Ticketmaster Discovery snapshot** before starting its separate 40-record rotating public-URL probes. The full sweep checks unique provider event IDs, dates and cities, valid official Ticketmaster/TicketWeb admission URLs, and the approved Impact publisher 7758914 / merchant 264167 / route suffix 4272 wrapper's **exact** underlying admission destination. An unsafe link, duplicate provider ID, wrong underlying show or malformed event identity fails closed before writing a new checkpoint, leaving the last approved generated catalog intact. It also counts excluded add-on product titles, missing venue names, cancelled/off-sale records and unspecified sale status separately as non-commercial inventory signals; these are not automatically recategorized as verified seats.

Full-snapshot counts are stored in `ops/editorial/event-ticketing-verification-ledger.json` under `statewide.ticketLinkProbeLatestRun.catalogIntegrity`, inside the same protected editor-immutable ledger namespace as existing probes. `httpLinksProbed: false`, `seatsVerified: false` and `commissionsVerified: false` explicitly distinguish the thousands of **structurally checked** source rows from the bounded outbound URL HTTP checks and from restricted provider inventory. The canonical premerge Node test suite covers invalid provider URLs, duplicate IDs, forged/wrong-show Impact links and status uncertainty. No added schedule, dependency, API entitlement or relaxed deployment budget is needed.

## Christmas statewide occurrence deduplication

The statewide calendar reconciles curated Christmas tickets against independent event records only when city, date, approved physical venue identity and compatible titles match. When **both** records specify local showtimes, they must be the same performance. An existing same-title 2 PM matinee never consumes a 7 PM ticket or vice versa, and a separate VIP room, garage or parking listing is never equivalent to the main arena. Untimed organizer listings are still projections, **not** proof that an individual session has available inventory. The one Dallas Grand Ol' Christmas 5 PM doors/6 PM curtain exception remains restricted to the downstream exact Ticketmaster-provider merge, where the unique same-venue performance count is verified; it does not broaden general deduplication. Existing authorized Impact links and official ticket fallbacks remain unchanged.

## No checkout

TexasDefined does not collect ticket payment, seat selection, billing data, order data, or ticket inventory. `EventTicketCta` always opens the external provider in a new browsing context. The provider owns checkout, fulfillment, refunds, fees, inventory, availability, and customer-service obligations.

## Known resale and mixed-source ticket marketplaces (October 26, 2026)

Ticket provider classification is not proof of primary admission or commission. A source-qualified direct **Vivid Seats** ticket-marketplace URL is labeled **Resale Tickets**, with a clear third-party resale disclaimer. **SeatGeek** hosts both primary and resale tickets and is therefore labeled neutrally **View Tickets**, with instructions to confirm seller, ticket type and total fees. Neither outbound URL gains affiliate tracking without a separately approved provider adapter. Verified organizer and official primary-ticket URLs retain their existing **Official Tickets** labels. No URL click proves seat availability, final price, a completed sale or an earned commission.
