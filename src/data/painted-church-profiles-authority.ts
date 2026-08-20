import type { PaintedChurchProfile } from "./painted-church-profiles";

const authorityProfiles: PaintedChurchProfile[] = [
  {
    slug: "galveston-st-joseph-church",
    quickAnswer: "St. Joseph's Church in Galveston is the historically missing fifteenth church in Texas's 1982 statewide thematic nomination for Churches with Decorative Interior Painting. The German Catholic congregation built the surviving wooden Gothic Revival church in 1859–1860; it was already listed individually on the National Register in 1976. The later thematic nomination nevertheless counts it among the 15 and identifies its faux-grained pews as the group's only documented graining example.",
    foundedYear: 1859,
    builtYear: 1860,
    architecture: "Wooden Gothic Revival",
    heritage: "German Catholic immigrant community in nineteenth-century Galveston",
    facts: [
      { label: "Construction", value: "Built in 1859–1860 and dedicated in April 1860" },
      { label: "Historic distinction", value: "Galveston Historical Foundation describes it as the oldest German Catholic church in Texas and the oldest wooden church building in Galveston" },
      { label: "National Register", value: "Individually listed December 13, 1976; reference 76002082" },
      { label: "1982 thematic nomination", value: "Explicitly included among the 15 Churches in Texas with Decorative Interior Painting" },
      { label: "Documented technique", value: "The thematic nomination identifies St. Joseph's pews as the only graining example among the 15 churches" },
      { label: "Surviving decorative features", value: "Painted coffered ceiling, painted quatrefoils and Gothic symbols, early twentieth-century Stations with German inscriptions, original altars and reredoses" },
      { label: "Current stewardship", value: "Preserved by Galveston Historical Foundation and used for historic-site programming and special events" },
    ],
    history: [
      {
        heading: "A German Catholic church in an immigrant port city",
        paragraphs: [
          "St. Joseph's was built for Galveston's German-speaking Catholic community after Bishop John Odin encouraged creation of a church for German Catholics in the growing port city. The wooden Gothic Revival building was constructed in 1859–1860 and dedicated in April 1860.",
          "Its survival gives the statewide Painted Churches story an important coastal and urban dimension. The building predates most of the Czech- and German-settled Central Texas churches that dominate modern travel coverage.",
        ],
      },
      {
        heading: "Why the 14-versus-15 count became confusing",
        paragraphs: [
          "St. Joseph's had already entered the National Register in 1976. When the Texas Historical Commission prepared the statewide decorative-interior thematic nomination in 1982, the nomination text still counted St. Joseph's among the 15 churches being studied as a group.",
          "The current THC Multiple Property Listing index surfaces 14 properties associated with the thematic listing, while the original nomination discusses 15 decorated churches. Texas Defined treats the Galveston church as a historical thematic-nomination member with its own earlier National Register listing rather than pretending the two source systems use the same counting method.",
        ],
      },
    ],
    paintings: [
      {
        heading: "A different kind of Painted Church interior",
        paragraphs: [
          "The interior is quieter than the saturated mural fields associated with Dubina or Praha, but it is historically important precisely because the 1982 nomination's definition was broader than modern tourism shorthand. Galveston Historical Foundation documents a softly painted interior, coffered ceiling, painted quatrefoils and other Gothic symbols.",
          "The statewide nomination singles out St. Joseph's pews for faux wood graining—the only documented graining example among the 15 churches. That makes the church essential to understanding the full range of decorative-painting techniques represented by the original thematic study.",
        ],
      },
    ],
    preservation: [
      {
        heading: "Preserved as a historic site rather than an active parish",
        paragraphs: [
          "Galveston Historical Foundation now preserves St. Joseph's and uses it for historic programming and special events. Original and early interior furnishings remain important parts of the ensemble, including altars, reredoses, statues and German-inscribed Stations of the Cross.",
          "Texas Defined currently marks the decorative scheme's integrity as uncertain until a church-specific conservation chronology is assembled from Galveston Historical Foundation and National Register records. That prevents surviving original fabric from being confused with later maintenance or repainting.",
        ],
      },
    ],
    visitorNotes: [
      "St. Joseph's is preserved by Galveston Historical Foundation rather than operating as a regular parish church. Check the Foundation's current site/event guidance before planning an interior visit.",
    ],
    sources: [
      { label: "Galveston Historical Foundation — 1859 St. Joseph's Church", url: "https://www.galvestonhistory.org/sites/special-event-venues" },
      { label: "National Register — St. Joseph's Church, Galveston, 76002082", url: "https://atlas.thc.texas.gov/NR/pdfs/76002082/76002082.pdf" },
      { label: "National Register thematic nomination — Churches in Texas with Decorative Interior Painting", url: "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13" },
      { label: "Visit Galveston — St. Joseph's Church", url: "https://www.visitgalveston.com/directory/st-josephs-church/" },
    ],
  },
];

export function authorityPaintedChurchProfileBySlug(slug: string) {
  return authorityProfiles.find((profile) => profile.slug === slug);
}
