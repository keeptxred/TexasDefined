# Texas Defined: 254 county authority project

## Outcome, not a ranking claim

Make each canonical `/county/{slug}` page a genuinely useful, deeply researched local reference. “Best authority page on the internet” is an editorial aspiration, **not** a claim we can make or certify from a word count or a green CI run. A page becomes *editorially certified* only after independent human review against reliable sources and real local services.

## Required county-specific substance

1. **Identity and geography:** precise county seat; census-year population and land/water area; original local landscape and county-boundary explanation; identify uncertainty when data is unavailable.
2. **History:** founding/organization, changing county seat (when relevant), Indigenous and local histories, settlements, economic transitions, turning points, and preservation resources. Verify specific dates and unusual claims.
3. **Communities and travel:** meaningful towns; real visitable landmarks, parks, museums, rivers, trails, food/culture and practical touring suggestions. Never portray private property as open to visitors or invent hours or prices.
4. **Government and local services:** link the actual county government site, county clerk/elections where available, appraisal district, tax assessor-collector, TxDMV county-office finder, DPS for driver's licenses, school districts, emergency contacts where sourced; distinguish appraisal vs payment vs title/registration. Do not invent an individual office, name, phone, or address. Check critical links and mark the *date* of the source, not the date code was deployed.
5. **Living and working:** appropriate sourced housing, tax, employment, schools, flood/wildfire exposure, water and utilities; explain differences between a county and a mailing city and label dated statistics.
6. **Internal navigation:** link *relevant* neighboring counties and local destinations/events; avoid generic related-content filler.
7. **Research evidence:** at least five independently useful research links, including county-specific archival/historical research and state/local primary sources, from at least three reputable publishers. A historical article citation is different from a government office directory and an image credit.
8. **Original insight:** explain what distinguishes this county from 253 others; a template, long introduction or generic state overview cannot qualify.
9. **Published quality:** visible sources and methodology, editorial author and publication/update dates, accurate images with rights/credit, stable canonical, accessibility, functioning internal links, structured data, no placeholder or duplication.

## Evidence and stage model

- **Structural audit:** all 254 routes load, pass canonical/indexing/redirect checks, and meet the existing article baseline. This is *not* authority certification.
- **Source-readiness audit:** `scripts/data/inventory-county-series.mjs` generates `county-profiles.json` and `county-profiles-authority-backlog.tsv`. Metrics measure sourced research, diversity, county-specific citations, article structure, internal county links and whether local office contacts have been preserved in a checked-in snapshot. These are **signals only**; live office services may exist even when no snapshot is available.
- **Source validation:** compare dates, people, addresses and outbound links to primary official county agencies, the Texas Comptroller, TxDMV, Texas State Library, U.S. Census and reputable Texas history resources. Network failures are recorded as *inconclusive*, never silently converted to “valid.”
- **Independent editorial acceptance:** review factual claims and actual places, not just totals. Mark an article as accepted only after that review; do not auto-certify on metrics.
- **Production acceptance:** run the complete 254-county canonical crawler after each substantive county-family change. Keep a prioritized residual-failure list.

## Authority work sequencing

Take the entire backlog in ranked groups, not arbitrary batches of repeated boilerplate. Start with counties missing published research citations and credible local contacts, then those with weaker unique history, practical resources or current fact checks. Preserve strong existing content. Update and verify individual counties as source-backed work lands. Do not label remaining counties “complete” to satisfy a schedule.

## Source starting points

- [Texas State Library — county seats](https://www.tsl.texas.gov/ref/abouttx/countyseats.html)
- [Texas Comptroller — county property tax and appraisal directory](https://comptroller.texas.gov/taxes/property-tax/county-directory/)
- [Texas Department of Motor Vehicles — county offices](https://www.txdmv.gov/tax-assessor-collectors/county-tax-offices)
- [U.S. Census Bureau — geography](https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html)
- [Handbook of Texas](https://www.tshaonline.org/handbook)

Last reviewed for this project: 2026-10-08. County-specific data must be checked again before writing “last verified” on any page.
