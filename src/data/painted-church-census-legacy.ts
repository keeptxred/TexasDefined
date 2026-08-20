export type PaintedChurchCandidateStatus = "candidate" | "research-lead" | "scope-review" | "historic-loss" | "excluded";

export type PaintedChurchCensusEntry = {
  slug: string;
  name: string;
  city: string;
  status: PaintedChurchCandidateStatus;
  reason: string;
  sourceUrls: string[];
};

const HARWOOD = "https://txarchives.org/utaaa/finding_aids/00136.xml";

export const paintedChurchCandidateCensus: PaintedChurchCensusEntry[] = [
  {
    slug: "palestine-first-presbyterian-church",
    name: "First Presbyterian Church",
    city: "Palestine",
    status: "candidate",
    reason: "High-priority promotion candidate. Palestine's Historic Resources Survey documents the 1888 Gothic sanctuary, leaded and Tiffany memorial glass, and a ceiling hand-painted by an itinerant German craftsman that had not been retouched at the time of the 1989–1991 survey. The church is a Recorded Texas Historic Landmark, has a later individual National Register listing, and Buie Harwood preserved 23 church-specific research slides. Before promotion, Texas Defined is completing the current-condition, rights-cleared-image and full profile/research package so the church enters at the same standard as the verified collection.",
    sourceUrls: [
      "https://texashistory.unt.edu/ark:/67531/metapth25684/",
      "https://atlas.thc.texas.gov/Details/5001008751",
      HARWOOD,
    ],
  },
  {
    slug: "houston-annunciation-catholic-church",
    name: "Church of the Annunciation",
    city: "Houston",
    status: "candidate",
    reason: "High-priority promotion candidate. The active parish and Texas Historical Commission establish the historic downtown Houston church, while the Handbook of Texas documents Nicholas J. Clayton's architectural work and a sanctuary expansion that included a replica of Raphael's Transfiguration inside the dome. Harwood's archive groups Annunciation with First United Methodist Church in Paris in a 20-slide decorative-painting study. Texas Defined is completing current visual/integrity evidence before promotion and will not assume that every visible decorative surface is untouched original work.",
    sourceUrls: [
      "https://annunciationcc.org/about",
      "https://www.tshaonline.org/handbook/entries/church-of-the-annunciation-houston",
      "https://atlas.thc.texas.gov/Details?atlasnumber=2075001988",
      HARWOOD,
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
      HARWOOD,
      "https://sfcathedral.org/our-history",
    ],
  },
  {
    slug: "galveston-first-presbyterian-church",
    name: "First Presbyterian Church",
    city: "Galveston",
    status: "research-lead",
    reason: "Buie Harwood preserved 23 slides of First Presbyterian Church in Galveston between 1978 and 1984. The archival presence makes the church a real decorative-interior research lead, but archival inclusion alone does not establish a surviving Painted Churches program. Texas Defined requires exact decorative evidence and a current-condition review before promotion.",
    sourceUrls: [HARWOOD],
  },
  {
    slug: "waco-st-francis-on-the-brazos",
    name: "St. Francis on the Brazos Catholic Church",
    city: "Waco",
    status: "research-lead",
    reason: "Harwood's decorative-painting archive contains a 13-slide St. Francis on the Brazos group dated 1982–1984. The slide set is a strong discovery lead, but Texas Defined has not yet completed exact-building identity, surviving-interior and present-condition verification.",
    sourceUrls: [HARWOOD],
  },
  {
    slug: "san-antonio-st-rose-of-lima",
    name: "St. Rose of Lima Catholic Church",
    city: "San Antonio",
    status: "research-lead",
    reason: "Harwood's archive groups St. Rose of Lima with St. Sophia Greek Orthodox Church in a 10-slide San Antonio decorative-interior research set. Because the archive entry alone does not identify which features were being studied or what survives, this remains a research lead rather than a verified Painted Church.",
    sourceUrls: [HARWOOD],
  },
  {
    slug: "san-antonio-st-sophia-greek-orthodox",
    name: "St. Sophia Greek Orthodox Church",
    city: "San Antonio",
    status: "scope-review",
    reason: "Harwood studied St. Sophia as part of a San Antonio decorative-interior slide group, and the active parish documents historic Greek immigrant roots and an iconographic tradition. The parish is currently pursuing a new Sacred Spaces iconography installation. Texas Defined is keeping St. Sophia in scope review because Orthodox iconography is a distinct theological/artistic tradition and a modern installation should not be folded into the Western immigrant Painted Churches definition without an explicit methodology decision.",
    sourceUrls: [
      HARWOOD,
      "https://www.stsophiagoc.org/our-parish/",
      "https://www.stsophiagoc.org/our-parish/sacredspaces",
    ],
  },
  {
    slug: "san-antonio-our-lady-of-the-lake-university",
    name: "Our Lady of the Lake University chapel / church interior",
    city: "San Antonio",
    status: "research-lead",
    reason: "Harwood's archive contains 19 slides of Our Lady of the Lake University dated 1983. The entry is retained as a research lead until Texas Defined identifies the exact sacred-space subject of the slide set and verifies a qualifying surviving decorative program.",
    sourceUrls: [HARWOOD],
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
export const paintedChurchResearchLeads = paintedChurchCandidateCensus.filter((entry) => entry.status === "research-lead");
export const paintedChurchScopeReviews = paintedChurchCandidateCensus.filter((entry) => entry.status === "scope-review");
export const paintedChurchHistoricLosses = paintedChurchCandidateCensus.filter((entry) => entry.status === "historic-loss");
export const paintedChurchExclusions = paintedChurchCandidateCensus.filter((entry) => entry.status === "excluded");
