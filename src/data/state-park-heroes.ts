import type { Destination } from "./types";

const PLACEHOLDER_MARKERS = [
  "texasdefined-destination-placeholder",
  "texasdefined-placeholder",
  "data:image/svg+xml",
];

export function isDedicatedStateParkJpeg(src: string): boolean {
  if (!src || PLACEHOLDER_MARKERS.some((marker) => src.includes(marker))) return false;
  return /\.jpe?g(?:$|\?)/i.test(src) || /\.jpe?g(?:\?|#|$)/i.test(src);
}

/**
 * State-park hero enrichment must never perform network work in a route loader.
 * The category page can contain roughly one hundred parks; resolving images
 * dynamically from a third-party API makes the entire page depend on dozens of
 * sequential external requests. Park-specific JPEGs are therefore attached
 * ahead of time through the normal Explore media/catalog data instead.
 */
export async function hydrateUniqueStateParkHeroes(destinations: Destination[]): Promise<Destination[]> {
  return destinations;
}

export async function hydrateStateParkHero(destination: Destination): Promise<Destination> {
  return destination;
}

export function auditStateParkHeroes(destinations: Destination[]) {
  const parks = destinations.filter((destination) => destination.category === "state-parks");
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
