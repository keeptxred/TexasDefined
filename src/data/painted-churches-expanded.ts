import {
  additionalVerifiedPaintedChurches,
  expandedPaintedChurches as legacyExpandedPaintedChurches,
  type CanonicalPaintedChurch,
} from "./painted-churches-expanded-legacy";
import { preindexVerifiedPaintedChurches } from "./painted-churches-preindex-expansion";

export type {
  CanonicalPaintedChurch,
  PaintedChurchClassification,
  PaintedChurchInteriorIntegrity,
  PaintedChurchTechniqueSlug,
} from "./painted-churches-expanded-legacy";
export { additionalVerifiedPaintedChurches };

/**
 * Canonical verified statewide collection.
 * The legacy catalog remains an immutable migration input while new pre-index
 * promotions live in a separate authority layer.
 */
export const expandedPaintedChurches: CanonicalPaintedChurch[] = [
  ...legacyExpandedPaintedChurches,
  ...preindexVerifiedPaintedChurches,
];

export function expandedPaintedChurchBySlug(slug: string) {
  return expandedPaintedChurches.find((church) => church.slug === slug) ?? null;
}
