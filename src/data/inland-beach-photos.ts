/**
 * Verified photographs of the actual swimming-beach areas.
 * Original photographer: Larry D. Moore. Both are CC BY 4.0, unmodified.
 * The historical photo date must not be presented as a live beach condition.
 */
export type InlandBeachPhoto = {
  src: string;
  alt: string;
  caption: string;
  photographer: string;
  photographedAt: string;
  sourceUrl: string;
  licenseUrl: string;
};
export const inlandBeachPhotos: Readonly<Record<string, InlandBeachPhoto>> = {
  "cedar-hill-state-park-swimming-beach": {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Cedar_hill_state_park_swimming_area.jpg",
    alt: "Actual swimming area at Cedar Hill State Park with lakeshore, swimmers and picnic facilities, photographed July 2014",
    caption: "The designated Cedar Hill State Park swimming area as photographed in July 2014; shore conditions and facilities may have changed.",
    photographer: "Larry D. Moore",
    photographedAt: "2014-07-08",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cedar_hill_state_park_swimming_area.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "lake-mineral-wells-state-park-swim-beach": {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Lake_Mineral_Wells_State_Park_Swimming_Area.jpg",
    alt: "Actual sandy swimming beach at Lake Mineral Wells State Park with shallow water and forested hill, photographed June 2018",
    caption: "Lake Mineral Wells State Park swimming beach in June 2018; historic photography is not evidence of current water levels or conditions.",
    photographer: "Larry D. Moore",
    photographedAt: "2018-06-15",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lake_Mineral_Wells_State_Park_Swimming_Area.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
};
