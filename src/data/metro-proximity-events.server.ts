import { buildTexasEventCarouselItemsServer } from "@/data/events/texas-event-calendar.server";
import { loadUpcomingTexasEventRecordsServer } from "@/data/events/texas-event-records.server";

import type { MetroProximityCollection, MetroProximityMetro, MetroProximityResult } from "./metro-proximity";

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
    .flatMap((row) => [row.destination.nearestTown, row.destination.category === "small-towns" ? row.destination.name : ""])
    .filter(Boolean)
    .map(normalizePlace)
    .filter(Boolean);
}

/**
 * Reuse the canonical event/ticketing pipeline without turning proximity pages
 * into a second event directory. Only actionable affiliate CTAs are eligible.
 *
 * - Things-to-do pages may show events in the metro itself or in destination
 *   towns already admitted by that page's distance/quality filter.
 * - Weekend-trip pages may show events only in towns represented by the actual
 *   weekend destination results. Metro-core events are intentionally excluded.
 * - Every other proximity intent stays destination-only unless a future UX is
 *   designed specifically for that intent.
 */
export function buildMetroProximityEventContextServer(
  metro: MetroProximityMetro,
  collection: MetroProximityCollection,
  results: readonly MetroProximityResult[],
) {
  if (collection.slug !== "things-to-do" && collection.slug !== "weekend-trips") {
    return { kind: "none" as const, events: [] };
  }

  const affiliateEvents = buildTexasEventCarouselItemsServer(
    loadUpcomingTexasEventRecordsServer({ limit: 250 }),
  ).filter((event) => event.ticketCta?.isAffiliate);

  const resultTownKeys = new Set(destinationTownKeys(results));
  const metroKeys = new Set([metro.name, metro.shortName].map(normalizePlace));

  const events = affiliateEvents
    .filter((event) => {
      const cityKey = normalizePlace(event.city);
      if (collection.slug === "weekend-trips") return resultTownKeys.has(cityKey);
      return metroKeys.has(cityKey) || resultTownKeys.has(cityKey);
    })
    .filter((event, index, all) => all.findIndex((candidate) => candidate.id === event.id) === index)
    .slice(0, 12);

  return {
    kind: collection.slug === "weekend-trips" ? "weekend-destinations" as const : "nearby" as const,
    events,
  };
}
