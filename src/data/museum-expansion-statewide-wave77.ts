import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-19";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Seventy-seventh statewide museum wave. This record adds the City-operated
 * Mineola Historical Museum as a separate Wood County history destination.
 * It does not substitute for the audit's unsupported "Wood County Historical
 * Museum" identity.
 */
export const statewideMuseumExpansionWave77Destinations: Destination[] = [
  {
    id: "museum-statewide-wave77-mineola-historical-museum",
    brandId: "texasdefined",
    slug: "mineola-historical-museum",
    name: "Mineola Historical Museum",
    summary: "Mineola Historical Museum fills the city's 1937 former post office with more than thirty exhibits on railroad-era growth, schools, military service, entertainment, medicine, agriculture and everyday community life, including a restored New Deal-era postal mural.",
    category: "historic-sites",
    region: "piney-woods",
    geography: {
      primaryRegionId: "east-texas",
      subregionIds: ["piney-woods"],
      countySlugs: ["wood"],
      travelRegionIds: ["piney-woods"],
    },
    nearestTown: "Mineola",
    county: "Wood County",
    coordinates: { lat: 32.66389, lng: -95.4875 },
    hero: museumPlaceholder("Mineola Historical Museum"),
    bestSeason: "Year-round during museum hours; spring and fall are especially comfortable for pairing the museum with Mineola's National Register downtown, Transportation Plaza and a walk through the historic commercial district.",
    entryNote: "The City of Mineola currently lists museum hours Thursday through Saturday from 10 a.m. to 3 p.m. Admission is free with donations appreciated, parking is available behind the building, and group tours can be arranged by request.",
    highlights: [
      "1937 former U.S. post office and Recorded Texas Historic Landmark",
      "Restored Bernard Zakheim New Deal-era postal mural",
      "More than thirty exhibits on Mineola community history",
      "Select Theater, telegraph, schools, military and local-industry displays",
    ],
    body: [
      "Mineola Historical Museum uses one of downtown's most distinctive civic buildings to tell the city's story. The Moderne-style former post office was completed in 1937 and remained in federal postal use until 1998. The City of Mineola acquired it for a history museum, and the building received a Recorded Texas Historic Landmark designation in 1999. After years of fundraising, collecting and volunteer work, the museum opened to the public in 2009, giving the historic district a dedicated place for interpreting the people and institutions that shaped the railroad town.",
      "The exhibits range well beyond postal history. The City describes more than thirty displays across roughly 4,200 square feet, including a Select Theater installation with original equipment, a telegraph office, post-office boxes, doctor and dentist office recreations, Mineola school memorabilia, material on segregated schools, military collections and the community's watermelon tradition. A major feature is the restored version of Bernard Zakheim's 1938 mural, The Horse and Buggy Give Way to Modern Methods of Mail Transportation, linking the museum's building directly to New Deal public-art history.",
      "For TexasDefined, Mineola Historical Museum is a strong local-history counterpart to the city's railroad depot and nature-preserve coverage and to Winnsboro's depot museum elsewhere in Wood County. It also resolves an authority gap exposed by the original statewide audit without inventing a nonexistent Texas institution: Wood County's Historical Commission lists Mineola Historical Museum as an active museum, while the audit's generic 'Wood County Historical Museum' does not match a current Texas visitor destination. The Mineola museum therefore stands on its own current identity and operating authority.",
    ],
    officialUrl: "https://www.mineola.com/page/historical-museum/",
    managingAuthority: "City of Mineola / Mineola Historical Museum Advisory Board",
    address: "114 N Pacific St, Mineola, TX 75773",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
