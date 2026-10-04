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
  const {
    getLatestTaxRateYearServer,
    getTaxingUnitsByTypeServer,
    TAX_RATE_SOURCE_NAME,
    TAX_RATE_SOURCE_PAGE,
  } = await import('./property/texas-tax-rates.server');

  const year = await getLatestTaxRateYearServer();
  const priorYear = Math.max(2021, year - 1);
  const [current, prior] = await Promise.all([
    getTaxingUnitsByTypeServer('school-district', year),
    getTaxingUnitsByTypeServer('school-district', priorYear),
  ]);
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
        sourceStatus: record.sourceStatus,
      };
    }),
  };
});

export function getSchoolDistrictTaxRateData() {
  return loadSchoolDistrictTaxRateData();
}
