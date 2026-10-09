import { applyCuratedDestinationBatch20 } from "./destination-curation-batch20";
import type { Destination } from "./types";

/**
 * Canonical fallback for an actual public TPWD state park that the remote
 * Explore feed omits. This is NOT an invented destination or a duplicate World
 * Birding Center unit: the legacy world-birding-center-prefixed park alias
 * stays excluded by destination-availability.ts.
 *
 * Enrich with the existing October 9, 2026 official-source authority copy.
 * Keep the checked-in photograph, credit and exact canonical slug even when
 * remote Explore is partially unavailable.
 */
const esteroSeed: Destination = {
  id: "preserved-estero-llano-grande-state-park",
  brandId: "texasdefined",
  slug: "estero-llano-grande-state-park",
  name: "Estero Llano Grande State Park",
  summary: "Estero Llano Grande State Park is a Weslaco World Birding Center site known for shallow wetland ponds, native woodland, boardwalks and exceptional Lower Rio Grande Valley birding.",
  category: "state-parks",
  region: "south-texas",
  nearestTown: "Weslaco",
  county: "Hidalgo",
  coordinates: { lat: 26.126411, lng: -97.956518 },
  hero: {
    src: "/images/state-parks/world-birding-center-estero-llano-grande-state-park.jpg",
    alt: "Wetland birding habitat at Estero Llano Grande State Park in Weslaco, Texas",
    width: 1600,
    height: 1067,
    credit: "Alan D. Wilson · CC BY-SA 3.0 · Wikimedia Commons",
  },
  bestSeason: "Fall through spring for comfortable birding and wetland wildlife viewing.",
  entryNote: "Check TPWD day-use reservations, official park alerts, water levels and trail conditions.",
  highlights: ["World Birding Center", "Wetland boardwalks", "Birdwatching"],
  body: [],
  officialUrl: "https://tpwd.texas.gov/state-parks/estero-llano-grande/",
  sourceCheckedAt: "2026-10-09",
};

export const esteroLlanoGrandePreservedDestinations: Destination[] = [
  applyCuratedDestinationBatch20(esteroSeed),
];
