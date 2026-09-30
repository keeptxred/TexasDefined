import type { MetroProximityCollection, MetroProximityMetro, MetroProximityResult } from "./metro-proximity.ts";

export interface MetroProximityEventCandidate {
  id: string;
  title: string;
  city: string;
  startDate: string;
  ticketCta: {
    href: string;
    isAffiliate: boolean;
  } | null;
}

function normalizePlace(value: string) {
  return value
    .normalize("NFKD")
    .toLocaleLowerCase("en-US")
    .replace(/[’']/g, "")
    .replace(/\b(texas|tx)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function destinationTownKeys(results: readonly MetroProximityResult[]) {
  return results
    .flatMap((row) => [
      row.destination.nearestTown,
      row.destination.category === "small-towns" ? row.destination.name : "",
    ])
    .filter(Boolean)
    .map(normalizePlace)
    .filter(Boolean);
}

function eventIdentity(event: MetroProximityEventCandidate) {
  return `${normalizePlace(event.title)}|${normalizePlace(event.city)}|${event.startDate}`;
}

function hasSafeAffiliateDestination(event: MetroProximityEventCandidate) {
  if (!event.ticketCta?.isAffiliate) return false;
  try {
    return new URL(event.ticketCta.href).protocol === "https:";
  } catch {
    return false;
  }
}

export function selectMetroProximityAffiliateEvents<T extends MetroProximityEventCandidate>(
  metro: MetroProximityMetro,
  collection: MetroProximityCollection,
  results: readonly MetroProximityResult[],
  events: readonly T[],
) {
  if (collection.slug !== "things-to-do" && collection.slug !== "weekend-trips") return [] as T[];

  const resultTownKeys = new Set(destinationTownKeys(results));
  const metroKeys = new Set([metro.name, metro.shortName].map(normalizePlace));
  const seen = new Set<string>();

  return events
    .filter(hasSafeAffiliateDestination)
    .filter((event) => {
      const cityKey = normalizePlace(event.city);
      return collection.slug === "weekend-trips"
        ? resultTownKeys.has(cityKey)
        : metroKeys.has(cityKey) || resultTownKeys.has(cityKey);
    })
    .filter((event) => {
      const key = eventIdentity(event);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
}
