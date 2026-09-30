import { buildTexasEventCarouselItemsServer } from "@/data/events/texas-event-calendar.server";
import { loadUpcomingTexasEventRecordsServer } from "@/data/events/texas-event-records.server";

import type { MetroProximityCollection, MetroProximityMetro, MetroProximityResult } from "./metro-proximity";
import { selectMetroProximityAffiliateEvents } from "./metro-proximity-event-selection";

/**
 * Reuse the canonical event/ticketing pipeline without turning proximity pages
 * into a second event directory. The upstream upcoming-event loader owns date
 * freshness/status suppression and the carousel projection owns ticket CTA
 * resolution, disclosure and affiliate attribution.
 */
export function buildMetroProximityEventContextServer(
  metro: MetroProximityMetro,
  collection: MetroProximityCollection,
  results: readonly MetroProximityResult[],
) {
  if (collection.slug !== "things-to-do" && collection.slug !== "weekend-trips") {
    return { kind: "none" as const, events: [] };
  }

  const projectedEvents = buildTexasEventCarouselItemsServer(
    loadUpcomingTexasEventRecordsServer({ limit: 250 }),
  );
  const events = selectMetroProximityAffiliateEvents(metro, collection, results, projectedEvents);

  return {
    kind: collection.slug === "weekend-trips" ? "weekend-destinations" as const : "nearby" as const,
    events,
  };
}
