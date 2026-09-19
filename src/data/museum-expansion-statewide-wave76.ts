import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave77Destinations } from "./museum-expansion-statewide-wave77";
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
 * Seventy-sixth statewide museum wave. This record adds the Wills Point Depot
 * Museum as the town's railroad-and-community-history destination while
 * avoiding stale assumptions about public hours.
 * Wave 77 is chained here so later museum expansion remains conflict-light.
 */
export const statewideMuseumExpansionWave76Destinations: Destination[] = [
  {
    id: "museum-statewide-wave76-wills-point-depot-museum",
    brandId: "texasdefined",
    slug: "wills-point-depot-museum",
    name: "Wills Point Depot Museum",
    summary: "Wills Point Depot Museum preserves the town's railroad, agricultural, business, school and household history inside the historic Texas & Pacific depot, anchoring the brick-street historic district that grew around rail service in northwestern Van Zandt County.",
    category: "historic-sites",
    region: "prairies-lakes",
    geography: {
      primaryRegionId: "north-texas",
      subregionIds: ["north-texas-prairies"],
      countySlugs: ["van-zandt"],
      travelRegionIds: ["prairies-lakes"],
    },
    nearestTown: "Wills Point",
    county: "Van Zandt County",
    coordinates: { lat: 32.707706, lng: -96.009072 },
    hero: museumPlaceholder("Wills Point Depot Museum"),
    bestSeason: "Year-round when the museum is open; spring and fall are especially comfortable for combining the depot with Wills Point's historic district, murals, cabin and nearby Lake Tawakoni country.",
    entryNote: "The City of Wills Point currently identifies the railroad depot museum as part of its historic district but does not publish regular museum hours on the city history page. Current museum directories list the depot at 210 W. South Commerce Street; confirm access before a dedicated trip rather than relying on older appointment-only schedules.",
    highlights: [
      "Historic Texas & Pacific railroad depot",
      "Railroad memorabilia and depot-era transportation history",
      "Agricultural, business, school and household artifacts from Wills Point",
      "Walkable connection to the town's brick-street historic district and early-settlement sites",
    ],
    body: [
      "Wills Point grew with the railroad, and the Depot Museum preserves that relationship in the place where passengers, freight and communications once moved through town. The City of Wills Point still identifies the railroad depot museum as one of the defining features of its historic district, alongside the community's brick streets and the William Wills log cabin. That makes the depot more than a container for artifacts: it is part of the transportation infrastructure that helped turn a prairie settlement into a regional shipping and commercial center.",
      "The museum's collections broaden the story beyond trains. Historical descriptions of the museum document material from local businesses, schools, households, agriculture and medicine alongside railroad artifacts, photographs and records. The former ticket office, waiting-room spaces and depot rooms provide a practical framework for seeing how transportation, commerce and daily life overlapped in a small East Texas-edge town.",
      "For TexasDefined, the Depot Museum fills a distinct role within Van Zandt County. Canton carries the courthouse and First Monday story, Grand Saline interprets the salt industry, and Van preserves oil-boom history; Wills Point's strongest local-history thread is the railroad corridor that connected the community to Dallas and East Texas markets. The depot therefore works as the canonical heritage anchor for Wills Point while the county guide supplies the broader Blackland Prairie-to-East Texas transition story.",
    ],
    officialUrl: "https://www.willspointtx.gov/history",
    managingAuthority: "Wills Point Historical Society",
    address: "210 W South Commerce St, Wills Point, TX 75169",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave77Destinations,
];
