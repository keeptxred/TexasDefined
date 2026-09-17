import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-17";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Sixty-fifth statewide museum wave. This Groveton record reconciles the
 * audit's Trinity County Historical Museum wording to the active Trinity
 * County Museum / Hensley Genealogical and Historical Research Center.
 */
export const statewideMuseumExpansionWave65Destinations: Destination[] = [
  {
    id: "museum-statewide-wave65-trinity-county-museum",
    brandId: "texasdefined",
    slug: "trinity-county-museum-groveton",
    name: "Trinity County Museum",
    summary: "Trinity County Museum in Groveton combines local-history exhibits with the Hensley Genealogical and Historical Research Center, preserving artifacts, photographs, family histories, obituaries and archival material from this East Texas county.",
    category: "historic-sites",
    region: "piney-woods",
    geography: {
      primaryRegionId: "east-texas",
      subregionIds: ["deep-east-texas"],
      countySlugs: ["trinity"],
      travelRegionIds: ["piney-woods"],
    },
    nearestTown: "Groveton",
    county: "Trinity County",
    coordinates: { lat: 31.056348, lng: -95.128901 },
    hero: museumPlaceholder("Trinity County Museum"),
    bestSeason: "Year-round during weekday research and museum hours; fall through spring is especially comfortable for combining the museum with Groveton's restored courthouse and other East Texas heritage stops.",
    entryNote: "Trinity County currently lists the museum and historical commission at 490 W. 1st Street with Monday-Thursday hours from 9 a.m. to 4 p.m., while the same county page identifies 450 W. First Street as the museum meeting location. Call 936-642-0242 to confirm the visitor entrance before a dedicated trip.",
    highlights: [
      "Trinity County historical artifacts, memorabilia and photographs",
      "Hensley Genealogical and Historical Research Center",
      "Family histories, obituaries and county research collections",
      "Trinity County Historical Commission archives and preservation work",
    ],
    body: [
      "Trinity County Museum serves both as a public history collection and as the research home of the Trinity County Historical Commission in Groveton. Its museum side preserves historical artifacts, memorabilia and photographs depicting life across Trinity County, while the Hensley Genealogical and Historical Research Center provides a deeper documentary record for visitors tracing families, communities and events in this part of East Texas.",
      "The research collection is especially useful in a county whose historic records and built heritage span multiple courthouse generations. The center maintains family histories, obituaries, books, marriage records and other county materials that supplement surviving government records, giving genealogists and local-history researchers a practical starting point beyond the display galleries.",
      "The museum's relationship with the Trinity County Historical Commission gives it a direct role in county preservation. Texas Historical Commission records identify museum director and historical commission chair Susanne Waller as a participant in the restored Trinity County Courthouse project. For TexasDefined, the museum therefore works as a local-history anchor for Groveton and the wider Deep East Texas discovery graph, connecting genealogy, courthouse preservation, timber-country communities and nearby Trinity River destinations.",
    ],
    officialUrl: "https://www.co.trinity.tx.us/page/trinity.historical",
    managingAuthority: "Trinity County Historical Commission",
    address: "490 W 1st St, Groveton, TX 75845",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
