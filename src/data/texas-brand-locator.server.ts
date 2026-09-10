import { resolveRelocationAddressServer } from "./relocation-address.server";
import {
  DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS,
  isTexasBrandLocatorVerifiedRegistryBrand,
  texasBrandLocatorFallbackLabel,
  texasBrandLocatorLabel,
  texasBrandLocatorOfficialUrl,
  type TexasBrandLocatorBrand,
  type TexasBrandLocatorVerifiedRegistryBrand,
} from "./texas-brand-locator-registry";
import { findVerifiedRegistryLocationsServer } from "./texas-brand-locator-verified-registry.server";
import type {
  TexasBrandLocatorLocation,
  TexasBrandLocatorResponse,
} from "./texas-brand-locator.types";

type Point = { latitude: number; longitude: number };
type UnknownRecord = Record<string, unknown>;

const HEB_LOCATOR_ENDPOINT = "https://www.heb.com/commerce-api/v1/store/locator/address";
const REQUEST_TIMEOUT_MS = 8_000;
const RESULTS_PER_BRAND = 5;

const asRecord = (value: unknown): UnknownRecord => value && typeof value === "object" ? value as UnknownRecord : {};
const stringValue = (...values: unknown[]) => values.find((value) => typeof value === "string" && value.trim()) as string | undefined;
const numberValue = (...values: unknown[]) => values.find((value) => typeof value === "number" && Number.isFinite(value)) as number | undefined;

function timeoutSignal() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return controller.signal;
}

function officialLocatorUrl(brand: TexasBrandLocatorBrand, query: string) {
  const baseUrl = texasBrandLocatorOfficialUrl(brand);
  return brand === "heb" ? `${baseUrl}?address=${encodeURIComponent(query)}` : baseUrl;
}

function fallbackLinks(brands: TexasBrandLocatorBrand[], query: string) {
  return brands.map((brand) => ({
    brand,
    label: texasBrandLocatorFallbackLabel(brand),
    url: officialLocatorUrl(brand, query),
  }));
}

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
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
    brandLabel: texasBrandLocatorLabel("heb"),
    name,
    address,
    city,
    postalCode,
    distanceMiles: distance,
    latitude,
    longitude,
    directionsUrl: directionsUrl(address),
    sourceLabel: "H-E-B official store locator",
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

function verifiedRegistryBrands(brands: TexasBrandLocatorBrand[]) {
  return brands.filter(isTexasBrandLocatorVerifiedRegistryBrand);
}

function verifiedBrandLabels(brands: TexasBrandLocatorVerifiedRegistryBrand[]) {
  return brands.map(texasBrandLocatorLabel).join(brands.length > 1 ? " and " : "");
}

async function appendHebResults(results: TexasBrandLocatorLocation[], notices: string[], query: string) {
  try {
    const heb = await findHebLocations(query);
    if (heb.length) results.push(...heb);
    else notices.push("H-E-B's live locator did not return a nearby store for this search. The official H-E-B locator link below carries your location into H-E-B's current results.");
  } catch {
    notices.push("H-E-B's live locator could not be reached from TexasDefined. The official H-E-B locator link below carries your location into H-E-B's current results.");
  }
}

async function appendVerifiedRegistryResults(
  results: TexasBrandLocatorLocation[],
  notices: string[],
  brands: TexasBrandLocatorVerifiedRegistryBrand[],
  origin: Point,
) {
  for (const brand of brands) {
    const label = texasBrandLocatorLabel(brand);
    try {
      results.push(...await findVerifiedRegistryLocationsServer(brand, origin));
    } catch {
      notices.push(`${label} official Texas location registry is available, but distance ranking could not be completed. Use the official ${label} locations link below for the current list.`);
    }
  }
}

export async function findTexasBrandLocationsNearPointServer(input: {
  query: string;
  origin: Point;
  matchedAddress?: string | null;
  brands: TexasBrandLocatorBrand[];
}): Promise<TexasBrandLocatorResponse> {
  const query = input.query.trim();
  const selectedBrands: TexasBrandLocatorBrand[] = input.brands.length
    ? input.brands
    : [...DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS];
  const notices: string[] = [];
  const results: TexasBrandLocatorLocation[] = [];
  const registryBrands = verifiedRegistryBrands(selectedBrands);

  if (selectedBrands.includes("heb")) await appendHebResults(results, notices, query);
  if (registryBrands.length) await appendVerifiedRegistryResults(results, notices, registryBrands, input.origin);

  return {
    query,
    matchedAddress: input.matchedAddress ?? null,
    results,
    notices,
    fallbackLinks: fallbackLinks(selectedBrands, query),
  };
}

export async function findTexasBrandLocationsServer(input: {
  address: string;
  brands: TexasBrandLocatorBrand[];
}): Promise<TexasBrandLocatorResponse> {
  const query = input.address.trim();
  const selectedBrands: TexasBrandLocatorBrand[] = input.brands.length
    ? input.brands
    : [...DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS];
  const notices: string[] = [];
  const results: TexasBrandLocatorLocation[] = [];
  const registryBrands = verifiedRegistryBrands(selectedBrands);

  let resolvedAddress = null as Awaited<ReturnType<typeof resolveRelocationAddressServer>>;
  if (registryBrands.length) {
    const labels = verifiedBrandLabels(registryBrands);
    try {
      resolvedAddress = await resolveRelocationAddressServer(query);
      if (!resolvedAddress) notices.push(`Use a complete Texas street address to rank ${labels} locations by distance. The official brand location links are still available below.`);
    } catch {
      notices.push(`Texas address matching is temporarily unavailable. Use the official ${labels} location links below while the locator retries on a later search.`);
    }
  }

  if (selectedBrands.includes("heb")) await appendHebResults(results, notices, query);
  if (registryBrands.length && resolvedAddress) {
    await appendVerifiedRegistryResults(
      results,
      notices,
      registryBrands,
      { latitude: resolvedAddress.latitude, longitude: resolvedAddress.longitude },
    );
  }

  return {
    query,
    matchedAddress: resolvedAddress?.matchedAddress ?? null,
    results,
    notices,
    fallbackLinks: fallbackLinks(selectedBrands, query),
  };
}
