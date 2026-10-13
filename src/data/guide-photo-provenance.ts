import { stateParkHeroMap } from "./state-park-hero-map";
import type { ImageRef } from "./types";

/**
 * Credit recovery ONLY for pixel assets already matched, sized and rights-checked
 * by the state-park photograph registry. Never infer license from an unknown URL.
 */
const knownRights = new Map<string, ImageRef>(
  Object.values(stateParkHeroMap).filter((image) =>
    Boolean(image.src && image.credit && image.alt && image.width >= 1200),
  ).map((image) => [image.src, image]),
);

export function recoverKnownGuideImageProvenance(image: ImageRef): ImageRef {
  const matched = knownRights.get(image.src);
  if (!matched || image.credit) return image;
  // Preserve editorial subject description and crop dimensions; recover only
  // the provenance previously verified for this exact local image asset.
  return { ...image, credit: matched.credit };
}
