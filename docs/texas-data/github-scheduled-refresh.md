# Texas by the Numbers — GitHub-owned data refresh

The publication authority remains `keeptxred/TexasDefined`, with protected GitHub deployment to the existing Cloudflare Worker. No ChatGPT schedule, builder credits, pageview-triggered broad fetches, or new paid infrastructure is required for these scheduled jobs.

## Current scheduling

| Family | Job | Timing | Publication behavior |
| --- | --- | --- | --- |
| Metropolitan employment | `.github/workflows/refresh-texas-data.yml` | Official-release window: daily on the 25th–31st and 1st–5th, 16:41 UTC; FRED fallback 40-day maturity checks on the 9th, 12th and 16th (16:41 UTC) | Verifies BLS monthly release and Table 3; a newer or revised 13-metro snapshot creates a governed PR; the `Finish Texas Data Refresh` owner-side workflow validates the exact PR head and enables protected auto-merge |
| County office contacts | `.github/workflows/sync-county-property-data.yml` + `.github/workflows/finish-county-property-refresh.yml` | Weekly Mondays 11:37 UTC, plus source/finisher changes | Checks all 254 Comptroller county pages. Ambiguous HTTPS links retain their original dated evidence, not a fake re-verification. Generated two-file PRs receive trusted bot/source identity checks, **zero deletion** and preservation of source-backed search/payment URLs, complete canonical validation, and GitHub protected auto-merge; failures stay on hold. |
| Property-tax rates | `.github/workflows/sync-property-tax-rates.yml` | Monthly on the 3rd | Updates verified rows in the existing Supabase rate registry, including historical revisions; fail-closed |
| County housing | `.github/workflows/refresh-acs-county-housing-costs.yml` | Monthly on the 6th | Checks whether the next official ACS five-year Table-Based Summary File is published. Only after all four fields and all 254 counties validate does it roll the maintained snapshot to the next vintage, open a scoped PR, and use the `Finish ACS County Housing Refresh` protected auto-merge workflow. Archived source records are not fabricated. |
| Homeowners insurance | `.github/workflows/refresh-tdi-homeowners-current.yml` plus existing Supabase TDI source monitor | GitHub weekly Mondays 12:37 UTC; Supabase Mondays 12:02 UTC | Checks paired official TDI premium/coverage chart series and policy type; when figures change, a governed GitHub PR updates the latest premium dataset and hub tile through protected auto-merge. The separately dated 2016–2025 research remains archival. |
| Homestead exemption and TxDOT traffic coverage | `.github/workflows/refresh-texas-reference-facts.yml` | Monthly on the 10th, 13:19 UTC | Rechecks the current Comptroller 11.13(b) exemption and TxDOT published count/station thresholds; when verified values change, opens a protected PR finished through `Finish Texas Reference Facts Refresh` |

## Official-source BLS update safeguards

- BLS direct-source checks run around its expected late-month press release; separate GitHub checks on days 9/12/16 ensure that a FRED fallback can actually pass the conservative 40-day maturity gate after a source-blocked BLS release. Source failures never rewrite the verified snapshot.
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

## Census county population rollover

- `.github/workflows/refresh-texas-county-growth.yml` checks official U.S. Census county totals on the 15th of every month (13:17 UTC). The first verified source snapshot is generated once on the protected feature branch; routine updates create scoped GitHub PRs.
- `scripts/data/refresh-texas-county-growth.mjs` advances at most one published Census county vintage. Until Census actually releases Vintage 2026 (currently scheduled for March 2027), the verified Vintage 2025 snapshot remains authoritative. Missing or inaccessible official sources never cause a guessed rollover.
- The importer requires the correct vintage-specific official county CSV; all 254 unique odd-numbered Texas county FIPS from 48001 through 48507; matching county identities, 2020 estimates-base and current vintage estimate columns, positive numeric cells, source structural consistency, and an exact county sum matching the official state row. Unusual changes or a new decennial estimates base require intervention rather than silent replacement.
- Both `/texas-data/county-growth` and its CSV read the same GitHub-generated JSON with a server-function boundary: no full national CSV download on individual visits. Year labels, temporal coverage, CSV filename and structured-data last-modified reflect only verified published snapshots, and the sitemap does not pretend a source-check date is a Census release date.
- `Finish Census County Growth Refresh` only accepts the expected bot-authored, run-linked, single-snapshot PR, reconciles current main, runs the repository's required validation and merge gate, then enables protected auto-merge. No ChatGPT automation and no direct Cloudflare publication are involved.
- Older Census vintages and standalone migration research are intentionally dated publications; do not join data from differing Census vintages or silently rewrite historical analysis. On the next decennial population estimates-base reset, automated county population publication stops until the methodology is explicitly reviewed.

## County office source-date contradiction protection

- The weekly 254-county official Texas Comptroller directory importer retains a previously source-current appraisal/tax-office contact **and its original lastVerifiedAt** whenever a reachable page's later date or HTTPS redirect is ambiguous, contradictory or inaccessible. A newer apparently stale date is not evidence that a previously valid county government office has vanished; the affected office is quarantined for manual review with a GitHub warning and source-date diagnostics.
- An existing county record may be automatically withdrawn only when its **own prior official office dates are already outside the 730-day limit and the newly parsed official office dates independently prove the entry is stale**. The retained last-verified date is never silently advanced for a quarantined office; source and indexing gates still age out stale evidence. Generated data-only county-contact PRs now require exact bot/source-run identity, the official county URL allowlist (including the five multiword filename exceptions), 108-or-more retained contacts with zero removals, preserved search/payment URLs, and full protected CI before unattended native auto-merge. After the multi-minute gates, the finisher rechecks the exact validated head and main ancestry. A main advance is allowed only if its history is fast-forwarded from the validated baseline and its diff has **no county data, code, source-check, dependency, or protected-validation-contract changes**. Any relevant drift fails closed rather than auto-merging an unvalidated county baseline. Unresolved office links remain quarantined with their prior verification dates; only those source questions require manual research.
- Published office URLs cannot point to access-denied or account-lockout redirects. Only time-token suffixes on the two explicitly researched public property-search vendors may be removed, while preserving their original county-specific dbkey and any meaningful query fields. No arbitrary URL or stale source is promoted by this normalization.

## Registry coverage and publication semantics

The following are the 13 maintained briefs in the Texas Data server registry. The four featured cross-vertical datasets are separate.

| Registry slug | Official-source owner / maintained mechanism | Publication policy |
| --- | --- | --- |
| county-property-tax-rates | Comptroller adopted rates; monthly sync-property-tax-rates.yml import to Supabase | Latest full final adopted-year sample; archived 2024 fallback |
| school-district-tax-rates | Comptroller annual rates, same maintained import | Latest verified school-district adopted-year figures |
| homestead-exemption-history | Comptroller, refresh-texas-reference-facts.yml | Current general exemption automatic; older legal years preserved |
| texas-population-and-migration-2025 | Census Vintage 2025 state population | Dated historical interval; preserve |
| texas-population-and-migration-2024 | 2024 interval revised using the 2025 Census vintage | Dated historical interval; preserve consistent methodology |
| where-new-texans-came-from-2024 | 2024 ACS state-to-state migration flows | Archived original dated research; new ACS flows need separate official method verification |
| texas-homeowners-premium-history | TDI dated historical premium series | Reproducible archived analysis |
| texas-homeowners-premium-latest | TDI weekly refresh-tdi-homeowners-current.yml | Automatic paired-chart review and protected merge |
| texas-metro-payrolls-june-2026 | Dated BLS metro release | Archive; preserve |
| texas-metro-payrolls-august-2026 | Dated BLS metro release | Archive; preserve |
| texas-traffic-monitoring-coverage | TxDOT in refresh-texas-reference-facts.yml | Automatic official threshold checks, not invented exact totals |
| texas-metro-payrolls-latest | BLS monthly refresh-texas-data.yml | Automatic source-verified, protected PR |
| texas-population-and-migration-latest | Census annual refresh-texas-state-population.yml | Automatic sequential vintage verification |

Separate featured distributions: county growth (new monthly source-controlled Census verification), county housing (existing monthly ACS five-year refresh), city-to-county relationships (canonical maintained geography), sports venues (verified venue-directory reference values). The two directory-derived distributions should not have artificial official numeric updates; their source of truth is their maintained underlying directories.

A successful check run is not proof that newly published statistics reached users. Require evidence of source validation, changed source snapshot or registry, generated PR, merge validation, matching deployed commit, and updated public values. A missing next official release should explicitly preserve the verified previous vintage.

## Continuous bounded production data acceptance

A successful Cloudflare deployment must execute the existing `TexasDefined publication production smoke` GitHub workflow. Its small Texas Data acceptance verifies the public site and direct Worker hub, the current official BLS 13-metro detail and Census county vintage detail on both hosts, and four fixed-size CSV exports (254 Census county growth, 254 ACS housing, 57 city/county relationships and 84 sports venues). This check is now **unconditional after each successful production deploy**: a burst of commits can cancel the deployment that first changed the statistical snapshot and leave an unrelated later commit as the successful deployment. Diffing only that final commit incorrectly skipped official-vintage verification. The acceptance uses bounded public HTTP reads and no whole-site scan or paid service. A failure blocks the smoke and demands investigation; it cannot manufacture or roll back a source snapshot.

### Daily deployment-independent assurance

At **14:47 UTC every day**, the same protected publication-smoke workflow runs only its tiny official Texas Data acceptance and the existing automatic-publication-off check. Its 2 hub, 4 BLS/Census detail, and 4 CSV GET requests independently detect a stale public vintage when continuous main merges cancel earlier deployments. On scheduled invocations the unrelated news, museum, and Motel 6 marketing audits are skipped. The GitHub Actions concurrency key separates scheduled checks from release-triggered checks so one cannot cancel the other. A failed live result is visible in Actions and never writes source data or bypasses source-controlled publication. There is only one daily schedule in this existing workflow, not a duplicate refresh mechanism.
