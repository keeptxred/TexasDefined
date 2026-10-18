import { isTexasStateParkDestination } from "./state-park-authority";
import { exploreHeroMap } from "./explore-hero-map";
import { DEVILS_RIVER_LANDSCAPE_IMAGE } from "./verified-devils-river-landscape";
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
  "cooper-lake-state-park": "cooper-lake-south-sulphur-unit-state-park", // Exact Cooper Lake unit photo; caption identifies the photographed unit
  "devils-sinkhole-state-natural-area": "devil-s-sinkhole-state-natural-area", // Exact natural area; licensed photo uses a historical apostrophe-normalization slug
};

function isPlaceholder(src: string): boolean {
  return !src || PLACEHOLDER_MARKERS.some((marker) => src.includes(marker));
}

/** A remote JPEG URL can have the right filename but still bypass our exact-place,
 * locally hosted and attributed park photo. Prefer an approved local map entry
 * when one exists; do not discard remote originals for parks without a match.
 */
function isRemoteHero(src: string): boolean {
  return /^https?:\/\//i.test(src) || src.startsWith("/media/remote?");
}

function mappedHero(slug: string): ImageRef | undefined {
  // Never reuse the generated Devils River photo: the file depicts a millipede.
  if (slug === "devils-river-state-natural-area") return DEVILS_RIVER_LANDSCAPE_IMAGE;
  const direct = stateParkHeroMap[slug] ?? exploreHeroMap[slug];
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
  const parks = destinations.filter((destination) => isTexasStateParkDestination(destination));
  const counts = new Map<string, number>();

  for (const park of parks) {
    if (!isDedicatedStateParkJpeg(park.hero.src)) continue;
    counts.set(park.hero.src, (counts.get(park.hero.src) ?? 0) + 1);
  }

  return destinations.map((destination) => {
    if (!isTexasStateParkDestination(destination)) return destination;
    if (destination.slug === "devils-river-state-natural-area") {
      return { ...destination, hero: DEVILS_RIVER_LANDSCAPE_IMAGE };
    }

    const mapped = mappedHero(destination.slug);
    if (mapped && isRemoteHero(destination.hero.src) && isDedicatedStateParkJpeg(mapped.src)) {
      return { ...destination, hero: mapped };
    }
    const existingIsUnique =
      isDedicatedStateParkJpeg(destination.hero.src) &&
      (counts.get(destination.hero.src) ?? 0) === 1;

    if (existingIsUnique) return destination;

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
  if (destination.slug === "devils-river-state-natural-area" && isTexasStateParkDestination(destination)) {
    return { ...destination, hero: DEVILS_RIVER_LANDSCAPE_IMAGE };
  }
  if (!isTexasStateParkDestination(destination)) return destination;
  const mapped = mappedHero(destination.slug);
  if (mapped && isRemoteHero(destination.hero.src) && isDedicatedStateParkJpeg(mapped.src)) {
    return { ...destination, hero: mapped };
  }
  if (isDedicatedStateParkJpeg(destination.hero.src)) return destination;
  return mapped ? { ...destination, hero: mapped } : destination;
}

/**
 * Recover a park's independently licensed exact-place hero when the shared
 * cross-category image reconciler has assigned a duplicate regional image
 * to an earlier unrelated listing. Never restore a URL already claimed by
 * another page, or claim image provenance for a different park.
 */
export function recoverUniqueParkHeroesAfterGlobalReconciliation(destinations: Destination[]): Destination[] {
  const claimed = new Set(destinations.map((destination) => destination.hero?.src).filter(
    (src): src is string => Boolean(src && !isPlaceholder(src)),
  ));
  return destinations.map((destination) => {
    if (!isTexasStateParkDestination(destination) || !isPlaceholder(destination.hero?.src ?? "")) return destination;
    const verified = mappedHero(destination.slug);
    if (!verified || !isDedicatedStateParkJpeg(verified.src) || claimed.has(verified.src)) return destination;
    claimed.add(verified.src);
    return { ...destination, hero: verified };
  });
}

export function auditStateParkHeroes(destinations: Destination[]) {
  const parks = applyStateParkHeroAssets(destinations).filter((destination) => isTexasStateParkDestination(destination));
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
