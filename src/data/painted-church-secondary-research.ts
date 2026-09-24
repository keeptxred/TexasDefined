import type {
  PaintedChurchFact,
  PaintedChurchProfile,
  PaintedChurchSection,
  PaintedChurchSource,
} from "@/data/painted-church-profiles";

export const paintedChurchSecondaryResearchDate = "2026-09-24";

export const paintedChurchSecondaryResearchSources = [
  { label: "Ascension of Our Lord — Moravia", url: "https://paintedchurchesintexas.com/the-church-of-the-ascension-of-our-lord-moravia/" },
  { label: "Nativity of the Blessed Virgin Mary — Plantersville", url: "https://paintedchurchesintexas.com/church-of-the-nativity-of-the-blessed-virgin-mary-plantersville/" },
  { label: "Guardian Angel — Wallis", url: "https://paintedchurchesintexas.com/guardian-angel-catholic-church-wallis-texas/" },
  { label: "Holy Cross — East Bernard", url: "https://paintedchurchesintexas.com/holy-cross-catholic-church-east-bernard/" },
  { label: "Immaculate Conception — Panna Maria", url: "https://paintedchurchesintexas.com/immaculate-conception-of-the-blessed-virgin-mary-catholic-church-panna-maria-texas/" },
  { label: "Nativity of the Blessed Virgin Mary — Cestohowa", url: "https://paintedchurchesintexas.com/nativity-of-the-blessed-virgin-mary-cestohowa-texas/" },
  { label: "Queen of the Holy Rosary — Hostyn", url: "https://paintedchurchesintexas.com/queen-of-the-holy-rosary-catholic-church-hostyn/" },
  { label: "Sacred Heart — Palestine", url: "https://paintedchurchesintexas.com/sacred-heart-catholic-church-palestine-2/" },
  { label: "St. John the Baptist — Ammannsville", url: "https://paintedchurchesintexas.com/st-john-the-baptist-church-ammannsville/" },
  { label: "St. Joseph — Rowena", url: "https://paintedchurchesintexas.com/st-joseph-catholic-church-rowena/" },
  { label: "St. Mary — Fredericksburg", url: "https://paintedchurchesintexas.com/st-mary-catholic-church-frederickburg/" },
  { label: "St. Mary — High Hill", url: "https://paintedchurchesintexas.com/saint-mary-catholic-church-nativity-of-the-blessed-virgin-mary-at-high-hill/" },
  { label: "St. Mary of the Assumption — Praha", url: "https://paintedchurchesintexas.com/st-mary-church-of-the-assumption-praha/" },
  { label: "St. Peter — Lindsay", url: "https://paintedchurchesintexas.com/saint-peter-catholic-church-lindsay/" },
  { label: "Saints Cyril and Methodius — Dubina", url: "https://paintedchurchesintexas.com/saints-cyril-and-methodius-catholic-church-dubina/" },
  { label: "Saints Cyril and Methodius — Shiner", url: "https://paintedchurchesintexas.com/saints-cyril-methodius-catholic-church-shiner-texas/" },
  { label: "St. Paul Lutheran — Serbin", url: "https://paintedchurchesintexas.com/st-paul-lutheran-church-serbin/" },
  { label: "Wesley Brethren — Wesley", url: "https://paintedchurchesintexas.com/wesley-brethern-church-wesley-texas/" },
] as const;

export const paintedChurchSecondaryResearchLeads = [
  {
    slug: "east-bernard-holy-cross-catholic-church",
    name: "Holy Cross Catholic Church",
    place: "East Bernard, Texas",
    status: "candidate",
    note: "The secondary catalog identifies Holy Cross as a Painted Church. THC and the parish independently confirm the 1925 Spanish Colonial Revival church, Czech/German-inspired interior, Munich mosaics, hand-painted copper Stations of the Cross and roundel stained glass. Texas Defined is holding it as a candidate until the surviving painted-wall/ceiling program and its chronology are documented to the same standard as the verified collection.",
  },
  {
    slug: "rowena-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    place: "Rowena, Texas",
    status: "candidate",
    note: "The secondary catalog identifies the active 1924 Gothic Revival church as a Painted Church, but its church-specific page does not document a painted interior program. Texas Defined is preserving the lead while seeking exact-building evidence for murals, stenciling, decorative painting or a historic painted campaign.",
  },
  {
    slug: "cestohowa-nativity-blessed-virgin-mary",
    name: "Nativity of the Blessed Virgin Mary Catholic Church",
    place: "Cestohowa, Texas",
    status: "excluded",
    note: "The church is an important 1878 Polish-Texan landmark with the historic Black Madonna painting, but SAH Archipedia specifically records that its vaulted ceilings did not receive painted interior decoration. It is therefore not counted in the verified decorative-interior collection.",
  },
  {
    slug: "hostyn-queen-holy-rosary",
    name: "Queen of the Holy Rosary Catholic Church",
    place: "Hostyn, Texas",
    status: "excluded",
    note: "Hostyn has deep Czech-Catholic history and was included by the secondary catalog, but the church building was destroyed by an explosion and fire on June 9, 2022. The surviving grotto, chapels and outdoor Stations remain historically important; Texas Defined does not count the lost building as a currently visitable Painted Church.",
  },
] as const;

type SecondaryEnrichment = {
  builtYear?: number;
  architecture?: string;
  architect?: string;
  facts?: PaintedChurchFact[];
  history?: PaintedChurchSection[];
  paintings?: PaintedChurchSection[];
  preservation?: PaintedChurchSection[];
  visitorNotes?: string[];
  sources?: PaintedChurchSource[];
};

const enrichments: Record<string, SecondaryEnrichment> = {
  "plantersville-st-marys-catholic-church": {
    facts: [
      { label: "Earliest recorded priest visit", value: "Summer 1860; intermittent services followed in the James Kelly Markey home" },
      { label: "1894 parish expansion", value: "Rev. Joseph Klein became resident pastor and Cordelia Baker donated ten acres for the German Catholic parish" },
      { label: "Historic inscriptions", value: "German-language and scriptural inscriptions were covered during World War II and later restored" },
      { label: "Pews", value: "Most pews date to the 1917 church; the last two on each side were reportedly salvaged from the 1894 building" },
      { label: "Modern restoration", value: "A long-running recovery of historic decoration began in 2002" },
    ],
    history: [
      {
        heading: "Catholic worship before the present church",
        paragraphs: [
          "The Plantersville congregation predates the present building by more than half a century. A priest is recorded visiting in 1860, after which Catholics sometimes gathered in the home of James Kelly Markey until a dedicated church was erected in 1873.",
          "Immigration reshaped the parish late in the nineteenth century. Rev. Joseph Klein was assigned as resident pastor in 1894, the same year Cordelia Baker donated ten acres for the German Catholic congregation. Polish families later organized a separate parish at nearby Stoneham.",
        ],
      },
    ],
    preservation: [
      {
        heading: "Painted over, then recovered",
        paragraphs: [
          "The current interior is the product of both survival and recovery. German-language and devotional inscriptions were covered during the World War II era, while additional decorative work disappeared during mid-century renovations.",
          "Restoration work begun in 2002 used surviving historic material to recover colors, inscriptions and decorative details without pretending that every visible surface is untouched 1917 fabric.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — Plantersville", url: "https://paintedchurchesintexas.com/church-of-the-nativity-of-the-blessed-virgin-mary-plantersville/" },
      { label: "Texas Historical Commission — St. Mary’s Catholic Church", url: "https://atlas.thc.texas.gov/Details/5185012792" },
    ],
  },

  "wallis-guardian-angel": {
    facts: [
      { label: "Original parish land", value: "Four acres donated by Francis V. Smid in 1892 for the Krasna school and early worship site" },
      { label: "Parish school", value: "Opened in 1914 with 64 students; by 1933 it had six teachers and 170 students" },
      { label: "Czech ceiling details", value: "Historic ceiling panels include angels holding banners written in Czech" },
      { label: "Sanctuary symbolism", value: "A chalice with wheat and grapevines appears above the apse, alongside Alpha and Omega motifs" },
    ],
    paintings: [
      {
        heading: "Czech-language ornament and Eucharistic symbols",
        paragraphs: [
          "The decorative scheme carries more cultural information than color alone. Ceiling panels include angels holding Czech-language banners, while the sanctuary uses a chalice, wheat and grapevines to emphasize Eucharistic imagery.",
          "Those historic motifs coexist with the pale-green and metallic-gold twentieth-century redecoration already visible in the church today, reinforcing the need to read Guardian Angel as a layered interior rather than a single paint campaign.",
        ],
      },
    ],
    visitorNotes: [
      "The parish grounds also include a prayer garden with a life-size Last Supper installation centered on a bronze figure of Jesus by sculptor Timothy P. Schmalz.",
    ],
    sources: [
      { label: "Painted Churches in Texas — Guardian Angel, Wallis", url: "https://paintedchurchesintexas.com/guardian-angel-catholic-church-wallis-texas/" },
    ],
  },

  "panna-maria-immaculate-conception": {
    facts: [
      { label: "Black Madonna mosaic", value: "A Jan E. Krantz mosaic of Our Lady of Częstochowa was presented in 1966 during the millennium of Polish Christianity" },
      { label: "St. Stanislaus painting", value: "A painting of St. Stanislaus brought from Poland in 1858 hangs near the entrance" },
      { label: "Papal visit objects", value: "Three hand-carved chairs used by Pope John Paul II during his 1987 Texas visit are preserved at the church" },
      { label: "St. Ann statue", value: "A statue associated with the St. Ann side altar was presented by Archbishop Alfons Nossol of Opole in 2001" },
    ],
    paintings: [
      {
        heading: "Objects linking Panna Maria to Poland and modern Catholic history",
        paragraphs: [
          "The sanctuary’s Polish identity extends beyond the building campaign itself. A side altar honors Our Lady of Częstochowa, and a twentieth-century mosaic of the Black Madonna connects the Texas settlement directly to Poland’s best-known Marian devotion.",
          "Other preserved objects span generations: an 1858 painting of St. Stanislaus, a later St. Ann statue presented from Poland, and chairs used during Pope John Paul II’s 1987 meeting with Polish Texans. Together they make the church a repository of Polish-American memory as well as a painted sacred interior.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — Panna Maria", url: "https://paintedchurchesintexas.com/immaculate-conception-of-the-blessed-virgin-mary-catholic-church-panna-maria-texas/" },
    ],
  },

  "palestine-sacred-heart-catholic-church": {
    builtYear: 1893,
    architect: "Nicholas J. Clayton",
    architecture: "High Victorian Gothic / Victorian Gothic brick church",
    facts: [
      { label: "Present church dedicated", value: "June 18, 1893" },
      { label: "Architect", value: "Nicholas J. Clayton of Galveston" },
      { label: "Handmade brick", value: "About 675,000 bricks were molded and fired on site from Trinity River clay" },
      { label: "Stained glass", value: "Historic windows were imported from Italy and France" },
      { label: "Pipe organ", value: "A Pilcher pipe organ installed in 1926 survives and remains in use for special occasions" },
    ],
    history: [
      {
        heading: "A railroad parish rebuilt in permanent brick",
        paragraphs: [
          "Catholic worship expanded in Palestine during the railroad era. The first dedicated church stood on land given by the International & Great Northern Railroad, but that wooden building burned in 1890.",
          "The replacement was designed by Galveston architect Nicholas J. Clayton and completed in 1893. Its construction was unusually local: hundreds of thousands of bricks were formed and fired at the site using clay hauled from the Trinity River.",
        ],
      },
    ],
    preservation: [
      {
        heading: "Architecture, glass and music survive together",
        paragraphs: [
          "Sacred Heart’s significance is not limited to the sanctuary mural. The Clayton-designed masonry shell, imported European stained glass, varnished woodwork and surviving Pilcher organ create a layered historic interior that helps explain why the building was recognized well beyond its local parish history.",
        ],
      },
    ],
    sources: [
      { label: "Sacred Heart Palestine — official history", url: "https://shpalestine.org/history" },
      { label: "National Register nomination — Sacred Heart Catholic Church", url: "https://atlas.thc.texas.gov/NR/pdfs/79002909/79002909.pdf" },
      { label: "Painted Churches in Texas — Sacred Heart, Palestine", url: "https://paintedchurchesintexas.com/sacred-heart-catholic-church-palestine-2/" },
    ],
  },

  "ammannsville-st-john-the-baptist": {
    facts: [
      { label: "Community namesake", value: "Ammannsville was named for Andrew Ammann, identified in local history as the area’s first permanent settler in 1870" },
      { label: "Objects saved from the 1917 fire", value: "A secondary church-history account records six statues and a crucifix carried into the present church" },
      { label: "Historic pew detail", value: "Original pews retain hooks once used by men to hang hats" },
    ],
    preservation: [
      {
        heading: "Surviving objects carried into the third church",
        paragraphs: [
          "The 1917 fire erased the elaborate second church, but not every devotional object was lost. A detailed secondary account records six statues and a crucifix among the pieces rescued and reused in the 1919 sanctuary.",
          "Small physical details also preserve social history: the original pews still include hat hooks associated with an era when men and women commonly occupied different sides of the nave.",
        ],
      },
    ],
    visitorNotes: [
      "The adjacent cemetery preserves many early community burials, including markers with Czech inscriptions that reinforce Ammannsville’s immigrant history.",
    ],
    sources: [
      { label: "Painted Churches in Texas — Ammannsville", url: "https://paintedchurchesintexas.com/st-john-the-baptist-church-ammannsville/" },
    ],
  },

  "fredericksburg-st-marys-catholic-church": {
    facts: [
      { label: "Consecration", value: "The present church was consecrated November 24, 1908 after the 1906–1908 building campaign" },
      { label: "Pipe organ", value: "George Kilgen & Son built the 1906 pump organ; it was later electrified and its case was painted to harmonize with the interior" },
      { label: "1936 decoration", value: "A major interior embellishment campaign was undertaken under Msgr. Alfons Heckmann" },
      { label: "Personalized stained glass", value: "Two First Communion windows were modeled on children from parish families who died young" },
    ],
    paintings: [
      {
        heading: "The 1936 iconographic program",
        paragraphs: [
          "A later decorative campaign added a strongly narrative layer to the Gothic interior. Apostles appear along the center-aisle arches; Matthias takes the place of Judas, while Paul is positioned opposite Peter.",
          "The apse centers on Christ the King and a Eucharistic theme. Nearby imagery includes Melchizedek offering bread and wine, connecting the painted program to Catholic interpretation of the Eucharist and priesthood.",
        ],
      },
    ],
    sources: [
      { label: "St. Mary’s Fredericksburg — official history", url: "https://church.stmarysfbg.com/history" },
      { label: "Painted Churches in Texas — St. Mary, Fredericksburg", url: "https://paintedchurchesintexas.com/st-mary-catholic-church-frederickburg/" },
    ],
  },

  "high-hill-nativity-of-mary": {
    facts: [
      { label: "High Hill community", value: "Formed in 1858 from the neighboring settlements of Blum Hill, Wursten and Oldenburg" },
      { label: "First recorded Mass", value: "Celebrated in 1861 in the home of Andreas Billimek" },
      { label: "Reused stained glass", value: "Eighteen windows from the second church were installed in the 1906 building; additional sanctuary and tower windows expanded the set" },
      { label: "Interior furnishings", value: "Pulpit, communion rail and baptismal enclosure were completed in 1910; three altars followed in 1911" },
      { label: "1909 hurricane", value: "The storm bent the cross atop the spire; it was repaired" },
    ],
    history: [
      {
        heading: "The parish grew out of three immigrant settlements",
        paragraphs: [
          "High Hill’s Catholic community developed from the consolidation of Blum Hill, Wursten and Oldenburg in the late 1850s. Visiting clergy served the scattered settlers, and the first recorded Mass was celebrated in a private home in 1861.",
          "After the first church was replaced, that early building continued serving the community as a Catholic school until 1922. The sequence helps explain why the modern church site represents religious, educational and community history at the same time.",
        ],
      },
    ],
    preservation: [
      {
        heading: "Historic glass and furnishings crossed generations",
        paragraphs: [
          "The 1906 church deliberately incorporated material from its predecessor, including a large group of stained-glass windows. Interior furnishings were then completed in stages before Stockert and Kern added the famous painted-canvas program in 1912.",
          "The site also preserves a nineteenth-century marble cross that originally stood near the earlier church and was later relocated, adding another physical link between parish generations.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — High Hill", url: "https://paintedchurchesintexas.com/saint-mary-catholic-church-nativity-of-the-blessed-virgin-mary-at-high-hill/" },
    ],
  },

  "praha-st-marys-assumption": {
    facts: [
      { label: "Frontier worship", value: "Before a resident parish was established, visiting priests celebrated Mass in local homes" },
      { label: "Early chapel", value: "The first small stone chapel was followed by a larger church as Czech settlement expanded" },
    ],
    history: [
      {
        heading: "A parish that began before permanent church buildings",
        paragraphs: [
          "Praha’s Catholic history began with scattered Czech families served by traveling priests. Worship in homes preceded the first small chapel and the larger nineteenth-century churches that eventually led to the 1895 stone sanctuary.",
          "That progression—from household worship to increasingly ambitious parish buildings—helps explain why the present church was both a religious project and a public statement of a maturing Czech-Texan community.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — Praha", url: "https://paintedchurchesintexas.com/st-mary-church-of-the-assumption-praha/" },
    ],
  },

  "lindsay-st-peters-catholic-church": {
    facts: [
      { label: "First Mass", value: "Celebrated on Easter Sunday 1892 in the first parish church" },
      { label: "Lay Sunday worship", value: "When no priest was present, settlers held Rosary and lay services using a Goffine prayer book preserved by the parish" },
      { label: "1917 tornado survival", value: "The apse, three altars, facade and steeple survived the tornado that destroyed most of the 1903 church" },
      { label: "2010s restoration", value: "A two-year, $4.9 million campaign repaired water damage, recreated historic painted patterns and restored windows, floors, pews, altars, roof and foundation" },
    ],
    history: [
      {
        heading: "A parish that worshiped even without a priest",
        paragraphs: [
          "The German Catholic settlers organized in 1892 and quickly established a pattern of Sunday worship. When a priest could not reach Lindsay, parishioners still gathered for the Rosary and a lay service guided by a Goffine devotional book that the parish says survives in its office.",
        ],
      },
    ],
    preservation: [
      {
        heading: "A major twenty-first-century rescue",
        paragraphs: [
          "In 2009, failing painted plaster revealed long-term roof leakage that had damaged both interior finishes and masonry. The resulting conservation project removed unstable material, documented and recreated historic patterns, and addressed the building from its roof and foundation to windows, pews and altars.",
          "The parish completed the two-year project at a reported cost of $4.9 million, making Lindsay one of the clearest examples in the collection of preservation requiring both art conservation and major structural repair.",
        ],
      },
    ],
    sources: [
      { label: "St. Peter Lindsay — official parish history", url: "https://stpeterlindsay.org/history" },
      { label: "Painted Churches in Texas — St. Peter, Lindsay", url: "https://paintedchurchesintexas.com/saint-peter-catholic-church-lindsay/" },
    ],
  },

  "dubina-saints-cyril-methodius": {
    facts: [
      { label: "Migration route", value: "Early Moravian settlers reached Texas after a long Atlantic voyage, then traveled through Houston and Cat Spring before reaching the Navidad River country" },
      { label: "Name change", value: "The settlement used the name Moravia before adopting Dubina in the 1880s; the Czech root refers to an oak grove" },
      { label: "Rebuilding fund", value: "A detailed secondary account records $5,571.90 raised for the post-1909 replacement church" },
      { label: "Sanctuary mural", value: "The restored decorative program includes Christ in the Garden of Gethsemane" },
    ],
    history: [
      {
        heading: "From an immigrant journey to an oak-grove settlement",
        paragraphs: [
          "The founders’ journey did not end at Galveston. The group continued inland through Houston and Cat Spring before reaching the East Navidad River country, where oak trees became central to the community’s identity and eventual name.",
          "The settlement initially used the name Moravia. When a post-office naming conflict arose in the 1880s, the community adopted Dubina, derived from a Czech word associated with oak groves.",
        ],
      },
    ],
    visitorNotes: [
      "The restored 1885 Piano Bridge over the East Navidad River is a useful nearby heritage stop for understanding the wider Dubina cultural landscape.",
    ],
    sources: [
      { label: "Painted Churches in Texas — Dubina", url: "https://paintedchurchesintexas.com/saints-cyril-and-methodius-catholic-church-dubina/" },
    ],
  },

  "shiner-saints-cyril-methodius": {
    facts: [
      { label: "First church storm damage", value: "A February 1892 twister moved the original church about eleven feet off its foundation and destroyed its tower" },
      { label: "First resident pastor", value: "The parish became independent in 1912 under Rev. Joseph Klobouk" },
      { label: "Present-church contractors", value: "Vincent Falbo and M. Deodati of San Antonio are identified in secondary parish-history material as contractors" },
      { label: "Present church blessing", value: "The current church was blessed July 7, 1921" },
      { label: "Sanctuary image", value: "A large Garden of Gethsemane mural overlooks the altar" },
    ],
    history: [
      {
        heading: "Railroad growth reshaped the parish",
        paragraphs: [
          "Shiner developed around the railroad in the late 1880s, drawing Czech and German Catholic families toward the new townsite. The first parish church followed in 1891, but a twister the next year shoved the building off its foundation and destroyed the tower.",
          "The congregation repaired that first sanctuary and continued growing until the much larger 1920–1921 church became necessary. The present building therefore reflects both railroad-era town growth and decades of parish rebuilding.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — Shiner", url: "https://paintedchurchesintexas.com/saints-cyril-methodius-catholic-church-shiner-texas/" },
    ],
  },

  "serbin-st-paul-lutheran-church": {
    facts: [
      { label: "1854 migration", value: "More than 500 Wendish immigrants left Hamburg with Rev. John Kilian; a secondary account records 73 deaths during the Atlantic crossing" },
      { label: "Historic seating custom", value: "Men used the upper gallery while women and children sat on the lower floor into the twentieth century" },
    ],
    history: [
      {
        heading: "The Atlantic crossing behind the Serbin settlement",
        paragraphs: [
          "The Serbin congregation grew from a large Wendish migration led by Rev. John Kilian in 1854. The crossing was deadly as well as transformative: a detailed secondary account records that dozens of migrants died at sea before the survivors established their Texas community.",
          "That migration story gives the later church, school, cemetery and painted interior a wider meaning as material evidence of a community that transplanted its language, worship and social customs across the Atlantic.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — St. Paul Lutheran, Serbin", url: "https://paintedchurchesintexas.com/st-paul-lutheran-church-serbin/" },
    ],
  },

  "wesley-brethren-church": {
    facts: [
      { label: "Entrance inscription", value: "A hand-painted Czech inscription above the entrance presents Christ’s declaration that he is the way, the truth and the life" },
    ],
    paintings: [
      {
        heading: "The painted program begins before visitors enter",
        paragraphs: [
          "Wesley’s decorative identity is not confined to the nave. A Czech inscription painted above the entrance presents a central saying of Christ about the way, truth and life, reinforcing the building’s function as both a Czech-language religious space and a painted historic artifact.",
        ],
      },
    ],
    sources: [
      { label: "Painted Churches in Texas — Wesley Brethren", url: "https://paintedchurchesintexas.com/wesley-brethern-church-wesley-texas/" },
    ],
  },
};

function appendUnique<T>(current: T[] | undefined, additions: T[] | undefined, key: (item: T) => string): T[] | undefined {
  if (!additions?.length) return current;
  const merged = [...(current ?? [])];
  const seen = new Set(merged.map(key));
  for (const item of additions) {
    const itemKey = key(item);
    if (!seen.has(itemKey)) {
      merged.push(item);
      seen.add(itemKey);
    }
  }
  return merged;
}

export function enrichPaintedChurchProfileFromSecondaryResearch(profile: PaintedChurchProfile): PaintedChurchProfile {
  const enrichment = enrichments[profile.slug];
  if (!enrichment) return profile;

  return {
    ...profile,
    builtYear: profile.builtYear ?? enrichment.builtYear,
    architecture: profile.architecture ?? enrichment.architecture,
    architect: profile.architect ?? enrichment.architect,
    facts: appendUnique(profile.facts, enrichment.facts, (item) => `${item.label}::${item.value}`) ?? profile.facts,
    history: appendUnique(profile.history, enrichment.history, (item) => item.heading) ?? profile.history,
    paintings: appendUnique(profile.paintings, enrichment.paintings, (item) => item.heading) ?? profile.paintings,
    preservation: appendUnique(profile.preservation, enrichment.preservation, (item) => item.heading),
    visitorNotes: appendUnique(profile.visitorNotes, enrichment.visitorNotes, (item) => item),
    sources: appendUnique(profile.sources, enrichment.sources, (item) => item.url) ?? profile.sources,
  };
}
