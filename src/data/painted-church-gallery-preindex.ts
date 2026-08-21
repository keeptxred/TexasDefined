import type { PaintedChurchGalleryImage } from "./painted-church-gallery";

const commons = (file: string) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;

const gallery: Record<string, PaintedChurchGalleryImage[]> = {
  "palestine-first-presbyterian-church": [
    {
      src: commons("FirstPresbyterianChurch (1 of 1).jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:FirstPresbyterianChurch_(1_of_1).jpg",
      alt: "Exterior of First Presbyterian Church at 410 Avenue A in Palestine, Texas",
      caption: "The 1888 First Presbyterian sanctuary in Palestine, whose city preservation survey documents its hand-painted ceiling and memorial stained glass.",
      width: 858,
      height: 714,
      credit: "Renelibrary · Wikimedia Commons",
      license: "CC BY-SA 4.0",
    },
  ],
  "houston-annunciation-catholic-church": [
    {
      src: commons("Annunciation Church Houston Texas.JPG"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Annunciation_Church_Houston_Texas.JPG",
      alt: "Church of the Annunciation at 1618 Texas Avenue in Houston, Texas",
      caption: "Houston's historic Church of the Annunciation, the continuously used downtown Catholic parish whose layered sacred interior includes a documented Transfiguration dome image and nineteenth-century decorative ensemble.",
      width: 3155,
      height: 4743,
      credit: "Ed Uthman · Wikimedia Commons",
      license: "CC BY 3.0",
    },
  ],
  "galveston-st-joseph-church": [
    {
      src: commons("St. Josephs Church -- Galveston.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:St._Josephs_Church_--_Galveston.jpg",
      alt: "St. Joseph's Church at 2202 Avenue K in Galveston, Texas",
      caption: "Jim Evans's exact-subject photograph documents the 1859–60 German Catholic St. Joseph's Church in Galveston, the individually listed property that resolves the historic fifteen-church thematic study against THC's current fourteen-property MPS interface.",
      width: 2610,
      height: 2418,
      credit: "Jim Evans · Wikimedia Commons",
      license: "CC BY-SA 4.0",
    },
  ],
};

export function preindexPaintedChurchGalleryBySlug(slug: string) {
  return gallery[slug] ?? [];
}
