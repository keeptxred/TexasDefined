export type RvParkLicensedImage = {
  src: string;
  sourceUrl: string;
  alt: string;
  width: number;
  height: number;
  creator: string;
  license: string;
  licenseUrl: string;
  verifiedAt: string;
  actualLocation: true;
  subjectScope: 'campground' | 'park-property';
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
const verifiedAt = '2026-09-05';

/**
 * Exact-location images for the RV/campground expansion.
 * A park-property image may illustrate the named public park even when the frame does not show the exact RV pad/loop.
 * No search thumbnails, social photos or directory photos are publishable here without item-level reuse rights.
 */
export const RV_PARK_LICENSED_IMAGES: Readonly<Record<string, RvParkLicensedImage>> = {
  'blanco-state-park-rv-area': {
    src: commons('Blanco State Park 1.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Blanco_State_Park_1.jpg',
    alt: 'Blanco River inside Blanco State Park in Blanco, Texas',
    width: 1200,
    height: 1600,
    creator: 'Charles Willgren',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    verifiedAt,
    actualLocation: true,
    subjectScope: 'park-property',
  },
  'garner-state-park-rv-loops': {
    src: commons('Garner state park.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Garner_state_park.jpg',
    alt: 'Frio River and the landscape of Garner State Park in Uvalde County, Texas',
    width: 2000,
    height: 1500,
    creator: 'Larry D. Moore',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    verifiedAt,
    actualLocation: true,
    subjectScope: 'park-property',
  },
  'galveston-island-state-park-rv-area': {
    src: commons('Gfp-texas-galveston-island-state-park-inlet-shore.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gfp-texas-galveston-island-state-park-inlet-shore.jpg',
    alt: 'Bay-side shoreline and wetlands at Galveston Island State Park in Texas',
    width: 3371,
    height: 2227,
    creator: 'Yinan Chen',
    license: 'Public domain dedication',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    verifiedAt,
    actualLocation: true,
    subjectScope: 'park-property',
  },
  'caddo-lake-state-park-rv-area': {
    src: commons('Big Cypress Bayou, Caddo Lake State Park, Harrison County, Texas, USA (April 2017).jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Big_Cypress_Bayou,_Caddo_Lake_State_Park,_Harrison_County,_Texas,_USA_(April_2017).jpg',
    alt: 'Big Cypress Bayou at Caddo Lake State Park in Harrison County, Texas',
    width: 2100,
    height: 1138,
    creator: 'William L. Farr',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    verifiedAt,
    actualLocation: true,
    subjectScope: 'park-property',
  },
  'palo-duro-canyon-state-park-rv-loop': {
    src: commons('Campground Palo Duro Canyon State Park Texas 2024.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Campground_Palo_Duro_Canyon_State_Park_Texas_2024.jpg',
    alt: 'Campground inside Palo Duro Canyon State Park in Randall County, Texas',
    width: 3556,
    height: 2000,
    creator: 'Larry D. Moore',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    verifiedAt,
    actualLocation: true,
    subjectScope: 'campground',
  },
};

export function rvParkLicensedImage(slug: string): RvParkLicensedImage | undefined {
  return RV_PARK_LICENSED_IMAGES[slug];
}

export const RV_PARK_LICENSED_IMAGE_COUNT = Object.keys(RV_PARK_LICENSED_IMAGES).length;
