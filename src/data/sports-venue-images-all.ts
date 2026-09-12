import { getSportsVenuePhotoAddition } from './sports-venue-images-additions';
import { getSportsVenuePhoto as getSportsVenuePhotoBase } from './sports-venue-images';

export type { SportsVenuePhoto } from './sports-venue-images';

export function getSportsVenuePhoto(slug: string) {
  return getSportsVenuePhotoBase(slug) ?? getSportsVenuePhotoAddition(slug);
}
