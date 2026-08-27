import type { RelocationAddressResult } from "./relocation-address";

type CensusGeography = { NAME?: string; BASENAME?: string };
type CensusMatch = {
  matchedAddress?: string;
  coordinates?: { x?: number; y?: number };
  addressComponents?: { state?: string };
  geographies?: Record<string, CensusGeography[]>;
};
type CensusResponse = { result?: { addressMatches?: CensusMatch[] } };

const firstGeographyName = (geographies: Record<string, CensusGeography[]>, pattern: RegExp) => {
  const key = Object.keys(geographies).find((candidate) => pattern.test(candidate));
  const value = key ? geographies[key]?.[0] : undefined;
  return value?.NAME ?? value?.BASENAME ?? null;
};

export async function resolveRelocationAddressServer(address: string): Promise<RelocationAddressResult | null> {
  const url = new URL("https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress");
  url.searchParams.set("address", address);
  url.searchParams.set("benchmark", "Public_AR_Current");
  url.searchParams.set("vintage", "Current_Current");
  url.searchParams.set("format", "json");

  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`Census geocoder returned ${response.status}`);
  const payload = await response.json() as CensusResponse;
  const match = payload.result?.addressMatches?.[0];
  const state = match?.addressComponents?.state?.toUpperCase();
  const latitude = match?.coordinates?.y;
  const longitude = match?.coordinates?.x;
  if (!match?.matchedAddress || state !== "TX" || typeof latitude !== "number" || typeof longitude !== "number") return null;

  const geographies = match.geographies ?? {};
  return {
    matchedAddress: match.matchedAddress,
    state,
    county: firstGeographyName(geographies, /Counties/i),
    place: firstGeographyName(geographies, /Incorporated Places|Census Designated Places|Places/i),
    schoolDistrict: firstGeographyName(geographies, /School Districts.*Unified|Unified School District/i),
    latitude,
    longitude,
  };
}
