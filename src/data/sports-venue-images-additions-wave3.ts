import type { SportsVenuePhoto } from './sports-venue-images';

export const sportsVenuePhotoAdditionsWave3: Record<string, SportsVenuePhoto> = {
  'ufcu-stadium': {
    slug: 'ufcu-stadium',
    alt: 'UFCU Stadium at Texas State University in San Marcos, photographed while the venue was named Bobcat Stadium',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_State_Bobcat_Stadium_Main_Facade.JPG?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Texas_State_Bobcat_Stadium_Main_Facade.JPG',
    sourceName: 'Wikimedia Commons',
    author: 'Greenstrat',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 1200,
  },
};

export function getSportsVenuePhotoAdditionWave3(slug: string) {
  return sportsVenuePhotoAdditionsWave3[slug];
}
