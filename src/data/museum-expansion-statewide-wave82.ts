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
 * Eighty-second statewide museum wave. This record gives Anna's restored
 * railroad depot and local-history museum its own canonical destination.
 */
export const statewideMuseumExpansionWave82Destinations: Destination[] = [
  {
    id: "museum-statewide-wave82-anna-depot",
    brandId: "texasdefined",
    slug: "anna-depot-and-museum",
    name: "Anna Depot and Museum",
    summary: "Anna Depot and Museum preserves the Collin County town's railroad origins inside its restored 1885 Houston & Texas Central depot, with local-history exhibits and educational resources in city-owned Sherley Heritage Park.",
    category: "historic-sites",
    region: "prairies-lakes",
    geography: {
      primaryRegionId: "north-texas",
      subregionIds: ["dallas-fort-worth-metroplex"],
      metroId: "dallas-fort-worth",
      countySlugs: ["collin"],
      travelRegionIds: ["prairies-lakes"],
    },
    nearestTown: "Anna",
    county: "Collin County",
    coordinates: { lat: 33.34872, lng: -96.54833 },
    hero: museumPlaceholder("Anna Depot and Museum"),
    bestSeason: "Year-round during the museum's twice-monthly public openings; spring and fall are especially comfortable for combining the depot with Sherley Heritage Park and a walk through Anna's historic core.",
    entryNote: "The Anna Area Historical Preservation Society currently lists free public hours on the second and fourth Saturday of each month from 10 a.m. to 2 p.m. Tours outside those regular hours can be arranged by phone or email, so confirm access before making a dedicated trip.",
    highlights: [
      "Restored 1885 Houston & Texas Central railroad depot",
      "Anna railroad and community-history exhibits",
      "Sherley Heritage Park setting owned by the City of Anna",
      "Local-history collections and educational resources maintained by the Anna Area Historical Preservation Society",
    ],
    body: [
      "Anna's development is closely tied to the railroad. The Houston & Texas Central Railway reached the area in the 1870s, and the community grew around the rail connection before Anna was formally platted in the 1880s. The depot building was constructed in 1885 and served the town through the period when rail freight, passenger traffic and communications helped connect small North Texas communities to Dallas, Denison and markets beyond.",
      "The surviving depot nearly disappeared from public view after railroad use ended. The Anna Area Historical Preservation Society rescued the building in 2007, moved it from a private property where it had been used as a barn, and later relocated it to its permanent home in Sherley Heritage Park in May 2018. Restoration culminated in the depot's public dedication in 2019, turning the historic structure into a museum and educational center rather than leaving it as an isolated architectural artifact.",
      "Today the museum interprets Anna and the surrounding area through exhibits, collected objects and historical research maintained by the local preservation society. The City of Anna owns both the depot and Sherley Heritage Park, while the Anna Area Historical Preservation Society operates the museum under a facility-use agreement. That partnership gives TexasDefined a clear current authority destination for Anna's railroad and community history and complements the site's broader Collin County and Dallas-Fort Worth discovery coverage.",
    ],
    officialUrl: "https://www.annatxhistory.com/the-depot",
    managingAuthority: "Anna Area Historical Preservation Society",
    address: "101 S Sherley Rd, Anna, TX 75409",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
