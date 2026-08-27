export const TDI_INSURANCE_VERIFIED = "Aug. 26, 2026";

export const TDI_HOMEOWNERS_MARKET = {
  sourceName: "Texas Department of Insurance — Texas homeowners insurance market overview",
  sourceUrl: "https://www.tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html",
  lossesSourceName: "Texas Department of Insurance — Texas homeowners losses by county",
  lossesSourceUrl: "https://www.tdi.texas.gov/consumer/homeowners-losses-by-county.html",
  lossesCsvUrl: "https://www.tdi.texas.gov/general/documents/home-owners-losses-by-county-25.csv",
  releaseUrl: "https://www.tdi.texas.gov/news/2026/tdi06222026.html",
  year: 2025,
  preliminary: true,
  statewideAverageAnnualPremium: 3506,
  activeHomeownersPolicies: 8233096,
  statewidePaidLosses: 8_740_000_000,
  windHailShareSince2019: 0.62,
  premiumCoverage: "County-level average annual homeowners premiums are available for every Texas county from 2019 through preliminary 2025 data.",
  lossCoverage: "The county loss dataset covers paid homeowners losses and excludes renters, condo and dwelling policies. TDI states that TWIA wind and hail losses are not included.",
} as const;

const TWIA_FULL_COUNTIES = new Set([
  "Aransas",
  "Brazoria",
  "Calhoun",
  "Cameron",
  "Chambers",
  "Galveston",
  "Jefferson",
  "Kenedy",
  "Kleberg",
  "Matagorda",
  "Nueces",
  "Refugio",
  "San Patricio",
  "Willacy",
]);

export type CountyWindContext = "standard" | "twia-county" | "twia-partial";

export function getCountyWindContext(countyName: string): CountyWindContext {
  const county = countyName.replace(/ County$/i, "").trim();
  if (county === "Harris") return "twia-partial";
  if (TWIA_FULL_COUNTIES.has(county)) return "twia-county";
  return "standard";
}

export function countyWindLabel(countyName: string) {
  const context = getCountyWindContext(countyName);
  if (context === "twia-county") return "TWIA coastal county — compare wind separately";
  if (context === "twia-partial") return "TWIA applies to eligible areas east of Highway 146";
  return "Standard TDI county comparison";
}

export function countyWindNote(countyName: string) {
  const context = getCountyWindContext(countyName);
  if (context === "twia-county") return "TDI publishes with-wind and no-wind context in coastal counties. Do not compare a policy that excludes wind with an inland policy that includes it.";
  if (context === "twia-partial") return "TDI says TWIA eligibility applies in parts of Harris County east of Highway 146, including specified coastal-area cities. Verify the exact address before comparing premiums.";
  return "Use TDI's county premium map for the public county average, then obtain address-specific quotes with matching coverage and deductibles.";
}
