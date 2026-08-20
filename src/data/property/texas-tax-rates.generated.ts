// Shared TypeScript contract for the TexasDefined property-tax rate platform.
// Live data is stored in Supabase and populated from Texas Comptroller annual workbooks.

export type TexasTaxingUnitType = 'county' | 'city' | 'school-district' | 'special-district';
export type TexasTaxRateSourceStatus = 'reported-final' | 'partial-reporting' | 'not-reported' | 'cross-source-conflict';

export type TexasTaxRateRecord = {
  id: string;
  year: number;
  type: TexasTaxingUnitType;
  name: string;
  slug: string;
  countySlugs: string[];
  totalRate: number | null;
  rateVariants: number[];
  variableRate: boolean;
  maintenanceOperationsRate: number | null;
  debtServiceRate: number | null;
  levy: number | null;
  sourceUrl: string;
  sourceStatus: TexasTaxRateSourceStatus;
  officialTaxingUnitIds: string[];
  splitAcrossCads: boolean;
  rateUnavailable: boolean;
};

// Retained for compatibility with code that imports the historical static contract.
// Runtime lookups use src/data/property/texas-tax-rates.server.ts instead.
export const TEXAS_TAX_RATE_DATASET_META = {
  sourceName: 'Texas Comptroller of Public Accounts — Property Tax Assistance Division',
  sourcePage: 'https://comptroller.texas.gov/taxes/property-tax/rates/',
  latestFinalizedYear: 2025,
  availableYears: [2021, 2022, 2023, 2024, 2025] as number[],
  generatedAt: null as string | null,
  recordCount: 0,
  status: 'synced' as const,
};

export const TEXAS_TAX_RATE_RECORDS: TexasTaxRateRecord[] = [];
