# TexasDefined statewide town and city authority — permanent scope

**Scope correction — 2026-10-12:** The original list of 15 was a sample batch. It is **not** a publishing ceiling or the list of places that must receive the authority standard. This program covers every existing and future Texas town, incorporated city, village, historic settlement, and independently notable unincorporated community where reliable primary sources support a useful guide.

## Production-state inventory

- 15 original small-town destination waves contain **60 records, 57 distinct towns**; three later duplicates (Jefferson, Wimberley and Marfa) must not replace their deeper master records.
- Town authority wave 16 adds **Marble Falls and Port Aransas**. Town wave 17 adds **Round Top, Canton and Taylor**. Town wave 18 adds **Waxahachie, Weatherford and Grapevine**, bringing the current checked-in researched roster to **65 distinct town guides**.
- Gruene is covered as **Gruene Historic District** in New Braunfels, not an invented separately incorporated town.
- 11 major cities have `src/data/city-authority-profiles.ts` research profiles.
- The existing `TEXAS_CITIES` civic reference directory contains 57 records; 46 are **not yet independently certified** at the comprehensive city-authority depth. A generic city reference page is not equivalent to a researched destination authority guide.
- The Census Bureau's 2026 BAS Texas incorporated-place roster (boundary data as of 2025-11-30) has approximately **1,230 cities/towns/villages**, far exceeding the checked-in town inventory. Authoritative source: https://tigerweb.geo.census.gov/tigerwebmain/Files/acs26/tigerweb_acs26_incplace_2026_bas26_tx.html
- Additional CDPs, unincorporated settlements, ghost towns and historic neighborhoods require **separate research**. Do not mislabel Census-recognized places as incorporated or conflate Gruene and New Braunfels.

## Implemented changes and non-optional standard

1. All existing town waves feed one canonical editorial authority resolver. This avoids lost research when Supabase responds with a shorter record.
2. The shared destination template visibly publishes existing on-page research: meaningful history and local context, practical accessibility and parking where relevant, suggested time budgets, sources, itinerary alternatives, food/lodging areas, nearby attractions, appropriately licensed image attribution.
3. Town, city, county and attraction templates derive relevant reciprocal links from source-backed place identity, actual county and proximity, instead of inserting all towns into every page.
4. The statewide validator discovers **every** `small-town-destinations-wave*.ts` file and fails CI if its pages lack required authority data or if the wave is omitted from the canonical town network/Explore catalog.
5. The 62 previously merged town pages are already recorded; wave18 adds three new town guides to the same authority review system in the permanent `td_authority_verification_registry` with primary visitor-source URLs in `td_authority_verification_sources`. Existing cadences stay unchanged. Newly missing registry entries have 30-day windows for dynamic water/coast conditions or 90-day windows for slower-changing town profiles. Registry enrollment does **not** count as completing editorial verification.
6. `scripts/data/audit-statewide-texas-towns.mjs` compares the Census incorporated roster with actual researched town/city coverage, keeping exact Census GEOIDs and geographic coordinates. A scheduled workflow exports gaps. **Missing-place records are research targets, not publishable placeholder pages.**

## Definition of completed authority guide

A town is accepted only when it has locally specific, primary-sourced facts; correct legal/geographic identity; history and distinctive attractions that deserve coverage; practical visitor information tailored to intent; original or legally reusable, genuinely place-specific images with credit and license; map/geographic context; appropriate official source links and fact-review date; relevant FAQs from observed visitor questions; useful local itinerary and nearby trip alternatives; reciprocal links from its own county and appropriate attractions; schema, responsive and accessible rendering; passing CI and live checks. A generic destination paragraph, generic affiliate callout, unsupported amenities or long list of links cannot satisfy acceptance.

Official site material is a source to verify against, not content to copy. The goal is a more useful **independent** guide, not reproduction of museum collections, private listings, or copyright-protected visitor materials.

## Remaining statewide editorial backlog

- Independently research and upgrade the 46 city-directory records that lack full city-authority profiles.
- Expand in grounded batches across the remainder of the official incorporated-city roster. Each batch should include researched articles, lawful photos, correct county and entity identity, reliable primary sources and contextual reciprocal links **before** public indexability.
- Extend the Census baseline with unincorporated communities, CDPs and towns of historic or visitor significance from authoritative state/local sources.
- Confirm production deployment and actual browser behavior before marking any batch fully live; CI or repository registration alone is insufficient.
- Clear and investigate source-verification rows that remain `awaiting_editorial_verification`. A running monitor is not evidence that individual facts have been verified.

**No project closure until the statewide inventory is reconciled and each intended public guide meets substantive authority acceptance.** The 15 originally requested places remain a completed-code batch, not the definition of full statewide completion.

## Wave 18 and independent production acceptance

- New researched incorporated-city destinations: Waxahachie (Ellis County cotton economy and historic courthouse), Weatherford (Parker County and Chandor Gardens, with date-specific 2026 closures), Grapevine (Cotton Belt railroad history, separate TEXRail and heritage railroad systems).
- New records contain institution-specific visitor FAQ answers, original travel itineraries, source-backed practical access information and individually attributed CC-licensed photographs. Their existing county authority articles now link to them.
- The separate live acceptance workflow tests **every checked-in researched guide** and all corresponding county pages after protected deployment; it records page and two-way link defects as actual failures, not as an unverified success.
- The 65-record catalog is still **not** full Texas incorporated-place coverage and none of the remaining unresearched towns is to be represented as editorially complete.
