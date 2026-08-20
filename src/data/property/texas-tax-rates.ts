import {
  TEXAS_TAX_RATE_DATASET_META,
  TEXAS_TAX_RATE_RECORDS,
  type TexasTaxRateRecord,
  type TexasTaxingUnitType,
} from '@/data/property/texas-tax-rates.generated';

export { TEXAS_TAX_RATE_DATASET_META };
export type { TexasTaxRateRecord, TexasTaxingUnitType };

export type CountyTaxRateSummary = {
  countySlug: string;
  year: number;
  county: TexasTaxRateRecord[];
  cities: TexasTaxRateRecord[];
  schoolDistricts: TexasTaxRateRecord[];
  specialDistricts: TexasTaxRateRecord[];
};

export function latestFinalizedTaxYear() {
  return TEXAS_TAX_RATE_DATASET_META.latestFinalizedYear;
}

export function taxRateDatasetReady() {
  return TEXAS_TAX_RATE_DATASET_META.status === 'synced' && TEXAS_TAX_RATE_RECORDS.length > 0;
}

export function getCountyTaxRateRecords(countySlug: string, year = latestFinalizedTaxYear()) {
  return TEXAS_TAX_RATE_RECORDS.filter((record) => record.year === year && record.countySlugs.includes(countySlug));
}

export function getCountyTaxRateSummary(countySlug: string, year = latestFinalizedTaxYear()): CountyTaxRateSummary {
  const records = getCountyTaxRateRecords(countySlug, year);
  const byType = (type: TexasTaxingUnitType) => records.filter((record) => record.type === type).sort((a, b) => a.name.localeCompare(b.name));
  return {
    countySlug,
    year,
    county: byType('county'),
    cities: byType('city'),
    schoolDistricts: byType('school-district'),
    specialDistricts: byType('special-district'),
  };
}

export function findTaxingUnit(slug: string, year = latestFinalizedTaxYear()) {
  return TEXAS_TAX_RATE_RECORDS.find((record) => record.year === year && record.slug === slug) ?? null;
}

export function findTaxingUnitHistory(slug: string, type?: TexasTaxingUnitType) {
  return TEXAS_TAX_RATE_RECORDS
    .filter((record) => record.slug === slug && (!type || record.type === type))
    .sort((a, b) => a.year - b.year);
}

export function searchTaxingUnits(query: string, year = latestFinalizedTaxYear(), limit = 50) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return TEXAS_TAX_RATE_RECORDS
    .filter((record) => record.year === year && (record.name.toLowerCase().includes(needle) || record.slug.includes(needle)))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, Math.max(1, Math.min(100, limit)));
}

export function combinedSelectedRate(records: TexasTaxRateRecord[]) {
  return records.reduce((sum, record) => sum + Math.max(0, record.totalRate), 0);
}

export function estimatePropertyTax(taxableValue: number, ratePerHundred: number) {
  return Math.max(0, taxableValue) * Math.max(0, ratePerHundred) / 100;
}

export function taxRateSourceLabel(record?: TexasTaxRateRecord | null) {
  const year = record?.year ?? latestFinalizedTaxYear();
  return `${year} adopted rate reported to the Texas Comptroller`;
}
