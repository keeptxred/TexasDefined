# TexasDefined travel affiliate economics

Portfolio-wide non-travel and cross-category decisions are maintained in `docs/affiliate-portfolio-economics.md`.

Reviewed 2026-09-25 from the active CJ advertiser terms in the TexasDefined publisher account. Active account terms control routing decisions when they differ from older welcome emails or public program pages.

## Current verified program economics

| Program | Lodging / stays | Vacation rentals | Car rentals | Activities / attractions | Packages | Attribution / notes |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Hotels.com NORAM | 4% | 2% | 1.5% | — | — | 7-day referral period; invalid coupons 0%; exact-property links remain valuable for relevance. |
| Orbitz | 4% | 2% | 1.5% | 4% | 2% | 7-day referral period; air/cruise 0%. Current lodging rate is at parity with Travelocity and Hotels.com. |
| Travelocity NORAM | 4% | 2% | 1.5% | 4% | 2% | 7-day referral period; air/cruise 0%. Current lodging rate is at parity with Orbitz and Hotels.com. |
| CheapTickets | 4% | 2% | 1.5% | 4% | 2% | 7-day referral period; air/cruise 0%. No current routing advantage over the existing Expedia-family choices. |
| Vrbo NORAM | — | 2% | — | — | — | 7-day referral period. Use only for genuine vacation-rental intent. |
| Motel 6 / OYO USA | 3% web / 3% app | — | — | — | — | 45-day referral period. Lower payout than Hotels.com conventional lodging; exact-brand relevance or conversion must justify use. |
| RVshare | 4% successful reservation | — | — | — | — | 30-day referral period. Owner-listing action shows $5 / 45 days, but the same current terms also list “list your RV” transactions as non-commissionable; do not route owner acquisition until clarified. |
| Booking.com APAC relationship | 4% | — | 6% Pay Now / 3.8% Pay Local | 4% | — | Flights $2/order; airport taxis 4%. Commission requires an in-session booking and the current terms state there is no cookie tracking. Use only on eligible markets/products. |
| CityPASS | — | — | — | 6% default | — | 90-day referral period. Destination/SKU exceptions include Denver/Philadelphia 5%, San Diego 4%, LA commissionable SKUs 4%, Orlando $1/item, Southern California $5/item and excluded SKUs 0%. |
| Expedia Travel Creator Program | Variable | Variable | Variable | Variable | Variable | Direct Expedia program economics vary by product and market; keep separate from CJ schedules and verify its direct account when used. |

## Routing policy

Do not change routing on headline payout alone. Intent match, exact inventory, attribution window, booking completion, reversal rate and realized commission all matter.

- Keep verified exact-property Hotels.com links primary where TexasDefined has a reviewed property-level destination.
- Keep Orbitz as the comparison provider for hotel-first event and sports-venue intent while the clean routing cohort accumulates measurable traffic.
- Keep Travelocity as the comparison provider for broader destination and leisure intent while the clean routing cohort accumulates measurable traffic.
- Treat Orbitz and Travelocity lodging economics as **current-rate parity**: both are 4% conventional lodging with a 7-day referral period in the active CJ account. The 100-impression comparison should therefore focus on CTR, downstream completed bookings and realized commission rather than an assumed payout difference.
- Keep Vrbo limited to contexts where a vacation rental is genuinely relevant.
- Show RVshare only on high-intent camping, RV-park, state-park, outdoors and road-trip surfaces. On those routes, make RVshare the primary rental CTA and suppress the lower-paying 2% Vrbo traveler CTA. Do not add RVshare to generic city, county, event or destination pages merely because they are travel content.
- Do not add CheapTickets as another generic comparison CTA while its current economics duplicate Orbitz/Travelocity without a demonstrated conversion or inventory advantage.
- Do not activate Motel 6 merely because it is a direct brand. The current 3% payout is below Hotels.com's 4% conventional-lodging rate; use Motel 6 only for exact-brand relevance or measured conversion after a valid account tracking link is verified.
- Prefer Booking.com for eligible high-intent rental-car CTAs when the user is likely to convert in-session, especially Pay Now at 6%. Do not ignore its same-session/no-cookie attribution limitation.
- Keep Expedia search as the broad lodging fallback where TexasDefined lacks a verified exact-property destination.
- Keep CityPASS specialized to genuine multi-attraction planning; enforce its SKU exclusions and compliance restrictions.

## Measurement policy

The intent-based Orbitz / Travelocity routing went live on 2026-09-23. The private partner-referral dashboard therefore uses 2026-09-23 as a separate clean routing-comparison baseline instead of mixing earlier configurations into the comparison.

Do not collapse the Orbitz / Travelocity split until each provider has at least 100 qualifying CTA impressions in the clean window. This is an operational minimum for a comparable sample, not a statistical-significance threshold. Because the active CJ lodging terms are currently at parity, compare first-party CTR together with downstream completed bookings, reversals and realized commission before rerouting traffic.

RVshare entered the governed traveler surface on 2026-09-24. Evaluate it separately from hotel and vacation-rental partners because its 4% commission applies to successful RV reservations, not hotel bookings.

## Current implementation check

TexasDefined already uses Booking.com for governed rental-car placements, including road-trip and generated-itinerary contexts. Continue to monitor whether the same-session attribution materially reduces realized value versus alternatives.

Hotels.com, Orbitz, Travelocity and Vrbo are already live in the governed Stay Nearby bootstrap. RVshare is live on route-gated high-intent RV/camping surfaces with CJ deep-link binding, sponsored/nofollow attributes, first-party partner attribution and production-policy validation.

CheapTickets is approved but intentionally not surfaced because its active rates do not improve the current comparison layer. Motel 6/OYO USA remains inactive until a clean TexasDefined tracking destination exists and exact-brand relevance or measured conversion justifies the lower 3% payout.
