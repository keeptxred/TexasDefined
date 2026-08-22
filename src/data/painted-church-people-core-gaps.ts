import type { PaintedChurchPerson } from "./painted-church-person-types";

/**
 * Source-backed contributor records added during the pre-index graph-integrity sweep.
 * These exist because object-level church records already cite the contributor IDs;
 * the authority graph must not contain dangling authorship/restoration edges.
 */
export const paintedChurchCoreGapPeople: PaintedChurchPerson[] = [
  {
    slug: "rev-louis-netardus",
    name: "Rev. Louis Netardus",
    roles: ["clergy-artist", "artist"],
    answer: "Rev. Louis Netardus was the Praha pastor who further embellished St. Mary's Church of the Assumption after Gottfried Flury's decorative campaign. Austin PBS documents Netardus as a priest accomplished in music and painting and preserves evidence of him posed with his life-size painting of Saints Cyril and Methodius.",
    significance: [
      "Austin PBS names Netardus as one of the artists represented inside St. Mary's at Praha and dates his pastorate there from 1901.",
      "The project cites a 1919 Southern Messenger account describing Netardus as successful in music and painting as well as preaching in the Bohemian language.",
      "A rare historical photograph identified by the Austin PBS project shows Netardus with his Saints Cyril and Methodius painting, making him one of the best visually documented clergy-artists in the collection.",
    ],
    churchSlugs: ["praha-st-marys-assumption"],
    techniqueSlugs: ["freehand", "decorative-murals"],
    sourceLabel: "Austin PBS — St. Mary's Church of the Assumption, Praha",
    sourceUrl: "https://austinpbs.org/paintedchurches/praha",
  },
  {
    slug: "ed-janecka",
    name: "Ed Janecka",
    roles: ["restorer"],
    answer: "Ed Janecka was a community leader in the 1980s restoration of Saints Cyril and Methodius Church at Dubina after the historic decorative scheme had been whitewashed in the 1950s.",
    significance: [
      "Austin PBS records Janecka's childhood memory of faint earlier designs becoming visible in sunlight and his later role, with Butch Koenig, in uncovering and restoring the church's decorative program.",
      "Recovered historic stencils and surviving traces informed the restoration, while Janecka openly acknowledged artistic license in areas where evidence was incomplete.",
      "His documented account is unusually important because it helps distinguish evidence-based reconstruction from untouched original paint at Dubina.",
    ],
    churchSlugs: ["dubina-saints-cyril-methodius"],
    techniqueSlugs: ["stenciling", "freehand"],
    sourceLabel: "Austin PBS — Saints Cyril and Methodius Church, Dubina",
    sourceUrl: "https://austinpbs.org/paintedchurches/dubina",
  },
  {
    slug: "butch-koenig",
    name: "Butch Koenig",
    roles: ["restorer"],
    answer: "Butch Koenig is identified by Austin PBS as one of the community leaders who worked with Ed Janecka in the 1980s restoration of the historic decorative interior at Saints Cyril and Methodius Church in Dubina.",
    significance: [
      "Austin PBS names Koenig directly in the church-specific restoration history.",
      "His role belongs to the twentieth-century reconstruction campaign and must be kept distinct from the unknown original painter of Dubina's historic interior.",
      "The restoration used surviving traces and recovered stencils but also included disclosed artistic interpretation where the historical evidence was incomplete.",
    ],
    churchSlugs: ["dubina-saints-cyril-methodius"],
    techniqueSlugs: ["stenciling"],
    sourceLabel: "Austin PBS — Saints Cyril and Methodius Church, Dubina",
    sourceUrl: "https://austinpbs.org/paintedchurches/dubina",
  },
  {
    slug: "robert-alden-marshall",
    name: "Robert Alden Marshall",
    roles: ["restorer"],
    answer: "Robert Alden Marshall is a Texas conservator whose firm restored Painted Church interiors at High Hill and Dubina and whose broader conservation career includes major historic Texas art and architectural finishes.",
    significance: [
      "The Texas Historical Commission's Real Places conference biography describes Marshall as a conservator with decades of experience in historic art and architectural finishes.",
      "That THC biography specifically states that R. Alden Marshall & Associates restored the interiors of Saints Cyril and Methodius Church in Dubina and St. Mary Church at High Hill.",
      "Friends of the Texas Historical Commission separately featured Marshall discussing preservation work at High Hill and Dubina, making his role part of the documented modern conservation history of both churches.",
    ],
    churchSlugs: ["high-hill-nativity-of-mary", "dubina-saints-cyril-methodius"],
    sourceLabel: "Texas Historical Commission — Real Places 2019 program",
    sourceUrl: "https://www.thc.texas.gov/public/upload/publications/RP19_ProgramGuide_web.pdf",
  },
];
