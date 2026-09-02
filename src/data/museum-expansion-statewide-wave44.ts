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
 * Forty-fourth statewide museum wave. This Perryton record consolidates the
 * audit's Museum of the Plains and legacy Ochiltree County Museum wording into
 * the active Museum of the Plains authority destination.
 */
export const statewideMuseumExpansionWave44Destinations: Destination[] = [
  {
    id: "museum-statewide-wave44-museum-of-the-plains",
    brandId: "texasdefined",
    slug: "museum-of-the-plains-perryton",
    name: "Museum of the Plains",
    summary: "Museum of the Plains preserves the archaeology, settlement, agriculture and community history of Perryton and Ochiltree County through more than 10,000 artifacts, nearly 30,000 square feet of exhibits and a four-acre campus of historic buildings.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Perryton",
    county: "Ochiltree County",
    coordinates: { lat: 36.41025, lng: -100.80239 },
    hero: museumPlaceholder("Museum of the Plains"),
    bestSeason: "Year-round for indoor exhibits; spring and fall are especially comfortable for exploring the museum's outdoor historic-building campus and combining a visit with other Texas Panhandle heritage stops.",
    entryNote: "The museum currently publishes Monday-Friday hours from 9 a.m. to 5 p.m. and Saturday hours from 10 a.m. to 5 p.m.; Sunday is closed. Admission is free with donations encouraged. Check the museum's current closure and event calendar before a dedicated trip.",
    highlights: [
      "More than 10,000 regional-history artifacts",
      "1899 railroad depot and five historic buildings",
      "Buried City archaeology and Plains-culture interpretation",
      "Permanent exhibits including Hank the Cowdog and Tornado Alley",
    ],
    body: [
      "Museum of the Plains is the principal heritage museum for Perryton and Ochiltree County, interpreting the northern Texas Panhandle from Indigenous and archaeological history through settlement, transportation, agriculture and modern community life. The institution began in 1975 on the third floor of the Ochiltree County Courthouse and has grown into a substantial regional museum with more than 10,000 donated artifacts.",
      "The current campus began taking shape after property was donated in 1978 and an 1899 railroad depot was moved to the site. Construction on the main museum building began in 1980, followed by a formal grand opening in 1981. Today the museum reports more than 29,850 square feet of exhibit space, five historic buildings and more than four acres, giving visitors both indoor galleries and preserved structures that connect Perryton to the region's railroad and rural history.",
      "The collections extend deeper into the area's past through interpretation of the Buried City archaeological tradition and Plains cultures, alongside projectile points, community artifacts, vehicles and mammoth material. Texas Time Travel places the museum in the Plains Trail Region and identifies it as a Perryton heritage anchor, so TexasDefined consolidates the audit's separate Museum of the Plains and legacy Ochiltree County Museum wording into this one current canonical destination rather than creating competing pages for the same local authority story.",
    ],
    officialUrl: "https://www.museumoftheplains.com/",
    managingAuthority: "Museum of the Plains",
    address: "1200 N Main St, Perryton, TX 79070",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
