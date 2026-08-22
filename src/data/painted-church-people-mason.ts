import type { PaintedChurchPerson } from "./painted-church-person-types";

export const masonPaintedChurchPeople: PaintedChurchPerson[] = [
  {
    slug: "manuel-lopez-mason",
    name: "Manuel Lopez",
    roles: ["artist", "decorator"],
    answer: "Manuel Lopez is the artist identified by St. Joseph Catholic Church in Mason as the painter of its historic 1916 interior: a light-blue heavenly scheme with clouds, stars, angels and a sanctuary scene of opening sky with a dove above the altar.",
    significance: [
      "The parish's own historical study gives Lopez a name, date and church-specific iconographic program rather than a vague later attribution.",
      "His work survived major alteration, including acoustical-tile covering, and became the historic basis for the church's twenty-first-century restoration campaign.",
      "Texas Defined keeps Lopez's 1916 authorship separate from the restorers and artists responsible for the 2024 preservation and complementary new work.",
    ],
    churchSlugs: ["mason-st-joseph-catholic-church"],
    techniqueSlugs: ["freehand", "decorative-murals"],
    sourceLabel: "St. Joseph Catholic Church Mason — official parish history",
    sourceUrl: "https://stjosephmason.org/about-us",
  },
  {
    slug: "murals-by-jericho",
    name: "Murals by Jericho",
    roles: ["studio", "restorer"],
    answer: "Murals by Jericho is credited by Studio io with restoring St. Joseph Mason's historic painted vault during the 2024 preservation campaign and matching the decorative treatment across the enlarged ceiling.",
    significance: [
      "The project record distinguishes restoration of the historic vault from newly commissioned decorative work elsewhere in the sanctuary.",
      "Recording the studio separately prevents the restored and visually extended ceiling from being misrepresented as untouched 1916 paint throughout.",
    ],
    churchSlugs: ["mason-st-joseph-catholic-church"],
    techniqueSlugs: ["freehand", "decorative-murals"],
    sourceLabel: "Studio io — St. Joseph Mason preservation project",
    sourceUrl: "https://www.studioiodesign.com/st-joseph-mason",
  },
  {
    slug: "stabat-mater-foundation",
    name: "Stabat Mater Foundation",
    roles: ["studio", "artist", "decorator"],
    answer: "Stabat Mater Foundation is credited in the 2024 St. Joseph Mason project record with new hand-painted sanctuary detailing inspired by St. Joseph lilies, the tree of life and the Twelve Apostles.",
    significance: [
      "The work is a modern complementary decorative campaign rather than part of Manuel Lopez's 1916 original program.",
      "Its separate attribution lets Texas Defined explain what visitors see today without erasing the chronology of historic and modern authorship.",
    ],
    churchSlugs: ["mason-st-joseph-catholic-church"],
    techniqueSlugs: ["stenciling", "freehand"],
    sourceLabel: "Studio io — St. Joseph Mason preservation project",
    sourceUrl: "https://www.studioiodesign.com/st-joseph-mason",
  },
  {
    slug: "little-way-construction",
    name: "Little Way Construction",
    roles: ["craftsperson"],
    answer: "Little Way Construction is credited by Studio io with the new sanctuary furnishings created for St. Joseph Mason's 2024 renovation, including the reredos, altar, ambo, side shrines, baptismal font and ambry.",
    significance: [
      "The furnishing commission is part of the present decorative ensemble but is distinct from both the 1916 painted ceiling and the 2024 painting/restoration work.",
    ],
    churchSlugs: ["mason-st-joseph-catholic-church"],
    sourceLabel: "Studio io — St. Joseph Mason preservation project",
    sourceUrl: "https://www.studioiodesign.com/st-joseph-mason",
  },
];
