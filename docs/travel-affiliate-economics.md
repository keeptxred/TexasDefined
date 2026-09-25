# TexasDefined travel affiliate economics

Portfolio-wide non-travel and cross-category decisions are maintained in `docs/affiliate-portfolio-economics.md`.

Reviewed 2026-09-25 from the current active CJ advertiser terms supplied from the TexasDefined publisher account. Re-verify the active advertiser relationship before changing routing because commissions can vary by program, product, market, campaign, coupon use or contract.

## Current verified program economics

| Program | Lodging / stays | Vacation rentals | Car rentals | Activities / attractions | Packages | Attribution / other notes |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Hotels.com NORAM | 4% | 2% | 1.5% | — | — | 7-day referral period. |
| Orbitz | 4% | 2% | 1.5% | 4% | 2% | 7-day referral period; air/cruise 0%. |
| Travelocity NORAM | 4% | 2% | 1.5% | 4% | 2% | 7-day referral period; air/cruise 0%. |
| CheapTickets | 4% | 2% | 1.5% | 4% | 2% | 7-day referral period; air/cruise 0%. |
| Vrbo NORAM | — | 2% | — | — | — | 7-day traveler referral period. Owner-action material lists $20 for a qualifying new live listing with a 60-day referral period. |
| Motel 6 / Studio 6 | 3% web/app hotel booking | — | — | — | — | 45-day referral period; unlimited occurrences; open-ended locking. |
| RVshare | 4% reservation | — | — | — | — | 30-day reservation referral period. Owner-listing table shows $5 / 45 days, but the same terms also call “list your RV” transactions non-commissionable; do not route owner acquisition until clarified. |
| Booking.com APAC | 4% | Included within eligible stay inventory | 6% Cars Pay Now / 3.8% Cars Pay Local | 4% attractions | — | Airport taxis 4%; flights $2. Reservation must occur in the same browser session; current terms say no cookie tracking. Booking.com Australia is intentionally out of scope. |
| Expedia Travel Creator Program | Variable | Variable | Variable | Variable | Variable | Current account email states a 7-day attribution window for qualified bookings. |

## Routing policy

Do not change travel routing on headline payout alone. Exact inventory, visitor intent, attribution behavior, conversion and realized commission all matter.

- Keep verified exact-property Hotels.com links primary because they provide property-specific relevance.
- Keep Orbitz as the comparison provider for hotel-first event and sports-venue intent while the clean routing cohort accumulates measurable traffic.
- Keep Travelocity as the comparison provider for broader destination and leisure intent while the clean routing cohort accumulates measurable traffic.
- Treat Orbitz versus Travelocity as a conversion/CTR experiment, not a commission-rate experiment: their current verified default travel schedules are materially the same.
- Keep Vrbo limited to contexts where a vacation rental or owner referral is genuinely relevant; suppress it on the RVshare-specific camping/RV cohort because RVshare pays 4% on reservations versus Vrbo’s 2% traveler rate.
- Do not add CheapTickets as another generic comparison CTA while its verified default economics duplicate Orbitz/Travelocity.
- Keep Motel 6 / Studio 6 exact-brand only. Its current 3% lodging rate is below Hotels.com’s 4%, so do not replace a commissionable Hotels.com exact-property link solely for payout.
- Show RVshare only on high-intent camping, RV-park, state-park, outdoors and road-trip surfaces. On those routes, make RVshare the primary rental CTA. Do not add an RV owner-listing CTA until CJ resolves the current terms contradiction.
- Keep Booking.com as the governed rental-car choice while its 6% Cars Pay Now / 3.8% Cars Pay Local economics and conversion performance justify it, but account for its same-browser-session/no-cookie attribution behavior.
- Keep Expedia search as the broad lodging fallback where TexasDefined lacks a verified exact-property destination.

## Measurement policy

The intent-based Orbitz / Travelocity routing went live on 2026-09-23. The private partner-referral dashboard therefore uses 2026-09-23 as a separate clean routing-comparison baseline instead of mixing earlier configurations into the comparison.

Do not collapse the Orbitz / Travelocity split until each provider has at least 100 qualifying CTA impressions in the clean window and the active CJ advertiser terms have been rechecked. This is an operational minimum for a comparable sample, not a statistical-significance threshold. Review first-party CTR together with downstream advertiser bookings, completed stays, reversals and realized commission before rerouting traffic.

RVshare entered the governed traveler surface on 2026-09-24. Evaluate it separately from hotel and vacation-rental partners because its 4% commission applies to RV reservations, not hotel bookings.

## Current implementation check

TexasDefined already uses Booking.com for governed rental-car placements, including road-trip and generated-itinerary contexts. No lower-paying Expedia-family rental-car CTA was found during the prior audit, so no replacement was required.

Hotels.com, Orbitz, Travelocity and Vrbo remain live in the governed Stay Nearby bootstrap. RVshare remains route-gated to high-intent RV/camping/outdoors surfaces. CheapTickets remains intentionally unsurfaced because its current default rates do not improve the comparison layer. Motel 6 / Studio 6 remains inactive until TexasDefined has a clean account-specific shopper tracking link.
