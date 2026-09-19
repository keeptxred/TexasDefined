import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-19";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Eighty-second statewide museum wave. This record adds Henrietta's active
 * county-history museum in the preserved 1890 Clay County Jail.
 */
export const statewideMuseumExpansionWave82Destinations: Destination[] = [
  {
    id: "museum-statewide-wave82-clay-county-1890-jail-museum",
    brandId: "texasdefined",
    slug: "clay-county-1890-jail-museum-henrietta",
    name: "Clay County 1890 Jail Museum & Heritage Center",
    summary: "Clay County 1890 Jail Museum & Heritage Center preserves frontier-era county history inside Henrietta's 1890 jail, combining original cells and a never-used gallows with the sheriff's residence, period rooms, Old West material, ranching and agricultural exhibits, and local family-history archives.",
    category: "historic-sites",
    region: "prairies-lakes",
    geography: {
      primaryRegionId: "north-texas",
      subregionIds: ["north-texas-prairies"],
      countySlugs: ["clay"],
      travelRegionIds: ["prairies-lakes"],
    },
    nearestTown: "Henrietta",
    county: "Clay County",
    coordinates: { lat: 33.81593, lng: -98.19784 },
    hero: museumPlaceholder("Clay County 1890 Jail Museum & Heritage Center"),
    bestSeason: "Spring and fall are especially comfortable for pairing the museum with Henrietta's courthouse square and other outdoor North Texas history stops; the museum operates on a limited seasonal schedule.",
    entryNote: "The City of Henrietta currently publishes free admission, with donations welcome. It lists Thursday and Friday 10 a.m.–2 p.m. and Saturday 1–4 p.m. from March through the first week of December, plus Friday 10 a.m.–2 p.m. and Saturday 1–4 p.m. when the museum reopens in February. Confirm current hours before a dedicated trip.",
    highlights: [
      "Original 1890 Clay County jail cells and never-used gallows",
      "Sheriff's family living quarters with period furnishings",
      "Clay County ranching, agriculture and Old West exhibits",
      "Family-history, photograph and local archival collections",
    ],
    body: [
      "Clay County 1890 Jail Museum & Heritage Center occupies a building that served county law enforcement for more than eight decades. The Texas Historical Commission dates the jail to 1890, credits the Pauly Jail Building and Manufacturing Company of St. Louis, and records that official jail use ended in 1973. The same in-situ marker identifies the two-story brick structure's attached living quarters for law officers and their families, making the building itself one of the museum's most important artifacts.",
      "The City of Henrietta presents the museum as a broader Clay County history center rather than only a preserved lockup. Visitors can see the original jail and gallows, the sheriff's residence furnished with period material, Old West artifacts, ranching and agricultural displays, and archives of family histories and photographs. That mix gives the museum a useful countywide role: the building interprets law enforcement and domestic life while the collections extend into the work, families and industries that shaped the surrounding North Texas prairie.",
      "The Clay County Historical Society has been central to preserving the site. Current regional nonprofit information traces the society's jail-restoration effort to the 1980s, followed by later fundraising that restored the building and expanded display and storage space. For TexasDefined, the museum adds a visitor-ready heritage anchor to the existing Clay County and Henrietta authority coverage while remaining distinct from the active courthouse and other county-government sites nearby. Because the operating schedule is seasonal and volunteer-scale, travelers should verify hours before making the museum the sole purpose of a long drive.",
    ],
    officialUrl: "https://cityofhenrietta.com/attractions/1890-jail-museum/",
    managingAuthority: "Clay County Historical Society, Inc.",
    address: "116 N Graham St, Henrietta, TX 76365",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
