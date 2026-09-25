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
    slug: "east-bernard-holy-cross-catholic-church",
    name: "Holy Cross Catholic Church",
    city: "East Bernard",
    status: "candidate",
    reason: "PaintedChurchesInTexas.com surfaced Holy Cross as a candidate. Parish and Texas Historical Commission sources confirm the 1925 Spanish Colonial Revival church, Czech and German decorative influences, Munich angel mosaics, hand-painted copper Stations from Czechoslovakia and Brno roundel stained glass. A documented modern sanctuary project also added fixed painting and stencilling in the apse and other parts of the church. Texas Defined is retaining candidate status because the newly documented fixed painted program is modern; the remaining research question is whether enough historic fixed wall, ceiling, mural or faux-finish work survives to classify Holy Cross within the broader historic Painted Churches tradition rather than as a historic church with a later decorative campaign.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/holy-cross-catholic-church-east-bernard/",
      "https://www.eastbernardcatholic.org/history",
      "https://atlas.thc.texas.gov/Details?atlasnumber=5481012292&fn=print",
      "https://www.liturgicalartsjournal.com/2020/07/before-and-after-holy-cross-catholic.html",
      "https://www.esskcmo.com/gallery",
    ],
  },
  {
    slug: "cestohowa-nativity-of-the-blessed-virgin-mary",
    name: "Nativity of the Blessed Virgin Mary Catholic Church",
    city: "Cestohowa",
    status: "excluded",
    reason: "This is an important 1878 Polish Catholic landmark and appears on PaintedChurchesInTexas.com, but the Society of Architectural Historians' church-specific architectural record explicitly states that its vaulted ceilings did not receive painted interior decorations. Texas Defined therefore keeps Cestohowa in the broader Polish-heritage story without inflating the Painted Churches census.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/nativity-of-the-blessed-virgin-mary-cestohowa-texas/",
      "https://sah-archipedia.org/buildings/TX-01-SF34",
      "https://atlas.thc.texas.gov/Details?atlasnumber=5255012347&fn=print",
      "https://www.loc.gov/item/tx0095/",
    ],
  },
  {
    slug: "hostyn-queen-of-the-holy-rosary",
    name: "Queen of the Holy Rosary Catholic Church",
    city: "Hostyn",
    status: "candidate",
    reason: "Hostyn belongs in the historical research trail, but the church building described by older Painted Churches coverage was totally destroyed by an explosion and fire on June 9, 2022. The parish erected a rebuilding perimeter fence on October 9, 2025 and began pouring the replacement church's foundation on January 20, 2026. The parish is already documenting planned stained-glass artwork for the new sanctuary, but that does not establish a completed painted-interior program. Texas Defined will not count the destroyed predecessor as a currently visitable Painted Church or assume the replacement's decorative classification before the new building is completed and documented.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/queen-of-the-holy-rosary-catholic-church-hostyn/",
      "https://hostynplumcatholic.org/queen-of-the-holy-rosary-hostyn",
      "https://hostynplumcatholic.org/rebuilding-church",
      "https://hostynplumcatholic.org/stained-glass-for-the-church",
    ],
  },
  {
    slug: "rowena-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    city: "Rowena",
    status: "candidate",
    reason: "PaintedChurchesInTexas.com identifies the 1924 Gothic Revival church as part of its catalog. A 2013 San Angelo Standard-Times report independently documents artist Crystal Goodman painting a fixed 15-by-20-foot Resurrection mural in the half-dome above St. Joseph's main altar, including an approximately eight-foot figure of the risen Christ. That establishes a qualifying fixed mural program, but it is a modern addition rather than evidence of a historic painted interior. Texas Defined is therefore retaining Rowena as a candidate while researching whether historic fixed decorative painting survives or whether Rowena should instead be documented separately as a modern painted-church tradition.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/st-joseph-catholic-church-rowena/",
      "https://archive.gosanangelo.com/lifestyle/rowena-church-coming-to-life-ep-438538467-355474231.html",
    ],
  },
  {
    slug: "ellinger-st-marys-catholic-church",
    name: "St. Mary’s Catholic Church",
    city: "Ellinger",
    status: "candidate",
    reason: "Held for exact-subject evidence. THC and historic newspaper records verify Catholic history in the Ellinger area, but current archival searches repeatedly resolve to St. Mary's at Hostyn near Ellinger rather than a securely identified surviving Ellinger painted interior. Texas Defined will not promote the church until exact-building decorative evidence is located.",
    sourceUrls: [
      "https://atlas.thc.texas.gov/Details/5149004468",
      "https://texashistory.unt.edu/ark:/67531/metapth1348985/m1/7/",
    ],
  },
  {
    slug: "rockne-sacred-heart-catholic-church",
    name: "Sacred Heart Catholic Church",
    city: "Rockne",
    status: "candidate",
    reason: "Held for qualifying decorative evidence. THC and local historical sources verify the German Catholic community, the 1892 Sacred Heart church and a documented 1975 interior-renovation discussion, but Texas Defined has not located source-backed evidence that the surviving interior belongs in the Painted Churches decorative-painting tradition.",
    sourceUrls: [
      "https://atlas.thc.texas.gov/Details/5021009223",
      "https://rocknemuseumandhilbigpark.com/",
      "https://texashistory.unt.edu/ark:/67531/metapth290786/m1/10/",
    ],
  },
  {
    slug: "san-antonio-san-fernando-cathedral",
    name: "San Fernando Cathedral",
    city: "San Antonio",
    status: "candidate",
    reason: "Held pending surviving-program verification. The Buie Harwood archive contains a dedicated 16-slide San Fernando Cathedral decorative-painting research group from 1982, and the cathedral's official history confirms the exact historic church and continuous use. That establishes a legitimate research lead, but the current source trail does not yet identify which painted program survives, its authorship, or whether it fits the immigrant decorative-interior scope used for this verified collection.",
    sourceUrls: [
      "https://txarchives.org/utaaa/finding_aids/00136.xml",
      "https://sfcathedral.org/our-history",
    ],
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
