import type { PaintedChurchContributor } from "./painted-church-contributors";

/**
 * Named contributors cleared during the final pre-index authority audit.
 * These records require a church-specific source trail; broader Texas decorative-art
 * figures remain in the bibliography/Harwood research layer until a verified church
 * relationship is established.
 */
export const paintedChurchPreindexDeepContributors: PaintedChurchContributor[] = [
  {
    slug: "rev-louis-netardus",
    name: "Rev. Louis Netardus",
    kind: "person",
    roles: ["clergy-artist", "artist", "decorator"],
    answer: "Rev. Louis Netardus was pastor at Praha beginning in 1901 and a documented painter who further embellished St. Mary's Church of the Assumption after Gottfried Flury's earlier decorative work. Austin PBS preserves a rare historical photograph of Netardus holding a paint brush beside his life-size painting of Saints Cyril and Methodius.",
    significance: [
      "Austin PBS identifies Netardus by name as one of the artists of St. Mary's at Praha.",
      "A 1919 Southern Messenger description quoted by Austin PBS says Netardus cultivated both music and painting in addition to his ministry.",
      "The period photograph of Netardus beside his Saints Cyril and Methodius painting is unusually strong authorship evidence for a Painted Churches artist.",
      "Texas Defined keeps Netardus's later embellishment distinct from Gottfried Flury's earlier ceiling work and Gene Mikulik's twentieth-century restoration/additions.",
    ],
    churchSlugs: ["praha-st-marys-assumption"],
    techniqueSlugs: ["freehand", "decorative-murals"],
    sourceLabel: "Austin PBS — St. Mary's Church of the Assumption, Praha",
    sourceUrl: "https://austinpbs.org/paintedchurches/praha",
    sources: [
      { label: "Austin PBS — Praha", url: "https://austinpbs.org/paintedchurches/praha", use: "artist attribution, pastor chronology and period photograph description" },
      { label: "National Register thematic nomination — Praha", url: "https://atlas.thc.texas.gov/NR/pdfs/83003138/83003138.pdf", use: "historic church and decorative-interior context" },
    ],
    attributionNote: "The verified sources establish that Netardus painted and embellished the Praha interior, including a life-size Saints Cyril and Methodius painting. Do not attribute every later Praha decorative element to him unless an object-level source does so.",
  },
  {
    slug: "dr-oidtmann-studios",
    name: "Dr. Oidtmann Studios, Inc.",
    kind: "organization",
    roles: ["interior-craftsman", "decorator"],
    answer: "Dr. Oidtmann Studios, Inc. is the New York firm named in the National Register record for the major 1936 decorative campaign at New St. Mary's Catholic Church in Fredericksburg. Austin PBS likewise identifies Oidtmann Studios as the 1936 artist/decorative firm.",
    significance: [
      "The National Register nomination explicitly lists Dr. Oidtmann Studios as the 1936 interior craftsman.",
      "The nomination says the firm's work significantly modified the church's earlier 1906–1908 painting and records that young German artists are believed to have executed the campaign.",
      "Later 1970s rehabilitation deleted portions of the decorative scheme because a full restoration was unaffordable, making the 1936 Oidtmann work central to understanding Fredericksburg's layered interior integrity.",
      "Austin PBS independently identifies Donecker and Sons with the earlier campaign and Oidtmann Studios with the 1936 campaign, supporting a multi-phase authorship model rather than a single-painter story.",
    ],
    churchSlugs: ["fredericksburg-st-marys-catholic-church"],
    techniqueSlugs: ["stenciling", "freehand", "gilding-metallic-accents"],
    sourceLabel: "National Register nomination — St. Mary's Catholic Church, Fredericksburg",
    sourceUrl: "https://atlas.thc.texas.gov/NR/pdfs/83003143/83003143.pdf",
    sources: [
      { label: "National Register nomination — St. Mary's Fredericksburg", url: "https://atlas.thc.texas.gov/NR/pdfs/83003143/83003143.pdf", use: "1936 interior-craftsman attribution, campaign chronology and later alteration history" },
      { label: "Austin PBS — Fredericksburg St. Mary's", url: "https://austinpbs.org/paintedchurches/fredericksburg", use: "independent 1936 Oidtmann attribution and relationship to the earlier Donecker campaign" },
    ],
    attributionNote: "The firm is documented at campaign level. Individual young German painters employed on the 1936 project remain unidentified in the verified source set and should not be invented or inferred.",
  },
];
