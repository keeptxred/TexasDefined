import snapshot from '@/data/acs-county-housing-costs.snapshot.json';
import { getCountyPropertyRecordByFips } from '@/data/property/county-property-data';

export type TexasCountyHousingCostRow = {
  fips: string;
  countyName: string;
  countySlug: string;
  medianHouseholdIncome: number;
  medianHomeValue: number;
  medianGrossRent: number;
  medianMonthlyOwnerCosts: number;
};

export type TexasCountyHousingCostDataset = {
  rows: TexasCountyHousingCostRow[];
  available: boolean;
  release: string;
  year: number;
  generatedAt: string | null;
  sourcePage: string;
  sourceFiles: Record<string, string>;
};

export function loadTexasCountyHousingCosts(): TexasCountyHousingCostDataset {
  const rows = (snapshot.rows as Array<{
    fips: string;
    medianHouseholdIncome: number;
    medianHomeValue: number;
    medianGrossRent: number;
    medianMonthlyOwnerCosts: number;
  }>).flatMap((row) => {
    const county = getCountyPropertyRecordByFips(row.fips);
    if (!county) return [];
    return [{ ...row, countyName: county.name, countySlug: county.slug }];
  });

  return {
    rows,
    available: rows.length >= 250,
    release: snapshot.release,
    year: snapshot.year,
    generatedAt: snapshot.generatedAt,
    sourcePage: snapshot.sourcePage,
    sourceFiles: snapshot.sourceFiles,
  };
}
