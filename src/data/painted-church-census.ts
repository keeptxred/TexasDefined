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
    slug: "east-bernard-holy-cross-catholic-church",
    name: "Holy Cross Catholic Church",
    city: "East Bernard",
    status: "candidate",
    reason: "Promising broader-tradition lead surfaced by PaintedChurchesInTexas.com and independently strengthened by Texas Historical Commission and parish records. The 1925 Spanish Colonial Revival church has Czech and German decorative influence, imported angelic mosaics, hand-painted copper Stations of the Cross and distinctive roundel stained glass. A modern sanctuary campaign also added painting and stenciling. Texas Defined is holding it as a candidate until the surviving historic painted-surface program and its relationship to the site's later decorative work are documented precisely enough for a defensible integrity classification.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/holy-cross-catholic-church-east-bernard/",
      "https://atlas.thc.texas.gov/Details?atlasnumber=5481012292&fn=print",
      "https://www.eastbernardcatholic.org/history",
      "https://www.liturgicalartsjournal.com/2020/07/before-and-after-holy-cross-catholic.html",
    ],
  },
  {
    slug: "rowena-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    city: "Rowena",
    status: "candidate",
    reason: "PaintedChurchesInTexas.com catalogs the 1924 Gothic Revival church and provides useful parish-history leads, but this review did not locate sufficiently strong church-specific evidence for a historic painted-interior program. Texas Defined will not promote Rowena on catalog inclusion alone; it remains a research candidate until primary, parish, archival or preservation evidence establishes the decorative work and its chronology.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/st-joseph-catholic-church-rowena/",
    ],
  },
  {
    slug: "cestohowa-nativity-of-the-blessed-virgin-mary",
    name: "Nativity of the Blessed Virgin Mary Catholic Church",
    city: "Cestohowa",
    status: "excluded",
    reason: "PaintedChurchesInTexas.com includes Cestohowa and the church is an important 1878 Polish Catholic landmark with a major Black Madonna tradition. However, SAH Archipedia specifically states that its vaulted ceilings did not receive painted interior decoration. THC and HABS verify the historic church and its extensive 1930s remodeling, but the stronger architectural evidence does not support counting it as a surviving Painted Church under Texas Defined's decorative-interior standard.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/nativity-of-the-blessed-virgin-mary-cestohowa-texas/",
      "https://atlas.thc.texas.gov/Details?atlasnumber=5255012347&fn=print",
      "https://www.loc.gov/item/tx0095/",
      "https://sah-archipedia.org/buildings/TX-01-SF34",
    ],
  },
  {
    slug: "hostyn-queen-of-the-holy-rosary",
    name: "Queen of the Holy Rosary Catholic Church",
    city: "Hostyn",
    status: "excluded",
    reason: "Hostyn belongs in the historical story but not the current surviving-church count. PaintedChurchesInTexas.com preserves useful history of the older parish complex; the earlier painted church was replaced by a modern church dedicated in 1966, and the parish's own record states that the 1966 building was totally destroyed by an explosion and fire on June 9, 2022. The parish is now rebuilding. Texas Defined records Hostyn as a historic-loss/rebuilding case rather than representing the current site as a surviving historic Painted Church.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/queen-of-the-holy-rosary-catholic-church-hostyn/",
      "https://www.hostynplumcatholic.org/queen-of-the-holy-rosary-hostyn",
      "https://hostynplumcatholic.org/news/a-note-of-gratitude",
      "https://hostynplumcatholic.org/rebuilding-church",
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
