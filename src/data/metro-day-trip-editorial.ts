import type { MetroProximityResult } from "./metro-proximity";

/**
 * First expansion of curated metro day-trip planning. Entries are editorial
 * leads, never synthetic destination records: a card only renders when the
 * quality-gated, indexable resolved destination is actually in the collection.
 * Sources identify the operator and current access rules; they are not affiliate links.
 * To expand into another city, add its source-backed choices here.
 */
type DayTripChoice = {
  slug: string;
  fit: string;
  why: string;
  check: string;
  sourceUrl: string;
};

const DAY_TRIP_CHOICES: Readonly<Record<string, readonly DayTripChoice[]>> = {
  houston: [
    { slug: "brazos-bend-state-park", fit: "Wildlife and trails", why: "Choose a nature-first day of lakes, birding, wooded trails and opportunities to watch wildlife outside the city.", check: "Check park alerts, day-use reservations and wildlife safety before setting out.", sourceUrl: "https://tpwd.texas.gov/state-parks/brazos-bend" },
    { slug: "galveston-island-state-park", fit: "Beach and bay", why: "Plan a single coastal outing around the beach side or the bay side, with time for birding, fishing or a walk.", check: "Check the Gulf forecast, coastal access and advance day-use passes.", sourceUrl: "https://tpwd.texas.gov/state-parks/galveston-island" },
    { slug: "huntsville-state-park", fit: "Piney Woods escape", why: "Trade freeway traffic for forest trails and lake scenery in the Sam Houston National Forest area.", check: "Verify the park's current trail and water notices and day-use capacity.", sourceUrl: "https://tpwd.texas.gov/state-parks/huntsville" },
  ],
  "san-antonio": [
    { slug: "guadalupe-river-state-park", fit: "River day", why: "Make the Guadalupe River your main stop for shoreline time, nature trails or a picnic rather than trying to pack in multiple parks.", check: "Check river conditions, trail notices and day-use reservations.", sourceUrl: "https://tpwd.texas.gov/state-parks/guadalupe-river" },
    { slug: "blanco-state-park", fit: "Small-town river break", why: "Pair a compact river-park visit with time in Blanco for a relaxed Hill Country outing.", check: "Confirm required advance entry passes and current Blanco River conditions.", sourceUrl: "https://tpwd.texas.gov/state-parks/blanco" },
    { slug: "enchanted-rock-state-natural-area", fit: "Granite dome hike", why: "Center a full day on an exposed granite landscape and its hiking routes rather than assuming it is a casual roadside overlook.", check: "Reserve entry and review weather, heat and trail restrictions.", sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock" },
  ],
  "corpus-christi": [
    { slug: "goose-island-state-park", fit: "Birds, bays and fishing", why: "Head north into the Rockport area for coastal birding, bay views and fishing access; this is not a swimming-beach park.", check: "Verify day-use access, pier and boat-launch conditions before traveling.", sourceUrl: "https://tpwd.texas.gov/state-parks/goose-island" },
    { slug: "lake-corpus-christi-state-park", fit: "Freshwater lake day", why: "Choose the inland option for lakeside recreation, fishing, paddling and Civilian Conservation Corps history.", check: "Review the park's water, boating and swimming guidance and day-use availability.", sourceUrl: "https://tpwd.texas.gov/state-parks/lake-corpus-christi" },
    { slug: "aransas-national-wildlife-refuge", fit: "Wildlife refuge outing", why: "Spend your day exploring coastal wildlife habitat and observation opportunities rather than treating the refuge as a beach resort.", check: "Confirm refuge road access, open trails and seasonal wildlife notices on the federal visitor site.", sourceUrl: "https://www.fws.gov/refuge/aransas/visit-us" },
  ],
};

export const CURATED_METRO_DAY_TRIP_SLUGS = Object.freeze(Object.keys(DAY_TRIP_CHOICES));

export type CuratedMetroDayTrip = DayTripChoice & { result: MetroProximityResult };

export function curatedMetroDayTrips(metroSlug: string, collectionSlug: string, results: readonly MetroProximityResult[]): CuratedMetroDayTrip[] {
  if (collectionSlug !== "day-trips") return [];
  const eligible = new Map(results.map((result) => [result.destination.slug, result]));
  return (DAY_TRIP_CHOICES[metroSlug] ?? []).flatMap((choice) => {
    const result = eligible.get(choice.slug);
    return result ? [{ ...choice, result }] : [];
  });
}
