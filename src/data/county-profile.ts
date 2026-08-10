import { TEXAS_CITIES } from '@/data/texas-places';
import { getCountyPropertyRecordBySlug } from '@/data/property/county-property-data';

const TSL_COUNTY_SEATS_URL = 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html';
const CENSUS_POPULATION_API = 'https://api.census.gov/data/2020/dec/pl';
const CENSUS_GEOINFO_API = 'https://api.census.gov/data/2020/geoinfo';

export type CountyProfile = {
  countySeat?: string;
  population2020?: number;
  landAreaSquareMiles?: number;
  waterAreaSquareMiles?: number;
  latitude?: number;
  longitude?: number;
  majorCommunities: string[];
  sourceUrls: string[];
};

const cache = new Map<string, Promise<CountyProfile>>();

export function loadCountyProfile(slug: string, countyName: string) {
  const cached = cache.get(slug);
  if (cached) return cached;
  const promise = fetchCountyProfile(slug, countyName);
  cache.set(slug, promise);
  return promise;
}

async function fetchCountyProfile(slug: string, countyName: string): Promise<CountyProfile> {
  const propertyRecord = getCountyPropertyRecordBySlug(slug);
  const fips = propertyRecord?.fips;
  const countyCode = fips?.slice(2);
  const baseName = countyName.replace(/ County$/, '');
  const knownCommunities = TEXAS_CITIES
    .filter((city) => city.county === baseName)
    .map((city) => city.name)
    .sort((a, b) => a.localeCompare(b));

  const [seatResult, populationResult, geographyResult] = await Promise.allSettled([
    fetchCountySeat(baseName),
    countyCode ? fetchPopulation(countyCode) : Promise.resolve(undefined),
    countyCode ? fetchGeography(countyCode) : Promise.resolve({}),
  ]);

  const countySeat = seatResult.status === 'fulfilled' ? seatResult.value : undefined;
  const population2020 = populationResult.status === 'fulfilled' ? populationResult.value : undefined;
  const geography = geographyResult.status === 'fulfilled' ? geographyResult.value : {};
  const majorCommunities = Array.from(new Set([countySeat, ...knownCommunities].filter((value): value is string => Boolean(value))));

  return {
    countySeat,
    population2020,
    landAreaSquareMiles: geography.landAreaSquareMiles,
    waterAreaSquareMiles: geography.waterAreaSquareMiles,
    latitude: geography.latitude,
    longitude: geography.longitude,
    majorCommunities,
    sourceUrls: [TSL_COUNTY_SEATS_URL, CENSUS_POPULATION_API, CENSUS_GEOINFO_API],
  };
}

async function fetchCountySeat(countyName: string) {
  const response = await fetch(TSL_COUNTY_SEATS_URL, { headers: { accept: 'text/html' } });
  if (!response.ok) return undefined;
  const html = await response.text();
  const escaped = countyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const row = new RegExp(`<tr[^>]*>\\s*<td[^>]*>\\s*${escaped}\\s*</td>\\s*<td[^>]*>\\s*([^<]+)`, 'i').exec(html);
  if (row?.[1]) return decodeEntities(row[1].trim());

  const textPattern = new RegExp(`>${escaped}<[^>]*>\\s*</td>\\s*<td[^>]*>\\s*([^<]+)`, 'i').exec(html);
  return textPattern?.[1] ? decodeEntities(textPattern[1].trim()) : undefined;
}

async function fetchPopulation(countyCode: string) {
  const url = `${CENSUS_POPULATION_API}?get=NAME,P1_001N&for=county:${countyCode}&in=state:48`;
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) return undefined;
  const rows = await response.json() as string[][];
  const value = Number(rows?.[1]?.[1]);
  return Number.isFinite(value) ? value : undefined;
}

async function fetchGeography(countyCode: string) {
  const url = `${CENSUS_GEOINFO_API}?get=NAME,AREALAND,AREAWATR,INTPTLAT,INTPTLON&for=county:${countyCode}&in=state:48`;
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) return {};
  const rows = await response.json() as string[][];
  const row = rows?.[1];
  if (!row) return {};
  const squareMetersPerSquareMile = 2_589_988.110336;
  const land = Number(row[1]);
  const water = Number(row[2]);
  const latitude = Number(row[3]);
  const longitude = Number(row[4]);
  return {
    landAreaSquareMiles: Number.isFinite(land) ? land / squareMetersPerSquareMile : undefined,
    waterAreaSquareMiles: Number.isFinite(water) ? water / squareMetersPerSquareMile : undefined,
    latitude: Number.isFinite(latitude) ? latitude : undefined,
    longitude: Number.isFinite(longitude) ? longitude : undefined,
  };
}

function decodeEntities(value: string) {
  return value.replace(/&amp;/g, '&').replace(/&#0*39;|&apos;/g, "'").replace(/&quot;/g, '"');
}

export function countyProfileDescription(countyName: string, profile: CountyProfile) {
  const facts: string[] = [];
  if (profile.countySeat) facts.push(`Its county seat is ${profile.countySeat}`);
  if (profile.population2020) facts.push(`the 2020 Census counted ${profile.population2020.toLocaleString('en-US')} residents`);
  if (profile.landAreaSquareMiles) facts.push(`it covers about ${Math.round(profile.landAreaSquareMiles).toLocaleString('en-US')} square miles of land`);
  if (profile.majorCommunities.length > 1) facts.push(`communities in this reference include ${profile.majorCommunities.slice(0, 4).join(', ')}`);
  const detail = facts.length ? `${facts.join('; ')}.` : 'Texas Defined is assembling verified county-level facts from state and federal sources.';
  return `${countyName} is one of Texas's 254 counties. ${detail} This county reference uses Texas State Library and U.S. Census Bureau data and will expand as additional local sources are verified.`;
}
