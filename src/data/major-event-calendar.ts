import { createServerFn } from "@tanstack/react-start";

import type { GlobalEventCalendarSearch } from "./events/texas-event-calendar.server";

export const getMajorEventLandingDirectory = createServerFn({ method: "POST" })
  .inputValidator((data: GlobalEventCalendarSearch) => data)
  .handler(async ({ data }) => {
    const [
      { loadMajorEventLandingDirectoryServer },
      { loadIndexableEventCollectionCrawlDirectoryServer },
      { loadUpcomingTexasEventRecordsServer },
      { buildGlobalEventCalendarServer, buildTexasEventCarouselItemsServer },
    ] = await Promise.all([
      import("./major-event-directory.server"),
      import("./event-collection-crawl-directory.server"),
      import("./events/texas-event-records.server"),
      import("./events/texas-event-calendar.server"),
    ]);
    const records = loadUpcomingTexasEventRecordsServer({ limit: 200 });
    const landingDirectory = loadMajorEventLandingDirectoryServer();
    const topicLinksByHref = new Map(landingDirectory.eventTopicLinks.map((item) => [item.href, item] as const));

    for (const item of loadIndexableEventCollectionCrawlDirectoryServer()) {
      if (item.group !== "Tournament directories") continue;
      if (!topicLinksByHref.has(item.href)) {
        topicLinksByHref.set(item.href, { href: item.href, title: item.title, description: item.description });
      }
    }

    return {
      ...landingDirectory,
      eventTopicLinks: [...topicLinksByHref.values()],
      upcomingEventRecords: buildTexasEventCarouselItemsServer(records.slice(0, 12)),
      calendarView: buildGlobalEventCalendarServer(records, data),
    };
  });
