import { supabase } from '@/integrations/supabase/client';
import type { TexasTaxRateRecord, TexasTaxRateSourceStatus, TexasTaxingUnitType } from './texas-tax-rates.generated';

export const TAX_RATE_SOURCE_NAME = 'Texas Comptroller of Public Accounts — Property Tax Assistance Division';
export const TAX_RATE_SOURCE_PAGE = 'https://comptroller.texas.gov/taxes/property-tax/rates/';
const FALLBACK_LATEST_YEAR = 2025;
const EARLIEST_RETAINED_YEAR = 2021;

type TaxRateRow = {
  id: string;
  year: number;
  type: string;
  name: string;
  slug: string;
  county_slugs: string[] | null;
  total_rate: number | string | null;
  maintenance_operations_rate: number | string | null;
  debt_service_rate: number | string | null;
  levy: number | string | null;
  source_url: string;
  source_status: string;
  variable_rate: boolean;
  rate_variants: Array<number | string> | null;
  official_taxing_unit_ids: string[] | null;
  split_across_cads: boolean;
  rate_unavailable: boolean;
  imported_at: string;
};

type CountyTaxRateSummary = {
  countySlug: string;
  year: number;
  county: TexasTaxRateRecord[];
  cities: TexasTaxRateRecord[];
  schoolDistricts: TexasTaxRateRecord[];
  specialDistricts: TexasTaxRateRecord[];
};

export type PropertyTaxChangeRecord = {
  name: string;
  slug: string;
  type: TexasTaxingUnitType;
  countySlugs: string[];
  priorYear: number;
  latestYear: number;
  priorRate: number;
  latestRate: number;
  change: number;
};

export type PropertyTaxDataCenterSummary = {
  sourceName: string;
  sourcePage: string;
  latestYear: number;
  priorYear: number;
  availableYears: number[];
  generatedAt: string | null;
  recordCount: number;
  countsByType: Array<{ type: TexasTaxingUnitType; records: number; fixedRates: number }>;
  medianFixedRateByType: Array<{ type: TexasTaxingUnitType; value: number | null }>;
  largestIncreases: PropertyTaxChangeRecord[];
  largestDecreases: PropertyTaxChangeRecord[];
};

const db = supabase as any;

function numeric(value: number | string | null | undefined) {
  if (value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function mapTaxRateRow(row: TaxRateRow): TexasTaxRateRecord {
  return {
    id: row.id,
    year: row.year,
    type: row.type as TexasTaxingUnitType,
    name: row.name,
    slug: row.slug,
    countySlugs: row.county_slugs ?? [],
    totalRate: numeric(row.total_rate),
    maintenanceOperationsRate: numeric(row.maintenance_operations_rate),
    debtServiceRate: numeric(row.debt_service_rate),
    levy: numeric(row.levy),
    sourceUrl: row.source_url,
    sourceStatus: row.source_status as TexasTaxRateSourceStatus,
    variableRate: Boolean(row.variable_rate),
    rateVariants: (row.rate_variants ?? []).map((value) => Number(value)).filter(Number.isFinite),
    officialTaxingUnitIds: row.official_taxing_unit_ids ?? [],
    splitAcrossCads: Boolean(row.split_across_cads),
    rateUnavailable: Boolean(row.rate_unavailable),
  };
}

export async function getLatestTaxRateYearServer() {
  const { data, error } = await db
    .from('texas_property_tax_rates')
    .select('year')
    .order('year', { ascending: false })
    .limit(1);
  if (error) throw error;
  const year = Number(data?.[0]?.year);
  return Number.isInteger(year) ? year : FALLBACK_LATEST_YEAR;
}

export function availableTaxYears(latestYear: number) {
  const years: number[] = [];
  for (let year = EARLIEST_RETAINED_YEAR; year <= latestYear; year++) years.push(year);
  return years;
}

export function taxRateMetadata(latestYear: number, generatedAt: string | null = null, recordCount?: number) {
  return {
    sourceName: TAX_RATE_SOURCE_NAME,
    sourcePage: TAX_RATE_SOURCE_PAGE,
    latestFinalizedYear: latestYear,
    availableYears: availableTaxYears(latestYear),
    generatedAt,
    recordCount,
    status: 'synced' as const,
  };
}

async function getTaxRateRowsForYear(year: number): Promise<TaxRateRow[]> {
  const { data, error } = await db
    .from('texas_property_tax_rates')
    .select('*')
    .eq('year', year)
    .order('type', { ascending: true })
    .order('name', { ascending: true });
  if (error) throw error;
  return (data ?? []) as TaxRateRow[];
}

export async function getTaxRateCatalogServer(year: number): Promise<TexasTaxRateRecord[]> {
  return (await getTaxRateRowsForYear(year)).map(mapTaxRateRow);
}

function isComparableFixedRate(record: TexasTaxRateRecord) {
  return !record.rateUnavailable && !record.variableRate && record.totalRate != null && Number.isFinite(record.totalRate);
}

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export async function getPropertyTaxDataCenterServer(): Promise<PropertyTaxDataCenterSummary> {
  const latestYear = await getLatestTaxRateYearServer();
  const priorYear = latestYear - 1;
  const [latestRows, priorRows] = await Promise.all([getTaxRateRowsForYear(latestYear), getTaxRateRowsForYear(priorYear)]);
  const latest = latestRows.map(mapTaxRateRow);
  const prior = priorRows.map(mapTaxRateRow);
  const priorByIdentity = new Map(prior.map((record) => [`${record.type}:${record.slug}`, record]));
  const changes: PropertyTaxChangeRecord[] = [];
  for (const record of latest) {
    if (!isComparableFixedRate(record)) continue;
    const earlier = priorByIdentity.get(`${record.type}:${record.slug}`);
    if (!earlier || !isComparableFixedRate(earlier) || earlier.totalRate == null || record.totalRate == null) continue;
    changes.push({
      name: record.name,
      slug: record.slug,
      type: record.type,
      countySlugs: record.countySlugs,
      priorYear,
      latestYear,
      priorRate: earlier.totalRate,
      latestRate: record.totalRate,
      change: record.totalRate - earlier.totalRate,
    });
  }
  const types: TexasTaxingUnitType[] = ['county', 'city', 'school-district', 'special-district'];
  const countsByType = types.map((type) => {
    const records = latest.filter((record) => record.type === type);
    return { type, records: records.length, fixedRates: records.filter(isComparableFixedRate).length };
  });
  const medianFixedRateByType = types.map((type) => ({
    type,
    value: median(latest.filter((record) => record.type === type && isComparableFixedRate(record)).flatMap((record) => record.totalRate == null ? [] : [record.totalRate])),
  }));
  const generatedAt = latestRows.map((row) => row.imported_at).filter(Boolean).sort().at(-1) ?? null;
  return {
    sourceName: TAX_RATE_SOURCE_NAME,
    sourcePage: TAX_RATE_SOURCE_PAGE,
    latestYear,
    priorYear,
    availableYears: availableTaxYears(latestYear),
    generatedAt,
    recordCount: latest.length,
    countsByType,
    medianFixedRateByType,
    largestIncreases: [...changes].filter((record) => record.change > 0).sort((a, b) => b.change - a.change || a.name.localeCompare(b.name)).slice(0, 12),
    largestDecreases: [...changes].filter((record) => record.change < 0).sort((a, b) => a.change - b.change || a.name.localeCompare(b.name)).slice(0, 12),
  };
}

export async function getCountyTaxRateSummaryServer(countySlug: string, year: number): Promise<{ summary: CountyTaxRateSummary; generatedAt: string | null }> {
  const { data, error } = await db
    .from('texas_property_tax_rates')
    .select('*')
    .eq('year', year)
    .contains('county_slugs', [countySlug])
    .order('type', { ascending: true })
    .order('name', { ascending: true });
  if (error) throw error;
  const rows = (data ?? []) as TaxRateRow[];
  const records = rows.map(mapTaxRateRow);
  const byType = (type: TexasTaxingUnitType) => records.filter((record) => record.type === type);
  return {
    generatedAt: rows[0]?.imported_at ?? null,
    summary: {
      countySlug,
      year,
      county: byType('county'),
      cities: byType('city'),
      schoolDistricts: byType('school-district'),
      specialDistricts: byType('special-district'),
    },
  };
}

export async function searchTaxingUnitsServer(query: string, year: number, limit = 100): Promise<{ records: TexasTaxRateRecord[]; generatedAt: string | null }> {
  const safeQuery = query.replace(/[%_]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!safeQuery) return { records: [], generatedAt: null };
  const { data, error } = await db
    .from('texas_property_tax_rates')
    .select('*')
    .eq('year', year)
    .ilike('name', `%${safeQuery}%`)
    .order('name', { ascending: true })
    .limit(Math.max(1, Math.min(100, limit)));
  if (error) throw error;
  const rows = (data ?? []) as TaxRateRow[];
  return { records: rows.map(mapTaxRateRow), generatedAt: rows[0]?.imported_at ?? null };
}

export async function getTaxingUnitRateHistoryServer(slug: string, type?: TexasTaxingUnitType): Promise<TexasTaxRateRecord[]> {
  let query = db
    .from('texas_property_tax_rates')
    .select('*')
    .eq('slug', slug)
    .order('year', { ascending: true });
  if (type) query = query.eq('type', type);
  const { data, error } = await query;
  if (error) throw error;
  return ((data ?? []) as TaxRateRow[]).map(mapTaxRateRow);
}

export async function getTaxRateDatasetCountServer() {
  const { count, error } = await db.from('texas_property_tax_rates').select('id', { count: 'exact', head: true });
  if (error) throw error;
  return count ?? 0;
}
