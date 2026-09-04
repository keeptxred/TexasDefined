import type { Destination } from "./types";

const WATER_CATEGORY = /^(lakes-rivers|major-springs|state-parks)$/;
const WATER_SIGNAL = /\b(swim(?:ming)?(?: holes?| areas?| beach| in| allowed| available| popular)?|spring[- ]fed pool|river tubing|tubing|tube float|float(?:ing| trips?| the)?|wading|designated swim)\b/i;
const RESTRICTION = /\b(no (?:swimming|tubing)|do not swim|(?:swimming|tubing) (?:is )?(?:prohibited|not permitted|not allowed)|closed to (?:swimming|tubing))\b/i;
const qualifies = (text: string) => WATER_SIGNAL.test(text) && !RESTRICTION.test(text);

export function selectSwimmingHoleAndTubingDestinations(destinations: Destination[]): Destination[] {
  return destinations.filter((destination) => {
    if (!WATER_CATEGORY.test(destination.category)) return false;
    const planningText = [destination.name, destination.summary, destination.entryNote, destination.bestSeason, ...destination.highlights].filter(Boolean).join(" ");
    return qualifies(planningText) || destination.body.some((paragraph) => paragraph.split(/[.!?]+/).some(qualifies));
  });
}
