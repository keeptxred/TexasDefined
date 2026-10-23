import { createServerFn } from '@tanstack/react-start';

export type SchoolDistrictTaxRateRow = {
  name: string;
  slug: string;
  /** Official school-district county-district number, when unambiguous in Comptroller IDs. */
  officialCdn: string | null;
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

const loadSchoolDistrictTaxRateData = createServerFn({ method: 'GET' }).handler(async (): Promise<SchoolDistrictTaxRateData> => {
  const { supabase } = await import('@/integrations/supabase/client');
  const { mapTaxRateRow, TAX_RATE_SOURCE_NAME, TAX_RATE_SOURCE_PAGE } = await import('./property/texas-tax-rates.server');
  const db = supabase as any;
  const { data: latestRows, error: latestError } = await db.from('texas_property_tax_rates').select('year').eq('type', 'school-district').order('year', { ascending: false }).limit(1);
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

  const sourceWorkbook = `https://comptroller.texas.gov/taxes/property-tax/docs/${year}-school-district-rates-levies.xlsx`;
  const priorWorkbook = `https://comptroller.texas.gov/taxes/property-tax/docs/${priorYear}-school-district-rates-levies.xlsx`;

  return {
    year,
    priorYear,
    generatedAt: current.generatedAt,
    sourceName: TAX_RATE_SOURCE_NAME,
    sourcePage: TAX_RATE_SOURCE_PAGE,
    sourceWorkbook,
    priorWorkbook,
    officialCorrectionCount: current.records.filter((record) => record.sourceUrl !== sourceWorkbook).length,
    rows: current.records.map((record) => {
      const previous = priorBySlug.get(record.slug);
      const cdns = [...new Set(record.officialTaxingUnitIds
        .map((id) => id.match(/^(\d{3}-\d{3}-02)(?:-|$)/)?.[1] ?? null)
        .filter((value): value is string => value !== null))];
      return {
        name: record.name,
        slug: record.slug,
        officialCdn: cdns.length === 1 ? cdns[0] : null,
        countySlugs: record.countySlugs,
        rate: record.totalRate,
        priorRate: previous?.totalRate ?? null,
        maintenanceOperationsRate: record.maintenanceOperationsRate,
        debtServiceRate: record.debtServiceRate,
        variableRate: record.variableRate,
        rateVariants: record.rateVariants,
        sourceStatus: record.sourceStatus,
        sourceUrl: record.sourceUrl,
      };
    }),
  };
});

export function getSchoolDistrictTaxRateData() {
  return loadSchoolDistrictTaxRateData();
}
