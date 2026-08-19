// Compatibility shim: canonical additions now live in painted-church-research-additions.ts.
// Keep this export temporarily so older imports do not fork the research source.
import { paintedChurchAdditionResearchBySlug } from "./painted-church-research-additions";

export function additionalPaintedChurchResearchBySlug(slug: string) {
  return paintedChurchAdditionResearchBySlug(slug);
}
