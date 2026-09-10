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
  'texas-motor-speedway': {
    slug: 'texas-motor-speedway',
    alt: 'Texas Motor Speedway in Fort Worth, Texas, viewed across the racing complex',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/TexasMotorSpeedway23.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:TexasMotorSpeedway23.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Murphpics',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 901,
  },
  'cowtown-coliseum': {
    slug: 'cowtown-coliseum',
    alt: 'Cowtown Coliseum in the Fort Worth Stockyards historic district',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Coliseum_-_Forth_Worth_Stockyards_Historic_District.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:The_Coliseum_-_Forth_Worth_Stockyards_Historic_District.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'chrisc39',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 1200,
  },
  'credit-union-of-texas-event-center': {
    slug: 'credit-union-of-texas-event-center',
    alt: 'Inside Credit Union of Texas Event Center in Allen, Texas, during an arena soccer match',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Allen_Event_Center_-_23_February_2013.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Allen_Event_Center_-_23_February_2013.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Dravecky',
    licenseName: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    width: 1600,
    height: 2133,
  },
  'moody-coliseum-smu': {
    slug: 'moody-coliseum-smu',
    alt: 'Moody Coliseum on the Southern Methodist University campus in University Park, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Southern_Methodist_University_July_2016_048_%28Moody_Coliseum%29.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Southern_Methodist_University_July_2016_048_(Moody_Coliseum).jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Michael Barera',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 1067,
  },
  'unt-coliseum': {
    slug: 'unt-coliseum',
    alt: 'University of North Texas Coliseum, also known as the Super Pit, in Denton, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/University_of_North_Texas_-_Coliseum.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:University_of_North_Texas_-_Coliseum.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Gabriel Flores',
    licenseName: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    width: 1600,
    height: 878,
  },
};

export function getSportsVenuePhoto(slug: string) {
  return sportsVenuePhotos[slug];
}
