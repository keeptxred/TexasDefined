import type { PaintedChurchResearchDossier } from "./painted-church-research";

const dossiers: PaintedChurchResearchDossier[] = [
  {
    slug: "waco-st-francis-on-the-brazos",
    researchSummary: "St. Francis on the Brazos is one of the strongest twentieth-century additions to the broader statewide Painted Churches tradition because its decorative program is church-specific, named, large-scale and culturally contextualized. Parish and diocesan sources credit Pedro Juan Barceló with canvas paintings installed on the walls, while a Baylor-preserved historical description names Raggi for the monumental sanctuary composition. The responsible interpretation is to preserve that object-level attribution conflict until archival documentation proves whether the sources describe separate works, collaborators or competing attributions.",
    lookFor: [
      { label: "Canvas-applied paintings", detail: "The Diocese of Austin describes major works painted on canvas and sent to Waco for installation, making the method itself part of the church's significance." },
      { label: "Nearly life-size Stations", detail: "The Stations of the Cross use unusually large figures and form a major devotional cycle along the church walls." },
      { label: "Franciscan history scenes", detail: "The decorative program includes the Glorification of St. Francis and scenes of Franciscan missionary activity in Texas." },
      { label: "Sanctuary composition", detail: "A Baylor-preserved historical account describes a very large sanctuary painting attributed to Raggi; treat that attribution separately from Barceló until the relationship is resolved." },
      { label: "Mission-inspired architecture", detail: "Read the paintings together with the 1931 church's adaptation of Spanish mission and Renaissance forms rather than as portable pictures detached from the architecture." },
    ],
    interpretation: [
      {
        heading: "A Mexican American parish with transatlantic Franciscan art",
        paragraphs: [
          "St. Francis was established to serve Waco's Mexican Catholic community and has remained closely tied to Franciscan ministry. The painted program combines local parish identity, Texas Franciscan history and an artist connection to Mallorca, Spain.",
          "That makes the church especially useful for expanding the Painted Churches narrative beyond the Czech- and German-settled rural belt without diluting the collection's core requirement: a documented church-specific decorative interior.",
        ],
      },
      {
        heading: "Why the Barceló/Raggi conflict should stay visible",
        paragraphs: [
          "The parish and Diocese of Austin identify Pedro Juan Barceló as the painter of major wall works and Stations. A historical description preserved by Baylor attributes the huge sanctuary composition to Raggi. Those claims can coexist if they concern different works; they conflict only if later evidence proves they describe the same painting.",
          "Texas Defined therefore records contributor relationships at the artwork level instead of assigning one blanket painter to every painted surface in the church. This is the same source-conflict discipline used elsewhere in the collection for construction dates, restoration phases and architect names.",
        ],
      },
    ],
    communityContext: [
      {
        heading: "Franciscan and Mexican American Waco",
        paragraphs: [
          "The parish was established in 1924 and the present church was dedicated in 1931. Historical sources describe its long service to Waco's Mexican American community and its deliberate mission-inspired architecture.",
          "The result is a Painted Church story shaped as much by twentieth-century Mexican American Catholic life and Franciscan memory as by European immigrant settlement.",
        ],
      },
    ],
    recordNotes: [
      "Do not treat Raggi as an alternate spelling or alias for Pedro Juan Barceló; no verified source currently establishes that.",
      "Do not call every interior work fresco. The diocesan source specifically documents major paintings made on canvas and installed on the walls.",
      "Do not infer current paint integrity from historical photographs or descriptions; conservation and field verification remain open tasks.",
    ],
    sources: [
      { label: "St. Francis on the Brazos — official parish centennial/history resources", url: "https://stfrancistorwaco.org/100th-anniversary", tier: "official", use: "parish identity, historical resources and current stewardship" },
      { label: "Diocese of Austin — St. Francis on the Brazos parish record", url: "https://www.austindiocese.org/parishfinder", tier: "official", use: "current parish identity, address, worship schedule and responsible organization" },
      { label: "Catholic Spirit — Franciscan roots run deep at St. Francis Parish", url: "https://files.ecatholic.com/16494/documents/2022/10/CSM_09-01-001-024%201.pdf?t=1666198738000", tier: "official", use: "Franciscan parish context and twentieth-century continuity" },
      { label: "Baylor University Texas Collection — St. Francis on the Brazos", url: "https://blogs.baylor.edu/texascollection/2019/11/15/st-francis-on-the-brazos/", tier: "scholarly", use: "1931 dedication, mission-inspired design and historical Raggi sanctuary attribution" },
    ],
  },
];

export function preindexPaintedChurchResearchBySlug(slug: string) {
  return dossiers.find((dossier) => dossier.slug === slug);
}
