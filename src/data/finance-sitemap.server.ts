import { LOCAL_COST_OF_LIVING_PROFILES } from "@/data/local-cost-of-living";
import { LOCAL_HOME_AFFORDABILITY_PROFILES } from "@/data/local-home-affordability";
import { LOCAL_HOME_INSURANCE_PROFILES } from "@/data/local-home-insurance";
import { LOCAL_HOMEOWNERSHIP_COST_PROFILES } from "@/data/local-homeownership-cost";
import { LOCAL_MORTGAGE_PROFILES } from "@/data/local-mortgage";
import { LOCAL_PROPERTY_TAX_PROFILES } from "@/data/local-property-tax-calculators";
import { LOCAL_SALARY_NEEDED_PROFILES } from "@/data/local-salary-needed";

type SitemapEntry = { path: string; lastmod?: string };

export function loadFinanceSitemapEntries(): SitemapEntry[] {
  return [
    ...LOCAL_PROPERTY_TAX_PROFILES.map((profile) => ({ path: profile.path, lastmod: "2026-08-30" })),
    ...LOCAL_HOME_AFFORDABILITY_PROFILES.map((profile) => ({ path: profile.path, lastmod: "2026-08-30" })),
    ...LOCAL_HOMEOWNERSHIP_COST_PROFILES.map((profile) => ({ path: profile.ownershipPath, lastmod: "2026-08-30" })),
    ...LOCAL_HOME_INSURANCE_PROFILES.map((profile) => ({ path: profile.insurancePath, lastmod: "2026-08-30" })),
    ...LOCAL_MORTGAGE_PROFILES.map((profile) => ({ path: profile.mortgagePath, lastmod: "2026-08-30" })),
    ...LOCAL_COST_OF_LIVING_PROFILES.map((profile) => ({ path: profile.path, lastmod: "2026-09-01" })),
    ...LOCAL_SALARY_NEEDED_PROFILES.map((profile) => ({ path: profile.salaryPath, lastmod: "2026-09-01" })),
  ];
}
