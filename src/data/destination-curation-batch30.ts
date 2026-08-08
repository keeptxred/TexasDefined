import type { Destination } from "./types";

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
  "big-bend-national-park": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gfp-texas-big-bend-national-park-out-of-santa-elena-canyon.jpg?width=1600",
      alt: "The Rio Grande emerging from Santa Elena Canyon with the Chisos Mountains beyond in Big Bend National Park",
      width: 1600,
      height: 1052,
      credit: "Yinan Chen · Public Domain · Wikimedia Commons",
    },
  },
  "guadalupe-mountains-national-park": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Guadalupe_mountains_national_park.jpg?width=1600",
      alt: "Guadalupe Mountains National Park rising above the Chihuahuan Desert in West Texas",
      width: 1600,
      height: 1067,
      credit: "Public Domain · Wikimedia Commons",
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
