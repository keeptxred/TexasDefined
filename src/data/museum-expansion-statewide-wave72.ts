import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave73Destinations } from "./museum-expansion-statewide-wave73";
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
 * Seventy-second statewide museum wave. This record adds Whitney Area Museum,
 * the local-history museum in Whitney's former post office building.
 */
export const statewideMuseumExpansionWave72Destinations: Destination[] = [
  {
    id: "museum-statewide-wave72-whitney-area-museum",
    brandId: "texasdefined",
    slug: "whitney-area-museum",
    name: "Whitney Area Museum",
    summary: "Whitney Area Museum preserves the history of Whitney and the Lake Whitney area inside the town's former post office, with community-donated photographs, household artifacts, pioneer material and exhibits on the dam, lake and civic life.",
    category: "historic-sites",
    region: "prairies-lakes",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["central-texas-prairies"],
      countySlugs: ["hill"],
      travelRegionIds: ["prairies-lakes"],
    },
    nearestTown: "Whitney",
    county: "Hill County",
    coordinates: { lat: 31.9520472, lng: -97.321553 },
    hero: museumPlaceholder("Whitney Area Museum"),
    bestSeason: "Spring through fall when the museum's seasonal public openings are most dependable; cooler months are especially comfortable for combining downtown Whitney with Lake Whitney and other Hill County stops.",
    entryNote: "The local tourism directory currently lists the museum at 303 N. Brazos Street but does not publish regular weekly hours. Tour Texas currently lists openings on the second and fourth Saturday from April through October. Call 254-694-6595 before making a dedicated trip, especially outside that seasonal schedule.",
    highlights: [
      "Lake Whitney and Whitney Dam history",
      "Whitney Jail House Door and civic-history artifacts",
      "Pioneer, household and community-donated collections",
      "Former downtown Whitney post office setting",
    ],
    body: [
      "Whitney Area Museum is a community-scale history museum whose strongest material comes from the town and lake region immediately around it. The museum occupies Whitney's former post office on North Brazos Street, turning a reused civic building into a repository for donated objects, photographs and stories connected to the people who built the community.",
      "Lake Whitney is one of the collection's defining themes. Exhibits connect the modern recreation economy to the construction of Whitney Dam and the changes that the reservoir brought to nearby communities, roads and everyday life. Other displays preserve the Whitney Jail House Door, pioneer-era objects, dolls, sewing machines and local institutional memorabilia, giving the museum a deliberately broad record of ordinary community history.",
      "The museum remains active in Whitney's current civic life rather than functioning only as a static collection. Museum representatives participated in the City Council's 2026 America250 planning, discussing local-history collection and museum programming tied to the commemoration. For TexasDefined, the museum therefore serves as Whitney's local-history anchor while Lake Whitney State Park and county pages cover the area's outdoor and geographic story.",
    ],
    officialUrl: "https://discoverlakewhitney.com/places/whitney-area-museum",
    managingAuthority: "Whitney Area Museum, Inc.",
    address: "303 N Brazos St, Whitney, TX 76692",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave73Destinations,
];
