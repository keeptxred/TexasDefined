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
 * Fiftieth statewide museum wave. This Albany record adds the active Old Jail
 * Art Center, pairing a nationally recognized art collection with the restored
 * 1877-1878 Shackelford County jail and regional-history archives.
 */
export const statewideMuseumExpansionWave50Destinations: Destination[] = [
  {
    id: "museum-statewide-wave50-old-jail-art-center",
    brandId: "texasdefined",
    slug: "old-jail-art-center-albany",
    name: "Old Jail Art Center",
    summary: "Old Jail Art Center in Albany combines a nationally accredited art museum with the restored 1877-1878 Shackelford County jail, more than 2,400 works of art, regional-history collections and the Robert E. Nail Jr. Archives.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Albany",
    county: "Shackelford County",
    coordinates: { lat: 32.722947, lng: -99.294695 },
    hero: museumPlaceholder("Old Jail Art Center"),
    bestSeason: "Year-round for indoor galleries and archives; fall through spring is especially comfortable for combining the museum with Albany, Fort Griffin and other West Texas heritage stops.",
    entryNote: "The museum currently publishes 11 a.m.-5 p.m. hours and is closed Sundays, Mondays and major holidays. Admission is always free. Check the current exhibition and holiday calendar before a dedicated trip, and contact the museum in advance if archive research is a priority.",
    highlights: [
      "Restored 1877-1878 Shackelford County jail",
      "Permanent collection of more than 2,400 artworks",
      "Ancient Asian, Ancient Americas and twentieth-century art",
      "Robert E. Nail Jr. Archives and regional-history collections",
    ],
    body: [
      "Old Jail Art Center is both an art museum and a preserved piece of Shackelford County history. Its original limestone building was constructed in 1877-1878 as the county's first permanent jail, served that role until 1929 and was later saved from demolition by Albany author and playwright Robert E. Nail Jr. The structure was added to the National Register of Historic Places in 1976 and became the core of the museum that opened in 1980.",
      "The collection grew from art assembled by Reilly Nail, Bill Bomar and their families and now numbers more than 2,400 works. Its holdings range from twentieth-century American and European art to Asian material, objects from the Ancient Americas and regional collections. The museum identifies artists including Pablo Picasso, Paul Klee, Amedeo Modigliani, Henry Moore, Alexander Calder and Grant Wood, while permanent holdings also preserve ranching and local-history material tied to the Albany area.",
      "The institution has expanded from four small galleries to about 17,000 square feet of gallery, education, archive and art-storage space while keeping the historic jail at its center. The Robert E. Nail Jr. Archives supports research into regional and institutional history, and the museum has maintained American Alliance of Museums accreditation since 1989. Current 2026 exhibitions and programming, free admission and a five-day public schedule support treating the Old Jail Art Center as a current standalone TexasDefined authority destination.",
    ],
    officialUrl: "https://theojac.org/",
    managingAuthority: "Old Jail Art Center",
    address: "201 South 2nd Street, Albany, TX 76430",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
