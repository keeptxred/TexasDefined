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
  "high-hill-nativity-of-mary": [
    {
      src: commons("Reverence (5670524189).jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Reverence_(5670524189).jpg",
      alt: "Interior devotional detail at Nativity of Mary Catholic Church in High Hill, Texas",
      caption: "This licensed interior detail from High Hill adds a current visual counterpart to the church's separately documented archival sanctuary records without treating a detail photograph as a complete-room survey.",
      width: 576,
      height: 720,
      credit: "BFS Man (Mike Fisher) · Wikimedia Commons",
      license: "CC BY 2.0",
    },
  ],
  "ammannsville-st-john-the-baptist": [
    {
      src: commons("Holy Holy Holy (5650995094).jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Holy_Holy_Holy_(5650995094).jpg",
      alt: "Painted faux-stone columns and religious icons inside St. John the Baptist Catholic Church in Ammannsville, Texas",
      caption: "Mike Fisher's 2011 Ammannsville interior detail documents one of the church's defining decorative effects: wooden columns painted to resemble stone, alongside religious iconography. The Flickr-origin license was reviewed on Commons and confirmed as CC BY 2.0.",
      width: 720,
      height: 576,
      credit: "BFS Man (Mike Fisher) · Wikimedia Commons",
      license: "CC BY 2.0",
    },
  ],
  "san-antonio-st-joseph-catholic-church": [
    {
      src: commons("San Antonio May 2018 2 (St. Joseph Catholic Church).jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:San_Antonio_May_2018_2_(St._Joseph_Catholic_Church).jpg",
      alt: "Interior of St. Joseph Catholic Church in downtown San Antonio, Texas",
      caption: "Michael Barera's 2018 interior view documents the surviving decorative sanctuary, columns and Gothic interior envelope of St. Joseph in downtown San Antonio.",
      width: 6000,
      height: 4000,
      credit: "Michael Barera · Wikimedia Commons",
      license: "CC BY-SA 4.0",
    },
    {
      src: commons("St Joseph Catholic Church in San Antonio Texas.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:St_Joseph_Catholic_Church_in_San_Antonio_Texas.jpg",
      alt: "Exterior of St. Joseph Catholic Church in downtown San Antonio, Texas",
      caption: "The compact Gothic exterior of St. Joseph survives in the middle of downtown San Antonio's later commercial development.",
      width: 640,
      height: 465,
      credit: "Clipper471 · Wikimedia Commons",
      license: "Public domain — released by author",
    },
  ],
  "panna-maria-immaculate-conception": [
    {
      src: commons("Panna Maria - Immaculate Conception Church interior.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Panna_Maria_-_Immaculate_Conception_Church_interior.jpg",
      alt: "Interior of Immaculate Conception Catholic Church in Panna Maria, Texas",
      caption: "A 2019 interior view of Immaculate Conception at Panna Maria documents the sanctuary, painted surfaces and devotional furnishings of the historic Polish Catholic parish.",
      width: 1600,
      height: 1200,
      credit: "Luxetowiec · Wikimedia Commons",
      license: "CC BY-SA 4.0",
    },
  ],
  "fredericksburg-st-marys-catholic-church": [
    {
      src: commons("Saint Mary Catholic Church Fredericksburg Texas by afc 240916.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Saint_Mary_Catholic_Church_Fredericksburg_Texas_by_afc_240916.jpg",
      alt: "Wide interior view of St. Mary's Catholic Church in Fredericksburg, Texas",
      caption: "Allen F. Corrigan's 2024 interior photograph gives a current wide view of St. Mary's decorative Gothic Revival interior and provides a rights-cleared modern counterpart for archival and preservation research.",
      width: 2486,
      height: 1264,
      credit: "Allen F. Corrigan (Acorrigan1956) · Wikimedia Commons",
      license: "CC BY-SA 4.0",
    },
  ],
};

export function extraPaintedChurchGalleryBySlug(slug: string) {
  return extraGallery[slug] ?? [];
}
