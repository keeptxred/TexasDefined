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
      { getSportsVenuePhoto },
    ] = await Promise.all([
      import("./events/texas-event-records.server"),
      import("./events/texas-event-calendar.server"),
      import("./sports-venue-images"),
    ]);
    const venueId = `sports-venue:${data.slug}`;
    const records = loadUpcomingTexasEventRecordsServer({ venueId, limit: 9 });
    const photo = getSportsVenuePhoto(data.slug);
    const events = buildTexasEventCarouselItemsServer(records).map((event) => {
      if (!photo || !event.image) return event;
      const repeatsVenueHero = event.image.url === photo.imageUrl
        || event.image.sourceUrl === photo.sourcePage;
      if (!repeatsVenueHero) return event;
      const { image: _venueHeroFallback, ...eventWithoutVenueHeroFallback } = event;
      return eventWithoutVenueHeroFallback;
    });

    return {
      venueId,
      calendarHref: `/events?venue=${encodeURIComponent(venueId)}#calendar`,
      events,
    };
  });
