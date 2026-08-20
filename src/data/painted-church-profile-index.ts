import { authorityPaintedChurchProfileBySlug } from "./painted-church-profiles-authority";
import { finalPaintedChurchProfileBySlug } from "./painted-church-profiles-final";
import { paintedChurchExtendedProfileBySlug } from "./painted-church-profiles-extended";
import { paintedChurchExpansionProfileBySlug } from "./painted-church-profiles-expansion";
import { latestPaintedChurchProfileBySlug } from "./painted-church-profiles-latest";
import { paintedChurchStatewideProfileBySlug } from "./painted-church-profiles-statewide";
import { paintedChurchProfileBySlug } from "./painted-church-profiles";
import { paintedChurchAdditionProfileBySlug } from "./painted-church-profiles-additions";

export type { PaintedChurchProfile } from "./painted-church-profiles";

export function canonicalPaintedChurchProfileBySlug(slug: string) {
  return authorityPaintedChurchProfileBySlug(slug)
    ?? paintedChurchProfileBySlug(slug)
    ?? paintedChurchExtendedProfileBySlug(slug)
    ?? paintedChurchStatewideProfileBySlug(slug)
    ?? finalPaintedChurchProfileBySlug(slug)
    ?? paintedChurchAdditionProfileBySlug(slug)
    ?? paintedChurchExpansionProfileBySlug(slug)
    ?? latestPaintedChurchProfileBySlug(slug);
}
