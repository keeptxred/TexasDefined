import { buildTexasEventCarouselItemsServer } from "@/data/events/texas-event-calendar.server";
import { loadUpcomingTexasCalendarRecordsServer } from "@/data/events/texas-event-records.server";

import type { MetroProximityCollection, MetroProximityMetro, MetroProximityResult } from "./metro-proximity";
import { selectMetroProximityAffiliateEvents } from "./metro-proximity-event-selection";

function texasTodayIso(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  if (!year || !month || !day) throw new Error("Unable to resolve Texas calendar date");
  return `${year}-${month}-${day}`;
}

function addDaysIso(dateIso: string, days: number) {
  const [year, month, day] = dateIso.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day));
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function buildMetroProximityEventContextServer(
  metro: MetroProximityMetro,
  collection: MetroProximityCollection,
  results: readonly MetroProximityResult[],
) {
  if (collection.slug !== "things-to-do" && collection.slug !== "weekend-trips") {
    return { kind: "none" as const, events: [] };
  }

  const todayIso = texasTodayIso();
  const horizonIso = addDaysIso(todayIso, 14);
  const upcomingRecords = loadUpcomingTexasCalendarRecordsServer()
    .filter((event) => event.startDate <= horizonIso);
  const projectedEvents = buildTexasEventCarouselItemsServer(upcomingRecords);
  const events = selectMetroProximityAffiliateEvents(metro, collection, results, projectedEvents, {
    todayIso,
    horizonIso,
  });

  return {
    kind: collection.slug === "weekend-trips" ? "weekend-destinations" as const : "nearby" as const,
    events,
  };
}
