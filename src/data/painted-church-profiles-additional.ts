// Compatibility shim: canonical additions now live in painted-church-profiles-additions.ts.
// Keep this export temporarily so older route imports do not fork the data source.
import { paintedChurchAdditionProfileBySlug } from "./painted-church-profiles-additions";

export function additionalPaintedChurchProfileBySlug(slug: string) {
  return paintedChurchAdditionProfileBySlug(slug);
}
