# Citation Magnet Batches 2.11–2.12

Status: **implemented for validation with official Census sources**

- **2.11 — Texas county population/growth comparison:** `/texas-data/county-growth-housing` loads the U.S. Census Bureau Population Estimates Program Vintage 2025 county totals and calculates change from the April 1, 2020 estimates base to the July 1, 2025 population estimate for Texas counties. It does not relabel the 2020 estimates base as a decennial Census count.
- **2.12 — Texas county cost/property comparison:** the same canonical resource joins 2024 ACS 5-year county estimates for median owner-occupied home value (`B25077_001E`), median gross rent (`B25064_001E`) and median household income (`B19013_001E`). These are presented as statistical housing/income context, not current market listings, appraisal values or a subjective affordability ranking.

## Data integrity rules

- Sources are joined by five-digit county FIPS.
- Missing or negative ACS sentinel values remain unavailable.
- A failed Census source is not replaced by fixtures or secondary estimates.
- The page is `noindex, follow` unless both official source families return a near-complete Texas county set.
- Population and ACS fields retain their separate reference periods and methodologies.
- The resource is linked from Texas Data and the county comparison, promoted in `citation-magnets.json` and `llms.txt`, and protected by the citation-magnet regression validator.
