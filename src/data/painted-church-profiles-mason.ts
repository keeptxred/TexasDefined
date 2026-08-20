import type { PaintedChurchProfile } from "./painted-church-profiles";

const masonProfile: PaintedChurchProfile = {
  slug: "mason-st-joseph-catholic-church",
  quickAnswer: "St. Joseph Catholic Church in Mason belongs in the broader Texas Painted Churches tradition because the parish's own historical study identifies Manuel Lopez as the artist who painted its sanctuary and vaulted beadboard ceiling in 1916, while the church's 2024 preservation project documents the rediscovery and full restoration of that historic painted vault together with carefully distinguished new decorative work.",
  foundedYear: 1873,
  builtYear: 1876,
  paintedYear: 1916,
  architecture: "Red-sandstone nineteenth-century Catholic church with later cross-plan expansion",
  artists: ["Manuel Lopez"],
  heritage: "Central Texas Catholic parish with a documented Mexican artistic contribution and later Spanish-Baroque-inspired preservation campaign",
  facts: [
    { label: "Congregation organized", value: "February 1873" },
    { label: "Present church completed", value: "September 1876" },
    { label: "Historic material", value: "Local red sandstone quarried near Mason; original beaded ceiling followed the roof slope" },
    { label: "Historic painter", value: "Manuel Lopez" },
    { label: "Historic painting campaign", value: "1916" },
    { label: "1916 sanctuary scene", value: "Opening sky behind the altar with a hovering dove" },
    { label: "1916 ceiling", value: "Clouds, stars and angels across the light-blue ceiling" },
    { label: "1963 alteration", value: "Expansion covered the painted angels with acoustical ceiling tiles" },
    { label: "Rediscovery", value: "Historic painted vault rediscovered after the 1989 roof-damage episode" },
    { label: "2024 preservation", value: "Historic vault fully restored by Murals by Jericho and visually extended across the enlarged ceiling" },
    { label: "2024 new decorative work", value: "Stabat Mater Foundation added hand-painted detailing tied to St. Joseph lilies, the tree of life and the Twelve Apostles" },
    { label: "Visitor address", value: "216 N Ave B, Mason, Texas 76856 on the parish's current contact page; Texas Time Travel lists 210 S Avenue B for the historic property" },
  ],
  history: [
    {
      heading: "An 1876 red-sandstone church above Mason",
      paragraphs: [
        "St. Joseph's congregation was organized in 1873 after Catholic families in Mason County had held Mass in private homes. The present church was completed in September 1876 using local red sandstone, with a beaded ceiling that followed the slope of the roof.",
        "The building changed substantially in 1963 when the west wall was removed and the church was expanded into a modified cross plan. That project enlarged the sanctuary and introduced new floors, furnishings and acoustical ceiling tiles, which covered part of the historic painted program.",
      ],
    },
    {
      heading: "A church whose decorative history survived alteration",
      paragraphs: [
        "The Mason parish history is unusually specific about the original decorative campaign. In 1916 Manuel Lopez painted the interior light blue, transformed the wall behind the altar into an opening sky with a hovering dove, and covered the ceiling with clouds, stars and angels.",
        "Later renovations altered the setting but did not erase the importance of that work. The historic vault was rediscovered in 1989 and became the central preservation problem addressed in the church's twenty-first-century renovation.",
      ],
    },
  ],
  paintings: [
    {
      heading: "Manuel Lopez's 1916 painted sky",
      paragraphs: [
        "The 1916 program used the ceiling itself as a vision of the heavens. Parish documentation describes clouds, stars and floating angels, while the sanctuary wall behind the altar opened into painted sky with a dove hovering above the altar. The imagery makes the architecture read as sacred atmosphere rather than as a simple beadboard roof.",
        "Texas Time Travel independently describes the sky-blue ceiling and its doves and angels as a traditional Spanish-Baroque-inspired effect, reinforcing the church-specific identification without substituting tourism copy for the parish's more detailed historical record.",
      ],
    },
    {
      heading: "The 2024 campaign is restoration plus new work, not one undifferentiated 'original' interior",
      paragraphs: [
        "Studio io's project record states that the historic painted vault was fully restored by Murals by Jericho and matched across the entirety of the enlarged vault. That continuity treatment belongs to the restoration history of Lopez's ceiling rather than being presented as untouched 1916 fabric everywhere.",
        "The same project also introduced new hand-painted detailing by Stabat Mater Foundation, including St. Joseph lily imagery and a tree-of-life / Twelve Apostles theme around the sanctuary. Texas Defined records these as a modern complementary campaign so visitors can distinguish historic authorship from twenty-first-century interpretation.",
      ],
    },
  ],
  preservation: [
    {
      heading: "Covered, rediscovered and restored",
      paragraphs: [
        "The 1963 expansion covered the painted angels with acoustical tiles. Studio io records that the painted vault was rediscovered in 1989; the 2024 project then restored it rather than treating the covered ceiling as lost or replacing it with a wholly new decorative concept.",
        "This makes Mason an important preservation case: the visible interior today contains restored historic work, areas visually matched to that work across the enlarged ceiling, and clearly documented new decorative details. The correct integrity label is therefore restored original scheme, not 'largely untouched.'",
      ],
    },
  ],
  visitorNotes: [
    "The parish's current contact page lists 216 N Ave B, Mason, Texas 76856 and publishes current office and liturgical information.",
    "Texas Time Travel says the church does not keep regular sightseeing hours outside Mass and recommends calling ahead to arrange a visit.",
    "The parish explicitly invites visitors to its newly remodeled worship site, but active worship and parish events take priority.",
  ],
  sources: [
    { label: "St. Joseph Catholic Church Mason — official parish history", url: "https://stjosephmason.org/about-us" },
    { label: "St. Joseph Catholic Church Mason — official current parish", url: "https://stjosephmason.org/" },
    { label: "St. Joseph Catholic Church Mason — official contact", url: "https://stjosephmason.org/contact-us" },
    { label: "Studio io — St. Joseph Mason preservation project", url: "https://www.studioiodesign.com/st-joseph-mason" },
    { label: "Texas Time Travel — St. Joseph's Catholic Church Mason", url: "https://texastimetravel.com/directory/st-josephs-catholic-church/" },
  ],
};

export function masonPaintedChurchProfileBySlug(slug: string) {
  return slug === masonProfile.slug ? masonProfile : undefined;
}
