import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave82Destinations } from "./museum-expansion-statewide-wave82";
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
 * Eighty-first statewide museum wave. This record adds Yorktown's active
 * local-history museum in the historic C. Eckhardt & Sons Building.
 */
export const statewideMuseumExpansionWave81Destinations: Destination[] = [
  {
    id: "museum-statewide-wave81-yorktown-historical-museum",
    brandId: "texasdefined",
    slug: "yorktown-historical-museum",
    name: "Yorktown Historical Museum",
    summary: "Yorktown Historical Museum preserves the DeWitt County town's local and family history inside the historic C. Eckhardt & Sons Building, with community collections, indexed photograph albums and a landmark mercantile building that ties the museum directly to Yorktown's nineteenth-century commercial past.",
    category: "historic-sites",
    region: "south-texas",
    geography: {
      primaryRegionId: "south-texas",
      subregionIds: [],
      countySlugs: ["dewitt"],
      travelRegionIds: ["south-texas"],
    },
    nearestTown: "Yorktown",
    county: "DeWitt County",
    coordinates: { lat: 28.98078, lng: -97.50423 },
    hero: museumPlaceholder("Yorktown Historical Museum"),
    bestSeason: "Year-round during the museum's published Friday-through-Sunday schedule; spring and fall are especially comfortable for combining the museum with a walk through historic Yorktown.",
    entryNote: "The Yorktown Chamber of Commerce and EDC currently lists the museum as open Friday from 11 a.m. to 2 p.m., Saturday from 1 to 4 p.m. and Sunday from 2 to 5 p.m., except holidays. Verify current hours before making a dedicated trip.",
    highlights: [
      "Yorktown and DeWitt County local-history collections",
      "Indexed photograph albums available for historical and family research",
      "Historic C. Eckhardt & Sons mercantile building at Main and Eckhardt streets",
      "Recorded Texas Historic Landmark building tied to Yorktown's nineteenth-century commercial history",
    ],
    body: [
      "Yorktown Historical Museum gives the western DeWitt County community a dedicated place for preserving local history rather than folding Yorktown into the larger museum story of nearby Cuero. The current Yorktown Chamber of Commerce and EDC visitor page continues to list the museum as an active attraction and specifically notes its indexed albums of early Yorktown photographs, making the collection useful both to casual visitors and to people researching families, buildings and community history.",
      "The museum's building carries its own authority. The Texas Historical Commission identifies the property at 144 W. Main Street as the C. Eckhardt & Sons Building and records an in-situ historical marker at the museum. The marker says the building was erected in 1876 for the Eckhardt family's mercantile business, whose roots in Yorktown reached back to 1848, and notes features such as unusually thick walls, iron shutters and an elevator. Yorktown's community history page says the restored building now houses the museum and is listed on the National Register of Historic Places.",
      "For TexasDefined, Yorktown Historical Museum adds a distinct authority stop to the existing DeWitt County coverage without duplicating Cuero's Chisholm Trail Heritage Museum or other county institutions. Its value is local scale: the exhibits, photograph albums and preserved commercial building help explain how Yorktown developed through trade, agriculture, family businesses and community institutions. Current published hours are limited to Friday through Sunday and exclude holidays, so travelers should confirm the schedule before planning a dedicated museum stop.",
    ],
    officialUrl: "https://visityorktowntx.com/visit-yorktown/area-attractions/",
    managingAuthority: "Yorktown Historical Society",
    address: "144 W Main St, Yorktown, TX 78164",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave82Destinations,
];
