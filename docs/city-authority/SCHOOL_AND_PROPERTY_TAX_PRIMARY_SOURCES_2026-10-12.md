# Eleven-city government-source verification: school attendance and property-tax methodology

**Reviewed October 12, 2026 — primary-source methodology only.** The shared `src/components/content/EntityDepthSections.tsx` now displays the same two independently verified official research resources and their limitations on exactly the eleven deep city-authority profiles. No individual property address, campus assignment, tax levy, or service provider has been certified by this work.

## 1. Texas Education Agency — districts versus campus assignments

- **Official source:** [TEA School District Locator FAQ](https://tea.texas.gov/families-and-students/school-district-locator/school-district-locator-faq).
- **Official boundary methodology:** [TEA Geographic Data / Accuracy of School District Boundaries](https://tea.texas.gov/families-and-students/school-district-locator/geographic-data).
- **Independent finding:** TEA's map approximates **school-district geographic boundaries** for general research. TEA explicitly says it **does not collect school attendance-zone information**. Campus assignment depends on the district, admissions/transfer rules, and specific household circumstances. Digital boundaries cannot be treated as legal land descriptions or conclusive campus eligibility.
- **Public correction:** The old internal relocation-card label implied one lookup could "verify the district and campus from an exact address"; revised it to "Research the district for an address; maps are approximate, and the school district must confirm campus attendance assignments." Each deep city page now links directly to TEA's FAQ and explains the limitation next to county/school/utility jurisdiction guidance.
- **Verified category:** School district/attendance methodology **PASS** against TEA official source. City-by-city serving-district boundaries, address-level attendance, and current district enrollment rules **NOT VERIFIED**.

## 2. Texas Comptroller — units, dates and combined property-tax jurisdiction

- **Official source:** [Texas Comptroller — Tax Rates and Levies](https://comptroller.texas.gov/taxes/property-tax/rates/).
- **Secondary agency explanation:** [Property Tax Assistance](https://comptroller.texas.gov/taxes/property-tax/).
- **Independent finding:** The Comptroller publishes individual city, school district, county, and special-district tax **unit** rates. The Comptroller expressly states that Texas has no state property tax; local taxing jurisdictions set tax rates. A municipal city rate is **not** the complete rate for a property. Combined liability depends on the taxing units that actually serve the parcel, adopted-year rates, taxable values, exemptions, and county assessment/collection records. At inspection, the published rate-and-levy source provides a 2025 statewide dataset; it is **not** represented as confirmed 2026 adopted parcel rates.
- **Public improvement:** All eleven deep city pages link directly to the official rate-by-taxing-unit archive and explicitly advise exact property/jurisdiction verification. Existing `/find-my-property-tax` and appraisal-district guidance remains available; no single misleading "citywide tax rate" is displayed.
- **Verified category:** Taxing-unit methodology **PASS** against current Comptroller documentation. Every address's tax unit stack, 2026 adopted rates, valuation and exemptions **NOT VERIFIED**.

## Per-city application and acceptance

| City | School/attendance methodology | Tax-unit methodology | Specific address/campus/tax facts |
|---|---|---|---|
| Houston | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |
| Dallas | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |
| Fort Worth | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |
| Austin | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |
| San Antonio | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |
| El Paso | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |
| Arlington | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |
| Hurst | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |
| Corpus Christi | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |
| Plano | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |
| Lubbock | PRIMARY SOURCE LINK + CAUTION | PRIMARY SOURCE LINK + CAUTION | UNVERIFIED |

## Regression and deployment gate

The existing `scripts/data/validate-entity-template-quality.mjs` now checks for the two exact official URLs, correct on-page qualifying language, city-profile applicability, and the absence of the former misleading campus-verification promise. **This is a source-code acceptance gate only** and must pass along with the protected production build and a fresh post-deployment browser/a11y run before the public improvement is considered deployed. The shared city component was changed once rather than copying an identical paragraph into eleven data records.

**Do not modify the previously recorded city populations, 2025 estimate dates, municipal legal-geometry statuses, or overall 0/11 FULLY CERTIFIED result.** This task closes the statewide *methodology/provenance* gap only.
