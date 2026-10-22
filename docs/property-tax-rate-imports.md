# Texas property-tax imports and local verification

## Authority and source boundaries

The Texas Comptroller's Property Tax Assistance Division publishes annual
Tax Rates and Levies workbooks by city, county, school district, and special
district at https://comptroller.texas.gov/taxes/property-tax/rates/.
These files represent taxing-unit reports submitted through appraisal districts;
a not-reported rate must **never** be converted to zero.

The importer is \`supabase/functions/import-texas-property-tax-rates/index.ts\`.
Production data is read through \`src/data/property/texas-tax-rates.server.ts\`,
and the published taxing-unit page is
\`src/routes/property-tax.taxing-unit.$unit.tsx\`.

## Runtime and CPU-limit protection

A prior import attempted to parse the four 2023–2025 XLSX files inside
a Supabase Edge isolate and returned HTTP 546 with `CPU Time exceeded`
(2026-10-21); the historical 2021 and 2022 requests succeeded.
The existing GitHub Actions sync now checks out this repository, installs
Deno v2 via `denoland/setup-deno@v2`, then executes **the very same**
`supabase/functions/import-texas-property-tax-rates/index.ts` with
`TEXAS_TAX_IMPORT_CLI=1` and `TEXAS_TAX_IMPORT_YEAR` for each year.
This avoids the Edge isolate's CPU budget without duplicating parsing rules
or weakening the transactional SQL finalizer.

For tax years 2023 onward, direct Edge HTTP calls return
`runner-required` with HTTP 409; to force a sync, use GitHub Actions
workflow_dispatch. JWT verification remains enabled on the Edge function.
The CLI uses the existing GitHub repository service-role secret, never a
client-side key.

## Routine monthly run

GitHub Actions \`.github/workflows/sync-property-tax-rates.yml\` runs on
the **3rd of each month at 11:23 UTC**, or via workflow_dispatch. The
\`RATE_HISTORY_LOOKBACK_YEARS\` repository variable defaults to 5:
in 2026 this checks **2026 down through 2021**, independently.
Every **January 3** scheduled run rechecks **all retained years starting
in 2021**, even after the oldest years fall outside the default rolling
monthly lookback. The existing manual workflow dispatch offers a
`full_history` checkbox to run that complete sweep at any time.
All other monthly runs keep the configured rolling lookback to reduce
network requests and runner time.
The importer returns \`unavailable\` when an official workbook is absent.
An unavailable current year is an expected publication delay; a missing
previously published year, HTTP/download failure, incomplete workbook,
failed validation or database/RPC failure is a failed GitHub Actions run.
Check its per-year workflow summary. Do not run destructive manual SQL.

Each runner iteration downloads all four official XLSX files **before staging any data**,
stores SHA-256 checksums and source URLs, validates jurisdiction counts,
identities, duplicate keys, allowed years, rates, source statuses and
component reconciliation, and preserves original parsed source rows.
A year whose source signature and record count have not changed is skipped
without modifying \`imported_at\` or rewriting database rows.

For a changed year, the importer writes an isolated staging run in 300-row
batches, then calls \`finalize_texas_tax_import\` once. Inside **one
PostgreSQL transaction**, it obtains a per-year advisory lock, checks
the complete normalized and source stage, enforces at least 90% of the
existing year's record count, refuses stale concurrently completed sources,
replaces published rates and original parsed records, validates final counts,
and commits audit metadata. Any error rolls back the entire replacement.
Imports of the same exact source are idempotent.

Tables:
- \`texas_property_tax_rates\`: published normalized official statewide data.
- \`texas_tax_import_runs\`: source hashes, file identities, counts, timestamps,
  outcomes and diffs. Service-role access only.
- \`texas_tax_import_stage\` / \`texas_tax_import_raw_stage\`:
  temporary per-run writes, service-role access only. Incomplete/failed runs
  may leave unreferenced staging rows; do not treat them as published data.
- \`texas_tax_import_source_rows\`: original parsed official workbook
  records, preserved separately from normalized values and local corrections.
- \`texas_tax_local_verified_rates\`: evidence-backed display-only local rates.
  Public readers can see verified records; only service-role can edit.

Do not expose the service-role token to client bundles, logs, or browser code.

## Locally verified supplements

Escobares 2024 is supported by Starr CAD: **0.340447 total =
0.263594 M&O + 0.076853 I&S**. The published Comptroller row retains
\`not-reported\` and null numeric fields. The local supplement references
official unit \`214-103-03-214-214\`, identifies its source agency and
the report and rate-component documents, and provides the verification date.

The history page joins an exception only when **year + unit type + slug +
official ID** agree. It labels supplemental rates, corroboration, or
conflicting statewide/local figures and links authoritative evidence.
Tax estimators, statewide summaries and parcel calculations **do not**
consume these display-only supplements.

For another local exception, obtain primary-source evidence for the **same
tax year and jurisdiction**, confirm total = M&O + I&S whenever both
components exist, save the source agency/URLs/verification date and
document the reporting discrepancy. Do not infer rates. Unverified candidates
remain unaltered. Source changes or conflicts need re-review.

## Union Valley 2021–2022 official-source disagreement

Hunt County Appraisal District's published [2021](https://hunt-cad.org/wp-content/uploads/2022/01/2021-Tax-Rates.pdf)
and [2022](https://hunt-cad.org/wp-content/uploads/2022/10/2022-Tax-Rates.pdf)
adopted rate charts each list the City of Union Valley (`CUV`) city
property-tax rate as **0.000000** in both the Quinlan ISD and Royse City
ISD portions. Taxes from the county, schools, and other taxing districts
are separate.

The Comptroller's 2021 raw workbook lists the city unit as
`not-reported`. Its **2022** city workbook instead lists
**0.287248** with a small reported levy. This is an actual
source-level disagreement, **not** a formatting problem.

The 2021 documented local zero may be shown as a display-only
supplement. For 2022, retain the Comptroller's 0.287248 original
record and show an explicit **local 0.000000 vs statewide 0.287248**
conflict, including the local primary-source link. Do not silently
override statewide data, apply either figure automatically to a
tax calculator, or assume which filing was authoritative without
further source investigation.

The 2023 Hunt CAD record also shows zero but the normalized
Comptroller dataset has no 2023 Union Valley taxing-unit row.
Do not fabricate an official 2023 normalized record or a nonexistent
history entry. If more authoritative year-specific documents become
available, investigate and document them separately.

## Cross-workbook taxing-unit identity and display precision

Historical source categories are not necessarily unique by slug. A live
database audit on 2026-10-21 found **The Woodlands Township** in both
the *city* and *special-district* Comptroller source workbooks for
2021–2023; both rows use identical rates for each of those years but
different per-county official taxing-unit IDs. For 2024–2025, only the
special-district classification remains, with Harris and Montgomery
counties joined to the same unit.

The single public history URL must not show eight records as eight
separate tax years or treat it as two independent overlapping taxes.
When a slug has conflicting historical types, the public history
selects the unique type used in its latest recorded year. An explicit
API \`type\` filter still retrieves either original source classification;
the statewide source rows are never altered. If multiple types exist
in the latest year, the server fails closed and requires an explicit
type rather than inventing a conflation. Future new cross-type
collisions should receive a source-identity review.

Verified local rates can carry **seven or eight decimals** whereas
standard Comptroller records currently use six. The user-facing
history and latest-rate facts must preserve extra documented
precision, e.g. **Culberson County 2025 = 0.1330247** and not a
rounded **0.133025**. Genuine six-decimal numbers retain their
six-decimal formatting, including a genuine zero city levy.

The deployment's existing local-financial smoke suite now checks
all sixteen recorded local supplements, their government sources,
and both production entry points. It also checks a five-year
nonduplicated Woodlands history. Add new verified supplements to
those source-qualified checks without inventing numeric values.

## Unattended verification of local rate evidence

After every successful scheduled or manually dispatched official tax-rate
import, the **same GitHub runner** also checks every currently verified
local tax-rate supplement against its year, unit type, slug and official
taxing-unit ID in the newly published Comptroller data. This read-only
audit validates HTTPS evidence attribution, component reconciliation and
explicit classifications (supplement, corroboration or disagreement).
If a source revision causes an orphaned identity, invalid documented
rate, or **newly conflicting official/local rate**, the scheduled job fails
rather than silently dropping the displayed supplement or accepting a newly
contradictory figure. Only the exact documented **2022 Union Valley**
Hunt CAD 0.000000 versus Comptroller 0.287248 difference (official
unit 116-111-03, Hunt CAD source host) may pass as an explicit known
conflict; changed rates, years, official identities, or purported evidence
cause review. No statewide rows or calculator values are changed.

The check uses the existing Supabase service credential and the already
installed Deno runtime, with no extra paid service, new key, or additional
schedule. Unit tests include genuine zero-levy cases and a source
disagreement. GitHub job summaries expose only counts, not secrets.

## SEO treatment of independently verified historical city rates

A taxing-unit history is indexable when it has at least **three distinct
source-qualified annual rate records**, including primary-source local
supplements where the corresponding Comptroller workbook explicitly
did not report a rate. This recognizes local authority pages such as
Post Oak Bend's independently documented zero-city-tax years 2021,
2024 and 2025 without claiming the city imposed a parcel-wide zero bill.
A local-vs-Comptroller **conflict never counts as an additional
independently verified observation**; it must remain visibly disputed.

Thin histories stay `noindex, follow`. Local historical supplements
remain strictly **display-only**: statewide summaries and tax calculators
still use the untouched original Comptroller rows.

## Complete source attribution and regression coverage

The Dataset structured data of a taxing-unit rate-history page now lists a
deduplicated `citation` for **every underlying Comptroller year workbook**
represented in that page, plus all primary locally verified supplements.
Citing only the latest workbook is misleading when that workbook contains
no observation for a previous year. The source metadata does not imply
that a local supplement replaces the Comptroller record.

The canonical-domain and direct-Worker local-financial release gate covers
**16 year-specific primary-source observations across 13 unique slugs**,
including Post Oak Bend's 2021, 2024 and 2025 zero city tax records,
Union Valley's 2021 zero and 2022 state/local disagreement, and a
nonduplicated five-year history for The Woodlands Township. Do not
add inferred annual figures to satisfy these tests.

## Independently verifiable tax authority during unrelated deployment failures

The default production deployment already verifies the 15 source-qualified
local observations, historical Woodlands classification, and both public
entry points. If the Worker deploy succeeds but an unrelated events or
editorial check subsequently fails, the overall release becomes red even
though the tax pages may still be available.

The `.github/workflows/verify-property-tax-production.yml` action now
runs a **read-only, tax-only** verification after a failed main-branch
production workflow. It also supports `workflow_dispatch` for on-demand
verification without rebuilding the site. It uses the same existing
canonical/direct-Worker smoke script, excluding unrelated affordability,
cost-of-living, salary and sitemap tests. This does not touch Supabase,
Cloudflare settings, credentials, or calculator data.

An independently green check proves the **currently served** tax pages are
healthy on both endpoints. It cannot prove that the failed release's
specific Git commit was deployed, and does not replace the protected
production deployment gate. Cancelled deployments do not trigger an
independent tax check.

## Daily independent verification of live taxing-unit pages

The separate GitHub workflow `.github/workflows/verify-property-tax-production.yml`
now runs automatically each day at **10:17 UTC**, as well as on demand and
after a failed production deployment. The main deployment pipeline may
legitimately skip local-financial smoke when unrelated routes change;
a successful build or Cloudflare publish therefore is **not** proof that
the 15 primary-source local-rate observations are displayed correctly.

This independent read-only workflow checks the **currently served**
canonical `https://texasdefined.com` and direct
`texasdefined-site.freddy-coppola.workers.dev` tax-history pages for
all 15 verified year-specific local observations, source attribution,
explicit discrepancies and zero-city-tax cautions, evidence notes and
verification dates, plus the Woodlands classification guard.
It does not modify tax database records, calculator inputs, or Worker deployments.
Failures are visible in GitHub Actions. It requires no Cloudflare
reconnection or separate paid monitoring service.

## Recovery procedure

1. Open the failed GitHub workflow and check the **per-year outcomes**.
2. For current-year \`unavailable\`, confirm the Comptroller has published
   all four workbooks; do not force a partial import.
3. For historical \`unavailable\`, HTTP failures or workbook-format changes,
   recheck official URLs and parsing without modifying published data.
4. For `HTTP 546` / Edge CPU limit errors, confirm GitHub Actions is running
   the pinned importer via Deno CLI rather than calling heavy workbook
   parsing through the Edge HTTP endpoint.
5. For validation errors, inspect the reported year/type/IDs, source
   provenance, minimum-record guard and reconciliation. Do not disable gates
   to make a red workflow green.
6. For SQL errors, inspect \`texas_tax_import_runs\` and staging counts using
   a privileged server-side/admin connection. A failed finalization leaves
   the previous published year intact. Fix the root cause and rerun workflow.
7. To confirm status, query the official rates grouped by year, last
   completed import source signature, raw-source row counts, and missing/
   inconsistent components. Use the existing production smoke verification
   for the Escobares page and direct Worker.
8. Never delete or manually overwrite \`texas_property_tax_rates\` to recover;
   run the validated importer once the source and database issues are fixed.

Rollback testing is supported by the \`p_simulate_failure\` argument to the
privileged \`finalize_texas_tax_import\` RPC. Use only in a transaction or
an isolated test environment with complete staging; the exception occurs
**after the DELETE** and must leave prior records fully intact.

## Deployment order

Merge after checks; apply migration
\`20261021184000_atomic_tax_rate_sync_and_local_sources.sql\` to the
connected production database; deploy the Edge Function source from the
same commit via the Supabase connection; allow the established
GitHub-to-Cloudflare deployment to publish the server-rendered page.
Verify page data, SQL counts, and the scheduled workflow without requesting
Cloudflare reauthorization or cache purging.

## Additional official 2024 supplements

Starr CAD's 2024 entity-tax-rate list supports these additional
individually identified city taxing units:
- Roma: 0.567900 total = 0.499077 M&O + 0.068823 I&S
  (`214-101-03-214-214`).
- Rio Grande City: 0.521090 total = 0.372960 M&O + 0.148130 I&S
  (`214-102-03-214-214`, named City of Rio Grande in the CAD list).

The City of Southside Place's official property-tax FAQ confirms its
2024 total rate of 0.340896 (`101-115-03-101-101`). M&O and I&S
components are unavailable and must remain null.

## Additional 2024 city primary-source supplements (2026-10-21)

Four more Comptroller `not-reported` city rows have independent adopted-rate
evidence, verified against the exact jurisdiction identity and **not**
substituted into the statewide database or parcel calculators:

| City | Official 2024 total / $100 | M&O | I&S | Primary source |
|---|---:|---:|---:|---|
| Little River-Academy | 0.410001 | 0.410001 | 0.000000 | [Bell CAD 2024 chart](https://bellcad.org/wp-content/uploads/2024/11/2024_TAX_RATE_CHART-TLR.pdf), jurisdiction TLR |
| Cooper | 0.649272 | 0.627046 | 0.022226 | [Delta CAD 2024 rate list](https://delta-cad.org/wp-content/uploads/2025/12/2024-Tax-Rates.pdf), Cooper City |
| Miami (Roberts County, TX) | 0.870299 | unknown | unknown | [Roberts County 2020–2024 Truth in Taxation summary](https://www.co.roberts.tx.us/upload/page/9355/5%20year%20tax%20summary%202020-2024.pdf), 2024 adopted City of Miami |
| Stafford | 0.000000 — no municipal levy | unknown / not levied | unknown / not levied | [City of Stafford tax structure](https://staffordtx.gov/479/Tax-Structure) and [2024 no-property-tax commitment](https://staffordtx.gov/Archive/ViewFile/Item/652) |

Stafford is a genuinely **zero-city-tax** locality, not an unreported
numeric observation. Label the verified city-level zero without suggesting
that county, school, or other parcel-level taxes are zero. Miami's components
remain null rather than fabricated. All evidence is a historical,
display-only supplement.

## Additional 2025 county and city supplements

Independent 2025 records were also documented, using the exact year,
type, slug and official ID with no calculator or Comptroller-data changes:

- Town of Van Horn, Culberson County: **0.4921230** adopted city rate.
  Source: [Culberson CAD 2021–2025 historical rates](https://culbersoncad.org/Forms/GetDocument?fileName=1777645674_Countywide+Tax+Rate+History.pdf&subPath=Data+Records).
- Culberson County general rate: **0.1330247**. The same CAD document
  separately lists **0.0198770 F&M** (farm-to-market), which must not
  be silently merged into the county general rate or presented as an
  entire parcel's total property-tax rate. Individual components are
  intentionally null when not explicitly identified.
- Post Oak Bend, Kaufman County: **0.000000 city levy**. Its official
  [mayor's statement](https://postoakbend.org/mayor/) confirms the city
  does not levy property tax and funds services from sales tax. It
  cannot be interpreted as zero parcel-wide property taxes.

## Poetry 2023 independently certified zero municipal rate

Kaufman CAD's [2023 Certified Totals, page 102](https://kaufman-cad.org/wp-content/uploads/2023/07/2023-Certified-Totals-Partial-Exemption-List.pdf)
explicitly identifies `TP - TOWN OF POETRY`, lists 378 accounts,
a taxable value of $43,459,008, a municipal rate of **0.000000 per $100**,
and an approximate municipal levy of $0.00. The original 2023
Comptroller `not-reported` row is preserved, while independently
certified 2023 city-only evidence appears solely in the history display.
Other taxing units may still levy taxes on a property.

This **does not establish Poetry's final 2024 adopted municipal rate**.
The town's April and May 2024 newsletters say there were zero city
property taxes at that time, but do not settle whether the city
subsequently adopted a rate for the 2024 tax year. Do not extrapolate.

## Remaining research candidates (not automatic overrides)

The **2024 Poetry and Scurry** city records remain not-reported
in the official Comptroller workbook, without independently verified
adopted-rate numbers. The Kaufman CAD published 2024 municipal list
does not establish numeric city rates for either town. Do not infer a
zero municipal rate from omission. Unlike those unresolved cases,
**Post Oak Bend 2024 now has independently documented evidence of
no city levy**, stored only as a clearly labeled local supplement;
the original Comptroller row remains not-reported.

The [Town of Poetry's ordinance register](https://www.poetrytexas.org/ordinances)
records an April 18, 2024 ordinance related to ad valorem taxation
and its repeal on September 17, 2026 (Ordinance 2026-09-17-01).
Neither the presence nor repeal of that ordinance supplies a reliable
**2024 adopted rate**, or proves the city imposed a levy.
The source is useful context for future verification, not permission
to invent a numeric value.

These are **research candidates only**; add a numerical local rate
only after establishing primary-source adopted-rate evidence for
the specific year and jurisdiction.
