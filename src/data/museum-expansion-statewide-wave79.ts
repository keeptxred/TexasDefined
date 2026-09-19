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
 * Seventy-ninth statewide museum wave. This record gives Brenham's active
 * Washington County history museum its own canonical destination instead of
 * leaving it as a text-only attraction reference on the Brenham town page.
 */
export const statewideMuseumExpansionWave79Destinations: Destination[] = [
  {
    id: "museum-statewide-wave79-brenham-heritage-museum",
    brandId: "texasdefined",
    slug: "brenham-heritage-museum",
    name: "Brenham Heritage Museum",
    summary: "Brenham Heritage Museum interprets the history, art, culture and communities of Brenham and Washington County inside the restored 1916 federal post office, with interactive local-history exhibits, rotating collections and a preserved civic landmark at the edge of downtown.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Brenham",
    county: "Washington County",
    coordinates: { lat: 30.16756, lng: -96.39606 },
    hero: museumPlaceholder("Brenham Heritage Museum"),
    bestSeason: "Year-round for the indoor galleries; spring is especially useful for combining the museum with Washington County bluebonnet drives, while fall through spring is comfortable for walking historic downtown Brenham.",
    entryNote: "The museum currently lists regular hours Tuesday through Saturday from 10 a.m. to 4 p.m. Walk-ins are welcome, with separate admission rates by age and group type. Guided tours are available by appointment, and the rear entrance provides ramp and elevator access for wheelchairs and strollers.",
    highlights: [
      "Restored 1916 Brenham federal post office",
      "Interactive Brenham and Washington County history exhibits",
      "Rotating collections and community-history programming",
      "Downtown setting near the Brenham Fire Museum and courthouse district",
    ],
    body: [
      "Brenham Heritage Museum occupies a building that already tells part of the city's story. Construction on the federal post office began in 1914 and was completed in 1916; the building served as Brenham's primary post office until the mid-1960s before taking on other federal uses. The City of Brenham later made the landmark available for a local museum, and the nonprofit museum organization developed it into a center for interpreting Brenham and Washington County history.",
      "The museum today is the product of a major restoration and exhibit rethink. Severe 2016 flooding forced a long closure, but the building and its infrastructure were restored and the museum reopened in November 2022 with redesigned galleries, interactive interpretation and space for rotating collections. That makes the visit useful for more than one historical period: agriculture, military service, civic life, local traditions and the people who shaped Washington County can all appear within the same historic federal building.",
      "For TexasDefined, the museum is Brenham's natural local-history anchor and complements rather than duplicates Washington-on-the-Brazos, the Texas Cotton Gin Museum in Burton and Brenham's Blue Bell and downtown coverage. A visitor can use it to establish the county's broader story before branching into Republic-era sites, German-Texan settlement, agricultural history or seasonal bluebonnet country, while the downtown location makes it easy to combine with a short architectural and civic-history walk.",
    ],
    officialUrl: "https://www.bhmtexas.org/visit",
    managingAuthority: "Brenham Heritage Museum, Inc.",
    address: "105 S Market St, Brenham, TX 77833",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
