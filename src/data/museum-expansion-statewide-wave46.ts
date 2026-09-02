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
 * Forty-sixth statewide museum wave. The audit contains both Museum of Big Bend
 * and Museum of the Big Bend wording; this record consolidates them into the
 * active Sul Ross State University museum in Alpine.
 */
export const statewideMuseumExpansionWave46Destinations: Destination[] = [
  {
    id: "museum-statewide-wave46-museum-of-the-big-bend",
    brandId: "texasdefined",
    slug: "museum-of-the-big-bend-alpine",
    name: "Museum of the Big Bend",
    summary: "Museum of the Big Bend at Sul Ross State University interprets the natural history, human history and cultural crossroads of the Big Bend region of Texas and Mexico through archaeology, regional artifacts, maps, art and changing exhibitions.",
    category: "historic-sites",
    region: "big-bend",
    nearestTown: "Alpine",
    county: "Brewster County",
    coordinates: { lat: 30.36392, lng: -103.65156 },
    hero: museumPlaceholder("Museum of the Big Bend"),
    bestSeason: "Year-round for the indoor galleries; fall through spring is especially comfortable for combining the museum with Alpine and other Big Bend-region stops.",
    entryNote: "The museum currently publishes Tuesday-Saturday hours from 10 a.m. to 4 p.m. and closes for major holidays. General admission is $10, with free admission for children 12 and under, museum members, and current Sul Ross State University students, faculty and staff. The museum is reached from Harrison Street via Sul Ross State University's Entrance Four, so confirm current visitor information before arriving.",
    highlights: [
      "Big Bend Legacy permanent exhibition",
      "Regional archaeology, history and cultural collections",
      "Texas, northern Mexico and Southwest map holdings",
      "Changing art and history exhibitions on the Sul Ross campus",
    ],
    body: [
      "Museum of the Big Bend is Sul Ross State University's regional museum in Alpine, built around the intertwined natural, human and cultural history of Far West Texas and northern Mexico. Its mission is to collect, preserve, exhibit and interpret materials connected to the Big Bend's prehistory, history and cultural diversity, making the museum a strong orientation stop before exploring the wider desert and mountain region.",
      "The permanent Big Bend Legacy exhibition brings together natural history, archaeology, settlement, ranching, borderland culture and regional lifeways rather than treating the Big Bend as a single-period story. The museum also maintains important map holdings focused on Texas, northern Mexico and the Southwest and supplements its permanent material with rotating history and art exhibitions, educational programs and special events.",
      "The museum sits on the northeast side of the Sul Ross State University campus and is reached from Harrison Street through Entrance Four. TexasDefined consolidates the audit's duplicate Museum of Big Bend and Museum of the Big Bend wording into this single current institution. Current museum information identifies it as a department of Sul Ross State University, with regular Tuesday-through-Saturday visitor hours and paid general admission outside designated free-admission categories or special sponsored periods.",
    ],
    officialUrl: "https://www.museumofthebigbend.com/visit/",
    managingAuthority: "Sul Ross State University",
    address: "400 N Harrison St, Alpine, TX 79830",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
