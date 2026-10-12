import type { Destination } from "./types";

/** An official TPWD state-park property; do not confuse a separately listed RV business with the park. */
export function isTexasStateParkDestination(destination: Destination): boolean {
  if (destination.category === "rv-parks") return false;
  if (!/\bstate park\b|\bstate natural area\b|\bindian lodge\b/i.test(destination.name)) return false;
  return /^https:\/\/tpwd\.texas\.gov\/state-parks\/[a-z0-9-]+\/?(?:[?#].*)?$/i.test(destination.officialUrl ?? "");
}

/** Link only to known TPWD resource patterns; do not assert an amenity is present without specific evidence. */
export function stateParkOfficialResources(destination: Destination) {
  if (!isTexasStateParkDestination(destination)) return null;
  const official = (destination.officialUrl ?? "").split(/[?#]/)[0].replace(/\/$/, "");
  return {
    official,
    map: `${official}/map`,
    feesAndFacilities: `${official}/fees-facilities`,
    reservations: destination.reservationUrl?.startsWith("https://") ? destination.reservationUrl : "https://texasstateparks.reserveamerica.com/",
  };
}

export type VerifiedParkFacilityNotes = {
  checkedAt: string;
  sourceUrl: string;
  restrooms?: string;
  parking?: string;
  camping?: string;
  access?: string;
  maps?: string;
};

/** Claims below have specific official source pages; absence means "not yet independently checked", not "no facility". */
export const VERIFIED_PARK_FACILITIES: Readonly<Record<string, VerifiedParkFacilityNotes>> = {
  "honey-creek-state-natural-area": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/newsmedia/releases/?req=20260807a",
    restrooms: "TPWD confirms one restroom at the new public trailhead off Park Road 31, opened August 8, 2026. Other restroom locations or shower facilities are not verified.",
    parking: "Use the reserved-access public trailhead off Park Road 31; TPWD has not confirmed the number or accessibility of individual parking spaces in its current visitor notice.",
    camping: "TPWD does not list public camping as part of the new Honey Creek trailhead access. Bring your own drinking water: TPWD confirms there is no public water-refill station.",
    access: "The new trailhead is open daily 7 a.m.–7 p.m., with reserved day passes and gate instructions. Public trails are distinct from guided creek tours; pets are permitted on trails but not on creek tours.",
    maps: "TPWD supplies a downloadable public trails map and describes the 0.7-mile accessible Box Turtle Trail and 1.7-mile moderate Roadrunner Trail.",
  },
  "fort-richardson-state-park-state-historic-site": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/fort-richardson/fees-facilities/campsites",
    restrooms: "TPWD lists restrooms with showers near the West Camping Loop's full-hookup and electric campsites. Verify the nearest available facility on the park map.",
    parking: "TPWD describes back-in parking for the full-hookup campsites, some pull-through electric sites, and a group camp reached on foot from its parking area.",
    camping: "TPWD lists four full-hookup campsites in the West Camping Loop and additional electric, group, and overflow camping options. Verify availability and current prices.",
    maps: "The official park map page provides park, trails, and trailway maps.",
  },
  "seminole-canyon-state-park-and-historic-site": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/seminole-canyon/map",
    parking: "The park headquarters is reached from US Highway 90 west of Comstock; use TPWD's park map for designated parking and tour meeting points.",
    access: "TPWD lists the park headquarters at 29.700094, -101.312875. Check current tour access and active park alerts before traveling.",
    maps: "The official map page links park and trails maps and an interactive trails map.",
  },
  "lake-arrowhead-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/lake-arrowhead/map",
    parking: "TPWD provides directions to the park entrance from FM 1954, approximately seven miles south of Wichita Falls; use the park map to select the appropriate parking area.",
    access: "The park headquarters address is 229 Park Road 63, Wichita Falls, TX 76310. Confirm current lake and park alerts.",
    maps: "The official map page provides park and trails maps, including an interactive trails map.",
  },
};
