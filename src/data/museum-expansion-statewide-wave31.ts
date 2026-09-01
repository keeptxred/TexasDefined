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
 * Thirty-first statewide museum wave. This source-clean Gulf Coast record
 * reconciles the audit's Wharton County Historical Museum entry to the active
 * museum and its current visitor information.
 */
export const statewideMuseumExpansionWave31Destinations: Destination[] = [
  {
    id: "museum-statewide-wave31-wharton-county-historical",
    brandId: "texasdefined",
    slug: "wharton-county-historical-museum",
    name: "Wharton County Historical Museum",
    summary: "Wharton County Historical Museum preserves the county's local history through artifacts, photographs and exhibits spanning settlement, agriculture, ranching, commerce, sulfur mining, community life and notable residents, with additional historic material displayed across its North Richmond Road campus.",
    category: "historic-sites",
    region: "gulf-coast",
    nearestTown: "Wharton",
    county: "Wharton County",
    coordinates: { lat: 29.33775, lng: -96.06996 },
    hero: museumPlaceholder("Wharton County Historical Museum"),
    bestSeason: "Year-round indoor history stop; fall through spring is especially comfortable for combining the museum with downtown Wharton, the courthouse square and other Colorado River-area heritage stops.",
    entryNote: "The museum currently publishes Monday-Friday hours from 9 a.m. to 4 p.m. and free admission. Verify holiday or special-event changes before making a dedicated trip.",
    highlights: [
      "Wharton County local-history collections",
      "Ranching, agriculture and sulfur-industry exhibits",
      "Historic photographs and community artifacts",
      "Dan Rather birthplace and regional heritage displays",
    ],
    body: [
      "Wharton County Historical Museum serves as a countywide repository for the people, industries and communities that shaped this part of the Texas Gulf Coast. Its collections interpret local settlement and civic life alongside ranching, agriculture, medicine, commerce, archaeology and the sulfur industry that transformed parts of Wharton County during the twentieth century.",
      "The museum grew from local preservation work that began in the late 1970s and has occupied its North Richmond Road campus since 1990. The site incorporates buildings and collections associated with Marshall and Lillie Johnson, while the broader museum grounds also preserve the small house identified locally as the birthplace of Wharton native and longtime television journalist Dan Rather.",
      "The museum continues to operate with its own executive director and governing board, hosts community programs and maintains close ties with the Wharton County Historical Commission. For TexasDefined, the canonical destination gives Wharton County history a stable discovery point that can connect county pages, downtown Wharton, historic markers, the co-located 20th Century Technology Museum and other regional heritage destinations without relying on a thin list entry.",
    ],
    officialUrl: "https://www.whartoncountymuseum.org/",
    managingAuthority: "Wharton County Historical Museum",
    address: "3615 N Richmond Rd, Wharton, TX 77488",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
