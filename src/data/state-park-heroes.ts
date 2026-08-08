import { exploreHeroMap } from "./explore-hero-map";
import { stateParkHeroMap } from "./state-park-hero-map";
import type { Destination, ImageRef } from "./types";

const PLACEHOLDER_MARKERS = [
  "texasdefined-destination-placeholder",
  "texasdefined-placeholder",
  "data:image/svg+xml",
];

const DESTINATION_PLACEHOLDER = "/images/texasdefined-destination-placeholder.svg";

/** Equivalent imported records may use a state-park category even when the
 * exact, licensed photo was resolved by the broader Explore image pipeline.
 * These aliases only connect records for the same physical destination/unit.
 */
const STATE_PARK_HERO_ALIASES: Record<string, string> = {
  "ray-roberts-lake-isle-du-bois-unit-state-park": "ray-roberts-lake-isle-du-bois-unit",
  "ray-roberts-lake-johnson-branch-unit-state-park": "ray-roberts-lake-johnson-branch-unit",
  "sheldon-lake-state-park-environmental-learning-center": "sheldon-lake-state-park",
};

function isPlaceholder(src: string): boolean {
  return !src || PLACEHOLDER_MARKERS.some((marker) => src.includes(marker));
}

function mappedHero(slug: string): ImageRef | undefined {
  const direct = stateParkHeroMap[slug];
  if (direct) return direct;
  const alias = STATE_PARK_HERO_ALIASES[slug];
  return alias ? exploreHeroMap[alias] ?? stateParkHeroMap[alias] : undefined;
}

export function isDedicatedStateParkJpeg(src: string): boolean {
  if (isPlaceholder(src)) return false;
  return /\.jpe?g(?:$|\?|#)/i.test(src);
}

/**
 * Apply only pre-resolved, static hero assets. No third-party network request
 * is ever made while a State Parks page is rendering.
 *
 * Editorial trust rules:
 *  - a unique existing park-specific JPEG remains preferred;
 *  - duplicate existing hero URLs are rejected for every park sharing them;
 *  - missing/duplicate heroes are replaced only by an exact destination map
 *    or a verified alias for the same physical destination/unit;
 *  - if no dedicated image exists yet, the neutral placeholder remains.
 */
export function applyStateParkHeroAssets(destinations: Destination[]): Destination[] {
  const parks = destinations.filter((destination) => destination.category === "state-parks");
  const counts = new Map<string, number>();

  for (const park of parks) {
    if (!isDedicatedStateParkJpeg(park.hero.src)) continue;
    counts.set(park.hero.src, (counts.get(park.hero.src) ?? 0) + 1);
  }

  return destinations.map((destination) => {
    if (destination.category !== "state-parks") return destination;

    const existingIsUnique =
      isDedicatedStateParkJpeg(destination.hero.src) &&
      (counts.get(destination.hero.src) ?? 0) === 1;

    if (existingIsUnique) return destination;

    const mapped = mappedHero(destination.slug);
    if (mapped) return { ...destination, hero: mapped };

    return {
      ...destination,
      hero: {
        src: DESTINATION_PLACEHOLDER,
        alt: `${destination.name} — park-specific photograph not yet available`,
        width: 1600,
        height: 1067,
      },
    };
  });
}

export function applyStateParkHeroAsset(destination: Destination): Destination {
  if (destination.category !== "state-parks") return destination;
  if (isDedicatedStateParkJpeg(destination.hero.src)) return destination;
  const mapped = mappedHero(destination.slug);
  return mapped ? { ...destination, hero: mapped } : destination;
}

export function auditStateParkHeroes(destinations: Destination[]) {
  const parks = applyStateParkHeroAssets(destinations).filter((destination) => destination.category === "state-parks");
  const jpegParks = parks.filter((destination) => isDedicatedStateParkJpeg(destination.hero.src));
  const duplicateUrls = [
    ...new Set(
      jpegParks
        .map((destination) => destination.hero.src)
        .filter((src, index, all) => all.indexOf(src) !== index),
    ),
  ];

  return {
    total: parks.length,
    jpeg: jpegParks.length,
    missingJpeg: parks
      .filter((destination) => !isDedicatedStateParkJpeg(destination.hero.src))
      .map((destination) => destination.slug),
    duplicateUrls,
  };
}
