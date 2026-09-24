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
    slug: "mason-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    city: "Mason",
    status: "candidate",
    reason: "A strong promotion candidate discovered during the September 24 statewide follow-up. The parish's own history documents Manuel Lopez painting the interior in 1916 with a light-blue sky, dove, clouds, stars and angels; the 1963 expansion covered the painted ceiling with acoustical tile. A 2024 restoration project documents the historic painted vault's rediscovery and restoration. Texas Defined is retaining Mason as a candidate only until the canonical profile, image-rights review and collection-wide count update are completed together.",
    sourceUrls: [
      "https://www.stjosephmason.org/about-us",
      "https://www.studioiodesign.com/st-joseph-mason",
    ],
  },
  {
    slug: "east-bernard-holy-cross-catholic-church",
    name: "Holy Cross Catholic Church",
    city: "East Bernard",
    status: "candidate",
    reason: "PaintedChurchesInTexas.com surfaced Holy Cross as a candidate, and stronger primary sources confirm a significant 1925 Spanish Colonial Revival interior with Czech and German influences, angelic mosaics from Munich, hand-painted copper Stations of the Cross from Czechoslovakia and roundel stained glass. Texas Defined is holding it outside the verified Painted Churches count until church-specific evidence establishes a fixed wall, ceiling, mural or faux-finish program that meets the collection's painted-interior standard rather than decorative movable art alone.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/holy-cross-catholic-church-east-bernard/",
      "https://www.eastbernardcatholic.org/history",
      "https://atlas.thc.texas.gov/Details?atlasnumber=5481012292&fn=print",
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
    reason: "Hostyn belongs in the historical research trail, but the church building described by older Painted Churches coverage was destroyed by an explosion and fire on June 9, 2022. The parish began rebuilding in late 2025 and poured the new foundation in January 2026. Texas Defined will not count a destroyed predecessor as a currently visitable Painted Church or assume the replacement's decorative program before the new building is completed and documented.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/queen-of-the-holy-rosary-catholic-church-hostyn/",
      "https://hostynplumcatholic.org/queen-of-the-holy-rosary-hostyn",
      "https://hostynplumcatholic.org/rebuilding-church",
    ],
  },
  {
    slug: "rowena-st-joseph-catholic-church",
    name: "St. Joseph Catholic Church",
    city: "Rowena",
    status: "candidate",
    reason: "PaintedChurchesInTexas.com identifies the 1924 Gothic Revival church as part of its catalog, but its current page primarily documents parish history and does not provide church-specific evidence for a qualifying painted wall, ceiling, mural, stencil or faux-finish program. Texas Defined is retaining Rowena as a research candidate until stronger decorative-interior evidence is located.",
    sourceUrls: [
      "https://paintedchurchesintexas.com/st-joseph-catholic-church-rowena/",
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
