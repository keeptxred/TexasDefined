import type { PaintedChurchResearchDossier } from "./painted-church-research";

const plantersville: PaintedChurchResearchDossier = {
  slug: "plantersville-st-marys-catholic-church",
  researchSummary: "Plantersville adds a Grimes County branch to the painted-church story: a German- and Polish-rooted parish rebuilt after lightning in 1917, with a Gothic Revival shell, heritage stained glass and a documented painted ceiling that survives outside the better-known Fayette County circuit.",
  lookFor: [
    { label: "Painted vaulted ceiling", detail: "The ceiling carries dense decorative work that reads as an architectural surface rather than framed wall art." },
    { label: "German stained glass", detail: "THC explicitly identifies the stained-glass windows as reflecting the congregation’s German heritage." },
    { label: "Lancet windows and buttresses", detail: "These are key Gothic Revival features called out in the THC marker." },
    { label: "Bell tower", detail: "The crenellated tower helps distinguish the 1917 rebuilding from the smaller predecessor lost to lightning." },
    { label: "Layered restoration", detail: "Later restoration accounts mention rediscovered decorative material; treat those claims as secondary until matched to parish or conservation documentation." },
  ],
  interpretation: [
    { heading: "A painted church outside the famous Schulenburg orbit", paragraphs: [
      "Plantersville matters because it demonstrates that the phenomenon was never confined to one tourism loop. German and Polish Catholic communities elsewhere in Texas also created richly decorated sanctuaries tied to immigrant memory.",
      "The 1917 church is especially useful for reading architecture and ornament together: THC documents the Gothic Revival building and stained glass, while independent visual sources document the painted interior."
    ]},
    { heading: "Disaster and rapid rebuilding", paragraphs: [
      "The previous church burned after a lightning strike in 1917, and the congregation replaced it in the same year. That compressed rebuilding story parallels other painted churches where storms or fire became part of parish identity and architectural decision-making."
    ]},
  ],
  communityContext: [
    { heading: "German, Polish and German-Russian Catholic settlement", paragraphs: [
      "THC traces the parish from early Catholic visits in 1860 through an 1873 church and later growth fueled by Polish and German-Russian immigration. The parish eventually divided along Polish and German lines, with Polish families establishing St. Joseph’s at Stoneham.",
      "That history makes the church a useful site for understanding how language, ethnicity and parish organization evolved within immigrant Catholic Texas."
    ]},
  ],
  recordNotes: [
    "Recorded Texas Historic Landmark, marker year 2001.",
    "The THC marker does not identify an original decorative painter or precise paint date; those details should remain unassigned until archival evidence emerges.",
  ],
  sources: [
    { label: "Texas Historical Commission — St. Mary’s Catholic Church", url: "https://atlas.thc.texas.gov/Details/5185012792", tier: "official", use: "parish chronology, architecture, immigrant history, stained glass and RTHL status" },
    { label: "National Catholic Register — Plantersville Painted Church", url: "https://www.ncregister.com/blog/take-a-peek-inside-a-historic-painted-church-of-texas", tier: "scholarly", use: "visual documentation of the painted interior and devotional furnishings" },
    { label: "Texas Escapes — Plantersville", url: "https://www.texasescapes.com/Churches/Plantersville-Texas-Painted-Church-St-Marys.htm", tier: "local", use: "historic interior photography and secondary painted-church identification" },
  ],
};

const cornHill: PaintedChurchResearchDossier = {
  slug: "corn-hill-holy-trinity-catholic-church",
  researchSummary: "Corn Hill broadens the collection beyond formally designated painted interiors. Its significance rests on a well-documented 1889 Moravian-rooted parish, a 1913 twin-spired church and a still-living Czech Catholic heritage, while modern travel sources identify its softly muraled interior as part of the wider Painted Churches tradition.",
  lookFor: [
    { label: "Twin-spired brick exterior", detail: "County history dates the present church to 1913 and identifies the twin spires as a defining feature." },
    { label: "Soft mural treatment", detail: "Modern Painted Churches coverage describes a more restrained mural environment than the saturated interiors of High Hill or Praha." },
    { label: "Parish-school landscape", detail: "A parochial school operated beside the church until 1968, showing the parish’s role as a broader community institution." },
    { label: "Czech-Moravian continuity", detail: "The parish still celebrates a Czech Mass tied explicitly to the Moravian heritage of the founding families." },
  ],
  interpretation: [
    { heading: "Why Corn Hill belongs in the broader collection", paragraphs: [
      "The Painted Churches label has always been wider than the THC National Register multiple-property group. Corn Hill is a good example of why TexasDefined keeps those categories separate: modern road-trip sources include it for its painted interior, but the formal THC decorative-interior list does not.",
      "That distinction should remain visible on the page so visitors get both a broader cultural picture and an accurate designation record."
    ]},
    { heading: "A church still carrying its founding culture", paragraphs: [
      "Holy Trinity’s current parish life preserves the immigrant story in active form. Its annual Czech Mass honors Sts. Cyril and Methodius and the Moravian background of the founders, with descendants of founding families still represented in the congregation."
    ]},
  ],
  communityContext: [
    { heading: "Central European settlement in Williamson County", paragraphs: [
      "Williamson County history records settlers from Germany, Austria, Moravia, Bohemia and Silesia arriving in the area in the late nineteenth century. Holy Trinity was founded in 1889 within that migration landscape.",
      "The present 1913 church and the former parish school became visible anchors for a rural community whose religious and social life were closely intertwined."
    ]},
  ],
  recordNotes: [
    "TexasDefined classifies Corn Hill as part of the broader Painted Churches tradition, not the THC National Register decorative-interior multiple-property group.",
    "No named decorative painter or exact mural campaign is asserted without stronger parish or archival documentation.",
  ],
  sources: [
    { label: "Holy Trinity Catholic Church — official parish", url: "https://holytrinityofcornhill.org/", tier: "official", use: "current parish identity, founding date, address, worship and contact information" },
    { label: "Holy Trinity — Czech Mass and parish events", url: "https://holytrinityofcornhill.org/events/", tier: "official", use: "Moravian heritage and continuing Czech-language tradition" },
    { label: "Williamson County — Theon history", url: "https://www.wilcotx.gov/889/Theon", tier: "official", use: "1913 church, settlement background and parish-school history" },
    { label: "Traveller’s Elixir — Painted Churches road trip", url: "https://www.travellerselixir.com/texas-painted-churches-road-trip/", tier: "local", use: "secondary identification as a Painted Church and visual interior description" },
  ],
};

export const additionalPaintedChurchResearchDossiers: Record<string, PaintedChurchResearchDossier> = {
  [plantersville.slug]: plantersville,
  [cornHill.slug]: cornHill,
};

export function additionalPaintedChurchResearchBySlug(slug: string) {
  return additionalPaintedChurchResearchDossiers[slug];
}
