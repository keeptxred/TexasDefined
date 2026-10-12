import type { Destination } from "./types";

/**
 * Park HQ entrance coordinates and visitor addresses independently checked from
 * TPWD's individual /map pages on 2026-10-12. These are NOT coordinates of every
 * campground, day-use unit, scenic stop or trailhead within the same park.
 * The source review does not claim verification of all editorial park facts.
 */
type VerifiedHeadquarters = { address?: string; coordinates: { lat: number; lng: number }; sourceUrl: string; directions?: string };
export const VERIFIED_STATE_PARK_HEADQUARTERS: Readonly<Record<string, VerifiedHeadquarters>> = {
  "palo-duro-canyon-state-park": {
    coordinates: { lat: 34.984709, lng: -101.701867 },
    address: "11450 Park Road 5, Canyon, TX 79015",
    sourceUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/map",
  },
  "caprock-canyons-state-park": {
    coordinates: { lat: 34.410296, lng: -101.053264 },
    address: "850 State Park Road, Quitaque, TX 79255",
    sourceUrl: "https://tpwd.texas.gov/state-parks/caprock-canyons/map",
  },
  "big-bend-ranch-state-park": {
    coordinates: { lat: 29.470458, lng: -103.957922 },
    address: "1900 Sauceda Ranch Road, Marfa, TX 79845",
    sourceUrl: "https://tpwd.texas.gov/state-parks/big-bend-ranch/map",
    directions: "Three distinct points serve this very large park: Barton Warnock Visitor Center (east FM 170), Fort Leaton (west FM 170) and Sauceda Ranger Station (interior). Sauceda Ranch Road is the only interior approach, about 27 miles of rugged dirt road from FM 170. RVs and trailers are not recommended; the northern access shown by some map apps is permanently closed. Check in at an entrance before proceeding.",
  },
  "mustang-island-state-park": {
    coordinates: { lat: 27.672162, lng: -97.175309 },
    address: "9394 State Highway 361, Corpus Christi, TX 78418",
    sourceUrl: "https://tpwd.texas.gov/state-parks/mustang-island/map",
  },
  "goose-island-state-park": {
    coordinates: { lat: 28.133503, lng: -96.984280 },
    address: "202 S. Palmetto Street, Rockport, TX 78382",
    sourceUrl: "https://tpwd.texas.gov/state-parks/goose-island/map",
  },
  "sea-rim-state-park": {
    coordinates: { lat: 29.675539, lng: -94.043525 },
    address: "19335 S. Gulfway Drive, Sabine Pass, TX 77655",
    sourceUrl: "https://tpwd.texas.gov/state-parks/sea-rim/map",
    directions: "Approach from Port Arthur on State Highway 87; TPWD notes Highway 87 is closed between Sea Rim and High Island. Do not route through that closed stretch.",
  },
  "fort-boggy-state-park": {
    coordinates: { lat: 31.187372, lng: -95.976646 },
    address: "4994 Highway 75 South, Centerville, TX 75833",
    sourceUrl: "https://tpwd.texas.gov/state-parks/fort-boggy/map",
  },
  "copper-breaks-state-park": {
    coordinates: { lat: 34.112176, lng: -99.743296 },
    address: "777 Park Road 62, Quanah, TX 79252",
    sourceUrl: "https://tpwd.texas.gov/state-parks/copper-breaks/map",
  },
  "san-angelo-state-park": {
    coordinates: { lat: 31.463922, lng: -100.508038 },
    address: "362 S. FM 2288, San Angelo, TX 76901",
    sourceUrl: "https://tpwd.texas.gov/state-parks/san-angelo/map",
    directions: "The park has separate North Shore and South Shore entrances. TPWD says the North Shore gate is locked: check in at South Shore gatehouse to receive the code. Use the separate north and south trails maps to select your access point.",
  },
  "abilene-state-park": {
    coordinates: { lat: 32.240731, lng: -99.879139 },
    address: "150 Park Road 32, Tuscola, TX 79562",
    sourceUrl: "https://tpwd.texas.gov/state-parks/abilene/map",
  },
  "daingerfield-state-park": {
    coordinates: { lat: 33.013000, lng: -94.690587 },
    address: "455 Park Road 17, Daingerfield, TX 75638",
    sourceUrl: "https://tpwd.texas.gov/state-parks/daingerfield/map",
  },
  "mission-tejas-state-park": {
    coordinates: { lat: 31.541940, lng: -95.233756 },
    address: "19343 State Highway 21 E, Grapeland, TX 75844",
    sourceUrl: "https://tpwd.texas.gov/state-parks/mission-tejas/map",
  },
};

export function applyVerifiedStateParkHeadquarters(destination: Destination): Destination {
  const found = VERIFIED_STATE_PARK_HEADQUARTERS[destination.slug];
  if (!found) return destination;
  return {
    ...destination,
    coordinates: found.coordinates,
    ...(found.address ? { address: found.address } : {}),
    ...(found.directions ? { directions: found.directions } : {}),
  };
}
