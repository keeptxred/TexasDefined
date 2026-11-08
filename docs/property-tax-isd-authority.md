# Texas ISD property-tax authority: sources, verification and coverage

## Scope and measured inventory (8 Nov 2026)

The production `texas_property_tax_rates` table contains **1,016 distinct school-district slugs and 5,069 annual records** for 2021–2025. **3,043 annual rows across 1,015 school districts** lack at least one separately reported M&O or I&S component. These are original Comptroller import gaps; missing values must remain null, not zero. District-specific rows should not be invented to satisfy authority scoring.

The shared `src/routes/property-tax.taxing-unit.$unit.tsx` handles all ISD pages. New generic content applies to every `type = 'school-district'` page: an illustrative school-only tax based on a *known taxable value*, a separate appraised-value/homestead scenario, 2026 state exemption guidance, comparison with five rate-neighbor school districts from the **same year and associated county**, source freshness, and parcel-level limits. Comparison rows are read from finalized state-reported records and neither add up district rates nor establish actual parcel jurisdiction.

## Separately certified local 2026 rates

Hood Central Appraisal District published 2026 adopted-rate table: https://hoodcad.net/truth-in-taxation-summary/

Six district slugs have independently verified locally adopted rates and breakdowns in `src/data/property/hood-cad-isd-adopted.json`: Tolar, Granbury, Lipan, Bluff Dale, Glen Rose, Godley. These are **not** 2026 Comptroller workbook records; pages retain original 2021–2025 state history, and statewide calculators continue using source-bounded state data.

Fifteen independently documented M&O/I&S pairs for the six Hood ISDs (2021 and 2023 across all six districts, plus 2022 for Bluff Dale, Glen Rose and Godley) are conditionally displayed only when their sum matches the unchanged Comptroller yearly adopted total. Hood CAD's 2022 source table does not reconcile for **Tolar, Granbury and Lipan**, so those six component cells remain unfilled pending primary district resolutions. There is no silent 2022 override.

## Exemptions, method and validation

General school residence homestead exemption as of 2026: $140,000; qualifying 65+ or disabled homeowners may be eligible for an additional $60,000 school exemption and school tax ceiling; never double-apply overlapping age/disability exemptions. https://comptroller.texas.gov/taxes/property-tax/exemptions/

School rate history source: https://comptroller.texas.gov/taxes/property-tax/rates/
TEA school rates/finance source: https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-property-values-and-tax-rates

A year-specific tax illustration is not a statement of the complete property tax bill, nor a valuation or exemption adjudication for a particular parcel. Changes in value, boundaries or exemptions may produce an opposite actual bill trend from a nominal rate comparison.

`scripts/data/validate-isd-tax-authority.mjs` enforces six locally adopted rate arithmetic and source contracts; included in normal calculator gate. `.github/workflows/verify-property-tax-production.yml` checks six SSR pages across public and direct Worker origins daily and after deployments, including all 15 validated 2021–2023 component pairs, three 2022 cautions, canonical and noindex. `.github/workflows/verify-hood-isd-official-source.yml` rechecks original Hood CAD source weekly and fails on unexplained changes. The official rate importer already rechecks Comptroller annual files monthly and the full retained history annually.

## Remaining source-specific work — must not be misrepresented as complete

The remaining 3,043 missing component observations need documentary source matches using TEA adopted school tax rates (historical school district identifiers, year, name) and/or original district/CAD adoption resolutions, with exact jurisdiction identity, year, M&O and I&S, and total reconciliation. Do not derive missing M&O = total − debt without independent evidence. Keep state record and independently verified supplement provenance separate and flag source disagreements.

Specific release acceptance: all protected CI successful, branch merged through standard branch protection, serialized production deploy succeeds, dual-origin rendered pages verified, then assess authority grade with actual page evidence. An open PR is not a production fix.
