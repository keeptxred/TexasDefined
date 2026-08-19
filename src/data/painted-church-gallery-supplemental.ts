import type { PaintedChurchGalleryImage } from "./painted-church-gallery";

const commons = (file: string) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;

const supplementalGallery: Record<string, PaintedChurchGalleryImage[]> = {
  "dubina-saints-cyril-methodius": [
    {
      src: commons("Interior view of Saints Cyril & Methodius Shrine, Dubina, Texas, US.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Interior_view_of_Saints_Cyril_%26_Methodius_Shrine,_Dubina,_Texas,_US.jpg",
      alt: "Wide interior view of Saints Cyril and Methodius Church in Dubina, Texas",
      caption: "A high-resolution 2023 interior view shows the restored blue decorative field, painted architectural surfaces and full spatial effect of the Dubina sanctuary.",
      width: 6240,
      height: 4160,
      credit: "Clyde Charles Brown · Wikimedia Commons",
      license: "CC BY-SA 4.0",
    },
    {
      src: commons("Altar of Sts. C&M Catholic Church (5650994452).jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Altar_of_Sts._C%26M_Catholic_Church_(5650994452).jpg",
      alt: "Altar area of Saints Cyril and Methodius Catholic Church in Dubina, Texas",
      caption: "A closer altar view documents the devotional focus of Dubina's painted interior and complements the wider nave photographs.",
      width: 844,
      height: 1281,
      credit: "BFS Man / Mike Fisher · Wikimedia Commons",
      license: "CC BY 2.0",
    },
  ],
  "serbin-st-paul-lutheran-church": [
    {
      src: commons("Serbin church facing the rear.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Serbin_church_facing_the_rear.jpg",
      alt: "Rear-facing interior view of St. Paul Lutheran Church in Serbin, Texas",
      caption: "The rear gallery view shows the German inscription, pipe organ, pastor portraits and an image of the Ben Nevis, the ship associated with the Wendish migration to Texas.",
      width: 2439,
      height: 1390,
      credit: "Pete unseth · Wikimedia Commons",
      license: "CC BY-SA 4.0",
    },
  ],
};

export function supplementalPaintedChurchGalleryBySlug(slug: string) {
  return supplementalGallery[slug] ?? [];
}
