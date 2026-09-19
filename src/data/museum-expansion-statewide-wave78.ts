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
 * Seventy-eighth statewide museum wave. This record adds Wink's active,
 * volunteer-run Roy Orbison Museum as a distinct music-history destination.
 */
export const statewideMuseumExpansionWave78Destinations: Destination[] = [
  {
    id: "museum-statewide-wave78-roy-orbison-museum",
    brandId: "texasdefined",
    slug: "roy-orbison-museum-wink",
    name: "Roy Orbison Museum",
    summary: "Roy Orbison Museum in Wink preserves the singer's West Texas beginnings through photographs, records, school-era material, personal memorabilia and community-donated artifacts in the small oil town where Orbison spent formative years and started performing with the Wink Westerners.",
    category: "historic-sites",
    region: "big-bend",
    geography: {
      primaryRegionId: "west-texas",
      subregionIds: ["permian-basin"],
      countySlugs: ["winkler"],
      travelRegionIds: ["big-bend"],
    },
    nearestTown: "Wink",
    county: "Winkler County",
    coordinates: { lat: 31.75565, lng: -103.15724 },
    hero: museumPlaceholder("Roy Orbison Museum"),
    bestSeason: "Year-round by advance arrangement; fall through spring is most comfortable for combining the museum with outdoor Wink and Kermit oil-boom history stops.",
    entryNote: "The City of Wink currently says the volunteer-run museum is visitable by appointment, so arrange access before making a dedicated trip. Current Texas Time Travel, museum and mapping records identify the storefront at 213 E. Hendricks Boulevard, while the City's attraction page labels it 209 E. Hendricks; these are adjacent downtown parcels, so confirm the meeting point when scheduling your visit.",
    highlights: [
      "Roy Orbison photographs, recordings and career memorabilia",
      "Wink school and early Wink Westerners history",
      "Personal artifacts and fan-donated music-history material",
      "Small-town connection between Permian Basin oil-boom history and early rock and roll",
    ],
    body: [
      "The Roy Orbison Museum tells a music story that is inseparable from Wink itself. Orbison was born in Vernon, but his family moved to Wink in 1946 when his father found oilfield work. As a student he began performing with friends in the Wink Westerners, playing local venues and appearing on regional radio before later versions of the group helped launch his recording career. The City of Wink continues to present the museum as one of the community's defining attractions because the collection preserves that formative period rather than treating Orbison only as an already-famous performer.",
      "Inside the compact storefront, the emphasis is on memorabilia with direct personal or community connections. Current museum material documents records, photographs, school-era objects, Orbison's trademark eyewear and other donated pieces tied to his career and the people who knew him. The scale is intimate rather than institutional: visitors come for a concentrated archive of one artist's relationship with a West Texas town, often with volunteer interpretation that adds local context to the objects.",
      "For TexasDefined, the museum gives Winkler County a cultural-history destination distinct from its oilfields, sandhills and county-government landmarks. The county guide already explains how Wink's petroleum boom created the town in which Orbison spent his teenage years; the museum turns that narrative into a visitable place. It also remains separate from the broader Winkler County Historical Museum, whose current public-access details are not clear enough to publish as a new canonical destination.",
    ],
    officialUrl: "https://www.cityofwink.com/attractions",
    managingAuthority: "City of Wink / Roy Orbison Museum volunteers",
    address: "213 E Hendricks Blvd, Wink, TX 79789",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
