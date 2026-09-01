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
 * Thirty-third statewide museum wave. This Hill Country record adds San Saba
 * County's long-running community museum using current visitor information from
 * the museum and organizational history from the county historical commission.
 */
export const statewideMuseumExpansionWave33Destinations: Destination[] = [
  {
    id: "museum-statewide-wave33-san-saba-county-historical-museum",
    brandId: "texasdefined",
    slug: "san-saba-county-historical-museum",
    name: "San Saba County Historical Museum",
    summary: "San Saba County Historical Museum preserves the county's Native American, settlement, ranching, military and pecan-industry history in a community museum at Mill Pond Park, with exhibits built around the people and material culture that shaped the San Saba River country.",
    category: "historic-sites",
    region: "hill-country",
    nearestTown: "San Saba",
    county: "San Saba County",
    coordinates: { lat: 31.19406, lng: -98.71192 },
    hero: museumPlaceholder("San Saba County Historical Museum"),
    bestSeason: "April through October during the museum's regular visitor season; spring and fall are especially comfortable for combining the museum with Mill Pond Park and downtown San Saba.",
    entryNote: "The museum currently publishes regular April-October hours on Saturday and Sunday from 1:30 to 4 p.m. Tours can also be arranged through the museum. Verify seasonal or special-event changes before making a dedicated trip.",
    highlights: [
      "San Saba County settlement and community history",
      "Native American and frontier-era interpretation",
      "Texas pecan-industry heritage",
      "Community artifacts and rotating museum events",
    ],
    body: [
      "San Saba County Historical Museum tells the county's story from the San Saba River country through settlement, ranching, agriculture and the growth of local communities. Its current visitor material emphasizes both the area's Native American history and the experiences of later settlers who adapted to a difficult environment and built lasting institutions across the county.",
      "The museum is also an important local-history institution in its own right. The San Saba County Historical Commission traces the museum effort to the county historical program created in the early 1960s. A county museum was established in 1964, moved to Mill Pond Park in 1965 and expanded over time as the supporting historical society evolved into the San Saba County Historical Museum Foundation, Inc.",
      "Collections and exhibits connect the county's broad history with subjects that remain distinctive to San Saba, including pecan cultivation and the local legacy of growers who helped make the area nationally associated with the crop. The museum's park setting also makes it a practical authority anchor for linking downtown San Saba, county historical markers, nearby civic-history sites and other Hill Country destinations without treating the museum as a bare directory listing.",
    ],
    officialUrl: "https://www.sansabamuseum.org/",
    managingAuthority: "San Saba County Historical Museum Foundation, Inc.",
    address: "271 S. Thomas Stewart Dr., San Saba, TX 76877",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
