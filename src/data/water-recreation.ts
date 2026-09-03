import type { Destination } from "./types";

const WATER_CATEGORIES = new Set(["lakes-rivers", "major-springs", "state-parks"]);
const WATER_SIGNAL = /\b(swimming holes?|swimming areas?|swimming beach|swim beach|spring[- ]fed pool|river tubing|tubing|tube float|float trips?|float the|floating the|wading|designated swim|swim area|swim in|go swimming|swimming (?:is )?(?:allowed|available|popular))\b/i;
const STRONG_SIGNAL = /\b(swimming holes?|swimming areas?|swimming beach|swim beach|spring[- ]fed pool|river tubing|tubing|float trips?|designated swim|swim area)\b/i;
const RESTRICTION = /\b(no (?:swimming|tubing)|(?:swimming|tubing) (?:is )?(?:prohibited|not permitted)|closed to (?:swimming|tubing))\b/i;
const ORDER: Record<string, number> = { "major-springs": 0, "lakes-rivers": 1, "state-parks": 2 };

export function selectSwimmingHoleAndTubingDestinations(destinations: Destination[]): Destination[] {
  return destinations.filter((destination) => {
    if (!WATER_CATEGORIES.has(destination.category)) return false;
    const text = [destination.name, destination.summary, destination.entryNote, destination.bestSeason, ...destination.highlights, ...destination.body].filter(Boolean).join(" ");
    return WATER_SIGNAL.test(text) && (!RESTRICTION.test(text) || STRONG_SIGNAL.test(text));
  }).sort((left, right) => Number(Boolean(right.featured)) - Number(Boolean(left.featured)) || (ORDER[left.category] ?? 9) - (ORDER[right.category] ?? 9) || left.name.localeCompare(right.name));
}
