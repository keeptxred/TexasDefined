import type { PaintedChurchProfile } from "./painted-church-profiles";

const profiles: PaintedChurchProfile[] = [
  {
    slug: "waco-st-francis-on-the-brazos",
    quickAnswer: "St. Francis on the Brazos in Waco belongs in the broader Texas Painted Churches tradition because the active parish and Diocese of Austin document a large sacred-art program by Mallorcan painter Pedro Juan Barceló, including nearly life-size Stations of the Cross and Franciscan scenes painted on canvas and installed on the church walls. A Baylor-preserved historical description separately attributes a monumental sanctuary composition to an artist named Raggi, so Texas Defined preserves the possibility of distinct works or competing historical attribution rather than merging the names.",
    foundedYear: 1924,
    builtYear: 1931,
    architecture: "Mission-inspired / Spanish Renaissance adaptation based on Mission San José",
    architect: "Roy E. Lane",
    artists: ["Pedro Juan Barceló"],
    heritage: "Franciscan Catholic parish serving Waco's Mexican American community, with artistic contributions from Mallorca, Spain",
    facts: [
      { label: "Parish founded", value: "1924" },
      { label: "Present church", value: "Dedicated November 26, 1931" },
      { label: "Architect", value: "Roy E. Lane" },
      { label: "Design source", value: "Mission-inspired church modeled in part on Mission San José in San Antonio" },
      { label: "Principal documented painter", value: "Pedro Juan Barceló of Mallorca, Spain" },
      { label: "Painting method", value: "Diocesan history describes major paintings executed on canvas and sent to Waco for installation" },
      { label: "Major subjects", value: "Stations of the Cross, the Glorification of St. Francis, and scenes of Franciscan missionary arrival, preaching and martyrdom in Texas" },
      { label: "Attribution question", value: "A Baylor-preserved historical description separately attributes the large sanctuary composition to Raggi; Texas Defined treats that as an unresolved object-level attribution issue" },
    ],
    history: [
      {
        heading: "A Franciscan parish rooted in Mexican American Waco",
        paragraphs: [
          "St. Francis on the Brazos was established in 1924 and has long served Waco's Mexican American Catholic community. The present church followed an earlier wooden building and was dedicated in 1931 during the Depression era.",
          "Its architecture deliberately evokes the Spanish mission tradition. Historical descriptions compare the building to Mission San José in San Antonio while noting that the Waco interior adapted Roman, Moorish and Spanish Gothic motifs rather than reproducing the mission exactly.",
        ],
      },
      {
        heading: "Sacred art conceived as part of the building's identity",
        paragraphs: [
          "The church's interior painting is not a later travel-brand embellishment. Parish and diocesan sources treat the artwork as part of the church's historic Franciscan identity, with large narrative paintings covering important wall fields and devotional Stations integrated into the architecture.",
        ],
      },
    ],
    paintings: [
      {
        heading: "Pedro Juan Barceló's wall paintings and Stations",
        paragraphs: [
          "The parish and Diocese of Austin credit Pedro Juan Barceló of Mallorca with a major interior program. The diocesan account describes paintings executed on canvas and transported to Waco for installation on the walls. Subjects include nearly life-size Stations of the Cross, the Glorification of St. Francis and scenes tied to early Franciscan missionaries in Texas.",
          "Because the works were made on canvas and applied to the walls, St. Francis provides a valuable comparison with High Hill's separately documented canvas-applied decoration while representing a different period, artistic program and cultural context.",
        ],
      },
      {
        heading: "The Raggi sanctuary attribution remains open",
        paragraphs: [
          "A historical description preserved by Baylor's Texas Collection attributes the enormous sanctuary-wall and half-dome composition to an artist identified as Raggi. The same description gives the work extraordinary scale and a Franciscan historical subject.",
          "The current parish and diocesan histories emphasize Barceló for the church's major wall paintings. Texas Defined does not assume those statements describe the same object. Until archival records establish the relationship, Raggi remains an unresolved attribution attached specifically to the historical sanctuary description rather than an alternate name for Barceló.",
        ],
      },
    ],
    preservation: [
      {
        heading: "Preserve the distinction between artwork, attribution and current condition",
        paragraphs: [
          "The historic paintings remain central to the church's identity, but Texas Defined currently marks overall interior integrity uncertain until a conservation or field record documents later cleaning, repair, overpainting, canvas treatment and the survival of individual compositions.",
        ],
      },
    ],
    visitorNotes: [
      "St. Francis remains an active parish. The Diocese of Austin confirms the current address and liturgical schedule; verify sightseeing access and any posted photography restrictions before visiting primarily for the artwork.",
    ],
    sources: [
      { label: "St. Francis on the Brazos — official parish history / centennial resources", url: "https://stfrancistorwaco.org/100th-anniversary" },
      { label: "Diocese of Austin — St. Francis on the Brazos parish record", url: "https://www.austindiocese.org/parishfinder" },
      { label: "Diocese of Austin Catholic Spirit — Franciscan roots at St. Francis", url: "https://files.ecatholic.com/16494/documents/2022/10/CSM_09-01-001-024%201.pdf?t=1666198738000" },
      { label: "Baylor University Texas Collection — St. Francis on the Brazos", url: "https://blogs.baylor.edu/texascollection/2019/11/15/st-francis-on-the-brazos/" },
    ],
  },
];

export function preindexPaintedChurchProfileBySlug(slug: string) {
  return profiles.find((profile) => profile.slug === slug);
}
