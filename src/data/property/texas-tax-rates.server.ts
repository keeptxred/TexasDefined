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
  const records = ((data ?? []) as TaxRateRow[]).map(mapTaxRateRow);
  if (!records.length) return records;
  // Local supplements are only joined to detailed taxing-unit history pages.
  // County rollups, statewide insights, and parcel calculators continue to
  // consume original Comptroller records without an implicit override.
  const { data: localRows, error: localError } = await db
    .from('texas_tax_local_verified_rates')
    .select('tax_year,unit_type,slug,official_unit_id,total_rate,maintenance_operations_rate,debt_service_rate,source_url,component_source_url,source_agency,verified_on,evidence_note')
    .eq('slug', slug)
    .eq('status', 'verified');
  if (localError) throw localError;
  for (const record of records) {
    const local = (localRows ?? []).find((row: any) =>
      row.tax_year === record.year &&
      row.unit_type === record.type &&
      record.officialTaxingUnitIds.includes(row.official_unit_id)
    );
    if (!local) continue;
    const localTotal = numeric(local.total_rate)!;
    const localMo = numeric(local.maintenance_operations_rate);
    const localDebt = numeric(local.debt_service_rate);
    const mode = record.totalRate == null ? 'supplement'
      : Math.abs(record.totalRate - localTotal) > 0.000001 ? 'conflict' : 'corroborated';
    record.localVerification = {
      totalRate: localTotal,
      maintenanceOperationsRate: localMo,
      debtServiceRate: localDebt,
      sourceUrl: local.source_url,
      componentSourceUrl: local.component_source_url,
      sourceAgency: local.source_agency,
      verifiedOn: local.verified_on,
      evidenceNote: local.evidence_note,
      mode,
    };
  }
  return records;
}

export async function getTaxRateDatasetCountServer() {
  const { count, error } = await db.from('texas_property_tax_rates').select('id', { count: 'exact', head: true });
  if (error) throw error;
  return count ?? 0;
}


export async function getStatewideTaxRateInsightsServer(year: number) {
  const base = () => db
    .from('texas_property_tax_rates')
    .select('*')
    .eq('year', year)
    .eq('variable_rate', false)
    .eq('rate_unavailable', false)
    .not('total_rate', 'is', null)
    .gt('total_rate', 0);

  const [{ data: lowestData, error: lowestError }, { data: highestData, error: highestError }] = await Promise.all([
    base().order('total_rate', { ascending: true }).limit(5),
    base().order('total_rate', { ascending: false }).limit(5),
  ]);
  if (lowestError) throw lowestError;
  if (highestError) throw highestError;

  const countResults = await Promise.all(
    (['county', 'city', 'school-district', 'special-district'] as TexasTaxingUnitType[]).map(async (type) => {
      const { count, error } = await db
        .from('texas_property_tax_rates')
        .select('id', { count: 'exact', head: true })
        .eq('year', year)
        .eq('type', type);
      if (error) throw error;
      return [type, count ?? 0] as const;
    }),
  );

  return {
    year,
    counts: Object.fromEntries(countResults) as Record<TexasTaxingUnitType, number>,
    lowest: ((lowestData ?? []) as TaxRateRow[]).map(mapTaxRateRow),
    highest: ((highestData ?? []) as TaxRateRow[]).map(mapTaxRateRow),
    generatedAt: ((lowestData ?? [])[0] as TaxRateRow | undefined)?.imported_at ?? ((highestData ?? [])[0] as TaxRateRow | undefined)?.imported_at ?? null,
  };
}
