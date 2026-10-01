import { createFileRoute } from '@tanstack/react-router';

const TIGERWEB = 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2026/MapServer';
const ZCTA_LAYER = 2;
const INCORPORATED_PLACE_LAYER = 28;
const CENSUS_PLACE_LAYER = 30;
const COUNTY_LAYER = 82;
const RESPONSE_HEADERS = {
  'cache-control': 'private, no-store, max-age=0',
  'content-type': 'application/json; charset=utf-8',
  'referrer-policy': 'no-referrer',
  'x-robots-tag': 'noindex, nofollow',
};

type ArcGisFeature = {
  attributes?: Record<string, unknown>;
  geometry?: Record<string, unknown>;
};

type ArcGisResponse = {
  features?: ArcGisFeature[];
  error?: { message?: string };
};

type PlaceLookupBody = {
  city?: unknown;
  zip?: unknown;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: RESPONSE_HEADERS });
}

function cleanCity(value: unknown) {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim().replace(/\s+/g, ' ');
  if (cleaned.length < 2 || cleaned.length > 80 || !/^[A-Za-z0-9 .'-]+$/.test(cleaned)) return null;
  return cleaned;
}

function cleanZip(value: unknown) {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  return /^\d{5}$/.test(cleaned) ? cleaned : null;
}

function sqlLiteral(value: string) {
  return `'${value.replace(/'/g, "''")}'`;
}

async function queryLayer(layer: number, params: Record<string, string>) {
  const url = new URL(`${TIGERWEB}/${layer}/query`);
  url.searchParams.set('f', 'json');
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const response = await fetch(url, { headers: { accept: 'application/json' }, cache: 'no-store' });
  if (!response.ok) throw new Error(`TIGERweb ${response.status}`);
  const payload = await response.json() as ArcGisResponse;
  if (payload.error) throw new Error(payload.error.message ?? 'TIGERweb query failed');
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
    headers: { accept: 'application/json', 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body,
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`TIGERweb ${response.status}`);
  const payload = await response.json() as ArcGisResponse;
  if (payload.error) throw new Error(payload.error.message ?? 'TIGERweb county query failed');
  return payload.features ?? [];
}

async function governedCountyResults(features: ArcGisFeature[]) {
  const { TEXAS_COUNTIES } = await import('@/data/texas-places');
  const codes = new Set<string>();
  for (const feature of features) {
    const geoid = feature.attributes?.GEOID;
    if (typeof geoid === 'string' && /^48\d{3}$/.test(geoid)) codes.add(geoid.slice(2));
  }
  return TEXAS_COUNTIES
    .filter((county) => codes.has(county.code))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((county) => ({ name: county.name, slug: county.slug, url: `/county/${county.slug}` }));
}

async function lookupCity(city: string) {
  const where = `STATE='48' AND UPPER(BASENAME)=UPPER(${sqlLiteral(city)})`;
  const params = {
    where,
    outFields: 'BASENAME,NAME,STATE',
    returnGeometry: 'true',
    outSR: '4326',
  };
  const layers = await Promise.all([
    queryLayer(INCORPORATED_PLACE_LAYER, params),
    queryLayer(CENSUS_PLACE_LAYER, params),
  ]);
  const places = layers.flat();
  if (!places.length) return { places: [], counties: [] };

  const countyFeatures = (await Promise.all(
    places.filter((place) => place.geometry).map((place) => countiesForGeometry(place.geometry!)),
  )).flat();
  return { places, counties: await governedCountyResults(countyFeatures) };
}

async function lookupZip(zip: string) {
  const places = await queryLayer(ZCTA_LAYER, {
    where: `ZCTA5=${sqlLiteral(zip)}`,
    outFields: 'ZCTA5,NAME',
    returnGeometry: 'true',
    outSR: '4326',
  });
  if (!places.length) return { places: [], counties: [] };
  const countyFeatures = (await Promise.all(
    places.filter((place) => place.geometry).map((place) => countiesForGeometry(place.geometry!)),
  )).flat();
  return { places, counties: await governedCountyResults(countyFeatures) };
}

export const Route = createFileRoute('/api/find-counties-by-place')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: PlaceLookupBody;
        try {
          body = await request.json() as PlaceLookupBody;
        } catch {
          return json({ ok: false, error: 'Enter a Texas city or 5-digit ZIP code.' }, 400);
        }

        const city = cleanCity(body.city);
        const zip = cleanZip(body.zip);
        if ((city && zip) || (!city && !zip)) {
          return json({ ok: false, error: 'Enter either one Texas city or one 5-digit ZIP code.' }, 400);
        }

        try {
          const result = city ? await lookupCity(city) : await lookupZip(zip!);
          if (!result.places.length) {
            return json({ ok: false, error: city ? `No Texas Census place named ${city} was found.` : `ZIP Code Tabulation Area ${zip} was not found in the Census data.` }, 404);
          }
          if (!result.counties.length) {
            return json({ ok: false, error: 'The place was found, but no Texas county overlap could be resolved.' }, 404);
          }
          return json({
            ok: true,
            queryType: city ? 'city' : 'zip',
            query: city ?? zip,
            counties: result.counties,
            source: 'U.S. Census Bureau TIGERweb ACS 2026',
            note: 'City and ZIP geographies can cross county lines. Use a complete street address when you need the county for a specific property.',
          });
        } catch {
          return json({ ok: false, error: 'The Census geography service could not complete this lookup. Try again shortly.' }, 502);
        }
      },
    },
  },
});
