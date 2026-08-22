import type { PaintedChurchPerson } from "./painted-church-person-types";

export const preindexPaintedChurchPeople: PaintedChurchPerson[] = [
  {
    slug: "pedro-juan-barcelo",
    name: "Pedro Juan Barceló",
    roles: ["artist"],
    answer: "Pedro Juan Barceló was a painter from Mallorca, Spain, credited by St. Francis on the Brazos and Diocese of Austin sources with the Waco church's major wall paintings, including nearly life-size Stations of the Cross and Franciscan narrative scenes executed on canvas for installation inside the church.",
    significance: [
      "Parish and diocesan sources identify Barceló by name and connect him directly to St. Francis on the Brazos.",
      "The documented canvas-applied method makes his Waco work important for comparing technique across Texas Painted Churches.",
      "His work links a Mexican American Franciscan parish in Waco to an artist from Mallorca, adding a transatlantic twentieth-century chapter to the statewide tradition.",
    ],
    churchSlugs: ["waco-st-francis-on-the-brazos"],
    techniqueSlugs: ["canvas-applied-decoration", "decorative-murals"],
    sourceLabel: "St. Francis on the Brazos / Diocese of Austin parish history",
    sourceUrl: "https://stfrancistorwaco.org/100th-anniversary",
  },
  {
    slug: "raggi-waco-unresolved",
    name: "Raggi — historical attribution under study",
    roles: ["unresolved-attribution"],
    answer: "A historical description preserved by Baylor University's Texas Collection attributes the monumental sanctuary composition at St. Francis on the Brazos to an artist identified as Raggi. Texas Defined has not yet established the artist's full identity or the relationship between this attribution and Pedro Juan Barceló's independently documented wall paintings.",
    significance: [
      "The Baylor-preserved account is specific enough to preserve as an attribution record but not complete enough to merge with another artist identity.",
      "Keeping Raggi separate demonstrates the collection's rule that unresolved authorship is recorded rather than silently normalized.",
    ],
    churchSlugs: ["waco-st-francis-on-the-brazos"],
    techniqueSlugs: ["decorative-murals"],
    sourceLabel: "Baylor University Texas Collection — St. Francis on the Brazos",
    sourceUrl: "https://blogs.baylor.edu/texascollection/2019/11/15/st-francis-on-the-brazos/",
  },
  {
    slug: "roy-e-lane",
    name: "Roy E. Lane",
    roles: ["architect"],
    answer: "Roy E. Lane is identified in St. Francis on the Brazos historical material as the architect of the 1931 Waco church, whose mission-inspired form provides the architectural setting for its large Franciscan painted program.",
    significance: [
      "The architectural design is deliberately tied to the Spanish mission tradition rather than to the Gothic Revival language dominant in many Central Texas Painted Churches.",
      "Separating Lane's architectural role from Barceló's painting clarifies authorship of the overall ensemble.",
    ],
    churchSlugs: ["waco-st-francis-on-the-brazos"],
    sourceLabel: "St. Francis on the Brazos historical resources",
    sourceUrl: "https://stfrancistorwaco.org/100th-anniversary",
  },
  {
    slug: "nicholas-j-clayton",
    name: "Nicholas J. Clayton",
    roles: ["architect"],
    answer: "Nicholas J. Clayton was a major Texas architect whose repeated late-nineteenth-century work at Houston's Church of the Annunciation reshaped the sanctuary and architectural setting in which its documented Transfiguration image, coffered ceiling and sacred furnishings are read.",
    significance: [
      "The Handbook of Texas and National Register record connect Clayton to major historic changes at Annunciation.",
      "Texas Defined keeps Clayton's architectural authorship separate from painter attribution for the Transfiguration image.",
    ],
    churchSlugs: ["houston-annunciation-catholic-church"],
    sourceLabel: "Handbook of Texas — Church of the Annunciation, Houston",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/church-of-the-annunciation-houston",
  },
  {
    slug: "charles-sebastian-ott",
    name: "Charles Sebastian Ott",
    roles: ["craftsperson"],
    answer: "Charles Sebastian Ott of Galveston is documented by the Handbook of Texas as the maker and installer of Tennessee-marble altars at Houston's Church of the Annunciation in 1897.",
    significance: [
      "The named marble-altars commission adds a documented craft layer to Annunciation's historically accumulated interior.",
      "Recording Ott as a craftsperson rather than a painter prevents the altar commission from being misrepresented as mural authorship.",
    ],
    churchSlugs: ["houston-annunciation-catholic-church"],
    sourceLabel: "Handbook of Texas — Church of the Annunciation, Houston",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/church-of-the-annunciation-houston",
  },
];
