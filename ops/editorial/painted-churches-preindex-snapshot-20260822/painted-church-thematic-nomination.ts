export type ThematicNominationEvidence = {
  id: string;
  category: "scope" | "methodology" | "technique" | "architecture" | "iconography" | "significance" | "bibliography";
  title: string;
  summary: string;
  churchSlugs?: string[];
  sourcePages: number[];
};

export const paintedChurchThematicNomination = {
  title: "Churches in Texas with Decorative Interior Painting",
  preparedBy: ["Carol Kennedy", "Linda C. Flory Butler", "Marianne McCann"],
  preparedFor: "Texas Historical Commission / National Park Service",
  preparedDate: "1982-05-13",
  sourceUrl: "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13",
  originalChurchCount: 15,
  currentThcMpsIndexCount: 14,
  fiveHistoricTechniques: ["stenciling", "freehand", "infill", "graining", "marbling"],
} as const;

export const thematicNominationEvidence: ThematicNominationEvidence[] = [
  {
    id: "scope-fifteen",
    category: "scope",
    title: "The original thematic study contains 15 churches",
    summary: "The nomination repeatedly states that 15 churches comprise the statewide thematic study. Texas Defined identifies St. Joseph's Church in Galveston as the historically missing fifteenth property because the nomination itself names the Galveston church in its technique analysis; St. Joseph's had already been individually listed on the National Register in 1976.",
    churchSlugs: ["galveston-st-joseph-church"],
    sourcePages: [2, 6],
  },
  {
    id: "selection-method",
    category: "methodology",
    title: "The 1982 survey used a statewide research-and-fieldwork method",
    summary: "Researchers reviewed Texas Historical Commission inventory material and Winedale files, consulted architectural and decorative-arts scholars, requested leads from county historical commissions, used denominational archives, worked with Buie Harwood, then made calls and site visits. Final selection was limited to churches where interior painting contributed substantially to the building's significance.",
    sourcePages: [2, 3],
  },
  {
    id: "future-additions",
    category: "methodology",
    title: "The nomination explicitly left room for additional discoveries",
    summary: "The nomination describes the statewide survey as continuing and says other churches with significant decorative painting could be added if they came to light. The original 15 should therefore be read as a documented 1982 corpus, not a permanent upper bound on surviving Painted Churches in Texas.",
    sourcePages: [3],
  },
  {
    id: "stencil-examples",
    category: "technique",
    title: "Primary-source stenciling examples",
    summary: "The thematic nomination specifically identifies stenciling at Ammannsville, Fredericksburg, Moravia and Wallis.",
    churchSlugs: ["ammannsville-st-john-the-baptist", "fredericksburg-st-marys-catholic-church", "moravia-ascension-of-our-lord", "wallis-guardian-angel"],
    sourcePages: [3],
  },
  {
    id: "freehand-examples",
    category: "technique",
    title: "Primary-source freehand examples",
    summary: "The nomination cites freehand work in the apse/ceiling programs at the St. Mary's church in Lavaca County, High Hill, Sweet Home and Wallis.",
    churchSlugs: ["st-marys-immaculate-conception-lavaca", "high-hill-nativity-of-mary", "sweet-home-queen-of-peace", "wallis-guardian-angel"],
    sourcePages: [3],
  },
  {
    id: "infill-examples",
    category: "technique",
    title: "Primary-source infill examples",
    summary: "The nomination identifies infill painting in Ammannsville ceiling motifs, Moravia medallions and the Wesley Brethren Church.",
    churchSlugs: ["ammannsville-st-john-the-baptist", "moravia-ascension-of-our-lord", "wesley-brethren-church"],
    sourcePages: [3],
  },
  {
    id: "graining-galveston",
    category: "technique",
    title: "Galveston supplies the thematic group's only graining example",
    summary: "The nomination says the pews at St. Joseph's Church in Galveston are the only graining example found among the 15 churches.",
    churchSlugs: ["galveston-st-joseph-church"],
    sourcePages: [3],
  },
  {
    id: "marbling-examples",
    category: "technique",
    title: "Primary-source marbling examples",
    summary: "The nomination identifies marbling on columns at High Hill, Praha, Sweet Home and Wallis, and a different faux-stone wall treatment at Moravia.",
    churchSlugs: ["high-hill-nativity-of-mary", "praha-st-marys-assumption", "sweet-home-queen-of-peace", "wallis-guardian-angel", "moravia-ascension-of-our-lord"],
    sourcePages: [3],
  },
  {
    id: "dielmann-three",
    category: "architecture",
    title: "Three thematic churches share architect Leo M. J. Dielmann",
    summary: "The nomination connects Wallis, High Hill and Fredericksburg through architect Leo M. J. Dielmann, allowing direct comparison of how decorative painting interacts with his different church designs.",
    churchSlugs: ["wallis-guardian-angel", "high-hill-nativity-of-mary", "fredericksburg-st-marys-catholic-church"],
    sourcePages: [4],
  },
  {
    id: "falbo-deodati-two",
    category: "architecture",
    title: "Shiner and Sweet Home share contractors Falbo and Deodati",
    summary: "The nomination states that the Shiner and Sweet Home churches were built by V. Falbo and M. Deodati, a relationship that should be represented separately from later decorative authorship.",
    churchSlugs: ["shiner-saints-cyril-methodius", "sweet-home-queen-of-peace"],
    sourcePages: [4],
  },
  {
    id: "religious-iconography-angels",
    category: "iconography",
    title: "Angels recur across several formal interiors",
    summary: "The nomination identifies angels in Wallis, the St. Mary's church in Lavaca County, Umbarger and Shiner, with additional angel imagery at other churches documented by later sources.",
    churchSlugs: ["wallis-guardian-angel", "st-marys-immaculate-conception-lavaca", "umbarger-st-marys-catholic-church", "shiner-saints-cyril-methodius"],
    sourcePages: [4],
  },
  {
    id: "high-hill-symbols",
    category: "iconography",
    title: "The nomination records a richer High Hill symbol set than the current public graph",
    summary: "High Hill is described as including the Star of David, a cross with crown, grapes and wheat sheaves, alongside sophisticated foliated ornament reminiscent of William Morris designs.",
    churchSlugs: ["high-hill-nativity-of-mary"],
    sourcePages: [4],
  },
  {
    id: "painted-architectural-illusion",
    category: "architecture",
    title: "Paint transforms simple interiors into more elaborate architectural space",
    summary: "The nomination highlights painted architectural illusion at Lindsay, Wesley, Praha and High Hill, including simulated masonry, side aisles and ribbed vaulting.",
    churchSlugs: ["lindsay-st-peters-catholic-church", "wesley-brethren-church", "praha-st-marys-assumption", "high-hill-nativity-of-mary"],
    sourcePages: [5],
  },
  {
    id: "statewide-significance",
    category: "significance",
    title: "The thematic nomination frames painted interiors as evidence of immigration, patronage and material culture",
    summary: "The nomination argues that the churches document rare decorative craft, Central European immigration, religious life, available materials, patron wealth/status and stylistic influences across a statewide sample spanning roughly 1866 to 1930.",
    sourcePages: [6],
  },
  {
    id: "harwood-fancy-ornament",
    category: "bibliography",
    title: "Buie Harwood's 1980 Fancy the Ornament article was foundational",
    summary: "The nomination credits Buie Harwood's research and specifically cites her 1980 Texas Architect article Fancy the Ornament as a basis for the statewide study.",
    sourcePages: [2, 8],
  },
];

export function nominationEvidenceForChurch(slug: string) {
  return thematicNominationEvidence.filter((item) => item.churchSlugs?.includes(slug));
}
