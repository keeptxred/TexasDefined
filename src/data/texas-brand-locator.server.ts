import { resolveRelocationAddressServer } from "./relocation-address.server";
import type {
  TexasBrandLocatorBrand,
  TexasBrandLocatorLocation,
  TexasBrandLocatorResponse,
} from "./texas-brand-locator.types";

type Point = { latitude: number; longitude: number };
type UnknownRecord = Record<string, unknown>;
type VerifiedBrandLocation = {
  id: string;
  brand: "bucees";
  name: string;
  street: string;
  city: string;
  state: "TX";
  postalCode: string;
  sourceUrl: string;
};
type BrandLocationRow = {
  id: string;
  brand_slug: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  source_url: string;
};
type BrandLocationQueryResult = { data: BrandLocationRow[] | null; error: { message: string } | null };
type BrandLocationQuery = PromiseLike<BrandLocationQueryResult> & {
  eq: (column: string, value: string) => BrandLocationQuery;
  order: (column: string, options?: { ascending?: boolean }) => BrandLocationQuery;
};
type BrandLocationsAdminClient = {
  from: (table: string) => {
    select: (columns: string) => BrandLocationQuery;
  };
};

const TEXAS_BRAND_LOCATION_SOURCES = {
  heb: {
    label: "H-E-B official store locator",
    url: "https://www.heb.com/store-locations",
  },
  bucees: {
    label: "Buc-ee's official locations",
    url: "https://buc-ees.com/locations/",
  },
} as const;

const HEB_LOCATOR_ENDPOINT = "https://www.heb.com/commerce-api/v1/store/locator/address";
const CENSUS_BATCH_ENDPOINT = "https://geocoding.geo.census.gov/geocoder/locations/addressbatch";
const REQUEST_TIMEOUT_MS = 8000;
const RESULTS_PER_BRAND = 5;

let buceesLocationsPromise: Promise<VerifiedBrandLocation[]> | null = null;
let buceesCoordinatesPromise: Promise<Map<string, Point>> | null = null;

const asRecord = (value: unknown): UnknownRecord => value && typeof value === "object" ? value as UnknownRecord : {};
const stringValue = (...values: unknown[]) => values.find((value) => typeof value === "string" && value.trim()) as string | undefined;
const numberValue = (...values: unknown[]) => values.find((value) => typeof value === "number" && Number.isFinite(value)) as number | undefined;

function timeoutSignal() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return controller.signal;
}

function officialLocatorUrl(brand: TexasBrandLocatorBrand, query: string) {
  if (brand === "heb") return `https://www.heb.com/store-locations?address=${encodeURIComponent(query)}`;
  return TEXAS_BRAND_LOCATION_SOURCES.bucees.url;
}

function fallbackLinks(brands: TexasBrandLocatorBrand[], query: string) {
  return brands.map((brand) => ({
    brand,
    label: brand === "heb" ? "Open H-E-B's official store locator" : "Open Buc-ee's official locations",
    url: officialLocatorUrl(brand, query),
  }));
}

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function brandLocationAddress(location: VerifiedBrandLocation) {
  return `${location.street}, ${location.city}, ${location.state} ${location.postalCode}`;
}

function milesBetween(a: Point, b: Point) {
  const toRadians = (degrees: number) => degrees * Math.PI / 180;
  const earthRadiusMiles = 3958.7613;
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);
  const deltaLat = toRadians(b.latitude - a.latitude);
  const deltaLon = toRadians(b.longitude - a.longitude);
  const h = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(h));
}

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

function quotedCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

async function loadBuceesLocationsFromSupabase() {
  if (!buceesLocationsPromise) {
    buceesLocationsPromise = (async () => {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const client = supabaseAdmin as unknown as BrandLocationsAdminClient;
      const { data, error } = await client
        .from("texasdefined_brand_locations")
        .select("id,brand_slug,name,street,city,state,postal_code,source_url")
        .eq("brand_slug", "bucees")
        .eq("status", "active")
        .order("id", { ascending: true });
      if (error) throw new Error(`Brand location registry query failed: ${error.message}`);

      const locations = (data ?? [])
        .filter((row) => row.brand_slug === "bucees" && row.state === "TX")
        .map((row): VerifiedBrandLocation => ({
          id: row.id,
          brand: "bucees",
          name: row.name,
          street: row.street,
          city: row.city,
          state: "TX",
          postalCode: row.postal_code,
          sourceUrl: row.source_url,
        }));
      if (!locations.length) throw new Error("Buc-ee's location registry returned no active Texas locations");
      return locations;
    })().catch((error) => {
      buceesLocationsPromise = null;
      throw error;
    });
  }
  return buceesLocationsPromise;
}

async function loadBuceesCoordinatesFromCensus(locations: VerifiedBrandLocation[]) {
  const rows = locations.map((location) => [
    location.id,
    location.street,
    location.city,
    location.state,
    location.postalCode,
  ].map(quotedCsv).join(",")).join("\n");

  const form = new FormData();
  form.set("benchmark", "Public_AR_Current");
  form.set("addressFile", new Blob([rows], { type: "text/csv" }), "texasdefined-bucees.csv");

  const response = await fetch(CENSUS_BATCH_ENDPOINT, {
    method: "POST",
    body: form,
    headers: { accept: "text/csv" },
    signal: timeoutSignal(),
  });
  if (!response.ok) throw new Error(`Census batch geocoder returned ${response.status}`);

  const coordinates = new Map<string, Point>();
  const text = await response.text();
  for (const line of text.split(/\r?\n/).filter(Boolean)) {
    const parts = parseCsvLine(line);
    const id = parts[0]?.trim();
    const coordinateField = parts.find((value) => /^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$/.test(value.trim()));
    if (!id || !coordinateField) continue;
    const [longitude, latitude] = coordinateField.split(",").map(Number);
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) coordinates.set(id, { latitude, longitude });
  }
  if (!coordinates.size) throw new Error("Census batch geocoder returned no Buc-ee's coordinates");
  return coordinates;
}

async function loadBuceesCoordinatesFallback(locations: VerifiedBrandLocation[]) {
  const coordinates = new Map<string, Point>();
  const batchSize = 6;
  for (let index = 0; index < locations.length; index += batchSize) {
    const batch = locations.slice(index, index + batchSize);
    const settled = await Promise.allSettled(batch.map(async (location) => {
      const result = await resolveRelocationAddressServer(brandLocationAddress(location));
      return result ? { id: location.id, latitude: result.latitude, longitude: result.longitude } : null;
    }));
    for (const result of settled) {
      if (result.status !== "fulfilled" || !result.value) continue;
      coordinates.set(result.value.id, { latitude: result.value.latitude, longitude: result.value.longitude });
    }
  }
  if (!coordinates.size) throw new Error("Census geocoder could not resolve Buc-ee's locations");
  return coordinates;
}

async function buceesCoordinates(locations: VerifiedBrandLocation[]) {
  if (!buceesCoordinatesPromise) {
    buceesCoordinatesPromise = loadBuceesCoordinatesFromCensus(locations)
      .catch(() => loadBuceesCoordinatesFallback(locations))
      .catch((error) => {
        buceesCoordinatesPromise = null;
        throw error;
      });
  }
  return buceesCoordinatesPromise;
}

function normalizeHebLocation(wrapper: unknown, query: string, index: number): TexasBrandLocatorLocation | null {
  const row = asRecord(wrapper);
  const store = asRecord(row.store ?? wrapper);
  const addressObject = asRecord(store.address);
  const coordinateObject = asRecord(store.coordinates ?? store.coordinate ?? store.location);
  const id = stringValue(store.id, store.storeId, store.storeNumber, store.corporateNumber) ?? `heb-result-${index + 1}`;
  const name = stringValue(store.name, store.storeName, store.displayName) ?? "H-E-B";
  const street = stringValue(store.streetAddress, store.address1, store.addressLine1, addressObject.streetAddress, addressObject.address1, addressObject.addressLine1);
  const city = stringValue(store.city, addressObject.city, addressObject.locality);
  const state = stringValue(store.state, addressObject.state, addressObject.region) ?? "TX";
  const postalCode = stringValue(store.postalCode, store.zip, store.zipCode, addressObject.postalCode, addressObject.zip);
  const address = [street, city, state && postalCode ? `${state} ${postalCode}` : state || postalCode].filter(Boolean).join(", ") || `${name}${postalCode ? `, TX ${postalCode}` : ", Texas"}`;
  const latitude = numberValue(store.latitude, store.lat, coordinateObject.latitude, coordinateObject.lat);
  const longitude = numberValue(store.longitude, store.lng, store.lon, coordinateObject.longitude, coordinateObject.lng, coordinateObject.lon);
  const distance = numberValue(row.distance, store.distance, row.distanceMiles, store.distanceMiles);

  return {
    id: `heb-${id}`,
    brand: "heb",
    brandLabel: "H-E-B",
    name,
    address,
    city,
    postalCode,
    distanceMiles: distance,
    latitude,
    longitude,
    directionsUrl: directionsUrl(address),
    sourceLabel: TEXAS_BRAND_LOCATION_SOURCES.heb.label,
    sourceUrl: officialLocatorUrl("heb", query),
  };
}

async function findHebLocations(query: string) {
  const response = await fetch(HEB_LOCATOR_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": "TexasDefined/1.0 (+https://texasdefined.com)",
    },
    body: JSON.stringify({ address: query, curbsideOnly: false, radius: 100 }),
    signal: timeoutSignal(),
  });
  if (!response.ok) throw new Error(`H-E-B locator returned ${response.status}`);
  const payload = asRecord(await response.json());
  const stores = Array.isArray(payload.stores) ? payload.stores : [];
  return stores
    .map((store, index) => normalizeHebLocation(store, query, index))
    .filter((location): location is TexasBrandLocatorLocation => Boolean(location))
    .slice(0, RESULTS_PER_BRAND);
}

function normalizeBuceesLocation(location: VerifiedBrandLocation, point: Point, origin: Point): TexasBrandLocatorLocation {
  const address = brandLocationAddress(location);
  return {
    id: location.id,
    brand: "bucees",
    brandLabel: "Buc-ee's",
    name: location.name,
    address,
    city: location.city,
    postalCode: location.postalCode,
    distanceMiles: milesBetween(origin, point),
    latitude: point.latitude,
    longitude: point.longitude,
    directionsUrl: directionsUrl(address),
    sourceLabel: TEXAS_BRAND_LOCATION_SOURCES.bucees.label,
    sourceUrl: location.sourceUrl || TEXAS_BRAND_LOCATION_SOURCES.bucees.url,
  };
}

async function findBuceesLocations(origin: Point) {
  const locations = await loadBuceesLocationsFromSupabase();
  const coordinateMap = await buceesCoordinates(locations);
  return locations
    .map((location) => {
      const point = coordinateMap.get(location.id);
      return point ? normalizeBuceesLocation(location, point, origin) : null;
    })
    .filter((location): location is TexasBrandLocatorLocation => Boolean(location))
    .sort((a, b) => (a.distanceMiles ?? Number.POSITIVE_INFINITY) - (b.distanceMiles ?? Number.POSITIVE_INFINITY))
    .slice(0, RESULTS_PER_BRAND);
}

export async function findTexasBrandLocationsNearPointServer(input: {
  query: string;
  origin: Point;
  matchedAddress?: string | null;
  brands: TexasBrandLocatorBrand[];
}): Promise<TexasBrandLocatorResponse> {
  const query = input.query.trim();
  const selectedBrands = input.brands.length ? input.brands : ["heb", "bucees"];
  const notices: string[] = [];
  const results: TexasBrandLocatorLocation[] = [];

  if (selectedBrands.includes("heb")) {
    try {
      const heb = await findHebLocations(query);
      if (heb.length) results.push(...heb);
      else notices.push("H-E-B's live locator did not return a nearby store for this search. The official H-E-B locator link below carries your location into H-E-B's current results.");
    } catch {
      notices.push("H-E-B's live locator could not be reached from TexasDefined. The official H-E-B locator link below carries your location into H-E-B's current results.");
    }
  }

  if (selectedBrands.includes("bucees")) {
    try {
      results.push(...await findBuceesLocations(input.origin));
    } catch {
      notices.push("Buc-ee's official Texas location registry is available, but distance ranking could not be completed. Use the official Buc-ee's locations link below for the current list.");
    }
  }

  return {
    query,
    matchedAddress: input.matchedAddress ?? null,
    results,
    notices,
    fallbackLinks: fallbackLinks(selectedBrands, query),
  };
}

export async function findTexasBrandLocationsServer(input: { address: string; brands: TexasBrandLocatorBrand[] }): Promise<TexasBrandLocatorResponse> {
  const query = input.address.trim();
  const selectedBrands = input.brands.length ? input.brands : ["heb", "bucees"];
  const notices: string[] = [];
  const results: TexasBrandLocatorLocation[] = [];

  const needsOrigin = selectedBrands.includes("bucees");
  let resolvedAddress = null as Awaited<ReturnType<typeof resolveRelocationAddressServer>>;
  if (needsOrigin) {
    try {
      resolvedAddress = await resolveRelocationAddressServer(query);
      if (!resolvedAddress) notices.push("Use a complete Texas street address to rank Buc-ee's locations by distance. The official Buc-ee's locations link is still available below.");
    } catch {
      notices.push("Texas address matching is temporarily unavailable. Use the official Buc-ee's locations link below while the locator retries on a later search.");
    }
  }

  if (selectedBrands.includes("heb")) {
    try {
      const heb = await findHebLocations(query);
      if (heb.length) results.push(...heb);
      else notices.push("H-E-B's live locator did not return a nearby store for this search. The official H-E-B locator link below carries your address into H-E-B's current results.");
    } catch {
      notices.push("H-E-B's live locator could not be reached from TexasDefined. The official H-E-B locator link below carries your address into H-E-B's current results.");
    }
  }

  if (selectedBrands.includes("bucees") && resolvedAddress) {
    try {
      results.push(...await findBuceesLocations({ latitude: resolvedAddress.latitude, longitude: resolvedAddress.longitude }));
    } catch {
      notices.push("Buc-ee's official Texas location registry is available, but distance ranking could not be completed. Use the official Buc-ee's locations link below for the current list.");
    }
  }

  return {
    query,
    matchedAddress: resolvedAddress?.matchedAddress ?? null,
    results,
    notices,
    fallbackLinks: fallbackLinks(selectedBrands, query),
  };
}
