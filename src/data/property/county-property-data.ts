import { TEXAS_CITIES, TEXAS_COUNTIES } from '@/data/texas-places';
import { COUNTY_PROPERTY_ENRICHMENT } from '@/data/property/county-property-enrichment.generated';
import {
  createEmptyCountyPropertyRecord,
  type CountyPropertyRecord,
  validateCountyPropertyDataset,
} from '@/data/property/county-property-schema';

const TEXAS_STATE_FIPS = '48';
const CENSUS_FIPS_SOURCE = 'https://www.census.gov/geographies/reference-files/2025/demo/popest/2025-fips.html';

function countyNameWithoutSuffix(name: string) {
  return name.replace(/ County$/, '');
}

function countyFipsFromAlphabeticalIndex(index: number) {
  const countyCode = String(index * 2 + 1).padStart(3, '0');
  return `${TEXAS_STATE_FIPS}${countyCode}`;
}

function majorCitiesForCounty(countyName: string) {
  const baseName = countyNameWithoutSuffix(countyName);
  return TEXAS_CITIES
    .filter((city) => city.county === baseName)
    .map((city) => city.name)
    .sort((a, b) => a.localeCompare(b));
}

function buildCountyPropertyRecord(county: (typeof TEXAS_COUNTIES)[number], index: number): CountyPropertyRecord {
  const base = createEmptyCountyPropertyRecord(county);
  const enrichment = COUNTY_PROPERTY_ENRICHMENT[county.slug];

  return {
    ...base,
    fips: countyFipsFromAlphabeticalIndex(index),
    majorCities: majorCitiesForCounty(county.name),
    appraisalDistrict: enrichment ? { ...base.appraisalDistrict, ...enrichment.appraisalDistrict } : base.appraisalDistrict,
    taxOffice: enrichment ? { ...base.taxOffice, ...enrichment.taxOffice } : base.taxOffice,
    links: enrichment ? { ...base.links, ...enrichment.links } : base.links,
    lastVerifiedAt: enrichment?.lastVerifiedAt ?? null,
    sourceUrls: Array.from(new Set([
      county.officialDirectoryUrl,
      CENSUS_FIPS_SOURCE,
      ...(enrichment?.sourceUrls ?? []),
    ])),
  };
}

export const COUNTY_PROPERTY_RECORDS: CountyPropertyRecord[] = TEXAS_COUNTIES.map(buildCountyPropertyRecord);

export const COUNTY_PROPERTY_BY_SLUG = new Map(
  COUNTY_PROPERTY_RECORDS.map((record) => [record.slug, record] as const),
);

export const COUNTY_PROPERTY_BY_FIPS = new Map(
  COUNTY_PROPERTY_RECORDS.map((record) => [record.fips!, record] as const),
);

export function getCountyPropertyRecordBySlug(slug: string) {
  return COUNTY_PROPERTY_BY_SLUG.get(slug) ?? null;
}

export function getCountyPropertyRecordByFips(fips: string) {
  return COUNTY_PROPERTY_BY_FIPS.get(fips) ?? null;
}

export function validateImportedTexasCountyPropertyData() {
  const errors: string[] = [];

  if (COUNTY_PROPERTY_RECORDS.length !== 254) {
    errors.push(`Expected 254 Texas counties; found ${COUNTY_PROPERTY_RECORDS.length}.`);
  }

  const names = COUNTY_PROPERTY_RECORDS.map((record) => record.name);
  const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
  if (names.some((name, index) => name !== sortedNames[index])) {
    errors.push('Texas county source list must remain alphabetically sorted for deterministic FIPS assignment.');
  }

  const slugs = COUNTY_PROPERTY_RECORDS.map((record) => record.slug);
  if (new Set(slugs).size !== COUNTY_PROPERTY_RECORDS.length) {
    errors.push('Texas county slugs must be unique.');
  }

  const fipsValues = COUNTY_PROPERTY_RECORDS.map((record) => record.fips);
  if (new Set(fipsValues).size !== COUNTY_PROPERTY_RECORDS.length) {
    errors.push('Texas county FIPS codes must be unique.');
  }

  if (COUNTY_PROPERTY_RECORDS[0]?.name !== 'Anderson County' || COUNTY_PROPERTY_RECORDS[0]?.fips !== '48001') {
    errors.push('Expected Anderson County to map to FIPS 48001.');
  }

  const last = COUNTY_PROPERTY_RECORDS.at(-1);
  if (last?.name !== 'Zavala County' || last?.fips !== '48507') {
    errors.push('Expected Zavala County to map to FIPS 48507.');
  }

  for (const record of COUNTY_PROPERTY_RECORDS) {
    if (!/^48\d{3}$/.test(record.fips ?? '')) {
      errors.push(`${record.name}: invalid Texas county FIPS ${record.fips ?? '(missing)'}.`);
    }
  }

  const datasetValidation = validateCountyPropertyDataset(COUNTY_PROPERTY_RECORDS);
  errors.push(...datasetValidation.errors);

  return { valid: errors.length === 0, errors };
}

export const COUNTY_PROPERTY_IMPORT_VALIDATION = validateImportedTexasCountyPropertyData();
