export type PaintedChurchCandidateStatus = "candidate" | "excluded";

export type PaintedChurchCensusEntry = {
  slug: string;
  name: string;
  city: string;
  status: PaintedChurchCandidateStatus;
  reason: string;
  sourceUrls: string[];
};

export const paintedChurchCandidateCensus: PaintedChurchCensusEntry[] = [
  {
    slug: "ellinger-st-marys-catholic-church",
    name: "St. Mary’s Catholic Church",
    city: "Ellinger",
    status: "candidate",
    reason: "THC verifies the historic church and German/Czech parish history, but Texas Defined has not yet located strong enough primary or parish documentation of a qualifying painted decorative interior to promote it into the verified collection.",
    sourceUrls: ["https://atlas.thc.texas.gov/Details/5149004468"],
  },
  {
    slug: "rockne-sacred-heart-catholic-church",
    name: "Sacred Heart Catholic Church",
    city: "Rockne",
    status: "candidate",
    reason: "The church and German-settlement history are well documented, but the painted-interior evidence is not yet strong enough for verified Painted Church classification.",
    sourceUrls: ["https://atlas.thc.texas.gov/Details/5021009223"],
  },
  {
    slug: "castroville-st-louis-catholic-church",
    name: "St. Louis Catholic Church",
    city: "Castroville",
    status: "candidate",
    reason: "The Buie Harwood decorative-painting archive identifies the church as a research lead. It still needs church-specific primary documentation of the surviving decorative program before promotion.",
    sourceUrls: ["https://txarchives.org/utaaa/finding_aids/00136.xml"],
  },
  {
    slug: "lacoste-our-lady-of-grace",
    name: "Our Lady of Grace Catholic Church",
    city: "LaCoste",
    status: "candidate",
    reason: "The Buie Harwood archive makes this a credible decorative-painting lead, but the surviving interior, authorship and chronology still need primary verification.",
    sourceUrls: ["https://txarchives.org/utaaa/finding_aids/00136.xml"],
  },
  {
    slug: "san-antonio-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    city: "San Antonio",
    status: "candidate",
    reason: "Documented decorative-painting associations, including Stockert and Kern, make the church relevant; Texas Defined is withholding promotion until the surviving program and scope are verified from authoritative records.",
    sourceUrls: ["https://austinpbs.org/paintedchurches/highhill", "https://txarchives.org/utaaa/finding_aids/00136.xml"],
  },
  {
    slug: "san-antonio-san-fernando-cathedral",
    name: "San Fernando Cathedral",
    city: "San Antonio",
    status: "candidate",
    reason: "The Harwood archive includes the cathedral in decorative-painting research, but a comprehensive Painted Churches census must verify which decoration survives and whether it belongs within this collection's scope.",
    sourceUrls: ["https://txarchives.org/utaaa/finding_aids/00136.xml"],
  },
  {
    slug: "corpus-christi-sacred-heart-catholic-church",
    name: "Sacred Heart Catholic Church",
    city: "Corpus Christi",
    status: "candidate",
    reason: "Architectural-history sources document bright sanctuary murals by Antonio García. Current parish identity, surviving mural condition and the appropriate classification still require verification.",
    sourceUrls: ["https://sah-archipedia.org/"],
  },
  {
    slug: "anderson-st-stanislaus-kostka",
    name: "St. Stanislaus Kostka Catholic Church",
    city: "Anderson",
    status: "candidate",
    reason: "The parish documents surviving/restored ceiling painting and a later altar mural. Texas Defined still needs enough evidence to classify the historic and modern decorative layers consistently with the statewide methodology.",
    sourceUrls: ["https://saintstans.org/church-history"],
  },
  {
    slug: "san-antonio-mission-san-jose",
    name: "Mission San José",
    city: "San Antonio",
    status: "excluded",
    reason: "Historic mission plaster, pigments and sacred art are important, but this Spanish-colonial mission does not belong to the nineteenth- and twentieth-century immigrant decorative-interior Painted Churches tradition defined by this collection.",
    sourceUrls: ["https://www.nps.gov/saan/learn/historyculture/sanjose.htm"],
  },
  {
    slug: "san-antonio-mission-concepcion",
    name: "Mission Concepción",
    city: "San Antonio",
    status: "excluded",
    reason: "Its surviving Spanish-colonial frescoes are historically significant but represent a different architectural and cultural tradition from the immigrant-community Painted Churches collection.",
    sourceUrls: ["https://www.nps.gov/saan/learn/historyculture/concepcion.htm"],
  },
];

export const paintedChurchCandidates = paintedChurchCandidateCensus.filter((entry) => entry.status === "candidate");
export const paintedChurchExclusions = paintedChurchCandidateCensus.filter((entry) => entry.status === "excluded");
