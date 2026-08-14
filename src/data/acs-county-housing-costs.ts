export type TexasCountyHousingCostRow = {
  fips: string;
  countyName: string;
  countySlug: string;
  medianHouseholdIncome: number | null;
  medianHomeValue: number | null;
  medianGrossRent: number | null;
  medianMonthlyOwnerCosts: number | null;
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
