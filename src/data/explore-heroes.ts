import caddoLake from "@/assets/caddo-lake.jpg";

import { exploreHeroMap } from "./explore-hero-map";
import type { Destination } from "./types";

const CADD0_LAKE_HERO = {
  src: caddoLake,
  alt: "Bald cypress trees draped in Spanish moss on Caddo Lake at dawn",
  width: 1600,
  height: 1067,
} as const;

const EXPLORE_HERO_SLUG_ALIASES: Record<string, string> = {
  "goliad-state-park-and-historic-site": "goliad-state-park",
  "hueco-tanks-state-park-and-historic-site": "hueco-tanks-state-park",
  "lyndon-b-johnson-state-park-and-historic-site": "lyndon-b-johnson-state-park-historic-site",
  "monument-hill-and-kreische-brewery-state-historic-sites": "monument-hill-kreische-brewery-state-historic-site",
  "ray-roberts-lake-state-park-isle-du-bois-unit": "ray-roberts-lake-isle-du-bois-unit",
  "ray-roberts-lake-state-park-johnson-branch-unit": "ray-roberts-lake-johnson-branch-unit",
  "san-marcos-springs": "san-marcos-springs-spring-lake",
  "seminole-canyon-state-park-and-historic-site": "seminole-canyon-state-park",
};

export function applyExploreHeroAsset(destination: Destination): Destination {
  if (destination.slug === "caddo-lake") {
    return { ...destination, hero: CADD0_LAKE_HERO };
  }
  if (destination.category === "state-parks") return destination;
  const heroSlug = EXPLORE_HERO_SLUG_ALIASES[destination.slug] ?? destination.slug;
  const hero = exploreHeroMap[heroSlug];
  return hero ? { ...destination, hero } : destination;
}

export function applyExploreHeroAssets(destinations: Destination[]): Destination[] {
  return destinations.map(applyExploreHeroAsset);
}
