import type { Destination } from "./types";

export const SWIMMING_HOLES_RIVER_TUBING_SLUG = "swimming-holes-river-tubing";

const WATER_RECREATION_SOURCE_CATEGORIES = new Set([
  "lakes-rivers",
  "major-springs",
  "state-parks",
]);

const WATER_RECREATION_SIGNAL = /\b(swimming hole|swimming holes|swimming area|swimming areas|swimming beach|swim beach|spring-fed pool|spring fed pool|river tubing|tubing|tube float|float trip|float trips|float the|floating the|wading|designated swim|swim area|swim in|go swimming|swimming is allowed|swimming allowed|swimming available|swimming popular)\b/i;
const STRONG_POSITIVE_SIGNAL = /\b(swimming hole|swimming holes|swimming area|swimming areas|swimming beach|swim beach|spring-fed pool|spring fed pool|river tubing|tubing|float trip|float trips|designated swim|swim area)\b/i;
const ACCESS_RESTRICTION_SIGNAL = /\b(no swimming|no tubing|swimming prohibited|tubing prohibited|swimming is prohibited|tubing is prohibited|swimming not permitted|tubing not permitted|closed to swimming|closed to tubing)\b/i;

function destinationDiscoveryText(destination: Destination): string {
  return [
    destination.name,
    destination.summary,
    destination.entryNote,
    destination.bestSeason,
    ...destination.highlights,
    ...destination.body,
  ].filter(Boolean).join(" ");
}

export function isSwimmingHoleOrTubingDestination(destination: Destination): boolean {
  if (!WATER_RECREATION_SOURCE_CATEGORIES.has(destination.category)) return false;

  const text = destinationDiscoveryText(destination);
  if (!WATER_RECREATION_SIGNAL.test(text)) return false;

  // A destination can mention a restriction in one zone while still offering a
  // designated swim area elsewhere. Keep it only when a stronger positive
  // access signal is also present.
  if (ACCESS_RESTRICTION_SIGNAL.test(text) && !STRONG_POSITIVE_SIGNAL.test(text)) return false;
  return true;
}

export function selectSwimmingHoleAndTubingDestinations(destinations: Destination[]): Destination[] {
  const categoryOrder = new Map([
    ["major-springs", 0],
    ["lakes-rivers", 1],
    ["state-parks", 2],
  ]);

  return destinations
    .filter(isSwimmingHoleOrTubingDestination)
    .sort((left, right) => {
      const featuredDelta = Number(Boolean(right.featured)) - Number(Boolean(left.featured));
      if (featuredDelta) return featuredDelta;
      const categoryDelta = (categoryOrder.get(left.category) ?? 9) - (categoryOrder.get(right.category) ?? 9);
      return categoryDelta || left.name.localeCompare(right.name);
    });
}
