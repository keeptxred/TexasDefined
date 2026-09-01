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
 * Nineteenth statewide museum wave. This record closes the Castro County
 * local-history gap with fresh 2026 operating evidence and THC property data.
 */
export const statewideMuseumExpansionWave19Destinations: Destination[] = [
  {
    id: "museum-statewide-wave19-castro-county",
    brandId: "texasdefined",
    slug: "castro-county-historical-museum-dimmitt",
    name: "Castro County Historical Museum",
    summary: "Castro County Historical Museum in Dimmitt preserves High Plains county history in the historic Gilbreath-Cowsert House and associated buildings, with local family collections, agricultural history, nearly 400 veteran photographs and stories, and material connected to the World War II Italian POW camp at Hereford.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Dimmitt",
    county: "Castro County",
    coordinates: { lat: 34.555891, lng: -102.316847 },
    hero: museumPlaceholder("Castro County Historical Museum"),
    bestSeason: "Year-round local-history stop; spring and fall are especially comfortable for combining Dimmitt with High Plains heritage and Camp Hereford history.",
    entryNote: "A February 2026 KFDA profile confirms the museum remains active at 404 Halsell Street. Because regular visitor hours are not consistently published by a current primary source, contact the museum or local tourism office before making a dedicated trip.",
    highlights: ["Gilbreath-Cowsert House", "Nearly 400 Castro County veteran photographs and stories", "Camp Hereford Italian POW history", "Locally donated Castro County collections"],
    body: [
      "Castro County Historical Museum is rooted in a preservation effort that began in the mid-1970s and opened to the public in 1976. The museum's main historic property is the 1909 Gilbreath-Cowsert House, a Recorded Texas Historic Landmark that the museum acquired during its founding period.",
      "The collection is intentionally local. Museum leadership told KFDA in 2026 that virtually everything came from Castro County families, making the site a community archive as much as a visitor attraction. A separate veterans building now includes nearly 400 veteran photographs and stories, uniforms and other military material.",
      "One of the museum's most distinctive connections is to Camp Hereford, the World War II prisoner-of-war camp that held Italian prisoners on the High Plains. The veterans collection includes a former camp barracks, a replica of the POW chapel altar and gifts brought by returning Italian visitors, linking Dimmitt's county history to a much broader wartime story."
    ],
    officialUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=5069002185&fn=print",
    managingAuthority: "Castro County Historical Museum",
    address: "404 W Halsell St, Dimmitt, TX 79027",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
