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
 * Twenty-seventh statewide museum wave. This record resolves the audit's
 * Karnes County museum entry to the active Old Helena courthouse complex.
 */
export const statewideMuseumExpansionWave27Destinations: Destination[] = [
  {
    id: "museum-statewide-wave27-karnes-county",
    brandId: "texasdefined",
    slug: "karnes-county-museum-helena",
    name: "Karnes County Museum",
    summary: "Karnes County Museum preserves Old Helena's former 1873 county courthouse and surrounding historic complex, interpreting the vanished county seat, cattle-trail era and local history at one of South Texas's most evocative ghost-town settings.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Karnes City",
    county: "Karnes County",
    coordinates: { lat: 28.95028, lng: -97.82056 },
    hero: museumPlaceholder("Karnes County Museum"),
    bestSeason: "Fall through spring for the most comfortable walk around the Old Helena historic complex; the museum itself is a year-round history stop when scheduled hours are in effect.",
    entryNote: "Texas Historical Commission visitor information lists Friday through Monday hours from 11 a.m. to 4 p.m. Because this is a small historic-site museum, confirm current hours before making a special trip.",
    highlights: [
      "1873 Old Karnes County Courthouse",
      "Old Helena ghost-town history",
      "Cattle-trail and frontier stories",
      "Restored historic complex",
    ],
    body: [
      "Karnes County Museum occupies the former county courthouse at Old Helena, a community that once served as the Karnes County seat. The courthouse was built in 1873, and the surviving complex gives visitors an unusually tangible way to read the political and settlement history of this part of South Texas.",
      "Helena's fortunes changed after the San Antonio and Aransas Pass Railway bypassed the town. Karnes City grew along the railroad and became the county seat in the 1890s, while Helena steadily declined. The old courthouse, post office and other preserved structures now keep that nearly vanished community legible on the landscape.",
      "The museum also connects the site to the cattle-driving era and other local stories preserved across Karnes County. For TexasDefined, it is the canonical destination for the audit's Karnes County museum reference and a natural cross-link among Karnes County, Karnes City, Old Helena, courthouse history, ghost towns and South Texas heritage travel.",
    ],
    officialUrl: "https://texastimetravel.com/directory/karnes-county-museum/",
    managingAuthority: "Karnes County Historical Society",
    address: "8167 N FM 81, Helena, TX 78118",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
