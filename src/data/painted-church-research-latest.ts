import type { PaintedChurchResearchDossier } from "./painted-church-research";

const latestResearch: PaintedChurchResearchDossier[] = [
  {
    slug: "castroville-st-louis-catholic-church",
    researchSummary: "St. Louis Catholic Church in Castroville is a verified broader-tradition Painted Church because church-controlled history, Texas Historical Commission documentation and the Buie Harwood decorative-painting archive converge on the same nineteenth-century Alsatian Catholic landmark. The evidence supports inclusion while still leaving the exact decorative chronology and degree of surviving original paint open for further research.",
    lookFor: [
      { label: "Painted interior", detail: "The parish's own historical presentation includes an interior image identified as the painted inside church, providing church-controlled visual evidence of the decorative program." },
      { label: "Stone church fabric", detail: "THC documents the 1870 limestone church, so the decorative interior should be interpreted within a durable nineteenth-century Alsatian Catholic building rather than as a freestanding modern art installation." },
      { label: "Decoration versus restoration", detail: "The surviving interior should not be assigned a single painting date or artist until primary records establish the chronology of original work, repainting and restoration." },
    ],
    interpretation: [
      { heading: "Why Castroville clears the statewide inclusion threshold", paragraphs: ["A decorative-interior classification should not rest on one modern travel photo. St. Louis clears the threshold because the active parish identifies the painted interior, THC establishes the church's historic identity and date, and Harwood's archival fieldwork independently places the church within Texas decorative-painting research."] },
      { heading: "The uncertainty is part of the record", paragraphs: ["The available evidence proves a painted program but does not yet prove the authorship, original campaign date or exact survival percentage of historic paint. Texas Defined therefore includes the church while keeping interior integrity marked uncertain instead of manufacturing a cleaner narrative than the record supports."] },
    ],
    communityContext: [
      { heading: "Alsatian Catholic Castroville", paragraphs: ["St. Louis belongs to Castroville's distinctive Alsatian settlement history. That cultural context expands the Painted Churches story beyond Czech, German, Polish and Wendish communities and makes the church a useful bridge between immigration history, architecture and sacred decorative arts in South-Central Texas."] },
    ],
    recordNotes: ["Texas Defined classifies St. Louis as broader historic tradition, not formal National Register decorative-interior membership.", "The church is a Recorded Texas Historic Landmark; RTHL status is distinct from the 1983 decorative-interior National Register multiple-property group.", "Exact decorative chronology and authorship remain research-open fields."],
    sources: [
      { label: "St. Louis Catholic Church — official parish history", url: "https://www.saintlouisdaycastroville.org/history", tier: "official", use: "parish history and church-controlled visual evidence of the painted interior" },
      { label: "Texas Historical Commission — St. Louis Catholic Church", url: "https://atlas.thc.texas.gov/Details/5325005051", tier: "historic-register", use: "property identity, 1870 church, historic designation and architectural context" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml", tier: "scholarly", use: "independent decorative-painting field-research evidence" },
      { label: "St. Louis Catholic Church — official parish", url: "https://www.saintlouisdaycastroville.org/", tier: "official", use: "current parish identity and visitor contact" },
    ],
  },
  {
    slug: "lacoste-our-lady-of-grace",
    researchSummary: "Our Lady of Grace in La Coste is a verified broader-tradition Painted Church because the active parish and Texas Historical Commission establish the exact 1911 Gothic church while the Buie Harwood archive preserves a dedicated 21-slide decorative-painting study dated 1978. That combination supports inclusion without relying on commercial travel imagery or guessing artist, technique or restoration details.",
    lookFor: [
      { label: "Decorative interior as a research subject", detail: "Harwood's archive gives Our Lady of Grace its own 21-slide research group, direct evidence that the church was documented as a Texas decorative-painting site." },
      { label: "Gothic interior envelope", detail: "The parish and THC identify the 1911 red-brick Gothic church; the decorative program should be interpreted within that architectural setting." },
      { label: "Unresolved authorship and chronology", detail: "No currently verified primary record in the Texas Defined source set names the decorator, a painting campaign date or a complete technique inventory, so those fields remain intentionally blank." },
    ],
    interpretation: [
      { heading: "Why La Coste now clears the inclusion threshold", paragraphs: ["The earlier candidate status reflected insufficient church-specific documentation. The Harwood finding aid resolves that gap by identifying a 21-slide Our Lady of Grace decorative-painting research group from 1978. Because the parish and THC independently anchor the church's identity, date and location, the evidence now supports broader-tradition inclusion."] },
      { heading: "Evidence can justify inclusion without justifying every detail", paragraphs: ["Texas Defined separates the question 'is this a documented decorative-painting church?' from 'who painted it, when, and how much survives?' La Coste now answers the first question strongly; the latter questions remain open and are not filled from unverified assumptions."] },
    ],
    communityContext: [
      { heading: "The Castroville–La Coste Catholic corridor", paragraphs: ["Our Lady of Grace was founded because Catholics in La Coste had previously traveled to Castroville for Mass. That documented relationship helps place La Coste within the broader Catholic settlement geography of Medina County while avoiding an unsupported ethnic label for the decorative program itself."] },
    ],
    recordNotes: ["Texas Defined classifies Our Lady of Grace as broader historic tradition, not formal National Register decorative-interior membership.", "THC records a historical marker rather than RTHL status.", "The 21-slide Harwood group is scholarly decorative-painting evidence; it does not by itself establish a specific artist, technique or unchanged original paint layer."],
    sources: [
      { label: "Our Lady of Grace — official parish history", url: "https://olgtx.org/about-us", tier: "official", use: "1911 founding/building history, present parish identity and address" },
      { label: "Texas Historical Commission — Our Lady of Grace Catholic Church", url: "https://atlas.thc.texas.gov/Details/5507017850", tier: "historic-register", use: "historic marker, church identity, address and 1911 building chronology" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml", tier: "scholarly", use: "21-slide church-specific decorative-painting research group dated 1978" },
      { label: "Our Lady of Grace — official parish", url: "https://olgtx.org/", tier: "official", use: "current Masses, office information and visitor contact" },
    ],
  },
];

export function latestPaintedChurchResearchBySlug(slug: string) {
  return latestResearch.find((dossier) => dossier.slug === slug);
}
