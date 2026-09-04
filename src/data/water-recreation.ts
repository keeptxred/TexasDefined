import type { Destination } from "./types";

const WATER_CATEGORY = /^(lakes-rivers|major-springs|state-parks)$/;
const TUBING_GATEWAY = /^(new-braunfels|san-marcos|bandera)$/;
const WATER_SIGNAL = /\b(swim(?:ming)?(?: holes?| areas?| beach| in| allowed| available| popular)?|spring[- ]fed pool|river tubing|tubing|tube float|float(?:ing| trips?| the)?|designated swim|(?:wade|wading) (?:allowed|area|areas|access|in|pool|river|creek|water))\b/i;
const RESTRICTION = /\b(no (?:swimming|tubing)|do not swim|(?:swimming|tubing)(?: access)? (?:is )?(?:prohibited|not permitted|not allowed|closed|suspended|cancelled|unavailable)|closed to (?:swimming|tubing))\b/i;
const CURRENT_STATUS_RESTRICTION = /\b(?:(?:swimming|tubing)(?: access)? (?:is )?(?:not permitted|not allowed|closed|suspended|cancelled|unavailable) (?:at this time|until further notice)|(?:swimming|tubing) has not been permitted since|(?:swimming|tubing) is cancelled until further notice)\b/i;
const qualifies = (text: string) => WATER_SIGNAL.test(text) && !RESTRICTION.test(text);
const sentences = (text: string) => text.split(/[.!?]+/).map((sentence) => sentence.trim()).filter(Boolean);

export function selectSwimmingHoleAndTubingDestinations(destinations: Destination[]): Destination[] {
  return destinations.filter((destination) => {
    if (!WATER_CATEGORY.test(destination.category) && !TUBING_GATEWAY.test(destination.slug)) return false;
    if (sentences(destination.entryNote || "").some((sentence) => CURRENT_STATUS_RESTRICTION.test(sentence))) return false;

    const planningSentences = [destination.name, destination.summary, destination.entryNote, destination.bestSeason, ...destination.highlights]
      .filter(Boolean)
      .flatMap((text) => sentences(String(text)));
    const bodySentences = destination.body.flatMap(sentences);
    return [...planningSentences, ...bodySentences].some(qualifies);
  });
}
