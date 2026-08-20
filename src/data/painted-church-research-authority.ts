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
      { heading: "The 15th church was not lost from history—it was counted differently", paragraphs: ["The statewide thematic nomination repeatedly states that 15 churches comprise the decorative-interior study. Its technique discussion explicitly places St. Joseph's Church in Galveston inside that group. Separately, National Register records show St. Joseph's was already listed in 1976.", "That chronology supports a precise reconciliation: the original thematic study used 15 churches as its comparative corpus, while the present THC Multiple Property Listing interface surfaces 14 properties tied to the later thematic listing. Texas Defined records both facts rather than forcing one count to erase the other."] },
      { heading: "Why graining changes the way the collection should be read", paragraphs: ["Modern Painted Churches coverage often emphasizes murals, bright ceilings and stencils. The thematic nomination used a broader decorative-painting vocabulary that also included faux material effects such as graining and marbling.", "St. Joseph's matters because its grained pews complete the five-technique set described in the nomination. Without Galveston, the historic thematic collection's own claim that each of the five processes appears among the 15 becomes harder to understand."] },
    ],
    communityContext: [{ heading: "German Catholic Galveston", paragraphs: ["St. Joseph's was established for German-speaking Catholics in Galveston and was dedicated in 1860. The church therefore expands the Painted Churches story beyond agricultural settlements into the immigrant institutions of a major Gulf port.", "Its German inscriptions, Gothic Revival design and preserved devotional furnishings provide a different but complementary expression of the homeland-memory theme emphasized in later Painted Churches interpretation."] }],
    recordNotes: ["Do not call St. Joseph's a newly listed 1983 MPS property. Its individual National Register listing dates to 1976.", "Do not omit it from discussion of the original 15-church thematic study: the nomination itself includes the Galveston church in technique comparisons.", "Current THC MPS search results and the original thematic corpus answer different counting questions; both should remain visible."],
    sources: [
      { label: "National Register thematic nomination — Churches in Texas with Decorative Interior Painting", url: "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13", tier: "historic-register", use: "the 15-church scope, five painting techniques, Galveston graining evidence and research methodology" },
      { label: "National Register — St. Joseph's Church, Galveston, 76002082", url: "https://atlas.thc.texas.gov/NR/pdfs/76002082/76002082.pdf", tier: "historic-register", use: "the church's earlier 1976 individual listing" },
      { label: "Galveston Historical Foundation — 1859 St. Joseph's Church", url: "https://www.galvestonhistory.org/sites/special-event-venues", tier: "official", use: "current stewardship, construction history and surviving interior features" },
      { label: "Visit Galveston — St. Joseph's Church", url: "https://www.visitgalveston.com/directory/st-josephs-church/", tier: "official", use: "current historic-site identity, address and public-facing access context" },
    ],
  },
  {
    slug: "palestine-first-presbyterian-church",
    researchSummary: "First Presbyterian in Palestine is one of the strongest non-Catholic additions uncovered by the pre-index census. A city preservation survey gives church-specific evidence for a hand-painted nineteenth-century ceiling, memorial glass and a 1986 sanctuary restoration; Harwood independently devoted 23 slides to the church in 1982. The crucial unresolved question is not whether the church had a significant painted interior, but how much of that documented original ceiling remains unchanged today.",
    lookFor: [
      { label: "Hand-painted ceiling", detail: "The Historic Resources Survey attributes the ceiling to an unidentified itinerant German craftsman and reported no retouching at the time of survey." },
      { label: "Leaded and Tiffany memorial glass", detail: "The same survey describes both leaded stained glass and Tiffany memorial windows as major interior elements." },
      { label: "1888 Gothic sanctuary", detail: "Read the paint and glass within the brick Gothic architecture rather than as isolated decoration." },
      { label: "1986 restoration boundary", detail: "The original sanctuary was restored in 1986; current fieldwork should determine what work touched the decorative ceiling versus other building fabric." },
      { label: "Architect attribution conflict", detail: "The Historic Resources Survey says Dudley and Dudley, while later National Register cataloging uses Dodson & Dudley wording. Texas Defined keeps the discrepancy visible." },
    ],
    interpretation: [
      { heading: "Why this church broadens the statewide story", paragraphs: ["First Presbyterian demonstrates that historically significant decorative church painting in Texas was not restricted to Catholic immigrant parishes. It also gives East Texas a second deeply documented painted interior near Sacred Heart Palestine.", "The German-craftsman attribution is especially valuable because it links itinerant decorative labor to a Presbyterian sanctuary without forcing the church into the Central European Catholic narrative used for many Fayette/Lavaca examples."] },
      { heading: "A model for handling historical integrity claims", paragraphs: ["The 1989–1991 survey's statement that the ceiling had not been retouched is unusually strong evidence for that date. It is not evidence that nothing changed in the following thirty-five years.", "Texas Defined therefore records the historical condition statement verbatim in substance, marks current integrity uncertain, and makes a field/conservation check the next research task rather than converting an old survey note into a timeless claim."] },
    ],
    communityContext: [{ heading: "Presbyterian Palestine", paragraphs: ["The congregation dates to 1849, and the present Avenue A sanctuary dates to 1888. Its long continuous religious use, RTHL designation and later National Register listing situate the painted ceiling within Palestine's unusually rich nineteenth-century architectural landscape." ] }],
    recordNotes: ["Current PC(USA)/Grace Presbytery records place the active congregation at 410 Avenue A; the National Register catalog uses 406 Avenue A. Treat this as an address-record discrepancy around the same church property, not two churches.", "Do not identify the itinerant German painter by name unless a primary or archival record does so.", "Do not repeat the 1991 'never retouched' statement as a 2026 conservation fact without current verification."],
    sources: [
      { label: "Portal to Texas History — Historic Resources Survey, First Presbyterian Church", url: "https://texashistory.unt.edu/ark:/67531/metapth25684/", tier: "historic-register", use: "painted ceiling, glass, architects/builders, restoration chronology and historical condition" },
      { label: "Texas Historical Commission — First Presbyterian RTHL", url: "https://atlas.thc.texas.gov/Details/5001008751", tier: "historic-register", use: "RTHL identity, 1888 church and property location" },
      { label: "PC(USA) — First Presbyterian Church Palestine", url: "https://pcusa.org/congregation/first-church-palestine-tx", tier: "official", use: "current congregation identity, exact current address and coordinates" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml", tier: "scholarly", use: "23-slide church-specific decorative-painting research group" },
    ],
  },
  {
    slug: "houston-annunciation-catholic-church",
    researchSummary: "Annunciation Houston extends the project into an urban Catholic mother church whose decorative history is inseparable from Nicholas J. Clayton's repeated architectural interventions. The Handbook of Texas documents a replica of Raphael's Transfiguration in the sanctuary dome and a coffered nave ceiling, while Harwood separately included Annunciation in a decorative-painting slide group. Because the building has remained in continuous use and received many later additions, the research task is to separate documented historical layers rather than present the visible interior as one original campaign.",
    lookFor: [
      { label: "Transfiguration dome image", detail: "The Handbook of Texas documents a replica of Raphael's Transfiguration inside the sanctuary dome after Clayton's expansion." },
      { label: "Barreled and coffered ceiling", detail: "The nave ceiling is part of the architectural/decorative system, not merely a background for murals." },
      { label: "Tennessee-marble altars", detail: "Charles Sebastian Ott of Galveston installed marble altars in 1897, adding a named craft layer distinct from painted decoration." },
      { label: "Historic glass and shrines", detail: "Later memorial/devotional additions should be dated separately rather than folded into the 1871 building date." },
      { label: "Continuous stewardship", detail: "The parish's 2026 roof repairs explicitly protected interior plaster and historic architectural features from water intrusion." },
    ],
    interpretation: [
      { heading: "A layered urban Painted Church", paragraphs: ["Annunciation differs from a church whose decorative program can be assigned to one painter in one year. Its architecture and sacred furnishings accumulated through repeated nineteenth- and twentieth-century campaigns under continuous parish use.", "The authority approach should therefore model individual objects and campaigns—Clayton's architectural work, the Transfiguration image, marble altars, shrines, organ and later conservation—rather than claim a single date for 'the painted interior.'"] },
      { heading: "Why Harwood's archive matters here", paragraphs: ["The Harwood archive's 1982 Annunciation/Paris slide group shows that the Houston church was part of serious decorative-interior research even though it was outside the formal 15-church thematic corpus.", "That distinction is valuable: the archive can reveal the wider research universe surrounding the formal nomination without automatically converting every photographed church into a thematic-list member."] },
    ],
    communityContext: [{ heading: "Houston's Catholic mother church", paragraphs: ["Annunciation was founded in 1869 and remains an active downtown parish. The church's French diocesan roots, immigrant congregation and position in a rapidly urbanizing Houston make it a very different setting from the rural Czech and German churches of Central Texas." ] }],
    recordNotes: ["Do not call the Transfiguration image an original Raphael; authoritative sources describe it as a replica.", "Do not assign the dome painting to Nicholas J. Clayton merely because he designed the sanctuary expansion; architectural authorship is not painter attribution.", "Do not label the work true fresco unless a church-specific technical source establishes the medium.", "Current integrity remains uncertain until the surviving decorative layers are documented church-by-church."],
    sources: [
      { label: "Church of the Annunciation — official history", url: "https://annunciationcc.org/about", tier: "official", use: "current parish identity, founding and continuous-use history" },
      { label: "Handbook of Texas — Church of the Annunciation", url: "https://www.tshaonline.org/handbook/entries/church-of-the-annunciation-houston", tier: "scholarly", use: "Clayton architecture, Transfiguration image, ceiling, marble altars and historical chronology" },
      { label: "Texas Historical Commission — Annunciation Church", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2075001988", tier: "historic-register", use: "National Register identity, 1975 listing, Nicholas Clayton attribution and significance" },
      { label: "Annunciation — 2026 roof repair", url: "https://annunciationcc.org/story/roofrepair2026", tier: "official", use: "current preservation/stewardship evidence" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml", tier: "scholarly", use: "1982 decorative-painting research slide group" },
    ],
  },
];

export function authorityPaintedChurchResearchBySlug(slug: string) {
  return authorityResearch.find((item) => item.slug === slug);
}
