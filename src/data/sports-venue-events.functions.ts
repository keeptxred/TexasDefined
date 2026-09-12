import { createServerFn } from "@tanstack/react-start";

type SportsVenueEventsInput = {
  slug: string;
};

/**
 * Keep the canonical event registry and normalization code on the server while
 * exposing only the small, venue-scoped carousel payload needed by guide pages.
 */
export const getSportsVenueUpcomingEvents = createServerFn({ method: "POST" })
  .inputValidator((data: SportsVenueEventsInput) => data)
  .handler(async ({ data }) => {
    const [
      { loadUpcomingTexasEventRecordsServer },
      { buildTexasEventCarouselItemsServer },
    ] = await Promise.all([
      import("./events/texas-event-records.server"),
      import("./events/texas-event-calendar.server"),
    ]);
    const venueId = `sports-venue:${data.slug}`;
    const records = loadUpcomingTexasEventRecordsServer({ venueId, limit: 9 });

    return {
      venueId,
      calendarHref: `/events?venue=${encodeURIComponent(venueId)}#calendar`,
      events: buildTexasEventCarouselItemsServer(records),
    };
  });
