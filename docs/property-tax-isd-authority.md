# Texas ISD property-tax authority: sources, verification and coverage

## Scope and measured inventory (8 Nov 2026)

The production `texas_property_tax_rates` table contains **1,016 distinct school-district slugs and 5,069 annual records** for 2021–2025. **3,043 annual rows across 1,015 school districts** lack at least one separately reported M&O or I&S component. These are original Comptroller import gaps; missing values must remain null, not zero. District-specific rows should not be invented to satisfy authority scoring.

The shared `src/routes/property-tax.taxing-unit.$unit.tsx` handles all ISD pages. New generic content applies to every `type = 'school-district'` page: an illustrative school-only tax based on a *known taxable value*, a separate appraised-value/homestead scenario, 2026 state exemption guidance, comparison with five rate-neighbor school districts from the **same year and associated county**, source freshness, and parcel-level limits. Comparison rows are read from finalized state-reported records and neither add up district rates nor establish actual parcel jurisdiction.

## Separately certified local 2026 rates

Hood Central Appraisal District published 2026 adopted-rate table: https://hoodcad.net/truth-in-taxation-summary/

Six district slugs have independently verified locally adopted rates and breakdowns in `src/data/property/hood-cad-isd-adopted.json`: Tolar, Granbury, Lipan, Bluff Dale, Glen Rose, Godley. These are **not** 2026 Comptroller workbook records; pages retain original 2021–2025 state history, and statewide calculators continue using source-bounded state data.

Seventeen independently documented M&O/I&S pairs for the six Hood ISDs (2021 and 2023 across all six, plus 2022 for Bluff Dale, Glen Rose, Godley, Granbury and Tolar) are conditionally displayed only when they reconcile to the unchanged Comptroller yearly adopted total. Granbury ISD 2022 is independently verified by the district's [adopted tax history](https://www.granburyisd.org/apps/pages/index.jsp?pREC_ID=2449815&type=d&uREC_ID=3783265), Lipan 2022 is verified through the TEA adopted-rate workbook, and **Tolar 2022 is now resolved** using the original [Hood CAD adopted-rate posting for 2022](https://iswdataclient.azurewebsites.net/pubs/HOODCAD/TAX%20RATE-POSTING%20PER%20SEC.%2026.16/Copy_of_26.16_POSTING_OF_TAX_RATES.pdf) (page 1): **$0.947100 M&O + $0.281682 I&S = $1.228782 adopted total per $100**. The old Hood CAD HTML summary has misaligned cells; that layout error must not supersede the primary posted record. The original statewide rate data and calculators remain unchanged. No 2022 Hood-school rate conflict remains in this source set.

## Exemptions, method and validation

General school residence homestead exemption as of 2026: $140,000; qualifying 65+ or disabled homeowners may be eligible for an additional $60,000 school exemption and school tax ceiling; never double-apply overlapping age/disability exemptions. The shared ISD component now uses **tax-year-matched** historical exemptions when presenting an older published rate: 2021 $25,000, 2022 $40,000, 2023–2024 $100,000, and 2025–2026 $140,000. The additional age/disability exemption was $10,000 through 2024 and $60,000 starting in 2025. Unknown future-year exemptions must not be inferred. https://comptroller.texas.gov/taxes/property-tax/exemptions/

School rate history source: https://comptroller.texas.gov/taxes/property-tax/rates/
TEA school rates/finance source: https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-property-values-and-tax-rates

A year-specific tax illustration is not a statement of the complete property tax bill, nor a valuation or exemption adjudication for a particular parcel. Changes in value, boundaries or exemptions may produce an opposite actual bill trend from a nominal rate comparison.

`scripts/data/validate-isd-tax-authority.mjs` enforces six locally adopted rate arithmetic and source contracts; included in normal calculator gate. `.github/workflows/verify-property-tax-production.yml` checks six SSR pages across public and direct Worker origins daily and after deployments, including all 17 verified Hood/GISD historical pairs, with no unresolved Hood CAD 2022 caution, and independently verified TEA source-matched historical rows, canonical and noindex. `.github/workflows/verify-hood-isd-official-source.yml` rechecks original Hood CAD source weekly and fails on unexplained changes. The official rate importer already rechecks Comptroller annual files monthly and the full retained history annually.

## Remaining source-specific work — must not be misrepresented as complete

The original database contains 3,043 historical gaps, entirely in 2021–2023 (2024 and 2025 are complete). The **official TEA adopted-rate workbook** has now been independently reconciled by *six-digit school CDN*, district name, tax year and exact sum to the original Comptroller total. This produces **2,494 independently source-qualified historical M&O/I&S pairs across 940 ISD pages** stored in `src/data/property/tea-isd-historical-verified.json`. The source-only overlay is guarded again by exact total and official district identity on every server load, with TEA links beside the affected historical rows. The original Comptroller table and calculators remain unmodified. **549 original historical rows could not be independently reconciled against the TEA rate file** (548 remain without a certified component overlay after this separately verified Tolar 2022 PDF correction) (mostly tax-rate precision differences, plus nonmatching school names/CDNs); some also have local Hood CAD evidence. Other rows require original district/CAD adopted resolutions or an authoritative precision resolution. Do not derive missing M&O = total − debt without independent evidence. Keep state record and independently verified supplement provenance separate and flag source disagreements.

Specific release acceptance: all protected CI successful, branch merged through standard branch protection, serialized production deploy succeeds, dual-origin rendered pages verified, then assess authority grade with actual page evidence. An open PR is not a production fix.

## 9 Nov 2026 further template and source corrections

- The shared school homeowner illustration uses an exemption for the **same tax year as the rate**; future tax years fail closed rather than reusing an older law.
- Independently documented 2026 school rates appear as an explicitly labeled additional row in the historical chart and table where the Comptroller's newest workbook remains 2025. This does not mutate statewide source records or calculators.
- A future same-year dispute between Hood CAD and Comptroller suppresses the numerical homeowner example pending resolution.
- Hood CAD school-district comparisons link to each relevant district authority page; they do not imply two ISD rates apply to one parcel.
- The remaining **548 source observations without verified component overlays** must be investigated individually, including unmatched district identities and differing four- versus six-decimal rates. No source totals are fabricated. The weekly GitHub reconciliation fails if the official TEA workbook or matching state data changes; the entire snapshot must then be regenerated and re-certified.

## Verified statewide backfill rollout

- The original 2021–2023 gaps by year were **1,015, 1,014, and 1,014**; the TEA source verified respectively **850, 804, and 840** exact pairs. TEA matching rejected **549** rather than approximating components.
- New `scripts/data/reconcile-tea-isd-components.mjs` uses the original official spreadsheet, district IDs, names, and exact total arithmetic; `.github/workflows/reconcile-tea-isd-components.yml` repeats source/fingerprint checks every Thursday. It uses existing GitHub-hosted credentials and runs no database writes.
- `scripts/data/validate-isd-tax-authority.mjs` now validates all 2,494 static TEA observations plus the separately documented local history, year-specific exemptions, and HTML render contracts.
- `scripts/ci/verify-tea-isd-production.mjs` checks bounded samples of real 2021–2023 TEA-sourced rows on both live origins in the daily tax-only verification workflow. No 1,000-page sitewide scan occurs per deployment.
- Tolar ISD 2022 is verified by the primary Hood CAD adopted-rate posting with exact six-decimal component reconciliation; Lipan ISD 2022 is resolved using independently published TEA values.

## Individual district source-resolution queue (9 November 2026)

The existing weekly TEA evidence reconciliation now writes a bounded, immutable GitHub Actions artifact `isd-historical-source-gaps-<run_id>`. The report identifies every TEA-unmatched 2021–2023 school/year record by official district identifiers, year, existing Comptroller total, mismatch reason, and TEA proposed component evidence when available. It separately flags exact official local-CAD corrections already approved (including Tolar 2022) and does not double-count them as open gaps. The report documents **548 unverified annual records** after the verified Tolar PDF correction. Each requires a matching original district or CAD adopted-rate document and arithmetic/identity reconciliation before a supplement can be certified; no guessed or rounded differences are published. The existing shared page template continues to render unverified components as unavailable, without changing original totals.
