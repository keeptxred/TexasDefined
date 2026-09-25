import type {
  PaintedChurchFact,
  PaintedChurchProfile,
  PaintedChurchSection,
  PaintedChurchSource,
} from "./painted-church-profiles";

export const paintedChurchAuthorityExpansionDate = "2026-09-24";

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
];


export const paintedChurchResearchExpansionDate = "2026-09-25";

export const paintedChurchResearchExpansionSources: PaintedChurchAuthoritySource[] = [
  {
    label: "Diocese of Victoria — Painted Churches",
    url: "https://www.victoriadiocese.org/painted-churches-1",
    authority: "Diocese of Victoria",
    scope: "Regional immigrant and decorative context",
    contribution: "Adds diocesan interpretation of the churches as mature immigrant-community institutions: often second- or third-generation buildings whose painted interiors, German and Czech inscriptions, schools and worship spaces preserved culture while signaling community stability.",
    churchSlugs: ["dubina-saints-cyril-methodius", "high-hill-nativity-of-mary", "praha-st-marys-assumption", "moravia-ascension-of-our-lord", "st-marys-immaculate-conception-lavaca"],
  },
  {
    label: "First Baptist Church Amarillo — Our History",
    url: "https://www.firstamarillo.org/our-history",
    authority: "First Baptist Church Amarillo",
    scope: "Amarillo congregational chronology",
    contribution: "Adds the congregation's 1889 organization with sixteen charter members, the 1926 decision to begin the present building program, its 13th-and-Tyler site, and the August 3, 1930 dedication of the historic church.",
    churchSlugs: ["amarillo-first-baptist-church"],
  },
  {
    label: "Immaculate Conception of the Blessed Virgin Mary — Our Story",
    url: "https://icsmhallettsville.org/our-story",
    authority: "Immaculate Conception of the Blessed Virgin Mary Parish",
    scope: "Hallettsville / Lavaca County church history",
    contribution: "Adds the October 28, 1896 dedication of the present church and, critically, documents the 1941 angel decoration as paintings made on cheesecloth netting and applied to the ceiling above the altar rather than assumed to be an original 1896 finish.",
    churchSlugs: ["st-marys-immaculate-conception-lavaca"],
  },
  {
    label: "Handbook of Texas — Godfrey Flury",
    url: "https://www.tshaonline.org/handbook/entries/flury-godfrey",
    authority: "Texas State Historical Association",
    scope: "Praha artist biography and attribution",
    contribution: "Adds Flury's Swiss background, his 1895 commission at Praha, more precise descriptions of the trompe-l'oeil and symbolic program, and the 1972 authentication of his authorship through surviving sketches and notes.",
    churchSlugs: ["praha-st-marys-assumption"],
  },
  {
    label: "Handbook of Texas — Serbin",
    url: "https://www.tshaonline.org/handbook/entries/serbin-tx",
    authority: "Texas State Historical Association",
    scope: "Serbin settlement history",
    contribution: "Adds the 1855 land purchase for the Wendish settlement, the ninety-five acres reserved for church and school, the Low Pin Oak settlement name, the 1860 Serbin name, and the congregation's place in Texas Missouri Synod history.",
    churchSlugs: ["serbin-st-paul-lutheran-church"],
  },
  {
    label: "Handbook of Texas — Dubina",
    url: "https://www.tshaonline.org/handbook/entries/dubina-tx",
    authority: "Texas State Historical Association",
    scope: "Dubina community history",
    contribution: "Adds the settlement's earlier Navidad and Bohemian Navidad names, Augustine Haidusek's Dubina naming, and the scale of the parish by 1900, when the church served more than 600 families.",
    churchSlugs: ["dubina-saints-cyril-methodius"],
  },
  {
    label: "Handbook of Texas — Praha",
    url: "https://www.tshaonline.org/handbook/entries/praha-tx",
    authority: "Texas State Historical Association",
    scope: "Praha community and parish origins",
    contribution: "Adds the settlement's Mulberry and Hottentot names, early Masses in Mathias Novak's home and the 1858 adoption of the name Praha, strengthening the community history without overriding the church chronology already established from primary records.",
    churchSlugs: ["praha-st-marys-assumption"],
  },
  {
    label: "Handbook of Texas — Panna Maria",
    url: "https://www.tshaonline.org/handbook/entries/panna-maria-tx",
    authority: "Texas State Historical Association",
    scope: "Panna Maria Polish-American history",
    contribution: "Adds the artist and scale of the 1966 Lyndon B. Johnson gift: Jan E. Krantz's approximately 12,000-piece mosaic of Our Lady of Częstochowa, presented during a Polish-Christianity millennium observance that drew thousands.",
    churchSlugs: ["panna-maria-immaculate-conception"],
  },
  {
    label: "Handbook of Texas — High Hill",
    url: "https://www.tshaonline.org/handbook/entries/high-hill-tx",
    authority: "Texas State Historical Association",
    scope: "High Hill immigrant-community history",
    contribution: "Adds the community's origins in Blum Hill and Oldenburg, German and Austrian-Moravian settlement, and cultural institutions including a Turnverein, dramatic society, men's choir and orchestra.",
    churchSlugs: ["high-hill-nativity-of-mary"],
  },
  {
    label: "Handbook of Texas — LaCoste",
    url: "https://www.tshaonline.org/handbook/entries/lacoste-tx",
    authority: "Texas State Historical Association",
    scope: "LaCoste community and church architecture",
    contribution: "Adds an independent architectural description of Our Lady of Grace emphasizing Corinthian columns, Gothic arches, large stained-glass windows and noted acoustics. Its 1912 dating is retained as a source discrepancy rather than replacing stronger parish chronology.",
    churchSlugs: ["lacoste-our-lady-of-grace"],
  },
  {
    label: "Handbook of Texas — Wends",
    url: "https://www.tshaonline.org/handbook/entries/wends",
    authority: "Texas State Historical Association",
    scope: "Wendish migration and cultural history",
    contribution: "Adds statewide context for the Wendish migration, Serbin's church-school institutions and the later spread and assimilation of Wendish families across south-central Texas.",
    churchSlugs: ["serbin-st-paul-lutheran-church"],
  },
  {
    label: "Handbook of Texas — Ammannsville",
    url: "https://www.tshaonline.org/handbook/entries/ammannsville-tx",
    authority: "Texas State Historical Association",
    scope: "Ammannsville settlement history",
    contribution: "Adds German and Czech settlement context and identifies Andrew Ammann, an architect and farmer who arrived in 1870, without forcing the Handbook's compressed storm-and-fire chronology over more detailed building records.",
    churchSlugs: ["ammannsville-st-john-the-baptist"],
  },
  {
    label: "Handbook of Texas — Wallis",
    url: "https://www.tshaonline.org/handbook/entries/wallis-tx",
    authority: "Texas State Historical Association",
    scope: "Wallis community history",
    contribution: "Documents Czech immigration to Wallis by about 1890, adding a more precise settlement date to the community-history layer behind Guardian Angel's later church complex.",
    churchSlugs: ["wallis-guardian-angel"],
  },
  {
    label: "Handbook of Texas — Lindsay",
    url: "https://www.tshaonline.org/handbook/entries/lindsay-tx",
    authority: "Texas State Historical Association",
    scope: "Lindsay German-Catholic colony history",
    contribution: "Adds the Flusche brothers' German-Catholic colony, the exact March 25, 1892 first Mass, nearly eight acres reserved for church, school and cemetery, and the October 12, 1919 dedication date for the replacement church.",
    churchSlugs: ["lindsay-st-peters-catholic-church"],
  },
  {
    label: "Wendish Research Exchange — The Wends in Texas",
    url: "https://wendishresearch.org/2015/10/10/the-wends-in-texas/",
    authority: "Wendish Research Exchange",
    scope: "Serbin migration chronology",
    contribution: "Adds a useful chronology check distinguishing the December 1854 Galveston arrival from the 1855 Serbin-area settlement and notes that the congregation was not called St. Paul until 1870; Texas Defined treats the essay as interpretive research and preserves primary-source precedence.",
    churchSlugs: ["serbin-st-paul-lutheran-church"],
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


const researchEnrichments: Record<string, AuthorityEnrichment> = {
  "amarillo-first-baptist-church": {
    facts: [
      { label: "Congregation organized", value: "September 1889 with sixteen charter members, according to the congregation's official history" },
      { label: "Present-building campaign", value: "The congregation voted on August 29, 1926 to begin the major building program at 13th and Tyler" },
      { label: "Historic church dedication", value: "August 3, 1930" },
    ],
    history: [
      {
        heading: "The decorated sanctuary grew from a forty-year congregational building story",
        paragraphs: [
          "First Baptist Amarillo's own history traces the congregation to sixteen charter members in September 1889. Its first church building was completed in 1890, and by August 1926 the congregation had approved a much more ambitious building program at 13th and Tyler.",
          "The present historic church was dedicated on August 3, 1930. That parish-controlled chronology complements the National Register record and helps anchor the Schnoor Company's documented decorative work within the building campaign that produced the sanctuary.",
        ],
      },
    ],
    sources: [
      { label: "First Baptist Church Amarillo — official history", url: "https://www.firstamarillo.org/our-history" },
    ],
  },

  "st-marys-immaculate-conception-lavaca": {
    facts: [
      { label: "Present church dedication", value: "October 28, 1896, according to the parish's official history" },
      { label: "1941 angel technique", value: "Angels were painted on cheesecloth netting and applied to the ceiling above the altar" },
    ],
    preservation: [
      {
        heading: "The 1941 angels are a documented applied decorative layer",
        paragraphs: [
          "The parish history supplies an unusually specific technical detail for the later interior campaign: in 1941, angels were painted on cheesecloth netting and then applied to the ceiling over the altar. That means the visible work should not be described as though every painted element were executed directly on the 1896 building fabric.",
          "Texas Defined keeps that later intervention separate from the church's original construction history, which makes the profile more useful for readers comparing original paint, later decoration and restoration.",
        ],
      },
    ],
    sources: [
      { label: "Immaculate Conception of the Blessed Virgin Mary — official parish history", url: "https://icsmhallettsville.org/our-story" },
      { label: "Diocese of Victoria — Painted Churches", url: "https://www.victoriadiocese.org/painted-churches-1" },
    ],
  },

  "praha-st-marys-assumption": {
    facts: [
      { label: "Flury commission", value: "Godfrey Flury was commissioned in 1895 to decorate St. Mary's at Praha" },
      { label: "Flury attribution evidence", value: "His authorship was authenticated in 1972 through preliminary sketches and notes corresponding to the surviving interior" },
      { label: "Praha community name", value: "The settlement was known as Mulberry and Hottentot before being renamed Praha in 1858" },
      { label: "Early worship setting", value: "Before the present landmark, Mass was celebrated in the home of settler Mathias Novak" },
    ],
    paintings: [
      {
        heading: "Flury's authorship is backed by surviving preparatory material",
        paragraphs: [
          "The Handbook of Texas identifies Swiss-born decorative painter Godfrey Flury as the artist commissioned in 1895 for Praha. It describes the sky-blue tongue-and-groove ceiling, illusionistic ribs and Gothic capitals, floral and gold-scroll panels, and symbolic imagery that make the interior one of the state's strongest examples of integrated decorative painting.",
          "The attribution is not simply tradition repeated from later tourism writing: the Handbook records that preliminary sketches and notes matching the church interior were used to authenticate Flury's authorship in 1972.",
        ],
      },
    ],
    history: [
      {
        heading: "Praha's Catholic life predates the present landmark by decades",
        paragraphs: [
          "The Handbook of Texas traces early Masses to the home of Mathias Novak and records that the community, previously called Mulberry and Hottentot, adopted the name Praha in 1858 in honor of Prague.",
          "That earlier parish history matters because the famous painted church was not the beginning of Czech Catholic life here; it was the mature architectural expression of a community that had already built worship, school and settlement institutions.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — Godfrey Flury", url: "https://www.tshaonline.org/handbook/entries/flury-godfrey" },
      { label: "Handbook of Texas — Praha", url: "https://www.tshaonline.org/handbook/entries/praha-tx" },
      { label: "Diocese of Victoria — Painted Churches", url: "https://www.victoriadiocese.org/painted-churches-1" },
    ],
  },

  "panna-maria-immaculate-conception": {
    facts: [
      { label: "1966 mosaic artist and scale", value: "Jan E. Krantz created the approximately 12,000-piece Our Lady of Częstochowa mosaic presented by President Lyndon B. Johnson" },
      { label: "1966 millennium observance", value: "The Handbook of Texas reports that the Polish-Christianity millennium gathering at Panna Maria drew about 10,000 people" },
    ],
    sources: [
      { label: "Handbook of Texas — Panna Maria", url: "https://www.tshaonline.org/handbook/entries/panna-maria-tx" },
    ],
  },

  "serbin-st-paul-lutheran-church": {
    facts: [
      { label: "Settlement land", value: "Carl Lehmann and John Dube purchased roughly 4,000 acres in 1855 for the Wendish settlement; ninety-five acres were reserved for church and school" },
      { label: "Community name", value: "The settlement was first known as Low Pin Oak and adopted the name Serbin in 1860" },
      { label: "Missouri Synod significance", value: "The Serbin congregation became the first Missouri Synod congregation in Texas" },
      { label: "Migration chronology", value: "Wendish Research Exchange distinguishes the December 1854 Galveston arrival from the 1855 establishment of the Serbin-area settlement" },
    ],
    history: [
      {
        heading: "Serbin's church, school and settlement were planned together",
        paragraphs: [
          "Texas State Historical Association research places the Wendish settlement on land acquired in 1855 by Carl Lehmann and John Dube for the immigrant group led by John Kilian, with ninety-five acres set aside for church and school. The place first known as Low Pin Oak took the name Serbin in 1860.",
          "A separate Wendish Research Exchange chronology is useful for avoiding a common date compression: it distinguishes the group's December 1854 arrival at Galveston from the 1855 establishment of the Serbin-area settlement and notes that the congregation did not use the St. Paul name until 1870. Texas Defined treats that essay as an interpretive cross-check rather than as a replacement for primary records.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — Serbin", url: "https://www.tshaonline.org/handbook/entries/serbin-tx" },
      { label: "Handbook of Texas — Wends", url: "https://www.tshaonline.org/handbook/entries/wends" },
      { label: "Wendish Research Exchange — The Wends in Texas", url: "https://wendishresearch.org/2015/10/10/the-wends-in-texas/" },
    ],
  },

  "dubina-saints-cyril-methodius": {
    facts: [
      { label: "Earlier settlement names", value: "Navidad and Bohemian Navidad before the community became Dubina" },
      { label: "Meaning of Dubina", value: "Augustine Haidusek chose the Czech name Dubina, commonly translated as oak grove" },
      { label: "Parish scale by 1900", value: "The Dubina church served more than 600 families by 1900, according to the Handbook of Texas" },
    ],
    history: [
      {
        heading: "The church story is inseparable from Dubina's Czech settlement history",
        paragraphs: [
          "The Handbook of Texas records that the community was known first as Navidad and Bohemian Navidad before Augustine Haidusek gave it the Czech name Dubina. The place became an important arrival point for Czech settlers entering Texas.",
          "By 1900 the Dubina church served more than 600 families. That scale is new context for understanding why the parish could support the institutional and decorative ambitions documented elsewhere in the profile.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — Dubina", url: "https://www.tshaonline.org/handbook/entries/dubina-tx" },
      { label: "Diocese of Victoria — Painted Churches", url: "https://www.victoriadiocese.org/painted-churches-1" },
    ],
  },

  "high-hill-nativity-of-mary": {
    facts: [
      { label: "Community origins", value: "High Hill grew from the neighboring settlements of Blum Hill and Oldenburg" },
      { label: "Immigrant background", value: "German and Austrian-Moravian settlers shaped the community" },
      { label: "Cultural institutions", value: "Local organizations included a Turnverein, dramatic society, men's choir and orchestra" },
    ],
    history: [
      {
        heading: "High Hill's painted church emerged from a dense immigrant cultural network",
        paragraphs: [
          "The Handbook of Texas traces High Hill to the neighboring settlements of Blum Hill and Oldenburg, shaped by German and Austrian-Moravian immigrants. The community supported not only church life but also a Turnverein, dramatic performers, a men's choir and an orchestra.",
          "That cultural setting helps explain why the church should be read as more than a decorative landmark: it belonged to a community that invested in organized music, performance, education and social institutions as it established itself in Texas.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — High Hill", url: "https://www.tshaonline.org/handbook/entries/high-hill-tx" },
      { label: "Diocese of Victoria — Painted Churches", url: "https://www.victoriadiocese.org/painted-churches-1" },
    ],
  },

  "lacoste-our-lady-of-grace": {
    facts: [
      { label: "Handbook architectural description", value: "Corinthian columns, Gothic arches, large stained-glass windows and noted acoustics" },
      { label: "Date-source discrepancy", value: "The Handbook dates the church to 1912; Texas Defined retains parish-controlled construction chronology elsewhere instead of silently replacing it" },
    ],
    preservation: [
      {
        heading: "The 1911/1912 date difference is retained as a source discrepancy",
        paragraphs: [
          "The Handbook of Texas describes Our Lady of Grace as a 1912 church and highlights its Corinthian columns, Gothic arches, large stained-glass windows and acoustics. Parish-controlled material used elsewhere in this collection places the project in 1911.",
          "Rather than choose one date without additional primary documentation, Texas Defined uses the Handbook for its architectural description and keeps the date difference visible for future reconciliation.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — LaCoste", url: "https://www.tshaonline.org/handbook/entries/lacoste-tx" },
    ],
  },

  "ammannsville-st-john-the-baptist": {
    facts: [
      { label: "Settlement background", value: "Ammannsville was settled in the 1870s by German and Czech immigrant farmers" },
      { label: "Community namesake", value: "Andrew Ammann, identified as an architect and farmer, arrived in the area in 1870" },
    ],
    history: [
      {
        heading: "Ammannsville was a mixed German-Czech farming settlement",
        paragraphs: [
          "The Handbook of Texas places Ammannsville's development in the 1870s among German and Czech immigrant farmers and identifies Andrew Ammann, who arrived in 1870, as an architect and farmer associated with the community's name.",
          "Its compressed storm-and-fire chronology is not used to overwrite the more detailed building record already attached to the church. The source is most valuable here for settlement context.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — Ammannsville", url: "https://www.tshaonline.org/handbook/entries/ammannsville-tx" },
    ],
  },

  "wallis-guardian-angel": {
    facts: [
      { label: "Czech settlement context", value: "Czech immigrants were settling in Wallis by about 1890" },
    ],
    history: [
      {
        heading: "Guardian Angel belongs to Wallis's railroad-era Czech immigration story",
        paragraphs: [
          "The Handbook of Texas places Czech immigration into Wallis by about 1890, during the town's railroad-era growth. That community history supplies a clearer background for the later 1913 Guardian Angel church and its Central European Catholic identity.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — Wallis", url: "https://www.tshaonline.org/handbook/entries/wallis-tx" },
    ],
  },

  "lindsay-st-peters-catholic-church": {
    facts: [
      { label: "Colony foundation", value: "Lindsay developed as a German-Catholic colony promoted by Anton and August Flusche" },
      { label: "First Mass", value: "March 25, 1892 in the William Flusche home" },
      { label: "Church, school and cemetery land", value: "Nearly eight acres were donated to the Diocese of Dallas for the parish complex" },
      { label: "Replacement dedication", value: "The church built after the 1917 tornado was dedicated on October 12, 1919" },
    ],
    history: [
      {
        heading: "St. Peter's grew with a deliberately organized German-Catholic colony",
        paragraphs: [
          "The Handbook of Texas describes Lindsay as a German-Catholic colony promoted by Anton and August Flusche. The first Mass was celebrated in a private home on March 25, 1892, and nearly eight acres were subsequently set aside for a church, school and cemetery.",
          "The source also clarifies the sequence around the National Register dates: a brick church was built in 1903, destroyed by a tornado on May 31, 1917, and followed by a replacement dedicated on October 12, 1919.",
        ],
      },
    ],
    sources: [
      { label: "Handbook of Texas — Lindsay", url: "https://www.tshaonline.org/handbook/entries/lindsay-tx" },
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
  return [enrichments[profile.slug], fieldResearchEnrichments[profile.slug], researchEnrichments[profile.slug]]
    .reduce<PaintedChurchProfile>((current, patch) => applyEnrichment(current, patch), profile);
}
