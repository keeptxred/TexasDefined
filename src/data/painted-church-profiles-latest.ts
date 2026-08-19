import type { PaintedChurchProfile } from "./painted-church-profiles";

const latestProfiles: PaintedChurchProfile[] = [
  {
    slug: "castroville-st-louis-catholic-church",
    quickAnswer: "St. Louis Catholic Church in Castroville belongs in the broader Texas Painted Churches tradition because the parish itself publishes interior imagery identified as the painted inside church, the Texas Historical Commission documents the 1870 limestone church and Recorded Texas Historic Landmark status, and the Buie Harwood archive includes St. Louis in its decorative-painting field research.",
    foundedYear: 1844,
    builtYear: 1870,
    architecture: "Nineteenth-century limestone Catholic church in historic Castroville",
    heritage: "Alsatian Catholic immigrant community in Castroville",
    facts: [
      { label: "Present church", value: "The current limestone church dates to 1870" },
      { label: "Heritage", value: "The parish grew from Castroville's Alsatian Catholic settlement" },
      { label: "Historic designation", value: "Recorded Texas Historic Landmark" },
      { label: "Decorative evidence", value: "The parish history publishes interior imagery identified as the painted inside church, while the Buie Harwood archive independently includes St. Louis in decorative-painting field research" },
      { label: "Classification", value: "Broader historic Painted Churches tradition; not claimed as part of the formal 1983 National Register decorative-interior group" },
    ],
    history: [{ heading: "An Alsatian Catholic landmark in Castroville", paragraphs: ["St. Louis Catholic Church is rooted in the Alsatian settlement of Castroville. The parish history and Texas Historical Commission document the church as part of the community's nineteenth-century Catholic and architectural legacy, with the present stone church dating to 1870."] }],
    paintings: [{ heading: "A documented painted interior, with chronology still under study", paragraphs: ["The parish's own historical material includes an interior image identified as the painted inside church. Separately, the Buie Harwood decorative-painting archive includes St. Louis among church-specific field-research materials. Those independent records establish a defensible decorative-interior connection, while Texas Defined leaves the exact painting chronology and authorship unresolved until stronger primary evidence is located."] }],
    preservation: [{ heading: "Conservative integrity classification", paragraphs: ["Texas Defined currently marks St. Louis's interior integrity as uncertain. That is intentional: the evidence supports a historic painted program, but it does not yet support a precise claim about how much visible decoration is original, restored, repainted or reconstructed."] }],
    visitorNotes: ["St. Louis is an active parish in Castroville. Verify current church access, Masses and parish events through the official parish before making a sightseeing trip."],
    sources: [
      { label: "St. Louis Catholic Church — official parish history", url: "https://www.saintlouisdaycastroville.org/history" },
      { label: "Texas Historical Commission — St. Louis Catholic Church", url: "https://atlas.thc.texas.gov/Details/5325005051" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml" },
      { label: "St. Louis Catholic Church — official parish", url: "https://www.saintlouisdaycastroville.org/" },
    ],
  },
  {
    slug: "lacoste-our-lady-of-grace",
    quickAnswer: "Our Lady of Grace Catholic Church in La Coste belongs in the broader Texas Painted Churches tradition because the Buie Harwood archive preserves a dedicated 21-slide decorative-painting study of the church from 1978, while the active parish and Texas Historical Commission independently identify the same 1911 red-brick Gothic church at 15825 Bexar Street.",
    foundedYear: 1911,
    builtYear: 1911,
    architecture: "Red-brick Gothic Catholic church",
    heritage: "Medina County Catholic community with historic ties to the Castroville-La Coste corridor",
    facts: [
      { label: "Present church", value: "Completed in 1911" },
      { label: "Address", value: "15825 Bexar St., La Coste, Texas 78039" },
      { label: "Decorative-painting archive", value: "Buie Harwood's archive contains 21 church-specific slides dated 1978" },
      { label: "Historic marker", value: "Texas Historical Commission marker 17850, erected 2014" },
      { label: "Classification", value: "Broader historic Painted Churches tradition; not claimed as part of the formal 1983 National Register decorative-interior group" },
    ],
    history: [{ heading: "A 1911 Catholic landmark in La Coste", paragraphs: ["The parish and Texas Historical Commission both trace Our Lady of Grace to a 1910 petition and the completion of the red-brick Gothic church in 1911. Emil Zinsmeyer donated land for the church, school and cemetery, and the building became a long-lived center of Catholic community life in La Coste."] }],
    paintings: [{ heading: "A scholarly decorative-painting record without invented details", paragraphs: ["The strongest inclusion evidence is the Buie Harwood archive's dedicated 21-slide Our Lady of Grace research group from 1978. That establishes church-specific decorative-painting research, but the currently verified source set does not yet establish a named artist, precise painting date or documented technique set. Texas Defined leaves those fields blank instead of deriving them from modern photographs alone."] }],
    preservation: [{ heading: "Integrity remains an open research question", paragraphs: ["The public record confirms that the church interior has experienced later work, but the verified primary and scholarly sources do not yet support a precise original-versus-restored classification. The canonical record therefore uses an uncertain integrity label until better documentation is located."] }],
    visitorNotes: ["Our Lady of Grace is an active parish. Use the official parish website for current Masses, office hours and contact information and verify sightseeing access before making a special trip."],
    sources: [
      { label: "Our Lady of Grace — official parish history", url: "https://olgtx.org/about-us" },
      { label: "Texas Historical Commission — Our Lady of Grace Catholic Church", url: "https://atlas.thc.texas.gov/Details/5507017850" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml" },
      { label: "Our Lady of Grace — official parish", url: "https://olgtx.org/" },
    ],
  },
];

export function latestPaintedChurchProfileBySlug(slug: string) {
  return latestProfiles.find((profile) => profile.slug === slug);
}
