import type { Destination } from "./types";

/**
 * High-confidence pairings that should appear ahead of distance-only suggestions.
 * Entries are intentionally destination slugs, not hard-coded URLs, so links are
 * only rendered when both destinations survive the normal live/indexing gates.
 *
 * The resolver is symmetric: declaring A -> B also makes A appear for B. This
 * gives state parks and adjacent attractions a reverse link back to the cavern.
 */
const CURATED_PAIRINGS: Readonly<Record<string, readonly string[]>> = {
  "southern-pacific-passenger-depot-del-rio": ["whitehead-memorial-museum", "del-rio"],
  "clifton-whipple-truss-bridge": ["clifton", "bosque-museum"],
  "bosque-river-bridge-meridian": ["meridian", "meridian-state-park"],
  "holland-hotel": ["alpine-downtown-historic-district", "alpine", "kokernot-field"],
  "hotel-paso-del-norte": ["el-paso-museum-of-art", "magoffin-home", "ysleta-del-sur-pueblo-cultural-center-museum-el-paso", "franklin-mountains-state-park"],
  "magoffin-home": ["el-paso-museum-of-art", "chamizal-national-memorial", "hotel-paso-del-norte"],
  "sycamore-creek-bridge-fort-worth": ["fort-worth-stockyards"],
  "regency-suspension-bridge": ["goldthwaite", "san-saba"],
  "kokernot-field": ["alpine-downtown-historic-district", "alpine"],
  "alpine-downtown-historic-district": ["kokernot-field", "alpine", "holland-hotel"],
  "castro-county-courthouse": ["dimmitt"],
  "bailey-county-courthouse": ["muleshoe"],
  "wimberley-downtown-square-historic-district": ["wimberley", "blue-hole-regional-park"],
  "sour-lake-downtown-historic-district": ["sour-lake"],
  "downtown-bryan-historic-district": ["bryan", "carnegie-history-center-bryan", "queen-theatre-bryan"],
  "olivewood-cemetery": ["houston"],
  "natural-bridge-caverns": [
    "natural-bridge-wildlife-ranch",
    "guadalupe-river-state-park",
    "gruene-historic-district",
  ],
  "inner-space-cavern": [
    "hamilton-pool-preserve",
  ],
  "longhorn-cavern-state-park": [
    "inks-lake-state-park",
    "colorado-bend-state-park",
  ],
  "cascade-caverns": [
    "cave-without-a-name",
    "guadalupe-river-state-park",
  ],
  "cave-without-a-name": [
    "guadalupe-river-state-park",
  ],
  "wonder-world-cave": [
    "san-marcos-springs-spring-lake",
  ],
  "kickapoo-cavern-state-park": [
    "devils-sinkhole-state-natural-area",
  ],
  "gorman-cave": [
    "colorado-bend-state-park",
  ],
  "devils-sinkhole-state-natural-area": [
    "kickapoo-cavern-state-park",
  ],
  "westcave-preserve": [
    "hamilton-pool-preserve",
    "pedernales-falls-state-park",
  ],
};

function pairedSlugs(slug: string): string[] {
  const direct = CURATED_PAIRINGS[slug] ?? [];
  const incoming = Object.entries(CURATED_PAIRINGS)
    .filter(([, targets]) => targets.includes(slug))
    .map(([source]) => source);
  return [...new Set([...direct, ...incoming])];
}

export function curatedDestinationPairings(destination: Destination, catalog: Destination[]): Destination[] {
  const bySlug = new Map(catalog.map((item) => [item.slug, item]));
  return pairedSlugs(destination.slug)
    .map((slug) => bySlug.get(slug))
    .filter((item): item is Destination => Boolean(item) && item!.slug !== destination.slug);
}
