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
 * Thirty-fifth statewide museum wave. This Panhandle record uses the museum's
 * current Archives and Museum branding rather than the older audit-list name.
 */
export const statewideMuseumExpansionWave35Destinations: Destination[] = [
  {
    id: "museum-statewide-wave35-swisher-county-archives-and-museum",
    brandId: "texasdefined",
    slug: "swisher-county-archives-and-museum",
    name: "Swisher County Archives and Museum",
    summary: "Swisher County Archives and Museum preserves the people, places and material history of Tulia and Swisher County, pairing museum exhibits with archival resources in the Swisher Memorial Building in the Texas Panhandle.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Tulia",
    county: "Swisher County",
    coordinates: { lat: 34.53555, lng: -101.76555 },
    hero: museumPlaceholder("Swisher County Archives and Museum"),
    bestSeason: "Year-round indoor history stop; spring and fall are especially comfortable for combining the museum with Tulia's courthouse square and other Panhandle heritage sites.",
    entryNote: "The museum currently publishes Monday-Friday hours from 9 a.m. to noon and 1 to 4 p.m., with other times available by appointment. Verify holiday or special-event changes before making a dedicated trip.",
    highlights: [
      "Swisher County archival and family-history resources",
      "Panhandle settlement and ranching history",
      "Tulia and county community exhibits",
      "JA Ranch and early-county history context",
    ],
    body: [
      "Swisher County Archives and Museum serves as a local authority for the history of Tulia, Happy, Kress, Vigo Park and the surrounding county. Its current historical material traces the area's open-plains environment, ranching era, county organization and the growth of Tulia around its courthouse square, giving visitors a county-scale story rather than an isolated collection of objects.",
      "The museum's interpretation reaches into the ranching and settlement history that shaped this part of the Panhandle. Its county narrative discusses the expansion of the JA Ranch into Swisher County in the 1880s, early settlement, the county's organization in 1890 and the development of communities that endured drought, economic change and the major events of the twentieth century.",
      "The institution operates under the Swisher County Archives and Museum Association, whose stated mission is to maintain and preserve the history of Swisher County, its people and its lands. Located in the Swisher Memorial Building at 127 South West Second Street, the museum also provides an archival dimension that makes it useful for deeper local research and for linking TexasDefined readers to Tulia, county landmarks and other Panhandle heritage destinations.",
    ],
    officialUrl: "https://www.swishercountymuseum.org/",
    managingAuthority: "Swisher County Archives and Museum Association",
    address: "127 South West Second Street, Tulia, TX 79088",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
