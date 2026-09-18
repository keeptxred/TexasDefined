import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave72Destinations } from "./museum-expansion-statewide-wave72";
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
 * Seventy-first statewide museum wave. This record adds the Wilbarger County
 * Historical Museum as a separate local-history destination from Vernon's
 * already-covered Red River Valley Museum.
 */
export const statewideMuseumExpansionWave71Destinations: Destination[] = [
  {
    id: "museum-statewide-wave71-wilbarger-county-historical-museum",
    brandId: "texasdefined",
    slug: "wilbarger-county-historical-museum-vernon",
    name: "Wilbarger County Historical Museum",
    summary: "Wilbarger County Historical Museum in Vernon preserves local business, music, ranching and everyday-life history inside the former county jail, with densely layered collections tied to Vernon, the Waggoner Ranch and the broader Red River country.",
    category: "historic-sites",
    region: "prairies-lakes",
    geography: {
      primaryRegionId: "north-texas",
      subregionIds: ["north-texas-prairies"],
      countySlugs: ["wilbarger"],
      travelRegionIds: ["prairies-lakes"],
    },
    nearestTown: "Vernon",
    county: "Wilbarger County",
    coordinates: { lat: 34.1521, lng: -99.28343 },
    hero: museumPlaceholder("Wilbarger County Historical Museum"),
    bestSeason: "Year-round when the museum is staffed; fall through spring is especially comfortable for combining the museum with downtown Vernon, Doan's Crossing and other Red River Rolling Plains heritage stops.",
    entryNote: "The City of Vernon currently promotes the museum as an active visitor attraction, and current listings show Wednesday through Sunday afternoon hours. Because this is a small locally staffed museum and recent access reports note schedule variability, call ahead before making it the centerpiece of a dedicated trip.",
    highlights: [
      "Former Wilbarger County jail setting",
      "Vernon business and community memorabilia",
      "Roy Orbison and local-music history",
      "Waggoner Ranch and Wilbarger County heritage",
    ],
    body: [
      "Wilbarger County Historical Museum gives Vernon a highly local counterpoint to the larger Red River Valley Museum. Its collection focuses on the people, businesses, music, ranching and everyday objects that shaped Vernon and the surrounding county, preserving material that can be too specific or too personal for a broader regional institution.",
      "The building adds another historical layer. The museum occupies Vernon's former county jail complex on Cumberland Street, allowing the setting itself to carry part of the story. Inside, local-business artifacts, community memorabilia and material connected to Vernon musicians such as Roy Orbison sit alongside county-history displays and Waggoner Ranch interpretation, creating a deliberately dense record of local life rather than a minimalist gallery experience.",
      "The museum is also still part of Vernon's active tourism infrastructure. The City's tourism site currently promotes it to visitors, and the 2026 Tourism Advisory Board continued funding museum operations and research-room work. For TexasDefined, that makes this a distinct canonical destination rather than a duplicate of the Red River Valley Museum: one is an intimate city-and-county collection in a historic jail, while the other is a larger regional museum with science, art and ranching galleries.",
    ],
    officialUrl: "https://www.visitvernontx.com/about/",
    managingAuthority: "Wilbarger County Historical Museum",
    address: "1826 Cumberland St, Vernon, TX 76384",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave72Destinations,
];
