export type FishingResolvedOrigin = {
  label: string;
  lat: number;
  lng: number;
  source: "zip" | "city";
};

type ZippopotamPlace = {
  "place name"?: string;
  latitude?: string;
  longitude?: string;
  "state abbreviation"?: string;
  state?: string;
  "post code"?: string;
};

type ZippopotamZipResponse = {
  "post code"?: string;
  country?: string;
  places?: ZippopotamPlace[];
};

const REQUEST_TIMEOUT_MS = 5_000;

function timeoutSignal() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return controller.signal;
}

function point(place: ZippopotamPlace) {
  const lat = Number(place.latitude);
  const lng = Number(place.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "TexasDefined/1.0 (+https://texasdefined.com)",
    },
    signal: timeoutSignal(),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Fishing location lookup returned ${response.status}`);
  return response.json();
}

function texasPlace(place: ZippopotamPlace) {
  return (place["state abbreviation"] ?? "").toUpperCase() === "TX"
    || (place.state ?? "").toLowerCase() === "texas";
}

async function resolveZip(zip: string): Promise<FishingResolvedOrigin | null> {
  const payload = await fetchJson(`https://api.zippopotam.us/us/${encodeURIComponent(zip)}`) as ZippopotamZipResponse | null;
  const place = payload?.places?.find(texasPlace) ?? null;
  const coordinates = place ? point(place) : null;
  if (!place || !coordinates) return null;
  return {
    label: `${place["place name"] ?? "Texas"} · TX ${payload?.["post code"] ?? zip}`,
    ...coordinates,
    source: "zip",
  };
}

function cityCandidate(query: string) {
  const cleaned = query
    .replace(/,?\s+(?:tx|texas)$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned || cleaned.length > 80) return null;
  if (/\d/.test(cleaned)) return null;
  if (/\b(county|lake|reservoir|river|basin|region|coast|country|woods|prairies|panhandle)\b/i.test(cleaned)) return null;
  return cleaned;
}

async function resolveCity(query: string): Promise<FishingResolvedOrigin | null> {
  const city = cityCandidate(query);
  if (!city) return null;
  const payload = await fetchJson(`https://api.zippopotam.us/us/tx/${encodeURIComponent(city)}`);
  const rows = Array.isArray(payload)
    ? payload as ZippopotamPlace[]
    : ((payload as { places?: ZippopotamPlace[] } | null)?.places ?? []);
  const points = rows
    .filter((place) => !place["state abbreviation"] || texasPlace(place))
    .map(point)
    .filter((value): value is { lat: number; lng: number } => Boolean(value));
  if (!points.length) return null;

  const lat = points.reduce((sum, value) => sum + value.lat, 0) / points.length;
  const lng = points.reduce((sum, value) => sum + value.lng, 0) / points.length;
  return { label: `${city}, Texas`, lat, lng, source: "city" };
}

export async function resolveFishingLocationServer(query: string): Promise<FishingResolvedOrigin | null> {
  const normalized = query.trim().replace(/\s+/g, " ").slice(0, 100);
  if (!normalized) return null;

  const zipMatch = normalized.match(/\b(\d{5})(?:-\d{4})?\b/);
  try {
    if (zipMatch) return await resolveZip(zipMatch[1]);
    return await resolveCity(normalized);
  } catch {
    return null;
  }
}
