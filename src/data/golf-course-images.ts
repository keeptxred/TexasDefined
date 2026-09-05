export type GolfCourseLicensedImage = {
  src: string;
  sourceUrl: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  creator: string;
  credit: string;
  license: string;
  licenseUrl: string;
  verifiedAt: string;
  actualLocation: true;
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
const verifiedAt = '2026-09-05';

/**
 * Item-level image rights for exact Texas golf-course locations.
 * Do not add imagery from search-result thumbnails, course review sites, social media or map-photo surfaces.
 */
export const GOLF_COURSE_LICENSED_IMAGES: Readonly<Record<string, GolfCourseLicensedImage>> = {
  'the-woodlands-country-club-tournament-course': {
    src: commons('Woodlands Tournament Golf Course.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Woodlands_Tournament_Golf_Course.jpg',
    alt: 'Fifth hole of The Woodlands Country Club Tournament Course in The Woodlands, Texas',
    caption: 'The fifth hole of The Woodlands Tournament Course.',
    width: 1024,
    height: 683,
    creator: 'Trey Perry',
    credit: 'Trey Perry · Wikimedia Commons',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    verifiedAt,
    actualLocation: true,
  },
  'stevens-park-golf-course': {
    src: commons('Stevens Park Golf Course In 2023.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stevens_Park_Golf_Course_In_2023.jpg',
    alt: 'Dallas skyline viewed from Stevens Park Golf Course in Dallas, Texas',
    caption: 'Dallas skyline viewed across Stevens Park Golf Course.',
    width: 3200,
    height: 2017,
    creator: 'BHlP457',
    credit: 'BHlP457 · Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    verifiedAt,
    actualLocation: true,
  },
  'lions-municipal-golf-course': {
    src: commons('Lions municipal golf course clubhouse austin.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lions_municipal_golf_course_clubhouse_austin.jpg',
    alt: 'Lions Municipal Golf Course clubhouse and putting green in Austin, Texas',
    caption: 'Clubhouse and putting green at Lions Municipal Golf Course in Austin.',
    width: 2144,
    height: 1428,
    creator: 'Larry D. Moore',
    credit: 'Larry D. Moore · Wikimedia Commons',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    verifiedAt,
    actualLocation: true,
  },
  'morris-williams-golf-course': {
    src: commons('WilliamsMorrisGolfCourse.JPG'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:WilliamsMorrisGolfCourse.JPG',
    alt: 'Morris Williams Golf Course in Austin, Texas',
    caption: 'Morris Williams Golf Course in Austin.',
    width: 2272,
    height: 1704,
    creator: 'WhisperToMe',
    credit: 'WhisperToMe · Wikimedia Commons',
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    verifiedAt,
    actualLocation: true,
  },
  'hancock-golf-course': {
    src: commons('Hancock golf course austin hole9.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hancock_golf_course_austin_hole9.jpg',
    alt: 'Ninth hole at Hancock Golf Course in Austin, Texas',
    caption: 'The ninth hole at Hancock Golf Course in Austin.',
    width: 2169,
    height: 1447,
    creator: 'Larry D. Moore',
    credit: 'Larry D. Moore · Wikimedia Commons',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    verifiedAt,
    actualLocation: true,
  },
  'brackenridge-park-golf-course': {
    src: commons('Borglum Studio (Oct 2012) in San Antonio, Texas.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Borglum_Studio_(Oct_2012)_in_San_Antonio,_Texas.jpg',
    alt: 'Borglum Studio at Brackenridge Park Golf Course in San Antonio, Texas',
    caption: 'Borglum Studio on the Brackenridge Park Golf Course property in San Antonio.',
    width: 1024,
    height: 768,
    creator: 'Pauliedigi',
    credit: 'Pauliedigi · Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    verifiedAt,
    actualLocation: true,
  },
  'scott-schreiner-golf-course': {
    src: commons('Schreiner Golf Course Kerrville Texas.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Schreiner_Golf_Course_Kerrville_Texas.jpg',
    alt: 'Golfer on the fairway at Scott Schreiner Municipal Golf Course in Kerrville, Texas',
    caption: 'A fairway view at Scott Schreiner Municipal Golf Course in Kerrville.',
    width: 2667,
    height: 1500,
    creator: 'Larry D. Moore',
    credit: 'Larry D. Moore · Wikimedia Commons',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    verifiedAt,
    actualLocation: true,
  },
};

export function golfCourseLicensedImage(slug: string): GolfCourseLicensedImage | undefined {
  return GOLF_COURSE_LICENSED_IMAGES[slug];
}

export const GOLF_COURSE_LICENSED_IMAGE_COUNT = Object.keys(GOLF_COURSE_LICENSED_IMAGES).length;
