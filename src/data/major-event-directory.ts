import { createServerFn } from "@tanstack/react-start";

import type { TexasEvent } from "./types";

interface EventsPageHeadInput {
  events: TexasEvent[];
  regions: Array<{ id: string; name: string }>;
}

export const getMajorEventGuideDirectory = createServerFn({ method: "GET" }).handler(async () => {
  const { loadMajorEventGuideDirectoryServer } = await import("./major-event-directory.server");
  return loadMajorEventGuideDirectoryServer();
});

export const getMajorEventLandingDirectory = createServerFn({ method: "GET" }).handler(async () => {
  const { loadMajorEventLandingDirectoryServer } = await import("./major-event-directory.server");
  return loadMajorEventLandingDirectoryServer();
});

export const getEventsPageHead = createServerFn({ method: "POST" })
  .inputValidator((data: EventsPageHeadInput) => data)
  .handler(async ({ data }) => {
    const { buildEventsPageHeadServer } = await import("./major-event-directory.server");
    return buildEventsPageHeadServer(data.events, data.regions);
  });
