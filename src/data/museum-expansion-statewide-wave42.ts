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
 * Forty-second statewide museum wave. This record reconciles the audit's
 * Newton County museum entry to the active county history center, museum and
 * genealogy-research library operated by the Newton County Historical Commission.
 */
export const statewideMuseumExpansionWave42Destinations: Destination[] = [
  {
    id: "museum-statewide-wave42-newton-county-history-center",
    brandId: "texasdefined",
    slug: "newton-county-history-center-and-museum",
    name: "Newton County History Center and Museum",
    summary: "Newton County History Center and Museum preserves the documentary and material history of Texas' easternmost county, pairing rotating local-history displays with archives, photographs, publications, oral histories and a genealogy research library in downtown Newton.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Newton",
    county: "Newton County",
    coordinates: { lat: 30.84214, lng: -93.75935 },
    hero: museumPlaceholder("Newton County History Center and Museum"),
    bestSeason: "Year-round research and local-history stop; fall through spring is especially comfortable for combining the center with Newton's courthouse district and other Deep East Texas heritage sites.",
    entryNote: "The museum's current official site asks visitors to call 409-379-2109 before coming because staff schedules and hours are flexible. It currently lists primary Tuesday-Wednesday hours of 7 a.m.-5 p.m. and Thursday hours of 7 a.m.-4 p.m.; confirm before a dedicated trip.",
    highlights: [
      "Newton County archives and genealogy research library",
      "Rotating county-history display room",
      "Photographs, maps, newspapers and oral histories",
      "Deep East Texas community and lumber-history resources",
    ],
    body: [
      "Newton County History Center and Museum is the public research and interpretation hub of the Newton County Historical Commission. Its stated purpose is to provide a centralized place to preserve documentation of Newton County history while keeping those records accessible to residents, descendants, researchers and visitors.",
      "The collection extends beyond display cases. The commission preserves manuscripts, books, maps, photographs, newspapers, video, artwork, artifacts, oral history and microforms, while the genealogy research library gives visitors a practical way to trace families and communities connected to the county. A rotating display room focuses on Newton County subjects, and current commission projects include digitization and educational programming.",
      "The center remains an active county-government heritage resource rather than a legacy directory listing. Newton County's official website identifies the History Center and Museum at 213 Court Street and names the current Historical Commission leadership, while the commission's own 2026-updated site continues to publish visitor and research information. That makes the museum a strong TexasDefined anchor for Newton, Newton County and broader Piney Woods discovery.",
    ],
    officialUrl: "https://www.history-newtoncotx.org/index.html",
    managingAuthority: "Newton County Historical Commission",
    address: "213 Court Street, Newton, TX 75966",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
