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
    summary: "The closest small-town geographic ring for an easy outing. Use the route links for current road mileage and driving time from the metro center.",
    searchIntent: "closest small towns",
    tripFit: "Quick outing or easy day trip",
  },
  "small-towns-2-hours": {
    label: "Mid-range small towns",
    navLabel: "Mid-range small towns",
    titlePrefix: "Small-Town Day Trips From",
    summary: "A middle-distance geographic ring for fuller day trips. Straight-line distance screens the statewide catalog; route links show the current driving reality.",
    searchIntent: "mid-range small-town day trips",
    tripFit: "Fuller day trip",
  },
  "small-towns-3-hours": {
    label: "Farther small-town escapes",
    navLabel: "Farther small towns",
    titlePrefix: "Farther Small-Town Escapes From",
    summary: "The farther small-town geographic ring for long day trips and possible overnights. Use each route link to check current road mileage and driving time before choosing a destination.",
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
