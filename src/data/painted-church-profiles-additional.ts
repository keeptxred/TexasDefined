// Compatibility shim: older route imports resolve through the canonical profile index.
// Keep this export temporarily so the public detail route cannot drift from newer profile layers.
import { canonicalPaintedChurchProfileBySlug } from "./painted-church-profile-index";

export function additionalPaintedChurchProfileBySlug(slug: string) {
  return canonicalPaintedChurchProfileBySlug(slug);
}
