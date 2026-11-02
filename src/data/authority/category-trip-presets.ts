import type { CategorySlug, Destination } from "@/data/types";

/**
 * Travel interests and duration are only suggested *form defaults*.
 * They are not operator facts, published itineraries, inventory or claims of
 * ticket/route availability. The existing destination catalog owns places.
 */
export type TripInterest = "hiking" | "camping" | "swimming" | "fishing" | "boating"
  | "birding" | "wildlife" | "history" | "museums" | "food" | "scenic" | "family";
export type VisitorTripDefaults = {
  title: string;
  days: number;
  interests: readonly TripInterest[];
};
type SuggestedTrip = Pick<VisitorTripDefaults, "days" | "interests">;
const byCategory: Partial<Record<CategorySlug, SuggestedTrip>> = {
  "small-towns": { days: 2, interests: ["history", "food", "scenic"] },
  "historic-sites": { days: 1, interests: ["history", "museums"] },
  "state-parks": { days: 1, interests: ["hiking", "wildlife", "scenic"] },
  "national-parks": { days: 2, interests: ["hiking", "wildlife", "scenic"] },
  "lakes-rivers": { days: 1, interests: ["fishing", "boating", "scenic"] },
  "rv-parks": { days: 2, interests: ["camping", "scenic"] },
  "road-trips": { days: 2, interests: ["scenic", "history"] },
  "food-bbq": { days: 1, interests: ["food", "scenic"] },
};
const curatedFredericksburg: Record<string, SuggestedTrip & { title: string }> = {
  "downtown-day": { days: 1, title: "Fredericksburg history and downtown day", interests: ["history", "museums", "food"] },
  "two-night": { days: 3, title: "Fredericksburg wine-country weekend", interests: ["food", "scenic", "history"] },
  "three-day": { days: 3, title: "Fredericksburg outdoors and history", interests: ["scenic", "hiking", "history"] },
};

/** The same canonical planner adapts to every existing destination category. */
export function tripDefaultsForDestination(
  destination: Pick<Destination, "slug" | "name" | "category"> | undefined,
  curatedPlanId?: string,
): VisitorTripDefaults | undefined {
  if (!destination) return undefined;
  if (destination.slug === "fredericksburg" && curatedPlanId && curatedFredericksburg[curatedPlanId])
    return curatedFredericksburg[curatedPlanId];
  const suggestion = byCategory[destination.category];
  if (!suggestion) return undefined;
  return {
    title: destination.name + (suggestion.days === 1 ? " day trip" : " area trip"),
    days: suggestion.days,
    interests: suggestion.interests,
  };
}
