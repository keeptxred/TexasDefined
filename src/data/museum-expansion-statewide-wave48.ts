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
 * Forty-eighth statewide museum wave. This Victoria record adds the active
 * Victoria College museum that interprets the multicultural history and
 * archaeology of the Texas Coastal Bend.
 */
export const statewideMuseumExpansionWave48Destinations: Destination[] = [
  {
    id: "museum-statewide-wave48-museum-of-the-coastal-bend",
    brandId: "texasdefined",
    slug: "museum-of-the-coastal-bend-victoria",
    name: "Museum of the Coastal Bend",
    summary: "Museum of the Coastal Bend at Victoria College interprets more than 13,000 years of mid-coastal Texas history through archaeology, Indigenous cultures, colonial encounters, ranching, regional settlement and artifacts tied to La Salle's Fort St. Louis and the ship La Belle.",
    category: "historic-sites",
    region: "gulf-coast",
    nearestTown: "Victoria",
    county: "Victoria County",
    coordinates: { lat: 28.81489, lng: -96.98243 },
    hero: museumPlaceholder("Museum of the Coastal Bend"),
    bestSeason: "Year-round for indoor exhibits; fall through spring is especially comfortable for combining the museum with Victoria and other Coastal Bend heritage stops.",
    entryNote: "The museum currently publishes Tuesday-Saturday hours from 10 a.m. to 4 p.m. and closes for major holidays. Admission is pay-what-you-want, and free visitor parking is available on the Victoria College campus. Check current museum information before a dedicated trip for special programs or temporary schedule changes.",
    highlights: [
      "More than 13,000 years of Coastal Bend history",
      "French cannons excavated from Fort St. Louis",
      "La Salle and La Belle archaeology",
      "Regional ranching, Indigenous and colonial heritage",
    ],
    body: [
      "Museum of the Coastal Bend is Victoria College's regional history and archaeology museum, created to collect, preserve, exhibit and interpret the multicultural heritage of mid-coastal Texas. Opened in 2003, the museum gives visitors a long view of the region, beginning thousands of years before European colonization and continuing through the cultural, economic and political changes that shaped modern South Texas and the Gulf Coast.",
      "The permanent galleries emphasize archaeology and material culture, including Indigenous lifeways, Spanish and Mexican colonial history, ranching and settlement. Among the museum's signature objects are French cannons recovered from the Fort St. Louis archaeological site and artifacts connected to René-Robert Cavelier, Sieur de La Salle, and the ship La Belle, tying Victoria-area interpretation to one of the most consequential early European episodes on the Texas coast.",
      "Texas Time Travel places the museum in the Independence Trail Region, while Victoria College operates the museum directly from its campus on East Red River Street. The museum's current visitor model is unusually accessible: regular Tuesday-through-Saturday hours, free campus parking and pay-what-you-want admission. TexasDefined treats Museum of the Coastal Bend as a standalone current authority destination for Victoria County and the surrounding Coastal Bend rather than folding it into a generic Victoria history page.",
    ],
    officialUrl: "https://mcb.victoriacollege.edu/",
    managingAuthority: "Victoria College",
    address: "2200 E Red River St, Victoria, TX 77901",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
