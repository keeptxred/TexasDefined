import type { SportsVenuePhoto } from './sports-venue-images';

export const sportsVenuePhotoAdditionsWave4: Record<string, SportsVenuePhoto> = {
  'round-rock-multipurpose-complex': {
    slug: 'round-rock-multipurpose-complex',
    alt: 'Round Rock Multipurpose Complex in Round Rock, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Round_Rock_Texas_Multipurpose_Complex_2021.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Round_Rock_Texas_Multipurpose_Complex_2021.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Larry D. Moore',
    licenseName: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    width: 1600,
    height: 900,
  },
};

export function getSportsVenuePhotoAdditionWave4(slug: string) {
  return sportsVenuePhotoAdditionsWave4[slug];
}
