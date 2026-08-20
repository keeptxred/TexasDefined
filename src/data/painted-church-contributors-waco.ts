import type { PaintedChurchContributor } from "./painted-church-contributors";

export const paintedChurchWacoContributors: PaintedChurchContributor[] = [
  {
    slug: "roy-e-lane",
    name: "Roy E. Lane",
    kind: "person",
    roles: ["architect"],
    answer: "Roy E. Lane was the Waco architect of the 1931 St. Francis on the Brazos church. In a contemporary dedication publication he explained how the design adapted Mission San José rather than copying it literally, and he described the Spanish Renaissance interior, sanctuary mural, tile and ornamental program in unusually detailed first-person architectural evidence.",
    significance: [
      "Lane's 1931 explanation is a primary design source rather than a later stylistic attribution.",
      "He distinguished the Waco building's proportions and interior plan from Mission San José while intentionally reusing its visual vocabulary, including the rose-window idea.",
      "His account records the sanctuary painting attributed to Raggi, Spanish tile and Moorish/Spanish Gothic ornament as parts of the original architectural ensemble.",
    ],
    churchSlugs: ["waco-st-francis-on-the-brazos"],
    sourceLabel: "Roy E. Lane — A Short Explanation of the Church of Saint Francis, preserved by The Texas Collection",
    sourceUrl: "https://blogs.baylor.edu/texascollection/2019/11/15/st-francis-on-the-brazos/",
    sources: [
      { label: "The Texas Collection — Texas Over Time: St. Francis on the Brazos", url: "https://blogs.baylor.edu/texascollection/2019/11/15/st-francis-on-the-brazos/", use: "reproduces Lane's 1931 architect statement and identifies the original dedication publication" },
      { label: "SAH Archipedia — St. Francis on the Brazos", url: "https://sah-archipedia.org/buildings/TX-01-WT5", use: "independent architectural attribution and design context" },
    ],
  },
];
