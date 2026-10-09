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
  rows: SchoolDistrictTaxRateRow[];
};

const loadSchoolDistrictTaxRateData = createServerFn({ method: 'GET' }).handler(async (): Promise<SchoolDistrictTaxRateData> => {
  const { supabase } = await import('@/integrations/supabase/client');
  const {
    getLatestTaxRateYearServer,
    mapTaxRateRow,
    TAX_RATE_SOURCE_NAME,
    TAX_RATE_SOURCE_PAGE,
  } = await import('./property/texas-tax-rates.server');

  const db = supabase as any;
  const year = await getLatestTaxRateYearServer();
  const priorYear = Math.max(2021, year - 1);

  const loadYear = async (targetYear: number) => {
    const { data, error } = await db
      .from('texas_property_tax_rates')
      .select('*')
      .eq('year', targetYear)
      .eq('type', 'school-district')
      .order('name', { ascending: true });
    if (error) throw error;
    const rows = data ?? [];
    return {
      records: rows.map((row: any) => mapTaxRateRow(row)),
      generatedAt: rows[0]?.imported_at ?? null,
    };
  };

  const [current, prior] = await Promise.all([loadYear(year), loadYear(priorYear)]);
  const priorBySlug = new Map(prior.records.map((record) => [record.slug, record]));

  return {
    year,
    priorYear,
    generatedAt: current.generatedAt,
    sourceName: TAX_RATE_SOURCE_NAME,
    sourcePage: TAX_RATE_SOURCE_PAGE,
    sourceWorkbook: `https://comptroller.texas.gov/taxes/property-tax/docs/${year}-school-district-rates-levies.xlsx`,
    priorWorkbook: `https://comptroller.texas.gov/taxes/property-tax/docs/${priorYear}-school-district-rates-levies.xlsx`,
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
