import { paintedChurches as originalPaintedChurches, type PaintedChurch } from "./painted-churches";

const CHECKED = "2026-08-18";

export type PaintedChurchClassification =
  | "formal-national-register-group"
  | "historical-thematic-nomination-member"
  | "broader-historic-tradition"
  | "modern-decorative-campaign";

export type PaintedChurchInteriorIntegrity =
  | "largely-original"
  | "restored-original-scheme"
  | "reconstructed-from-evidence"
  | "extensively-repainted"
  | "modern-decorative-campaign"
  | "uncertain";

export type PaintedChurchTechniqueSlug =
  | "stenciling"
  | "infill"
  | "freehand"
  | "marbling"
  | "graining"
  | "pouncing"
  | "gilding-metallic-accents"
  | "trompe-loeil-architectural-illusion"
  | "canvas-applied-decoration"
  | "decorative-murals";

export type CanonicalPaintedChurch = PaintedChurch & {
  classification: PaintedChurchClassification;
  interiorIntegrity: PaintedChurchInteriorIntegrity;
  culturalHeritage: string[];
  techniques: PaintedChurchTechniqueSlug[];
  thematicNomination1982?: {
    originalMember: boolean;
    currentThcMpsIndex: boolean;
    note?: string;
  };
};

export const additionalVerifiedPaintedChurches: PaintedChurch[] = [
  {
    slug: "plantersville-st-marys-catholic-church",
    name: "St. Mary’s Catholic Church",
    shortName: "St. Mary’s at Plantersville",
    city: "Plantersville",
    county: "Grimes",
    address: "8227 CR 205, Plantersville, TX",
    denomination: "Roman Catholic",
    summary: "A 1917 Gothic Revival church in Grimes County whose stained glass, painted ceiling and immigrant parish history place it firmly within the broader Painted Churches of Texas tradition.",
    significance: "A Recorded Texas Historic Landmark with German and Polish immigrant roots. THC documents the present 1917 Gothic Revival building; multiple independent sources document its painted ceiling and historic decorative interior.",
    visitNote: "This is an active Catholic church rather than a museum. Verify current parish access before traveling and do not assume that historic-tour access applies during Masses, weddings, funerals or other parish events.",
    sourceUrl: "https://atlas.thc.texas.gov/Details/5185012792",
    secondarySourceUrl: "https://www.ncregister.com/blog/take-a-peek-inside-a-historic-painted-church-of-texas",
    sourceCheckedAt: CHECKED,
    recordedTexasHistoricLandmark: true,
  },
  {
    slug: "corn-hill-holy-trinity-catholic-church",
    name: "Holy Trinity Catholic Church",
    shortName: "Holy Trinity at Corn Hill",
    city: "Corn Hill",
    county: "Williamson",
    address: "8626 FM 1105, Jarrell, TX 76537",
    denomination: "Roman Catholic",
    summary: "A Czech- and Moravian-rooted parish established in 1889, centered on a prominent twin-spired 1913 church whose painted and mural-decorated interior is included in broader modern Painted Churches travel coverage.",
    significance: "A living Central Texas immigrant parish with documented Moravian heritage and a 1913 twin-spired church. Texas Defined treats Corn Hill as part of the broader Painted Churches tradition, not as a member of the THC National Register decorative-interior multiple-property group.",
    visitNote: "The parish remains active and publishes current Masses, bulletins and office contacts. Verify access directly with Holy Trinity before making a special sightseeing trip.",
    sourceUrl: "https://holytrinityofcornhill.org/",
    secondarySourceUrl: "https://www.travellerselixir.com/texas-painted-churches-road-trip/",
    sourceCheckedAt: CHECKED,
  },
  {
    slug: "palestine-sacred-heart-catholic-church",
    name: "Sacred Heart Catholic Church",
    shortName: "Sacred Heart at Palestine",
    city: "Palestine",
    county: "Anderson",
    address: "503 N Queen St., Palestine, TX 75801",
    denomination: "Roman Catholic",
    summary: "A historic Palestine church with a documented religious mural, stained glass and decorative sanctuary, supported by primary-source photographs in the Portal to Texas History and decorative-painting research archives.",
    significance: "A strong broader-tradition Painted Church supported by primary-source interior photographs and the Buie Harwood decorative-painting research archive. Texas Defined does not represent it as part of the THC 1983 decorative-interior multiple-property group.",
    visitNote: "The parish states that the church is not open to the public outside scheduled Mass, Confession and Adoration times. Call or email the parish office ahead for a sightseeing visit.",
    sourceUrl: "https://shpalestine.org/visit",
    secondarySourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth26520/",
    sourceCheckedAt: CHECKED,
  },
  {
    slug: "bandera-st-stanislaus-catholic-church",
    name: "St. Stanislaus Catholic Church",
    shortName: "St. Stanislaus at Bandera",
    city: "Bandera",
    county: "Bandera",
    address: "311 7th St., Bandera, TX 78003",
    denomination: "Roman Catholic",
    summary: "An 1876 native-limestone Polish Catholic church whose modern painted program includes evangelist symbols, Marian imagery, scenes from St. Stanislaus’s life and extensive re-marbleized devotional furnishings.",
    significance: "A Recorded Texas Historic Landmark and one of Texas’s oldest Polish Catholic parishes. The parish itself documents a major painted-interior campaign completed in 2008, so Texas Defined includes it in the broader living Painted Churches tradition while distinguishing the modern decorative campaign from the 19th-century National Register group.",
    visitNote: "This is an active parish. Check current Mass and parish schedules before visiting; worship and parish activities take priority over sightseeing.",
    sourceUrl: "https://www.ststanislausbandera.com/history-of-the-church.html",
    secondarySourceUrl: "https://atlas.thc.texas.gov/Details/5019005081",
    sourceCheckedAt: CHECKED,
    recordedTexasHistoricLandmark: true,
  },
  {
    slug: "corpus-christi-sacred-heart-catholic-church",
    name: "Sacred Heart Catholic Church",
    shortName: "Sacred Heart at Corpus Christi",
    city: "Corpus Christi",
    county: "Nueces",
    address: "1322 Comanche St, Corpus Christi, TX 78401",
    denomination: "Roman Catholic",
    summary: "A South Texas Catholic church whose sanctuary is dominated by monumental true frescoes painted by Mexican American regionalist Antonio E. Garcia during the 1940s.",
    significance: "The Diocese of Corpus Christi, Texas A&M University–Corpus Christi and SAH Archipedia independently document Antonio E. Garcia’s large-scale Sacred Heart frescoes and murals. Texas Defined includes the church in the broader historic Painted Churches tradition, not the formal 1983 decorative-interior multiple-property group.",
    visitNote: "Sacred Heart is an active parish. Use the current parish site for Masses, calendar and contact information and verify sightseeing access before a special trip.",
    sourceUrl: "https://www.sacredheartcorpus.org/",
    secondarySourceUrl: "https://diocesecc.org/news/marker-at-sacred-heart-honors-life-of-catholic-artist",
    sourceCheckedAt: CHECKED,
  },
  {
    slug: "san-antonio-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    shortName: "St. Joseph Downtown San Antonio",
    city: "San Antonio",
    county: "Bexar",
    address: "623 E. Commerce St, San Antonio, TX 78205",
    denomination: "Roman Catholic",
    summary: "A German Catholic Gothic church in downtown San Antonio with historic frescoes and painted religious scenes documented by archival photographs, parish history and the Buie Harwood decorative-painting archive.",
    significance: "The active parish documents its German Catholic founding and Gothic building history; Portal to Texas History photographs identify frescoes on the ceiling and columns; Harwood’s archive includes a dedicated St. Joseph slide group. Texas Defined classifies it in the broader historic Painted Churches tradition rather than the formal THC multiple-property group.",
    visitNote: "The parish welcomes visitors and publishes current Mass, adoration, confession and office information. Verify sightseeing conditions and respect liturgical activity before visiting.",
    sourceUrl: "https://www.stjsa.org/our-parish",
    secondarySourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth460055/",
    sourceCheckedAt: CHECKED,
  },
  {
    slug: "anderson-st-stanislaus-kostka",
    name: "St. Stanislaus Kostka Catholic Church",
    shortName: "St. Stanislaus Kostka at Anderson",
    city: "Anderson",
    county: "Grimes",
    address: "1511 Highway 90 South, Anderson, TX 77830",
    denomination: "Roman Catholic",
    summary: "A 1917 Romanesque Polish Catholic church in Grimes County whose parish history documents surviving historic decorative work, restoration of the original ceiling painting in the sacristy and a later mural above the altar.",
    significance: "The parish’s own historical record documents the original ceiling painting, its restoration, the 2014 altar mural, historic wood-carved altars and European stained glass. Texas Defined therefore includes Anderson in the broader historic Painted Churches tradition while distinguishing original fabric from later decorative additions.",
    visitNote: "St. Stanislaus Kostka remains an active parish. Verify current Masses, events and sightseeing access with the parish before making a special trip.",
    sourceUrl: "https://saintstans.org/church-history",
    secondarySourceUrl: "https://saintstans.org/",
    sourceCheckedAt: CHECKED,
  },
  {
    slug: "castroville-st-louis-catholic-church",
    name: "St. Louis Catholic Church",
    shortName: "St. Louis at Castroville",
    city: "Castroville",
    county: "Medina",
    address: "610 Madrid Street, Castroville, TX 78009",
    denomination: "Roman Catholic",
    summary: "An 1870 limestone Gothic Revival church at the heart of Castroville's Alsatian Catholic community, with a church-documented painted interior and independent decorative-painting research in the Buie Harwood archive.",
    significance: "The active parish publishes its own painted-interior imagery, the Harwood archive includes St. Louis in Texas decorative-painting field research, and the Texas Historical Commission records the church as a 1970 Recorded Texas Historic Landmark. Texas Defined classifies it in the broader historic Painted Churches tradition rather than the formal 1983 decorative-interior group.",
    visitNote: "St. Louis remains an active Castroville parish. Verify current Mass, confession and event schedules before sightseeing; worship takes priority over touring.",
    sourceUrl: "https://www.stlouiscastroville.com/copy-of-about-us",
    secondarySourceUrl: "https://atlas.thc.texas.gov/Details/5325005051",
    sourceCheckedAt: CHECKED,
    recordedTexasHistoricLandmark: true,
  },
  {
    slug: "lacoste-our-lady-of-grace",
    name: "Our Lady of Grace Catholic Church",
    shortName: "Our Lady of Grace at LaCoste",
    city: "La Coste",
    county: "Medina",
    address: "15825 Bexar St., La Coste, TX 78039",
    denomination: "Roman Catholic",
    summary: "A 1911 red-brick Gothic Catholic church in Medina County with a dedicated 21-slide decorative-painting research group in the Buie Harwood archive and a continuing active parish community.",
    significance: "The active parish and Texas Historical Commission independently document the exact 1911 church, while the Buie Harwood archive contains 21 church-specific decorative-painting research slides from 1978. Texas Defined therefore includes LaCoste in the broader historic Painted Churches tradition while leaving authorship, technique and interior-integrity details unresolved until stronger primary evidence is found.",
    visitNote: "Our Lady of Grace is an active parish. Use the official parish site for current Masses, office information and visitor contact, and verify sightseeing access before a special trip.",
    sourceUrl: "https://olgtx.org/about-us",
    secondarySourceUrl: "https://txarchives.org/utaaa/finding_aids/00136.xml",
    sourceCheckedAt: CHECKED,
  },
  {
    slug: "galveston-st-joseph-church",
    name: "St. Joseph's Church",
    shortName: "St. Joseph's at Galveston",
    city: "Galveston",
    county: "Galveston",
    address: "2202 Avenue K, Galveston, TX 77550",
    denomination: "Roman Catholic (historic; preserved by Galveston Historical Foundation)",
    summary: "An 1859–1860 German Catholic wooden Gothic Revival church in Galveston whose painted coffered ceiling, Gothic symbols and faux-grained pews make it the historically missing fifteenth church in the 1982 statewide decorative-interior thematic nomination.",
    significance: "St. Joseph's was individually listed in the National Register in 1976, before the 1982–1983 thematic nomination. The thematic nomination nevertheless explicitly includes the Galveston church among its 15 painted interiors and identifies its pews as the group's only documented example of graining. Texas Defined therefore distinguishes it from the 14 properties surfaced by THC's current Multiple Property Listing index rather than treating the historic 15-count as an unexplained discrepancy.",
    visitNote: "The building is preserved by the Galveston Historical Foundation and is used as a historic site and special-event venue rather than an active parish. Check current public access or event availability with Galveston Historical Foundation before traveling specifically to enter the church.",
    sourceUrl: "https://www.galvestonhistory.org/sites/special-event-venues",
    secondarySourceUrl: "https://atlas.thc.texas.gov/NR/pdfs/76002082/76002082.pdf",
    sourceCheckedAt: "2026-08-19",
    nationalRegister: { referenceNumber: "76002082", listed: "December 13, 1976", multipleProperty: false },
  },
];

const imageOverrides: Partial<Record<string, NonNullable<PaintedChurch["image"]>>> = {
  "shiner-saints-cyril-methodius": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Saints%20Cyril%20and%20Methodius%20Church.JPG",
    alt: "Exterior of Saints Cyril and Methodius Church in Shiner, Texas",
    width: 3713,
    height: 3072,
    credit: "25or6to4 · Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Saints_Cyril_and_Methodius_Church.JPG",
  },
  "sweet-home-queen-of-peace": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Church%20of%20the%20Blessed%20Virgin%20Mary%2C%20the%20Queen%20of%20Peace.JPG",
    alt: "Church of the Blessed Virgin Mary, the Queen of Peace in Sweet Home, Texas",
    width: 4608,
    height: 3072,
    credit: "25or6to4 · Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Church_of_the_Blessed_Virgin_Mary,_the_Queen_of_Peace.JPG",
  },
};

const formal = new Set([
  "wallis-guardian-angel", "wesley-brethren-church", "amarillo-first-baptist-church",
  "umbarger-st-marys-catholic-church", "paris-first-united-methodist-church",
  "moravia-ascension-of-our-lord", "sweet-home-queen-of-peace",
  "st-marys-immaculate-conception-lavaca", "shiner-saints-cyril-methodius",
  "lindsay-st-peters-catholic-church", "high-hill-nativity-of-mary",
  "ammannsville-st-john-the-baptist", "praha-st-marys-assumption",
  "fredericksburg-st-marys-catholic-church",
]);

const historicalThematicMembers = new Set(["galveston-st-joseph-church"]);

const metadata: Record<string, Pick<CanonicalPaintedChurch, "interiorIntegrity" | "culturalHeritage" | "techniques">> = {
  "high-hill-nativity-of-mary": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["German Catholic", "Moravian Czech"], techniques: ["marbling", "stenciling", "gilding-metallic-accents", "trompe-loeil-architectural-illusion", "canvas-applied-decoration"] },
  "ammannsville-st-john-the-baptist": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["Czech Catholic"], techniques: ["stenciling", "infill", "pouncing", "marbling"] },
  "praha-st-marys-assumption": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["Czech Catholic"], techniques: ["freehand", "stenciling", "decorative-murals"] },
  "dubina-saints-cyril-methodius": { interiorIntegrity: "reconstructed-from-evidence", culturalHeritage: ["Czech Catholic"], techniques: ["stenciling", "decorative-murals"] },
  "moravia-ascension-of-our-lord": { interiorIntegrity: "largely-original", culturalHeritage: ["Czech Catholic"], techniques: ["freehand", "stenciling", "marbling", "decorative-murals"] },
  "st-john-texas-st-john-the-baptist": { interiorIntegrity: "uncertain", culturalHeritage: ["Central European Catholic"], techniques: [] },
  "wallis-guardian-angel": { interiorIntegrity: "extensively-repainted", culturalHeritage: ["Czech Catholic"], techniques: ["stenciling", "marbling"] },
  "wesley-brethren-church": { interiorIntegrity: "largely-original", culturalHeritage: ["Czech Protestant", "Moravian"], techniques: ["freehand", "trompe-loeil-architectural-illusion", "decorative-murals"] },
  "amarillo-first-baptist-church": { interiorIntegrity: "uncertain", culturalHeritage: ["Texas Baptist"], techniques: [] },
  "umbarger-st-marys-catholic-church": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["German Catholic", "Italian POW artistic contribution"], techniques: ["freehand", "decorative-murals"] },
  "paris-first-united-methodist-church": { interiorIntegrity: "uncertain", culturalHeritage: ["Texas Methodist"], techniques: [] },
  "lindsay-st-peters-catholic-church": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["German Catholic"], techniques: ["stenciling", "decorative-murals"] },
  "fredericksburg-st-marys-catholic-church": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["German Catholic"], techniques: ["stenciling", "freehand", "gilding-metallic-accents"] },
  "sweet-home-queen-of-peace": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["Czech Catholic"], techniques: ["stenciling", "marbling", "freehand"] },
  "st-marys-immaculate-conception-lavaca": { interiorIntegrity: "uncertain", culturalHeritage: ["Czech and German Catholic"], techniques: [] },
  "shiner-saints-cyril-methodius": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["Czech and German Catholic"], techniques: ["freehand", "decorative-murals", "marbling"] },
  "serbin-st-paul-lutheran-church": { interiorIntegrity: "largely-original", culturalHeritage: ["Wendish Lutheran"], techniques: ["stenciling", "freehand"] },
  "panna-maria-immaculate-conception": { interiorIntegrity: "extensively-repainted", culturalHeritage: ["Polish Catholic"], techniques: ["decorative-murals"] },
  "plantersville-st-marys-catholic-church": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["German Catholic", "Polish Catholic", "German-Russian Catholic"], techniques: ["stenciling", "canvas-applied-decoration", "decorative-murals"] },
  "corn-hill-holy-trinity-catholic-church": { interiorIntegrity: "uncertain", culturalHeritage: ["Czech Catholic", "Moravian Catholic"], techniques: ["decorative-murals"] },
  "palestine-sacred-heart-catholic-church": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["East Texas Catholic"], techniques: ["freehand", "decorative-murals"] },
  "bandera-st-stanislaus-catholic-church": { interiorIntegrity: "modern-decorative-campaign", culturalHeritage: ["Silesian Polish Catholic"], techniques: ["freehand", "marbling", "decorative-murals"] },
  "corpus-christi-sacred-heart-catholic-church": { interiorIntegrity: "largely-original", culturalHeritage: ["Mexican American Catholic", "South Texas regionalist art"], techniques: ["freehand", "decorative-murals"] },
  "san-antonio-st-joseph-catholic-church": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["German Catholic"], techniques: ["freehand", "decorative-murals"] },
  "anderson-st-stanislaus-kostka": { interiorIntegrity: "restored-original-scheme", culturalHeritage: ["Polish Catholic"], techniques: ["freehand", "decorative-murals"] },
  "castroville-st-louis-catholic-church": { interiorIntegrity: "uncertain", culturalHeritage: ["Alsatian Catholic", "French-German frontier Catholic"], techniques: ["decorative-murals"] },
  "lacoste-our-lady-of-grace": { interiorIntegrity: "uncertain", culturalHeritage: ["Medina County Catholic"], techniques: [] },
  "galveston-st-joseph-church": { interiorIntegrity: "uncertain", culturalHeritage: ["German Catholic", "Galveston immigrant heritage"], techniques: ["graining"] },
};

const combined = [
  ...originalPaintedChurches.map((church) => ({ ...church, image: imageOverrides[church.slug] ?? church.image })),
  ...additionalVerifiedPaintedChurches.map((church) => ({ ...church, image: imageOverrides[church.slug] ?? church.image })),
];

export const expandedPaintedChurches: CanonicalPaintedChurch[] = combined.map((church) => {
  const details = metadata[church.slug] ?? { interiorIntegrity: "uncertain" as const, culturalHeritage: [], techniques: [] };
  const classification: PaintedChurchClassification = church.slug === "bandera-st-stanislaus-catholic-church"
    ? "modern-decorative-campaign"
    : formal.has(church.slug)
      ? "formal-national-register-group"
      : historicalThematicMembers.has(church.slug)
        ? "historical-thematic-nomination-member"
        : "broader-historic-tradition";
  return {
    ...church,
    classification,
    thematicNomination1982: formal.has(church.slug)
      ? { originalMember: true, currentThcMpsIndex: true }
      : historicalThematicMembers.has(church.slug)
        ? {
            originalMember: true,
            currentThcMpsIndex: false,
            note: "The 1982 thematic nomination includes St. Joseph's Church in Galveston among the 15 painted churches. It had already been individually listed in 1976, so THC's current Multiple Property Listing index surfaces the 14 properties newly associated with the thematic group rather than this earlier listing.",
          }
        : undefined,
    ...details,
  };
});

export function expandedPaintedChurchBySlug(slug: string) {
  return expandedPaintedChurches.find((church) => church.slug === slug) ?? null;
}
