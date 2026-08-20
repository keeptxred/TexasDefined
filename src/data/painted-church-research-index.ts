import { authorityPaintedChurchResearchBySlug } from "./painted-church-research-authority";
import { paintedChurchAdditionResearchBySlug } from "./painted-church-research-additions";
import { paintedChurchExpansionResearchBySlug } from "./painted-church-research-expansion";
import { latestPaintedChurchResearchBySlug } from "./painted-church-research-latest";
import { preindexPaintedChurchResearchBySlug } from "./painted-church-research-preindex";
import { supplementalPreindexPaintedChurchResearchBySlug } from "./painted-church-research-preindex-supplemental";
import { paintedChurchResearchBySlug, type PaintedChurchResearchDossier } from "./painted-church-research";
import { statewidePaintedChurchResearchBySlug } from "./painted-church-research-statewide";

export type { PaintedChurchResearchDossier } from "./painted-church-research";

export function canonicalPaintedChurchResearchBySlug(slug: string): PaintedChurchResearchDossier | undefined {
  return preindexPaintedChurchResearchBySlug(slug)
    ?? supplementalPreindexPaintedChurchResearchBySlug(slug)
    ?? authorityPaintedChurchResearchBySlug(slug)
    ?? paintedChurchResearchBySlug(slug)
    ?? statewidePaintedChurchResearchBySlug(slug)
    ?? paintedChurchAdditionResearchBySlug(slug)
    ?? paintedChurchExpansionResearchBySlug(slug)
    ?? latestPaintedChurchResearchBySlug(slug);
}
