import { createFileRoute } from "@tanstack/react-router";

import { getEventsPageHead, getMajorEventLandingDirectory } from "@/data/major-event-directory";
import { eventsQuery, regionsQuery } from "@/data/queries";

export const Route = createFileRoute("/events")({
  loader: async ({ context }) => {
    const [events, regions, landingDirectory] = await Promise.all([
      context.queryClient.ensureQueryData(eventsQuery({})),
      context.queryClient.ensureQueryData(regionsQuery()),
      getMajorEventLandingDirectory(),
    ]);
    const serverPresentation = await getEventsPageHead({
      data: {
        events: events.slice(0, 50),
        regions: regions.map(({ id, name }) => ({ id, name })),
      },
    });
    return { events, regions, ...serverPresentation, ...landingDirectory };
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
