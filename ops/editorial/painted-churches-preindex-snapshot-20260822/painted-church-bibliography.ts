export type PaintedChurchBibliographyEntry = {
  id: string;
  title: string;
  creator: string;
  year: string;
  type: "primary-register" | "archive" | "book" | "article" | "documentary" | "official-history" | "modern-research";
  url: string;
  use: string;
  note?: string;
};

export const paintedChurchBibliography: PaintedChurchBibliographyEntry[] = [
  {
    id: "nps-thematic-1982",
    title: "Churches in Texas with Decorative Interior Painting",
    creator: "Carol Kennedy, Linda C. Flory Butler, Marianne McCann / Texas Historical Commission",
    year: "1982",
    type: "primary-register",
    url: "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13",
    use: "Foundational statewide thematic nomination: 15-church corpus, survey methodology, five decorative-painting techniques, comparative architecture and iconography.",
  },
  {
    id: "harwood-archive",
    title: "Buie Harwood and Anna Brightman collection",
    creator: "Alexander Architectural Archives, University of Texas at Austin",
    year: "1970s–2000s",
    type: "archive",
    url: "https://txarchives.org/utaaa/finding_aids/00136.xml",
    use: "Church survey cards, slides, historic-designation research, decorative-painter research, restoration materials, correspondence and publication files.",
  },
  {
    id: "harwood-fancy-ornament",
    title: "Fancy the Ornament: Decorative Painting in Texas, 1840s–1940s",
    creator: "Buie Harwood",
    year: "1980",
    type: "article",
    url: "https://txarchives.org/utaaa/finding_aids/00136.xml",
    use: "Foundational decorative-painting research explicitly cited in the later National Register thematic nomination.",
    note: "Texas Architect 30.5; archive box 3, folder 8.",
  },
  {
    id: "harwood-meister",
    title: "Charles Martin Meister: Decorative Painter in Texas",
    creator: "Buie Harwood",
    year: "1981",
    type: "article",
    url: "https://journals.sagepub.com/doi/10.1111/j.1939-1668.1981.tb00090.x",
    use: "Biographical and stylistic research on a German-background decorative painter working in Texas.",
    note: "Journal of Interior Design Education and Research 7.2, pp. 38–46; Harwood archive box 3, folder 9.",
  },
  {
    id: "harwood-articulating",
    title: "Painted Church Decoration in Texas: Articulating an Art and a Style",
    creator: "Buie Harwood",
    year: "1983",
    type: "article",
    url: "https://txarchives.org/utaaa/finding_aids/00136.xml",
    use: "Interpretive scholarship on Texas painted-church decoration and stylistic classification.",
    note: "Perspective 12.2; archive box 4, folder 1.",
  },
  {
    id: "harwood-closer-view",
    title: "Painted Church Decoration in Texas, Part II: A Closer View of Ornamentation",
    creator: "Buie Harwood",
    year: "1985",
    type: "article",
    url: "https://txarchives.org/utaaa/finding_aids/00136.xml",
    use: "Closer study of decorative ornament across the painted-church tradition.",
    note: "Perspective 13.2; archive box 4, folder 2.",
  },
  {
    id: "harwood-stenciling",
    title: "Stenciling: Interior Architectural Ornamentation: A Look at 1870–1930 with Examples from Texas",
    creator: "Buie Harwood",
    year: "1986",
    type: "article",
    url: "https://txarchives.org/utaaa/finding_aids/00136.xml",
    use: "Technique history and Texas examples for the stenciling authority layer.",
    note: "Journal of Interior Design 12.1; archive box 4, folder 3.",
  },
  {
    id: "harwood-decorating-texas",
    title: "Decorating Texas: Decorative Painting in the Lone Star State from the 1850s to the 1950s",
    creator: "Buie Harwood",
    year: "1993",
    type: "book",
    url: "https://search.worldcat.org/search?q=Decorating+Texas+Buie+Harwood",
    use: "Major published synthesis of decorative painting in Texas; church decoration sits within the larger material-culture context.",
  },
  {
    id: "austin-pbs-documentary",
    title: "The Painted Churches of Texas: Echoes of the Homeland",
    creator: "Austin PBS / KLRU-TV",
    year: "2001",
    type: "documentary",
    url: "https://austinpbs.org/paintedchurches/documentary",
    use: "Church-level history, descendants and interview material, symbols, decorative techniques, artists and preservation context.",
  },
  {
    id: "austin-pbs-project",
    title: "The Painted Churches of Texas web research project",
    creator: "Austin PBS / KLRU-TV",
    year: "2001–present archive",
    type: "modern-research",
    url: "https://austinpbs.org/paintedchurches/",
    use: "Church profiles, artist attributions, technique explanations, symbolism, film updates and historical photographs.",
  },
  {
    id: "head-field-research",
    title: "Painted Churches of Texas field research",
    creator: "Anthony Head",
    year: "2023–2026",
    type: "modern-research",
    url: "https://www.mysanantonio.com/lifestyle/travel/article/painted-churches-texas-18494616.php",
    use: "Modern statewide survival research and an estimate of as many as 35 churches with similar painted elements; used as a candidate-discovery lead, not automatic inclusion evidence.",
  },
  {
    id: "macatee-2026",
    title: "Painted Churches of Texas",
    creator: "Melissa Macatee",
    year: "2026",
    type: "book",
    url: "https://books.google.com/books/about/Painted_Churches_of_Texas.html?id=ZD2v0QEACAAJ",
    use: "Current visual/history reference and competitor benchmark; should be reviewed church by church for source leads and photographic coverage before public index launch.",
  },
];

export const paintedChurchBibliographyById = new Map(paintedChurchBibliography.map((entry) => [entry.id, entry]));
