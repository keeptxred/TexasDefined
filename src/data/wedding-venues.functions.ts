import { createServerFn } from '@tanstack/react-start';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const slugInput = (data: { slug: string }) => data;
const countyInput = (data: { countySlug: string }) => data;
const regionInput = (data: { regionSlug: string }) => data;

function head(title: string, description: string, canonicalPath: string, robots?: string) {
  return {
    meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath, robots }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  };
}

export const getWeddingVenueDirectory = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { WEDDING_VENUE_REGIONS, WEDDING_VENUE_SEED_STATS, WEDDING_VENUES } = await import('./wedding-venues.server');
    return {
      head: head(
        'Top Wedding Venues in Texas: 249 Places to Start',
        'Explore a TexasDefined starting shortlist of wedding venues across Austin and the Hill Country, Dallas–Fort Worth, Houston and the Gulf Coast, San Antonio and South Texas, East Texas, West Texas and the Panhandle.',
        '/wedding-venues',
      ),
      regions: WEDDING_VENUE_REGIONS,
      stats: WEDDING_VENUE_SEED_STATS,
      venues: WEDDING_VENUES,
    };
  });

const loadCountyWeddingVenues = createServerFn({ method: 'GET' })
  .inputValidator(countyInput)
  .handler(async ({ data }) => {
    const { weddingVenuesForCounty } = await import('./wedding-venues.server');
    return weddingVenuesForCounty(data.countySlug);
  });

export function getCountyWeddingVenues(countySlug: string) {
  return loadCountyWeddingVenues({ data: { countySlug } });
}

export const getWeddingVenueRegionPage = createServerFn({ method: 'GET' })
  .inputValidator(regionInput)
  .handler(async ({ data }) => {
    const { findWeddingVenueRegion, weddingVenuesForRegion } = await import('./wedding-venues.server');
    const region = findWeddingVenueRegion(data.regionSlug);
    if (!region) return null;
    const canonicalPath = `/wedding-venues/region/${region.slug}`;
    return {
      head: head(
        `Top Wedding Venues in ${region.name}`,
        `Browse wedding venues in ${region.name}, with TexasDefined county connections where location data is curated and direct links to venue profiles for deeper planning.`,
        canonicalPath,
      ),
      region,
      venues: weddingVenuesForRegion(region.slug),
    };
  });

export const getWeddingVenueProfile = createServerFn({ method: 'GET' })
  .inputValidator(slugInput)
  .handler(async ({ data }) => {
    const { findWeddingVenue, findWeddingVenueRegion } = await import('./wedding-venues.server');
    const venue = findWeddingVenue(data.slug);
    if (!venue) return null;
    const region = findWeddingVenueRegion(venue.regionSlug);
    if (!region) return null;
    const canonicalPath = `/wedding-venue/${venue.slug}`;
    return {
      head: head(
        `${venue.name} Wedding Venue | TexasDefined`,
        `${venue.name} wedding venue profile with Texas regional context and practical planning questions to confirm directly with the venue before booking.`,
        canonicalPath,
        'noindex, follow, max-image-preview:large',
      ),
      venue,
      region,
    };
  });