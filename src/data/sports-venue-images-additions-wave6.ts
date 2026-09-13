import type { SportsVenuePhoto } from './sports-venue-images';

export const sportsVenuePhotoAdditionsWave6: Record<string, SportsVenuePhoto> = {
  'baylor-ballpark': {
    slug: 'baylor-ballpark',
    alt: 'Baylor Ballpark on the Baylor University campus in Waco, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Baylor_University_June_2016_47_%28Baylor_Ballpark%29.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Baylor_University_June_2016_47_(Baylor_Ballpark).jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Michael Barera',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 6000,
    height: 4000,
  },
};

export function getSportsVenuePhotoAdditionWave6(slug: string) {
  return sportsVenuePhotoAdditionsWave6[slug];
}
