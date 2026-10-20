import type { Destination } from "./types";

/**
 * Verified activity-specific exclusion. A park may still be open for hiking or
 * camping while every swimming facility is closed. Do not remove that park
 * from the statewide park guide just because swimming is unavailable.
 *
 * Official authority pages control same-day status; this fail-closed record
 * is reviewed editorially and must be updated when TPWD changes its notice.
 */
export const SWIM_ACTIVITY_RESTRICTIONS: Readonly<Record<string, { notice: string; source: string; checkedAt: string }>> = {
  "abilene-state-park": {
    notice: "Swimming at Lake Abilene is prohibited because of low water, and the historic park pool is closed for renovation.",
    source: "https://tpwd.texas.gov/state-parks/abilene/alert/",
    checkedAt: "2026-10-14",
  },
  "hamilton-pool-preserve": {
    notice: "Swimming is not currently permitted at Hamilton Pool Preserve due to falling-rock hazards. Preserve reservations are for hiking and viewing, not permission to swim.",
    source: "https://drippingspringstx.gov/facilities/facility/details/Hamilton-Pool-Preserve-3",
    checkedAt: "2026-10-17",
  },
};

// These locations have a documented swimming focus, or are specific municipal
// gateways to an established tubing corridor. Adding a place here is not proof
// that it is open on any particular day.
const PRIORITY_SWIM_AND_FLOAT_SLUGS = new Set([
  "new-braunfels", "san-marcos", "bandera",
  "garner-state-park", "guadalupe-river-state-park", "south-llano-river-state-park",
  "blanco-state-park", "inks-lake-state-park", "mckinney-falls-state-park",
  "balmorhea-state-park", "blue-hole-regional-park", "blue-hole-regional-park-wimberley", "blue-hole-wimberley", "barton-springs-pool",
]);

// TPWD's swimming inventory supports state park categorization, but a park's
// specific current alerts ALWAYS override inclusion in that broad inventory.
const TPWD_SWIMMING_PARK_SLUGS = new Set([
  "atlanta-state-park", "blanco-state-park", "bonham-state-park",
  "caprock-canyons-state-park", "cedar-hill-state-park", "choke-canyon-state-park",
  "cleburne-state-park", "colorado-bend-state-park", "cooper-lake-state-park",
  "copper-breaks-state-park", "daingerfield-state-park", "devils-river-state-natural-area",
  "dinosaur-valley-state-park", "eisenhower-state-park", "falcon-state-park",
  "fort-boggy-state-park", "fort-parker-state-park", "fort-richardson-state-park",
  "garner-state-park", "guadalupe-river-state-park", "huntsville-state-park",
  "inks-lake-state-park", "lake-arrowhead-state-park", "lake-bob-sandlin-state-park",
  "lake-brownwood-state-park", "lake-casa-blanca-international-state-park",
  "lake-colorado-city-state-park", "lake-corpus-christi-state-park",
  "lake-livingston-state-park", "lake-mineral-wells-state-park",
  "lake-somerville-state-park", "lake-tawakoni-state-park",
  "lake-whitney-state-park", "lockhart-state-park",
  "martin-creek-lake-state-park", "martin-dies-jr-state-park",
  "mckinney-falls-state-park", "meridian-state-park", "palmetto-state-park",
  "pedernales-falls-state-park", "possum-kingdom-state-park",
  "purtis-creek-state-park", "ray-roberts-lake-state-park",
  "san-angelo-state-park", "south-llano-river-state-park", "tyler-state-park",
  "balmorhea-state-park",
]);

const WATER_SIGNAL = /\b(swim(?:ming)?|spring[- ]fed pool|river tubing|tubing|tube float|float(?:ing| trips?)?|designated swim|(?:wade|wading) (?:allowed|area|areas|access|in|pool|river|creek|water))\b/i;
const RESTRICTION = /\b(no swimming|do not swim|swimming (?:is )?(?:prohibited|not permitted|not allowed|closed|suspended|cancelled|unavailable)|swimming and fishing (?:are )?(?:prohibited|not allowed|not permitted)|pool (?:is )?closed|closed to swimming|no tubing|tubing (?:is )?(?:prohibited|not allowed|closed))\b/i;
const sentences = (text: string) => text.split(/[.!?]+/).map((sentence) => sentence.trim()).filter(Boolean);

export function selectSwimmingHoleAndTubingDestinations(destinations: Destination[]): Destination[] {
  return destinations.filter((destination) => {
    if (SWIM_ACTIVITY_RESTRICTIONS[destination.slug]) return false;
    const isPriority = PRIORITY_SWIM_AND_FLOAT_SLUGS.has(destination.slug);
    const isListedSwimmingPark = destination.category === "state-parks" && TPWD_SWIMMING_PARK_SLUGS.has(destination.slug);
    const isWaterDestination = destination.category === "lakes-rivers" || destination.category === "major-springs";
    if (!isPriority && !isListedSwimmingPark && !isWaterDestination) return false;

    // Current operating restrictions take priority even when a record also
    // discusses the venue's historical swimming uses or other activities.
    const latestNotice = destination.entryNote || "";
    if (sentences(latestNotice).some((sentence) => RESTRICTION.test(sentence))) return false;
    const text = [destination.name, destination.summary, destination.entryNote, destination.bestSeason,
      ...destination.highlights, ...destination.body].filter(Boolean).join(". ");
    const positiveSwimming = sentences(text).some((sentence) => WATER_SIGNAL.test(sentence) && !RESTRICTION.test(sentence));
    // Priority entries still need a positive current swimming claim or to be
    // free from explicit counterevidence. A historic mention alone is not enough.
    return positiveSwimming || (isPriority && !sentences(text).some((sentence) => RESTRICTION.test(sentence)));
  }).sort((a, b) => {
    const aPriority = PRIORITY_SWIM_AND_FLOAT_SLUGS.has(a.slug) ? 0 : 1;
    const bPriority = PRIORITY_SWIM_AND_FLOAT_SLUGS.has(b.slug) ? 0 : 1;
    return aPriority - bPriority || a.name.localeCompare(b.name);
  });
}
