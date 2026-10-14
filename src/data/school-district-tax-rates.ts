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
};

export type SchoolDistrictTaxRateData = {
  year: number;
  priorYear: number;
  generatedAt: string | null;
  sourceName: string;
  sourcePage: string;
  sourceWorkbook: string;
  priorWorkbook: string;
  crossCheckSourceName: string;
  crossCheckSourcePage: string;
  crossCheckWorkbook: string;
  rows: SchoolDistrictTaxRateRow[];
};

const loadSchoolDistrictTaxRateData = createServerFn({ method: 'GET' }).handler(async (): Promise<SchoolDistrictTaxRateData> => {
  const { supabase } = await import('@/integrations/supabase/client');
  const { mapTaxRateRow } = await import('./property/texas-tax-rates.server');
  const db = supabase as any;
  const { data: latestRows, error: latestError } = await db.from('texas_property_tax_rates').select('year').eq('type', 'school-district').eq('source_status', 'reported-final').eq('rate_unavailable', false).order('year', { ascending: false }).limit(1);
  if (latestError) throw latestError;
  const latestYear = Number(latestRows?.[0]?.year);
  const year = Number.isInteger(latestYear) ? latestYear : 2025;
  const priorYear = Math.max(2021, year - 1);

  const loadYear = async (targetYear: number) => {
    const { data, error } = await db.from('texas_property_tax_rates').select('*').eq('year', targetYear).eq('type', 'school-district').order('name', { ascending: true });
    if (error) throw error;
    const rows = data ?? [];
    return { records: rows.map((row: any) => mapTaxRateRow(row)), generatedAt: rows.reduce((latest: string | null, row: any) => !latest || row.imported_at > latest ? row.imported_at : latest, null) };
  };

  const [current, prior] = await Promise.all([loadYear(year), loadYear(priorYear)]);
  const priorBySlug = new Map(prior.records.map((record) => [record.slug, record]));

  return {
    year,
    priorYear,
    generatedAt: current.generatedAt,
    sourceName: 'Texas Education Agency — State Funding',
    sourcePage: 'https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-property-values-and-tax-rates',
    sourceWorkbook: current.records.find((record) => record.sourceUrl)?.sourceUrl ?? 'https://tea.texas.gov/about-tea/state-funding/fy2025-2026-sof-data.xlsx',
    priorWorkbook: prior.records.find((record) => record.sourceUrl)?.sourceUrl ?? 'https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-adopted-tax-rates-1.xlsx',
    crossCheckSourceName: 'Texas Comptroller of Public Accounts — Property Tax Assistance Division',
    crossCheckSourcePage: 'https://comptroller.texas.gov/taxes/property-tax/rates/',
    crossCheckWorkbook: `https://comptroller.texas.gov/taxes/property-tax/docs/${year}-school-district-rates-levies.xlsx`,
    rows: current.records.map((record) => {
      const previous = priorBySlug.get(record.slug);
      return {
        name: record.name,
        slug: record.slug,
        countySlugs: record.countySlugs,
        rate: record.totalRate,
        priorRate: previous?.totalRate ?? null,
        maintenanceOperationsRate: record.maintenanceOperationsRate,
        debtServiceRate: record.debtServiceRate,
        variableRate: record.variableRate,
        rateVariants: record.rateVariants,
        sourceStatus: record.sourceStatus,
      };
    }),
  };
});

export function getSchoolDistrictTaxRateData() {
  return loadSchoolDistrictTaxRateData();
}
