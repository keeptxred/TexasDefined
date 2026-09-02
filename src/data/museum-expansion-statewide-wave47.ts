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
 * Forty-seventh statewide museum wave. This record adds the current Museum of
 * South Texas History in Edinburg and preserves its Hidalgo County Historical
 * Museum lineage without creating a duplicate authority destination.
 */
export const statewideMuseumExpansionWave47Destinations: Destination[] = [
  {
    id: "museum-statewide-wave47-museum-of-south-texas-history",
    brandId: "texasdefined",
    slug: "museum-of-south-texas-history-edinburg",
    name: "Museum of South Texas History",
    summary: "Museum of South Texas History in Edinburg preserves and interprets the borderland heritage of South Texas and northeastern Mexico through archaeology, ranching, river commerce, railroads, agriculture, military history and Rio Grande Valley community life.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Edinburg",
    county: "Hidalgo County",
    coordinates: { lat: 26.30284, lng: -98.16138 },
    hero: museumPlaceholder("Museum of South Texas History"),
    bestSeason: "Year-round for indoor exhibits; fall through spring is especially comfortable for combining the museum with other Rio Grande Valley heritage destinations.",
    entryNote: "The museum currently publishes Tuesday-Saturday hours from 10 a.m. to 5 p.m. and Sunday hours from 1 to 5 p.m.; Monday is closed and holiday hours can vary. Check the museum's current visitor information before a dedicated trip for admission prices, special programs or temporary schedule changes.",
    highlights: [
      "Rio Grande Legacy permanent exhibition",
      "1910 Hidalgo County Jail historic core",
      "South Texas and northeastern Mexico borderland history",
      "Margaret H. McAllen Memorial Archives and regional collections",
    ],
    body: [
      "Museum of South Texas History occupies a full city block in downtown Edinburg and interprets the long, connected history of the Rio Grande Valley, South Texas and northeastern Mexico. Its roots reach back to the Hidalgo County Historical Museum, which opened to the public in 1970 inside the former 1910 Hidalgo County Jail after the institution was organized in the late 1960s.",
      "The museum expanded over subsequent decades and adopted the Museum of South Texas History name after a major early-2000s expansion better matched its regional mission. Its Rio Grande Legacy exhibitions move from geology and Indigenous history through Spanish colonial settlement, the Texas and Mexican republic eras, steamboat commerce, Civil War border trade, cattle ranching, railroads, irrigated agriculture, the Mexican Revolution, World War II and twentieth-century Valley life.",
      "The preserved 1910 jail remains part of the museum complex and is recognized as a Recorded Texas Historic Landmark. Texas Time Travel places the museum in the Tropical Trail Region and highlights its broad treatment of South Texas and northern Mexico as an interconnected cultural landscape. TexasDefined therefore treats the current Museum of South Texas History as the canonical authority destination while preserving its earlier Hidalgo County Historical Museum lineage in the page narrative rather than creating a second competing record.",
    ],
    officialUrl: "https://mosthistory.org/",
    managingAuthority: "Museum of South Texas History",
    address: "200 N Closner Blvd, Edinburg, TX 78541",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
