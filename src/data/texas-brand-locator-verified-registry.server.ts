import { resolveRelocationAddressServer } from "./relocation-address.server";
import {
  texasBrandLocatorLabel,
  texasBrandLocatorOfficialUrl,
  texasBrandLocatorProvider,
  type TexasBrandLocatorVerifiedRegistryBrand,
} from "./texas-brand-locator-registry";
import type { TexasBrandLocatorLocation } from "./texas-brand-locator.types";

type Point = { latitude: number; longitude: number };
type VerifiedBrandLocation = {
  id: string;
  brand: TexasBrandLocatorVerifiedRegistryBrand;
  name: string;
  street: string;
  city: string;
  countySlug: string | null;
  state: "TX";
  postalCode: string;
  latitude: number | null;
  longitude: number | null;
  sourceUrl: string;
};
type BrandLocationRow = {
  id: string;
  brand_slug: string;
  name: string;
  street: string;
  city: string;
  countySlug: string | null;
  state: string;
  postal_code: string;
  latitude: number | null;
  longitude: number | null;
  source_url: string;
};
type BrandLocationQueryResult = { data: BrandLocationRow[] | null; error: { message: string } | null };
type BrandLocationQuery = PromiseLike<BrandLocationQueryResult> & {
  eq: (column: string, value: string | boolean) => BrandLocationQuery;
  order: (column: string, options?: { ascending?: boolean }) => BrandLocationQuery;
};
type BrandLocationUpdateResult = { error: { message: string } | null };
type BrandLocationUpdateQuery = PromiseLike<BrandLocationUpdateResult> & {
  eq: (column: string, value: string | boolean) => BrandLocationUpdateQuery;
};
type BrandLocationsAdminClient = {
  from: (table: string) => {
    select: (columns: string) => BrandLocationQuery;
    update: (values: { latitude: number; longitude: number; updated_at: string }) => BrandLocationUpdateQuery;
  };
};

const CENSUS_BATCH_ENDPOINT = "https://geocoding.geo.census.gov/geocoder/locations/addressbatch";
const REQUEST_TIMEOUT_MS = 8_000;
const RESULTS_PER_BRAND = 5;

const locationPromises = new Map<TexasBrandLocatorVerifiedRegistryBrand, Promise<VerifiedBrandLocation[]>>();
const coordinatePromises = new Map<TexasBrandLocatorVerifiedRegistryBrand, Promise<Map<string, Point>>>();

function timeoutSignal() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return controller.signal;
}

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function locationAddress(location: VerifiedBrandLocation) {
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

function storedCoordinates(locations: VerifiedBrandLocation[]) {
  const coordinates = new Map<string, Point>();
  for (const location of locations) {
    if (typeof location.latitude !== "number" || !Number.isFinite(location.latitude)) continue;
    if (typeof location.longitude !== "number" || !Number.isFinite(location.longitude)) continue;
    coordinates.set(location.id, { latitude: location.latitude, longitude: location.longitude });
  }
  return coordinates;
}

async function loadLocationsFromSupabase(brand: TexasBrandLocatorVerifiedRegistryBrand) {
  const existing = locationPromises.get(brand);
  if (existing) return existing;

  const promise = (async () => {
    if (texasBrandLocatorProvider(brand) !== "verified-registry") {
      throw new Error(`${brand} is not configured for the verified registry provider`);
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const client = supabaseAdmin as unknown as BrandLocationsAdminClient;
    const { data, error } = await client
      .from("texasdefined_brand_locations")
      .select("id,brand_slug,name,street,city,countySlug:county_slug,state,postal_code,latitude,longitude,source_url")
      .eq("brand_slug", brand)
      .eq("public_locator_enabled", true)
      .eq("status", "active")
      .order("id", { ascending: true });
    if (error) throw new Error(`Brand location registry query failed: ${error.message}`);

    const locations = (data ?? [])
      .filter((row) => row.brand_slug === brand && row.state === "TX")
      .map((row): VerifiedBrandLocation => ({
        id: row.id,
        brand,
        name: row.name,
        street: row.street,
        city: row.city,
        countySlug: row.countySlug,
        state: "TX",
        postalCode: row.postal_code,
        latitude: row.latitude,
        longitude: row.longitude,
        sourceUrl: row.source_url,
      }));
    if (!locations.length) throw new Error(`${texasBrandLocatorLabel(brand)} location registry returned no public active Texas locations`);
    return locations;
  })().catch((error) => {
    locationPromises.delete(brand);
    throw error;
  });

  locationPromises.set(brand, promise);
  return promise;
}

async function loadCoordinatesFromCensus(brand: TexasBrandLocatorVerifiedRegistryBrand, locations: VerifiedBrandLocation[]) {
  const rows = locations.map((location) => [
    location.id,
    location.street,
    location.city,
    location.state,
    location.postalCode,
  ].map(quotedCsv).join(",")).join("\n");

  const form = new FormData();
  form.set("benchmark", "Public_AR_Current");
  form.set("addressFile", new Blob([rows], { type: "text/csv" }), `texasdefined-${brand}.csv`);

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
  if (!coordinates.size) throw new Error(`Census batch geocoder returned no ${texasBrandLocatorLabel(brand)} coordinates`);
  return coordinates;
}

async function loadCoordinatesFallback(brand: TexasBrandLocatorVerifiedRegistryBrand, locations: VerifiedBrandLocation[]) {
  const coordinates = new Map<string, Point>();
  const batchSize = 6;
  for (let index = 0; index < locations.length; index += batchSize) {
    const batch = locations.slice(index, index + batchSize);
    const settled = await Promise.allSettled(batch.map(async (location) => {
      const result = await resolveRelocationAddressServer(locationAddress(location));
      return result ? { id: location.id, latitude: result.latitude, longitude: result.longitude } : null;
    }));
    for (const result of settled) {
      if (result.status !== "fulfilled" || !result.value) continue;
      coordinates.set(result.value.id, { latitude: result.value.latitude, longitude: result.value.longitude });
    }
  }
  if (!coordinates.size) throw new Error(`Census geocoder could not resolve ${texasBrandLocatorLabel(brand)} locations`);
  return coordinates;
}

async function persistCoordinates(
  brand: TexasBrandLocatorVerifiedRegistryBrand,
  coordinates: Map<string, Point>,
) {
  if (!coordinates.size) return;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const client = supabaseAdmin as unknown as BrandLocationsAdminClient;
  const updatedAt = new Date().toISOString();
  const updates = await Promise.allSettled([...coordinates].map(async ([id, point]) => {
    const { error } = await client
      .from("texasdefined_brand_locations")
      .update({ latitude: point.latitude, longitude: point.longitude, updated_at: updatedAt })
      .eq("id", id)
      .eq("brand_slug", brand);
    if (error) throw new Error(`Brand location geography cache update failed for ${id}: ${error.message}`);
  }));
  const rejected = updates.find((result) => result.status === "rejected");
  if (rejected?.status === "rejected") console.error(rejected.reason);
}

async function coordinatesForBrand(
  brand: TexasBrandLocatorVerifiedRegistryBrand,
  locations: VerifiedBrandLocation[],
) {
  const existing = coordinatePromises.get(brand);
  if (existing) return existing;

  const promise = (async () => {
    const coordinates = storedCoordinates(locations);
    const missing = locations.filter((location) => !coordinates.has(location.id));
    if (!missing.length) return coordinates;

    let resolved = new Map<string, Point>();
    try {
      resolved = await loadCoordinatesFromCensus(brand, missing);
    } catch {
      resolved = await loadCoordinatesFallback(brand, missing);
    }

    const unresolved = missing.filter((location) => !resolved.has(location.id));
    if (unresolved.length) {
      try {
        const fallback = await loadCoordinatesFallback(brand, unresolved);
        for (const [id, point] of fallback) resolved.set(id, point);
      } catch {
        // Partial verified results remain usable; unresolved rows simply do not rank.
      }
    }

    for (const [id, point] of resolved) coordinates.set(id, point);
    await persistCoordinates(brand, resolved).catch((error) => {
      const message = error instanceof Error ? error.message : "unknown error";
      console.error(`Brand location geography cache persistence failed: ${message}`);
    });
    return coordinates;
  })().catch((error) => {
    coordinatePromises.delete(brand);
    throw error;
  });

  coordinatePromises.set(brand, promise);
  return promise;
}

function normalizeLocation(
  brand: TexasBrandLocatorVerifiedRegistryBrand,
  location: VerifiedBrandLocation,
  point: Point,
  origin: Point,
): TexasBrandLocatorLocation {
  const address = locationAddress(location);
  const label = texasBrandLocatorLabel(brand);
  return {
    id: location.id,
    brand,
    brandLabel: label,
    name: location.name,
    address,
    city: location.city,
    countySlug: location.countySlug || undefined,
    postalCode: location.postalCode,
    distanceMiles: milesBetween(origin, point),
    latitude: point.latitude,
    longitude: point.longitude,
    directionsUrl: directionsUrl(address),
    sourceLabel: `${label} official locations`,
    sourceUrl: location.sourceUrl || texasBrandLocatorOfficialUrl(brand),
  };
}

export async function findVerifiedRegistryLocationsServer(
  brand: TexasBrandLocatorVerifiedRegistryBrand,
  origin: Point,
): Promise<TexasBrandLocatorLocation[]> {
  try {
    const locations = await loadLocationsFromSupabase(brand);
    const coordinateMap = await coordinatesForBrand(brand, locations);
    return locations
      .map((location) => {
        const point = coordinateMap.get(location.id);
        return point ? normalizeLocation(brand, location, point, origin) : null;
      })
      .filter((location): location is TexasBrandLocatorLocation => Boolean(location))
      .sort((a, b) => (a.distanceMiles ?? Number.POSITIVE_INFINITY) - (b.distanceMiles ?? Number.POSITIVE_INFINITY))
      .slice(0, RESULTS_PER_BRAND);
  } catch (primaryError) {
    try {
      const { findVerifiedRegistryLocationsViaPublicRpcServer } = await import("./texas-brand-locator-rpc.server");
      return await findVerifiedRegistryLocationsViaPublicRpcServer(brand, origin);
    } catch (rpcError) {
      const primaryMessage = primaryError instanceof Error ? primaryError.message : String(primaryError);
      const rpcMessage = rpcError instanceof Error ? rpcError.message : String(rpcError);
      throw new Error(`${texasBrandLocatorLabel(brand)} location registry unavailable through both server paths: ${primaryMessage}; fallback: ${rpcMessage}`);
    }
  }
}
