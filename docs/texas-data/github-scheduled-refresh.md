# Texas by the Numbers — GitHub-owned data refresh

The publication authority remains `keeptxred/TexasDefined`, with protected GitHub deployment to the existing Cloudflare Worker. No ChatGPT schedule, builder credits, pageview-triggered broad fetches, or new paid infrastructure is required for these scheduled jobs.

## Current scheduling

| Family | Job | Timing | Publication behavior |
| --- | --- | --- | --- |
| Metropolitan employment | `.github/workflows/refresh-texas-data.yml` | Monthly on the 5th, 12:41 UTC | Verifies BLS monthly release and Table 3; a newer or revised 13-metro snapshot creates a governed PR; the `Finish Texas Data Refresh` owner-side workflow validates the exact PR head and enables protected auto-merge |
| Property-tax rates | `.github/workflows/sync-property-tax-rates.yml` | Monthly on the 3rd | Updates verified rows in the existing Supabase rate registry, including historical revisions; fail-closed |
| County housing | `.github/workflows/refresh-acs-county-housing-costs.yml` | Monthly on the 6th | Checks whether the next official ACS five-year Table-Based Summary File is published. Only after all four fields and all 254 counties validate does it roll the maintained snapshot to the next vintage, open a scoped PR, and use the `Finish ACS County Housing Refresh` protected auto-merge workflow. Archived source records are not fabricated. |
| Homeowners insurance | `.github/workflows/refresh-tdi-homeowners-current.yml` plus existing Supabase TDI source monitor | GitHub weekly Mondays 12:37 UTC; Supabase Mondays 12:02 UTC | Checks paired official TDI premium/coverage chart series and policy type; when figures change, a governed GitHub PR updates the latest premium dataset and hub tile through protected auto-merge. The separately dated 2016–2025 research remains archival. |
| Homestead exemption and TxDOT traffic coverage | `.github/workflows/refresh-texas-reference-facts.yml` | Monthly on the 10th, 13:19 UTC | Rechecks the current Comptroller 11.13(b) exemption and TxDOT published count/station thresholds; when verified values change, opens a protected PR finished through `Finish Texas Reference Facts Refresh` |

## Official-source BLS update safeguards

- Prefer the BLS metropolitan summary and Table 3 directly. When BLS returns an access-denied response to the GitHub runner, use the Federal Reserve Bank of St. Louis FRED CSV containing the **same 13 named BLS monthly, not-seasonally-adjusted, total-nonfarm-payroll series**. Validate a complete common observation month, source identity, number units, reasonable change bounds, and a conservative forty-day period after that observation month ends before using FRED instead of a directly verified BLS metropolitan release. An FRED check date is not represented as the BLS press release date. Do not use similarly named seasonal or annual series.
- Reject missing releases, changed table structure, missing/duplicate Texas metros, invalid source date, a backwards release month, suspicious changes above 20% for a metro, or prematurely available FRED observations before the BLS metro news-release maturity window. Do not replace verified content when a source fails.
- The generated file is `src/data/generated/texas-metro-payrolls-current.json`. A stable `/texas-data/texas-metro-payrolls-latest` detail page and the four-metro hub comparison use it. Archived June and August 2026 briefs remain unchanged.
- Update the sitemap-safe date in `src/data/texas-data-center.ts` only after the source data is verified.
- The scheduled workflow is allowed to change **only** the generated BLS JSON and that sitemap-safe metadata file. It must never write directly to main.
- A `GITHUB_TOKEN`-generated PR does not trigger normal `pull_request` checks. The trusted `workflow_run` finisher reconciles with current main, dispatches existing validation workflows for the exact branch, verifies exact head/ancestry and then enables normal protected GitHub auto-merge; it never force-pushes or bypasses required validation.
- Site updates deploy via `Deploy TexasDefined production` and its existing configured cache management.


## ACS annual rollover controls

- The monthly runner tries at most the next annual ACS five-year vintage, then the last verified release. An unpublished release (official first table HTTP 404) cannot become the site's data vintage.
- The importer requires the official Census Summary File source, four named Detailed Table columns, exactly 254 unique Texas county FIPS codes, and nonnegative numeric or explicitly unavailable cell values. A partially released or structurally changed vintage fails without overwriting the verified dataset.
- A changed verified snapshot enters an isolated GitHub PR. The owner-side ACS finisher checks exact PR identity, restricts changes to the one generated snapshot, dispatches existing required validation, and only then permits branch-protected auto-merge. The normal Cloudflare deployment pipeline handles cache and live verification.
- The visible county comparison, machine-readable temporal coverage and CSV filename use the maintained source vintage, not an embedded 2024 label. If Census changes table definitions, automatic replacement stops until the data semantics are reverified.

## Homeowners premium and coverage release controls

- The weekly GitHub job reads paired TDI chart alt-text series and requires the exact homeowners-policy definition plus continuous years beginning in 2016.
- New years and historical revisions undergo source/row count, revision-bound and magnitude checks. Unclassified figures stay preliminary; source failures preserve the prior publication.
- A changed generated TDI JSON and sitemap-safe registry date are verified by the owner-side Finish TDI Homeowners Refresh workflow with exact PR author/branch checks and required validation before protected auto-merge.
- The hub premium tile reads the rolling verified record. Independent 2016–2025 analysis and CSV remain a reproducible dated research record rather than being silently rewritten.

## Homestead and traffic-program updates

- The monthly source job validates *both* official Texas Comptroller and TxDOT pages before recording changes. Homestead values are the current general school residence-homestead exemption. They do not infer a tax-year effective date from the date the webpage was checked.
- TxDOT describes **more than** a given number of annual short-term counts and continuous stations. The stored figures are labeled lower-bound thresholds, not exact site or observation totals. Texas' 254 counties remain a fixed geographic fact, not a scraped measurement.
- When an official statement changes within conservative numerical limits, a generated JSON snapshot and the two affected sitemap dates enter a limited-scope GitHub PR. The owner-side finisher validates its exact head through the repository's required gate before protected merge; normal production deployment follows.
- When the official page is inaccessible, structural parsing fails, statements conflict, or numbers change beyond safety bounds, fail without changing published figures. An existing historical homestead year remains a historical record even when the current legal amount changes.

## Important remaining limitation

Official BLS employment, Census statewide population, ACS county housing, TDI homeowners premiums, Comptroller county rates, school-district rates, the general school homestead exemption and TxDOT published monitoring thresholds now have GitHub- or Supabase-owned review paths. **Not every dataset is completely automatic:** the standalone ACS state-to-state migration flow brief, its original dated historical comparisons and selected research articles retain separate source and editorial obligations. Never infer an effective law date or change an archived historical release merely because a newer official source appears.
