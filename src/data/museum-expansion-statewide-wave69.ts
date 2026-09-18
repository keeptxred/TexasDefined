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
 * Sixty-ninth statewide museum wave. This record reconciles the audit's
 * "Winnsboro Heritage Museum" wording to the active Winnsboro Historical
 * Museum inside the restored 1908 railroad depot.
 */
export const statewideMuseumExpansionWave69Destinations: Destination[] = [
  {
    id: "museum-statewide-wave69-winnsboro-historical-museum",
    brandId: "texasdefined",
    slug: "winnsboro-historical-museum",
    name: "Winnsboro Historical Museum",
    summary: "Winnsboro Historical Museum occupies the town's restored 1908 railroad depot and interprets local railroad, agricultural, commercial and community history through changing exhibits, archival material and a broader historical-signage trail across Winnsboro.",
    category: "historic-sites",
    region: "piney-woods",
    geography: {
      primaryRegionId: "east-texas",
      subregionIds: ["piney-woods"],
      countySlugs: ["wood"],
      travelRegionIds: ["piney-woods"],
    },
    nearestTown: "Winnsboro",
    county: "Wood County",
    coordinates: { lat: 32.95702, lng: -95.29028 },
    hero: museumPlaceholder("Winnsboro Historical Museum"),
    bestSeason: "Year-round during museum hours; spring and fall are especially comfortable for pairing the depot with Winnsboro's downtown historical-signage trail and other walkable heritage stops.",
    entryNote: "The museum currently lists public hours Thursday through Saturday from 10 a.m. to 4 p.m. Admission is free, with donations appreciated, and private tours are available for groups, students and homeschoolers by advance arrangement.",
    highlights: [
      "Restored 1908 Winnsboro railroad depot",
      "Railroad, timber, agriculture and community-history exhibits",
      "Changing displays and local archival interpretation",
      "Historical-signage trail linking museum stories to sites around town",
    ],
    body: [
      "Winnsboro Historical Museum makes the depot itself part of the exhibit. The town's first railroad depot was built in 1878 after the East Line and Red River Railroad reached Winnsboro, tying local timber and agricultural production to wider markets. That structure burned in 1907, and the present depot was rebuilt in 1908. The museum's own history describes a building that once handled passenger traffic, freight and round-the-clock telegraph messages, giving visitors a surviving piece of the transportation system that reshaped the town.",
      "Inside, the museum interprets Winnsboro through changing exhibits rather than a single permanent storyline. Railroad history is central, but the collection and current programming also reach into local businesses, families, civic life, oil-boom years and other community subjects. The museum has been expanding its use of the depot, digitizing records and recruiting volunteers while continuing to invite residents to contribute stories, photographs and locally connected artifacts.",
      "The museum also pushes visitors beyond the depot. Its historical-signage project connects short narratives about Winnsboro landmarks, schools, parks, churches, businesses and notable events to an interactive town trail, making the museum a practical orientation point for a broader heritage walk or drive. For TexasDefined, that gives the destination a distinct role from nearby Mineola and Quitman museums: it is the local-history anchor for Winnsboro itself and a natural authority node for Wood County's railroad-and-small-town story.",
    ],
    officialUrl: "https://www.winnsborotxmuseum.com/",
    managingAuthority: "Winnsboro Historical Association",
    address: "100 E Broadway St, Winnsboro, TX 75494",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
