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
 * Twenty-eighth statewide museum wave. This record reconciles the audit's
 * older "Edna Historical Museum" wording to the current Texana Museum and
 * Library institution serving Edna and Jackson County.
 */
export const statewideMuseumExpansionWave28Destinations: Destination[] = [
  {
    id: "museum-statewide-wave28-texana",
    brandId: "texasdefined",
    slug: "texana-museum-and-library",
    name: "Texana Museum and Library",
    summary: "Texana Museum and Library in Edna preserves Jackson County's local and pioneer history, regional collections and La Salle Odyssey material, with historic structures and markers on its North Wells Street grounds.",
    category: "historic-sites",
    region: "gulf-coast",
    nearestTown: "Edna",
    county: "Jackson County",
    coordinates: { lat: 28.98035, lng: -96.64822 },
    hero: museumPlaceholder("Texana Museum and Library"),
    bestSeason: "Year-round indoor history stop; fall through spring is especially comfortable for combining the museum with Jackson County heritage sites and the Lake Texana area.",
    entryNote: "The current Jackson County Chamber listing publishes Thursday-Saturday hours from 8 a.m. to noon and 1 to 5 p.m. Hours in older museum directories differ, so confirm the current schedule before making a special trip; current admission information is not clearly published by the Chamber listing.",
    highlights: [
      "Jackson County local and pioneer history",
      "La Salle Odyssey artifacts",
      "Dutart-McDowell historic home",
      "Regional historical collections",
    ],
    body: [
      "Texana Museum and Library is Edna's principal museum for Jackson County history, carrying forward the name of the earlier town of Texana while preserving artifacts and documentary material tied to communities across the county. The institution gives travelers a local-history anchor beyond the courthouse square and nearby outdoor destinations.",
      "The museum also participates in the wider Gulf Coast story of the La Salle expedition. Texas Historical Commission heritage-tourism material identifies Texana Museum as one of the regional museums displaying La Salle Odyssey artifacts recovered through the investigation of La Salle's seventeenth-century expedition, connecting Edna to a story interpreted across multiple coastal counties.",
      "Historic fabric on the museum grounds adds another layer to the visit. The Texas Historical Commission places the Dutart-McDowell Home at the museum and records that the house was built in Texana around 1860 before later being moved to Edna. For TexasDefined, this page replaces the audit's stale 'Edna Historical Museum' wording with the current institution and creates a canonical Jackson County heritage destination for county, regional, search and related-destination discovery.",
    ],
    officialUrl: "https://www.jacksoncountytexas.com/list/member/texana-museum-177",
    managingAuthority: "Texana Museum and Library Association",
    address: "403 N Wells St, Edna, TX 77957",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
