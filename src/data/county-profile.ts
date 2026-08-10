import { TEXAS_CITIES } from '@/data/texas-places';
import { getCountyPropertyRecordBySlug } from '@/data/property/county-property-data';

const TSL_COUNTY_SEATS_URL = 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html';
const CENSUS_POPULATION_API = 'https://api.census.gov/data/2020/dec/pl';
const CENSUS_GEOINFO_API = 'https://api.census.gov/data/2020/geoinfo';

export type CountySeatPlace = {
  name: string;
  displayName: string;
  entityType: 'place';
  role: 'county-seat';
  state: 'Texas';
  sourceUrl: string;
};

export type CountyProfile = {
  countySeat?: string;
  countySeatPlace?: CountySeatPlace;
  population2020?: number;
  landAreaSquareMiles?: number;
  waterAreaSquareMiles?: number;
  latitude?: number;
  longitude?: number;
  majorCommunities: string[];
  sourceUrls: string[];
};

type CountyGeography = {
  landAreaSquareMiles?: number;
  waterAreaSquareMiles?: number;
  latitude?: number;
  longitude?: number;
};

const cache = new Map<string, Promise<CountyProfile>>();
let countySeatsPromise: Promise<Map<string, string>> | undefined;
let countyPopulationPromise: Promise<Map<string, number>> | undefined;
let countyGeographyPromise: Promise<Map<string, CountyGeography>> | undefined;

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

  countySeatsPromise ??= fetchCountySeats();
  countyPopulationPromise ??= fetchCountyPopulations();
  countyGeographyPromise ??= fetchCountyGeographies();

  const [seatsResult, populationsResult, geographyResult] = await Promise.allSettled([
    countySeatsPromise,
    countyPopulationPromise,
    countyGeographyPromise,
  ]);

  const countySeatName = seatsResult.status === 'fulfilled' ? seatsResult.value.get(normalizeCountyKey(baseName)) : undefined;
  const countySeatPlace = countySeatName ? toCountySeatPlace(countySeatName) : undefined;
  const countySeat = countySeatPlace?.displayName;
  const population2020 = populationsResult.status === 'fulfilled' && countyCode ? populationsResult.value.get(countyCode) : undefined;
  const geography = geographyResult.status === 'fulfilled' && countyCode ? geographyResult.value.get(countyCode) ?? {} : {};
  const majorCommunities = Array.from(new Set([countySeatName, ...knownCommunities].filter((value): value is string => Boolean(value))));

  return {
    countySeat,
    countySeatPlace,
    population2020,
    landAreaSquareMiles: geography.landAreaSquareMiles,
    waterAreaSquareMiles: geography.waterAreaSquareMiles,
    latitude: geography.latitude,
    longitude: geography.longitude,
    majorCommunities,
    sourceUrls: [TSL_COUNTY_SEATS_URL, CENSUS_POPULATION_API, CENSUS_GEOINFO_API],
  };
}

function toCountySeatPlace(name: string): CountySeatPlace {
  return {
    name,
    displayName: `${name}, Texas`,
    entityType: 'place',
    role: 'county-seat',
    state: 'Texas',
    sourceUrl: TSL_COUNTY_SEATS_URL,
  };
}

async function fetchCountySeats() {
  const response = await fetch(TSL_COUNTY_SEATS_URL, { headers: { accept: 'text/html' } });
  if (!response.ok) return new Map<string, string>();
  const html = await response.text();
  const result = new Map<string, string>();
  for (const row of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => stripHtml(match[1]));
    if (cells.length < 2) continue;
    const county = cells[0].replace(/ County$/i, '').trim();
    const seat = cells[1].trim();
    if (county && seat) result.set(normalizeCountyKey(county), seat);
  }
  return result;
}

async function fetchCountyPopulations() {
  const url = `${CENSUS_POPULATION_API}?get=NAME,P1_001N&for=county:*&in=state:48`;
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) return new Map<string, number>();
  const rows = await response.json() as string[][];
  const result = new Map<string, number>();
  for (const row of rows.slice(1)) {
    const value = Number(row[1]);
    const countyCode = row[3];
    if (countyCode && Number.isFinite(value)) result.set(countyCode, value);
  }
  return result;
}

async function fetchCountyGeographies() {
  const url = `${CENSUS_GEOINFO_API}?get=NAME,AREALAND,AREAWATR,INTPTLAT,INTPTLON&for=county:*&in=state:48`;
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) return new Map<string, CountyGeography>();
  const rows = await response.json() as string[][];
  const squareMetersPerSquareMile = 2_589_988.110336;
  const result = new Map<string, CountyGeography>();
  for (const row of rows.slice(1)) {
    const countyCode = row[6];
    if (!countyCode) continue;
    const land = Number(row[1]);
    const water = Number(row[2]);
    const latitude = Number(row[3]);
    const longitude = Number(row[4]);
    result.set(countyCode, {
      landAreaSquareMiles: Number.isFinite(land) ? land / squareMetersPerSquareMile : undefined,
      waterAreaSquareMiles: Number.isFinite(water) ? water / squareMetersPerSquareMile : undefined,
      latitude: Number.isFinite(latitude) ? latitude : undefined,
      longitude: Number.isFinite(longitude) ? longitude : undefined,
    });
  }
  return result;
}

function normalizeCountyKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function stripHtml(value: string) {
  return decodeEntities(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function decodeEntities(value: string) {
  return value.replace(/&amp;/g, '&').replace(/&#0*39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ');
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
