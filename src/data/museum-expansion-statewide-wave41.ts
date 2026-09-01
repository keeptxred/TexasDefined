import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-01";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Forty-first statewide museum wave. This record reconciles the audit's stale
 * Navarro County Historical Museum label to the active Pioneer Village campus
 * operated through the City of Corsicana and Navarro County Historical Society.
 */
export const statewideMuseumExpansionWave41Destinations: Destination[] = [
  {
    id: "museum-statewide-wave41-pioneer-village-corsicana",
    brandId: "texasdefined",
    slug: "pioneer-village-corsicana",
    name: "Pioneer Village",
    summary: "Pioneer Village in Corsicana is a walk-through local-history museum campus in Jester Park, preserving Navarro County historic structures, heirlooms and themed collections ranging from frontier life to country music and law-enforcement history.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Corsicana",
    county: "Navarro County",
    coordinates: { lat: 32.094965, lng: -96.475515 },
    hero: museumPlaceholder("Pioneer Village"),
    bestSeason: "Year-round for indoor and outdoor history exhibits; spring and fall are especially comfortable for walking the village grounds.",
    entryNote: "The City of Corsicana currently lists Wednesday-Saturday hours from 10 a.m. to 3 p.m., with a noon-to-1 p.m. lunch closure. Check the city visitor page before a dedicated trip for admission and special-event updates.",
    highlights: [
      "Navarro County historic structures and pioneer artifacts",
      "Lefty Frizzell Museum",
      "Wolf Brand Chili Truck collection",
      "Les Cotten Memorial Peace Officer's Museum",
    ],
    body: [
      "Pioneer Village grew from a Navarro County Historical Society effort begun in the 1950s to preserve the county's surviving historic structures, heirlooms and family artifacts. The museum campus sits in Jester Park near the historic Watering Hole site and presents county history through a cluster of walk-through buildings rather than a single gallery.",
      "Current City of Corsicana visitor information describes Pioneer Village as a collection of historic structures and exhibits spanning frontier-era Navarro County into the twentieth century. Among the best-known collections are the Lefty Frizzell Museum, material associated with Wolf Brand Chili and the Les Cotten Memorial Peace Officer's Museum, giving the site both local-history depth and strong connections to broader Texas cultural history.",
      "The city and Navarro County Historical Society jointly support the site, and current local tourism sources continue to promote it as an active visitor attraction. For TexasDefined, the destination provides a useful county-history anchor for Corsicana and Navarro County while complementing rather than duplicating the nearby Pearce Museum's Civil War and Western-art focus.",
    ],
    officialUrl: "https://cityofcorsicana.com/995/Pioneer-Village",
    managingAuthority: "City of Corsicana Parks & Recreation and Navarro County Historical Society",
    address: "912 W Park Ave, Corsicana, TX 75110",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
