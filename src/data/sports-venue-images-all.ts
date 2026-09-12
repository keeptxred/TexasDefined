import { getSportsVenuePhotoAddition } from './sports-venue-images-additions';
import { getSportsVenuePhotoAdditionWave2 } from './sports-venue-images-additions-wave2';
import { getSportsVenuePhotoAdditionWave3 } from './sports-venue-images-additions-wave3';
import { getSportsVenuePhotoAdditionWave4 } from './sports-venue-images-additions-wave4';
import { getSportsVenuePhotoAdditionWave5 } from './sports-venue-images-additions-wave5';
import { getSportsVenuePhotoAdditionWave6 } from './sports-venue-images-additions-wave6';
import { getSportsVenuePhoto as getSportsVenuePhotoBase } from './sports-venue-images';

export type { SportsVenuePhoto } from './sports-venue-images';

export function getSportsVenuePhoto(slug: string) {
  return getSportsVenuePhotoBase(slug) ?? getSportsVenuePhotoAddition(slug) ?? getSportsVenuePhotoAdditionWave2(slug) ?? getSportsVenuePhotoAdditionWave3(slug) ?? getSportsVenuePhotoAdditionWave4(slug) ?? getSportsVenuePhotoAdditionWave5(slug) ?? getSportsVenuePhotoAdditionWave6(slug);
}
