import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-18";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Seventy-fifth statewide museum wave. This record reconciles the audit's
 * former Wise County Heritage Museum identity to the active Wise History
 * Museum on Decatur's courthouse square after the 2023 museum fire.
 */
export const statewideMuseumExpansionWave75Destinations: Destination[] = [
  {
    id: "museum-statewide-wave75-wise-history-museum",
    brandId: "texasdefined",
    slug: "wise-history-museum-decatur",
    name: "Wise History Museum",
    summary: "Wise History Museum on Decatur's historic square is the current home of the Wise County Historical Society and Historical Commission, preserving county history through surviving and recovered artifacts, digital archives, family-history files, local newspapers and public programs after the former Wise County Heritage Museum was destroyed by fire in 2023.",
    category: "historic-sites",
    region: "prairies-lakes",
    geography: {
      primaryRegionId: "north-texas",
      subregionIds: ["cross-timbers"],
      countySlugs: ["wise"],
      travelRegionIds: ["prairies-lakes"],
    },
    nearestTown: "Decatur",
    county: "Wise County",
    coordinates: { lat: 33.23444, lng: -97.5875 },
    hero: museumPlaceholder("Wise History Museum"),
    bestSeason: "Year-round during museum hours; spring and fall are especially comfortable for pairing the museum with Decatur's courthouse square, historic architecture and other Wise County heritage stops.",
    entryNote: "The current Decatur Chamber visitor listing gives museum hours Tuesday through Saturday from 10 a.m. to 5 p.m. and says general admission is free. Genealogical and local-history research is also available; contact the museum in advance if a specific archive request is the main reason for your visit.",
    highlights: [
      "Current successor to the Wise County Heritage Museum after the 2023 fire",
      "Wise County Historical Society and Historical Commission headquarters",
      "Digital Wise County family files and newspapers dating to 1880",
      "Recovered artifacts, research collections and local-history interpretation",
    ],
    body: [
      "Wise History Museum represents both continuity and a major reset for county preservation in Decatur. For decades, the Wise County Heritage Museum occupied the former Decatur Baptist College administration building on South Trinity Street. A fire on March 18, 2023 destroyed the 130-year-old structure and its contents, but the Wise County Historical Society and Wise County Historical Commission continued their preservation work rather than allowing the museum program to disappear.",
      "The organizations now operate from 119 North State Street on Decatur's historic courthouse square. The current museum combines public-history interpretation with an Archive and Research Center. Although the fire destroyed much of the physical research library, volunteers had digitized substantial material off-site; the current center provides access to family files, obituaries, school census records, funeral-home records and Wise County Messenger newspapers reaching back to 1880, alongside recovered and newly collected artifacts.",
      "For TexasDefined, Wise History Museum is the correct current destination behind the audit's older Wise County Heritage Museum wording. Visitors should not be routed to the burned South Trinity building as though it were still the operating museum. The State Street location is now the practical heritage anchor for Decatur, connecting the courthouse square with the county's Cross Timbers history, research collections and the ongoing effort to recover and rebuild after the 2023 loss.",
    ],
    officialUrl: "https://wisehistory.com/",
    managingAuthority: "Wise County Historical Society, Inc. / Wise County Historical Commission",
    address: "119 N State St, Decatur, TX 76234",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
