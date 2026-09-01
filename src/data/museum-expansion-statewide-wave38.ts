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
 * Thirty-eighth statewide museum wave. This Panhandle record adds Dalhart's
 * XIT Museum using the museum's current visitor information and historical
 * association governance.
 */
export const statewideMuseumExpansionWave38Destinations: Destination[] = [
  {
    id: "museum-statewide-wave38-xit-museum",
    brandId: "texasdefined",
    slug: "xit-museum",
    name: "XIT Museum",
    summary: "XIT Museum in Dalhart preserves the history of Dallam and Hartley counties and the enormous XIT Ranch through ranch artifacts, period rooms, railroad and community exhibits, archives and changing displays.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Dalhart",
    county: "Dallam County",
    coordinates: { lat: 36.06126, lng: -102.52285 },
    hero: museumPlaceholder("XIT Museum"),
    bestSeason: "Year-round indoor history stop; spring through fall is especially useful for combining the museum with Dalhart, Rita Blanca Lake and XIT-related heritage sites.",
    entryNote: "The museum currently publishes Tuesday-Saturday hours from 9 a.m. to 5 p.m. Admission is free, with donations appreciated. Verify holiday or special-event changes before making a dedicated trip.",
    highlights: [
      "XIT Ranch artifacts and interpretation",
      "Dallam and Hartley county history",
      "Panhandle railroad and ranching exhibits",
      "Research archives and historic photographic collections",
    ],
    body: [
      "XIT Museum gives Dalhart a dedicated authority center for one of the defining stories of the Texas Panhandle: the XIT Ranch and the communities that grew around its immense former range. Permanent and temporary exhibits interpret ranching, local wildlife, railroads, law enforcement and everyday life in Dallam and Hartley counties, while period rooms help place artifacts in a lived historical setting.",
      "The museum's roots reach back to local XIT Reunion exhibits and preservation work that ultimately led to formation of the Dallam-Hartley Counties Historical Association in 1974. The association established the present XIT Museum, which opened to the public in 1975 in a former automobile-dealership building and later expanded with additional exhibit space and an adjoining building.",
      "Beyond public galleries, the museum maintains research resources that include area newspapers, ranch and business papers, yearbooks, census material and a large photographic archive. Texas Time Travel places XIT Museum in the Plains Trail Region and identifies the Dallam-Hartley County Historical Association as its sponsor, making the museum a strong TexasDefined anchor for Dalhart, the XIT Ranch story and broader Panhandle heritage discovery.",
    ],
    officialUrl: "https://www.xitmuseum.org/",
    managingAuthority: "Dallam-Hartley Counties Historical Association",
    address: "108 East 5th Street, Dalhart, TX 79022",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
