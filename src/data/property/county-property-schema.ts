import type { TexasCounty } from '@/data/texas-places';

export type CountyOfficeContact = {
  name: string | null;
  websiteUrl: string | null;
  phone: string | null;
  address: string | null;
  email: string | null;
};

export type CountyPropertyLinks = {
  appraisalDistrictUrl: string | null;
  taxOfficeUrl: string | null;
  paymentUrl: string | null;
  protestUrl: string | null;
  exemptionUrl: string | null;
  gisUrl: string | null;
  propertySearchUrl: string | null;
  countyWebsiteUrl: string | null;
};

export type CountySpecialDistrictPresence = {
  mud: boolean | null;
  esd: boolean | null;
  hospitalDistrict: boolean | null;
  communityCollegeDistrict: boolean | null;
  otherSpecialDistricts: boolean | null;
};

export type CountyPropertyProfile = {
  /** Five-digit Census county FIPS code. Never substitute the legacy TexasCounty.code value. */
  fips: string | null;
  region: string | null;
  population: number | null;
  majorCities: string[];
  appraisalDistrict: CountyOfficeContact;
  taxOffice: CountyOfficeContact;
  links: CountyPropertyLinks;
  specialDistricts: CountySpecialDistrictPresence;
  lastVerifiedAt: string | null;
  sourceUrls: string[];
};

export type CountyPropertyRecord = TexasCounty & CountyPropertyProfile;

export const EMPTY_COUNTY_OFFICE_CONTACT: CountyOfficeContact = {
  name: null,
  websiteUrl: null,
  phone: null,
  address: null,
  email: null,
};

export const EMPTY_COUNTY_PROPERTY_LINKS: CountyPropertyLinks = {
  appraisalDistrictUrl: null,
  taxOfficeUrl: null,
  paymentUrl: null,
  protestUrl: null,
  exemptionUrl: null,
  gisUrl: null,
  propertySearchUrl: null,
  countyWebsiteUrl: null,
};

export const EMPTY_COUNTY_SPECIAL_DISTRICTS: CountySpecialDistrictPresence = {
  mud: null,
  esd: null,
  hospitalDistrict: null,
  communityCollegeDistrict: null,
  otherSpecialDistricts: null,
};

export function createEmptyCountyPropertyRecord(county: TexasCounty): CountyPropertyRecord {
  return {
    ...county,
    fips: null,
    region: null,
    population: null,
    majorCities: [],
    appraisalDistrict: { ...EMPTY_COUNTY_OFFICE_CONTACT },
    taxOffice: { ...EMPTY_COUNTY_OFFICE_CONTACT },
    links: {
      ...EMPTY_COUNTY_PROPERTY_LINKS,
      countyWebsiteUrl: county.officialDirectoryUrl,
    },
    specialDistricts: { ...EMPTY_COUNTY_SPECIAL_DISTRICTS },
    lastVerifiedAt: null,
    sourceUrls: [county.officialDirectoryUrl],
  };
}

export function validateCountyPropertyRecord(record: CountyPropertyRecord) {
  const errors: string[] = [];

  if (!record.name.endsWith(' County')) errors.push('County name must end with “County”.');
  if (!record.slug) errors.push('County slug is required.');
  if (record.fips !== null && !/^48\d{3}$/.test(record.fips)) {
    errors.push('Texas county FIPS must be a five-digit code beginning with 48.');
  }
  if (record.population !== null && (!Number.isInteger(record.population) || record.population < 0)) {
    errors.push('Population must be a non-negative integer when present.');
  }
  if (record.lastVerifiedAt !== null && Number.isNaN(Date.parse(record.lastVerifiedAt))) {
    errors.push('lastVerifiedAt must be an ISO-compatible date when present.');
  }

  const urls = [
    record.officialDirectoryUrl,
    record.appraisalDistrict.websiteUrl,
    record.taxOffice.websiteUrl,
    ...Object.values(record.links),
    ...record.sourceUrls,
  ].filter((value): value is string => Boolean(value));

  for (const url of urls) {
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) errors.push(`Unsupported URL protocol: ${url}`);
    } catch {
      errors.push(`Invalid URL: ${url}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validateCountyPropertyDataset(records: CountyPropertyRecord[]) {
  const errors: string[] = [];
  const slugCounts = new Map<string, number>();
  const fipsCounts = new Map<string, number>();

  for (const record of records) {
    const validation = validateCountyPropertyRecord(record);
    errors.push(...validation.errors.map((error) => `${record.name}: ${error}`));
    slugCounts.set(record.slug, (slugCounts.get(record.slug) ?? 0) + 1);
    if (record.fips) fipsCounts.set(record.fips, (fipsCounts.get(record.fips) ?? 0) + 1);
  }

  for (const [slug, count] of slugCounts) {
    if (count > 1) errors.push(`Duplicate county slug: ${slug}`);
  }
  for (const [fips, count] of fipsCounts) {
    if (count > 1) errors.push(`Duplicate county FIPS: ${fips}`);
  }

  return { valid: errors.length === 0, errors };
}
