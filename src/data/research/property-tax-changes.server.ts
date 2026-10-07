import { supabase } from '@/integrations/supabase/client';
import type { TexasTaxingUnitType } from '@/data/property/texas-tax-rates.generated';
import { getLatestTaxRateYearServer, mapTaxRateRow, TAX_RATE_SOURCE_NAME, TAX_RATE_SOURCE_PAGE } from '@/data/property/texas-tax-rates.server';

export type PropertyTaxChangeRow = {
  key: string;
  type: Exclude<TexasTaxingUnitType, 'special-district'>;
  name: string;
  slug: string;
  countySlugs: string[];
  previousYear: number;
  currentYear: number;
  previousRate: number;
  currentRate: number;
  changePoints: number;
  changePercent: number;
  sourceUrl: string;
};

export type PropertyTaxChangeDataset = {
  available: boolean;
  previousYear: number;
  currentYear: number;
  generatedAt: string | null;
  sourceName: string;
  sourceUrl: string;
  rows: PropertyTaxChangeRow[];
  omitted: number;
};

const comparableTypes = new Set<TexasTaxingUnitType>(['county', 'city', 'school-district']);
const db = supabase as any;

const identity = (record: ReturnType<typeof mapTaxRateRow>) => `${record.type}:${record.slug}:${[...record.countySlugs].sort().join(',')}`;

export async function loadPropertyTaxChangesServer(): Promise<PropertyTaxChangeDataset> {
  const currentYear = await getLatestTaxRateYearServer();
  const previousYear = currentYear - 1;
  const { data, error } = await db
    .from('texas_property_tax_rates')
    .select('*')
    .in('year', [previousYear, currentYear])
    .in('type', ['county', 'city', 'school-district'])
    .order('type', { ascending: true })
    .order('name', { ascending: true })
    .order('year', { ascending: true });

  if (error) throw error;
  const rawRows = (data ?? []) as any[];
  const records = rawRows.map((row) => mapTaxRateRow(row));
  const prior = new Map(records.filter((record) => record.year === previousYear).map((record) => [identity(record), record]));
  let omitted = 0;

  const rows = records
    .filter((record) => record.year === currentYear && comparableTypes.has(record.type))
    .flatMap((record) => {
      const earlier = prior.get(identity(record));
      const usable = earlier
        && record.sourceStatus === 'reported-final'
        && earlier.sourceStatus === 'reported-final'
        && !record.variableRate
        && !earlier.variableRate
        && !record.rateUnavailable
        && !earlier.rateUnavailable
        && record.totalRate != null
        && earlier.totalRate != null
        && Number.isFinite(record.totalRate)
        && Number.isFinite(earlier.totalRate)
        && earlier.totalRate > 0;
      if (!usable || !earlier) {
        omitted += 1;
        return [];
      }
      const changePoints = record.totalRate! - earlier.totalRate!;
      return [{
        key: identity(record),
        type: record.type as PropertyTaxChangeRow['type'],
        name: record.name,
        slug: record.slug,
        countySlugs: record.countySlugs,
        previousYear,
        currentYear,
        previousRate: earlier.totalRate!,
        currentRate: record.totalRate!,
        changePoints,
        changePercent: (changePoints / earlier.totalRate!) * 100,
        sourceUrl: record.sourceUrl || TAX_RATE_SOURCE_PAGE,
      }];
    })
    .sort((a, b) => Math.abs(b.changePoints) - Math.abs(a.changePoints) || a.name.localeCompare(b.name));

  return {
    available: rows.length > 0,
    previousYear,
    currentYear,
    generatedAt: rawRows.map((row) => row.imported_at).find(Boolean) ?? null,
    sourceName: TAX_RATE_SOURCE_NAME,
    sourceUrl: TAX_RATE_SOURCE_PAGE,
    rows,
    omitted,
  };
}
