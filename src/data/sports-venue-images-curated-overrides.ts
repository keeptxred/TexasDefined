import type { SportsVenuePhoto } from './sports-venue-images';

const curatedSportsVenuePhotoOverrides: Record<string, SportsVenuePhoto> = {
  'retama-park': {
    slug: 'retama-park',
    alt: 'Quarter horse racing at Retama Park in Selma, Texas',
    imageUrl: 'https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/2407/8518059/2000w_q95.jpg',
    sourcePage: 'https://www.dvidshub.net/image/8518059/quarter-horse-races-honoring-the-memorial-of-colonel-gary-baber',
    sourceName: 'DVIDS / U.S. Air Force',
    author: 'Olivia Mendoza Sencalar',
    licenseName: 'Public domain; the appearance of U.S. Department of War visual information does not imply or constitute DoW endorsement',
    licenseUrl: 'https://www.dvidshub.net/about/copyright',
    width: 2012,
    height: 1054,
  },
  'tpc-san-antonio': {
    slug: 'tpc-san-antonio',
    alt: 'PGA Tour golfer Martin Trainer on the course at TPC San Antonio during the Valero Texas Open',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Martin_Trainer_The_Thinker.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Martin_Trainer_The_Thinker.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'TheDapperDan',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 6016,
    height: 4016,
  },
  'xtreme-raceway-park': {
    slug: 'xtreme-raceway-park',
    alt: 'Xtreme Raceway Park drag strip in Ferris, Texas',
    imageUrl: 'https://membertrack.nhradata.com/Images/Tracks/PRIMARY__153.jpg',
    sourcePage: 'https://www.nhradiv4.com/membertrackinfo?trackID=885',
    sourceName: 'NHRA South Central Division',
    author: 'NHRA Member Track Network',
    licenseName: 'Official member-track media; all rights reserved',
    licenseUrl: 'https://www.nhradiv4.com/membertrackinfo?trackID=885',
    width: 400,
    height: 250,
  },
};

export function getCuratedSportsVenuePhotoOverride(slug: string) {
  return curatedSportsVenuePhotoOverrides[slug];
}
