import type { PaintedChurchResearchDossier } from "./painted-church-research";

const dossiers: PaintedChurchResearchDossier[] = [
  {
    slug: "plantersville-st-marys-catholic-church",
    researchSummary: "Plantersville is especially useful for preservation research because surviving stencils, applied canvas and later repainting reveal how a painted church can accumulate, conceal and recover decorative layers over time.",
    lookFor: [
      { label: "Applied-canvas sanctuary frieze", detail: "The Victorious Lamb and incensing angels were painted on canvas applied above the sanctuary arch." },
      { label: "Recovered stencil evidence", detail: "Original color and stencil fragments survived beneath later coverings and informed subsequent restoration." },
      { label: "Changing ceiling program", detail: "Historic descriptions record an earlier starry blue sanctuary ceiling and later applied angel imagery." },
    ],
    interpretation: [{ heading: "Why layers matter", paragraphs: ["The visible church is the product of original 1917 decoration, later repainting and restoration. Treating every surface as untouched original work would erase the preservation history that makes the building especially instructive."] }],
    communityContext: [{ heading: "Immigration and parish growth", paragraphs: ["THC documents the parish's growth alongside Polish and German-Russian immigration, tying the decorative interior to the same immigrant-community formation seen in better-known Central Texas examples."] }],
    sources: [
      { label: "Texas Historical Commission marker", url: "https://atlas.thc.texas.gov/Details/5185012792", tier: "official", use: "church chronology, immigration context and RTHL status" },
      { label: "National Catholic Register feature", url: "https://www.ncregister.com/blog/take-a-peek-inside-a-historic-painted-church-of-texas", tier: "local", use: "interior imagery and preservation details" },
    ],
  },
  {
    slug: "corn-hill-holy-trinity-catholic-church",
    researchSummary: "Corn Hill belongs to the broader Painted Churches conversation because its immigrant parish, 1913 twin-spired church and decorated interior continue the Central European sacred-art tradition beyond the formal 1983 National Register group.",
    lookFor: [
      { label: "Twin-spired silhouette", detail: "Read the exterior as a community landmark before interpreting the interior decoration." },
      { label: "Mural-decorated sanctuary", detail: "Modern Painted Churches coverage identifies the decorated interior; avoid assigning artists or dates not supported by parish records." },
    ],
    interpretation: [{ heading: "A broader-tradition church", paragraphs: ["Texas Defined separates the popular Painted Churches tradition from the narrower THC multiple-property designation. Corn Hill is included in the former, not claimed as a member of the latter."] }],
    communityContext: [{ heading: "Czech and Moravian continuity", paragraphs: ["The parish's own history centers Czech and Moravian settlement, making Holy Trinity part of the same migration-and-memory story that shaped many famous painted sanctuaries." ]}],
    sources: [
      { label: "Holy Trinity official parish site", url: "https://holytrinityofcornhill.org/", tier: "official", use: "current parish identity and community history" },
      { label: "Traveller’s Elixir Painted Churches route", url: "https://www.travellerselixir.com/texas-painted-churches-road-trip/", tier: "local", use: "broader Painted Churches classification and visitor context" },
    ],
  },
  {
    slug: "palestine-sacred-heart-catholic-church",
    researchSummary: "Palestine is a high-confidence expansion because primary-source photographs, an architectural research archive and current parish records converge: this is a documented decorated sacred interior, not merely a church that appears on a tourism list.",
    lookFor: [
      { label: "Sanctuary mural", detail: "Historic Portal photographs show a religious mural above the altar with Jesus and angels." },
      { label: "Stained glass", detail: "The sanctuary is ringed by decorative stained-glass windows that work with the mural as a single visual ensemble." },
      { label: "Timber ceiling", detail: "The historic wood ceiling and sanctuary geometry frame the decorative program and distinguish the interior from plaster-vaulted examples." },
    ],
    interpretation: [{ heading: "Primary images make the case", paragraphs: ["The Portal to Texas History preserves early photographs from the Palestine Public Library collection. Those images let Texas Defined document the painted program directly instead of relying on modern travel descriptions alone."] }],
    communityContext: [{ heading: "An East Texas extension", paragraphs: ["Sacred Heart broadens the geography of the Painted Churches story into East Texas and demonstrates that decorative church painting was not confined to the Schulenburg-Hill Country corridor."] }],
    recordNotes: ["The parish currently requires sightseeing visitors to arrange access outside regularly scheduled worship, Confession and Adoration times."],
    sources: [
      { label: "Portal to Texas History — Sacred Heart interior", url: "https://texashistory.unt.edu/ark:/67531/metapth26520/", tier: "historic-register", use: "primary-source evidence of the mural and stained-glass sanctuary" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml", tier: "scholarly", use: "decorative-painting research context" },
      { label: "Sacred Heart official visit page", url: "https://shpalestine.org/visit", tier: "official", use: "current visitor-access policy" },
    ],
  },
  {
    slug: "bandera-st-stanislaus-catholic-church",
    researchSummary: "Bandera is unusual because the parish itself provides unusually precise authorship and iconography for a modern painted program inside an 1876 immigrant church, allowing the page to distinguish historic architecture from twenty-first-century decorative renewal.",
    lookFor: [
      { label: "Four evangelists", detail: "Fr. Antoni Polaniak painted evangelist symbols on the ceiling during the modern interior campaign." },
      { label: "Coronation of Mary", detail: "Cezary and Eva Sienkiel painted the Coronation of the Blessed Mother as Queen of Heaven and Earth in the presbyterium." },
      { label: "Life of St. Stanislaus", detail: "Wall paintings narrate episodes from the patron saint's life." },
      { label: "Choir-loft angels", detail: "Two painted angels continue the decorative program into the rear gallery." },
    ],
    interpretation: [{ heading: "A living tradition, not a nineteenth-century time capsule", paragraphs: ["St. Stanislaus shows why a comprehensive Painted Churches resource should track later decorative campaigns. The architecture dates to 1876, but the parish documents major painted work completed during the 2003–2008 renovation."] }],
    communityContext: [{ heading: "Silesian Polish Bandera", paragraphs: ["The parish traces its founding to Silesian Polish families brought to Bandera in 1855, making the church a direct companion to the Polish settlement histories of Panna Maria and other early Texas communities." ]}],
    sources: [
      { label: "St. Stanislaus official church history", url: "https://www.ststanislausbandera.com/history-of-the-church.html", tier: "official", use: "founding, architecture, artist names, imagery and renovation chronology" },
      { label: "Texas Historical Commission RTHL record", url: "https://atlas.thc.texas.gov/Details/5019005081", tier: "official", use: "Recorded Texas Historic Landmark status" },
    ],
  },
];

export function paintedChurchAdditionResearchBySlug(slug: string) {
  return dossiers.find((dossier) => dossier.slug === slug);
}
