import type { Destination } from "./types";

const curated: Record<string, Partial<Destination>> = {
  "blue-hole-regional-park-wimberley": {
    summary: "A cypress-shaded swimming hole on Cypress Creek in Wimberley, paired with a community park of trails, lawns and recreation space in the heart of the Hill Country town.",
    nearestTown: "Wimberley",
    bestSeason: "Late spring through early fall for swimming; cooler months for park walks",
    entryNote: "Swimming is seasonal and typically reservation-controlled, and drought can affect operations. Check the City of Wimberley's current swim schedule before traveling.",
    highlights: ["Cypress Creek swimming", "Towering bald cypress trees", "Family-friendly park setting", "Wimberley town access"],
    body: [
      "Blue Hole is a classic Hill Country swimming place where deep shade and clear Cypress Creek water create a markedly cooler atmosphere than the surrounding summer landscape.",
      "The regional park extends beyond the swim area with open lawns and trails, making it useful even when a visit includes more than time in the water.",
      "Swimming capacity is managed and drought can affect operations, so reserve when required and confirm current conditions before building a day around the creek."
    ],
    officialUrl: "https://www.cityofwimberley.com/202/Blue-Hole-Regional-Park"
  }
};

export function applyCuratedDestinationBatch38(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}
