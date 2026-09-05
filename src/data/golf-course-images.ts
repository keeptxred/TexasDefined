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
};

export function golfCourseLicensedImage(slug: string): GolfCourseLicensedImage | undefined {
  return GOLF_COURSE_LICENSED_IMAGES[slug];
}

export const GOLF_COURSE_LICENSED_IMAGE_COUNT = Object.keys(GOLF_COURSE_LICENSED_IMAGES).length;
