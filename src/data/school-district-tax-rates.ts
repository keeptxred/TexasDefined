import { createServerFn } from '@tanstack/react-start';

export type SchoolDistrictTaxRateRow = {
  name: string;
  slug: string;
  countySlugs: string[];
  rate: number | null;
  priorRate: number | null;
  maintenanceOperationsRate: number | null;
  debtServiceRate: number | null;
  variableRate: boolean;
  rateVariants: number[];
  sourceStatus: string;
  sourceUrl: string;
};

export type SchoolDistrictTaxRateData = {
  year: number;
  priorYear: number;
  generatedAt: string | null;
  sourceName: string;
  sourcePage: string;
  sourceWorkbook: string;
  priorWorkbook: string;
  officialCorrectionCount: number;
  rows: SchoolDistrictTaxRateRow[];
};

const SCHOOL_RATE_ENDPOINT = 'https://ftkznprjljkhymknvhye.supabase.co/functions/v1/public-school-district-tax-rates';

const loadSchoolDistrictTaxRateData = createServerFn({ method: 'GET' }).handler(async (): Promise<SchoolDistrictTaxRateData> => {
  const response = await fetch(SCHOOL_RATE_ENDPOINT, {
    headers: { 'user-agent': 'TexasDefined school-tax explorer/1.0' },
  });
  if (!response.ok) throw new Error(`School-district tax-rate endpoint returned HTTP ${response.status}.`);
  return await response.json() as SchoolDistrictTaxRateData;
});

export function getSchoolDistrictTaxRateData() {
  return loadSchoolDistrictTaxRateData();
}
