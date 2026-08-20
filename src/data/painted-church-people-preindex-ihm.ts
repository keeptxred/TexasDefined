import type { PaintedChurchPerson } from "./painted-church-person-types";

export const immaculateHeartOfMaryPeople: PaintedChurchPerson[] = [
  {
    slug: "bartola-ihm-san-antonio",
    name: "Bartola — Immaculate Heart of Mary decorator",
    roles: ["artist", "decorator", "unresolved-attribution"],
    answer: "A Mexican artist from Los Angeles identified in Immaculate Heart of Mary's parish chronicle as Bartola executed the church's original documented stencil decoration from January through May 1944. The currently verified archive record does not establish a fuller personal identity.",
    significance: [
      "The Claretian Missionaries Archives recovered Bartola's name and the 1944 dates from the parish chronicle.",
      "The archive specifically documents stencil use, making this a rare church-specific technique attribution.",
      "Texas Defined preserves the partial historical name rather than expanding it into an unsupported identity.",
    ],
    churchSlugs: ["san-antonio-immaculate-heart-of-mary"],
    techniqueSlugs: ["stenciling"],
    sourceLabel: "Claretian Missionaries Archives — A Work of Heart",
    sourceUrl: "https://claretianmissionariesarchives.org/a-work-of-heart-a-history-of-the-painted-walls-of-immaculate-heart-of-mary-church/",
  },
  {
    slug: "fr-alberto-domingo",
    name: "Fr. Alberto Domingo, C.M.F.",
    roles: ["clergy-artist", "restorer"],
    answer: "Fr. Alberto Domingo, C.M.F. was the Claretian priest and artist who led the major restoration of Immaculate Heart of Mary's painted interior during the 1980s. The Claretian archives distinguish his restoration from Bartola's original 1944 stencil campaign.",
    significance: [
      "The parish publicly credits Domingo with hand-painted stencil motifs and identifies his artistic legacy as central to the present interior.",
      "The Claretian archive places his work in the restoration chronology and notes that he had studied art in Spain.",
      "His 1989 transfer left the project to hired laborers shortly before the 1991 arson forced another major round of reconstruction and restoration.",
    ],
    churchSlugs: ["san-antonio-immaculate-heart-of-mary"],
    techniqueSlugs: ["stenciling", "freehand"],
    sourceLabel: "Claretian Missionaries Archives — A Work of Heart",
    sourceUrl: "https://claretianmissionariesarchives.org/a-work-of-heart-a-history-of-the-painted-walls-of-immaculate-heart-of-mary-church/",
  },
];
