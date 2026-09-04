# TexasDefined Viator affiliate integration

## Purpose

Viator is a booking layer for TexasDefined travel discovery. TexasDefined remains the editorial and trip-planning authority; Viator provides current commercial inventory for tours, tickets and organized experiences.

Operational facts such as public-site hours, rules, closures, reservation requirements and managing authority must continue to come from first-party or authoritative sources. A Viator product page must not replace those sources.

## Affiliate configuration

Affiliate tracking is centralized in `src/lib/viator-affiliate.ts`.

The approved TexasDefined attribution values are active as the centralized defaults: PID `P00318227` and MCID `42383`. Deployment may optionally set `VITE_VIATOR_AFFILIATE_PARAMS` to a valid Viator query string containing both `pid` and `mcid`; invalid or incomplete overrides fall back to the approved defaults.

Do not hard-code affiliate IDs into components or content records. Do not manually replace or strip Viator tracking parameters. TexasDefined appends a market-specific `campaign` value only when the target link does not already contain one.

All monetized outbound links use `rel="sponsored noopener noreferrer"`.

## Link policy

`src/data/viator-destination-links.ts` contains only destination URLs verified against live Viator inventory. A market without a verified destination page falls back to the verified statewide Texas page at `https://www.viator.com/Texas/d296` rather than constructing an unverified Viator search URL.

As additional destination or product URLs are verified, add them to the governed link registry. Product-level links should be preferred for high-conversion editorial placements once the product has been checked for current availability and fit.

## Statewide experience market coverage

The first statewide catalog models 25 markets:

- Austin
- San Antonio
- Dallas
- Fort Worth
- Arlington
- Houston
- Galveston
- Fredericksburg & Texas Wine Country
- New Braunfels & Gruene
- San Marcos
- Bandera & Cowboy Country
- Marble Falls, Lake Travis & Highland Lakes
- Waco
- Bryan–College Station
- Corpus Christi
- Port Aransas & Mustang Island
- South Padre Island
- Rio Grande Valley
- El Paso
- Big Bend & Terlingua
- Marfa, Alpine & Davis Mountains
- Amarillo & Palo Duro Canyon
- Lubbock
- Beaumont & the Golden Triangle
- Jefferson & East Texas

The catalog is intentionally broader than today's directly verified Viator destination pages. This preserves a durable TexasDefined discovery model as supplier inventory changes.

## Experience lanes

Every market is classified across one or more of 12 lanes:

- city sightseeing
- history and landmarks
- food and barbecue
- wine, beer and spirits
- outdoor adventure
- on the water
- ghost tours and nightlife
- Western and ranch experiences
- museums and culture
- family attractions
- sports and stadiums
- day trips

## Current UI placement

The first release lives inside the existing `/explore` route at the `#tours-experiences` section. This keeps the rollout compatible with TexasDefined's generated TanStack route-tree merge gate while still making the statewide market directory indexable and discoverable from Explore.

Rich research records and curated product seeds stay outside the lightweight client runtime projection so statewide booking discovery does not consume the main-bundle performance headroom.

Dedicated market routes can be added later when their generated `routeTree.gen.ts` changes can be produced and committed with the implementation.

## Next monetization layer

1. verify approved attribution on production outbound links;
2. use Viator's affiliate tooling/Selector to resolve current high-quality products for the highest-intent TexasDefined pages;
3. add curated product-level CTAs to destination, city, food, wine, coastal, Western and outdoor pages where the product is genuinely relevant;
4. keep product availability review dates and remove stale products promptly;
5. compare conversion by market and campaign without changing TexasDefined's editorial rankings or recommendations solely because a product pays commission.
