import type { MetroProximityCollection } from "./metro-proximity";

export type MetroProximityCollectionPresentation = {
  label: string;
  navLabel: string;
  titlePrefix: string;
  summary: string;
  searchIntent: string;
  tripFit: string | null;
  usesGeographicRing: boolean;
};

const SMALL_TOWN_RING_PRESENTATION: Record<string, Omit<MetroProximityCollectionPresentation, "usesGeographicRing">> = {
  "small-towns-1-hour": {
    label: "Closest small towns",
    navLabel: "Closest small towns",
    titlePrefix: "Closest Small Towns to",
    summary: "Use these closer small towns for an easy outing, lunch stop, historic-square walk or low-friction day trip. Compare what each town is actually good for, then open the live route before you leave.",
    searchIntent: "closest small towns",
    tripFit: "Quick outing or easy day trip",
  },
  "small-towns-2-hours": {
    label: "Mid-range small towns",
    navLabel: "Mid-range small towns",
    titlePrefix: "Small-Town Day Trips From",
    summary: "These are fuller small-town day-trip candidates with enough distance to feel like a change of scene. Compare the reason to go first, then use the live route for current road mileage and travel time.",
    searchIntent: "mid-range small-town day trips",
    tripFit: "Fuller day trip",
  },
  "small-towns-3-hours": {
    label: "Farther small-town escapes",
    navLabel: "Farther small towns",
    titlePrefix: "Farther Small-Town Escapes From",
    summary: "These farther small-town escapes work best when the town itself can anchor a long day or overnight. Compare the experience first, then check the live route and opening hours before committing.",
    searchIntent: "farther small-town escapes",
    tripFit: "Long day trip or overnight",
  },
};

export function metroProximityCollectionPresentation(collection: MetroProximityCollection): MetroProximityCollectionPresentation {
  const override = SMALL_TOWN_RING_PRESENTATION[collection.slug];
  if (override) return { ...override, usesGeographicRing: true };
  return {
    label: collection.label,
    navLabel: collection.navLabel,
    titlePrefix: collection.titlePrefix,
    summary: collection.summary,
    searchIntent: collection.searchIntent,
    tripFit: null,
    usesGeographicRing: false,
  };
}
