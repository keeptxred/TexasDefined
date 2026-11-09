# Texas ISD property-tax authority: sources, verification and coverage

## Scope and measured inventory (8 Nov 2026)

The production `texas_property_tax_rates` table contains **1,016 distinct school-district slugs and 5,069 annual records** for 2021–2025. **3,043 annual rows across 1,015 school districts** lack at least one separately reported M&O or I&S component. These are original Comptroller import gaps; missing values must remain null, not zero. District-specific rows should not be invented to satisfy authority scoring.

The shared `src/routes/property-tax.taxing-unit.$unit.tsx` handles all ISD pages. New generic content applies to every `type = 'school-district'` page: an illustrative school-only tax based on a *known taxable value*, a separate appraised-value/homestead scenario, 2026 state exemption guidance, comparison with five rate-neighbor school districts from the **same year and associated county**, source freshness, and parcel-level limits. Comparison rows are read from finalized state-reported records and neither add up district rates nor establish actual parcel jurisdiction.

## Separately certified local 2026 rates

Hood Central Appraisal District published 2026 adopted-rate table: https://hoodcad.net/truth-in-taxation-summary/

Six district slugs have independently verified locally adopted rates and breakdowns in `src/data/property/hood-cad-isd-adopted.json`: Tolar, Granbury, Lipan, Bluff Dale, Glen Rose, Godley. These are **not** 2026 Comptroller workbook records; pages retain original 2021–2025 state history, and statewide calculators continue using source-bounded state data.

Sixteen independently documented M&O/I&S pairs for the six Hood ISDs (2021 and 2023 across all six districts, plus 2022 for Bluff Dale, Glen Rose, Godley and Granbury) are conditionally displayed only when their sum matches the unchanged Comptroller yearly adopted total. Hood CAD's 2022 source table contains mismatched components for **Tolar, Granbury and Lipan**. The Granbury ISD district-published adopted tax history independently confirms its 2022 $0.854600 M&O + $0.145000 I&S = $0.999600 total (https://www.granburyisd.org/apps/pages/index.jsp?pREC_ID=2449815&type=d&uREC_ID=3783265), so its gap is now resolved. **Lipan 2022 is now independently corroborated** by the TEA adopted-rate workbook (M&O $0.940200 + I&S $0.335000 = total $1.275200). **Tolar 2022 alone remains disputed:** TEA's four-decimal components sum to $1.228700, but the Comptroller reports $1.228782. The difference is not silently repaired, and Tolar's 2022 components are not filled by subtraction. There is no silent 2022 override.

## Exemptions, method and validation

General school residence homestead exemption as of 2026: $140,000; qualifying 65+ or disabled homeowners may be eligible for an additional $60,000 school exemption and school tax ceiling; never double-apply overlapping age/disability exemptions. The shared ISD component now uses **tax-year-matched** historical exemptions when presenting an older published rate: 2021 $25,000, 2022 $40,000, 2023–2024 $100,000, and 2025–2026 $140,000. The additional age/disability exemption was $10,000 through 2024 and $60,000 starting in 2025. Unknown future-year exemptions must not be inferred. https://comptroller.texas.gov/taxes/property-tax/exemptions/

School rate history source: https://comptroller.texas.gov/taxes/property-tax/rates/
TEA school rates/finance source: https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-property-values-and-tax-rates

A year-specific tax illustration is not a statement of the complete property tax bill, nor a valuation or exemption adjudication for a particular parcel. Changes in value, boundaries or exemptions may produce an opposite actual bill trend from a nominal rate comparison.

`scripts/data/validate-isd-tax-authority.mjs` enforces six locally adopted rate arithmetic and source contracts; included in normal calculator gate. `.github/workflows/verify-property-tax-production.yml` checks six SSR pages across public and direct Worker origins daily and after deployments, including all 16 verified Hood/GISD historical pairs, one unresolved Tolar 2022 caution, and independently verified TEA source-matched historical rows, canonical and noindex. `.github/workflows/verify-hood-isd-official-source.yml` rechecks original Hood CAD source weekly and fails on unexplained changes. The official rate importer already rechecks Comptroller annual files monthly and the full retained history annually.

## Remaining source-specific work — must not be misrepresented as complete

The original database contains 3,043 historical gaps, entirely in 2021–2023 (2024 and 2025 are complete). The **official TEA adopted-rate workbook** has now been independently reconciled by *six-digit school CDN*, district name, tax year and exact sum to the original Comptroller total. This produces **2,494 independently source-qualified historical M&O/I&S pairs across 940 ISD pages** stored in `src/data/property/tea-isd-historical-verified.json`. The source-only overlay is guarded again by exact total and official district identity on every server load, with TEA links beside the affected historical rows. The original Comptroller table and calculators remain unmodified. **549 original historical rows could not be independently reconciled against the TEA rate file** (mostly tax-rate precision differences, plus nonmatching school names/CDNs); some also have local Hood CAD evidence. Other rows require original district/CAD adopted resolutions or an authoritative precision resolution. Do not derive missing M&O = total − debt without independent evidence. Keep state record and independently verified supplement provenance separate and flag source disagreements.

Specific release acceptance: all protected CI successful, branch merged through standard branch protection, serialized production deploy succeeds, dual-origin rendered pages verified, then assess authority grade with actual page evidence. An open PR is not a production fix.

## 9 Nov 2026 further template and source corrections

- The shared school homeowner illustration uses an exemption for the **same tax year as the rate**; future tax years fail closed rather than reusing an older law.
- Independently documented 2026 school rates appear as an explicitly labeled additional row in the historical chart and table where the Comptroller's newest workbook remains 2025. This does not mutate statewide source records or calculators.
- A future same-year dispute between Hood CAD and Comptroller suppresses the numerical homeowner example pending resolution.
- Hood CAD school-district comparisons link to each relevant district authority page; they do not imply two ISD rates apply to one parcel.
- The remaining **549 TEA-unmatched source observations** must be investigated individually, including unmatched district identities and differing four- versus six-decimal rates. No source totals are fabricated. The weekly GitHub reconciliation fails if the official TEA workbook or matching state data changes; the entire snapshot must then be regenerated and re-certified.

## Verified statewide backfill rollout

- The original 2021–2023 gaps by year were **1,015, 1,014, and 1,014**; the TEA source verified respectively **850, 804, and 840** exact pairs. TEA matching rejected **549** rather than approximating components.
- New `scripts/data/reconcile-tea-isd-components.mjs` uses the original official spreadsheet, district IDs, names, and exact total arithmetic; `.github/workflows/reconcile-tea-isd-components.yml` repeats source/fingerprint checks every Thursday. It uses existing GitHub-hosted credentials and runs no database writes.
- `scripts/data/validate-isd-tax-authority.mjs` now validates all 2,494 static TEA observations plus the separately documented local history, year-specific exemptions, and HTML render contracts.
- `scripts/ci/verify-tea-isd-production.mjs` checks bounded samples of real 2021–2023 TEA-sourced rows on both live origins in the daily tax-only verification workflow. No 1,000-page sitewide scan occurs per deployment.
- Tolar ISD 2022 remains unverified because source precision does not reconcile with the published Comptroller total. Lipan ISD 2022 is resolved using the independently published TEA values.
