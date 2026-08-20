import type { PaintedChurchResearchDossier } from "./painted-church-research";

const masonResearch: PaintedChurchResearchDossier = {
  slug: "mason-st-joseph-catholic-church",
  researchSummary: "Mason is a particularly useful Painted Churches case because its documentation separates three layers unusually clearly: Manuel Lopez's 1916 sky-and-angels program, the damage/covering and rediscovery of that historic work, and a 2024 campaign that restored the historic vault while adding separately credited new sacred art and furnishings.",
  lookFor: [
    { label: "Historic sky vault", detail: "Read the blue ceiling as a painted heavenly field: the parish history identifies clouds, stars and angels across the ceiling rather than a simple monochrome finish." },
    { label: "Dove above the altar", detail: "The parish's 1983 historical study specifically records an opening-sky image behind the altar with a dove hovering above it, providing unusually precise church-specific iconographic evidence." },
    { label: "Restoration boundary", detail: "The 2024 vault was restored and matched across an enlarged interior. Visually continuous paint should therefore not be assumed to be untouched 1916 fabric everywhere." },
    { label: "New St. Joseph imagery", detail: "Studio io credits Stabat Mater Foundation with new hand-painted lily and tree-of-life / Twelve Apostles motifs. These are modern additions inspired by the church's historic character." },
    { label: "Furnishings as ensemble", detail: "The restored painted vault now works with a new reredos, altar, ambo, side shrines, font and ambry rather than existing as an isolated ceiling artwork." },
  ],
  interpretation: [
    {
      heading: "A strong example of why integrity labels matter",
      paragraphs: [
        "Calling Mason simply 'original' would flatten the evidence. The parish history records that the 1963 expansion covered Lopez's angels with acoustical tile, while Studio io records the later rediscovery and 2024 restoration of the painted vault. The present appearance therefore combines surviving/restored historic work, visual continuation across the enlarged vault and new decorative details.",
        "Texas Defined classifies the church as a restored original scheme because the documented preservation campaign centers on recovery and restoration of the historic ceiling rather than replacement with an unrelated design.",
      ],
    },
    {
      heading: "The 2024 campaign should be read as preservation plus interpretation",
      paragraphs: [
        "Murals by Jericho is credited with restoring the historic painted vault and matching it across the ceiling. Stabat Mater Foundation is separately credited with new hand-painted detailing, while Little Way Construction produced new sanctuary furnishings. Keeping those roles separate preserves authorship instead of assigning the whole present interior to Manuel Lopez.",
        "The result is a living decorative church interior whose historic and modern layers can be studied together without pretending they are the same date or the same hand.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "A Central Texas parish built from local material",
      paragraphs: [
        "The 1876 church was constructed from red sandstone quarried near Mason, with parishioners contributing labor. That local-material history is part of the building's identity before the 1916 painting campaign transformed the interior visually.",
        "The church remains an active Diocese of Austin parish and today presents its historic fabric as part of a functioning worship space rather than a museum installation.",
      ],
    },
  ],
  recordNotes: [
    "The parish's current contact page lists 216 N Ave B, while Texas Time Travel lists 210 S Avenue B. Texas Defined should preserve the address discrepancy until a parcel/field check resolves the numbering convention.",
    "The parish history dates Manuel Lopez's painting to 1916. Texas Time Travel summarizes the campaign more generally as the early 1900s; the church-controlled history controls the precise year.",
    "Studio io says the painted vault was rediscovered in 1989. Texas Time Travel ties the discovery to tornado roof damage. Those accounts are compatible but should remain separately attributed rather than merged into a more specific causal statement than the sources support.",
    "Studio io's photographs are excellent exact-subject evidence but do not expose a reusable license. They remain research/permission leads, not publishable Texas Defined gallery assets.",
  ],
  sources: [
    { label: "St. Joseph Catholic Church Mason — official parish history", url: "https://stjosephmason.org/about-us", tier: "official", use: "congregation history, 1876 construction, Manuel Lopez attribution, 1916 iconography and later alterations" },
    { label: "St. Joseph Catholic Church Mason — current parish", url: "https://stjosephmason.org/", tier: "official", use: "current active-parish identity, worship schedule and visitor invitation" },
    { label: "St. Joseph Catholic Church Mason — contact", url: "https://stjosephmason.org/contact-us", tier: "official", use: "current address, office phone and office hours" },
    { label: "Studio io — St. Joseph Mason", url: "https://www.studioiodesign.com/st-joseph-mason", tier: "scholarly", use: "2024 preservation scope, restoration authorship, new decorative work and furnishings" },
    { label: "Texas Time Travel — St. Joseph's Catholic Church Mason", url: "https://texastimetravel.com/directory/st-josephs-catholic-church/", tier: "official", use: "THC heritage interpretation, restoration context and visitor-call-ahead guidance" },
  ],
};

export function masonPaintedChurchResearchBySlug(slug: string) {
  return slug === masonResearch.slug ? masonResearch : undefined;
}
