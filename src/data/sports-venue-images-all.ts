import { getSportsVenuePhotoAddition } from './sports-venue-images-additions';
import { getSportsVenuePhotoAdditionWave2 } from './sports-venue-images-additions-wave2';
import { getSportsVenuePhotoAdditionWave3 } from './sports-venue-images-additions-wave3';
import { getSportsVenuePhoto as getSportsVenuePhotoBase } from './sports-venue-images';

export type { SportsVenuePhoto } from './sports-venue-images';

export function getSportsVenuePhoto(slug: string) {
  return getSportsVenuePhotoBase(slug) ?? getSportsVenuePhotoAddition(slug) ?? getSportsVenuePhotoAdditionWave2(slug) ?? getSportsVenuePhotoAdditionWave3(slug);
}
