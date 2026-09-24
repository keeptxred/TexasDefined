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
    reason: "PaintedChurchesInTexas.com identifies Holy Cross as a Painted Church, and stronger church-specific sources confirm a 1925 Spanish Colonial Revival sanctuary with Czech- and German-inspired interior decoration, Munich mosaics, hand-painted copper Stations of the Cross and roundel stained glass. Texas Defined is holding the church as a candidate until the surviving painted-wall or ceiling program and its chronology are documented to the same standard as the verified collection.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/holy-cross-catholic-church-east-bernard/",
      "https://www.eastbernardcatholic.org/history",
      "https://atlas.thc.texas.gov/Details?atlasnumber=5481012292",
    ],
  },
  {
    slug: "rowena-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    city: "Rowena",
    status: "candidate",
    reason: "PaintedChurchesInTexas.com includes the active 1924 Gothic Revival church in its catalog, but its church-specific page does not document a painted interior program. The Diocese of San Angelo confirms the exact active parish. Texas Defined is preserving the lead while seeking exact-building evidence for murals, stenciling, decorative painting or a historic painted campaign.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/st-joseph-catholic-church-rowena/",
      "https://www.sanangelodiocese.org/parishes",
    ],
  },
  {
    slug: "cestohowa-nativity-blessed-virgin-mary",
    name: "Nativity of the Blessed Virgin Mary Catholic Church",
    city: "Cestohowa",
    status: "excluded",
    reason: "The 1878 Polish-Texan church preserves important art and immigrant history, including the Black Madonna presented by Panna Maria, but SAH Archipedia specifically records that its vaulted ceilings did not receive painted interior decoration. Texas Defined therefore documents the church as a related heritage site rather than counting it in the verified decorative-interior collection.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/nativity-of-the-blessed-virgin-mary-cestohowa-texas/",
      "https://atlas.thc.texas.gov/Details?atlasnumber=5255012347",
      "https://www.loc.gov/item/tx0095/",
      "https://sah-archipedia.org/buildings/TX-01-SF34",
    ],
  },
  {
    slug: "hostyn-queen-holy-rosary",
    name: "Queen of the Holy Rosary Catholic Church",
    city: "Hostyn",
    status: "excluded",
    reason: "Hostyn has exceptional Czech-Catholic history and appears in the secondary Painted Churches catalog, but the church building was destroyed by an explosion and fire on June 9, 2022. The grotto, chapels and outdoor Stations survived and remain important heritage resources; the lost building is not counted as a currently visitable Painted Church.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/queen-of-the-holy-rosary-catholic-church-hostyn/",
      "https://www.hostynplumcatholic.org/queen-of-the-holy-rosary-hostyn",
      "https://hostynplumcatholic.org/news/a-note-of-gratitude",
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
