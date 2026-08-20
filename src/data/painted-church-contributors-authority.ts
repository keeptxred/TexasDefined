import type { PaintedChurchContributor } from "./painted-church-contributors";

export const paintedChurchAuthorityContributors: PaintedChurchContributor[] = [
  {
    slug: "arthur-fatjo",
    name: "Arthur Fatjo",
    kind: "person",
    roles: ["artist", "decorator"],
    answer: "Arthur Fatjo is the decorative painter credited in the National Register nomination with the cloudbank, cherub-head and dove composition in the apse ceiling of the Church of the Immaculate Conception at St. Mary's in Lavaca County around 1945.",
    significance: [
      "The nomination identifies Fatjo by name and dates the decorative work to about 1945.",
      "The same record states that he trained in Hamburg, Germany, at the Bijoa Studios and was employed by the Drapato Statuary Company of Chicago.",
      "His documented work gives the St. Mary's Lavaca interior a named twentieth-century authorship rather than leaving the apse decoration anonymous.",
    ],
    churchSlugs: ["st-marys-immaculate-conception-lavaca"],
    techniqueSlugs: ["freehand", "decorative-murals"],
    sourceLabel: "National Register nomination — Church of the Immaculate Conception, St. Mary's",
    sourceUrl: "https://atlas.thc.texas.gov/NR/pdfs/83003150/83003150.pdf",
    sources: [
      { label: "National Register nomination — Church of the Immaculate Conception", url: "https://atlas.thc.texas.gov/NR/pdfs/83003150/83003150.pdf", use: "artist attribution, training, employer and c. 1945 apse decoration" },
    ],
  },
];
