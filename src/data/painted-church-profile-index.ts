import { enrichPaintedChurchProfile } from "./painted-church-authority-sources";\nimport { enrichPaintedChurchProfileFromSecondaryResearch } from "./painted-church-secondary-research";
import { finalPaintedChurchProfileBySlug } from "./painted-church-profiles-final";
import { paintedChurchExtendedProfileBySlug } from "./painted-church-profiles-extended";
import { paintedChurchExpansionProfileBySlug } from "./painted-church-profiles-expansion";
import { latestPaintedChurchProfileBySlug } from "./painted-church-profiles-latest";
import { paintedChurchStatewideProfileBySlug } from "./painted-church-profiles-statewide";
import { paintedChurchProfileBySlug } from "./painted-church-profiles";
import { paintedChurchAdditionProfileBySlug } from "./painted-church-profiles-additions";

export type { PaintedChurchProfile } from "./painted-church-profiles";

export function canonicalPaintedChurchProfileBySlug(slug: string) {
  const profile = paintedChurchProfileBySlug(slug)
    ?? paintedChurchExtendedProfileBySlug(slug)
    ?? paintedChurchStatewideProfileBySlug(slug)
    ?? finalPaintedChurchProfileBySlug(slug)
    ?? paintedChurchAdditionProfileBySlug(slug)
    ?? paintedChurchExpansionProfileBySlug(slug)
    ?? latestPaintedChurchProfileBySlug(slug);

  if (!profile) return undefined;\n\n  return enrichPaintedChurchProfileFromSecondaryResearch(enrichPaintedChurchProfile(profile));
}
