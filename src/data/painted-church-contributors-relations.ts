import type { PaintedChurchContributor } from "./painted-church-contributors";

/**
 * Relationship corrections that require a later authority source than the legacy
 * person catalog. These records override the same contributor slugs in the public
 * contributor index so reciprocal church/person relationships stay symmetrical.
 */
export const paintedChurchRelationshipContributors: PaintedChurchContributor[] = [
  {
    slug: "ferdinand-stockert",
    name: "Ferdinand Stockert",
    kind: "person",
    roles: ["artist", "decorator"],
    answer: "Ferdinand Stockert was a San Antonio decorative painter documented with Hermann Kern at Nativity of Mary in High Hill and at St. Joseph Catholic Church in downtown San Antonio. Austin PBS identifies the pair as the painters of High Hill's 1912 decorative campaign and states that they also painted the walls and ceiling of St. Joseph's.",
    significance: [
      "The High Hill campaign is one of the best documented examples of paint functioning as architectural illusion in the Texas Painted Churches corpus.",
      "Austin PBS explicitly carries Stockert and Kern's authorship from High Hill to St. Joseph in San Antonio, making the pair a cross-church relationship rather than a single-site attribution.",
      "Texas Defined keeps the Stockert/Kern wall-and-ceiling attribution at St. Joseph separate from Rev. Henry Pefferkorn's independently documented parish artwork until specific surviving scenes can be assigned object by object.",
    ],
    churchSlugs: ["high-hill-nativity-of-mary", "san-antonio-st-joseph-catholic-church"],
    techniqueSlugs: ["canvas-applied-decoration", "trompe-loeil-architectural-illusion", "stenciling", "freehand"],
    sourceLabel: "Austin PBS — High Hill / Stockert and Kern",
    sourceUrl: "https://austinpbs.org/paintedchurches/highhill",
    sources: [
      { label: "Austin PBS — High Hill", url: "https://austinpbs.org/paintedchurches/highhill", use: "1912 High Hill attribution and explicit St. Joseph San Antonio cross-church attribution" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml", use: "decorative-painting research context for High Hill and St. Joseph" },
    ],
    attributionNote: "At St. Joseph, Stockert/Kern are documented for walls and ceiling as a whole. Do not attribute individual surviving scenes to either painter separately without object-level evidence.",
  },
  {
    slug: "hermann-kern",
    name: "Hermann Kern",
    kind: "person",
    roles: ["artist", "decorator"],
    answer: "Hermann Kern was the decorative painter paired with Ferdinand Stockert in the documented 1912 High Hill campaign and in wall-and-ceiling painting at St. Joseph Catholic Church in San Antonio.",
    significance: [
      "Austin PBS names Kern with Stockert at High Hill and explicitly says the pair also painted St. Joseph's walls and ceiling in San Antonio.",
      "The two-church relationship connects the famous rural High Hill interior to a major German Catholic church in urban San Antonio.",
      "The attribution is kept at the campaign level unless a primary or archival record identifies a specific surviving object as Kern's individual work.",
    ],
    churchSlugs: ["high-hill-nativity-of-mary", "san-antonio-st-joseph-catholic-church"],
    techniqueSlugs: ["canvas-applied-decoration", "trompe-loeil-architectural-illusion", "stenciling", "freehand"],
    sourceLabel: "Austin PBS — High Hill / Stockert and Kern",
    sourceUrl: "https://austinpbs.org/paintedchurches/highhill",
    sources: [
      { label: "Austin PBS — High Hill", url: "https://austinpbs.org/paintedchurches/highhill", use: "1912 High Hill attribution and explicit St. Joseph San Antonio cross-church attribution" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml", use: "decorative-painting research context for High Hill and St. Joseph" },
    ],
    attributionNote: "At St. Joseph, Stockert/Kern are documented for the wall-and-ceiling campaign collectively; individual object attribution remains open.",
  },
];
