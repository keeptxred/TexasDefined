import caddoLake from "@/assets/caddo-lake.jpg";

import { exploreHeroMap } from "./explore-hero-map";
import type { Destination } from "./types";

const CADD0_LAKE_HERO = {
  src: caddoLake,
  alt: "Bald cypress trees draped in Spanish moss on Caddo Lake at dawn",
  width: 1600,
  height: 1067,
} as const;

export function applyExploreHeroAsset(destination: Destination): Destination {
  if (destination.slug === "caddo-lake") {
    return { ...destination, hero: CADD0_LAKE_HERO };
  }
  if (destination.category === "state-parks") return destination;
  const hero = exploreHeroMap[destination.slug];
  return hero ? { ...destination, hero } : destination;
}

export function applyExploreHeroAssets(destinations: Destination[]): Destination[] {
  return destinations.map(applyExploreHeroAsset);
}
