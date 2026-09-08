import {
  findTexasBrandLocationsNearPointServer as findBaseTexasBrandLocationsNearPointServer,
  findTexasBrandLocationsServer as findBaseTexasBrandLocationsServer,
} from "./texas-brand-locator.server";
import type {
  TexasBrandLocatorBrand,
  TexasBrandLocatorLocation,
  TexasBrandLocatorResponse,
} from "./texas-brand-locator.types";

type Point = { latitude: number; longitude: number };
type UnknownRecord = Record<string, unknown>;
type HebFormatBrand = "central-market" | "joe-vs" | "mi-tienda";

const HEB_LOCATOR_ENDPOINT = "https://www.heb.com/commerce-api/v1/store/locator/address";
const HEB_LOCATOR_URL = "https://www.heb.com/store-locations";
const REQUEST_TIMEOUT_MS = 8_000;
const RESULTS_PER_BRAND = 5;

const HEB_FORMAT_CONFIG: Record<HebFormatBrand, { label: string; pattern: RegExp }> = {
  "central-market": { label: "Central Market", pattern: /\bcentral\s+market\b/i },
  "joe-vs": { label: "Joe V's Smart Shop", pattern: /\bjoe\s+v(?:['’]s|s)?(?:\s+smart\s+shop)?\b/i },
  "mi-tienda": { label: "Mi Tienda", pattern: /\bmi\s+tienda\b/i },
};

const asRecord = (value: unknown): UnknownRecord => value && typeof value === "object" ? value as UnknownRecord : {};
const stringValue = (...values: unknown[]) => values.find((value) => typeof value === "string" && value.trim()) as string | undefined;
const numberValue = (...values: unknown[]) => values.find((value) => typeof value === "number" && Number.isFinite(value)) as number | undefined;

function isHebFormatBrand(brand: TexasBrandLocatorBrand): brand is HebFormatBrand {
  return brand === "central-market" || brand === "joe-vs" || brand === "mi-tienda";
}

function isBaseBrand(brand: TexasBrandLocatorBrand): brand is "heb" | "bucees" {
  return brand === "heb" || brand === "bucees";
}

function timeoutSignal() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return controller.signal;
}

function officialHebLocatorUrl(query: string) {
  return `${HEB_LOCATOR_URL}?address=${encodeURIComponent(query)}`;
}

function formatFallbackLink(brand: HebFormatBrand, query: string) {
  const label = HEB_FORMAT_CONFIG[brand].label;
  return {
    brand,
    label: `Open H-E-B's official store locator for ${label}`,
    url: officialHebLocatorUrl(query),
  };
}

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function storeRecord(wrapper: unknown) {
  const row = asRecord(wrapper);
  return { row, store: asRecord(row.store ?? wrapper) };
}

function storeName(wrapper: unknown) {
  const { store } = storeRecord(wrapper);
  return stringValue(store.name, store.storeName, store.displayName) ?? "";
}

function normalizeHebFormatLocation(
  wrapper: unknown,
  query: string,
  index: number,
  brand: HebFormatBrand,
): TexasBrandLocatorLocation | null {
  const { row, store } = storeRecord(wrapper);
  const addressObject = asRecord(store.address);
  const coordinateObject = asRecord(store.coordinates ?? store.coordinate ?? store.location);
  const config = HEB_FORMAT_CONFIG[brand];
  const name = storeName(wrapper) || config.label;
  if (!config.pattern.test(name)) return null;

  const id = stringValue(store.id, store.storeId, store.storeNumber, store.corporateNumber) ?? `${brand}-result-${index + 1}`;
  const street = stringValue(store.streetAddress, store.address1, store.addressLine1, addressObject.streetAddress, addressObject.address1, addressObject.addressLine1);
  const city = stringValue(store.city, addressObject.city, addressObject.locality);
  const state = stringValue(store.state, addressObject.state, addressObject.region) ?? "TX";
  const postalCode = stringValue(store.postalCode, store.zip, store.zipCode, addressObject.postalCode, addressObject.zip);
  const address = [street, city, state && postalCode ? `${state} ${postalCode}` : state || postalCode].filter(Boolean).join(", ") || `${name}${postalCode ? `, TX ${postalCode}` : ", Texas"}`;
  const latitude = numberValue(store.latitude, store.lat, coordinateObject.latitude, coordinateObject.lat);
  const longitude = numberValue(store.longitude, store.lng, store.lon, coordinateObject.longitude, coordinateObject.lng, coordinateObject.lon);
  const distance = numberValue(row.distance, store.distance, row.distanceMiles, store.distanceMiles);

  return {
    id: `${brand}-${id}`,
    brand,
    brandLabel: config.label,
    name,
    address,
    city,
    postalCode,
    distanceMiles: distance,
    latitude,
    longitude,
    directionsUrl: directionsUrl(address),
    sourceLabel: `${config.label} via H-E-B official store locator`,
    sourceUrl: officialHebLocatorUrl(query),
  };
}

async function findHebFormatLocations(query: string, brands: HebFormatBrand[]) {
  if (!brands.length) return [];
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
  return brands.flatMap((brand) => stores
    .map((store, index) => normalizeHebFormatLocation(store, query, index, brand))
    .filter((location): location is TexasBrandLocatorLocation => Boolean(location))
    .slice(0, RESULTS_PER_BRAND));
}

function emptyResponse(query: string, matchedAddress: string | null): TexasBrandLocatorResponse {
  return {
    query,
    matchedAddress,
    results: [],
    notices: [],
    fallbackLinks: [],
  };
}

async function appendHebFormats(
  response: TexasBrandLocatorResponse,
  query: string,
  formatBrands: HebFormatBrand[],
) {
  if (!formatBrands.length) return response;
  try {
    const locations = await findHebFormatLocations(query, formatBrands);
    response.results.push(...locations);
    for (const brand of formatBrands) {
      if (!locations.some((location) => location.brand === brand)) {
        response.notices.push(`${HEB_FORMAT_CONFIG[brand].label} did not appear in H-E-B's live results for this search. Use the official H-E-B locator link below for the current store list.`);
      }
    }
  } catch {
    const labels = formatBrands.map((brand) => HEB_FORMAT_CONFIG[brand].label).join(", ");
    response.notices.push(`H-E-B's live locator could not be reached for ${labels}. Use the official H-E-B locator link below while the upstream service recovers.`);
  }
  response.fallbackLinks.push(...formatBrands.map((brand) => formatFallbackLink(brand, query)));
  return response;
}

export async function findExpandedTexasBrandLocationsNearPointServer(input: {
  query: string;
  origin: Point;
  matchedAddress?: string | null;
  brands: TexasBrandLocatorBrand[];
}): Promise<TexasBrandLocatorResponse> {
  const query = input.query.trim();
  const selectedBrands: TexasBrandLocatorBrand[] = input.brands.length ? input.brands : ["heb", "bucees"];
  const baseBrands = selectedBrands.filter(isBaseBrand);
  const formatBrands = selectedBrands.filter(isHebFormatBrand);
  const response = baseBrands.length
    ? await findBaseTexasBrandLocationsNearPointServer({ ...input, query, brands: baseBrands })
    : emptyResponse(query, input.matchedAddress ?? null);
  return appendHebFormats(response, query, formatBrands);
}

export async function findExpandedTexasBrandLocationsServer(input: {
  address: string;
  brands: TexasBrandLocatorBrand[];
}): Promise<TexasBrandLocatorResponse> {
  const query = input.address.trim();
  const selectedBrands: TexasBrandLocatorBrand[] = input.brands.length ? input.brands : ["heb", "bucees"];
  const baseBrands = selectedBrands.filter(isBaseBrand);
  const formatBrands = selectedBrands.filter(isHebFormatBrand);
  const response = baseBrands.length
    ? await findBaseTexasBrandLocationsServer({ address: query, brands: baseBrands })
    : emptyResponse(query, null);
  return appendHebFormats(response, query, formatBrands);
}
