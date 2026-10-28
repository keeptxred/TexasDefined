# Group Events & Experiences — Houston Build 2 source review

Reviewed October 28, 2026. **Independent editorial listings only**; none is a participating venue, paid partner, or a confirmed reservation. This batch adds records to the existing `/corporate-events` directory, preserving all 147 prior Texas listings and slugs. Existing Houston baseline: **78 Greater Houston**, of which **60 Houston city**. New directory additions: **12**, yielding **159 statewide**, **90 Greater Houston**, **62 Houston city**, assuming the reviewed branch deploys.

## Audit and duplicate handling

The corrected 78-record metro baseline includes source entries whose `metro: 'Houston'` field appears **before** the `slug` field (for example Conroe K1 Speed, Katy PopStroke, Kemah Boardwalk and Humble Main Event). The original 74 count was a position-dependent audit parser undercount, **not** four newly added businesses. Both complete Houston totals are covered by the protected tests.

Exact legacy slugs and normalized same-name entries: **0 duplicate identities found** among 78 Houston metro records. Shared brands with separate verified locations are not duplicates. Do not merge Escapology Cypress and Sugar Land; do not merge Topgolf locations; separate Houston Party Boats' 49- and 75-passenger vessels. **No existing venue records deleted**.

- `the-escape-game-houston` is a multi-location Houston operator (Galleria and CityCentre); no single physical street address should be assigned to the legacy provider identity.
- `escape-it-houston-group-events` specifically profiles the operator's **West Houston Marq'E venue** at 7620 Katy Freeway and its published 4–36 corporate game format. The operator ALSO has Humble and Webster branches (https://escapeithouston.com/location.aspx). This West Houston record must not be cloned or misrepresented as a generic multi-location listing. New branch profiles require independent source verification.
- `game-show-experience-houston` has mobile and studio offerings; location and individual package capacities must not be collapsed.
- `trill-on-wheels` is a moving bike experience, not an immovable activity room.
- `houston-food-bank-corporate-volunteers` is a volunteer activity at a facility, not a generic event-hall rental.

All other 73 baseline Houston records remain legacy editorial listings requiring one-to-one operator-to-Explore location identity resolution before private marketplace junction-table insertion. Existing stored public review dates are preserved and **not** falsely refreshed to October 28. The new overlay contains no fabricated Explore UUID, venue address, GPS coordinate, event date, group price, commercial approval or image rights.

## New official-source records

| Added location/operator | Physical city | Official operator evidence and limitation |
| --- | --- | --- |
| Cypress Event Hall | Cypress | https://www.cypresseventhall.com/Prices.html — up to 100 guests, AV and prep area; published flat rentals depend on day/hours/extra requirements |
| Lindsay Lakes | Cypress | https://www.lindsaylakes.com/weddings-events-venue-cypress-texas — corporate events and catering; no verified total headcount; buffet price is not total event price |
| The Union Kitchen — Towne Lake | Cypress | https://www.theunionkitchen.com/private-events-cypress — 32-person semi-private lakeview dining; meal-specific minimums, 8.25% sales tax, 22% gratuity and refundable-status-specific deposit terms must be read carefully |
| Escapology Cypress | Cypress | https://www.escapology.com/en/cypress-tx/groups-parties — 60-minute private games, group events; combined capacity unknown |
| Escapology Sugar Land | Sugar Land | https://www.escapology.com/en/sugar-land-tx — seven rooms, VIP group inquiry; summed occupancy unknown |
| County Line Event Center | Pearland | https://www.countylineeventcenter.com/corporate-party-venue — 3,200 sq ft, group events and catering; square footage is not a guest capacity |
| Young Chefs Academy The Woodlands | The Woodlands | https://youngchefsacademy.com/locations/thewoodlandstx/group-events/ — corporate team cooking, capacity unknown |
| urbanCHEF | Houston | https://www.urbanchefhouston.com/corporate-events — two teaching kitchens with 24 participants each, total 48; $300 deposit is not corporate event price |
| Norris Conference Centers CityCentre | Houston | https://norriscenters.com/norris-conference-centers-houston-citycentre/ — 2–600 by event configuration, Red Oak Ballroom 150–600; source pages disagree on number of meeting rooms, so require an exact room quote |
| Houston Party Boats | League City | https://houstonpartyboats.com/ — Houston Party Boat 49 / Celebration 75, separate vessels, food rules and marine weather confirmation |
| Galveston Sea Ventures | Galveston | https://galvestonseaventures.com/corporate-fishing-trips/ — individual private vessel up to six, multiple boats possible but not presumed simultaneous |
| B & B Sportfishing | Galveston | https://bbsportfishing.com/specialty-charters/ — customized company fishing and cruises, multi-boat total unconfirmed |

## Normalized catalog data and limitations

- New venue records are independently sourced, with `verifiedOn = 2026-10-28`. Published editorial cards use existing provider/city/metro/area/category/format structures. Unknown max capacities, booking dates and per-person corporate rates remain null.
- Typed Build 1 overlay: `src/data/group-events-houston-build2.ts`. All 12 operator keys have category, occasion, indoor/outdoor, activity, food, source, capacity-scope and rights fields. The provider-to-Explore location UUID remains **null** until a trusted match is made; no duplicate address tables.
- Thirteen normalized experiences represent 12 added operators because Houston Party Boats has two independently capped vessels. Two quote-only boat package stubs have unknown minimum, price, validity and availability; neither passes `packageFitsGroup()` as a reserved bookable package.
- The Build 1 migration **20261028214656** was confirmed applied in production and the four private tables exist with RLS enabled and no anon/authenticated SELECT privilege. A source-controlled, idempotent 13-experience / 101-tag seed is in `scripts/data/group-events-houston-build2-seed.sql`, guarded by `scripts/data/validate-group-events-houston-build2-seed.mjs`. Only execute the seed after protected CI and the matching source merge, then verify database counts and tag assignments. No unsupported Explore location links or bookable packages are seeded.
- All image fields null/unconfirmed. Do not display third-party photos or create user portals, new checkout, automatic outreach or paid integrations.

## Research queue, not published inventory

The Lakehouse at Towne Lake (https://townelaketexas.com/lakehouse-rental) is **research only**, not part of the 12 published-directory additions: it is a community-association amenity whose public event-rental page advertises a 200-seat space, but the reservation inquiry explicitly asks whether the renter is a Towne Lake resident; eligibility for unrelated outside corporate organizers needs operator confirmation. Do not advertise unconditional outside access.\n\nPrioritize: neighborhood-specific escape rooms for Cypress/Pearland, alternative Pearland experiences, group dining near suburban activities, local family-reunion halls, charter dock and boarding/accessibility procedures, official photos with rights, and individual venue capacities for operator brands and multi-site groups. Research candidates are **not included** in the 12 additions unless sourced above.

Source re-verification should check change-sensitive rates, capacity, opening/closure and operating limits; no automated updater should overwrite a previously substantiated fact with guessed content. 
