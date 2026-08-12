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
  populationDensityPerSquareMile?: number;
  waterSharePercent?: number;
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
  const populationDensityPerSquareMile = density(censusFacts.population2020, censusFacts.landAreaSquareMiles);
  const waterSharePercent = waterShare(censusFacts.landAreaSquareMiles, censusFacts.waterAreaSquareMiles);

  return {
    countySeat,
    countySeatPlace,
    population2020: censusFacts.population2020,
    landAreaSquareMiles: censusFacts.landAreaSquareMiles,
    waterAreaSquareMiles: censusFacts.waterAreaSquareMiles,
    populationDensityPerSquareMile,
    waterSharePercent,
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

function density(population: number | undefined, landAreaSquareMiles: number | undefined) {
  if (population == null || landAreaSquareMiles == null || landAreaSquareMiles <= 0) return undefined;
  return population / landAreaSquareMiles;
}

function waterShare(landAreaSquareMiles: number | undefined, waterAreaSquareMiles: number | undefined) {
  if (landAreaSquareMiles == null || waterAreaSquareMiles == null) return undefined;
  const totalArea = landAreaSquareMiles + waterAreaSquareMiles;
  if (totalArea <= 0) return undefined;
  return (waterAreaSquareMiles / totalArea) * 100;
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
  const population = profile.population2020;
  const landArea = profile.landAreaSquareMiles;
  const densityValue = profile.populationDensityPerSquareMile;
  const waterShareValue = profile.waterSharePercent;
  const communityNames = profile.majorCommunities.filter((community) => `${community}, Texas` !== profile.countySeat);
  const sentences = [`${countyName} is one of Texas's 254 counties.`];

  if (waterShareValue != null && waterShareValue >= 10 && landArea != null && profile.waterAreaSquareMiles != null) {
    sentences.push(`Census geography records about ${Math.round(landArea).toLocaleString('en-US')} square miles of land and ${Math.round(profile.waterAreaSquareMiles).toLocaleString('en-US')} square miles of water, with water accounting for about ${waterShareValue.toFixed(1)}% of the mapped land-and-water area.`);
    if (population != null) sentences.push(`The 2020 Census counted ${population.toLocaleString('en-US')} residents.`);
  } else if (population != null && landArea != null && densityValue != null) {
    sentences.push(`The 2020 Census counted ${population.toLocaleString('en-US')} residents across about ${Math.round(landArea).toLocaleString('en-US')} square miles of land, or roughly ${formatDensity(densityValue)} residents per square mile.`);
  } else if (population != null) {
    sentences.push(`The 2020 Census counted ${population.toLocaleString('en-US')} residents.`);
  } else if (landArea != null) {
    sentences.push(`Census geography records about ${Math.round(landArea).toLocaleString('en-US')} square miles of land.`);
  }

  if (profile.countySeat) sentences.push(`${profile.countySeat} is the verified county seat.`);

  if (communityNames.length >= 3) {
    sentences.push(`Texas Defined's structured place directory also connects this county reference to ${communityNames.slice(0, 4).join(', ')}${communityNames.length > 4 ? ', and additional listed communities' : ''}.`);
  } else if (communityNames.length === 2) {
    sentences.push(`The structured place directory also connects this county reference to ${communityNames[0]} and ${communityNames[1]}.`);
  } else if (communityNames.length === 1) {
    sentences.push(`The structured place directory also connects this county reference to ${communityNames[0]}.`);
  } else {
    sentences.push('Broader community coverage is added only when a place-to-county relationship is present in the structured Texas Defined directory.');
  }

  sentences.push('County-seat information is checked against the Texas State Library; population and geography figures come from the U.S. Census Bureau.');
  return sentences.join(' ');
}

function formatDensity(value: number) {
  if (value >= 100) return Math.round(value).toLocaleString('en-US');
  if (value >= 10) return value.toFixed(1);
  return value.toFixed(2);
}
