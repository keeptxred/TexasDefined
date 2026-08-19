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
  "praha-st-marys-assumption": [
    {
      src: commons("Interior view looking toward apse, St. Mary's Church of the Assumption, Praha, TX.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Interior_view_looking_toward_apse,_St._Mary%27s_Church_of_the_Assumption,_Praha,_TX.jpg",
      alt: "Painted nave and apse inside St. Mary's Church of the Assumption in Praha, Texas",
      caption: "A full nave view toward the apse shows how Praha's painted vault, altars and architectural ornament work together as one interior composition.",
      width: 3024,
      height: 4032,
      credit: "Kyle G. Sweeney · Wikimedia Commons",
      license: "CC BY 4.0",
    },
    {
      src: commons("Interior painting, detail, St. Mary's Church of the Assumption, Praha, TX.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Interior_painting,_detail,_St._Mary%27s_Church_of_the_Assumption,_Praha,_TX.jpg",
      alt: "Trompe-l'oeil painted architectural detail at St. Mary's Church of the Assumption in Praha, Texas",
      caption: "A close view of Praha's painted ornament shows the trompe-l'oeil architectural treatment more clearly than a distant sanctuary view.",
      width: 3024,
      height: 4032,
      credit: "Kyle G. Sweeney · Wikimedia Commons",
      license: "CC BY 4.0",
    },
  ],
  "ammannsville-st-john-the-baptist": [
    {
      src: commons("St john the baptist ammannsville 2012.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:St_john_the_baptist_ammannsville_2012.jpg",
      alt: "St. John the Baptist Catholic Church in Ammannsville, Texas",
      caption: "The present Ammannsville church, whose restrained exterior opens into the distinctive pink painted sanctuary.",
      width: 1800,
      height: 1200,
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
    {
      src: commons("Sts. Cyril & Methodius Interior (5648310340).jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sts._Cyril_%26_Methodius_Interior_(5648310340).jpg",
      alt: "Painted interior of Saints Cyril and Methodius Catholic Church in Dubina, Texas",
      caption: "The Dubina interior shows the blue decorative field and faux-stone painted wood columns that help explain the term 'painted church.'",
      width: 844,
      height: 1281,
      credit: "BFS Man / Mike Fisher · Wikimedia Commons",
      license: "CC BY 2.0",
    },
  ],
  "moravia-ascension-of-our-lord": [
    {
      src: commons("Ascension of our Lord Catholic Church, Moravia, Texas.JPG"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ascension_of_our_Lord_Catholic_Church,_Moravia,_Texas.JPG",
      alt: "Ascension of Our Lord Catholic Church in Moravia, Texas",
      caption: "Ascension of Our Lord at Moravia, a Late Gothic Revival painted church in Lavaca County.",
      width: 3946,
      height: 2630,
      credit: "25or6to4 · Wikimedia Commons",
      license: "CC BY-SA 3.0",
    },
  ],
  "high-hill-nativity-of-mary": [
    {
      src: commons("St. Mary Catholic Church in High Hill, Texas.jpg"),
      sourceUrl: "https://commons.wikimedia.org/wiki/File:St._Mary_Catholic_Church_in_High_Hill,_Texas.jpg",
      alt: "Nativity of Mary, Blessed Virgin Catholic Church in High Hill, Texas",
      caption: "The High Hill exterior conceals one of the most elaborate painted interiors in the Texas collection.",
      width: 576,
      height: 720,
      credit: "Mike Fisher · Wikimedia Commons",
      license: "CC BY 2.0",
    },
  ],
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
