# TexasDefined citation-reference assets — October 2026

## Objective

TexasDefined should earn citations because it is useful as a Texas reference source, not because it creates large quantities of ordinary pages or acquires large quantities of low-value links.

The operating model is:

**source-backed Texas data → maintained reference experiences → discoverability → citations → organic links**

This document records the repository audit behind the first citation-asset implementation and the next seven reference assets to build. It is an implementation roadmap, not permission to create thin programmatic pages.

## Audit findings

### Shared citation infrastructure already exists

TexasDefined already has useful primitives that should be reused rather than duplicated:

- `CitationTrustPanel` for visible sources, methodology and verification dates.
- `public/citation-magnets.json`, `/citation-guide` and `/llms.txt` for citation/retrieval guidance.
- multiple stable CSV/JSON distributions with `Dataset` / `DataDownload` structured data.
- canonical destination, county, fishing, sports and property-tax route families.
- source-backed destination records with official URLs and verification dates.
- existing source/data validation scripts that should remain part of the merge gate.

The October citation-asset work extends those primitives rather than adding a second citation framework.

### Lakes

The fishing domain is the strongest ready-made source for a Texas lake database. `FishingLake` records already carry durable structured fields such as counties, nearby cities, coordinates, surface area, maximum depth, impoundment year, river basin, primary waterway, controlling authorities, sources and verification dates. The current complete-guide registry contains 41 lake records that have passed the existing quality gate.

The Supabase `explore_lake_profiles` table exists but was empty at audit time, so it is not treated as the production source of truth in Phase 1. Lake reference work should continue to use the maintained fishing records until a verified enrichment pipeline populates that table.

### State parks

TexasDefined has a mature state-park destination route family, official-source links, destination coordinates, camping profiles and activity/planning content. The Supabase `explore_park_profiles` table exists but was empty at audit time. Therefore Phase 1 can safely create a stronger searchable/map-based reference directory from maintained destination records, but acreage, campsite counts, visitation and other quantitative fields must not be fabricated or inferred. Those fields require a later authoritative TPWD ingestion/enrichment pass.

### Property tax

The statewide `texas_property_tax_rates` table is already a real data backbone. At audit time, the latest finalized 2025 records included 254 counties, 1,092 cities, 1,013 school districts and 2,441 special districts. Historical annual snapshots are retained back through 2021. The existing rate-history explorer and taxing-unit routes should be consolidated into the citation layer instead of creating a new tax system.

Comparisons must preserve the existing integrity rule: unavailable, variable or conflicted rates are not converted into a false fixed value. A tax-rate change must never be labeled as the same thing as a homeowner's tax-bill change.

## First three citation assets

### 1. Texas Lakes Database

Canonical hub: `/fishing/lakes`

Phase 1 implementation:

- keeps the existing 41-lake quality gate;
- adds reference-database positioning rather than a conventional article framing;
- adds search, region, county, river-basin and fish-species filtering;
- adds size/depth/year/species sorting;
- adds a Texas map based on stored coordinates;
- adds structured comparison fields and derived views;
- adds visible methodology, citation guidance and reuse guidance;
- adds `Dataset` / `DataDownload` markup;
- adds `/fishing/lakes.csv` with source URLs and verification metadata.

Next enrichment wave should add authoritative access/ramp/marina/camping/state-park relationships only where the data can be maintained without converting time-sensitive conditions into durable claims.

### 2. Texas State Parks Reference Directory

Canonical hub: `/explore/state-parks`

Phase 1 implementation:

- upgrades the existing comparison surface into a searchable reference directory;
- adds region, county and activity filters;
- adds sorting, map view and filtered CSV export;
- exposes record counts, mapped-record counts and verification coverage;
- retains official-source links and visible methodology/citation/reuse guidance;
- does not invent acreage, campsite counts, visitation or accessibility detail that is not in the maintained record.

Next enrichment wave:

1. populate the existing `explore_park_profiles` schema from authoritative TPWD material;
2. add acreage, established/opened year, camping types, cabins/lodging, RV access, water access and accessibility fields where source-backed;
3. ingest annual visitation only from a maintainable authoritative series;
4. create a stable server-side CSV/JSON distribution from the enriched records;
5. create derived views such as largest parks, parks with cabins, parks with water access and visitation change only after the fields are complete enough to support them.

### 3. Texas Property Tax Data Center

Canonical hub: `/texas-property-tax-rate-history`

Phase 1 implementation:

- promotes the existing rate-history explorer into the statewide Data Center;
- uses the actual `texas_property_tax_rates` table;
- shows latest-year coverage by taxing-unit type;
- keeps the existing taxing-unit search and historical explorer;
- calculates consecutive-year fixed-rate increases/decreases only for comparable records;
- calculates fixed-rate medians by taxing-unit type;
- repeatedly distinguishes rate changes from tax-bill changes;
- adds `Dataset` / `DataDownload` markup;
- adds `/texas-property-tax-rate-history.csv` for the latest finalized statewide records;
- preserves source status, variable-rate and unavailable-rate fields rather than flattening them.

Next enrichment wave should connect exemption datasets and appraisal/home-value datasets only after source identity, year and geographic matching are safe enough to avoid false parcel-level implications.

## Selected next seven citation assets

The following seven are selected because TexasDefined already has meaningful infrastructure and because each can become a useful factual source without creating a large new set of thin pages.

### 4. Texas Counties Database

**Why it is selected:** highest reuse potential after the first three. TexasDefined already has a 254-county registry, `TexasCountyComparisonTable`, county guides, Census growth work, city-county relationships, property-tax links and county destination relationships.

**Canonical direction:** strengthen `/browse/counties` into the statewide county data hub instead of creating a competing route.

**Reference fields:** county seat, population/vintage, growth, land/water area, density, major communities, property-tax resources, appraisal district, lakes/rivers, state parks, historic sites and related destinations. Add derived comparisons only from versioned source data.

**Primary source families:** U.S. Census Bureau, Texas Comptroller, Texas state/local government sources and existing TexasDefined source-backed relationship data.

### 5. Texas Rivers Database

**Why it is selected:** the repository already has a statewide `TexasRiversAuthorityHub`, river profiles, river/basin editorial infrastructure and strong cross-links into lakes, fishing, landscapes and counties.

**Canonical direction:** consolidate the strongest existing river authority route into a structured database layer rather than publishing more disconnected river articles.

**Reference fields:** river length, source, mouth, basin, counties crossed, major tributaries, reservoirs and recreation/fishing relationships where authoritative.

**Primary source families:** USGS, Texas Water Development Board, Texas Commission on Environmental Quality where applicable, TPWD and river authorities.

### 6. Texas High School Football Database

**Why it is selected:** unusually mature infrastructure already exists. The production platform covers the current UIL football directory, team pages, district pages, ISD relationships, classifications, enrollment context and verified venue relationships. This is already a citation target and should be consolidated as a dataset, not rebuilt.

**Canonical direction:** `/texas-high-school-football-teams` remains the statewide searchable entry point, with district and ISD collections as linked dimensions.

**Reference fields:** school, mascot, city, county, ISD, UIL classification/division/district, enrollment source context, stadium/venue relationships and alignment cycle. Historical alignment should be added only as separately versioned data.

**Primary source families:** UIL and TEA, with venue sources where needed.

### 7. Texas Historic Sites Database

**Why it is selected:** TexasDefined already has a dedicated statewide historic-sites data layer, enrichment files, official Texas Historical Commission links, coordinates, category authority content and validation covering the existing historic-site cohort.

**Canonical direction:** upgrade `/explore/historic-sites` into the searchable/map-based database rather than adding thousands of National Register pages.

**Reference fields:** site type, county, nearest town, coordinates, managing authority, historical period/themes, official designation/reference fields where sourced and current visitor information separated from durable history.

**Primary source families:** Texas Historical Commission, National Park Service/NRHP, National Archives and other first-party site stewards.

### 8. Texas Painted Churches Database

**Why it is selected:** much of the desired citation asset effectively already exists. TexasDefined has a comparison experience, citation guidance, methodology, map, CSV and JSON distributions plus church-level heritage, architecture, people, symbols, preservation and National Register evidence.

**Canonical direction:** treat the existing Painted Churches collection as one of the ten flagship databases and tighten naming/navigation rather than rebuilding it.

**Reference fields:** church, city/county, denomination, founded/built/painted years, architecture, architect/builder/artists, techniques, symbols, cultural heritage, preservation context and historic-register evidence.

**Primary source families:** Texas Historical Commission, National Park Service/NRHP, diocesan/parish and other documented first-party/archival sources.

### 9. Texas Sports Venues & Stadiums Database

**Why it is selected:** TexasDefined already has source-backed sports-venue comparison infrastructure, CSV distribution, source verification fields and strong internal relationships to teams/events. It can become a broad reference asset with relatively low incremental system cost.

**Canonical direction:** consolidate the existing sports-venue comparison/theme routes into one clearly identified data hub with filtered views for football, baseball, basketball, hockey and high-school venues rather than making separate thin venue indexes.

**Reference fields:** venue, city/county, teams, sport/use, capacity where authoritative, opening year, surface/roof type where maintainable, official URL, coordinates and current-team relationships.

**Primary source families:** venue/team/league/municipal sources and existing verified venue records.

### 10. Texas Small Towns Database

**Why it is selected:** `/explore/small-towns` already has maintained destination records, regional structure, official-source metadata and comparison UX. It also cross-links naturally to counties, road trips, historic sites and events.

**Canonical direction:** improve the existing collection into a structured town reference without pretending that an editorial travel catalog is a complete list of incorporated Texas municipalities.

**Reference fields:** town, county, region, population only when versioned to an authoritative Census vintage, founding/historic context where sourced, nearby parks/lakes/historic sites and TexasDefined destination relationships.

**Primary source families:** U.S. Census Bureau plus municipal/county, THC and destination-specific first-party sources.

## Strong candidates intentionally deferred

- **Texas Lighthouses:** useful citation concept but materially smaller existing data layer than the selected seven.
- **Texas Springs:** excellent eventual hydrology asset, but requires a stronger authoritative statewide ingestion/normalization layer first.
- **Texas Waterfalls:** difficult completeness/current-flow problem; high risk of turning travel observations into unstable factual claims.
- **Texas Ghost Towns:** definition and inclusion criteria need stronger methodology before this should become a database.
- **Texas Wildlife/Species:** large opportunity, but it deserves a separate TPWD/USFWS taxonomy and conservation-status ingestion project rather than being rushed into this citation wave.

## Common definition of done for all ten

A citation asset is not complete merely because the route renders. Before production sign-off, verify:

- canonical production URL returns successfully;
- useful factual content is server-rendered/indexable outside the interactive widget;
- mobile and desktop layouts work;
- search/filter/sort behavior works where present;
- maps work where geography is material;
- internal links resolve correctly;
- methodology, sources and verification dates are visible;
- stable CSV/JSON downloads work where source/licensing rules allow them;
- `Dataset` / other structured data is used only when it accurately describes the page;
- canonical and metadata are correct;
- no unsupported superlatives, fake completeness claims, synthetic facts or placeholder values appear;
- the database does not automatically generate indexable detail pages that fail the independent-value test;
- production is checked after deployment rather than assuming a merged pull request is complete.
