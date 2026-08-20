import { paintedChurchArchivalImagesBySlug, type PaintedChurchArchivalImageReference } from "./painted-church-archival-images";
import { expansionPaintedChurchArchivalImagesBySlug } from "./painted-church-archival-images-expansion";

export function canonicalPaintedChurchArchivalImagesBySlug(slug: string): PaintedChurchArchivalImageReference[] {
  return [...new Map([
    ...paintedChurchArchivalImagesBySlug(slug),
    ...expansionPaintedChurchArchivalImagesBySlug(slug),
  ].map((item) => [item.url, item])).values()];
}
