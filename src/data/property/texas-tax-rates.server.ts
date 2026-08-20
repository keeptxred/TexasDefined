import { supabase } from '@/integrations/supabase/client';
import type { TexasTaxRateRecord, TexasTaxRateSourceStatus, TexasTaxingUnitType } from './texas-tax-rates.generated';

export const LATEST_FINALIZED_TAX_YEAR = 2025;
export const AVAILABLE_TAX_YEARS = [2021, 2022, 2023, 2024, 2025] as const;
export const TAX_RATE_SOURCE_NAME = 'Texas Comptroller of Public Accounts — Property Tax Assistance Division';
export const TAX_RATE_SOURCE_PAGE = 'https://comptroller.texas.gov/taxes/property-tax/rates/';

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

export function taxRateMetadata(generatedAt: string | null = null, recordCount?: number) {
  return {
    sourceName: TAX_RATE_SOURCE_NAME,
    sourcePage: TAX_RATE_SOURCE_PAGE,
    latestFinalizedYear: LATEST_FINALIZED_TAX_YEAR,
    availableYears: [...AVAILABLE_TAX_YEARS],
    generatedAt,
    recordCount,
    status: 'synced' as const,
  };
}

export async function getCountyTaxRateSummaryServer(countySlug: string, year = LATEST_FINALIZED_TAX_YEAR): Promise<{ summary: CountyTaxRateSummary; generatedAt: string | null }> {
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

export async function searchTaxingUnitsServer(query: string, year = LATEST_FINALIZED_TAX_YEAR, limit = 100): Promise<{ records: TexasTaxRateRecord[]; generatedAt: string | null }> {
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
