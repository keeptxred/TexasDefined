import { buildTexasEventCarouselItemsServer } from "./events/texas-event-calendar.server";
import { loadUpcomingTexasEventRecordsServer } from "./events/texas-event-records.server";

export function loadCityMajorEventsServer(city: string) {
  const normalizedCity = city.trim();
  if (!normalizedCity) return [];

  const records = loadUpcomingTexasEventRecordsServer({
    city: normalizedCity,
    limit: 250,
  })
    .filter((event) => event.guidePath.startsWith("/event/"))
    .slice(0, 8);

  return buildTexasEventCarouselItemsServer(records);
}
