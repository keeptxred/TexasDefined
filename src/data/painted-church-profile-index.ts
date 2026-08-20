import { authorityPaintedChurchProfileBySlug } from "./painted-church-profiles-authority";
import { finalPaintedChurchProfileBySlug } from "./painted-church-profiles-final";
import { paintedChurchExtendedProfileBySlug } from "./painted-church-profiles-extended";
import { paintedChurchExpansionProfileBySlug } from "./painted-church-profiles-expansion";
import { immaculateHeartOfMaryPaintedChurchProfileBySlug } from "./painted-church-profiles-preindex-ihm";
import { latestPaintedChurchProfileBySlug } from "./painted-church-profiles-latest";
import { preindexPaintedChurchProfileBySlug } from "./painted-church-profiles-preindex";
import { supplementalPreindexPaintedChurchProfileBySlug } from "./painted-church-profiles-preindex-supplemental";
import { paintedChurchStatewideProfileBySlug } from "./painted-church-profiles-statewide";
import { paintedChurchProfileBySlug } from "./painted-church-profiles";
import { paintedChurchAdditionProfileBySlug } from "./painted-church-profiles-additions";

export type { PaintedChurchProfile } from "./painted-church-profiles";

export function canonicalPaintedChurchProfileBySlug(slug: string) {
  return immaculateHeartOfMaryPaintedChurchProfileBySlug(slug)
    ?? preindexPaintedChurchProfileBySlug(slug)
    ?? supplementalPreindexPaintedChurchProfileBySlug(slug)
    ?? authorityPaintedChurchProfileBySlug(slug)
    ?? paintedChurchProfileBySlug(slug)
    ?? paintedChurchExtendedProfileBySlug(slug)
    ?? paintedChurchStatewideProfileBySlug(slug)
    ?? finalPaintedChurchProfileBySlug(slug)
    ?? paintedChurchAdditionProfileBySlug(slug)
    ?? paintedChurchExpansionProfileBySlug(slug)
    ?? latestPaintedChurchProfileBySlug(slug);
}
