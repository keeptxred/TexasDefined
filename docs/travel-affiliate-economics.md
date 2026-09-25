# TexasDefined travel affiliate economics

Reviewed 2026-09-24 from affiliate-program onboarding, setup and terms messages delivered to the TexasDefined account. Re-verify the active advertiser relationship in CJ before changing routing based on payout because commissions can vary by program, product, market, campaign, coupon use or contract.

## Current verified program economics

| Program | Lodging / stays | Vacation rentals | Car rentals | Activities / attractions | Packages | Other notes |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Hotels.com NORAM | 4% | 2% | 1.5% | — | — | Qualified bookings only. |
| Orbitz | 3% retail hotel / 7% merchant hotel / 2% merchant hotel with promo code | Not separately stated in the direct advertiser welcome | $3 | 5% | 3% / 2% with promo code | Direct advertiser welcome also lists $3 air and $40 cruise. Later Expedia-family onboarding material uses different generic product rates, so the active CJ term is controlling. |
| Travelocity NORAM | 4% | 2% | 1.5% | 4% | 2% | Air and cruise excluded from the default commission summary in the current onboarding material. |
| CheapTickets | 4% | 2% | 1.5% | 4% | 2% | Air, coupon and cruise are excluded. Verified from the September 10 welcome terms; no current routing advantage over the existing Expedia-family traveler choices. |
| Vrbo NORAM | — | Up to 2% | — | — | — | Vacation-rental-specific program. |
| Motel 6 / OYO USA | Rate not stated in welcome email | — | — | — | — | Program approval is verified, but the exact active CJ commission schedule was not included in the September 21 welcome message. Do not route traffic on an assumed rate. |
| RVshare | 5% on completed stays | — | — | — | — | $7 for each new RV listed; 30-day cookie; deep linking and a product data feed are available. |
| Booking.com | From 4% | Included within stays where eligible | From 6% | From 4% | — | Flights from €2 and airport taxis from 4% in the current welcome terms. |
| Expedia Travel Creator Program | Variable | Variable | Variable | Variable | Variable | Commission varies by booking site, travel product/trip and country. The current account email states a 7-day attribution window for qualified bookings. |

## Routing policy

Do not change hotel-comparison routing on a headline payout number alone. Orbitz's direct advertiser welcome shows a materially higher merchant-hotel rate than Hotels.com or Travelocity, but merchant versus retail classification and the active CJ relationship term determine the actual commission.

- Keep verified exact-property Hotels.com links primary because they provide property-specific relevance.
- Keep Orbitz as the comparison provider for hotel-first event and sports-venue intent while the clean routing cohort accumulates measurable traffic.
- Keep Travelocity as the comparison provider for broader destination and leisure intent until the active CJ terms and downstream conversion data justify a change.
- Keep Vrbo limited to contexts where a vacation rental or owner referral is genuinely relevant; suppress it on the RVshare-specific camping/RV cohort because the approved RVshare stay commission is materially higher.
- Do not add CheapTickets as another generic comparison CTA while its verified default economics duplicate existing 4% Expedia-family lodging and activity rates.
- Do not activate Motel 6/OYO USA placements until the active CJ commission schedule and a usable account-generated destination link are verified.
- Show RVshare only on high-intent camping, RV-park, state-park, outdoors and road-trip surfaces. On those routes, make RVshare the primary rental CTA and suppress the lower-paying Vrbo traveler CTA. Do not add RVshare to generic city, county, event or destination pages merely because they are travel content.
- Prefer Booking.com for rental-car CTAs where the current approved terms remain materially higher than Expedia-family car rates.
- Keep Expedia search as the broad lodging fallback where TexasDefined lacks a verified exact-property destination.

## Measurement policy

The intent-based Orbitz / Travelocity routing went live on 2026-09-23. The private partner-referral dashboard therefore uses 2026-09-23 as a separate clean routing-comparison baseline instead of mixing earlier configurations into the comparison.

Do not collapse the Orbitz / Travelocity split until each provider has at least 100 qualifying CTA impressions in the clean window and the active CJ advertiser terms have been rechecked. This is an operational minimum for a comparable sample, not a statistical-significance threshold. Review first-party CTR together with downstream advertiser bookings, completed stays, reversals and realized commission before rerouting traffic.

RVshare entered the governed traveler surface on 2026-09-24. Evaluate it separately from hotel and vacation-rental partners because its 5% commission applies to completed RV stays, not hotel bookings.

## Current implementation check

TexasDefined already uses Booking.com for governed rental-car placements, including road-trip and generated-itinerary contexts. No lower-paying Expedia-family rental-car CTA was found during the 2026-09-23 audit, so no replacement was required.

Hotels.com, Orbitz, Travelocity and Vrbo were already live in the governed Stay Nearby bootstrap before this review. RVshare was not present and was added on 2026-09-24 with route gating, CJ deep-link binding, sponsored/nofollow attributes, first-party partner attribution and production-policy validation. CheapTickets is approved but intentionally not surfaced because its verified default rates do not improve the current comparison layer. Motel 6/OYO USA is approved but remains inactive until its exact active CJ payout and link contract are verified.
