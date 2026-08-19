export type PaintedChurchGalleryImage = {
  src: string;
  sourceUrl: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  credit: string;
  license: string;
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;

const gallery: Record<string, PaintedChurchGalleryImage[]> = {
  "shiner-saints-cyril-methodius": [
    {
      src: commons("Saints Cyril and Methodius Church.JPG"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Saints_Cyril_and_Methodius_Church.JPG",
      alt: "Exterior of Saints Cyril and Methodius Church in Shiner, Texas",
      caption: "The Romanesque Revival church at Shiner, photographed from the exterior.",
      width: 3713,
      height: 3072,
      credit: "25or6to4 · Wikimedia Commons",
      license: "CC BY-SA 3.0",
    },
  ],
  "sweet-home-queen-of-peace": [
    {
      src: commons("Church of the Blessed Virgin Mary, the Queen of Peace.JPG"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Church_of_the_Blessed_Virgin_Mary,_the_Queen_of_Peace.JPG",
      alt: "Church of the Blessed Virgin Mary, the Queen of Peace in Sweet Home, Texas",
      caption: "Queen of Peace at Sweet Home, a National Register property in Lavaca County.",
      width: 4608,
      height: 3072,
      credit: "25or6to4 · Wikimedia Commons",
      license: "CC BY-SA 3.0",
    },
  ],
  "panna-maria-immaculate-conception": [
    {
      src: commons("Immaculate conception catholic church 2009.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Immaculate_conception_catholic_church_2009.jpg",
      alt: "Exterior of Immaculate Conception Catholic Church in Panna Maria, Texas",
      caption: "The 1877 Immaculate Conception church at Panna Maria, shown from the exterior.",
      width: 2431,
      height: 1795,
      credit: "Larry D. Moore · Wikimedia Commons",
      license: "CC BY 4.0",
    },
  ],
  "dubina-saints-cyril-methodius": [
    {
      src: commons("Sts Cyril & Methodius Catholic Church in Dubina, Texas.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sts_Cyril_%26_Methodius_Catholic_Church_in_Dubina,_Texas.jpg",
      alt: "Exterior of Saints Cyril and Methodius Catholic Church in Dubina, Texas",
      caption: "The restrained exterior of the Dubina church gives little indication of the restored blue decorative interior inside.",
      width: 815,
      height: 1088,
      credit: "Mike Fisher · Wikimedia Commons",
      license: "CC BY 2.0",
    },
  ],
  "serbin-st-paul-lutheran-church": [
    {
      src: commons("Interior of St. Paul Lutheran Church, Serbin, TX.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Interior_of_St._Paul_Lutheran_Church,_Serbin,_TX.jpg",
      alt: "Painted interior of St. Paul Lutheran Church in Serbin, Texas",
      caption: "The two-level interior at Serbin, including the painted ceiling, gallery and elevated Lutheran pulpit arrangement.",
      width: 1936,
      height: 2592,
      credit: "Pete unseth · Wikimedia Commons",
      license: "CC BY-SA 4.0",
    },
  ],
};

export function paintedChurchGalleryBySlug(slug: string) {
  return gallery[slug] ?? [];
}
