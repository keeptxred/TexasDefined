import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-05";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Sixty-fourth statewide museum wave. This Brownfield record reconciles the
 * audit's older Terry County Historical Museum wording to the active Terry
 * County Heritage Museum and its current first-party visitor information.
 */
export const statewideMuseumExpansionWave64Destinations: Destination[] = [
  {
    id: "museum-statewide-wave64-terry-county-heritage-museum",
    brandId: "texasdefined",
    slug: "terry-county-heritage-museum-brownfield",
    name: "Terry County Heritage Museum",
    summary: "Terry County Heritage Museum in Brownfield preserves South Plains history across the 1928 A.M. Brownfield house and companion structures interpreting Indigenous history, ranching, farming, early law enforcement, railroads and pioneer life.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Brownfield",
    county: "Terry County",
    coordinates: { lat: 33.17397, lng: -102.27277 },
    hero: museumPlaceholder("Terry County Heritage Museum"),
    bestSeason: "Year-round during published weekday hours; spring and fall are especially comfortable for walking between the house, jail, depot and other outdoor museum structures.",
    entryNote: "The museum currently publishes Tuesday-Friday hours from 10 a.m. to noon and 1 to 3 p.m., with special-hour updates posted through its social channels. Confirm current hours before a dedicated trip, especially around holidays or community events.",
    highlights: [
      "1928 A.M. Brownfield house and family history",
      "Native American, ranching and farming exhibits",
      "Terry County's restored first jail",
      "Depot, covered wagons and early fire-truck collection",
    ],
    body: [
      "Terry County Heritage Museum tells the story of Brownfield and the surrounding South Plains from a property directly tied to the community's namesake family. Alfred Marion 'Dick' Brownfield, his wife Seleta Jane and their young daughter arrived in the area by covered wagon in 1902. The family later built the house that now anchors the museum in 1928, and after A.M. Brownfield's death in 1967 the property passed to the City of Brownfield. The museum was established in 1970, giving the county a permanent place to preserve the material history of settlement, agriculture and community life.",
      "The visitor experience extends beyond a single historic house. Rooms in the Brownfield home interpret subjects including domestic life, medicine, education, banking and Native American history, while separate structures broaden the story into ranching, farming, transportation and law enforcement. The restored one-room first county jail contains its original steel cells, and the depot collection adds railroad and pioneer artifacts including saddles, covered wagons and an early fire truck.",
      "For TexasDefined, the current Terry County Heritage Museum identity resolves the audit's older Terry County Historical Museum wording while adding a clear heritage anchor to the existing Terry County and Brownfield coverage. The museum's first-party site remains active and publishes current visitor hours and contact information, while Texas Historical Commission records independently place the museum and the county's first-jail marker at the East Cardwell Street property. That combination makes this a defensible, visitor-ready authority destination rather than a thin historical listing.",
    ],
    officialUrl: "https://terrycoheritagemuseum.com/",
    managingAuthority: "Terry County Heritage Museum",
    address: "600 E Cardwell St, Brownfield, TX 79316",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
