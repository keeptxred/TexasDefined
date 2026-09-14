import type { SportsVenuePhoto } from './sports-venue-images';

const curatedSportsVenuePhotoOverrides: Record<string, SportsVenuePhoto> = {};

export function getCuratedSportsVenuePhotoOverride(slug: string) {
  return curatedSportsVenuePhotoOverrides[slug];
}
