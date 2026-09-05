import { createServerFn } from '@tanstack/react-start';

const slugInput = (data: { slug: string }) => data;
const countyInput = (data: { countySlug: string }) => data;
const regionInput = (data: { regionSlug: string }) => data;

export const getWeddingVenueDirectory = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { WEDDING_VENUE_REGIONS, WEDDING_VENUE_SEED_STATS, WEDDING_VENUES } = await import('./wedding-venues.server');
    return {
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
    return region ? { region, venues: weddingVenuesForRegion(region.slug) } : null;
  });

export const getWeddingVenueProfile = createServerFn({ method: 'GET' })
  .inputValidator(slugInput)
  .handler(async ({ data }) => {
    const { findWeddingVenue, findWeddingVenueRegion } = await import('./wedding-venues.server');
    const venue = findWeddingVenue(data.slug);
    if (!venue) return null;
    const region = findWeddingVenueRegion(venue.regionSlug);
    return region ? { venue, region } : null;
  });
