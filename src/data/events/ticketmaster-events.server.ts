import snapshot from '../generated/ticketmaster-events.json';
import { geographyForPlace } from '../geography-knowledge-graph';
import { resolveSportsVenueEventLink } from '../sports-venue-event-links';
import type { TexasEventRecord, TexasEventTicketSaleStatus } from './texas-event-record';

interface TicketmasterRow {
  id: string; name: string; startDate: string; startTime?: string; city: string; venue: string;
  officialUrl: string; affiliateUrl: string; status: string; segment: string; genre: string; publicSaleStart?: string;
}
interface TicketmasterSnapshot { fetchedAt: string | null; events: TicketmasterRow[] }

const ticketmasterAuthorityMatchers = [
  { city: "McAllen", slug: "fiesta-de-palmas", prefix: "fiesta de palmas" },
  { city: "McAllen", slug: "mcallen-holiday-parade", prefix: "mcallen holiday parade" },
  { city: "San Antonio", slug: "bands-of-america-san-antonio-super-regional", prefix: "bands of america: san antonio super regional championship" },
  { city: "Arlington", slug: "big-12-football-championship", prefix: "big 12 football championship" },
  { city: "El Paso", slug: "el-paso-film-festival", prefix: "el paso film festival" },
  { city: "El Paso", slug: "way-out-west-festival-el-paso", prefix: "way out west festival" },
  { city: "Dallas", slug: "state-fair-classic", prefix: "state fair classic" },
  { city: "Beaumont", slug: "beaumont-comic-con", prefix: "beaumont comic con" },
] as const;

export function ticketmasterAuthorityGuidePath(name: string, city: string) {
  const normalizedName = name.trim().toLocaleLowerCase("en-US");
  const normalizedCity = city.trim().toLocaleLowerCase("en-US");
  const match = ticketmasterAuthorityMatchers.find((candidate) =>
    candidate.city.toLocaleLowerCase("en-US") === normalizedCity
    && normalizedName.startsWith(candidate.prefix),
  );
  return match ? `/event/${match.slug}` : undefined;
}

export function loadTicketmasterEventsServer(catalog: TicketmasterSnapshot = snapshot, now = new Date()): TexasEventRecord[] {
  const fetchedAt = catalog.fetchedAt;
  // Hide stale commercial inventory if the daily refresh stops succeeding.
  if (!fetchedAt || !Number.isFinite(Date.parse(fetchedAt)) || now.getTime() - Date.parse(fetchedAt) > 48 * 3600000 || Date.parse(fetchedAt) > now.getTime()) return [];
  return catalog.events.flatMap((event): TexasEventRecord[] => {
    const region = geographyForPlace(event.city)?.travelRegionIds[0];
    if (!region || ['cancelled', 'postponed', 'rescheduled'].includes(event.status)) return [];
    const venue = resolveSportsVenueEventLink(event.venue);
    const venueSlug = venue?.href.split('/').at(-1);
    const saleStatus: TexasEventTicketSaleStatus = event.status === 'offsale' ? 'off-sale'
      : event.status === 'soldout' ? 'sold-out'
      : event.publicSaleStart && Date.parse(event.publicSaleStart) > now.getTime() ? 'not-on-sale-yet'
      : event.status === 'onsale' ? 'on-sale' : 'unknown';
    const category = event.segment === 'Sports' ? 'sport' : event.segment === 'Music' ? 'music' : 'culture';
    return [{
      id: `ticketmaster:${event.id}`, slug: `ticketmaster-${event.id}`, title: event.name,
      summary: `${event.name} at ${event.venue || 'a local venue'} in ${event.city}. Check Ticketmaster for current ticket availability and event details.`,
      guidePath: ticketmasterAuthorityGuidePath(event.name, event.city) ?? `/events?start=${event.startDate}&end=${event.startDate}`,
      startDate: event.startDate, startTime: event.startTime, city: event.city, region, category,
      venueName: event.venue, venueId: venueSlug ? `sports-venue:${venueSlug}` : undefined, venuePath: venue?.href,
      officialEventUrl: event.officialUrl, status: 'scheduled', lastVerifiedAt: fetchedAt, lastUpdatedAt: fetchedAt,
      sourceName: 'Ticketmaster',
      ticketing: { offers: [], links: [{ provider: 'ticketmaster', officialTicketUrl: event.officialUrl,
        affiliateUrl: event.affiliateUrl, saleStatus, lastVerifiedAt: fetchedAt,
        source: { kind: 'provider', name: 'Ticketmaster', url: event.officialUrl },
        affiliateExpiresAt: new Date(Date.parse(fetchedAt) + 48 * 3600000).toISOString(),
      }] },
    }];
  });
}
