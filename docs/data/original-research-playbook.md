# TexasDefined original-data research playbook

TexasDefined Research publishes small, maintained studies that answer one Texas question by calculating a result from reputable underlying data. The source agency owns the underlying facts; TexasDefined owns the normalization, comparison, ranking, derived metric, visualization and editorial explanation.

## Required publication package

Every research brief should ship with:

1. One precise question that can be answered from the available data.
2. A concise key finding near the top, with enough context to avoid a misleading ranking.
3. A complete sortable table whenever the source supports a complete comparison rather than only a top-ten list.
4. An original chart, map or other visual derived from the same maintained dataset.
5. A CSV download generated from the same rows used by the page.
6. A visible research record naming the TexasDefined Research Desk and editor, last-verified date and next-review trigger.
7. A methodology paragraph that identifies the source fields, calculation, exclusions, missing-value treatment and important limitations.
8. Primary-source links, with official or responsible-agency data controlling factual verification.
9. A recommended citation and stable canonical URL. Refresh the existing URL instead of publishing a replacement URL each year when the question is unchanged.
10. Internal links from the research table to the underlying TexasDefined county, lake, park, school, river, wildlife or historic-site profiles, plus a link back to the brief from the closest relevant hub.
11. Dataset structured data with creator/publisher, method, variables measured and DataDownload metadata where a CSV exists.
12. Conditional indexing when a required live dataset is unavailable or materially incomplete. Never publish a partial ranking as if it were complete.

## Calculation rules

- Keep missing source values missing. Never convert an unknown value to zero.
- Separate absolute change from percentage change when both can tell materially different stories.
- Do not silently mix vintages, years or incompatible definitions.
- Prefer a single authoritative release series for longitudinal comparisons.
- Label derived metrics as TexasDefined calculations.
- Retain enough source identity in exported data to reproduce the calculation.
- For rankings, document ties and secondary sort rules.
- Avoid causal language unless the underlying research design supports causation.
- If a metric is only a proxy, name the proxy explicitly in the headline, table and method.

## Current research series

### County population growth

Canonical page: `/texas-data/county-growth`

Primary source: U.S. Census Bureau Population Estimates Program, Vintage 2025 county totals.

Derived measures: numeric change and percentage change from the 2020 estimates base to the July 1, 2025 estimate. Preserve both because a small county can lead in percentage growth while a large county leads in people added.

### Property-tax rate changes

Canonical page: `/texas-data/property-tax-changes`

Primary source: Texas Comptroller of Public Accounts Property Tax Assistance Division statewide adopted-rate files.

Derived measures: year-over-year percentage-point change and relative percentage change. Include only clean matched records with finalized fixed total rates in both years. Do not describe an adopted-rate decrease as a household tax-bill decrease because taxable value, exemptions and taxing-unit combinations also affect bills.

### Lake fishing-target diversity

Canonical page: `/texas-data/lake-game-fish-diversity`

Primary sources: Texas Parks & Wildlife Department lake fisheries pages and the official sources attached to each maintained TexasDefined lake profile.

Derived measures: de-duplicated documented fishing-target count and target count per 1,000 surface acres. This is an editorial fisheries-comparison metric, not a biological species-richness census. Grouped profile categories such as catfish or sunfish remain grouped unless the underlying maintained profile is revised to species-level records.

## Research backlog

### Access to Texas state parks

First publish a county-level proxy: county population center or centroid to the nearest state park, clearly labeled as a geographic proxy. A later population-weighted study may support a statement such as the share of Texans living within a stated distance of a park, but that claim requires tract/block-group population geometry and should not be inferred from county centroids.

Recommended table: county, population, reference point, nearest park, straight-line distance, road distance if a reproducible routing source becomes available, region and park profile URL.

### Texas high-school football by region

Use maintained UIL/team data where authoritative participation or enrollment fields are available. Useful measures include teams per county, teams per 100,000 residents, classification distribution, six-man concentration and verified stadium capacity. Do not label team counts as athlete participation unless actual participation counts are sourced.

### Texas rivers

Build derived comparisons from the maintained river reference layer: length, basin, source, mouth, counties crossed, major reservoirs, parks and communities. Treat ambiguous length measurements and interstate/international river segments explicitly.

### State parks

Potential recurring studies include acreage distribution, camping capacity, water access and annual visitation change where TPWD publishes comparable annual figures. Preserve fiscal/calendar year definitions and distinguish park complexes from individual units.

### Wildlife and historic sites

Use the same research template for range overlap, county concentration, public-access distribution, designation chronology or preservation datasets when authoritative source coverage is sufficiently complete.

## Weekly workflow

1. Pick the question before gathering supporting prose.
2. Confirm a reputable source and its release/vintage date.
3. Test whether the available fields can answer the question without inventing missing data.
4. Calculate the full result and inspect outliers before writing the headline.
5. Build the canonical page, complete table, chart/map and CSV from one normalized result set.
6. Add source, methodology, citation, verification and next-review metadata.
7. Cross-link the entities represented in the rows and link the relevant hub back to the study.
8. Add route/indexing/sitemap and machine-discovery coverage.
9. Run route-governance, citation/download, type/build and SSR checks.
10. Preserve the stable URL on future refreshes and update `dateModified`/verification metadata only when the underlying research is actually refreshed.
