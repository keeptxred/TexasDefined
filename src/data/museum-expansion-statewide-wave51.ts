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
 * Fifty-first statewide museum wave. This Graham record adds the active Old
 * Post Office Museum & Art Center, now branded as The Old Post, in the city's
 * restored 1936 federal post office.
 */
export const statewideMuseumExpansionWave51Destinations: Destination[] = [
  {
    id: "museum-statewide-wave51-old-post-graham",
    brandId: "texasdefined",
    slug: "old-post-office-museum-art-center-graham",
    name: "The Old Post",
    summary: "The Old Post in Graham is Young County's historic Old Post Office Museum & Art Center, pairing local history, rotating art exhibitions and educational programming inside the city's preserved 1936 federal post office.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Graham",
    county: "Young County",
    coordinates: { lat: 33.10558, lng: -98.59071 },
    hero: museumPlaceholder("The Old Post"),
    bestSeason: "Year-round for indoor exhibits and programs; fall through spring is especially comfortable for combining downtown Graham with nearby Possum Kingdom Lake and other North Texas heritage stops.",
    entryNote: "The museum currently publishes Tuesday-Saturday hours from 10 a.m. to 4 p.m. and is closed Sundays and Mondays. Check the current exhibition and event calendar before a dedicated trip because gallery installations, programs and holiday schedules can change.",
    highlights: [
      "Restored 1936 Graham federal post office",
      "Alexandre Hogue's 1939 Oil Fields of Graham mural",
      "Rotating art and Young County history exhibitions",
      "Educational programs, workshops and community events",
    ],
    body: [
      "The Old Post is Graham's historic Old Post Office Museum & Art Center, a local institution devoted to Young County history, art and culture. It occupies the city's 1936 federal post office at 510 Third Street, a building listed in the National Register of Historic Places and recognized as a Recorded Texas Historic Landmark. The City of Graham acquired the former postal building in 1994 for museum use, preserving important interior features as the site transitioned into an educational museum and cultural center.",
      "A defining feature of the building is Alexandre Hogue's 1939 mural Oil Fields of Graham, which remains in its original lobby location. The museum also presents rotating art exhibitions, historical displays and educational programming rather than functioning as a static local-history archive. Its current 2026 schedule includes changing exhibitions and community programs, reinforcing the institution's role as an active cultural destination in downtown Graham.",
      "The Old Post currently operates Tuesday through Saturday and maintains an active first-party visitor and events program. Texas Time Travel places the museum in the Lakes Trail Region, which TexasDefined maps to its broader Prairies & Lakes Explore region. Using the current The Old Post identity while retaining the full Old Post Office Museum & Art Center context gives Graham and Young County one clear canonical museum authority destination for search, county discovery and internal linking.",
    ],
    officialUrl: "https://www.theoldpost.org/",
    managingAuthority: "Old Post Office Museum & Art Center",
    address: "510 Third Street, Graham, TX 76450",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
