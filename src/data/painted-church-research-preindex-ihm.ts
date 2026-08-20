import type { PaintedChurchResearchDossier } from "./painted-church-research";

const dossier: PaintedChurchResearchDossier = {
  slug: "san-antonio-immaculate-heart-of-mary",
  researchSummary: "Immaculate Heart of Mary is unusually valuable because the surviving record separates the major decorative phases clearly: a 1944 stencil program by a Mexican artist identified as Bartola, a later restoration led by Fr. Alberto Domingo, destructive 1991 arson damage, and a renewed restoration completed in 1994. The current parish continues to present the painted interior as a defining part of its Hispanic and Claretian heritage.",
  lookFor: [
    { label: "Stencil-patterned walls", detail: "The Claretian archive identifies stencils as the method used in the original 1944 decoration. Repeating wall patterns should therefore be read as evidence of a documented technique, not merely as generic ornament." },
    { label: "Restored versus reconstructed areas", detail: "The 1991 fire destroyed portions of the painted walls. Surviving patterns were repainted by hand, while obliterated areas required pattern reconstruction. The visible interior therefore contains different preservation states." },
    { label: "Vaulted architectural envelope", detail: "The parish identifies the church as Byzantine Romanesque. The painted wall program works with vaulted ceilings, stained glass and devotional statuary as an integrated sacred interior." },
    { label: "Hispanic and Claretian context", detail: "The church's art belongs to a living parish shaped by Claretian ministry and Hispanic Catholic culture; that community history is part of the decorative program's significance." },
  ],
  interpretation: [
    {
      heading: "Original authorship and restoration authorship are not the same",
      paragraphs: [
        "The current parish history emphasizes Fr. Alberto Domingo's hand-painted work, while the Claretian Missionaries Archives recovered an earlier parish-chronicle entry naming a Mexican artist from Los Angeles, Bartola, as the person contracted to execute the 1944 stencil program. Both records matter, but they describe different moments.",
        "Texas Defined therefore records Bartola as the original documented decorator and Domingo as a later restorer and artistic interpreter. This avoids a common historical error in restored interiors: assigning the visible present-day work wholesale to the best-known restorer.",
      ],
    },
    {
      heading: "The 1991 fire makes preservation history part of the artwork",
      paragraphs: [
        "The Claretian archive records that a June 30, 1991 arson fire damaged the sacristy and destroyed a large portion of the painted walls while restoration was nearing completion. After the fire, surviving patterns visible beneath soot were restored by hand, and a local restoration specialist reconstructed patterns where the original design had been blackened beyond recovery.",
        "The restoration was completed in 1994. For that reason, the current interior should be described as a restored original scheme with reconstructed areas, not as an untouched 1944 survival.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "A Claretian and Hispanic San Antonio landmark",
      paragraphs: [
        "Claretian missionaries arrived in San Antonio from Mexico in 1902, and the church became a long-lived center of Claretian ministry. The official parish history explicitly frames the building through Hispanic culture, religious tradition, art and architecture.",
        "That context expands the statewide Painted Churches narrative beyond Czech, German, Wendish and Polish immigrant communities and documents a Mexican artistic contribution inside a major San Antonio church.",
      ],
    },
  ],
  recordNotes: [
    "The fuller identity of the original painter recorded as Bartola remains unresolved and should not be expanded without archival proof.",
    "The parish's attribution to Fr. Alberto Domingo and the Claretian archive's 1944 Bartola record describe different phases and should remain separate.",
    "A recent parish restoration was also announced in 2026; details of that campaign should be incorporated when a technical scope or preservation report becomes available.",
  ],
  sources: [
    { label: "Immaculate Heart of Mary — official parish history", url: "https://ihmsatx.org/our-history-1", tier: "official", use: "church chronology, architecture, current cultural interpretation, stained glass and Domingo attribution" },
    { label: "Claretian Missionaries Archives — A Work of Heart", url: "https://claretianmissionariesarchives.org/a-work-of-heart-a-history-of-the-painted-walls-of-immaculate-heart-of-mary-church/", tier: "scholarly", use: "1944 Bartola stencil campaign, Dielmann attribution, Domingo restoration, 1991 arson and 1994 completion" },
    { label: "Immaculate Heart of Mary — official contact and visitor guidance", url: "https://ihmsatx.org/contact-us", tier: "official", use: "current visitor welcome, address, contact and business-hour caveats" },
    { label: "Immaculate Heart of Mary — recent restoration announcement", url: "https://ihmsatx.org/giving-to-ihm-1", tier: "official", use: "current stewardship and recent restoration completion" },
  ],
};

export function immaculateHeartOfMaryPaintedChurchResearchBySlug(slug: string) {
  return slug === dossier.slug ? dossier : undefined;
}
