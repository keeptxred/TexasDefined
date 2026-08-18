export type PaintedChurchImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  license: string;
  sourceUrl: string;
};

export type PaintedChurch = {
  slug: string;
  name: string;
  shortName: string;
  city: string;
  county: string;
  address?: string;
  denomination: string;
  summary: string;
  significance: string;
  visitNote: string;
  sourceUrl: string;
  secondarySourceUrl?: string;
  sourceCheckedAt: string;
  nationalRegister?: {
    referenceNumber: string;
    listed: string;
    multipleProperty: boolean;
  };
  recordedTexasHistoricLandmark?: boolean;
  schulenburgCluster?: boolean;
  image?: PaintedChurchImage;
};

const CHECKED = "2026-08-18";
const THC_MPS = "Churches with Decorative Interior Painting TR";
const CHAMBER_URL = "https://www.schulenburgchamber.org/painted-churches";
const TEXAS_TIME_TRAVEL_URL = "https://texastimetravel.com/directory/painted-churches/";

function commonsImage(
  file: string,
  alt: string,
  width: number,
  height: number,
  credit: string,
  license: string,
): PaintedChurchImage {
  return {
    src: `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`,
    alt,
    width,
    height,
    credit,
    license,
    sourceUrl: `https://commons.wikimedia.org/wiki/File%3A${encodeURIComponent(file).replace(/%20/g, "_")}`,
  };
}

function nr(
  referenceNumber: string,
  listed = "June 21, 1983",
): NonNullable<PaintedChurch["nationalRegister"]> {
  return { referenceNumber, listed, multipleProperty: true };
}

export const paintedChurches: PaintedChurch[] = [
  {
    slug: "high-hill-nativity-of-mary",
    name: "Nativity of Mary, Blessed Virgin Catholic Church",
    shortName: "St. Mary’s at High Hill",
    city: "High Hill",
    county: "Fayette",
    address: "2833 FM 2672, Schulenburg, TX 78956",
    denomination: "Roman Catholic",
    summary: "A Gothic Revival landmark at High Hill whose richly decorated interior helped make the Schulenburg-area painted churches one of Texas’s best-known heritage drives.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group, with statewide significance in art, architecture and religion.`,
    visitNote: "Part of the Schulenburg painted-church cluster. Verify access before traveling because the church remains an active place of worship.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003136",
    secondarySourceUrl: CHAMBER_URL,
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003136"),
    schulenburgCluster: true,
    image: commonsImage(
      "St. Mary Catholic Church in High Hill, Texas.jpg",
      "Exterior of Nativity of Mary, Blessed Virgin Catholic Church in High Hill, Texas",
      576,
      720,
      "Mike Fisher · Wikimedia Commons",
      "CC BY 2.0",
    ),
  },
  {
    slug: "ammannsville-st-john-the-baptist",
    name: "St. John the Baptist Catholic Church",
    shortName: "St. John the Baptist at Ammannsville",
    city: "Ammannsville",
    county: "Fayette",
    address: "7745 Mensik Road, Schulenburg, TX 78956",
    denomination: "Roman Catholic",
    summary: "A celebrated Fayette County painted church known for an unexpectedly ornate interior behind a restrained rural exterior.",
    significance: `A National Register property in the ${THC_MPS} group, recognized for art, architecture and religious history.`,
    visitNote: "One of the six communities promoted by the Schulenburg Chamber for painted-church touring. Check current access before arrival.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003137",
    secondarySourceUrl: CHAMBER_URL,
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003137"),
    schulenburgCluster: true,
    image: commonsImage(
      "St john the baptist ammannsville 2012.jpg",
      "St. John the Baptist Catholic Church in Ammannsville, Texas",
      1800,
      1200,
      "Larry D. Moore · Wikimedia Commons",
      "CC BY 4.0",
    ),
  },
  {
    slug: "praha-st-marys-assumption",
    name: "St. Mary’s Church of the Assumption",
    shortName: "St. Mary’s at Praha",
    city: "Praha",
    county: "Fayette",
    address: "821 FM 1295, Flatonia, TX 78941",
    denomination: "Roman Catholic",
    summary: "Praha’s historic church pairs a Gothic Revival building with decorative painting that turns the nave and ceiling into one of the signature interiors on the painted-church route.",
    significance: `A National Register property in the ${THC_MPS} group, listed for its significance in art, architecture and religion.`,
    visitNote: "On the Schulenburg-area route. The Schulenburg Chamber notes that Praha normally closes earlier on Saturdays; active services and events always take priority.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003138",
    secondarySourceUrl: CHAMBER_URL,
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003138"),
    schulenburgCluster: true,
    image: commonsImage(
      "St marys church of the assumption 2008.jpg",
      "St. Mary’s Church of the Assumption in Praha, Texas",
      2126,
      1658,
      "Larry D. Moore · Wikimedia Commons",
      "CC BY 4.0",
    ),
  },
  {
    slug: "dubina-saints-cyril-methodius",
    name: "Saints Cyril and Methodius Catholic Church",
    shortName: "Saints Cyril and Methodius at Dubina",
    city: "Dubina",
    county: "Fayette",
    address: "FM 1383, Dubina, TX",
    denomination: "Roman Catholic",
    summary: "A Czech-settled rural church whose painted interior, faux finishes and blue-toned ceiling make Dubina an essential stop on the Schulenburg painted-church drive.",
    significance: "Texas Historical Commission travel coverage and the Schulenburg Chamber identify Dubina as one of the defining painted churches of the Fayette County heritage route.",
    visitNote: "Part of the Schulenburg painted-church cluster. Do not confuse this church with the separately listed Saints Cyril and Methodius Church in Shiner.",
    sourceUrl: "https://thc.texas.gov/blog/finding-fayette-county",
    secondarySourceUrl: CHAMBER_URL,
    sourceCheckedAt: CHECKED,
    schulenburgCluster: true,
    image: commonsImage(
      "Sts Cyril & Methodius Catholic Church in Dubina, Texas.jpg",
      "Exterior of Saints Cyril and Methodius Catholic Church in Dubina, Texas",
      815,
      1088,
      "Mike Fisher · Wikimedia Commons",
      "CC BY 2.0",
    ),
  },
  {
    slug: "moravia-ascension-of-our-lord",
    name: "Ascension of Our Lord Catholic Church",
    shortName: "Ascension of Our Lord at Moravia",
    city: "Moravia",
    county: "Lavaca",
    address: "FM 957, Moravia, TX",
    denomination: "Roman Catholic",
    summary: "Moravia’s painted church extends the Schulenburg-area drive into Lavaca County with a richly decorated Late Gothic Revival sanctuary.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group.`,
    visitNote: "The Schulenburg Chamber includes Moravia among its six painted-church communities. Verify doors and service times before making the drive.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003148",
    secondarySourceUrl: CHAMBER_URL,
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003148"),
    schulenburgCluster: true,
    image: commonsImage(
      "Ascension of our Lord Catholic Church, Moravia, Texas.JPG",
      "Ascension of Our Lord Catholic Church in Moravia, Texas",
      3946,
      2630,
      "25or6to4 · Wikimedia Commons",
      "CC BY-SA 3.0",
    ),
  },
  {
    slug: "st-john-texas-st-john-the-baptist",
    name: "St. John the Baptist Catholic Church",
    shortName: "St. John the Baptist at St. John",
    city: "St. John",
    county: "Fayette",
    address: "7026 FM 957, Schulenburg, TX 78956",
    denomination: "Roman Catholic",
    summary: "A small active church in the St. John community that rounds out the six-community painted-church circuit promoted from Schulenburg.",
    significance: "Included by the Schulenburg Chamber in the local painted-church touring cluster, alongside Ammannsville, Dubina, High Hill, Praha and Moravia.",
    visitNote: "This is an active parish and access can vary. Confirm current opening information before traveling.",
    sourceUrl: CHAMBER_URL,
    secondarySourceUrl: "https://www.stjohntexas.org/",
    sourceCheckedAt: CHECKED,
    schulenburgCluster: true,
  },
  {
    slug: "wallis-guardian-angel",
    name: "Church of the Guardian Angel",
    shortName: "Guardian Angel at Wallis",
    city: "Wallis",
    county: "Austin",
    address: "5614 Demel St., Wallis, TX",
    denomination: "Roman Catholic",
    summary: "A Gothic Revival church in Wallis whose decorative interior earned it a place in Texas’s formal National Register painted-interior group.",
    significance: `A National Register property in the ${THC_MPS} group.`,
    visitNote: "Outside the compact Schulenburg loop; plan it as a separate Austin County stop and verify public access before arrival.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003074",
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003074"),
    image: commonsImage(
      "Church of the guardian angel 2008.jpg",
      "Church of the Guardian Angel in Wallis, Texas",
      1750,
      1568,
      "Larry D. Moore · Wikimedia Commons",
      "CC BY 4.0",
    ),
  },
  {
    slug: "wesley-brethren-church",
    name: "Wesley Brethren Church",
    shortName: "Wesley Brethren Church",
    city: "Wesley",
    county: "Austin",
    denomination: "Brethren",
    summary: "A Czech Protestant church near Wesley that shows the painted-church tradition was not limited to Catholic congregations.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group.`,
    visitNote: "A rural Austin County stop. Confirm access before traveling and respect worship or community events in progress.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2079002910",
    secondarySourceUrl: "https://austinpbs.org/paintedchurches/churches",
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("79002910", "January 18, 1979"),
    image: commonsImage(
      "Wesley brethren church 2013.jpg",
      "Wesley Brethren Church in Wesley, Texas",
      2505,
      2004,
      "Larry D. Moore · Wikimedia Commons",
      "CC BY 4.0",
    ),
  },
  {
    slug: "amarillo-first-baptist-church",
    name: "First Baptist Church",
    shortName: "Historic First Baptist at Amarillo",
    city: "Amarillo",
    county: "Potter",
    address: "218 W. 13th St., Amarillo, TX",
    denomination: "Baptist",
    summary: "An Amarillo property in the statewide National Register group that documents decorative church painting well beyond the better-known Central Texas cluster.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group.`,
    visitNote: "This is a statewide heritage entry rather than a Schulenburg-area driving stop. Verify the property’s current visitor status before going.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003158",
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003158"),
  },
  {
    slug: "umbarger-st-marys-catholic-church",
    name: "St. Mary’s Catholic Church",
    shortName: "St. Mary’s at Umbarger",
    city: "Umbarger",
    county: "Randall",
    address: "Pondesetta Road / near US 60, Umbarger, TX",
    denomination: "Roman Catholic",
    summary: "A Panhandle church in Umbarger that demonstrates the statewide reach of Texas’s decorative-interior church tradition.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group.`,
    visitNote: "A Panhandle destination, far outside the Schulenburg cluster. Confirm visitor access locally before traveling.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003159",
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003159"),
    image: commonsImage(
      "St. Mary's (Umbarger, TX) from S 1.JPG",
      "St. Mary’s Catholic Church in Umbarger, Texas",
      1502,
      1720,
      "Ammodramus · Wikimedia Commons",
      "CC0",
    ),
  },
  {
    slug: "paris-first-united-methodist-church",
    name: "First United Methodist Church",
    shortName: "First United Methodist at Paris",
    city: "Paris",
    county: "Lamar",
    address: "322 Lamar St., Paris, TX",
    denomination: "Methodist",
    summary: "A Paris church included in the statewide decorative-interior National Register group, broadening the painted-church story into Northeast Texas.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group.`,
    visitNote: "A statewide heritage stop rather than part of the Schulenburg cluster. Verify current building access before your visit.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003146",
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003146"),
  },
  {
    slug: "lindsay-st-peters-catholic-church",
    name: "St. Peter’s Roman Catholic Church",
    shortName: "St. Peter’s at Lindsay",
    city: "Lindsay",
    county: "Cooke",
    address: "Ash St., Lindsay, TX",
    denomination: "Roman Catholic",
    summary: "A Romanesque Revival church in Lindsay whose decorative interior places North Texas in the statewide painted-church story.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group.`,
    visitNote: "A North Texas stop near Gainesville, separate from the Schulenburg circuit. Verify visitor access before traveling.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2079002927",
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("79002927", "May 25, 1979"),
    image: commonsImage(
      "Lindsay June 2017 1 (St. Peter's Catholic Church).jpg",
      "St. Peter’s Catholic Church in Lindsay, Texas",
      4000,
      6000,
      "Michael Barera · Wikimedia Commons",
      "Creative Commons; see source page",
    ),
  },
  {
    slug: "fredericksburg-st-marys-catholic-church",
    name: "St. Mary’s Catholic Church",
    shortName: "St. Mary’s at Fredericksburg",
    city: "Fredericksburg",
    county: "Gillespie",
    address: "306 W. San Antonio St., Fredericksburg, TX 78624",
    denomination: "Roman Catholic",
    summary: "A prominent Fredericksburg church whose painted and decorated interior connects the Hill Country’s German heritage to the statewide painted-church tradition.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group.`,
    visitNote: "Easy to pair with a Fredericksburg trip, but church services and parish activities take priority over sightseeing.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003143",
    secondarySourceUrl: "https://austinpbs.org/paintedchurches/churches",
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003143"),
    recordedTexasHistoricLandmark: true,
    image: commonsImage(
      "St. Mary's Catholic Church (Fredericksburg, Texas).jpg",
      "St. Mary’s Catholic Church in Fredericksburg, Texas",
      3888,
      2592,
      "Pisi.de · Wikimedia Commons",
      "CC BY 3.0",
    ),
  },
  {
    slug: "sweet-home-queen-of-peace",
    name: "Church of the Blessed Virgin Mary, the Queen of Peace",
    shortName: "Queen of Peace at Sweet Home",
    city: "Sweet Home",
    county: "Lavaca",
    address: "FM 340, Sweet Home, TX",
    denomination: "Roman Catholic",
    summary: "A Lavaca County church included in the National Register’s decorative-interior group and part of the broader Czech and German church-building landscape of South Central Texas.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group.`,
    visitNote: "Plan as a Lavaca County extension rather than part of the compact four-church route. Confirm current access.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003149",
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003149"),
  },
  {
    slug: "st-marys-immaculate-conception-lavaca",
    name: "Church of the Immaculate Conception of Blessed Virgin Mary",
    shortName: "Immaculate Conception at St. Mary’s",
    city: "St. Mary’s",
    county: "Lavaca",
    address: "FM 2672, St. Mary’s, TX",
    denomination: "Roman Catholic",
    summary: "A rural Lavaca County church formally included in the statewide National Register group for decorative interior painting.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group. This is distinct from the Immaculate Conception church at Panna Maria.`,
    visitNote: "A rural heritage stop. Use the exact church name and Lavaca County location when mapping it, and verify access before traveling.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003150",
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003150"),
  },
  {
    slug: "shiner-saints-cyril-methodius",
    name: "Sts. Cyril and Methodius Church",
    shortName: "Saints Cyril and Methodius at Shiner",
    city: "Shiner",
    county: "Lavaca",
    address: "100 St. Ludmilla St., Shiner, TX",
    denomination: "Roman Catholic",
    summary: "Shiner’s Romanesque church combines stained glass and a richly painted interior in one of Lavaca County’s most substantial historic sanctuaries.",
    significance: `Listed in the National Register under the ${THC_MPS} multiple-property group and designated a Recorded Texas Historic Landmark.`,
    visitNote: "Do not confuse this National Register property with the smaller Saints Cyril and Methodius church at Dubina. Check current parish access before visiting.",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003151",
    sourceCheckedAt: CHECKED,
    nationalRegister: nr("83003151"),
    recordedTexasHistoricLandmark: true,
  },
  {
    slug: "serbin-st-paul-lutheran-church",
    name: "St. Paul Lutheran Church",
    shortName: "St. Paul at Serbin",
    city: "Serbin",
    county: "Lee",
    address: "1572 CR 211, Serbin, TX",
    denomination: "Lutheran",
    summary: "A Wendish Lutheran landmark with a distinctive painted interior, balcony-level pulpit and deep ties to the 1854 Serbin settlement.",
    significance: "A Recorded Texas Historic Landmark and one of the best-documented painted-church destinations outside the formal National Register decorative-interior multiple-property group.",
    visitNote: "Pair with the Texas Wendish Heritage Museum when schedules allow. The church remains active; confirm visitor access in advance.",
    sourceUrl: "https://atlas.thc.texas.gov/Details/5287008175",
    secondarySourceUrl: "https://austinpbs.org/paintedchurches/churches",
    sourceCheckedAt: CHECKED,
    recordedTexasHistoricLandmark: true,
    image: commonsImage(
      "Interior of St. Paul Lutheran Church, Serbin, TX.jpg",
      "Painted interior of St. Paul Lutheran Church in Serbin, Texas",
      1936,
      2592,
      "Pete unseth · Wikimedia Commons",
      "CC BY-SA 4.0",
    ),
  },
  {
    slug: "panna-maria-immaculate-conception",
    name: "Immaculate Conception Catholic Church",
    shortName: "Immaculate Conception at Panna Maria",
    city: "Panna Maria",
    county: "Karnes",
    address: "13879 N. FM 81, Panna Maria, TX",
    denomination: "Roman Catholic",
    summary: "The historic church at Panna Maria anchors the oldest permanent Polish settlement in the United States and preserves a striking painted interior within a building completed in 1877.",
    significance: "A Recorded Texas Historic Landmark within the Panna Maria Historic District; Texas heritage sources also identify Panna Maria as a painted-church destination.",
    visitNote: "Farther south than the Schulenburg cluster. Pair it with the Panna Maria Polish heritage sites and confirm church access before traveling.",
    sourceUrl: "https://atlas.thc.texas.gov/Details/5255002619",
    secondarySourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth1861949/m1/9/",
    sourceCheckedAt: CHECKED,
    recordedTexasHistoricLandmark: true,
    image: commonsImage(
      "Panna Maria - Immaculate Conception Church interior.jpg",
      "Painted interior of Immaculate Conception Catholic Church in Panna Maria, Texas",
      1600,
      1200,
      "Luxetowiec · Wikimedia Commons",
      "CC BY-SA 4.0",
    ),
  },
];

export const nationalRegisterDecorativeInteriorChurches = paintedChurches.filter(
  (church) => church.nationalRegister?.multipleProperty,
);

export const schulenburgPaintedChurches = paintedChurches.filter(
  (church) => church.schulenburgCluster,
);

export const schulenburgCoreRouteSlugs = [
  "dubina-saints-cyril-methodius",
  "ammannsville-st-john-the-baptist",
  "high-hill-nativity-of-mary",
  "praha-st-marys-assumption",
] as const;

export const schulenburgCoreRoute = schulenburgCoreRouteSlugs
  .map((slug) => paintedChurches.find((church) => church.slug === slug))
  .filter((church): church is PaintedChurch => Boolean(church));

export function paintedChurchBySlug(slug: string) {
  return paintedChurches.find((church) => church.slug === slug) ?? null;
}

export const paintedChurchSources = {
  nationalRegisterMultipleProperty: "https://atlas.thc.texas.gov/AdvancedSearch/MPS?mpsid=12",
  schulenburgChamber: CHAMBER_URL,
  texasTimeTravel: TEXAS_TIME_TRAVEL_URL,
  austinPbs: "https://austinpbs.org/paintedchurches/churches",
};
