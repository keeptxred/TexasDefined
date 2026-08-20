import { paintedChurchAuthorityFeatures } from "./painted-church-features-authority";
import { paintedChurchPreindexFeatures } from "./painted-church-features-preindex";
import { paintedChurchFeatures, type PaintedChurchFeature } from "./painted-church-features";

/**
 * Canonical read surface for object-level Painted Church features.
 * Existing feature modules remain migration inputs; routes/components should consume
 * this registry so newer authority research cannot be hidden by an older layer.
 */
export const canonicalPaintedChurchFeatures: PaintedChurchFeature[] = [
  ...new Map(
    [...paintedChurchFeatures, ...paintedChurchAuthorityFeatures, ...paintedChurchPreindexFeatures].map((feature) => [feature.id, feature]),
  ).values(),
];

export function canonicalPaintedChurchFeaturesBySlug(slug: string) {
  return canonicalPaintedChurchFeatures.filter((feature) => feature.churchSlug === slug);
}
