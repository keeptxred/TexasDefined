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
];

export function latestPaintedChurchResearchBySlug(slug: string) {
  return latestResearch.find((dossier) => dossier.slug === slug);
}
