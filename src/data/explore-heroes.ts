import { exploreHeroMap } from "./explore-hero-map";
import type { Destination } from "./types";

export function applyExploreHeroAsset(destination: Destination): Destination {
  if (destination.category === "state-parks") return destination;
  const hero = exploreHeroMap[destination.slug];
  return hero ? { ...destination, hero } : destination;
}

export function applyExploreHeroAssets(destinations: Destination[]): Destination[] {
  return destinations.map(applyExploreHeroAsset);
}
