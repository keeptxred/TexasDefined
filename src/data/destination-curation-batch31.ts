import type { Destination } from "./types";

const curated: Record<string, Partial<Destination>> = {
  "port-isabel-lighthouse-state-park": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel,_Texas_Lighthouse.jpg?width=1600",
      alt: "The historic white brick Port Isabel Lighthouse on the lower Texas coast",
      width: 1600,
      height: 1200,
      credit: "Billy D. Wagner · CC BY-SA 4.0 · Wikimedia Commons",
    },
  },
  "garner-state-park": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Garner_state_park.jpg?width=1600",
      alt: "The Frio River winding through Garner State Park below Old Baldy in the Texas Hill Country",
      width: 1600,
      height: 1200,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },
};

export function applyCuratedDestinationBatch31(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch31(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch31);
}
