import type { Destination } from "./types";

const WATER_CATEGORY = /^(lakes-rivers|major-springs|state-parks)$/;
const WATER_SIGNAL = /\b(swimming holes?|swimming areas?|swimming beach|swim beach|spring[- ]fed pool|river tubing|tubing|tube float|float trips?|float the|floating the|wading|designated swim|swim area|swim in|go swimming|swimming (?:is )?(?:allowed|available|popular))\b/i;
const STRONG_SIGNAL = /\b(swimming holes?|swimming areas?|swimming beach|swim beach|spring[- ]fed pool|river tubing|tubing|float trips?|designated swim|swim area)\b/i;
const RESTRICTION = /\b(no (?:swimming|tubing)|(?:swimming|tubing) (?:is )?(?:prohibited|not permitted)|closed to (?:swimming|tubing))\b/i;

export function selectSwimmingHoleAndTubingDestinations(destinations: Destination[]): Destination[] {
  return destinations.filter((destination) => {
    if (!WATER_CATEGORY.test(destination.category)) return false;
    const text = [destination.name, destination.summary, destination.entryNote, destination.bestSeason, ...destination.highlights, ...destination.body].filter(Boolean).join(" ");
    return WATER_SIGNAL.test(text) && (!RESTRICTION.test(text) || STRONG_SIGNAL.test(text));
  });
}
