import { createServerFn } from "@tanstack/react-start";

import type { GlobalEventCalendarSearch } from "./events/texas-event-calendar.server";
import type { TexasEvent } from "./types";

interface EventsPageHeadInput {
  events: TexasEvent[];
  regions: Array<{ id: string; name: string }>;
  filtered?: boolean;
}

export const getMajorEventGuideDirectory = createServerFn({ method: "GET" }).handler(async () => {
  const { loadMajorEventGuideDirectoryServer } = await import("./major-event-directory.server");
  return loadMajorEventGuideDirectoryServer();
});

export const getMajorEventLandingDirectory = createServerFn({ method: "POST" })
  .inputValidator((data: GlobalEventCalendarSearch) => data)
  .handler(async ({ data }) => {
    const [
      { loadMajorEventLandingDirectoryServer },
      { loadUpcomingTexasEventRecordsServer },
      { buildGlobalEventCalendarServer, buildTexasEventCarouselItemsServer },
    ] = await Promise.all([
      import("./major-event-directory.server"),
      import("./events/texas-event-records.server"),
      import("./events/texas-event-calendar.server"),
    ]);
    const records = loadUpcomingTexasEventRecordsServer({ limit: 200 });
    return {
      ...loadMajorEventLandingDirectoryServer(),
      upcomingEventRecords: buildTexasEventCarouselItemsServer(records.slice(0, 12)),
      calendarView: buildGlobalEventCalendarServer(records, data),
    };
  });

export const getEventsPageHead = createServerFn({ method: "POST" })
  .inputValidator((data: EventsPageHeadInput) => data)
  .handler(async ({ data }) => {
    const { buildEventsPageHeadServer } = await import("./major-event-directory.server");
    const presentation = buildEventsPageHeadServer(data.events, data.regions);
    if (!data.filtered) return presentation;
    return {
      ...presentation,
      head: {
        ...presentation.head,
        meta: [...presentation.head.meta.filter((item) => item.name !== "robots"), { name: "robots", content: "noindex, follow" }],
      },
    };
  });
