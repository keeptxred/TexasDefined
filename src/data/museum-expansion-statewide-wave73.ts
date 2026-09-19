import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave74Destinations } from "./museum-expansion-statewide-wave74";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-18";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

export const statewideMuseumExpansionWave73Destinations: Destination[] = [
  {
    id: "museum-statewide-wave73-waller-county-historical-museum",
    brandId: "texasdefined",
    slug: "waller-county-historical-museum-brookshire",
    name: "Waller County Historical Museum",
    summary: "Waller County Historical Museum occupies Brookshire's 1910 Donigan House, preserving county history through period rooms, rotating displays, medical-office interpretation and a research archive inside a Recorded Texas Historic Landmark.",
    category: "historic-sites",
    region: "gulf-coast",
    geography: {
      primaryRegionId: "gulf-coast",
      subregionIds: ["houston-area"],
      metroId: "houston",
      countySlugs: ["waller"],
      travelRegionIds: ["gulf-coast"],
    },
    nearestTown: "Brookshire",
    county: "Waller County",
    coordinates: { lat: 29.785479, lng: -95.953485 },
    hero: museumPlaceholder("Waller County Historical Museum"),
    bestSeason: "Year-round during posted museum hours; fall through spring is especially comfortable for pairing the Donigan House with Brookshire, Hempstead, Prairie View and other Waller County heritage stops.",
    entryNote: "Waller County currently lists museum hours Wednesday and Friday from 10 a.m. to 4 p.m. and Saturday from 11 a.m. to 2 p.m. Call 281-934-2826 before a long dedicated trip if a specific archive visit or exhibit is important.",
    highlights: [
      "1910 Donigan House Recorded Texas Historic Landmark",
      "Period-room interpretation of early Waller County life",
      "Historic medical-office exhibit",
      "Rotating local-history displays and research archives",
    ],
    body: [
      "Waller County Historical Museum gives Brookshire a county-history anchor inside a building that already carries its own story. The Donigan House was built in 1910 for physician Paul M. Donigan and his wife Rebecca. The main residence occupied the upper level while the lower floor included a cellar and medical office, allowing the museum to interpret both domestic life and an early local medical practice within the original setting.",
      "The museum uses that house-museum format deliberately. Period rooms recreate aspects of daily life, while changing display spaces allow the county's broader stories to rotate through the building rather than freezing interpretation around one family. Waller County's current visitor page also identifies the museum archives as a historical-research resource for people tracing local families, communities and county development.",
      "For TexasDefined, the Donigan House museum fills a distinct role on Houston's western prairie edge. It complements rather than duplicates the county's Prairie View, railroad, plantation and courthouse material: the museum offers an intimate object-and-room-scale view of Waller County history, while the county guide supplies the larger geography and civic context. The active Historical Commission, Historical Society and Museum Board keep the destination tied to ongoing preservation work.",
    ],
    officialUrl: "https://www.co.waller.tx.us/page/Museums",
    managingAuthority: "Waller County Historical Commission Museum Board",
    address: "906 Cooper St, Brookshire, TX 77423",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave74Destinations,
];
