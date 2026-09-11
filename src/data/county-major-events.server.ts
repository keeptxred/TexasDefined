import { buildTexasEventCarouselItemsServer } from "./events/texas-event-calendar.server";
import { loadUpcomingTexasEventRecordsServer } from "./events/texas-event-records.server";

export interface CountyMajorEventItem {
  slug: string;
  name: string;
  detail: string;
  startDate: string;
  endDate?: string;
}

export function loadCountyMajorEventsServer(countySlug: string): CountyMajorEventItem[] {
  const normalizedCountySlug = countySlug.trim().toLowerCase();
  const records = loadUpcomingTexasEventRecordsServer({
    countySlug: normalizedCountySlug,
    limit: 250,
  })
    .filter((event) => event.guidePath.startsWith("/event/"))
    .slice(0, 8);

  return buildTexasEventCarouselItemsServer(records).map((event) => ({
    slug: event.guidePath.slice("/event/".length),
    name: event.title,
    detail: `${event.city} · ${event.dateLabel}`,
    startDate: event.startDate,
    endDate: event.endDate,
  }));
}
