import type { Destination } from "./types";

// Compatibility layer retained for the Village Creek photography override.
// Big Bend and Guadalupe Mountains hero photography now lives with their
// authoritative destination profiles in batch 44.
const curated: Record<string, Partial<Destination>> = {
  "village-creek-state-park": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cane_Slough_Village_Creek_State_Park_Texas_2023.jpg?width=1600",
      alt: "Cane Slough in Village Creek State Park near Lumberton, Texas",
      width: 1600,
      height: 900,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },
};

export function applyCuratedDestinationBatch30(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch30(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch30);
}
