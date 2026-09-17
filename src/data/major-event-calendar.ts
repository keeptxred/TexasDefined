import { createServerFn } from "@tanstack/react-start";

import type { GlobalEventCalendarSearch } from "./events/texas-event-calendar.server";

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
