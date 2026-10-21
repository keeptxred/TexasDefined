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

Each run downloads all four official XLSX files **before staging any data**,
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
4. For validation errors, inspect the reported year/type/IDs, source
   provenance, minimum-record guard and reconciliation. Do not disable gates
   to make a red workflow green.
5. For SQL errors, inspect \`texas_tax_import_runs\` and staging counts using
   a privileged server-side/admin connection. A failed finalization leaves
   the previous published year intact. Fix the root cause and rerun workflow.
6. To confirm status, query the official rates grouped by year, last
   completed import source signature, raw-source row counts, and missing/
   inconsistent components. Use the existing production smoke verification
   for the Escobares page and direct Worker.
7. Never delete or manually overwrite \`texas_property_tax_rates\` to recover;
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

## Existing audit targets (not automatic overrides)

The 2024 city records for Little-River Academy, Cooper, Miami, Poetry,
Post Oak Bend, Rio Grande City, Roma, Scurry, Southside Place, and
Stafford were marked not-reported in the database on 2026-10-21.
These are **research candidates only**; do not add a local rate unless
the appropriate CAD/city provides adequate official evidence.
