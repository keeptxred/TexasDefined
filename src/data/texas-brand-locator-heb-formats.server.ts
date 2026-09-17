import {
  TEXAS_BRAND_LOCATOR_HEB_FORMAT_BRANDS,
  texasBrandLocatorFallbackLabel,
  texasBrandLocatorLabel,
  texasBrandLocatorOfficialUrl,
  texasBrandLocatorStoreNamePattern,
  type TexasBrandLocatorHebFormatBrand,
} from "./texas-brand-locator-registry";
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

const HEB_LOCATOR_ENDPOINT = "https://www.heb.com/commerce-api/v1/store/locator/address";
const REQUEST_TIMEOUT_MS = 8_000;
const RESULTS_PER_BRAND = 5;

const asRecord = (value: unknown): UnknownRecord => value && typeof value === "object" ? value as UnknownRecord : {};
const stringValue = (...values: unknown[]) => values.find((value) => typeof value === "string" && value.trim()) as string | undefined;
const numberValue = (...values: unknown[]) => values.find((value) => typeof value === "number" && Number.isFinite(value)) as number | undefined;

function isHebFormatBrand(brand: TexasBrandLocatorBrand): brand is TexasBrandLocatorHebFormatBrand {
  return texasBrandLocatorStoreNamePattern(brand) instanceof RegExp;
}

function isBaseBrand(brand: TexasBrandLocatorBrand) {
  return !isHebFormatBrand(brand);
}

function isHebSpecialtyName(name: string) {
  return TEXAS_BRAND_LOCATOR_HEB_FORMAT_BRANDS.some((brand) => texasBrandLocatorStoreNamePattern(brand)?.test(name));
}

function keepOrdinaryHebResults(
  response: TexasBrandLocatorResponse,
  selectedBrands: TexasBrandLocatorBrand[],
) {
  if (!selectedBrands.includes("heb")) return response;
  const hadHebResult = response.results.some((location) => location.brand === "heb");
  response.results = response.results.filter((location) => location.brand !== "heb" || !isHebSpecialtyName(location.name));
  if (hadHebResult && !response.results.some((location) => location.brand === "heb")) {
    response.notices.push("H-E-B's live locator returned only specialty-format stores for this search. Use the official H-E-B locator link below for the current ordinary H-E-B store list.");
  }
  return response;
}

function timeoutSignal() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return controller.signal;
}

function officialHebLocatorUrl(query: string) {
  return `${texasBrandLocatorOfficialUrl("heb")}?address=${encodeURIComponent(query)}`;
}

function formatFallbackLink(brand: TexasBrandLocatorHebFormatBrand, query: string) {
  return {
    brand,
    label: texasBrandLocatorFallbackLabel(brand),
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
  brand: TexasBrandLocatorHebFormatBrand,
): TexasBrandLocatorLocation | null {
  const { row, store } = storeRecord(wrapper);
  const addressObject = asRecord(store.address);
  const coordinateObject = asRecord(store.coordinates ?? store.coordinate ?? store.location);
  const label = texasBrandLocatorLabel(brand);
  const pattern = texasBrandLocatorStoreNamePattern(brand);
  const name = storeName(wrapper) || label;
  if (!pattern?.test(name)) return null;

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
    brandLabel: label,
    name,
    address,
    city,
    postalCode,
    distanceMiles: distance,
    latitude,
    longitude,
    directionsUrl: directionsUrl(address),
    sourceLabel: `${label} via H-E-B official store locator`,
    sourceUrl: officialHebLocatorUrl(query),
  };
}

async function findHebFormatLocations(query: string, brands: TexasBrandLocatorHebFormatBrand[]) {
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
  formatBrands: TexasBrandLocatorHebFormatBrand[],
) {
  if (!formatBrands.length) return response;
  try {
    const locations = await findHebFormatLocations(query, formatBrands);
    response.results.push(...locations);
    for (const brand of formatBrands) {
      if (!locations.some((location) => location.brand === brand)) {
        response.notices.push(`${texasBrandLocatorLabel(brand)} did not appear in H-E-B's live results for this search. Use the official H-E-B locator link below for the current store list.`);
      }
    }
  } catch {
    const labels = formatBrands.map(texasBrandLocatorLabel).join(", ");
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
  keepOrdinaryHebResults(response, selectedBrands);
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
  keepOrdinaryHebResults(response, selectedBrands);
  return appendHebFormats(response, query, formatBrands);
}
