import { extraPaintedChurchGalleryBySlug } from "./painted-church-gallery-extra";
import { paintedChurchGalleryBySlug, type PaintedChurchGalleryImage } from "./painted-church-gallery";
import { preindexPaintedChurchGalleryBySlug } from "./painted-church-gallery-preindex";
import { supplementalPaintedChurchGalleryBySlug } from "./painted-church-gallery-supplemental";

export function canonicalPaintedChurchGalleryBySlug(slug: string): PaintedChurchGalleryImage[] {
  return [...new Map([
    ...paintedChurchGalleryBySlug(slug),
    ...extraPaintedChurchGalleryBySlug(slug),
    ...supplementalPaintedChurchGalleryBySlug(slug),
    ...preindexPaintedChurchGalleryBySlug(slug),
  ].map((image) => [image.sourceUrl, image])).values()];
}
