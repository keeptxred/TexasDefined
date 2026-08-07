import type { Destination, ImageRef } from "./types";

export const DESTINATION_PHOTO_PLACEHOLDER = "/images/texasdefined-destination-placeholder.svg";

export function isDestinationPhotoPlaceholder(src?: string) {
  if (!src) return true;
  return src.includes("texasdefined-destination-placeholder") || src.includes("texasdefined-placeholder");
}

export function missingDestinationHero(destination: Destination): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${destination.name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * A named destination may never borrow another destination's photograph.
 * Within a catalog, every non-placeholder hero source must belong to only one slug.
 * If two different destinations arrive with the same hero source, the later record is
 * intentionally marked photo-missing until a destination-specific image is reconciled.
 */
export function reconcileDestinationHeroes(destinations: Destination[]): Destination[] {
  const ownerByHero = new Map<string, string>();

  return destinations.map((destination) => {
    const src = destination.hero?.src?.trim();
    if (!src || isDestinationPhotoPlaceholder(src)) {
      return { ...destination, hero: missingDestinationHero(destination) };
    }

    const owner = ownerByHero.get(src);
    if (owner && owner !== destination.slug) {
      return { ...destination, hero: missingDestinationHero(destination) };
    }

    ownerByHero.set(src, destination.slug);
    return destination;
  });
}
