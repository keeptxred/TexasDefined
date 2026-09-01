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
 * Thirty-ninth statewide museum wave. This Panhandle record reconciles the
 * audit's stale Lipscomb County Historical Museum name to the current Wolf
 * Creek Heritage Museum identity.
 */
export const statewideMuseumExpansionWave39Destinations: Destination[] = [
  {
    id: "museum-statewide-wave39-wolf-creek-heritage-museum",
    brandId: "texasdefined",
    slug: "wolf-creek-heritage-museum",
    name: "Wolf Creek Heritage Museum",
    summary: "Wolf Creek Heritage Museum preserves the history of Lipscomb County and the northeastern Texas Panhandle through pioneer, ranching, community, Native American and Red River War collections, along with local archives and public history programs.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Lipscomb",
    county: "Lipscomb County",
    coordinates: { lat: 36.2338, lng: -100.27543 },
    hero: museumPlaceholder("Wolf Creek Heritage Museum"),
    bestSeason: "Year-round indoor history stop; spring and fall are especially comfortable for combining the museum with the Lipscomb County Courthouse and other northeastern Panhandle heritage sites.",
    entryNote: "Current heritage-directory sources list weekday museum access and special hours by request, but operating schedules can change in this small volunteer-supported institution. Confirm current hours with the museum at 806-852-2123 before making a dedicated trip.",
    highlights: [
      "Lipscomb County pioneer and ranching history",
      "Red River War and buffalo-hunter interpretation",
      "Native American and local-community collections",
      "County archives, photographs and public history programs",
    ],
    body: [
      "Wolf Creek Heritage Museum serves as a county-history authority for Lipscomb County, preserving material from the people and communities that developed along the northeastern edge of the Texas Panhandle. Its collections document early settlement, ranching, immigration, community life and the natural and cultural conditions that shaped this sparsely populated border county.",
      "The museum also interprets nationally significant frontier history tied to the Red River War and the buffalo-hunting era. Texas Historical Commission material describes exhibits that include tools used in nineteenth-century hide camps and objects connected to Native American and settler history, giving visitors a local lens on events that transformed the southern Plains during the 1870s.",
      "The institution grew from a county preservation effort begun in the early 1980s and developed into the museum now operating along State Highway 305 in Lipscomb. The Portal to Texas History identifies Wolf Creek Heritage Museum as an active archival partner preserving photographs, cemetery records and published county histories, while the museum's continuing community programs make it a strong TexasDefined anchor for Lipscomb, the county courthouse and nearby Panhandle heritage destinations.",
    ],
    officialUrl: "http://www.wolfcreekheritagemuseum.com/",
    managingAuthority: "Lipscomb County Historical Commission and Wolf Creek Heritage Museum",
    address: "13310 State Highway 305, Lipscomb, TX 79056",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
