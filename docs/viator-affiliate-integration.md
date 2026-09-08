# TexasDefined Viator affiliate integration

## Purpose

Viator is a booking layer for TexasDefined travel discovery. TexasDefined remains the editorial and trip-planning authority; Viator provides current commercial inventory for tours, tickets and organized experiences.

Operational facts such as public-site hours, rules, closures, reservation requirements and managing authority must continue to come from first-party or authoritative sources. A Viator product page must not replace those sources.

## Affiliate configuration

Affiliate tracking is centralized in `src/lib/viator-affiliate.ts`.

The approved TexasDefined attribution values are active as the centralized defaults: PID `P00318227` and MCID `42383`. Deployment may optionally set `VITE_VIATOR_AFFILIATE_PARAMS` to a valid Viator query string containing both `pid` and `mcid`; invalid or incomplete overrides fall back to the approved defaults.

Do not hard-code affiliate IDs into components or content records. Do not manually replace or strip Viator tracking parameters. TexasDefined appends a market- or placement-specific `campaign` value only when the target link does not already contain one.

All monetized outbound links use `rel="sponsored noopener noreferrer"`.

## Link policy

`src/data/viator-destination-links.ts` contains only destination URLs verified against live Viator inventory. A market without a verified destination page falls back to the verified statewide Texas page at `https://www.viator.com/Texas/d296` rather than constructing an unverified Viator search URL.

The verified market registry is intentionally conservative. A current Viator product inside a Texas place does not by itself prove that Viator maintains a durable destination landing page for that place.

Product-level URLs are not stored in the checked-in curated-seed layer. Product availability, price, ratings, review counts and supplier details are volatile and must be resolved from current Viator inventory before any future product-level booking card is rendered.

## Statewide experience market coverage

TexasDefined models 25 durable experience markets:

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

The market model is intentionally broader than the directly verified Viator destination-page registry. This preserves a durable TexasDefined discovery structure as supplier inventory changes.

## Experience lanes

The booking layer uses 12 category-level lanes:

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

`src/data/viator-experience-runtime.ts` contains the compact client-facing market projection. Markets may expose up to three `signalLanes` when those lanes are backed by reviewed curated inventory. These are category-level discovery signals, not promises that a particular product is currently bookable.

The current signal review date is kept in `VIATOR_RUNTIME_SIGNAL_REVIEWED_AT` and must move forward only after a real inventory reconciliation.

## Curated inventory research

`src/data/viator-curated-product-seeds*.ts` stores editorial discovery signals gathered from reviewed Viator Texas inventory batches. The seed layer exists to answer questions such as:

- which Texas markets show meaningful supplier depth;
- which booking lanes belong on a market card;
- which durable places deserve stronger TexasDefined canonical coverage;
- which product types should be excluded as thin, generic, duplicative or non-Texas inventory.

Curated seeds are not a static product catalog. Do not render seed titles as live offers without separately resolving current product data.

Transfers, generic scavenger hunts, commodity rentals, thin workshops, duplicate low-signal variants and accidental non-Texas inventory remain intentionally excluded under `VIATOR_PRODUCT_EXCLUSION_RULES`.

## Canonical destination expansion

When reviewed Viator inventory reveals a durable Texas place or attraction that belongs in the editorial guide, TexasDefined may create or improve the canonical destination page instead of creating an affiliate-product URL.

Recent Viator-driven destination expansion has added or strengthened places such as Barton Creek Greenbelt, San Antonio Botanical Garden, Southfork Ranch, Buffalo Bayou Park Cistern, Houston Downtown Tunnels, Deep Ellum, Galveston historic districts, Galveston Seawall and Galveston Bay.

Every destination remains subject to the normal TexasDefined source-depth, image-rights, indexability and sitemap gates. Viator inventory does not bypass those gates.

## Current UI placement

The booking layer now appears in two primary places:

1. `/explore#tours-experiences` — the statewide experience-market directory, including compact reviewed inventory signals;
2. canonical `/destination/:slug` pages — a market-matched booking card that can surface the same category-level signals while sending the visitor to current Viator inventory.

Both surfaces keep prices, ratings, review counts and current availability on Viator rather than hard-coding volatile values into TexasDefined.

Rich research records and curated product seeds stay outside the lightweight client runtime projection so statewide booking discovery does not consume the protected main-bundle performance headroom.

## Production safeguards

`scripts/ci/verify-viator-production.mjs` protects the live integration after deployment. It verifies the Explore experience directory plus a representative canonical destination booking card, including:

- required booking copy and inventory-signal text;
- approved PID and MCID attribution;
- placement-specific campaign values;
- sponsored-link relationship attributes;
- affiliate disclosure;
- successful live rendering without a Cloudflare challenge.

The production smoke is part of the existing production verification chain and must not be weakened to accommodate a broken booking surface.

## Ongoing monetization work

1. continue reviewing supplied Viator Texas inventory in batches;
2. promote only durable Texas place/activity topics into canonical editorial coverage;
3. use curated product inventory as a research and conversion signal without turning TexasDefined into a thin tour catalog;
4. add or refresh verified market destination URLs only after checking the current Viator destination page;
5. resolve any future product-level cards against current Viator data rather than checked-in price/rating snapshots;
6. compare conversion by market and campaign without changing TexasDefined editorial rankings or recommendations solely because a product pays commission.
