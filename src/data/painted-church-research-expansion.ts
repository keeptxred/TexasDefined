import type { PaintedChurchResearchDossier } from "./painted-church-research";

const dossiers: PaintedChurchResearchDossier[] = [
  {
    slug: "corpus-christi-sacred-heart-catholic-church",
    researchSummary: "Sacred Heart in Corpus Christi expands the Painted Churches story into twentieth-century Mexican American regionalist art. Its inclusion rests on unusually strong converging evidence: an active parish record, diocesan documentation of Antonio E. Garcia's church murals, Texas A&M–Corpus Christi documentation of three true frescoes, and an architectural reference identifying Garcia's chancel work.",
    lookFor: [
      { label: "Sanctuary-dome frescoes", detail: "Texas A&M–Corpus Christi says three true frescoes painted between 1942 and 1948 cover the sanctuary dome and exceed thirty feet in height." },
      { label: "South Texas visual language", detail: "Garcia's broader fresco practice is known for combining Catholic subjects with regional visual references, making authorship central to interpreting the interior." },
      { label: "Chancel architecture", detail: "SAH Archipedia identifies architect Richard S. Colley and describes bright Garcia murals on the chancel walls." },
    ],
    interpretation: [
      { heading: "Why Corpus Christi belongs in the broader tradition", paragraphs: ["The formal 1983 Painted Churches multiple-property group does not define every decorated sacred interior in Texas. Sacred Heart has a named artist, a dated monumental fresco campaign and multiple institutional sources, so it meets Texas Defined's broader historic-tradition standard without being mislabeled as part of the formal group."] },
      { heading: "Antonio Garcia changes the geographic story", paragraphs: ["Garcia's frescoes connect Painted Church research to Mexican American art history and South Texas regionalism, extending the subject beyond the Central European immigrant communities that dominate the classic Schulenburg narrative."] },
    ],
    communityContext: [
      { heading: "A Mexican American South Texas art legacy", paragraphs: ["The Diocese of Corpus Christi and Texas A&M–Corpus Christi preserve Garcia's connection to Sacred Heart as both parishioner and artist. The church therefore documents not only Catholic devotional art but a major local artist working within his own religious community."] },
    ],
    recordNotes: ["Texas Defined classifies Sacred Heart as broader historic tradition, not formal National Register decorative-interior membership.", "The dated 1942–1948 true-fresco evidence comes from Texas A&M–Corpus Christi; diocesan material describes the church paintings as a two-year early-1940s commission, so both descriptions are retained rather than flattened."],
    sources: [
      { label: "Sacred Heart Corpus Christi — official parish", url: "https://www.sacredheartcorpus.org/", tier: "official", use: "current parish identity, address, Mass and contact information" },
      { label: "Diocese of Corpus Christi — Antonio Garcia marker", url: "https://diocesecc.org/news/marker-at-sacred-heart-honors-life-of-catholic-artist", tier: "official", use: "artist identity, church mural subjects and Garcia's parish connection" },
      { label: "Texas A&M University–Corpus Christi — Antonio E. Garcia", url: "https://www.tamucc.edu/education/departments/garcia-center/antonio-e-garcia.php", tier: "scholarly", use: "true-fresco dates, scale, medium and artist biography" },
      { label: "SAH Archipedia — Sacred Heart Catholic Church", url: "https://sah-archipedia.org/buildings/TX-01-CC21", tier: "scholarly", use: "architect, chancel architecture and Garcia mural attribution" },
    ],
  },
  {
    slug: "san-antonio-st-joseph-catholic-church",
    researchSummary: "St. Joseph in downtown San Antonio is a high-confidence broader-tradition addition because its German Catholic parish history, Gothic architecture, archival fresco photography and Harwood decorative-painting research converge on the same church. The page also preserves a real chronology discrepancy between the parish's modern summary and its longer historical files.",
    lookFor: [
      { label: "Ceiling and column frescoes", detail: "A San Antonio Conservation Society photograph preserved by the Portal to Texas History explicitly identifies frescoes on the ceiling and columns." },
      { label: "German Gothic architecture", detail: "The parish traces the church to German Catholic immigrants and documents the Gothic building, later steeple and Bavarian stained glass." },
      { label: "Layered interior preservation", detail: "Historic paintings, stained glass and later restoration belong to different periods and should not be assigned to one single decorative campaign." },
    ],
    interpretation: [
      { heading: "A Painted Church hidden in downtown San Antonio", paragraphs: ["St. Joseph demonstrates why a statewide census should not be restricted to rural tour routes. The church is surrounded by modern downtown development, yet archival photography and decorative-painting research document a historic frescoed interior." ]},
      { heading: "Preserve the date conflict", paragraphs: ["The current parish summary says the church was completed in 1876, while detailed parish historical files describe the dedication in 1871 and explain that significant finishing work remained afterward. Texas Defined records both statements instead of forcing a false precision." ]},
    ],
    communityContext: [
      { heading: "German Catholic San Antonio", paragraphs: ["The parish was organized by German Catholic immigrants seeking worship in their own language. Parish history connects the building to German-speaking religious life, Gothic architectural preference and later Bavarian stained glass." ]},
    ],
    recordNotes: ["Portal archival imagery is direct visual evidence of frescoes; Harwood archive presence is supporting decorative-painting research evidence, not formal National Register membership.", "Current public visitor and worship information is controlled by the active St. Joseph parish."],
    sources: [
      { label: "St. Joseph Downtown San Antonio — official parish history", url: "https://www.stjsa.org/our-parish", tier: "official", use: "current parish identity, German heritage and modern building chronology" },
      { label: "St. Joseph historical parish files", url: "https://www.stjsa.net/cemetery/history/", tier: "official", use: "1871 dedication, architects, German community chronology and Rev. Henry Pefferkorn context" },
      { label: "Portal to Texas History — St. Joseph apse", url: "https://texashistory.unt.edu/ark:/67531/metapth460055/", tier: "historic-register", use: "archival visual evidence of ceiling and column frescoes" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml", tier: "scholarly", use: "decorative-painting field-research evidence and eight-slide St. Joseph group" },
    ],
  },
];

export function paintedChurchExpansionResearchBySlug(slug: string) {
  return dossiers.find((dossier) => dossier.slug === slug);
}
