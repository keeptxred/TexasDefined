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

## Remaining research candidates (not automatic overrides)

The 2024 city records for Poetry, Post Oak Bend and Scurry were still
marked not-reported in the Comptroller dataset on 2026-10-21. Kaufman
CAD's 2024 published rate list does not include a separately adopted
municipal rate for these towns. No numerical supplement was invented.

These are **research candidates only**; do not add a local rate unless
the appropriate CAD/city provides sufficient official year-specific
evidence and exact taxing-unit identity.
