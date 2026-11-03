import { supabase } from '@/integrations/supabase/client';
import type { TexasTaxRateRecord, TexasTaxRateSourceStatus, TexasTaxingUnitType } from './texas-tax-rates.generated';
import { cachedPublishedTax } from './published-tax-cache.server';

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
  return cachedPublishedTax('latest-tax-year', async () => {
  const { data, error } = await db
    .from('texas_property_tax_rates')
    .select('year')
    .order('year', { ascending: false })
    .limit(1);
  if (error) throw error;
  const year = Number(data?.[0]?.year);
  return Number.isInteger(year) ? year : FALLBACK_LATEST_YEAR;
  });
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
  return cachedPublishedTax(`county-tax-summary:${year}:${countySlug}`, async () => {
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
  });
}

export async function searchTaxingUnitsServer(query: string, year: number, limit = 100, type?: TexasTaxingUnitType): Promise<{ records: TexasTaxRateRecord[]; generatedAt: string | null }> {
  const safeQuery = query.replace(/[%_]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!safeQuery) return { records: [], generatedAt: null };
  let dbQuery = db
    .from('texas_property_tax_rates')
    .select('*')
    .eq('year', year)
    .ilike('name', `%${safeQuery}%`);
  // Filter the official category BEFORE applying the result cap; filtering
  // a mixed workbook result client-side can silently omit requested units.
  if (type) dbQuery = dbQuery.eq('type', type);
  const { data, error } = await dbQuery
    .order('name', { ascending: true })
    .limit(Math.max(1, Math.min(100, limit)));
  if (error) throw error;
  const rows = (data ?? []) as TaxRateRow[];
  return { records: rows.map(mapTaxRateRow), generatedAt: rows[0]?.imported_at ?? null };
}

export async function getTaxingUnitRateHistoryServer(slug: string, type?: TexasTaxingUnitType): Promise<TexasTaxRateRecord[]> {
  return cachedPublishedTax(`unit-tax-history:${type ?? 'auto'}:${slug}`, async () => {
  let query = db
    .from('texas_property_tax_rates')
    .select('*')
    .eq('slug', slug)
    .order('year', { ascending: true });
  if (type) query = query.eq('type', type);
  const { data, error } = await query;
  if (error) throw error;
  let records = ((data ?? []) as TaxRateRow[]).map(mapTaxRateRow);
  if (!records.length) return records;
  // A slug is not guaranteed unique across source-workbook types. The Woodlands
  // Township appears as both a city and a special district for 2021–2023,
  // but only as a special district for 2024–2025. Never interleave two
  // classified sources into a single year-by-year history or count a year twice.
  if (!type && new Set(records.map((record) => record.type)).size > 1) {
    const newestYear = Math.max(...records.map((record) => record.year));
    const latestTypes = [...new Set(records.filter((record) => record.year === newestYear).map((record) => record.type))];
    if (latestTypes.length !== 1) {
      throw new Error(`Ambiguous taxing-unit classification for slug "${slug}"; specify type explicitly`);
    }
    records = records.filter((record) => record.type === latestTypes[0]);
  }
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
  // Edna's 2023 Comptroller and county figures disagree. Preserve the statewide
  // workbook untouched, while showing the dated county evidence on the history
  // page. Only attach this scoped fallback until the verified-local import adds
  // the same record; never inject it into parcel calculators or county rollups.
  const edna2023 = records.find((record) =>
    record.slug === 'edna' && record.type === 'city' && record.year === 2023);
  if (edna2023 && !edna2023.localVerification) {
    const localTotal = 0.2128;
    edna2023.localVerification = {
      totalRate: localTotal,
      maintenanceOperationsRate: 0.1294,
      debtServiceRate: 0.0834,
      sourceUrl: 'https://www.co.jackson.tx.us/upload/page/2347/2025%20FIVE%20YEAR%20SUMMARY.pdf',
      componentSourceUrl: null,
      sourceAgency: 'Jackson County Tax Assessor-Collector',
      verifiedOn: '2026-10-31',
      evidenceNote: 'Jackson County’s 2025 five-year summary gives Edna’s 2023 adopted city rate as $0.2128 per $100 (M&O $0.1294; I&S $0.0834). This differs from the statewide rate if that workbook displays $0.2774; the statewide entry remains unchanged pending reconciliation.',
      mode: edna2023.totalRate == null ? 'supplement'
        : Math.abs(edna2023.totalRate - localTotal) > 0.000001 ? 'conflict' : 'corroborated',
    };
  }
  return records;
  });
}

export async function getTaxRateDatasetCountServer() {
  const { count, error } = await db.from('texas_property_tax_rates').select('id', { count: 'exact', head: true });
  if (error) throw error;
  return count ?? 0;
}


export async function getStatewideTaxRateInsightsServer(year: number) {
  return cachedPublishedTax(`statewide-tax-insights:${year}`, async () => {
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
  };  });
}
