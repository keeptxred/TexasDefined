import { paintedChurchAdditionResearchBySlug } from "./painted-church-research-additions";
import { paintedChurchResearchBySlug, type PaintedChurchResearchDossier } from "./painted-church-research";
import { statewidePaintedChurchResearchBySlug } from "./painted-church-research-statewide";

export type { PaintedChurchResearchDossier } from "./painted-church-research";

export function canonicalPaintedChurchResearchBySlug(slug: string): PaintedChurchResearchDossier | undefined {
  return paintedChurchResearchBySlug(slug)
    ?? statewidePaintedChurchResearchBySlug(slug)
    ?? paintedChurchAdditionResearchBySlug(slug);
}
