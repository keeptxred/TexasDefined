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
 * Twenty-first statewide museum wave. This group closes two additional South
 * Plains county-history gaps using current visitor evidence and exact museum
 * geospatial records. Crosby County's current repair closure is explicit.
 */
export const statewideMuseumExpansionWave21Destinations: Destination[] = [
  {
    id: "museum-statewide-wave21-garza-county",
    brandId: "texasdefined",
    slug: "garza-county-historical-museum-post",
    name: "Garza County Historical Museum",
    summary: "Garza County Historical Museum in Post occupies the former 1912 Post Sanitarium and interprets the county from C. W. Post's model-town experiment through ranching, farming, Native American heritage, military history and everyday life on the Llano Estacado.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Post",
    county: "Garza County",
    coordinates: { lat: 33.19205, lng: -101.38391 },
    hero: museumPlaceholder("Garza County Historical Museum"),
    bestSeason: "Year-round local-history stop; spring and fall are especially comfortable for pairing the museum with downtown Post, Caprock country and nearby South Plains road trips.",
    entryNote: "Current Texas museum and regional visitor listings place the museum at 119 North Avenue North and continue to list public access. Because community-museum hours vary by source, confirm the day's schedule before making a special trip.",
    highlights: ["Historic 1912 Post Sanitarium", "C. W. Post and model-town history", "Comanche and pioneer collections", "Garza County ranching, farming and military heritage"],
    body: [
      "The Garza County Historical Museum is unusually well matched to the town it interprets. Its home in the former Post Sanitarium ties the collection directly to C. W. Post's planned-community experiment, while surviving hospital spaces and medical history add another layer to the building itself.",
      "More than twenty rooms broaden the story beyond the town founder. Collections document early settlers, ranching and agriculture, Native American history, military service and changing community life across Garza County, with personal Post material helping explain how the cereal magnate's ideas shaped the city that still bears his name.",
      "For TexasDefined, this destination gives Post and Garza County a dedicated county-history authority page that can cross-link the courthouse square, C. W. Post sites, Caprock travel, Quanah Parker Trail material and regional road trips without duplicating the city's separate art and heritage attractions."
    ],
    officialUrl: "https://www.texasmuseums.org/member-directory/garza-county-historical-museum",
    managingAuthority: "Garza County Historical Museum",
    address: "119 North Avenue North, Post, TX 79356",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave21-crosby-county",
    brandId: "texasdefined",
    slug: "crosby-county-pioneer-memorial-museum-crosbyton",
    name: "Crosby County Pioneer Memorial Museum",
    summary: "Crosby County Pioneer Memorial Museum in Crosbyton preserves more than 45,000 artifacts spanning Comanche history, Blanco Canyon, pioneer settlement, farming, ranching and South Plains community life, with a replica of the historic Hank Smith house at the center of the collection.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Crosbyton",
    county: "Crosby County",
    coordinates: { lat: 33.6601, lng: -101.2379 },
    hero: museumPlaceholder("Crosby County Pioneer Memorial Museum"),
    bestSeason: "Plan around reopening rather than season; once repairs are complete, spring and fall are ideal for combining Crosbyton, Blanco Canyon and other South Plains heritage stops.",
    entryNote: "TEMPORARILY CLOSED FOR REPAIRS: both the museum's current website and Visit Crosbyton say the facility is closed for building repairs. Call (806) 675-2331 or check the official museum site for reopening updates before planning a visit.",
    highlights: ["More than 45,000 artifacts", "Hank Smith house replica", "Comanche and Blanco Canyon history", "South Plains farming and ranching collections"],
    body: [
      "The Crosby County Pioneer Memorial Museum began as a local effort to preserve the people and material culture of the Llano Estacado and has grown into one of the region's most substantial county collections. The museum's replica of the Hank Smith house recalls the first permanent home built in nearby Blanco Canyon and gives the institution a physical link to early settlement.",
      "Its collections reach much farther back and wider than pioneer domestic life. Native American artifacts and interpretation address Comanche history and the Battle of Blanco Canyon, while later galleries document ranching, agriculture, transportation and the families who built Crosby County communities.",
      "The museum is currently closed for repairs, so TexasDefined preserves one stable canonical destination while putting the closure ahead of historical operating hours. When the museum reopens, the same page can immediately reconnect Crosbyton, Blanco Canyon, Quanah Parker history and South Plains road-trip content without creating a replacement URL."
    ],
    officialUrl: "https://ccpmmuseum.com/",
    managingAuthority: "Crosby County Pioneer Memorial Museum",
    address: "101 W Main St, Crosbyton, TX 79322",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
