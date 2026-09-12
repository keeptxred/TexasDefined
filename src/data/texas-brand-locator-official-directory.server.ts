import {
  texasBrandLocatorLabel,
  texasBrandLocatorOfficialUrl,
  type TexasBrandLocatorOfficialDirectoryBrand,
} from "./texas-brand-locator-registry";
import type { TexasBrandLocatorLocation } from "./texas-brand-locator.types";

type Point = { latitude: number; longitude: number };
type UnknownRecord = Record<string, unknown>;

type ParsedDirectoryLocation = {
  id: string;
  name: string;
  address: string;
  city?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  distanceMiles?: number;
  sourceUrl: string;
};

type DirectoryAdapter = {
  sourceUrl: string;
  sourceLabel: string;
  sourceUrlForOrigin?: (origin: Point) => string;
  parser: (html: string, sourceUrl: string) => ParsedDirectoryLocation[];
};

const REQUEST_TIMEOUT_MS = 8_000;
const RESULTS_PER_BRAND = 5;
const CACHE_TTL_MS = 15 * 60 * 1_000;

const asRecord = (value: unknown): UnknownRecord => value && typeof value === "object" ? value as UnknownRecord : {};
const stringValue = (...values: unknown[]) => values.find((value) => typeof value === "string" && value.trim()) as string | undefined;
const numberValue = (...values: unknown[]) => values.find((value) => typeof value === "number" && Number.isFinite(value)) as number | undefined;

const directoryCache = new Map<string, { expiresAt: number; locations: ParsedDirectoryLocation[] }>();

function timeoutSignal() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  controller.signal.addEventListener("abort", () => clearTimeout(timeout), { once: true });
  return controller.signal;
}

function absoluteSourceUrl(value: string | undefined, sourceUrl: string) {
  if (!value) return sourceUrl;
  try {
    return new URL(value, sourceUrl).toString();
  } catch {
    return sourceUrl;
  }
}

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function distanceMiles(origin: Point, target: Point) {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const earthRadiusMiles = 3958.7613;
  const deltaLatitude = toRadians(target.latitude - origin.latitude);
  const deltaLongitude = toRadians(target.longitude - origin.longitude);
  const originLatitude = toRadians(origin.latitude);
  const targetLatitude = toRadians(target.latitude);
  const haversine = Math.sin(deltaLatitude / 2) ** 2
    + Math.cos(originLatitude) * Math.cos(targetLatitude) * Math.sin(deltaLongitude / 2) ** 2;
  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function mapDataJson(html: string) {
  const script = html.match(/<script[^>]*class=["'][^"']*\bjs-map-data\b[^"']*["'][^>]*>([\s\S]*?)<\/script>/i)
    ?? html.match(/<script[^>]*type=["']text\/data["'][^>]*class=["'][^"']*\bjs-map-data\b[^"']*["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!script?.[1]) throw new Error("Official directory map data was not found");
  return JSON.parse(script[1].trim()) as unknown;
}

export function parseWhataburgerTexasDirectory(html: string, sourceUrl = "https://locations.whataburger.com/tx.html") {
  const payload = asRecord(mapDataJson(html));
  const response = asRecord(payload.response);
  const entities = Array.isArray(response.entities) ? response.entities : [];

  return entities.flatMap((entityValue, index): ParsedDirectoryLocation[] => {
    const entity = asRecord(entityValue);
    const profile = asRecord(entity.profile);
    const addressObject = asRecord(profile.address);
    const meta = asRecord(profile.meta);
    const coordinate = asRecord(profile.yextDisplayCoordinate ?? profile.displayCoordinate ?? profile.geo);
    const latitude = numberValue(coordinate.lat, coordinate.latitude, profile.latitude);
    const longitude = numberValue(coordinate.long, coordinate.lng, coordinate.longitude, profile.longitude);
    if (latitude === undefined || longitude === undefined) return [];

    const region = stringValue(addressObject.region, addressObject.state, profile.region, profile.state);
    if (region && !/^(?:TX|Texas)$/i.test(region)) return [];

    const street = stringValue(
      addressObject.line1,
      addressObject.address1,
      addressObject.streetAddress,
      profile.address1,
      profile.streetAddress,
    );
    const city = stringValue(addressObject.city, addressObject.locality, profile.city);
    const postalCode = stringValue(addressObject.postalCode, addressObject.zip, profile.postalCode, profile.zip);
    const state = region || "TX";
    const name = stringValue(profile.name, profile.locationName, meta.name) ?? "Whataburger";
    const address = [street, city, state && postalCode ? `${state} ${postalCode}` : state || postalCode]
      .filter(Boolean)
      .join(", ");
    if (!address) return [];

    const entityUrl = stringValue(entity.url, profile.websiteUrl, profile.website);
    const id = stringValue(meta.id, profile.id, entity.id) ?? `whataburger-directory-${index + 1}`;
    return [{
      id,
      name,
      address,
      city,
      postalCode,
      latitude,
      longitude,
      sourceUrl: absoluteSourceUrl(entityUrl, sourceUrl),
    }];
  });
}

function decodeHtmlText(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&mdash;|&#8212;/gi, "—");
}

function visibleTextLines(html: string) {
  return decodeHtmlText(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(?:a|article|button|div|h[1-6]|li|p|section)>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  )
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function shipleyNoise(value: string) {
  return /^(?:pickup available|delivery available|open\b|closed\b|order now|store info|catering|use my location|find a shipley near you)/i.test(value)
    || /^\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(value);
}

function stableDirectoryId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function parseShipleyNearbyDirectory(html: string, sourceUrl = "https://shipleydonuts.com/locations") {
  const lines = visibleTextLines(html);
  const locations: ParsedDirectoryLocation[] = [];
  const seenAddresses = new Set<string>();

  for (let index = 0; index < lines.length; index += 1) {
    const distanceMatch = lines[index]?.match(/^(\d+(?:\.\d+)?)\s+miles?$/i);
    if (!distanceMatch) continue;
    const distance = Number(distanceMatch[1]);
    if (!Number.isFinite(distance)) continue;

    let name = "";
    for (let cursor = index - 1; cursor >= Math.max(0, index - 8); cursor -= 1) {
      const candidate = lines[cursor] ?? "";
      if (!candidate || shipleyNoise(candidate) || /\bmiles?$/i.test(candidate)) continue;
      name = candidate;
      break;
    }

    let city = "";
    let postalCode = "";
    let street = "";
    for (let cursor = index + 1; cursor <= Math.min(lines.length - 1, index + 12); cursor += 1) {
      const cityMatch = lines[cursor]?.match(/^(.+?),\s*TX\s+(\d{5}(?:-\d{4})?)$/i);
      if (!cityMatch) continue;
      city = cityMatch[1].trim();
      postalCode = cityMatch[2];
      for (let streetCursor = cursor - 1; streetCursor > index; streetCursor -= 1) {
        const candidate = lines[streetCursor] ?? "";
        if (!candidate || shipleyNoise(candidate) || /\bmiles?$/i.test(candidate)) continue;
        street = candidate;
        break;
      }
      break;
    }

    if (!street || !city || !postalCode) continue;
    const address = `${street}, ${city}, TX ${postalCode}`;
    const key = address.toLowerCase();
    if (seenAddresses.has(key)) continue;
    seenAddresses.add(key);
    const displayName = name ? `Shipley Do-Nuts — ${name}` : `Shipley Do-Nuts — ${city}`;
    locations.push({
      id: stableDirectoryId(`${city}-${street}`) || `shipley-directory-${locations.length + 1}`,
      name: displayName,
      address,
      city,
      postalCode,
      distanceMiles: distance,
      sourceUrl,
    });
  }

  if (!locations.length) throw new Error("Shipley official locator returned no parseable nearby locations");
  return locations;
}

const DIRECTORY_ADAPTERS: Record<TexasBrandLocatorOfficialDirectoryBrand, DirectoryAdapter> = {
  whataburger: {
    sourceUrl: "https://locations.whataburger.com/tx.html",
    sourceLabel: "Whataburger official Texas location directory",
    parser: parseWhataburgerTexasDirectory,
  },
  shipley: {
    sourceUrl: "https://shipleydonuts.com/locations",
    sourceLabel: "Shipley Do-Nuts official location finder",
    sourceUrlForOrigin: (origin) => {
      const lat = origin.latitude.toFixed(4);
      const lng = origin.longitude.toFixed(4);
      return `https://shipleydonuts.com/locations?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`;
    },
    parser: parseShipleyNearbyDirectory,
  },
};

async function loadOfficialDirectory(brand: TexasBrandLocatorOfficialDirectoryBrand, origin: Point) {
  const adapter = DIRECTORY_ADAPTERS[brand];
  const sourceUrl = adapter.sourceUrlForOrigin?.(origin) ?? adapter.sourceUrl;
  const cacheKey = `${brand}:${sourceUrl}`;
  const cached = directoryCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.locations;

  const response = await fetch(sourceUrl, {
    method: "GET",
    headers: {
      accept: "text/html,application/xhtml+xml",
      "user-agent": "TexasDefined/1.0 (+https://texasdefined.com)",
    },
    signal: timeoutSignal(),
  });
  if (!response.ok) throw new Error(`${texasBrandLocatorLabel(brand)} directory returned ${response.status}`);
  const html = await response.text();
  const locations = adapter.parser(html, sourceUrl);
  if (!locations.length) throw new Error(`${texasBrandLocatorLabel(brand)} directory returned no parseable Texas locations`);

  directoryCache.set(cacheKey, { expiresAt: Date.now() + CACHE_TTL_MS, locations });
  return locations;
}

export async function findOfficialDirectoryLocationsServer(
  brand: TexasBrandLocatorOfficialDirectoryBrand,
  origin: Point,
): Promise<TexasBrandLocatorLocation[]> {
  const adapter = DIRECTORY_ADAPTERS[brand];
  const label = texasBrandLocatorLabel(brand);
  const locations = await loadOfficialDirectory(brand, origin);

  return locations
    .map((location) => {
      const calculatedDistance = location.latitude !== undefined && location.longitude !== undefined
        ? distanceMiles(origin, { latitude: location.latitude, longitude: location.longitude })
        : undefined;
      return {
        location,
        distanceMiles: location.distanceMiles ?? calculatedDistance,
      };
    })
    .filter((entry): entry is { location: ParsedDirectoryLocation; distanceMiles: number } => typeof entry.distanceMiles === "number" && Number.isFinite(entry.distanceMiles))
    .sort((left, right) => left.distanceMiles - right.distanceMiles)
    .slice(0, RESULTS_PER_BRAND)
    .map(({ location, distanceMiles: distance }) => ({
      id: `${brand}-${location.id}`,
      brand,
      brandLabel: label,
      name: location.name,
      address: location.address,
      city: location.city,
      postalCode: location.postalCode,
      distanceMiles: distance,
      latitude: location.latitude,
      longitude: location.longitude,
      directionsUrl: directionsUrl(location.address),
      sourceLabel: adapter.sourceLabel,
      sourceUrl: location.sourceUrl || texasBrandLocatorOfficialUrl(brand),
    }));
}
