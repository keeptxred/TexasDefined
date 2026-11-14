/** Tax-year-specific statutory school residence-homestead exemptions.
 * Do not apply today's allowance retroactively to older official rates.
 * Sources:
 * 2021–2022: https://comptroller.texas.gov/taxes/property-tax/docs/96-669-21.pdf
 * 2023–2024: https://comptroller.texas.gov/taxes/property-tax/docs/96-669-23.pdf
 * 2025–2026: https://comptroller.texas.gov/taxes/property-tax/exemptions/
 * TEA confirms the 2024/2025 transition:
 * https://content.govdelivery.com/accounts/TXTEA/bulletins/3eb2504
 */
const HISTORICAL_SCHOOL_EXEMPTIONS: Record<number, { general: number; ageOrDisabilityAdditional: number }> = {
  2021: { general: 25000, ageOrDisabilityAdditional: 10000 },
  2022: { general: 40000, ageOrDisabilityAdditional: 10000 },
  2023: { general: 100000, ageOrDisabilityAdditional: 10000 },
  2024: { general: 100000, ageOrDisabilityAdditional: 10000 },
  2025: { general: 140000, ageOrDisabilityAdditional: 60000 },
  2026: { general: 140000, ageOrDisabilityAdditional: 60000 },
};

export function schoolHomesteadForTaxYear(year: number) {
  // Future-year legal changes must be independently verified first.
  return HISTORICAL_SCHOOL_EXEMPTIONS[year] ?? null;
}
