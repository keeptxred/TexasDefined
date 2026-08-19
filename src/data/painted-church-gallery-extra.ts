import type { PaintedChurchGalleryImage } from "./painted-church-gallery";

const commons = (file: string) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;

const extraGallery: Record<string, PaintedChurchGalleryImage[]> = {
  "serbin-st-paul-lutheran-church": [
    {
      src: commons("Serbin church facing the rear.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Serbin_church_facing_the_rear.jpg",
      alt: "Rear-facing interior view of St. Paul Lutheran Church in Serbin, Texas",
      caption: "Looking toward the rear gallery at Serbin shows the German wall inscription, pipe organ, pastor portraits and a picture of the Ben Nevis, the ship associated with the Wendish settlers' migration to Texas.",
      width: 2439,
      height: 1390,
      credit: "Pete unseth · Wikimedia Commons",
      license: "CC BY-SA 4.0",
    },
  ],
};

export function extraPaintedChurchGalleryBySlug(slug: string) {
  return extraGallery[slug] ?? [];
}
