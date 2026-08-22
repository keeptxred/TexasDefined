import type { PaintedChurchPerson } from "./painted-church-person-types";

/** Contributor authority records required by object-level National Register evidence. */
export const paintedChurchRegisterGapPeople: PaintedChurchPerson[] = [
  {
    slug: "j-carlander",
    name: "Guy A. Carlander",
    roles: ["architect"],
    answer: "Guy A. Carlander was a prominent Amarillo architect identified in the National Register record as architect of the historic First Baptist Church property at 218 W. 13th Street, built in 1929–1930.",
    significance: [
      "The Texas Historical Commission National Register record lists the architect as J. Carlander; independent Texas architectural records identify the Amarillo architect as Guy A. Carlander.",
      "The nomination separately credits the Schnoor Company as interior craftsman, so Texas Defined keeps Carlander's architectural authorship distinct from the interior craft commission.",
      "Carlander's broader Panhandle career is documented in Texas architectural and National Register sources, which identify work spanning several early- and mid-twentieth-century styles.",
    ],
    churchSlugs: ["amarillo-first-baptist-church"],
    sourceLabel: "Texas Historical Commission — First Baptist Church National Register record",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003158",
  },
  {
    slug: "schnoor-company",
    name: "Schnoor Company",
    roles: ["studio", "craftsperson"],
    answer: "The Schnoor Company is identified by the First Baptist Church National Register nomination as the interior craftsman for the 1929–1930 historic Amarillo church.",
    significance: [
      "The nomination names the Schnoor Company separately from architect J. Carlander, establishing a documented interior-craft role rather than an inferred architectural attribution.",
      "Texas Defined retains the company as an authority entity while keeping paint-specific authorship unresolved unless a source ties a particular surviving finish or object to the firm.",
    ],
    churchSlugs: ["amarillo-first-baptist-church"],
    sourceLabel: "National Register nomination — First Baptist Church, Amarillo",
    sourceUrl: "https://atlas.thc.texas.gov/NR/pdfs/83003158/83003158.pdf",
  },
  {
    slug: "elmer-witter-van-slyke",
    name: "Elmer Witter Van Slyke",
    roles: ["architect"],
    answer: "Elmer Witter Van Slyke was a New York-trained architect who practiced with Clyde H. Woodruff in Oklahoma and Texas and whose firm designed significant religious and civic buildings during the early twentieth century, including the historic First United Methodist Church context represented in the Texas Painted Churches record at Paris.",
    significance: [
      "The Handbook of Texas documents Van Slyke's architectural training, long partnership with Clyde H. Woodruff, and the firm's relocation to Fort Worth.",
      "Texas Defined records Van Slyke and Woodruff as architectural contributors to the Paris church separately from the church's stained-glass ceiling and other decorative features unless object-level authorship is documented.",
    ],
    churchSlugs: ["paris-first-united-methodist-church"],
    sourceLabel: "Handbook of Texas — Van Slyke, Elmer Witter",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/van-slyke-elmer-witter",
  },
  {
    slug: "clyde-h-woodruff",
    name: "Clyde H. Woodruff",
    roles: ["architect"],
    answer: "Clyde H. Woodruff was a Fort Worth architect who practiced for many years with Elmer Witter Van Slyke and contributed to religious, civic and educational architecture across North Texas.",
    significance: [
      "The Handbook of Texas documents Woodruff's partnership with Van Slyke and their substantial Texas architectural practice.",
      "Texas Defined connects Woodruff to First United Methodist Church at Paris through the church-specific architectural record while keeping architecture distinct from later interior alteration and decorative-glass interpretation.",
    ],
    churchSlugs: ["paris-first-united-methodist-church"],
    sourceLabel: "Handbook of Texas — Woodruff, Clyde H.",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/woodruff-clyde-h",
  },
  {
    slug: "arthur-fatjo",
    name: "Arthur Fatjo",
    roles: ["artist", "decorator"],
    answer: "Arthur Fatjo was the interior craftsman credited by the National Register nomination with the circa-1945 freehand apse painting at the Church of the Immaculate Conception in the St. Mary's community of Lavaca County.",
    significance: [
      "The National Register nomination names Fatjo as interior craftsman and dates the painting to about 1945.",
      "The nomination describes a light-blue, white and beige cloudbank with winged cherub heads directed toward a central dove, giving Texas Defined unusually precise object-level attribution.",
      "The historical record describes Fatjo as an American who trained in Hamburg, Germany, and worked for the Drapato Statuary Company of Chicago painting religious sculpture and church interiors.",
    ],
    churchSlugs: ["st-marys-immaculate-conception-lavaca"],
    techniqueSlugs: ["freehand", "decorative-murals"],
    sourceLabel: "National Register nomination — Church of the Immaculate Conception, St. Mary's",
    sourceUrl: "https://atlas.thc.texas.gov/NR/pdfs/83003150/83003150.pdf",
  },
];
