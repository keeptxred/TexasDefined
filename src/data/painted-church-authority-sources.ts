import type {
  PaintedChurchFact,
  PaintedChurchProfile,
  PaintedChurchSection,
  PaintedChurchSource,
} from "./painted-church-profiles";

export const paintedChurchAuthorityExpansionDate = "2026-09-23";

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

export function enrichPaintedChurchProfile(profile: PaintedChurchProfile): PaintedChurchProfile {
  const patch = enrichments[profile.slug];
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
