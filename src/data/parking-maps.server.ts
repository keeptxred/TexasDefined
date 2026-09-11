import { createServerFn } from '@tanstack/react-start';

const loadMajorEventParkingMap = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const [
      { getMajorEventRecordServer },
      { resolveSportsVenueEventLink },
      { getParkingMapForEvent },
    ] = await Promise.all([
      import('./major-event-page.server'),
      import('./sports-venue-event-links'),
      import('./parking-maps'),
    ]);

    const event = getMajorEventRecordServer(data.slug);
    if (!event) return undefined;

    const venueLink = resolveSportsVenueEventLink(event.venue);
    const venueSlug = venueLink?.href.split('/sports-venue/')[1]?.split(/[?#]/)[0];
    return getParkingMapForEvent(event.slug, venueSlug);
  });

export function getMajorEventParkingMap(slug: string) {
  return loadMajorEventParkingMap({ data: { slug } });
}
