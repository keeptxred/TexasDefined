import type { PaintedChurchPerson } from "./painted-church-person-types";

const THEMATIC_NOMINATION = "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13";

export const supplementalPreindexPaintedChurchPeople: PaintedChurchPerson[] = [
  {
    slug: "joseph-bleicke",
    name: "Joseph Bleicke",
    roles: ["architect"],
    answer: "Joseph Bleicke was a German immigrant architect in Galveston credited by local heritage documentation with the 1859–1860 St. Joseph's Church, the wooden Gothic Revival building that later became the historically missing fifteenth property in the statewide decorative-interior thematic study.",
    significance: [
      "His design gave Galveston's German Catholic congregation the surviving wooden Gothic Revival shell that contains the painted ceiling, faux-grained pews and German-inscribed devotional objects.",
      "Recording Bleicke separately from later painters, restorers and preservation organizations preserves the building's layered authorship chronology.",
    ],
    churchSlugs: ["galveston-st-joseph-church"],
    sourceLabel: "Galveston heritage profile — 1859 St. Joseph's Church",
    sourceUrl: "https://www.galveston.com/whattodo/tours/self-guided-tours/historic-architecture/stjosephchurch/",
  },
  {
    slug: "dudley-and-dudley",
    name: "Dudley and Dudley",
    roles: ["architect"],
    answer: "Dudley and Dudley are identified in Palestine's historic-resources survey as the architects of the 1888 First Presbyterian Church sanctuary with its documented hand-painted ceiling and memorial glass.",
    significance: [
      "The attribution anchors the painted ceiling to a specifically documented Gothic Revival architectural setting.",
      "Texas Defined separates the architectural firm's role from builder Joseph Frederick Wolff and the unidentified itinerant German ceiling painter.",
    ],
    churchSlugs: ["palestine-first-presbyterian-church"],
    sourceLabel: "Portal to Texas History — First Presbyterian Church historic-resources survey",
    sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth25805/",
  },
  {
    slug: "joseph-frederick-wolff",
    name: "Joseph Frederick Wolff",
    roles: ["builder", "craftsperson"],
    answer: "Joseph Frederick Wolff is identified in Palestine's historic-resources survey as the builder of First Presbyterian Church and as the craftsman who made its bricks from local clay.",
    significance: [
      "His documented brickmaking connects the physical church fabric directly to local Palestine material history.",
      "The record distinguishes Wolff's building and craft work from the unidentified German craftsman responsible for the painted ceiling.",
    ],
    churchSlugs: ["palestine-first-presbyterian-church"],
    sourceLabel: "Portal to Texas History — First Presbyterian Church historic-resources survey",
    sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth25805/",
  },
  {
    slug: "gt-scott",
    name: "G. T. Scott",
    roles: ["builder"],
    answer: "G. T. Scott is identified in Palestine's historic-resources survey as contractor for the 1888 First Presbyterian Church sanctuary.",
    significance: [
      "The contractor attribution helps separate design, construction, local brickmaking and decorative painting into distinct documented roles.",
    ],
    churchSlugs: ["palestine-first-presbyterian-church"],
    sourceLabel: "Portal to Texas History — First Presbyterian Church historic-resources survey",
    sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth25805/",
  },
  {
    slug: "palestine-presbyterian-unidentified-german-painter",
    name: "Unidentified itinerant German painter — First Presbyterian Palestine",
    roles: ["unresolved-attribution", "artist"],
    answer: "Palestine's city historic-resources survey records that an itinerant German craftsman hand painted the ceiling of First Presbyterian Church, but the surviving public record used by Texas Defined does not identify him by name.",
    significance: [
      "The church-specific attribution is strong enough to preserve as an authorship record even though the painter's personal identity is lost.",
      "Keeping the contributor explicitly unidentified prevents a later secondary source from being mistaken for a documented name.",
    ],
    churchSlugs: ["palestine-first-presbyterian-church"],
    techniqueSlugs: ["freehand"],
    sourceLabel: "Portal to Texas History — First Presbyterian Church historic-resources survey",
    sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth25805/",
  },
  {
    slug: "edmond-fatjo",
    name: "Edmond Fatjo",
    roles: ["craftsperson"],
    answer: "Edmond Fatjo is identified in the National Register documentation for Saints Cyril and Methodius Church in Shiner as an interior craftsman associated with the historic church.",
    significance: [
      "The National Register attribution adds a named interior craft contributor to Shiner's documented building history.",
      "Texas Defined records Fatjo as an interior craftsman rather than automatically labeling him the painter of every decorative surface.",
    ],
    churchSlugs: ["shiner-saints-cyril-methodius"],
    sourceLabel: "National Register nomination — Saints Cyril and Methodius Church, Shiner",
    sourceUrl: "https://npgallery.nps.gov/AssetDetail/NRIS/83003151",
  },
  {
    slug: "oidtmann-studios",
    name: "Oidtmann Studios",
    roles: ["studio", "artist", "decorator"],
    answer: "Oidtmann Studios is associated in Austin PBS research with the 1936 decorative campaign at St. Mary's Catholic Church in Fredericksburg, including the Christ the King apse composition and apostle paintings.",
    significance: [
      "The studio attribution distinguishes Fredericksburg's 1936 campaign from the church's earlier construction and decorative phases.",
      "The studio relationship supports artwork-level attribution for the Christ the King apse and apostle cycle rather than assigning all visible decoration to one period.",
    ],
    churchSlugs: ["fredericksburg-st-marys-catholic-church"],
    techniqueSlugs: ["freehand", "decorative-murals"],
    sourceLabel: "Austin PBS — St. Mary's Fredericksburg",
    sourceUrl: "https://austinpbs.org/paintedchurches/fredericksburg",
  },
  {
    slug: "charles-martin-meister",
    name: "Charles Martin Meister",
    roles: ["artist", "decorator"],
    answer: "Charles Martin Meister is a decorative painter represented in Buie Harwood's archival research on Texas interior decoration. Texas Defined preserves him as a research entity while church-specific attributions remain limited to evidence actually established in the archive or primary records.",
    significance: [
      "Harwood's finding aid identifies painter research on Meister as part of the archival corpus used to study Texas decorative interiors.",
      "The entity is intentionally not connected to a church until a church-specific archival record supports that edge.",
    ],
    churchSlugs: [],
    sourceLabel: "UT Architectural Archives — Buie Harwood and Anna Brightman collection",
    sourceUrl: "https://txarchives.org/utaaa/finding_aids/00136.xml",
  },
];
