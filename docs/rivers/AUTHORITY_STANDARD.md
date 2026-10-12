# TexasDefined River Authority — evergreen publishing contract

Effective 2026-10-12. Covers fishing, camping, paddling, swimming, ecology, cultural history and visitor planning. This is an editorial quality standard, **not** a claim that this site supersedes TPWD, NWS, water managers, or official operators for rules and live conditions.

## Required publishing workflow for EVERY new river

1. **Canonical and uniqueness check.** Search existing articles, river/basin profiles, lakes, counties and destinations; retain the existing URL when upgrading a profile. Do not create a competing slug. This site's TWDB major-basin pages and the named recreational rivers are distinct concepts.
2. **Registry first:** Add the name, canonical slug, correct basin, relevant county associations, confirmed existing destinations, accurately labeled legitimate image and useful reader summary in `src/data/river-authority-registry.ts`. Confirm each geographic relationship; a county link is never access evidence.
3. **Unique visitor research:** Add a new detail object to `DETAILS` in `src/data/fixtures/texas-river-visitor-authority.ts`. Write non-duplicative, river-specific sections on the geography of the reach, species/habitat and current fishing rules, accessible ramps/put-ins/take-outs with ownership, float options, public land vs private boundaries, campsite/RV logistics, swimming safety, local trip itineraries, ecology and history. Do not use generic 'best' rankings without methodology.
4. **Source verification:** Link and date-check TPWD current-year license/limit and waterbody exceptions, TPWD parks and paddling trail/leased access maps, relevant river authority/dam operator, TWDB basin, USGS gauges and NWS flood/river alerts. Prefer official city/county park sources. Cite exact claims near them when granular claims are provided. Do not freeze live conditions in evergreen copy.
5. **Media provenance:** Verify a real licensed photograph of the *named river* (or say clearly that a regional image is illustrative). Log photographer, rights, source, alt, caption, the reach depicted and any limitations. No invented original imagery, wrong-river stock photo, or unattributed scraping.
6. **Accessibility and useful structure:** Specific first-visit and repeat-visit trips, facilities, accessible launch/camping information when independently confirmed, map and driving context, safety and source date. Avoid fabricated lengths, times, fees or legal access.
7. **Automatic wiring:** The registry creates lazy new article stubs (unless slug exists in existing major-basin stubs), full article content, canonical `/article/<slug>` page, the statewide river hub, sibling-river links, county links and curated destination links. Never bypass the canonical registry.
8. **Cross-link quality:** Verify mutual links from all relevant actual county, park, lake and destination pages and return links from each river. Route data includes crosslinks from county and destination templates; if a route uses a separate custom template, add direct links rather than assuming the shared widget appears.
9. **Editorial QA:** `node scripts/data/validate-river-visitor-authority.mjs`; typecheck and general link/indexability tests, rendered desktop/mobile keyboard/screen-reader navigation, HTTP 200/canonical, asset availability, schema and live source spot checks, then inspect in production after deployment.
10. **Revalidation:** Quarterly review of access and facilities, annual September fishing regulations review, monthly source link checker, immediate updates for material closures or flood-management changes. `updatedAt` changes only after genuinely verified material edits.

## Current implementation

- Retains existing canonical river articles: Guadalupe, Texas Colorado, Brazos, Neches and Sabine; strengthens all five with a new recreational research layer.
- Adds standalone Frio, Comal, San Marcos, Llano and Pecos articles; retains the existing statewide 15-basin reference collection.
- County and selected destination pages have programmatic reciprocal links; all ten link to associated counties and other river guides. All are routed through the established lazy evergreen article architecture.
- Existing image assets are used only with truthful alt labels. **Pending separate production acceptance:** exact-river authentic media for some river pages, full independent on-site/agency access verification, detailed named ramp coordinates, actual campground inventory, rendered page/structured-data checks and proof the pages are more useful than official competing pages.
- These are release gates, not excuses to publish invented maps or access points. Production deployment is subject to typecheck, CI and editorial review.

## Key first-party sources

- [TPWD river guide and navigation](https://tpwd.texas.gov/landwater/water/habitats/rivers/)
- [TPWD river fishing and downloadable individual river maps](https://tpwd.texas.gov/fishboat/fish/recreational/rivers/)
- [TPWD access/leased access](https://tpwd.texas.gov/landwater/water/habitats/rivers/access/index.phtml)
- [TPWD fishing regulations](https://tpwd.texas.gov/regulations/outdoor-annual/fishing/)
- [TWDB basins](https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp)
- [USGS streamflow dashboard](https://dashboard.waterdata.usgs.gov/)
- [NWS flood safety](https://www.weather.gov/safety/flood)
