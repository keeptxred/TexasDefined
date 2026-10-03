import { supabase } from '@/integrations/supabase/client';
import { getLatestTaxRateYearServer, TAX_RATE_SOURCE_NAME, TAX_RATE_SOURCE_PAGE } from './texas-tax-rates.server';
import type { TexasTaxingUnitType } from './texas-tax-rates.generated';

const INCLUDED_TYPES: TexasTaxingUnitType[] = ['county', 'city', 'school-district'];
const PAGE_SIZE = 1000;

type SourceRow = {
  year: number;
  type: TexasTaxingUnitType;
  name: string;
  slug: string;
  county_slugs: string[] | null;
  total_rate: number | string | null;
  source_url: string | null;
  source_status: string;
  variable_rate: boolean;
  rate_unavailable: boolean;
};

export type TexasPropertyTaxChangeRow = {
  key: string;
  type: TexasTaxingUnitType;
  name: string;
  slug: string;
  countySlugs: string[];
  previousYear: number;
  currentYear: number;
  previousRate: number;
  currentRate: number;
  rateChange: number;
  rateChangePercent: number;
  sourceUrl: string;
};

export type TexasPropertyTaxChangeDataset = {
  rows: TexasPropertyTaxChangeRow[];
  previousYear: number;
  currentYear: number;
  sourceName: string;
  sourceUrl: string;
  generatedAt: string;
  available: boolean;
};

const db = supabase as any;
let datasetPromise: Promise<TexasPropertyTaxChangeDataset> | undefined;

export function loadTexasPropertyTaxChanges() {
  datasetPromise ??= buildDataset();
  return datasetPromise;
}

async function buildDataset(): Promise<TexasPropertyTaxChangeDataset> {
  const currentYear = await getLatestTaxRateYearServer();
  const previousYear = currentYear - 1;
  const [previousRows, currentRows] = await Promise.all([loadYear(previousYear), loadYear(currentYear)]);
  const previousByKey = new Map(previousRows.map((row) => [rowKey(row), row]));
  const rows: TexasPropertyTaxChangeRow[] = [];

  for (const current of currentRows) {
    const previous = previousByKey.get(rowKey(current));
    if (!previous) continue;
    const previousRate = numeric(previous.total_rate);
    const currentRate = numeric(current.total_rate);
    if (previousRate == null || currentRate == null || previousRate <= 0) continue;
    const rateChange = currentRate - previousRate;
    rows.push({
      key: rowKey(current),
      type: current.type,
      name: current.name,
      slug: current.slug,
      countySlugs: current.county_slugs ?? previous.county_slugs ?? [],
      previousYear,
      currentYear,
      previousRate,
      currentRate,
      rateChange,
      rateChangePercent: (rateChange / previousRate) * 100,
      sourceUrl: current.source_url || previous.source_url || TAX_RATE_SOURCE_PAGE,
    });
  }

  rows.sort((a, b) => Math.abs(b.rateChangePercent) - Math.abs(a.rateChangePercent) || a.name.localeCompare(b.name));
  return {
    rows,
    previousYear,
    currentYear,
    sourceName: TAX_RATE_SOURCE_NAME,
    sourceUrl: TAX_RATE_SOURCE_PAGE,
    generatedAt: '2026-10-03',
    available: rows.length > 0,
  };
}

async function loadYear(year: number): Promise<SourceRow[]> {
  const rows: SourceRow[] = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const { data, error } = await db
      .from('texas_property_tax_rates')
      .select('year,type,name,slug,county_slugs,total_rate,source_url,source_status,variable_rate,rate_unavailable')
      .eq('year', year)
      .in('type', INCLUDED_TYPES)
      .eq('source_status', 'reported-final')
      .eq('variable_rate', false)
      .eq('rate_unavailable', false)
      .order('type', { ascending: true })
      .order('slug', { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);
    if (error) throw error;
    const page = (data ?? []) as SourceRow[];
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
  }
  return dedupe(rows);
}

function dedupe(rows: SourceRow[]) {
  const byKey = new Map<string, SourceRow>();
  for (const row of rows) if (!byKey.has(rowKey(row))) byKey.set(rowKey(row), row);
  return [...byKey.values()];
}

function rowKey(row: Pick<SourceRow, 'type' | 'slug'>) {
  return `${row.type}:${row.slug}`;
}

function numeric(value: number | string | null | undefined) {
  if (value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
