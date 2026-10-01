import { getSportsVenuePhotoAddition } from './sports-venue-images-additions';
import { getSportsVenuePhotoAdditionWave2 } from './sports-venue-images-additions-wave2';
import { getSportsVenuePhotoAdditionWave3 } from './sports-venue-images-additions-wave3';
import { getSportsVenuePhotoAdditionWave4 } from './sports-venue-images-additions-wave4';
import { getSportsVenuePhotoAdditionWave5 } from './sports-venue-images-additions-wave5';
import { getSportsVenuePhotoAdditionWave6 } from './sports-venue-images-additions-wave6';
import { getSportsVenuePhotoAdditionWave7 } from './sports-venue-images-additions-wave7';
import { getCuratedSportsVenuePhotoOverride } from './sports-venue-images-curated-overrides';
import { getSportsVenuePhoto as getSportsVenuePhotoBase } from './sports-venue-images';
import type { SportsVenuePhoto } from './sports-venue-images';

export type { SportsVenuePhoto } from './sports-venue-images';

const XTREME_RACEWAY_DISCOVER_IMAGE = 'https://images.weserv.nl/?url=texasdefined.com/images/sports-venues/xtreme-raceway-park.jpg&w=1200&h=800&fit=cover&output=jpg';

function deliverDiscoverSizedVenuePhoto(slug: string, photo: SportsVenuePhoto | undefined) {
  if (!photo || slug !== 'xtreme-raceway-park') return photo;
  return {
    ...photo,
    imageUrl: XTREME_RACEWAY_DISCOVER_IMAGE,
    width: 1200,
    height: 800,
  };
}

export function getSportsVenuePhoto(slug: string) {
  const photo = getCuratedSportsVenuePhotoOverride(slug) ?? getSportsVenuePhotoBase(slug) ?? getSportsVenuePhotoAddition(slug) ?? getSportsVenuePhotoAdditionWave2(slug) ?? getSportsVenuePhotoAdditionWave3(slug) ?? getSportsVenuePhotoAdditionWave4(slug) ?? getSportsVenuePhotoAdditionWave5(slug) ?? getSportsVenuePhotoAdditionWave6(slug) ?? getSportsVenuePhotoAdditionWave7(slug);
  return deliverDiscoverSizedVenuePhoto(slug, photo);
}
