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
 * Forty-fifth statewide museum wave. This Dumas record consolidates the audit's
 * legacy Moore County Historical Museum wording into the active Window on the
 * Plains Museum destination.
 */
export const statewideMuseumExpansionWave45Destinations: Destination[] = [
  {
    id: "museum-statewide-wave45-window-on-the-plains-museum",
    brandId: "texasdefined",
    slug: "window-on-the-plains-museum-dumas",
    name: "Window on the Plains Museum",
    summary: "Window on the Plains Museum preserves the history of Dumas, Moore County and the Texas Panhandle through exhibits on farming, ranching, business, industry, family life and regional wildlife, supported by a research and archives center.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Dumas",
    county: "Moore County",
    coordinates: { lat: 35.8434, lng: -101.974 },
    hero: museumPlaceholder("Window on the Plains Museum"),
    bestSeason: "Year-round for indoor exhibits; spring and fall are especially comfortable for pairing a museum visit with other Texas Panhandle heritage stops.",
    entryNote: "The museum currently publishes Monday-Saturday hours from 10 a.m. to 5 p.m. Admission is free. Check the museum's current site before a dedicated trip for holiday closures, special programs or temporary schedule changes.",
    highlights: [
      "Moore County farming and ranching history",
      "Business, industry and family-life exhibits",
      "Research and archives center",
      "Texas Panhandle community and wildlife collections",
    ],
    body: [
      "Window on the Plains Museum is the current public-facing successor to the Moore County Historical Museum named in older directories and audit lists. The institution was founded in 1976 as the Moore County Historical Museum and originally operated in the ballroom of a historic hotel before moving to its permanent South Dumas Avenue location in 2001, when it was officially renamed Window on the Plains Museum.",
      "The museum's exhibits interpret the development of Dumas and Moore County through farming and ranching, local business and industry, family life, wildlife and community culture. A research and archives center extends the museum beyond display galleries by preserving local historical materials for visitors, students and researchers who want to explore the area's history in greater depth.",
      "Because the museum's own current site identifies Window on the Plains Museum as the active institution and explicitly documents the former Moore County Historical Museum name, TexasDefined treats these as one authority destination rather than creating duplicate pages. The current museum remains active at 1820 South Dumas Avenue with free admission and regular six-day-a-week visitor hours.",
    ],
    officialUrl: "https://www.dumasmuseumandartcenter.org/museumhome.html",
    managingAuthority: "Window on the Plains Museum",
    address: "1820 S Dumas Ave, Dumas, TX 79029",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
