import type {
  PaintedChurchFact,
  PaintedChurchProfile,
  PaintedChurchSection,
  PaintedChurchSource,
} from "./painted-church-profiles";

export const paintedChurchAuthorityExpansionDate = "2026-09-25";
export const paintedChurchAuthorityExpansionDateLabel = "September 25, 2026";

export type PaintedChurchAuthoritySource = {
  label: string;
  url: string;
  authority: string;
  scope: string;
  contribution: string;
  churchSlugs: string[];
};

export const paintedChurchAuthoritySources: PaintedChurchAuthoritySource[] = [
  {
    label: "National Register — Churches with Decorative Interior Painting thematic nomination",
    url: "https://atlas.thc.texas.gov/NR/pdfs/64000835/64000835.pdf",
    authority: "National Park Service / Texas Historical Commission",
    scope: "Statewide thematic nomination",
    contribution: "Adds church-by-church architectural and decorative descriptions, named craftsmen, techniques and the research framework behind the statewide nomination. It resolves the missing Amarillo decorator attribution and adds richer Paris interior detail.",
    churchSlugs: ["amarillo-first-baptist-church", "paris-first-united-methodist-church"],
  },
  {
    label: "National Archives — Texas Multiple Property Submission finding aid",
    url: "https://nara-media.s3.amazonaws.com/electronic-records/rg-079/NPS_TX/TX_MPSFindingAid.pdf",
    authority: "U.S. National Archives and Records Administration",
    scope: "Federal National Register catalog metadata",
    contribution: "Cross-checks National Register reference numbers, periods, significant dates, architectural classifications and named architects or builders. It adds dated evidence for Wesley and St. Mary's in Lavaca County.",
    churchSlugs: ["wesley-brethren-church", "st-marys-immaculate-conception-lavaca"],
  },
  {
    label: "NPS National Register record — St. John the Baptist, Ammannsville",
    url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003137",
    authority: "National Park Service",
    scope: "Ammannsville",
    contribution: "Confirms the federal listing, Gothic Revival classification, John F. Bujnoch attribution and the NPS digital record's 1917 significant year, which is preserved alongside narrative construction dates rather than silently reconciled.",
    churchSlugs: ["ammannsville-st-john-the-baptist"],
  },
  {
    label: "NPS National Register record — St. Mary's Church of the Assumption, Praha",
    url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003138",
    authority: "National Park Service",
    scope: "Praha",
    contribution: "Confirms O. Kramer, Gothic Revival, the 1895 significant year and federal significance in art, architecture and religion.",
    churchSlugs: ["praha-st-marys-assumption"],
  },
  {
    label: "NPS National Register record — St. Mary's Catholic Church, Fredericksburg",
    url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003143",
    authority: "National Park Service",
    scope: "Fredericksburg",
    contribution: "Confirms Leo M. J. Dielmann and Jacob Wagner, Gothic Revival classification, two periods of significance and significant years 1906, 1908 and 1936.",
    churchSlugs: ["fredericksburg-st-marys-catholic-church"],
  },
  {
    label: "NPS National Register record — First United Methodist Church, Paris",
    url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003146",
    authority: "National Park Service",
    scope: "Paris",
    contribution: "Confirms Van Slyke & Woodruff, the federal revival-style classifications, a 1900–1924 period of significance and 1922 as a significant year.",
    churchSlugs: ["paris-first-united-methodist-church"],
  },
  {
    label: "NPS National Register record — Ascension of Our Lord, Moravia",
    url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003148",
    authority: "National Park Service",
    scope: "Moravia",
    contribution: "Confirms Late Gothic Revival, Koch and Sons in the federal architect field, and significant years 1912, 1913 and 1923.",
    churchSlugs: ["moravia-ascension-of-our-lord"],
  },
  {
    label: "NPS National Register record — Church of the Guardian Angel, Wallis",
    url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003074",
    authority: "National Park Service",
    scope: "Wallis",
    contribution: "Adds the federal metadata layer for the 1913 Gothic Revival church, including Leo M. J. Dielmann and the builder recorded as Mr. Bunch.",
    churchSlugs: ["wallis-guardian-angel"],
  },
  {
    label: "NPS National Register record — St. Peter's Roman Catholic Church, Lindsay",
    url: "https://npgallery.nps.gov/AssetDetail/NRIS/79002927",
    authority: "National Park Service",
    scope: "Lindsay",
    contribution: "Confirms Frank A. Ludewig, Romanesque classification, the 1900–1924 period and significant years 1903 and 1917.",
    churchSlugs: ["lindsay-st-peters-catholic-church"],
  },
  {
    label: "Texas Historical Commission marker — Wesley Brethren Church",
    url: "https://atlas.thc.texas.gov/Details/5477008405",
    authority: "Texas Historical Commission",
    scope: "Wesley",
    contribution: "Adds the 1864 organization by Rev. Joseph Opocensky, 1866 hand-hewn-log construction, ox-cart lumber transport, native-rock and oak foundation, school use until about 1900 and Recorded Texas Historic Landmark status.",
    churchSlugs: ["wesley-brethren-church"],
  },
  {
    label: "St. Mary's Praha — official church tour guidance",
    url: "https://stmaryspraha.org/news/praha-church-tours-pilgramages",
    authority: "Assumption of the Blessed Virgin Mary Parish",
    scope: "Praha visitor access",
    contribution: "Replaces generic regional assumptions with parish-controlled self-guided access windows and the requirement to arrange guided tours at least 24 hours in advance.",
    churchSlugs: ["praha-st-marys-assumption"],
  },
  {
    label: "Immaculate Conception Panna Maria — official parish history",
    url: "https://www.pannamariachurch.com/history",
    authority: "Immaculate Conception of the Blessed Virgin Mary Parish",
    scope: "Panna Maria history",
    contribution: "Adds the founding migration story, nine-week voyage, 1854 first Mass, 1855 first church, its destruction by lightning in 1875, the 1877 present church and the 1937 enlargement.",
    churchSlugs: ["panna-maria-immaculate-conception"],
  },
  {
    label: "Immaculate Conception Panna Maria — official visitor page",
    url: "https://www.pannamariachurch.com/",
    authority: "Immaculate Conception of the Blessed Virgin Mary Parish",
    scope: "Panna Maria current access",
    contribution: "Confirms the current parish location and that visitors are welcome and the church is open daily.",
    churchSlugs: ["panna-maria-immaculate-conception"],
  },
  {
    label: "Queen of Peace Sweet Home — official parish history",
    url: "https://qpcatholicchurch.com/h",
    authority: "Queen of Peace Catholic Church",
    scope: "Sweet Home",
    contribution: "Adds the Catholic community's pre-parish background, the 1895 dance-hall conversion, the 1918 cornerstone and the June 3, 1919 dedication of the brick church as Queen of Peace.",
    churchSlugs: ["sweet-home-queen-of-peace"],
  },
  {
    label: "Guardian Angel Wallis — official parish contact and access",
    url: "https://guardianangelwallis.org/contact-us",
    authority: "Guardian Angel Catholic Church / Archdiocese of Galveston-Houston",
    scope: "Wallis current access",
    contribution: "Adds parish-controlled visitor information: the church and grotto are currently open for private prayer daily from 8 a.m. to 4 p.m., subject to parish use.",
    churchSlugs: ["wallis-guardian-angel"],
  },
  {
    label: "City of Lindsay — St. Peter visitor information",
    url: "https://lindsay.texas.gov/visitor-info/things-to-do/",
    authority: "City of Lindsay",
    scope: "Lindsay restoration and visitor context",
    contribution: "Adds a municipal cross-check that St. Peter has undergone two major restorations and records the city's public-access summary. Current parish rules still control Mass, Adoration, group tours and photography.",
    churchSlugs: ["lindsay-st-peters-catholic-church"],
  },
  {
    label: "Archdiocese of San Antonio — Our Lady of Grace pilgrimage history",
    url: "https://archsa.org/jubilee2025/pilgrimage-sites/",
    authority: "Archdiocese of San Antonio",
    scope: "La Coste chronology, decoration and preservation",
    contribution: "Documents the 1924 sanctuary, sacristy and bell-tower additions, a 1947 interior-decoration campaign, later altar murals and the preservation practice of repainting earlier ceiling-wall icons onto removable boards.",
    churchSlugs: ["lacoste-our-lady-of-grace"],
  },
  {
    label: "Texas Architect — Painted Churches, May/June 2014",
    url: "https://magazine.texasarchitects.org/issue/may-june-2014/",
    authority: "Texas Society of Architects",
    scope: "Architectural typology and Dubina case study",
    contribution: "Adds professional architectural description of Dubina as a Carpenter Gothic, basilican three-aisle church with tall pointed-arch windows, a steep gabled roof and a two-stage tower, while situating marbling, stenciling, graining and trompe-l'oeil within the statewide tradition.",
    churchSlugs: ["dubina-saints-cyril-methodius"],
  },
  {
    label: "First Baptist Amarillo — official church history",
    url: "https://www.firstamarillo.org/our-history",
    authority: "First Baptist Church of Amarillo",
    scope: "Amarillo congregation and 1930 building chronology",
    contribution: "Adds the congregation's own chronology: sixteen charter members organized in September 1889, the present building program was approved in 1926 at a planned cost of $500,000, and the building was dedicated August 3, 1930.",
    churchSlugs: ["amarillo-first-baptist-church"],
  },
  {
    label: "Texas Highways — Bohemian Rhapsody: Fayette County Czech culture",
    url: "https://texashighways.com/culture/bohemian-rhapsody-fayette-county-czech-culture/",
    authority: "Texas Highways",
    scope: "Living Czech cultural context around the Fayette County churches",
    contribution: "Adds the living cultural layer around the churches: parish picnics function as reunions and community fairs where worship, Czech food, polka music and dancing continue alongside the preserved buildings.",
    churchSlugs: ["high-hill-nativity-of-mary", "praha-st-marys-assumption", "dubina-saints-cyril-methodius", "ammannsville-st-john-the-baptist"],
  },
  {
    label: "Handbook of Texas — High Hill",
    url: "https://www.tshaonline.org/handbook/entries/high-hill-tx",
    authority: "Texas State Historical Association",
    scope: "High Hill settlement and community history",
    contribution: "Adds the settlement's roots in Blum Hill and Oldenburg and documents a Turnverein, private schools, dramatic players, and a Männer choir and orchestra, placing St. Mary's inside a much broader German and Austrian-Moravian cultural landscape.",
    churchSlugs: ["high-hill-nativity-of-mary"],
  },
  {
    label: "Handbook of Texas — Serbin",
    url: "https://www.tshaonline.org/handbook/entries/serbin-tx",
    authority: "Texas State Historical Association",
    scope: "Serbin settlement geography and institutional history",
    contribution: "Adds the 1855 purchase of about 4,000 acres for the Wendish colony, the congregation's 95-acre church-and-school tract and the change from Low Pin Oak Settlement to Serbin when the post office opened in 1860.",
    churchSlugs: ["serbin-st-paul-lutheran-church"],
  },
  {
    label: "Handbook of Texas — Panna Maria",
    url: "https://www.tshaonline.org/handbook/entries/panna-maria-tx",
    authority: "Texas State Historical Association",
    scope: "Panna Maria community and twentieth-century Polish heritage",
    contribution: "Adds the 1966 Polish millennium gathering and President Lyndon B. Johnson's gift of Jan E. Krantz's 12,000-piece Virgin of Częstochowa mosaic, which the Handbook records as permanently displayed in the church.",
    churchSlugs: ["panna-maria-immaculate-conception"],
  },
  {
    label: "Handbook of Texas — Wends",
    url: "https://www.tshaonline.org/handbook/entries/wends",
    authority: "Texas State Historical Association",
    scope: "Wendish migration and St. Paul's institutional context",
    contribution: "Adds the migration's severe human cost—seventy-three deaths aboard the Ben Nevis after a cholera outbreak—and identifies St. Paul's as the first Missouri Synod Lutheran church founded in Texas.",
    churchSlugs: ["serbin-st-paul-lutheran-church"],
  },
  {
    label: "Handbook of Texas — John Kilian",
    url: "https://www.tshaonline.org/handbook/entries/kilian-john",
    authority: "Texas State Historical Association",
    scope: "Rev. John Kilian biography",
    contribution: "Adds Kilian's bilingual Wendish-German background, literary and hymn work, status as the first Missouri Synod pastor in Texas, thirty-year Serbin pastorate and twelve years teaching the parish school.",
    churchSlugs: ["serbin-st-paul-lutheran-church"],
  },
  {
    label: "Handbook of Texas — Leopold Moczygemba",
    url: "https://www.tshaonline.org/handbook/entries/moczygemba-leopold",
    authority: "Texas State Historical Association",
    scope: "Polish migration leadership and Panna Maria memorial landscape",
    contribution: "Adds Moczygemba's wider migration role and the 1974 reinterment of his remains beneath the Panna Maria oak associated with the first immigrants' Christmas 1854 Mass.",
    churchSlugs: ["panna-maria-immaculate-conception", "bandera-st-stanislaus-catholic-church"],
  },
  {
    label: "City of Bandera — community history",
    url: "https://www.banderatx.gov/community",
    authority: "City of Bandera",
    scope: "Bandera Polish settlement",
    contribution: "Adds the municipal record that sixteen Polish families arrived in Bandera in 1855 to work at the cypress mill, sharpening the founding-community context for St. Stanislaus.",
    churchSlugs: ["bandera-st-stanislaus-catholic-church"],
  },
  {
    label: "St. Paul Lutheran School — Serbin history",
    url: "https://www.stpaulserbinschool.org/our-school-a-brief-history",
    authority: "St. Paul Lutheran School, Serbin",
    scope: "Church-school complex and surviving building fabric",
    contribution: "Adds physical details of the 1871 church—thirty-inch red-sandstone walls rising twenty-four feet—and records that the tower's metal ball contains a history of Serbin.",
    churchSlugs: ["serbin-st-paul-lutheran-church"],
  },
  {
    label: "Wendish Research Exchange — Spirit of the Wends",
    url: "https://wendishresearch.org/2017/09/29/spirit-of-the-wends/",
    authority: "Wendish Research Exchange",
    scope: "Serbin material culture and interior details",
    contribution: "Adds interior material-culture details: original gilded kerosene chandeliers adapted to electricity, wooden columns feather-painted to resemble marble and an engraved Serbin history placed in the tower ball.",
    churchSlugs: ["serbin-st-paul-lutheran-church"],
  },
  {
    label: "SAH Archipedia — San Fernando Cathedral",
    url: "https://sah-archipedia.org/buildings/TX-01-SA46",
    authority: "Society of Architectural Historians / University of Virginia Press",
    scope: "San Fernando architectural chronology and restoration",
    contribution: "Adds a 2003 interior-restoration date and an important scope limit for the candidate record: the eighteenth-century core is described as restored to mission-like simplicity with plain whitewashed walls, so decorative-paint evidence must be localized to later fabric before promotion.",
    churchSlugs: [],
  },
];

type AuthorityEnrichment = {
  overrides?: Partial<Pick<PaintedChurchProfile, "quickAnswer" | "builtYear" | "paintedYear" | "architecture" | "architect" | "builder" | "artists" | "heritage">>;
  facts?: PaintedChurchFact[];
  history?: PaintedChurchSection[];
  paintings?: PaintedChurchSection[];
  preservation?: PaintedChurchSection[];
  visitorNotes?: string[];
  sources?: PaintedChurchSource[];
};

const THEME_NOMINATION = paintedChurchAuthoritySources[0]!;
const NARA_MPS = paintedChurchAuthoritySources[1]!;

const enrichments: Record<string, AuthorityEnrichment> = {
  "amarillo-first-baptist-church": {
    overrides: {
      quickAnswer: "Historic First Baptist Church in Amarillo is a 1929–1930 Panhandle church in the National Register's statewide decorative-interior group. The federal thematic nomination identifies J. Carlander as architect and the Schnoor Company as interior craftsman, resolving a major gap in the earlier public profile. Its decoration uses restrained Art Nouveau-like plant motifs, painted linework, marble effects and colored architectural surfaces rather than the dense Central European iconography associated with the Schulenburg cluster.",
      builtYear: 1930,
      artists: ["Schnoor Company", "J. Charles Schnoor"],
    },
    facts: [
      { label: "Construction campaign", value: "1929–1930; the National Register thematic nomination identifies those as the specific dates" },
      { label: "Interior craftsman", value: "Schnoor Company; contemporary 1930 reporting identifies artist J. Charles Schnoor" },
      { label: "Dedication", value: "The new church was formally dedicated in August 1930" },
      { label: "Decorative character", value: "Art Nouveau-like plant motifs, dashed-line outlining, marble-like backgrounds and marbled columns are documented in the nomination" },
    ],
    history: [
      {
        heading: "The 1930 sanctuary can now be tied to a named decorative firm",
        paragraphs: [
          "The 1983 federal thematic nomination fills an important gap in the Amarillo record. It identifies the present historic church as a 1929–1930 project by architect J. Carlander and names the Schnoor Company as the interior craftsman. Contemporary Amarillo reporting from the 1930 dedication identifies J. Charles Schnoor with the church's murals and interior decoration.",
          "This makes Amarillo more than a designation-only entry: it is a documented Protestant example of professional decorative church painting in the Texas Panhandle, showing that the statewide tradition extended well beyond Czech and German Catholic communities.",
        ],
      },
    ],
    paintings: [
      {
        heading: "Art Nouveau-like ornament and painted architectural effects",
        paragraphs: [
          "The nomination describes restrained curvilinear plant motifs, dashed outlines, marble-like background effects and marbled columns. In the foyer, blue-green wall color and decorative motifs work with barrel and cross vaults to create a composed entrance sequence before the main auditorium.",
          "Those details are important because they distinguish Amarillo's program from mural-heavy churches elsewhere in Texas. The historic effect came from an integrated system of painted pattern, surface imitation and architectural color as well as figurative work.",
        ],
      },
    ],
    sources: [
      { label: THEME_NOMINATION.label, url: THEME_NOMINATION.url },
    ],
  },

  "paris-first-united-methodist-church": {
    facts: [
      { label: "NPS significant year", value: "1922, within a 1900–1924 federal period of significance" },
      { label: "Federal style metadata", value: "Colonial Revival, Late 19th and 20th Century Revivals, and Other" },
      { label: "Decorative vocabulary", value: "Historic nomination material documents stenciled foliage, lily-like Art Nouveau ornament, cross motifs and painted bands around windows and balcony areas" },
    ],
    paintings: [
      {
        heading: "Stenciling around the dome, windows and balcony",
        paragraphs: [
          "The thematic nomination adds detail beyond the better-known stained-glass ceiling. It records stylized foliage and lily-like ornament near the dome transition, broken-line stencil patterns around large arched windows, and decorative crests and cross motifs along balcony areas.",
          "The result is an urban Protestant counterpart to the rural painted churches: repeated stencil systems, glass and Classical Revival architecture combine into the decorative program rather than relying on one narrative mural cycle.",
        ],
      },
    ],
    sources: [
      { label: "NPS National Register record — First United Methodist Church", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003146" },
      { label: THEME_NOMINATION.label, url: THEME_NOMINATION.url },
    ],
  },

  "ammannsville-st-john-the-baptist": {
    facts: [
      { label: "NPS digital significant year", value: "1917; this is retained as federal catalog metadata alongside narrative sources that place replacement construction in 1918–1919" },
      { label: "Federal architectural classification", value: "Gothic Revival / Other; architect John F. Bujnoch" },
    ],
    preservation: [
      {
        heading: "A federal date discrepancy is preserved, not hidden",
        paragraphs: [
          "The NPS digital record flags 1917 as the significant year, while church-history and architectural narratives place the present replacement building in the 1918–1919 rebuilding campaign after the 1917 fire. Texas Defined keeps both pieces of evidence visible rather than forcing them into a single unsupported date.",
        ],
      },
    ],
    sources: [
      { label: "National Park Service National Register record", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003137" },
    ],
  },

  "praha-st-marys-assumption": {
    facts: [
      { label: "NPS significant year", value: "1895; Gothic Revival; architect O. Kramer" },
      { label: "Current self-guided access", value: "Parish guidance publishes day-specific tour windows and asks guided groups to arrange an appointment at least 24 hours ahead" },
    ],
    visitorNotes: [
      "The parish's own current tour notice should control over older regional guidance: self-guided access is published for Monday–Wednesday 8 a.m.–5 p.m., Thursday 8 a.m.–3 p.m., Friday 8 a.m.–5 p.m., Saturday 8 a.m.–noon and Sunday 10 a.m.–5 p.m. Verify the notice again before travel because parish events can supersede posted hours.",
      "For a guided tour or pilgrimage, the parish asks visitors to call at least 24 hours in advance.",
    ],
    sources: [
      { label: "National Park Service National Register record", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003138" },
      { label: "St. Mary's Praha — official church tour guidance", url: "https://stmaryspraha.org/news/praha-church-tours-pilgramages" },
    ],
  },

  "fredericksburg-st-marys-catholic-church": {
    facts: [
      { label: "NPS significant years", value: "1906, 1908 and 1936; federal periods of significance span 1900–1924 and 1925–1949" },
      { label: "Federal architect record", value: "Leo M. J. Dielmann and Jacob Wagner" },
    ],
    sources: [
      { label: "National Park Service National Register record", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003143" },
    ],
  },

  "moravia-ascension-of-our-lord": {
    facts: [
      { label: "NPS significant years", value: "1912, 1913 and 1923" },
      { label: "Federal architect field", value: "Koch and Sons; narrative research separately credits Rev. Emil Schindler with conceiving the cruciform design" },
    ],
    preservation: [
      {
        heading: "Federal metadata and narrative authorship describe different roles",
        paragraphs: [
          "The NPS record lists Koch and Sons in the architect field, while church-history research credits Father Emil Schindler with conceiving the cruciform plan and Koch and Sons with carrying out construction. Texas Defined preserves that distinction rather than flattening designer and builder into one role.",
        ],
      },
    ],
    sources: [
      { label: "National Park Service National Register record", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003148" },
    ],
  },

  "wallis-guardian-angel": {
    facts: [
      { label: "NPS significant year", value: "1913; Gothic Revival; architect Leo M. J. Dielmann with builder recorded as Mr. Bunch" },
      { label: "Current private-prayer access", value: "Official parish guidance says the church and grotto are open daily from 8 a.m. to 4 p.m." },
    ],
    visitorNotes: [
      "The parish currently states that the church and grotto are open for private prayer every day from 8 a.m. to 4 p.m. This is not a guarantee of sightseeing access during liturgies or private parish events, so verify before a special trip.",
    ],
    sources: [
      { label: "National Park Service National Register record", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003074" },
      { label: "Guardian Angel Catholic Church — official contact and access", url: "https://guardianangelwallis.org/contact-us" },
    ],
  },

  "lindsay-st-peters-catholic-church": {
    facts: [
      { label: "NPS significant years", value: "1903 and 1917" },
      { label: "Federal architecture record", value: "Romanesque; architect Frank A. Ludewig; period of significance 1900–1924" },
    ],
    sources: [
      { label: "National Park Service National Register record", url: "https://npgallery.nps.gov/AssetDetail/NRIS/79002927" },
    ],
  },

  "wesley-brethren-church": {
    facts: [
      { label: "THC marker construction", value: "First church built in 1866 principally of hand-hewn logs; necessary lumber was hauled by ox cart from Galveston" },
      { label: "Foundation", value: "Native rock and oak logs, according to the Texas Historical Commission marker" },
      { label: "School use", value: "The church also served as a school until about 1900, usually with the pastor as teacher" },
      { label: "Recorded Texas Historic Landmark", value: "Historical marker erected in 1966" },
      { label: "NARA significant dates", value: "1866, 1883, 1889–1890 and 1889–1891; Bohuslav E. Laciak appears in the federal architect/builder metadata" },
    ],
    history: [
      {
        heading: "The original building was a church, school and immigrant institution",
        paragraphs: [
          "The Texas Historical Commission marker records that Rev. Joseph Opocensky organized the congregation in 1864 after worship had already begun in homes, with some settlers traveling as far as twenty miles. The first church followed in 1866, built largely of hand-hewn logs with lumber hauled by ox cart from Galveston and a foundation using native rock and oak.",
          "That building also functioned as a school until about 1900, usually with the pastor teaching. The detail helps explain why Bohuslav Laciak's role as both pastor-teacher and decorative painter is so central to the church's story.",
        ],
      },
    ],
    sources: [
      { label: "Texas Historical Commission historical marker", url: "https://atlas.thc.texas.gov/Details/5477008405" },
      { label: "National Archives — Texas MPS finding aid", url: NARA_MPS.url },
    ],
  },

  "st-marys-immaculate-conception-lavaca": {
    facts: [
      { label: "NARA significant dates", value: "1896 and circa 1945" },
      { label: "Federal architectural classification", value: "Gothic Revival" },
      { label: "Federal architect/builder metadata", value: "Unknown; Arthur Fatjo is named in the National Archives finding aid" },
    ],
    preservation: [
      {
        heading: "The federal catalog adds dates the shorter state record omits",
        paragraphs: [
          "The National Archives multiple-property finding aid associates the church with significant dates of 1896 and circa 1945 and names Arthur Fatjo in the architect/builder field. Because the public catalog does not explain his precise role, Texas Defined records the attribution without expanding it into an unsupported designer or painter claim.",
        ],
      },
    ],
    sources: [
      { label: "National Archives — Texas MPS finding aid", url: NARA_MPS.url },
    ],
  },

  "panna-maria-immaculate-conception": {
    facts: [
      { label: "Founding migration", value: "Father Leopold Moczygemba and about 100 Polish families came from Płużnica and surrounding villages, then in Prussia" },
      { label: "Journey to Texas", value: "The parish history records a nine-week sea voyage to Galveston followed by an overland journey to the San Antonio River–Cibolo Creek area" },
      { label: "First Mass", value: "December 24, 1854 beneath an oak tree" },
      { label: "First church", value: "Built in 1855 and destroyed by lightning in 1875" },
      { label: "Present church", value: "Completed in 1877 and enlarged in 1937" },
      { label: "Current access", value: "The official parish site says visitors are welcome and the church is open daily" },
    ],
    history: [
      {
        heading: "The parish history preserves the migration route behind the settlement",
        paragraphs: [
          "The parish's own history identifies Father Leopold Moczygemba and roughly one hundred Polish families from Płużnica and neighboring villages as the founding migration. After a nine-week Atlantic voyage they reached Galveston, moved inland with carts carrying their belongings, and established the community near the San Antonio River and Cibolo Creek.",
          "Their first Mass was celebrated beneath an oak tree on Christmas Eve 1854. A church was built beside that site in 1855, but lightning destroyed it in 1875. The present sanctuary followed in 1877 and was enlarged in 1937.",
        ],
      },
    ],
    visitorNotes: [
      "The official parish site currently states that visitors are welcome and the church is open daily. Confirm current conditions before a long drive because services, funerals, weddings and other parish uses take priority.",
    ],
    sources: [
      { label: "Immaculate Conception Panna Maria — official parish history", url: "https://www.pannamariachurch.com/history" },
      { label: "Immaculate Conception Panna Maria — official visitor page", url: "https://www.pannamariachurch.com/" },
    ],
  },

  "sweet-home-queen-of-peace": {
    facts: [
      { label: "Parish established", value: "1895" },
      { label: "First Sweet Home church", value: "A dance hall was remodeled into a church in 1895 and dedicated as Exaltation of the Holy Cross" },
      { label: "Present brick church cornerstone", value: "Blessed in 1918" },
      { label: "Present church dedication", value: "June 3, 1919, under the title Virgin Mary, Queen of Peace" },
    ],
    history: [
      {
        heading: "Queen of Peace grew from an older Sweet Home Catholic mission",
        paragraphs: [
          "The parish history traces Catholic worship in the Sweet Home area to pioneers who traveled to neighboring churches before the railroad reached the community in 1887. In 1895 a dance hall was converted into a local church and dedicated as Exaltation of the Holy Cross.",
          "A new brick church followed under Rev. Godfrey Kuratko. Its cornerstone was blessed in 1918, and the completed building was dedicated on June 3, 1919 under the Queen of Peace title. That parish-controlled chronology clarifies the relationship between the 1918 construction date used in National Register material and the 1919 dedication.",
        ],
      },
    ],
    sources: [
      { label: "Queen of Peace Catholic Church — official parish history", url: "https://qpcatholicchurch.com/h" },
    ],
  },
};


const PAINTED_CHURCHES_IN_TEXAS = "https://paintedchurchesintexas.com";

const fieldResearchEnrichments: Record<string, AuthorityEnrichment> = {
  "serbin-st-paul-lutheran-church": {
    facts: [
      { label: "Wendish migration", value: "Pastor John Kilian led more than 500 Wendish immigrants from Hamburg toward Texas in 1854; the field-history account records 73 deaths during the Atlantic crossing" },
      { label: "Present church", value: "Constructed in 1870 under Rev. John Kilian" },
      { label: "Historic seating", value: "Men traditionally occupied the upper gallery while women and children sat on the ground floor" },
      { label: "Pulpit", value: "The elevated pulpit rises roughly 20 feet above the floor" },
      { label: "Decorative campaign", value: "The previously plain interior was transformed in 1906 by members of the congregation rather than a hired professional artist" },
    ],
    history: [
      {
        heading: "The 1854 Wendish migration shaped the church's unusual interior culture",
        paragraphs: [
          "A field-history account of St. Paul's places the congregation in the larger Wendish migration led by Pastor John Kilian in 1854. More than five hundred emigrants left Hamburg for Texas, and the account records seventy-three deaths during the difficult voyage. The church completed at Serbin in 1870 became the religious center of the surviving community.",
          "The two-level seating arrangement also preserves a social custom that is easy to miss when looking only at the painted surfaces: men historically used the upper gallery while women and children sat below. The towering upper-level pulpit reinforces the Lutheran emphasis on preaching and helps explain why the interior reads so differently from the Catholic churches in the statewide collection.",
        ],
      },
    ],
    paintings: [
      {
        heading: "The 1906 decoration was a congregational folk-art project",
        paragraphs: [
          "The church reportedly remained comparatively plain for its first thirty-six years. In 1906 the congregation undertook the decorative campaign itself rather than commissioning a professional church painter. The resulting scheme uses blue and gold, floral ornament and columns painted to imitate marble to give the wood-frame sanctuary a more monumental architectural character.",
          "That community authorship is an important contrast with churches decorated by documented professionals such as Ferdinand Stockert, Hermann Kern or Fred Donecker. Serbin shows that the Texas painted-church tradition also includes sophisticated collective folk artistry rooted directly in an immigrant congregation.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — St. Paul Lutheran Church, Serbin", url: PAINTED_CHURCHES_IN_TEXAS + "/st-paul-lutheran-church-serbin/" },
    ],
  },

  "dubina-saints-cyril-methodius": {
    facts: [
      { label: "Community name", value: "The settlement adopted the name Dubina in 1884 after learning another Texas post office already used Moravia; the name refers to an oak grove" },
      { label: "First church", value: "A church dedicated to Saints Cyril and Methodius was built in 1877" },
      { label: "Historic iron cross", value: "A field-history source identifies local Black blacksmith Tom Lee, formerly enslaved, as the maker of the first church's iron cross; the cross survived the 1909 storm and was reused" },
      { label: "Replacement campaign", value: "After the July 1909 hurricane, the community raised $5,571.90 for the replacement designed by Leo M. J. Dielmann and completed in 1911–1912" },
      { label: "Restoration method", value: "The early-1980s reconstruction used surviving traces and rediscovered stencil patterns; volunteers made restrained interpretive choices where evidence was incomplete" },
    ],
    history: [
      {
        heading: "A surviving cross connects the present church to the 1877 sanctuary",
        paragraphs: [
          "A detailed field-history account traces Dubina's first church to 1877 and identifies local blacksmith Tom Lee as the craftsman who forged its iron cross. After the 1909 hurricane destroyed the building, the cross was recovered and placed on the replacement church, giving the present sanctuary a physical link to its predecessor.",
          "The same source records the community's post-storm fundraising total of $5,571.90 and places the Dielmann replacement campaign in 1911–1912. These details sharpen the story of a congregation that repeatedly converted local labor and limited resources into durable sacred architecture.",
        ],
      },
    ],
    preservation: [
      {
        heading: "The 1980s restoration recovered patterns without pretending every detail survived",
        paragraphs: [
          "After the historic decoration had been whitewashed, the early-1980s restoration used visible remnants and rediscovered stencil patterns to reconstruct the blue ceilings, stars and figurative ornament. Fayette County Judge Ed Janecka, who remembered portions of the earlier scheme from his youth, helped lead the effort with local volunteers including Butch Koenig.",
          "The field account notes that volunteers sometimes had to make restrained interpretive choices where the evidence was incomplete. The present interior should therefore be read as a careful community reconstruction based on surviving evidence, not as an untouched original paint layer.",
        ],
      },
    ],
    visitorNotes: [
      "The nearby 1885 Piano Bridge over the East Navidad River is a useful companion stop for understanding Dubina's surviving historic landscape.",
    ],
    sources: [
      { label: "Painted Churches in Texas — Saints Cyril & Methodius, Dubina", url: PAINTED_CHURCHES_IN_TEXAS + "/saints-cyril-and-methodius-catholic-church-dubina/" },
    ],
  },

  "wesley-brethren-church": {
    facts: [
      { label: "Czech entrance inscription", value: "A painted inscription above the entrance presents Christ's 'way, truth and life' saying in Czech" },
      { label: "Laciak decorative campaign", value: "The field-history account dates Rev. Bohuslav Laciak's interior work to 1889–1891" },
      { label: "Illusionistic program", value: "Painted columns, arches, faux brickwork and a painted apse turn the small wood church into an illusion of a larger sacred interior" },
      { label: "Unfinished work", value: "Laciak died in a hunting accident before completing the program; faint outlines of unfinished designs reportedly remain visible" },
    ],
    paintings: [
      {
        heading: "Laciak's unfinished program still reveals its intended symbolism",
        paragraphs: [
          "A field account of the interior describes Laciak's use of painted columns and arches to suggest a much grander basilica-like space. Faux brickwork has been interpreted as an allusion to Jerusalem, while the painted apse visually deepens the wall behind the pulpit.",
          "The same account calls attention to a golden chalice above the pulpit and the deep-blue geometric ceiling. More unusually, it records that Laciak died in a hunting accident before the scheme was finished and that outlines of planned decoration can still be detected. Those unfinished traces make the church useful for studying not only finished iconography but also the process of creating a nineteenth-century painted interior.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — Wesley Brethren Church", url: PAINTED_CHURCHES_IN_TEXAS + "/wesley-brethern-church-wesley-texas/" },
    ],
  },

  "plantersville-st-marys-catholic-church": {
    facts: [
      { label: "Earliest recorded Catholic visit", value: "Summer 1860; later services were held in James Kelly Markey's home until a church was built in 1873" },
      { label: "1894 parish site", value: "Cordelia Baker donated ten acres during Rev. Joseph Klein's pastorate; a German Catholic church was dedicated there in 1894" },
      { label: "1907 parish division", value: "Polish families established St. Joseph's at Stoneham while the German congregation remained at St. Mary's" },
      { label: "Historic pews", value: "Most pews date to the 1917 church; the last two on each side are associated with the earlier 1894 building" },
      { label: "World War II alteration", value: "German-language inscriptions were painted over during World War II and were later restored" },
    ],
    history: [
      {
        heading: "The 1917 church inherited a much older Catholic story",
        paragraphs: [
          "Texas Historical Commission records place the first recorded Catholic priest in Plantersville in 1860, followed by services in the home of James Kelly Markey and a first church in 1873. Immigration enlarged the congregation, and in 1894 Cordelia Baker donated ten acres for the German Catholic parish that became Nativity of the Blessed Virgin Mary.",
          "The congregation divided along cultural lines in 1907, when Polish families organized St. Joseph's in Stoneham. The German congregation's church was then destroyed by lightning in 1917 and replaced the same year by the surviving Gothic Revival building.",
        ],
      },
    ],
    preservation: [
      {
        heading: "Restoration recovered both paint and immigrant-language history",
        paragraphs: [
          "Field research records that some German inscriptions were deliberately covered during World War II, when parishioners feared the consequences of being identified with German culture. Later restoration recovered those inscriptions along with historic stencil and color evidence.",
          "The interior also preserves layers from more than one building: most pews belong to the 1917 church, while a small group of pews is associated with the 1894 predecessor. That makes the sanctuary a material record of both the fire and the rebuilding campaign.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — Nativity of the Blessed Virgin Mary, Plantersville", url: PAINTED_CHURCHES_IN_TEXAS + "/church-of-the-nativity-of-the-blessed-virgin-mary-plantersville/" },
      { label: "Texas Historical Commission — St. Mary's Catholic Church marker", url: "https://atlas.thc.texas.gov/Details/5185012792" },
    ],
  },

  "wallis-guardian-angel": {
    facts: [
      { label: "Parish school", value: "Opened in 1914 with 64 students; by 1933 the school had six teachers and 170 students while the parish had grown to about 300 families" },
      { label: "Interior plan", value: "Basilican nave and side aisles are divided by fluted wood columns and arched trusses, with beaded-board walls and ceilings above a lancet-pattern wainscot" },
      { label: "Prayer Garden", value: "The parish grounds include a Last Supper prayer installation, a grotto and outdoor devotional sculpture" },
    ],
    history: [
      {
        heading: "The church anchored a parish school as well as worship",
        paragraphs: [
          "The congregation's institutional growth continued immediately after the 1913 church was completed. A parish school opened in 1914 with sixty-four students; by 1933 it had six teachers and 170 students, while the parish itself had grown to roughly three hundred families.",
          "That educational history helps place the painted sanctuary within a larger immigrant Catholic complex rather than treating it as an isolated work of decorative art.",
        ],
      },
    ],
    paintings: [
      {
        heading: "The painted program follows the building's basilican structure",
        paragraphs: [
          "Field documentation describes a basilican interior in which fluted wooden columns divide the nave from side aisles and support arched trusses. Painted stars, angels, banners, the Alpha and Omega, and Eucharistic imagery are organized around those architectural bays rather than applied as an unrelated mural layer.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — Guardian Angel Catholic Church, Wallis", url: PAINTED_CHURCHES_IN_TEXAS + "/guardian-angel-catholic-church-wallis-texas/" },
    ],
  },

  "panna-maria-immaculate-conception": {
    facts: [
      { label: "1966 Polish millennium gift", value: "President Lyndon B. Johnson presented a mosaic of Our Lady of Częstochowa to the historic Panna Maria church during the millennium observance of Polish Christianity" },
      { label: "Historic devotional object", value: "A painting of St. Stanislaus brought from Poland in 1858 is preserved at the church" },
      { label: "Polish heritage context", value: "The nearby Polish Heritage Center interprets the settlement's migration, faith, education and later connections with Poland" },
      { label: "St. Ann devotional gift", value: "A field-history source records a St. Ann statue presented in 2001 by Archbishop Alfons Nossol of Opole, Poland" },
      { label: "1987 papal visit artifacts", value: "A field-history source identifies three carved chairs preserved at the church as chairs used by Pope John Paul II during his 1987 meeting with Texas Polish Catholics in San Antonio" },
      { label: "Parish education", value: "St. Joseph's School was built in 1868; the historic school building now serves as a museum, and local elementary education continued until 1989" },
    ],
    history: [
      {
        heading: "Twentieth-century gifts connected Panna Maria back to Poland",
        paragraphs: [
          "The church's later history includes national and international Polish Catholic connections. During the 1966 millennium of Christianity in Poland, President Lyndon B. Johnson presented a mosaic of Our Lady of Częstochowa to the historic Panna Maria church. The Polish Heritage Center independently documents that presentation and the broader Polish-American observance surrounding it.",
          "The site also preserves devotional objects carried or donated across generations, including a St. Stanislaus painting brought from Poland in 1858. Together with the nearby Polish Heritage Center, these objects extend the church story beyond architecture into the community's continuing relationship with Polish identity.",
        ],
      },
    ],
    visitorNotes: [
      "The Polish Heritage Center at Panna Maria is a strong companion stop for migration, cultural and religious context that cannot be read from the church interior alone.",
    ],
    sources: [
      { label: "Painted Churches in Texas — Immaculate Conception, Panna Maria", url: PAINTED_CHURCHES_IN_TEXAS + "/immaculate-conception-of-the-blessed-virgin-mary-catholic-church-panna-maria-texas/" },
      { label: "Polish Heritage Center — 1966 Millennium of Christianity in Poland", url: "https://polishheritagecentertx.org/1966-millennium-christianity-poland-polish-renaissance-texas" },
    ],
  },

  "ammannsville-st-john-the-baptist": {
    facts: [
      { label: "1917 fire survival", value: "Field research records six statues and a crucifix as surviving the fire and being incorporated into the present church" },
      { label: "Historic pew detail", value: "Original pews retain hooks once used by men to hang hats" },
      { label: "Cemetery context", value: "The adjacent parish cemetery contains ornate markers, including stones with Czech inscriptions" },
      { label: "1917 fire intensity", value: "Contemporary recollections in the field-history account say the fire was hot enough to melt the church bells" },
    ],
    history: [
      {
        heading: "Objects rescued from the 1917 fire still connect the third church to the second",
        paragraphs: [
          "A field-history account records that six statues and a crucifix were saved from the 1917 fire and incorporated into the replacement church. Those objects make the present sanctuary more than a complete reset after disaster: pieces of the lost second church remained in devotional use.",
          "The same account notes surviving hat hooks on the original pews and Czech inscriptions in the adjacent cemetery, small material details that connect the painted interior to the social customs and immigrant identity of the congregation.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — St. John the Baptist, Ammannsville", url: PAINTED_CHURCHES_IN_TEXAS + "/st-john-the-baptist-church-ammannsville/" },
    ],
  },

  "fredericksburg-st-marys-catholic-church": {
    facts: [
      { label: "Consecration", value: "November 24, 1908, after a 1906–1908 construction campaign" },
      { label: "Historic organ", value: "George Kilgen & Son of St. Louis supplied the original organ; its case was painted to harmonize with the interior" },
      { label: "1936 iconography", value: "Apostolic figures on the nave arches omit Judas, include Matthias, and place Paul opposite Peter" },
      { label: "Apse theme", value: "Christ the King and Eucharistic imagery dominate the sanctuary, including a Melchizedek scene" },
      { label: "Memorial stained glass", value: "Two First Communion windows were modeled on children who died young: James Blum and Erma Wagner, daughter of builder Jacob Wagner" },
      { label: "Historic construction cost", value: "A field-history account places the 1906–1908 church and furnishings at approximately $40,000" },
    ],
    paintings: [
      {
        heading: "The 1936 program is organized around apostles and Eucharistic kingship",
        paragraphs: [
          "Field research adds useful iconographic detail to the 1936 decorative campaign. Figures of the apostles progress along the nave arches, with Matthias taking the place of Judas and Paul positioned opposite Peter. The arrangement turns the architecture itself into a procession of apostolic witnesses.",
          "In the sanctuary, Christ the King anchors a broader Eucharistic theme. A large Melchizedek scene connects bread and wine in the Hebrew scriptures with the Catholic interpretation of the Eucharist, giving the painted program a theological structure rather than functioning as ornament alone.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — St. Mary's Catholic Church, Fredericksburg", url: PAINTED_CHURCHES_IN_TEXAS + "/st-mary-catholic-church-frederickburg/" },
    ],
  },

  "high-hill-nativity-of-mary": {
    facts: [
      { label: "Reused stained glass", value: "Eighteen windows from the second church were installed in the 1906 building; additional sanctuary and tower windows expanded the program" },
      { label: "Interior furnishings", value: "Pulpit, communion rail and baptismal enclosure were completed in 1910; three altars followed in 1911" },
      { label: "Historic site cross", value: "A marble cross erected in 1891 for the earlier church survives north of the present sanctuary" },
      { label: "1909 hurricane damage", value: "A hurricane bent the cross atop the 1906 church's spire; it was repaired and remains part of the skyline" },
    ],
    history: [
      {
        heading: "The third church deliberately carried pieces of the second forward",
        paragraphs: [
          "The 1906 sanctuary reused more than general building material. Field research records eighteen stained-glass windows from the second church being installed in the new building, while three earlier bells were also returned to service. Furnishings then arrived in stages: the pulpit, communion rail and baptismal enclosure in 1910 and three parish-funded altars in 1911.",
          "Outside, an 1891 marble cross associated with the earlier church survives north of the present building. Together these features make High Hill a layered parish site rather than a single 1906–1912 construction episode.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — St. Mary's at High Hill", url: PAINTED_CHURCHES_IN_TEXAS + "/saint-mary-catholic-church-nativity-of-the-blessed-virgin-mary-at-high-hill/" },
    ],
  },

  "praha-st-marys-assumption": {
    facts: [
      { label: "1865 stone chapel", value: "The first chapel measured about 17 by 15 feet, with roughly 18-inch-thick stone walls" },
      { label: "Priest's hut", value: "A separate small stone structure near the chapel gave visiting priests a place to stay and vest because the chapel was too small for a sacristy" },
      { label: "Early congregation", value: "A field-history account names eight families in the parish during the earliest chapel period" },
    ],
    history: [
      {
        heading: "The first Praha chapel was tiny even by frontier standards",
        paragraphs: [
          "A detailed community history adds scale to Praha's earliest Catholic worship. The 1865 stone chapel measured only about seventeen by fifteen feet, with walls roughly eighteen inches thick. A separate stone hut nearby accommodated visiting priests and vesting because the chapel itself had no room for a sacristy.",
          "Those dimensions make the leap to the monumental 1895 church especially clear. The painted sanctuary visitors see today grew from a congregation that initially worshiped in a room-sized stone chapel built by a handful of families.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — St. Mary's Church of the Assumption, Praha", url: PAINTED_CHURCHES_IN_TEXAS + "/st-mary-church-of-the-assumption-praha/" },
    ],
  },

  "lindsay-st-peters-catholic-church": {
    facts: [
      { label: "1917 tornado survival", value: "The tornado left the apse, all three altars, the facade and steeple standing while destroying most of the 1903 church" },
      { label: "Rebuilding material", value: "Parishioners salvaged material from the damaged church and from the fire-damaged Gainesville courthouse during the 1918 rebuilding" },
      { label: "2009–2011 restoration", value: "Water intrusion required major plaster, roof, foundation, window, floor, pew and altar work; the two-year project cost about $4.9 million" },
      { label: "Early lay worship", value: "When no priest was available, parishioners still gathered on Sundays for the Rosary and a lay service using a Goffine devotional book; a copy is preserved in the parish office" },
    ],
    preservation: [
      {
        heading: "A twenty-first-century restoration rebuilt damaged plaster without discarding the historic pattern",
        paragraphs: [
          "By 2009 long-hidden roof leaks had damaged interior plaster and even the mortar binding the brick structure. The conservation response went far beyond repainting: damaged plaster was removed, historic patterns were documented and recreated on new plaster, and the roof, foundation, windows, floors, pews and altars were repaired.",
          "The field-history account places the two-year project at about $4.9 million. That scale illustrates why preserving a painted church often means stabilizing the entire building envelope before decorative surfaces can be saved.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — St. Peter Catholic Church, Lindsay", url: PAINTED_CHURCHES_IN_TEXAS + "/saint-peter-catholic-church-lindsay/" },
    ],
  },

  "shiner-saints-cyril-methodius": {
    facts: [
      { label: "First Shiner church", value: "Construction began January 2, 1891; the first building was completed in May 1891" },
      { label: "1892 storm", value: "A twister moved the first church about 11 feet off its foundation and destroyed its tower; the building was repaired" },
      { label: "Present church campaign", value: "The cornerstone was laid in 1920 and the present church was blessed July 7, 1921" },
      { label: "Construction team", value: "Father Wolf and architect E. Wahrenberger supervised work carried out by San Antonio contractors Vincent Falbo and M. Deodati" },
    ],
    history: [
      {
        heading: "The present landmark followed an earlier church that survived being shifted by a twister",
        paragraphs: [
          "Shiner's first Catholic church was completed in 1891, only to be struck by a twister in February 1892. A field-history account records that the building was moved roughly eleven feet from its foundation and lost its tower, but parishioners straightened and repaired it rather than abandoning the site.",
          "Growth eventually required the much larger present church. The cornerstone was laid in 1920, and the new sanctuary was blessed on July 7, 1921 after work supervised by Father Wolf and architect E. Wahrenberger with San Antonio contractors Vincent Falbo and M. Deodati.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — Saints Cyril & Methodius, Shiner", url: PAINTED_CHURCHES_IN_TEXAS + "/saints-cyril-methodius-catholic-church-shiner-texas/" },
    ],
  },

  "palestine-sacred-heart-catholic-church": {
    overrides: {
      builtYear: 1893,
      architect: "Nicholas J. Clayton",
    },
    facts: [
      { label: "Construction material", value: "About 675,000 bricks were molded and fired on site using clay brought from the Trinity River" },
      { label: "Architect", value: "Nicholas J. Clayton" },
      { label: "Stained glass", value: "Historic windows were imported from Italy and France" },
      { label: "Pipe organ", value: "A Pilcher pipe organ installed in 1926 remains part of the church" },
      { label: "Mural history", value: "The Transfiguration of Christ image dates to the 1920s and was retouched in 1946" },
    ],
    history: [
      {
        heading: "The painted sanctuary sits inside one of East Texas's major Victorian Gothic churches",
        paragraphs: [
          "Sacred Heart was completed and dedicated in 1893 after fire destroyed its wooden predecessor. Parish history identifies Nicholas J. Clayton as architect and records an extraordinary local building campaign: roughly 675,000 bricks were molded and fired on site from clay brought from the Trinity River.",
          "The church's decorative character extends beyond the sanctuary mural to imported stained glass and a 1926 Pilcher pipe organ. Those elements help explain why the painted image belongs within a broader architectural ensemble rather than being treated as an isolated artwork.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — Sacred Heart Catholic Church, Palestine", url: PAINTED_CHURCHES_IN_TEXAS + "/sacred-heart-catholic-church-palestine-2/" },
      { label: "Sacred Heart Catholic Church — official history", url: "https://shpalestine.org/history" },
    ],
  },
};

const roundTwoEnrichments: Record<string, AuthorityEnrichment> = {
  "lindsay-st-peters-catholic-church": {
    facts: [
      { label: "Municipal restoration record", value: "City of Lindsay visitor information says St. Peter has undergone two major restorations; its latest-completion date differs slightly from parish rededication chronology, so both records remain visible rather than being silently collapsed" },
    ],
    visitorNotes: [
      "The City of Lindsay describes general daylight visitor access. For Mass, Adoration, group tours and photography, use the active parish's current rules as the controlling source.",
    ],
    sources: [
      { label: "City of Lindsay — St. Peter visitor information", url: "https://lindsay.texas.gov/visitor-info/things-to-do/" },
    ],
  },

  "lacoste-our-lady-of-grace": {
    facts: [
      { label: "1924 additions", value: "Sanctuary, sacristy and bell tower added in 1924" },
      { label: "Documented decoration campaign", value: "Archdiocesan history records interior decoration in 1947" },
      { label: "Later altar artwork", value: "The Archdiocese records newer murals on the side walls of the altar" },
      { label: "Preservation method", value: "Icons originally painted on ceiling walls were later repainted on removable boards to simplify future restoration" },
    ],
    paintings: [
      {
        heading: "The Archdiocese pins down a 1947 decorative campaign",
        paragraphs: [
          "The Archdiocese of San Antonio supplies a date the earlier Texas Defined record did not have: it places an interior-decoration campaign in 1947, after the sanctuary, sacristy and bell tower had been added in 1924. That chronology helps separate the 1911 building from later decorative layers instead of treating the whole visible interior as one construction-era program.",
          "The same account records later murals at the sides of the altar and says icons originally painted on ceiling walls were repainted onto boards. Those removable supports are a practical preservation choice because future conservation can address the painted panels without requiring the same intervention into the wall or ceiling surface.",
        ],
      },
    ],
    preservation: [
      {
        heading: "Some historic iconography was transferred to removable supports",
        paragraphs: [
          "Archdiocesan history says icons once painted directly on ceiling walls were repainted on boards for easier future restoration. Texas Defined records that as a later preservation strategy, not as evidence that every visible painted element is original to 1947.",
        ],
      },
    ],
    sources: [
      { label: "Archdiocese of San Antonio — Our Lady of Grace pilgrimage history", url: "https://archsa.org/jubilee2025/pilgrimage-sites/" },
    ],
  },

  "dubina-saints-cyril-methodius": {
    facts: [
      { label: "Architectural plan", value: "Texas Architect describes the church as a Carpenter Gothic basilican three-aisle plan with tall, narrow pointed-arch windows, a steep gabled roof and a two-stage tower" },
    ],
    history: [
      {
        heading: "The painted room is also a carefully legible Carpenter Gothic building",
        paragraphs: [
          "Texas Architect's Gerald Moorhead describes Dubina as a basilican three-aisle Carpenter Gothic church, with tall narrow pointed-arch windows, a steep gabled roof and a two-stage tower. That architectural reading helps separate the building's structural vocabulary from the painted illusion layered across its interior.",
          "Texas Highways also documents how the Fayette County churches remain active cultural centers through parish picnics that combine worship, food, polka music and community reunion. The painted interior belongs to a living Czech-Texan landscape, not only to a heritage-driving route.",
        ],
      },
    ],
    sources: [
      { label: "Texas Architect — Painted Churches, May/June 2014", url: "https://magazine.texasarchitects.org/issue/may-june-2014/" },
      { label: "Texas Highways — Bohemian Rhapsody", url: "https://texashighways.com/culture/bohemian-rhapsody-fayette-county-czech-culture/" },
    ],
  },

  "amarillo-first-baptist-church": {
    facts: [
      { label: "Congregation organized", value: "September 1889 with sixteen charter members" },
      { label: "Present building approved", value: "The congregation voted on August 29, 1926 to begin the building program at Thirteenth and Tyler" },
      { label: "Planned project cost", value: "$500,000, according to First Baptist's official history" },
      { label: "Dedication", value: "August 3, 1930" },
    ],
    history: [
      {
        heading: "The congregation's own record fills in the road to the 1930 sanctuary",
        paragraphs: [
          "First Baptist's official history traces the congregation from sixteen charter members in September 1889 to the much larger building program approved in 1926. The planned cost was $500,000, an ambitious undertaking for the period, and the congregation dedicated the new building on August 3, 1930.",
          "That chronology adds institutional context to the National Register's architectural and decorative record: the painted interior belonged to a major urban church expansion completed just as the Depression and Dust Bowl placed severe pressure on the congregation.",
        ],
      },
    ],
    sources: [
      { label: "First Baptist Amarillo — official church history", url: "https://www.firstamarillo.org/our-history" },
    ],
  },

  "high-hill-nativity-of-mary": {
    facts: [
      { label: "Settlement roots", value: "High Hill developed from the late-1840s German settlements of Blum Hill and Oldenburg" },
      { label: "Early cultural institutions", value: "The community supported a Turnverein, two private schools, dramatic players and a Männer choir and orchestra" },
    ],
    history: [
      {
        heading: "High Hill's church grew inside a dense German cultural network",
        paragraphs: [
          "The Handbook of Texas traces High Hill to two late-1840s German settlements, Blum Hill and Oldenburg, and notes early German and Austrian-Moravian families. The community supported a Turnverein, private schools, dramatic players and a Männer choir and orchestra.",
          "That wider institutional life matters to the Painted Church story because St. Mary's was not an isolated burst of decorative ambition. It emerged from a community already investing in music, education, performance, religion and organized social life.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — High Hill", url: "https://www.tshaonline.org/handbook/entries/high-hill-tx" },
      { label: "Texas Highways — Bohemian Rhapsody", url: "https://texashighways.com/culture/bohemian-rhapsody-fayette-county-czech-culture/" },
    ],
  },

  "serbin-st-paul-lutheran-church": {
    facts: [
      { label: "Colony land purchase", value: "Wendish leaders purchased about 4,000 acres in 1855; the congregation set aside 95 acres for church and school" },
      { label: "Ben Nevis losses", value: "The Handbook of Texas records seventy-three deaths aboard the ship after a cholera outbreak during the 1854 migration" },
      { label: "Stone wall dimensions", value: "St. Paul Lutheran School's history describes the 1871 church's red-sandstone walls as thirty inches thick and twenty-four feet high" },
      { label: "Historic lighting", value: "A Wendish history account identifies the gilded chandeliers as original kerosene fixtures later adapted to electricity" },
      { label: "Faux-marble woodwork", value: "The wooden interior columns are described as feather-painted by early settlers to imitate marble" },
      { label: "John Kilian as teacher", value: "The Handbook of Texas records that Kilian taught the Serbin parochial school for twelve years in addition to his ministry" },
    ],
    history: [
      {
        heading: "The migration was larger—and more costly—than the surviving church alone can show",
        paragraphs: [
          "The Handbook of Texas records nearly six hundred Wendish Lutherans leaving Europe in 1854 and seventy-three deaths aboard the Ben Nevis after cholera broke out. After reaching Texas, colony leaders acquired roughly 4,000 acres and the congregation set aside ninety-five acres for a church and school.",
          "Pastor John Kilian's role was unusually broad. In addition to serving the Serbin congregation for about thirty years in Wendish and German, the Handbook records twelve years teaching the parochial school. St. Paul's therefore grew from a combined religious, educational and immigrant-language institution.",
        ],
      },
    ],
    paintings: [
      {
        heading: "Feather-painted columns and converted kerosene chandeliers preserve material culture",
        paragraphs: [
          "The Wendish Research Exchange describes the church's gilded chandeliers as original kerosene lamps later adapted to electricity and the wooden columns as feather-painted to imitate marble. Those details broaden the decorative story beyond ceiling stencils: surface illusion, lighting and hand-finished woodwork all shape the historic room.",
          "St. Paul Lutheran School's history adds the mass of the building itself, describing thirty-inch red-sandstone walls rising twenty-four feet. The painted interior sits inside a church engineered with unusually substantial masonry for a rural immigrant settlement.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — Serbin", url: "https://www.tshaonline.org/handbook/entries/serbin-tx" },
      { label: "Handbook of Texas — Wends", url: "https://www.tshaonline.org/handbook/entries/wends" },
      { label: "Handbook of Texas — John Kilian", url: "https://www.tshaonline.org/handbook/entries/kilian-john" },
      { label: "St. Paul Lutheran School — Serbin history", url: "https://www.stpaulserbinschool.org/our-school-a-brief-history" },
      { label: "Wendish Research Exchange — Spirit of the Wends", url: "https://wendishresearch.org/2017/09/29/spirit-of-the-wends/" },
    ],
  },

  "panna-maria-immaculate-conception": {
    facts: [
      { label: "1966 Polish millennium artwork", value: "President Lyndon B. Johnson gave Jan E. Krantz's 12,000-piece mosaic of the Virgin of Częstochowa; the Handbook of Texas records it as permanently displayed in the church" },
      { label: "Leopold Moczygemba reinterment", value: "His remains were reinterred at Panna Maria on October 13, 1974 beneath the oak associated with the immigrants' Christmas 1854 Mass" },
    ],
    history: [
      {
        heading: "Panna Maria's national Polish story continued long after the nineteenth-century migration",
        paragraphs: [
          "In 1966 roughly 10,000 people gathered at Panna Maria for the millennium of Polish Christianity and nationhood. The Handbook of Texas records President Lyndon B. Johnson's gift for the occasion: Polish artist Jan E. Krantz's 12,000-piece mosaic of the Virgin of Częstochowa, placed on permanent display in the church.",
          "The site's migration memory became even more physically anchored in 1974, when Father Leopold Moczygemba's remains were returned from Michigan and reinterred beneath the Panna Maria oak associated with the first immigrants' Christmas 1854 Mass.",
        ],
      },
    ],
    paintings: [
      {
        heading: "A 1966 mosaic adds a modern Polish devotional layer",
        paragraphs: [
          "The 12,000-piece Virgin of Częstochowa mosaic is not part of the church's nineteenth-century painted program, and Texas Defined does not label it that way. It is nevertheless an important work inside the church because it connects the historic immigrant parish to twentieth-century Polish-American commemoration and presidential recognition.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — Panna Maria", url: "https://www.tshaonline.org/handbook/entries/panna-maria-tx" },
      { label: "Handbook of Texas — Leopold Moczygemba", url: "https://www.tshaonline.org/handbook/entries/moczygemba-leopold" },
    ],
  },

  "bandera-st-stanislaus-catholic-church": {
    facts: [
      { label: "1855 founding migration", value: "City of Bandera history records sixteen Polish families arriving in 1855 to work at the cypress mill" },
    ],
    history: [
      {
        heading: "Bandera's Polish parish began with a small labor migration",
        paragraphs: [
          "The City of Bandera records sixteen Polish families arriving in 1855 to work at the local cypress mill. That municipal account gives useful scale to the migration behind St. Stanislaus and helps connect the parish's Silesian Polish identity to the economic reason the first families settled in Bandera.",
          "Father Leopold Moczygemba's wider biography ties Bandera to the same Upper Silesian migration network that founded Panna Maria, while preserving the fact that the two communities developed separately.",
        ],
      },
    ],
    sources: [
      { label: "City of Bandera — community history", url: "https://www.banderatx.gov/community" },
      { label: "Handbook of Texas — Leopold Moczygemba", url: "https://www.tshaonline.org/handbook/entries/moczygemba-leopold" },
    ],
  },
};

function appendUnique<T>(base: T[] | undefined, extra: T[] | undefined, key: (value: T) => string): T[] | undefined {
  if (!base?.length && !extra?.length) return base;
  const out = [...(base ?? [])];
  const seen = new Set(out.map(key));
  for (const item of extra ?? []) {
    const itemKey = key(item);
    if (!seen.has(itemKey)) {
      seen.add(itemKey);
      out.push(item);
    }
  }
  return out;
}

function applyEnrichment(profile: PaintedChurchProfile, patch: AuthorityEnrichment | undefined): PaintedChurchProfile {
  if (!patch) return profile;
  return {
    ...profile,
    ...(patch.overrides ?? {}),
    facts: appendUnique(profile.facts, patch.facts, (item) => `${item.label}::${item.value}`) ?? [],
    history: appendUnique(profile.history, patch.history, (item) => item.heading) ?? [],
    paintings: appendUnique(profile.paintings, patch.paintings, (item) => item.heading) ?? [],
    preservation: appendUnique(profile.preservation, patch.preservation, (item) => item.heading),
    visitorNotes: appendUnique(profile.visitorNotes, patch.visitorNotes, (item) => item),
    sources: appendUnique(profile.sources, patch.sources, (item) => item.url) ?? [],
  };
}

export function enrichPaintedChurchProfile(profile: PaintedChurchProfile): PaintedChurchProfile {
  return [enrichments[profile.slug], fieldResearchEnrichments[profile.slug], roundTwoEnrichments[profile.slug]]
    .reduce<PaintedChurchProfile>((current, patch) => applyEnrichment(current, patch), profile);
}
