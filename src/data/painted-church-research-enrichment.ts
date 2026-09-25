import type {
  PaintedChurchResearchItem,
  PaintedChurchResearchSection,
  PaintedChurchResearchSource,
} from "./painted-church-research";

export type PaintedChurchResearchEnrichment = {
  slug: string;
  lookFor?: PaintedChurchResearchItem[];
  interpretation?: PaintedChurchResearchSection[];
  communityContext?: PaintedChurchResearchSection[];
  recordNotes?: string[];
  sources: PaintedChurchResearchSource[];
};

const texasLegislaturePaintedChurches: PaintedChurchResearchSource = {
  label: "Texas Legislature — H.C.R. No. 93 (2005)",
  url: "https://texashistory.unt.edu/ark:/67531/metapth157429/m2/1/high_res_d/HCR93.pdf",
  tier: "official",
  use: "state recognition of the Schulenburg Painted Churches, named churches, decorative details and the 2005 Official Home designation",
};

const enrichments: PaintedChurchResearchEnrichment[] = [
  {
    slug: "high-hill-nativity-of-mary",
    communityContext: [
      {
        heading: "The German and Austrian-Moravian community behind High Hill",
        paragraphs: [
          "Texas State Historical Association research shows that High Hill grew from the neighboring settlements of Blum Hill and Oldenburg and drew German and Austrian-Moravian families. By the late nineteenth century the community supported private schools, a Turnverein, dramatic players, and a Männer choir and orchestra that performed at statewide Sängerfests. That civic and musical life helps explain why the church belonged to a broader culture-building project rather than standing as an isolated rural landmark.",
          "A Catholic church was already present by 1879. The present painted sanctuary therefore sits within a much longer local history of immigrant institutions, education, music and worship.",
        ],
      },
    ],
    recordNotes: [
      "Texas H.C.R. 93, approved in 2005, names High Hill among the four Schulenburg-area churches used to support the Legislature's designation of Schulenburg as the Official Home of the Painted Churches of Texas.",
      "The resolution specifically notes High Hill's eighteen stained-glass windows imported from Germany and treats the glass, altar, statuary and painted interior as one visual ensemble.",
    ],
    sources: [
      texasLegislaturePaintedChurches,
      {
        label: "Texas State Historical Association — High Hill",
        url: "https://www.tshaonline.org/handbook/entries/high-hill-tx",
        tier: "scholarly",
        use: "community origins, German and Austrian-Moravian settlement, schools, Turnverein, music organizations and early church context",
      },
    ],
  },
  {
    slug: "ammannsville-st-john-the-baptist",
    lookFor: [
      {
        label: "Cherubs, palms and lilies in the state record",
        detail: "Texas H.C.R. 93 calls out the soft interior palette and ceiling ornament of cherubs, palm ferns and lily blossoms, giving a contemporary state record for motifs that can be checked against the surviving decorative program.",
      },
    ],
    communityContext: [
      {
        heading: "The town took its name from an architect-farmer",
        paragraphs: [
          "TSHA identifies Andrew Ammann as the community's first settler, arriving in 1870, and describes him as both a farmer and a noted architect. German and Czech immigrant farmers followed, and by 1890 the settlement had both a Catholic church and a school.",
          "TSHA's chronology records the church lost to a 1909 storm, a replacement dedicated on November 24, 1910, and another destructive fire soon afterward. That town-level record complements the parish and documentary accounts of repeated rebuilding.",
        ],
      },
    ],
    sources: [
      texasLegislaturePaintedChurches,
      {
        label: "Texas State Historical Association — Ammannsville",
        url: "https://www.tshaonline.org/handbook/entries/ammannsville-tx",
        tier: "scholarly",
        use: "settlement history, Andrew Ammann, 1890 church and school, storm loss and 1910 rebuilding chronology",
      },
    ],
  },
  {
    slug: "praha-st-marys-assumption",
    communityContext: [
      {
        heading: "Railroad bypass, parish school and a feast that outgrew the town",
        paragraphs: [
          "TSHA records a public school at Praha by 1868 and a Czech Catholic school established in 1896. The Southern Pacific line passed about a mile north in 1873, helping nearby Flatonia draw business away while the parish remained a durable center of community life.",
          "The community's Feast of the Assumption tradition dates to 1855. TSHA reports that the annual August celebration grew to attract thousands of visitors, showing how the church continued to function as a Czech-Texan gathering place even after Praha's permanent population became very small.",
        ],
      },
    ],
    recordNotes: [
      "Texas H.C.R. 93 identifies Praha as one of the four churches behind the 2005 Official Home designation and specifically associates Gottfried Flury's ceiling with religious imagery, flowers and vines.",
    ],
    sources: [
      texasLegislaturePaintedChurches,
      {
        label: "Texas State Historical Association — Praha",
        url: "https://www.tshaonline.org/handbook/entries/praha-tx",
        tier: "scholarly",
        use: "school history, railroad bypass, Feast of the Assumption continuity and community population context",
      },
    ],
  },
  {
    slug: "dubina-saints-cyril-methodius",
    communityContext: [
      {
        heading: "Church societies held together a dispersed Czech settlement",
        paragraphs: [
          "TSHA identifies Dubina as the first Czech settlement in Texas and documents several Catholic mutual-aid and social organizations tied to the community, including a Czech Catholic Union lodge, St. Ann's Society and a Czech-Roman Catholic women's aid society. Those organizations show that the parish was part of a dense network of religious and social support, not only a Sunday worship site.",
          "The same account records a major town fire in 1912, the year the replacement church was completed. The fire and an earlier railroad bypass help explain why the church became an unusually important surviving anchor of a community whose commercial center diminished.",
        ],
      },
    ],
    recordNotes: [
      "Texas H.C.R. 93 names Dubina among the four churches used for the 2005 Official Home designation and describes its historic painted interior as having been restored in the 1980s.",
    ],
    sources: [
      texasLegislaturePaintedChurches,
      {
        label: "Texas State Historical Association — Dubina",
        url: "https://www.tshaonline.org/handbook/entries/dubina-tx",
        tier: "scholarly",
        use: "first-Czech-settlement context, Catholic societies, railroad bypass, 1912 town fire and community history",
      },
    ],
  },
  {
    slug: "wallis-guardian-angel",
    interpretation: [
      {
        heading: "Why the present church carries both 1913 and 1915 dates",
        paragraphs: [
          "The City of Wallis gives a more precise construction sequence than a single built-year label can show: plans were underway by 1912, the cornerstone was blessed and construction began on June 3, 1913, and the church was completed on October 21, 1915.",
          "That local-government chronology is best treated as a start-to-completion range rather than as a contradiction. Texas Defined can retain 1913 as the start of the present building while explaining that the finished sanctuary dates to 1915.",
        ],
      },
    ],
    recordNotes: [
      "The City of Wallis calls Guardian Angel one of the last Painted Churches built in Texas and credits architect Leo Dielmann and builder Jan Bujnoch.",
      "The city history says the interior has been artistically repainted while the ornate altars were kept close to their earlier white-and-gold design, useful evidence when discussing interior integrity.",
    ],
    sources: [
      {
        label: "City of Wallis — community and Guardian Angel history",
        url: "https://www.wallistexas.org/page/about_us",
        tier: "official",
        use: "1912-1915 construction chronology, architect and builder, later interior repainting and local historical context",
      },
    ],
  },
  {
    slug: "lacoste-our-lady-of-grace",
    interpretation: [
      {
        heading: "A documented 1947 decorative campaign",
        paragraphs: [
          "The Archdiocese of San Antonio supplies a missing date in La Coste's decorative history: it records interior decoration in 1947, after the 1911 church and a 1924 expansion that added the sanctuary, sacristy and bell tower.",
          "The archdiocesan history also explains a preservation choice visible today. Icons that had originally been painted on ceiling walls were later repainted on boards so future restoration could be handled more easily. That distinction helps separate the church's historic decorative idea from the present physical support of some images.",
        ],
      },
    ],
    recordNotes: [
      "The Archdiocese also documents newer side-wall altar murals and later repainting of statues and Stations of the Cross, reinforcing the site's layered rather than single-campaign decorative history.",
    ],
    sources: [
      {
        label: "Archdiocese of San Antonio — Our Lady of Grace pilgrimage-site history",
        url: "https://archsa.org/jubilee2025/pilgrimage-sites/",
        tier: "official",
        use: "1911 dedication, 1924 additions, 1947 interior decoration, icon relocation to boards and later murals",
      },
    ],
  },
  {
    slug: "corn-hill-holy-trinity-catholic-church",
    communityContext: [
      {
        heading: "From a one-room chapel to the twin-spired church",
        paragraphs: [
          "Holy Trinity's own anniversary history traces the parish to 1889, founded largely by families from Moravia and Bohemia alongside German and Irish neighbors. The first worship space was a tiny Immaculate Conception chapel so small that parishioners stood outside while the priest and servers occupied the interior.",
          "A larger church followed in 1891 and was dedicated to the Most Holy Trinity, taking its name from a church in Ostravice, Moravia, the former home of many Corn Hill residents. Work on the present church began in 1912 and the sanctuary was dedicated in 1914, giving the familiar 1913 date useful start-to-dedication context.",
        ],
      },
    ],
    recordNotes: [
      "The parish history identifies Rev. Jacob Lauth as the first pastor and Rev. William Skocek as the resident priest who led construction of the present church.",
    ],
    sources: [
      {
        label: "Holy Trinity Corn Hill — 125th parish / 100th church anniversary history",
        url: "https://holytrinityofcornhill.org/files/1014/9341/2155/HTC_History_-_403625.pdf",
        tier: "official",
        use: "1889 first chapel, 1891 Holy Trinity dedication, Ostravice namesake, immigrant origins and 1912-1914 present-church chronology",
      },
    ],
  },
  {
    slug: "panna-maria-immaculate-conception",
    interpretation: [
      {
        heading: "The painted sanctuary ceiling was hidden until 2000",
        paragraphs: [
          "Panna Maria Historical Society material records an important preservation discovery absent from the earlier state-marker chronology: a 2000 renovation revealed a fully painted sanctuary ceiling. The ceiling was then carefully restored rather than replaced.",
          "The same local record notes restoration of the church's large stained-glass mosaic windows in 2013. Together those projects show that the present interior is the result of documented conservation work layered onto the 1877 church and its later alterations.",
        ],
      },
      {
        heading: "The Black Madonna became part of the church's modern cultural history",
        paragraphs: [
          "In 1966, during observances of Poland's millennium of Christianity, an icon of Our Lady of Czestochowa by Jan E. Krantz was presented in Washington. President Lyndon B. Johnson asked that it be placed in Panna Maria's Immaculate Conception Church.",
          "The local historical society estimates that about 10,000 people attended the icon's arrival celebration in Panna Maria that June. The episode adds a twentieth-century Polish-American layer to a church more often discussed only through its 1850s settlement origins.",
        ],
      },
    ],
    recordNotes: [
      "Panna Maria's local history records the formation of the Panna Maria Historical Society in 1966, linking the Black Madonna event to an organized preservation effort for the settlement's historic buildings and records.",
    ],
    sources: [
      {
        label: "Panna Maria Historical Society — Panna Maria overview",
        url: "https://pannamariatexas.org/",
        tier: "local",
        use: "2000 discovery and restoration of the painted sanctuary ceiling and 2013 stained-glass restoration",
      },
      {
        label: "Panna Maria Historical Society — history highlights",
        url: "https://pannamariatexas.org/history-highlights",
        tier: "local",
        use: "1966 Black Madonna provenance, estimated attendance and historical-society preservation context",
      },
    ],
  },
  {
    slug: "st-marys-immaculate-conception-lavaca",
    lookFor: [
      {
        label: "Applied ceiling angels",
        detail: "The parish history records that in 1941 angels were painted on cheesecloth netting and applied to the ceiling above the altar, a church-specific example of decoration executed on a flexible support rather than directly on the building surface.",
      },
      {
        label: "Czech inscriptions and the Hostyn painting",
        detail: "The parish documents Czech-language inscriptions on the Stations of the Cross and stained glass, plus an 1892 painting of Our Lady of Hostyn now displayed near the entrance.",
      },
    ],
    communityContext: [
      {
        heading: "An older Catholic settlement absorbed a later Czech majority",
        paragraphs: [
          "The parish traces its origins to Irish-descended families in the 1830s and priests Edward C. Clarke and George Haydon, who began a log church and school in 1839. By the 1860s and 1870s, Czech Catholic immigrants had become the leading element in the parish.",
          "The present church was dedicated in 1896. Reading its Czech inscriptions and later applied decorative work against that longer migration history explains why this site differs from communities founded as Czech settlements from the outset.",
        ],
      },
    ],
    sources: [
      {
        label: "Immaculate Conception St. Mary — official parish history",
        url: "https://icsmhallettsville.org/our-story",
        tier: "official",
        use: "1839-1840 founding, 1896 present church, Czech migration, 1941 applied ceiling angels, Czech inscriptions and later restoration",
      },
    ],
  },
  {
    slug: "paris-first-united-methodist-church",
    communityContext: [
      {
        heading: "The present congregation was forged by the 1916 Paris fire",
        paragraphs: [
          "The Texas Historical Commission marker traces the congregation to an 1843 Methodist organization and documents the eventual Centenary and Lamar Avenue congregations. After the destructive 1916 Paris fire, the two decided to form one downtown congregation and completed the merger in 1918.",
          "THC names Rev. Robert P. Shuler as the first pastor of the merged congregation. That civic-disaster context belongs beside the building and interior-art history because it explains the institutional continuity behind the later sanctuary.",
        ],
      },
    ],
    recordNotes: [
      "THC marker 8196 was erected in 1985; it is a historical subject marker rather than a Recorded Texas Historic Landmark designation.",
    ],
    sources: [
      {
        label: "Texas Historical Commission — First United Methodist Church of Paris marker",
        url: "https://atlas.thc.texas.gov/Details/5277008196",
        tier: "historic-register",
        use: "1843 congregation origin, 1916 fire, 1918 merger, first pastor and marker status",
      },
    ],
  },
  {
    slug: "lindsay-st-peters-catholic-church",
    interpretation: [
      {
        heading: "The current church followed a tornado-destroyed predecessor",
        paragraphs: [
          "TSHA records a brick St. Peter's built in 1903 and destroyed by a tornado on May 31, 1917. The replacement church was dedicated on October 12, 1919, placing the surviving building directly in the community's disaster-recovery history.",
          "TSHA also notes that the Benedictine Fathers of Subiaco, Arkansas, assumed responsibility for St. Peter's religious life in 1899. That institutional connection adds context for the German Catholic parish that produced the later decorated interior.",
        ],
      },
      {
        heading: "Texas architectural history treats Lindsay's interior as exceptional",
        paragraphs: [
          "TSHA's overview of German vernacular architecture places St. Peter's among the state's notable German-influenced churches and singles out its interior decoration. That broader architectural context supports reading the painting as part of a German-Texan building tradition, not simply as isolated ornament.",
        ],
      },
    ],
    sources: [
      {
        label: "Texas State Historical Association — Lindsay",
        url: "https://www.tshaonline.org/handbook/entries/lindsay-tx",
        tier: "scholarly",
        use: "Benedictine stewardship, 1903 church, 1917 tornado, 1919 dedication and parish-school history",
      },
      {
        label: "Texas State Historical Association — German Vernacular Architecture",
        url: "https://www.tshaonline.org/handbook/entries/german-vernacular-architecture",
        tier: "scholarly",
        use: "statewide German architectural context and independent recognition of St. Peter's decorated interior",
      },
    ],
  },
  {
    slug: "sweet-home-queen-of-peace",
    communityContext: [
      {
        heading: "Sweet Home's Czech and German community shifted with the railroad",
        paragraphs: [
          "TSHA records Czech and German settlement at Sweet Home beginning around 1873. When the San Antonio and Aransas Pass Railway was built about five miles south in 1887, businesses and residents shifted toward the tracks, creating the later center of the community.",
          "That population movement gives useful context for Queen of Peace: its immigrant heritage belongs to a town whose physical center changed with transportation, while the church became one of the institutions carrying Czech and German identity forward.",
        ],
      },
    ],
    sources: [
      {
        label: "Texas State Historical Association — Sweet Home, Lavaca County",
        url: "https://www.tshaonline.org/handbook/entries/sweet-home-tx-lavaca-county",
        tier: "scholarly",
        use: "Czech and German settlement, railroad-driven town relocation and community development",
      },
    ],
  },
];

export const paintedChurchResearchEnrichmentSourceUrls = Array.from(
  new Set(enrichments.flatMap((entry) => entry.sources.map((source) => source.url))),
);

export function paintedChurchResearchEnrichmentBySlug(slug: string) {
  return enrichments.find((entry) => entry.slug === slug);
}
