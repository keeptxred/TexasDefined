import type { SportsVenuePhoto } from './sports-venue-images';

export const sportsVenuePhotoAdditionsWave5: Record<string, SportsVenuePhoto> = {
  'msr-houston': {
    slug: 'msr-houston',
    alt: 'Aerial orthophoto of MSR Houston in Angleton, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/MSR_Houston_orthophoto_20150210.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:MSR_Houston_orthophoto_20150210.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'United States Geological Survey',
    licenseName: 'Public domain',
    licenseUrl: 'https://commons.wikimedia.org/wiki/Commons:Public_domain',
    width: 1600,
    height: 1067,
  },
};

export function getSportsVenuePhotoAdditionWave5(slug: string) {
  return sportsVenuePhotoAdditionsWave5[slug];
}
