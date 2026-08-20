export type PaintedChurchMapPrecision = "exact-property" | "near-property" | "community";

export type PaintedChurchMapPoint = {
  slug: string;
  lat: number;
  lon: number;
  precision: PaintedChurchMapPrecision;
  sourceUrl: string;
  sourceLabel: string;
};

const THEMATIC_NOMINATION = "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13";

export const paintedChurchMapPoints: PaintedChurchMapPoint[] = [
  { slug: "high-hill-nativity-of-mary", lat: 29.715596, lon: -96.927270, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "ammannsville-st-john-the-baptist", lat: 29.785140, lon: -96.858405, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "praha-st-marys-assumption", lat: 29.668081, lon: -97.066575, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "dubina-saints-cyril-methodius", lat: 29.729501, lon: -96.834182, precision: "near-property", sourceUrl: "https://commons.wikimedia.org/wiki/File:Sts_Cyril_%26_Methodius_Catholic_Church_in_Dubina,_Texas.jpg", sourceLabel: "Wikimedia Commons geotagged photograph" },
  { slug: "moravia-ascension-of-our-lord", lat: 29.582516, lon: -96.985528, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "st-john-texas-st-john-the-baptist", lat: 29.631346, lon: -96.953316, precision: "community", sourceUrl: "https://www.stjohntexas.org/", sourceLabel: "Official St. John parish address; exact coordinate still pending a primary geospatial record" },
  { slug: "wallis-guardian-angel", lat: 29.623976, lon: -96.056939, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "wesley-brethren-church", lat: 30.063673, lon: -96.498066, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "amarillo-first-baptist-church", lat: 35.199308, lon: -101.839445, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "umbarger-st-marys-catholic-church", lat: 34.954787, lon: -102.107821, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "paris-first-united-methodist-church", lat: 33.657530, lon: -95.549104, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "lindsay-st-peters-catholic-church", lat: 33.634125, lon: -97.226478, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "fredericksburg-st-marys-catholic-church", lat: 30.275228, lon: -98.876378, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "sweet-home-queen-of-peace", lat: 29.340505, lon: -97.068981, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "st-marys-immaculate-conception-lavaca", lat: 29.446179, lon: -96.996886, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "shiner-saints-cyril-methodius", lat: 29.421541, lon: -97.165564, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
  { slug: "serbin-st-paul-lutheran-church", lat: 30.114131, lon: -96.988117, precision: "exact-property", sourceUrl: "https://atlas.thc.texas.gov/Details/5287008175", sourceLabel: "Texas Historical Commission UTM property coordinate" },
  { slug: "panna-maria-immaculate-conception", lat: 28.95706, lon: -97.89836, precision: "near-property", sourceUrl: "https://commons.wikimedia.org/wiki/File:Immaculate_conception_catholic_church_2009.jpg", sourceLabel: "Wikimedia Commons geotagged photograph" },
  { slug: "plantersville-st-marys-catholic-church", lat: 30.368732, lon: -95.871284, precision: "exact-property", sourceUrl: "https://atlas.thc.texas.gov/Details/5185012792", sourceLabel: "Texas Historical Commission marker/property coordinate" },
  { slug: "corn-hill-holy-trinity-catholic-church", lat: 30.770781, lon: -97.587843, precision: "near-property", sourceUrl: "https://holytrinityofcornhill.org/contact/", sourceLabel: "Official parish address with mapped church-location cross-check" },
  { slug: "palestine-sacred-heart-catholic-church", lat: 31.762923, lon: -95.634812, precision: "exact-property", sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth26519/", sourceLabel: "Portal to Texas History precise coordinate" },
  { slug: "bandera-st-stanislaus-catholic-church", lat: 29.72083, lon: -99.07528, precision: "exact-property", sourceUrl: "https://atlas.thc.texas.gov/Details/5019005081", sourceLabel: "Recorded Texas Historic Landmark coordinate" },
  { slug: "corpus-christi-sacred-heart-catholic-church", lat: 27.793383, lon: -97.404283, precision: "exact-property", sourceUrl: "https://texashistoricalmarkers.weebly.com/antonio-e-garcia.html", sourceLabel: "Antonio E. Garcia historical marker at 1322 Comanche" },
  { slug: "san-antonio-st-joseph-catholic-church", lat: 29.423539, lon: -98.486431, precision: "exact-property", sourceUrl: "https://www.wikidata.org/wiki/Q17021352", sourceLabel: "THC-backed Wikidata property coordinate" },
  { slug: "anderson-st-stanislaus-kostka", lat: 30.478701, lon: -96.000382, precision: "near-property", sourceUrl: "https://saintstans.org/contact-us-1", sourceLabel: "Official parish address with mapped-address cross-check" },
  { slug: "castroville-st-louis-catholic-church", lat: 29.356266, lon: -98.878905, precision: "exact-property", sourceUrl: "https://atlas.thc.texas.gov/Details/5325005051", sourceLabel: "Texas Historical Commission RTHL UTM coordinate converted to WGS84" },
  { slug: "lacoste-our-lady-of-grace", lat: 29.315306, lon: -98.812859, precision: "exact-property", sourceUrl: "https://atlas.thc.texas.gov/Details/5507017850", sourceLabel: "Texas Historical Commission historical-marker coordinate" },
  { slug: "galveston-st-joseph-church", lat: 29.297709, lon: -94.790527, precision: "exact-property", sourceUrl: THEMATIC_NOMINATION, sourceLabel: "1982 National Register thematic nomination UTM converted to WGS84" },
];

export const paintedChurchMapPointBySlug = new Map(paintedChurchMapPoints.map((point) => [point.slug, point]));
