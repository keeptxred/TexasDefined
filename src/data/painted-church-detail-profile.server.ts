import { paintedChurchExpansionProfileBySlug } from "./painted-church-profiles-expansion";
import { latestPaintedChurchProfileBySlug } from "./painted-church-profiles-latest";

export function loadPromotedPaintedChurchDetailProfileServer(slug: string) {
  return paintedChurchExpansionProfileBySlug(slug) ?? latestPaintedChurchProfileBySlug(slug);
}
