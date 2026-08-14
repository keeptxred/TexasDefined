import snapshot from '@/data/acs-county-housing-costs.snapshot.json';
import type { TexasCountyHousingCostDataset } from '@/data/acs-county-housing-costs';
import { getCountyPropertyRecordByFips } from '@/data/property/county-property-data';

export function loadTexasCountyHousingCostsServer(): TexasCountyHousingCostDataset {
  const rows = (snapshot.rows as Array<{
    fips: string;
    medianHouseholdIncome: number | null;
    medianHomeValue: number | null;
    medianGrossRent: number | null;
    medianMonthlyOwnerCosts: number | null;
  }>).flatMap((row) => {
    const county = getCountyPropertyRecordByFips(row.fips);
    if (!county) return [];
    return [{ ...row, countyName: county.name, countySlug: county.slug }];
  });

  return {
    rows,
    available: rows.length === 254,
    release: snapshot.release,
    year: snapshot.year,
    generatedAt: snapshot.generatedAt,
    sourcePage: snapshot.sourcePage,
    sourceFiles: snapshot.sourceFiles,
  };
}
