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
 * Thirty-seventh statewide museum wave. This Panhandle record adds Pampa's
 * White Deer Land Museum using the institution's current visitor information.
 */
export const statewideMuseumExpansionWave37Destinations: Destination[] = [
  {
    id: "museum-statewide-wave37-white-deer-land-museum",
    brandId: "texasdefined",
    slug: "white-deer-land-museum",
    name: "White Deer Land Museum",
    summary: "White Deer Land Museum preserves the history of Gray County, Pampa and the White Deer Land Company in the company's restored 1916 office and adjoining museum buildings, with exhibits spanning early inhabitants, ranching, settlement and community growth.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Pampa",
    county: "Gray County",
    coordinates: { lat: 35.53504, lng: -100.96098 },
    hero: museumPlaceholder("White Deer Land Museum"),
    bestSeason: "Year-round indoor history stop; spring and fall are especially comfortable for combining the museum with downtown Pampa and other Plains Trail heritage sites.",
    entryNote: "The museum's current visitor page lists the complex at 112 South Cuyler Street and free admission. Published hours can vary across current visitor sources, so verify the museum's current schedule before making a dedicated trip.",
    highlights: [
      "Restored 1916 White Deer Land Company office",
      "Gray County and Pampa history",
      "Ranching, settlement and community collections",
      "White Deer Land Company heritage",
    ],
    body: [
      "White Deer Land Museum interprets Gray County through the history of the people, businesses and communities that developed across this part of the Texas Panhandle. Its permanent setting is especially significant: the museum occupies the restored 1916 office of the White Deer Land Company, an organization closely tied to the settlement and development of Pampa and surrounding lands.",
      "The museum traces its own public history to 1970, when the former land-company office was dedicated for museum use after years of local preservation work. Collections and exhibits reach from the area's earliest inhabitants through ranching, settlement and twentieth-century community life, helping connect individual artifacts to a broader county story rather than presenting them as an isolated collection.",
      "The institution's current mission is to preserve and interpret the history of Gray County and the White Deer Land Company. Its downtown location and multi-building visitor complex make it a useful TexasDefined authority anchor for Pampa, Gray County and the wider Plains Trail region, with natural connections to local architecture, ranching history and other Panhandle heritage destinations.",
    ],
    officialUrl: "https://whitedeerlandmuseum.org/",
    managingAuthority: "White Deer Land Museum Foundation",
    address: "112 South Cuyler Street, Pampa, TX 79065",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
