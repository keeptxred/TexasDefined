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
 * Fortieth statewide museum wave. This Panhandle record reconciles the audit's
 * legacy Moore County Historical Museum name to the current Window on the
 * Plains Museum identity.
 */
export const statewideMuseumExpansionWave40Destinations: Destination[] = [
  {
    id: "museum-statewide-wave40-window-on-the-plains-museum",
    brandId: "texasdefined",
    slug: "window-on-the-plains-museum",
    name: "Window on the Plains Museum",
    summary: "Window on the Plains Museum preserves Moore County and Texas Panhandle history in Dumas through ranching, farming, industry, family-life and wildlife exhibits, period environments and a dedicated research and archives center.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Dumas",
    county: "Moore County",
    coordinates: { lat: 35.8434, lng: -101.974 },
    hero: museumPlaceholder("Window on the Plains Museum"),
    bestSeason: "Year-round indoor history stop; spring and fall are especially comfortable for combining the museum with Dumas and other Panhandle heritage destinations.",
    entryNote: "The museum currently publishes Monday-Saturday hours from 10 a.m. to 5 p.m. Admission is free. Verify holiday or special-event changes before making a dedicated trip.",
    highlights: [
      "Moore County ranching and farming history",
      "Period rooms and historic community settings",
      "Industry, business and family-life exhibits",
      "Research and archives center",
    ],
    body: [
      "Window on the Plains Museum serves as a principal local-history institution for Dumas and Moore County. Its permanent displays cover farming and ranching, industry and business, family life, wildlife and the everyday material culture of the northern Texas Panhandle, with reconstructed and period environments that help place collections into context.",
      "The institution began in 1976 as Moore County Historical Museum, originally housed in the ballroom of a local landmark hotel. In 2001 the museum moved to its permanent home at 1820 South Dumas Avenue and adopted the Window on the Plains Museum name, preserving continuity with the older museum while giving the current destination a distinct public identity.",
      "The museum also maintains a research and archives center and works alongside The Art Center next door as a cultural hub for Moore County. That combination of collections, archival resources and community programming makes Window on the Plains a strong TexasDefined authority anchor for Dumas, Moore County and broader Panhandle discovery rather than a thin attraction listing.",
    ],
    officialUrl: "https://www.dumasmuseumandartcenter.org/museum.html",
    managingAuthority: "Window on the Plains Museum",
    address: "1820 South Dumas Avenue, Dumas, TX 79029",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
