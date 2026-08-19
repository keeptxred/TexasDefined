export type PaintedChurchMapPrecision = "exact-property" | "near-property" | "community";

export type PaintedChurchMapPoint = {
  slug: string;
  lat: number;
  lon: number;
  precision: PaintedChurchMapPrecision;
  sourceUrl: string;
  sourceLabel: string;
};

export const paintedChurchMapPoints: PaintedChurchMapPoint[] = [
  { slug: "high-hill-nativity-of-mary", lat: 29.71737, lon: -96.92757, precision: "near-property", sourceUrl: "https://www.loc.gov/item/2014631554/", sourceLabel: "LOC / mapped High Hill church record" },
  { slug: "ammannsville-st-john-the-baptist", lat: 29.787084, lon: -96.858666, precision: "exact-property", sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth28494/", sourceLabel: "Portal to Texas History" },
  { slug: "praha-st-marys-assumption", lat: 29.669485, lon: -97.066698, precision: "exact-property", sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth28454/", sourceLabel: "Portal to Texas History" },
  { slug: "dubina-saints-cyril-methodius", lat: 29.729501, lon: -96.834182, precision: "near-property", sourceUrl: "https://commons.wikimedia.org/wiki/File:Sts_Cyril_%26_Methodius_Catholic_Church_in_Dubina,_Texas.jpg", sourceLabel: "Wikimedia Commons geotagged photograph" },
  { slug: "moravia-ascension-of-our-lord", lat: 29.589681, lon: -96.984983, precision: "community", sourceUrl: "https://www.tshaonline.org/handbook/entries/moravia-tx", sourceLabel: "Handbook of Texas — Moravia" },
  { slug: "st-john-texas-st-john-the-baptist", lat: 29.631346, lon: -96.953316, precision: "community", sourceUrl: "https://www.tshaonline.org/handbook/entries/st-john-tx-fayette-county", sourceLabel: "Handbook of Texas — St. John community" },
  { slug: "wallis-guardian-angel", lat: 29.624516, lon: -96.055182, precision: "exact-property", sourceUrl: "https://texashistory.unt.edu/", sourceLabel: "Portal to Texas History geospatial record" },
  { slug: "wesley-brethren-church", lat: 30.06541, lon: -96.49818, precision: "exact-property", sourceUrl: "https://www.openstreetmap.org/", sourceLabel: "OpenStreetMap church feature" },
  { slug: "amarillo-first-baptist-church", lat: 35.20108, lon: -101.84024, precision: "near-property", sourceUrl: "https://atlas.thc.texas.gov/", sourceLabel: "THC / mapped historic church property" },
  { slug: "umbarger-st-marys-catholic-church", lat: 34.956575, lon: -102.108106, precision: "exact-property", sourceUrl: "https://commons.wikimedia.org/wiki/Category:St._Mary%27s_Catholic_Church_(Umbarger,_Texas)", sourceLabel: "Wikimedia Commons / mapped church property" },
  { slug: "paris-first-united-methodist-church", lat: 33.66099, lon: -95.55307, precision: "exact-property", sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003146", sourceLabel: "Texas Historical Commission / NR property" },
  { slug: "lindsay-st-peters-catholic-church", lat: 33.635969, lon: -97.225564, precision: "near-property", sourceUrl: "https://commons.wikimedia.org/wiki/File:Lindsay_June_2017_1_(St._Peter%27s_Catholic_Church).jpg", sourceLabel: "Wikimedia Commons geotagged photograph" },
  { slug: "fredericksburg-st-marys-catholic-church", lat: 30.276944, lon: -98.876944, precision: "exact-property", sourceUrl: "https://commons.wikimedia.org/wiki/File:St._Mary%27s_Catholic_Church_(Fredericksburg,_Texas).jpg", sourceLabel: "Wikimedia Commons mapped property" },
  { slug: "sweet-home-queen-of-peace", lat: 29.34247, lon: -97.06915, precision: "exact-property", sourceUrl: "https://www.openstreetmap.org/", sourceLabel: "OpenStreetMap church feature" },
  { slug: "st-marys-immaculate-conception-lavaca", lat: 29.44802, lon: -96.99721, precision: "exact-property", sourceUrl: "https://www.wikidata.org/wiki/Q5117962", sourceLabel: "THC-backed Wikidata property coordinate" },
  { slug: "shiner-saints-cyril-methodius", lat: 29.4233, lon: -97.16582, precision: "exact-property", sourceUrl: "https://www.wikidata.org/wiki/Q110001267", sourceLabel: "THC-backed Wikidata property coordinate" },
  { slug: "serbin-st-paul-lutheran-church", lat: 30.114131, lon: -96.988117, precision: "exact-property", sourceUrl: "https://atlas.thc.texas.gov/Details/5287008175", sourceLabel: "Texas Historical Commission UTM property coordinate" },
  { slug: "panna-maria-immaculate-conception", lat: 28.95706, lon: -97.89836, precision: "near-property", sourceUrl: "https://commons.wikimedia.org/wiki/File:Immaculate_conception_catholic_church_2009.jpg", sourceLabel: "Wikimedia Commons geotagged photograph" },
  { slug: "plantersville-st-marys-catholic-church", lat: 30.368732, lon: -95.871284, precision: "exact-property", sourceUrl: "https://atlas.thc.texas.gov/Details/5185012792", sourceLabel: "Texas Historical Commission marker/property coordinate" },
  { slug: "corn-hill-holy-trinity-catholic-church", lat: 30.770781, lon: -97.587843, precision: "near-property", sourceUrl: "https://holytrinityofcornhill.org/contact/", sourceLabel: "Official parish address with mapped church-location cross-check" },
  { slug: "palestine-sacred-heart-catholic-church", lat: 31.762923, lon: -95.634812, precision: "exact-property", sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth26519/", sourceLabel: "Portal to Texas History precise coordinate" },
  { slug: "bandera-st-stanislaus-catholic-church", lat: 29.72083, lon: -99.07528, precision: "exact-property", sourceUrl: "https://atlas.thc.texas.gov/Details/5019005081", sourceLabel: "Recorded Texas Historic Landmark coordinate" },
  { slug: "corpus-christi-sacred-heart-catholic-church", lat: 27.793383, lon: -97.404283, precision: "exact-property", sourceUrl: "https://texashistoricalmarkers.weebly.com/antonio-e-garcia.html", sourceLabel: "Antonio E. Garcia historical marker at 1322 Comanche" },
  { slug: "san-antonio-st-joseph-catholic-church", lat: 29.423539, lon: -98.486431, precision: "exact-property", sourceUrl: "https://www.wikidata.org/wiki/Q17021352", sourceLabel: "THC-backed Wikidata property coordinate" },
  { slug: "anderson-st-stanislaus-kostka", lat: 30.478701, lon: -96.000382, precision: "near-property", sourceUrl: "https://saintstans.org/contact-us-1", sourceLabel: "Official parish address with mapped-address cross-check" },
];

export const paintedChurchMapPointBySlug = new Map(paintedChurchMapPoints.map((point) => [point.slug, point]));
