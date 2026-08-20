import type { PaintedChurchResearchDossier } from "./painted-church-research";

const authorityResearch: PaintedChurchResearchDossier[] = [
  {
    slug: "galveston-st-joseph-church",
    researchSummary: "St. Joseph's Galveston resolves one of the most important statewide Painted Churches source conflicts. The 1982 National Register thematic nomination explicitly describes 15 churches and identifies Galveston's St. Joseph's as the sole graining example, while the church had already been listed individually in 1976. Its earlier listing explains why a modern MPS index can expose 14 properties even though the original thematic study discusses 15.",
    lookFor: [
      { label: "Faux-grained pews", detail: "The 1982 thematic nomination identifies the pews at St. Joseph's Galveston as the only graining example found among the 15 churches." },
      { label: "Coffered ceiling", detail: "Galveston Historical Foundation describes a painted coffered ceiling with quatrefoils and other Gothic symbols." },
      { label: "German inscriptions", detail: "Early twentieth-century Stations of the Cross retain German inscriptions, preserving the church's immigrant-language context." },
      { label: "Original ensemble", detail: "Original altars, reredoses, statues and altar furnishings help show why painted interiors must be read together with surviving liturgical furniture." },
      { label: "Urban/coastal context", detail: "Unlike the rural Central Texas churches that dominate modern touring, St. Joseph's belongs to a nineteenth-century immigrant port-city story." },
    ],
    interpretation: [
      {
        heading: "The 15th church was not lost from history—it was counted differently",
        paragraphs: [
          "The statewide thematic nomination repeatedly states that 15 churches comprise the decorative-interior study. Its technique discussion explicitly places St. Joseph's Church in Galveston inside that group. Separately, National Register records show St. Joseph's was already listed in 1976.",
          "That chronology supports a precise reconciliation: the original thematic study used 15 churches as its comparative corpus, while the present THC Multiple Property Listing interface surfaces 14 properties tied to the later thematic listing. Texas Defined records both facts rather than forcing one count to erase the other.",
        ],
      },
      {
        heading: "Why graining changes the way the collection should be read",
        paragraphs: [
          "Modern Painted Churches coverage often emphasizes murals, bright ceilings and stencils. The thematic nomination used a broader decorative-painting vocabulary that also included faux material effects such as graining and marbling.",
          "St. Joseph's matters because its grained pews complete the five-technique set described in the nomination. Without Galveston, the historic thematic collection's own claim that each of the five processes appears among the 15 becomes harder to understand.",
        ],
      },
    ],
    communityContext: [
      {
        heading: "German Catholic Galveston",
        paragraphs: [
          "St. Joseph's was established for German-speaking Catholics in Galveston and was dedicated in 1860. The church therefore expands the Painted Churches story beyond agricultural settlements into the immigrant institutions of a major Gulf port.",
          "Its German inscriptions, Gothic Revival design and preserved devotional furnishings provide a different but complementary expression of the homeland-memory theme emphasized in later Painted Churches interpretation.",
        ],
      },
    ],
    recordNotes: [
      "Do not call St. Joseph's a newly listed 1983 MPS property. Its individual National Register listing dates to 1976.",
      "Do not omit it from discussion of the original 15-church thematic study: the nomination itself includes the Galveston church in technique comparisons.",
      "Current THC MPS search results and the original thematic corpus answer different counting questions; both should remain visible.",
    ],
    sources: [
      { label: "National Register thematic nomination — Churches in Texas with Decorative Interior Painting", url: "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13", tier: "historic-register", use: "the 15-church scope, five painting techniques, Galveston graining evidence and research methodology" },
      { label: "National Register — St. Joseph's Church, Galveston, 76002082", url: "https://atlas.thc.texas.gov/NR/pdfs/76002082/76002082.pdf", tier: "historic-register", use: "the church's earlier 1976 individual listing" },
      { label: "Galveston Historical Foundation — 1859 St. Joseph's Church", url: "https://www.galvestonhistory.org/sites/special-event-venues", tier: "official", use: "current stewardship, construction history and surviving interior features" },
      { label: "Visit Galveston — St. Joseph's Church", url: "https://www.visitgalveston.com/directory/st-josephs-church/", tier: "official", use: "current historic-site identity, address and public-facing access context" },
    ],
  },
];

export function authorityPaintedChurchResearchBySlug(slug: string) {
  return authorityResearch.find((item) => item.slug === slug);
}
