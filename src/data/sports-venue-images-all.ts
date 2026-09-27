import { getSportsVenuePhotoAddition } from './sports-venue-images-additions';
import { getSportsVenuePhotoAdditionWave2 } from './sports-venue-images-additions-wave2';
import { getSportsVenuePhotoAdditionWave3 } from './sports-venue-images-additions-wave3';
import { getSportsVenuePhotoAdditionWave4 } from './sports-venue-images-additions-wave4';
import { getSportsVenuePhotoAdditionWave5 } from './sports-venue-images-additions-wave5';
import { getSportsVenuePhotoAdditionWave6 } from './sports-venue-images-additions-wave6';
import { getSportsVenuePhotoAdditionWave7 } from './sports-venue-images-additions-wave7';
import { getCuratedSportsVenuePhotoOverride } from './sports-venue-images-curated-overrides';
import { getSportsVenuePhoto as getSportsVenuePhotoBase } from './sports-venue-images';

export type { SportsVenuePhoto } from './sports-venue-images';

// These Wave 7 records are retained for provenance/audit history, but they are not
// approved as documentary venue photographs. Until a rights-verified venue-specific
// photo is available, production must fail closed to the existing fallback.
export const intentionalSportsVenuePhotoFallbackSlugs = new Set([
  'amarillo-national-center',
  'colonial-country-club',
  'cy-fair-fcu-stadium',
  'expo-center-taylor-county',
  'hodgetown',
  'houston-motorsports-park',
  'waco-surf',
]);

export function getSportsVenuePhoto(slug: string) {
  const approvedPhoto = getCuratedSportsVenuePhotoOverride(slug)
    ?? getSportsVenuePhotoBase(slug)
    ?? getSportsVenuePhotoAddition(slug)
    ?? getSportsVenuePhotoAdditionWave2(slug)
    ?? getSportsVenuePhotoAdditionWave3(slug)
    ?? getSportsVenuePhotoAdditionWave4(slug)
    ?? getSportsVenuePhotoAdditionWave5(slug)
    ?? getSportsVenuePhotoAdditionWave6(slug);
  if (approvedPhoto) return approvedPhoto;
  if (intentionalSportsVenuePhotoFallbackSlugs.has(slug)) return undefined;
  return getSportsVenuePhotoAdditionWave7(slug);
}
