import type { Destination } from "./types";

const curated: Record<string, Partial<Destination>> = {
  "mckinney-falls-state-park": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mckinney_upper_falls.jpg?width=1600",
      alt: "Onion Creek flowing over the limestone Upper Falls at McKinney Falls State Park in Austin",
      width: 1600,
      height: 1172,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },
};

export function applyCuratedDestinationBatch33(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch33(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch33);
}
