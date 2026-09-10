export type SportsVenueLicensedImage = {
  fileName: string;
  sourcePage: string;
  sourceName: 'Wikimedia Commons';
  creator: string;
  licenseName: 'CC BY-SA 4.0';
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/';
  originalWidth: number;
  originalHeight: number;
  alt: string;
  contextNote?: string;
  verifiedAt: string;
};

const ccBySa40 = 'https://creativecommons.org/licenses/by-sa/4.0/' as const;
const verifiedAt = '2026-09-10';

const SPORTS_VENUE_LICENSED_IMAGES: Record<string, SportsVenueLicensedImage> = {
  'amon-g-carter-stadium': {
    fileName: 'Amon G. Carter Stadium, 2017.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Amon_G._Carter_Stadium,_2017.jpg',
    sourceName: 'Wikimedia Commons',
    creator: 'Cubfan1109',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: ccBySa40,
    originalWidth: 8168,
    originalHeight: 2809,
    alt: 'Panoramic view of Amon G. Carter Stadium at TCU in Fort Worth',
    verifiedAt,
  },
  'gerald-j-ford-stadium': {
    fileName: 'View of Gerald J Ford Stadium after renovations, 20224.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:View_of_Gerald_J_Ford_Stadium_after_renovations,_20224.jpg',
    sourceName: 'Wikimedia Commons',
    creator: 'HavanaHeat',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: ccBySa40,
    originalWidth: 5712,
    originalHeight: 4284,
    alt: 'Gerald J. Ford Stadium at SMU after its renovation during a 2024 football game',
    verifiedAt,
  },
  'datcu-stadium': {
    fileName: 'University of North Texas September 2015 43 (Apogee Stadium).jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:University_of_North_Texas_September_2015_43_(Apogee_Stadium).jpg',
    sourceName: 'Wikimedia Commons',
    creator: 'Michael Barera',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: ccBySa40,
    originalWidth: 6000,
    originalHeight: 4000,
    alt: 'DATCU Stadium on the University of North Texas campus in Denton',
    contextNote: 'The venue was photographed while it was named Apogee Stadium.',
    verifiedAt,
  },
  'riders-field': {
    fileName: 'Dr Pepper Ballpark 2017.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Dr_Pepper_Ballpark_2017.jpg',
    sourceName: 'Wikimedia Commons',
    creator: 'One253sir',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: ccBySa40,
    originalWidth: 1200,
    originalHeight: 900,
    alt: 'Riders Field in Frisco viewed from behind home plate during a RoughRiders game',
    contextNote: 'The venue was photographed while it was named Dr Pepper Ballpark.',
    verifiedAt,
  },
  'lone-star-park': {
    fileName: 'Lone Star Park.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Lone_Star_Park.jpg',
    sourceName: 'Wikimedia Commons',
    creator: 'Jax 0677',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: ccBySa40,
    originalWidth: 3264,
    originalHeight: 2448,
    alt: 'Lone Star Park horse racing venue in Grand Prairie, Texas',
    verifiedAt,
  },
};

const wikimediaFileRedirect = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/';

export const SPORTS_VENUE_LICENSED_IMAGE_SLUGS = Object.freeze(Object.keys(SPORTS_VENUE_LICENSED_IMAGES));

export function getSportsVenueLicensedImage(slug: string) {
  return SPORTS_VENUE_LICENSED_IMAGES[slug];
}

export function sportsVenueLicensedImageSource(image: SportsVenueLicensedImage) {
  return `${wikimediaFileRedirect}${encodeURIComponent(image.fileName)}?width=1600`;
}
