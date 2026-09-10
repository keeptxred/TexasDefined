export type SportsVenuePhoto = {
  slug: string;
  alt: string;
  imageUrl: string;
  sourcePage: string;
  sourceName: string;
  author: string;
  licenseName: string;
  licenseUrl: string;
  width: number;
  height: number;
};

const sportsVenuePhotos: Record<string, SportsVenuePhoto> = {
  'att-stadium': {
    slug: 'att-stadium',
    alt: 'AT&T Stadium exterior in Arlington, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Arlington_June_2020_3_%28AT%26T_Stadium%29.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Arlington_June_2020_3_(AT%26T_Stadium).jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Michael Barera',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 1067,
  },
  'globe-life-field': {
    slug: 'globe-life-field',
    alt: 'Globe Life Field exterior in Arlington, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Globe_Life_Field_exterior_2025.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Globe_Life_Field_exterior_2025.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'BullDawg2021',
    licenseName: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    width: 1600,
    height: 1289,
  },
  'american-airlines-center': {
    slug: 'american-airlines-center',
    alt: 'American Airlines Center exterior in Dallas, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/American_Airlines_Center_Dallas.JPG?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:American_Airlines_Center_Dallas.JPG',
    sourceName: 'Wikimedia Commons',
    author: 'NoTalkMan',
    licenseName: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    width: 1600,
    height: 1200,
  },
  'toyota-stadium-frisco': {
    slug: 'toyota-stadium-frisco',
    alt: 'Toyota Stadium rebuilt east end in Frisco, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Toyota_Stadium_New_East_End.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Toyota_Stadium_New_East_End.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Flavius Constantine',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 1200,
  },
  'dickies-arena': {
    slug: 'dickies-arena',
    alt: 'Live event inside Dickies Arena in Fort Worth, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Twice_-_Dickies_Arena%2C_2022.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Twice_-_Dickies_Arena,_2022.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Steven Anthony Hammock',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 1039,
  },
};

export function getSportsVenuePhoto(slug: string) {
  return sportsVenuePhotos[slug];
}
