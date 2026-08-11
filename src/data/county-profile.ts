import { TEXAS_CITIES } from '@/data/texas-places';
import { getCountyPropertyRecordBySlug } from '@/data/property/county-property-data';

const TSL_COUNTY_SEATS_URL = 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html';
const CENSUS_TIGERWEB_COUNTIES_URL = 'https://tigerweb.geo.census.gov/arcgis/rest/services/Census2020/State_County/MapServer/1/query';
const CENSUS_TIGERWEB_SOURCE_URL = 'https://tigerweb.geo.census.gov/arcgis/rest/services/Census2020/State_County/MapServer/1';

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

type CountyCensusFacts = {
  population2020?: number;
  landAreaSquareMiles?: number;
  waterAreaSquareMiles?: number;
  latitude?: number;
  longitude?: number;
};

type TigerwebCountyFeature = {
  attributes?: {
    COUNTY?: string | number;
    POP100?: string | number;
    AREALAND?: string | number;
    AREAWATER?: string | number;
    INTPTLAT?: string | number;
    INTPTLON?: string | number;
  };
};

const cache = new Map<string, Promise<CountyProfile>>();
let countySeatsPromise: Promise<Map<string, string>> | undefined;
let countyCensusFactsPromise: Promise<Map<string, CountyCensusFacts>> | undefined;

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
  countyCensusFactsPromise ??= fetchCountyCensusFacts();

  const [seatsResult, censusFactsResult] = await Promise.allSettled([
    countySeatsPromise,
    countyCensusFactsPromise,
  ]);

  const countySeatName = seatsResult.status === 'fulfilled' ? seatsResult.value.get(normalizeCountyKey(baseName)) : undefined;
  const countySeatPlace = countySeatName ? toCountySeatPlace(countySeatName) : undefined;
  const countySeat = countySeatPlace?.displayName;
  const censusFacts = censusFactsResult.status === 'fulfilled' && countyCode ? censusFactsResult.value.get(countyCode) ?? {} : {};
  const majorCommunities = Array.from(new Set([countySeatName, ...knownCommunities].filter((value): value is string => Boolean(value))));

  return {
    countySeat,
    countySeatPlace,
    population2020: censusFacts.population2020,
    landAreaSquareMiles: censusFacts.landAreaSquareMiles,
    waterAreaSquareMiles: censusFacts.waterAreaSquareMiles,
    latitude: censusFacts.latitude,
    longitude: censusFacts.longitude,
    majorCommunities,
    sourceUrls: [TSL_COUNTY_SEATS_URL, CENSUS_TIGERWEB_SOURCE_URL],
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

async function fetchCountyCensusFacts() {
  const url = new URL(CENSUS_TIGERWEB_COUNTIES_URL);
  url.searchParams.set('where', "STATE='48'");
  url.searchParams.set('outFields', 'COUNTY,POP100,AREALAND,AREAWATER,INTPTLAT,INTPTLON');
  url.searchParams.set('returnGeometry', 'false');
  url.searchParams.set('f', 'json');

  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) return new Map<string, CountyCensusFacts>();

  const payload = await response.json() as { features?: TigerwebCountyFeature[] };
  const squareMetersPerSquareMile = 2_589_988.110336;
  const result = new Map<string, CountyCensusFacts>();

  for (const feature of payload.features ?? []) {
    const attributes = feature.attributes;
    if (!attributes?.COUNTY) continue;
    const countyCode = String(attributes.COUNTY).padStart(3, '0');
    const population = finiteNumber(attributes.POP100);
    const land = finiteNumber(attributes.AREALAND);
    const water = finiteNumber(attributes.AREAWATER);
    const latitude = finiteNumber(attributes.INTPTLAT);
    const longitude = finiteNumber(attributes.INTPTLON);

    result.set(countyCode, {
      population2020: population,
      landAreaSquareMiles: land != null ? land / squareMetersPerSquareMile : undefined,
      waterAreaSquareMiles: water != null ? water / squareMetersPerSquareMile : undefined,
      latitude,
      longitude,
    });
  }

  return result;
}

function finiteNumber(value: string | number | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
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
