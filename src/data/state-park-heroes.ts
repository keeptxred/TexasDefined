import { stateParkHeroMap } from "./state-park-hero-map";
import type { Destination } from "./types";

const PLACEHOLDER_MARKERS = [
  "texasdefined-destination-placeholder",
  "texasdefined-placeholder",
  "data:image/svg+xml",
];

const DESTINATION_PLACEHOLDER = "/images/texasdefined-destination-placeholder.svg";

function isPlaceholder(src: string): boolean {
  return !src || PLACEHOLDER_MARKERS.some((marker) => src.includes(marker));
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
 *  - missing/duplicate heroes are replaced only by that park slug's static map;
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

    const mapped = stateParkHeroMap[destination.slug];
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
  const mapped = stateParkHeroMap[destination.slug];
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
