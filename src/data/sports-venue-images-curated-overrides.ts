import type { SportsVenuePhoto } from './sports-venue-images';

const curatedSportsVenuePhotoOverrides: Record<string, SportsVenuePhoto> = {
  'dickies-arena': {
    slug: 'dickies-arena',
    alt: 'Dickies Arena exterior in Fort Worth, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dickies_Arena_%28Fort_Worth%2C_Texas%29_-_2021-03-06_-_001.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Dickies_Arena_(Fort_Worth,_Texas)_-_2021-03-06_-_001.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Michael Barera',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 1067,
  },
};

export function getCuratedSportsVenuePhotoOverride(slug: string) {
  return curatedSportsVenuePhotoOverrides[slug];
}
