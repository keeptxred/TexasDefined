import { createFileRoute } from '@tanstack/react-router';

const CENSUS_GEOCODER = 'https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress';
const TIGERWEB = 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2026/MapServer';
const ZCTA_LAYER = 2;
const INCORPORATED_PLACE_LAYER = 28;
const CENSUS_PLACE_LAYER = 30;
const COUNTY_LAYER = 82;
const LOOKUP_NOTE = 'City and ZIP geographies can cross county lines. Use a complete street address when you need the county for a specific property.';
const RESPONSE_HEADERS = {
  'cache-control': 'private, no-store, max-age=0',
  'content-type': 'application/json; charset=utf-8',
  'referrer-policy': 'no-referrer',
  'x-robots-tag': 'noindex, nofollow',
};

type CensusCounty = {
  COUNTY?: unknown;
  STATE?: unknown;
  NAME?: unknown;
};

type CensusAddressMatch = {
  matchedAddress?: unknown;
  geographies?: {
    Counties?: unknown;
  };
};

type ArcGisFeature = {
  attributes?: Record<string, unknown>;
  geometry?: Record<string, unknown>;
};

type ArcGisResponse = {
  features?: ArcGisFeature[];
  error?: { message?: string };
};

type LookupBody = {
  address?: unknown;
  city?: unknown;
  zip?: unknown;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: RESPONSE_HEADERS });
}

function cleanAddress(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim().replace(/\s+/g, ' ');
  if (cleaned.length < 5 || cleaned.length > 100) return null;
  return cleaned;
}

function cleanCity(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim().replace(/\s+/g, ' ');
  if (cleaned.length < 2 || cleaned.length > 80 || !/^[\p{L}\p{M} .'-]+$/u.test(cleaned)) return null;
  return cleaned;
}

function cleanZip(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  return /^\d{5}$/.test(cleaned) ? cleaned : null;
}

function firstCounty(match: CensusAddressMatch | undefined): CensusCounty | null {
  const counties = match?.geographies?.Counties;
  if (!Array.isArray(counties) || counties.length === 0) return null;
  const county = counties[0];
  return county && typeof county === 'object' ? county as CensusCounty : null;
}

function sqlLiteral(value: string) {
  return `'${value.replace(/'/g, "''")}'`;
}

async function queryTigerLayer(layer: number, params: Record<string, string>) {
  const url = new URL(`${TIGERWEB}/${layer}/query`);
  url.searchParams.set('f', 'json');
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('tigerweb-upstream');

  const payload = await response.json() as ArcGisResponse;
  if (payload.error) throw new Error('tigerweb-query');
  return payload.features ?? [];
}

async function countiesForGeometry(geometry: Record<string, unknown>) {
  const url = new URL(`${TIGERWEB}/${COUNTY_LAYER}/query`);
  const body = new URLSearchParams({
    f: 'json',
    where: "STATE='48'",
    outFields: 'GEOID,BASENAME',
    returnGeometry: 'false',
    geometry: JSON.stringify(geometry),
    geometryType: 'esriGeometryPolygon',
    inSR: '4326',
    spatialRel: 'esriSpatialRelIntersects',
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body,
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('tigerweb-upstream');

  const payload = await response.json() as ArcGisResponse;
  if (payload.error) throw new Error('tigerweb-query');
  return payload.features ?? [];
}

async function governedCountyResults(features: ArcGisFeature[]) {
  const codes = new Set<string>();
  for (const feature of features) {
    const geoid = feature.attributes?.GEOID;
    if (typeof geoid === 'string' && /^48\d{3}$/.test(geoid)) codes.add(geoid.slice(2));
  }

  const { TEXAS_COUNTIES } = await import('@/data/texas-places');
  return TEXAS_COUNTIES
    .filter((county) => codes.has(county.code))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((county) => ({
      name: county.name,
      slug: county.slug,
      url: `/county/${county.slug}`,
    }));
}

async function findCountiesByPlace(type: 'city' | 'zip', value: string) {
  let places: ArcGisFeature[] = [];

  if (type === 'city') {
    const params = {
      where: `STATE='48' AND UPPER(BASENAME)=UPPER(${sqlLiteral(value)})`,
      outFields: 'BASENAME,NAME,STATE',
      returnGeometry: 'true',
      outSR: '4326',
    };
    const [incorporated, designated] = await Promise.all([
      queryTigerLayer(INCORPORATED_PLACE_LAYER, params),
      queryTigerLayer(CENSUS_PLACE_LAYER, params),
    ]);
    places = [...incorporated, ...designated];
  } else {
    places = await queryTigerLayer(ZCTA_LAYER, {
      where: `ZCTA5=${sqlLiteral(value)}`,
      outFields: 'ZCTA5,NAME',
      returnGeometry: 'true',
      outSR: '4326',
    });
  }

  if (!places.length) {
    return json({
      ok: false,
      error: type === 'city'
        ? `No Texas Census place named ${value} was found. Check the spelling or try a complete street address.`
        : `ZIP Code Tabulation Area ${value} was not found in the Census data. Check the ZIP code or try a complete street address.`,
    }, 404);
  }

  const countyFeatures = (await Promise.all(
    places
      .filter((place) => place.geometry)
      .map((place) => countiesForGeometry(place.geometry!)),
  )).flat();
  const counties = await governedCountyResults(countyFeatures);

  if (!counties.length) {
    return json({ ok: false, error: 'The Census geography was found, but its Texas county overlap could not be resolved. Try a complete street address.' }, 502);
  }

  return json({
    ok: true,
    queryType: type,
    query: value,
    counties,
    source: 'U.S. Census Bureau TIGERweb ACS 2026',
    note: LOOKUP_NOTE,
  });
}

async function findCountyByAddress(address: string) {
  const url = new URL(CENSUS_GEOCODER);
  url.searchParams.set('address', address);
  url.searchParams.set('benchmark', 'Public_AR_Current');
  url.searchParams.set('vintage', 'Current_Current');
  url.searchParams.set('layers', 'Counties');
  url.searchParams.set('format', 'json');

  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    cache: 'no-store',
  });
  if (!response.ok) {
    return json({ ok: false, error: 'The Census address service is temporarily unavailable. Try again shortly.' }, 502);
  }

  const payload = await response.json() as {
    result?: { addressMatches?: unknown };
  };
  const matches = payload.result?.addressMatches;
  if (!Array.isArray(matches) || matches.length === 0) {
    return json({ ok: false, error: 'No Census address match was found. Check the street number, street name, city, state and ZIP code.' }, 404);
  }

  const match = matches[0] as CensusAddressMatch;
  const county = firstCounty(match);
  if (!county) {
    return json({ ok: false, error: 'The address matched, but county geography was not returned. Try the complete address including ZIP code.' }, 404);
  }

  const stateCode = typeof county.STATE === 'string' ? county.STATE : '';
  const countyCode = typeof county.COUNTY === 'string' ? county.COUNTY.padStart(3, '0') : '';
  if (stateCode !== '48') {
    return json({ ok: false, error: 'That address is outside Texas. This tool only returns Texas counties.' }, 422);
  }

  const { TEXAS_COUNTIES } = await import('@/data/texas-places');
  const record = TEXAS_COUNTIES.find((candidate) => candidate.code === countyCode);
  if (!record) {
    return json({ ok: false, error: 'The county code returned by Census could not be matched to the Texas county directory.' }, 502);
  }

  return json({
    ok: true,
    countyName: record.name,
    countySlug: record.slug,
    countyFips: `48${record.code}`,
    matchedAddress: typeof match.matchedAddress === 'string' ? match.matchedAddress : address,
    countyUrl: `/county/${record.slug}`,
    officialCountyDirectoryUrl: record.officialDirectoryUrl,
    source: 'U.S. Census Bureau Geocoding Services',
  });
}

export const Route = createFileRoute('/api/find-my-county')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: LookupBody;
        try {
          body = await request.json() as LookupBody;
        } catch {
          return json({ ok: false, error: 'Enter a county lookup value.' }, 400);
        }

        const city = cleanCity(body?.city);
        const zip = cleanZip(body?.zip);
        const address = cleanAddress(body?.address);
        const supplied = [city, zip, address].filter(Boolean).length;

        if (supplied !== 1) {
          if (body?.city !== undefined) return json({ ok: false, error: 'Enter a Texas city name of 2 to 80 characters.' }, 400);
          if (body?.zip !== undefined) return json({ ok: false, error: 'Enter a 5-digit ZIP code.' }, 400);
          return json({ ok: false, error: 'Enter a complete street address of 100 characters or fewer.' }, 400);
        }

        try {
          if (city) return await findCountiesByPlace('city', city);
          if (zip) return await findCountiesByPlace('zip', zip);
          return await findCountyByAddress(address!);
        } catch {
          const placeLookup = Boolean(city || zip);
          return json({
            ok: false,
            error: placeLookup
              ? 'The Census geography service could not be reached. Try again shortly or use a complete street address.'
              : 'The Census address service could not be reached. Try again shortly.',
          }, 502);
        }
      },
    },
  },
});
