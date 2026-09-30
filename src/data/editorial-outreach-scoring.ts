import type { EditorialOutreachTarget } from "./editorial-outreach";

export interface EditorialOutreachScorecard {
  pageStrength: number;
  organizationAuthority: number;
  relationshipLikelihood: number;
  officialAssetsOpportunity: number;
  recurringUpdateOpportunity: number;
  legitimateReferenceOpportunity: number;
  total: number;
}

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

function textBand(value: string, high: RegExp, medium: RegExp, fallback = 60) {
  if (high.test(value)) return 95;
  if (medium.test(value)) return 80;
  return fallback;
}

function organizationAuthority(type: string) {
  const value = type.toLowerCase();
  if (/federal|state agency|national park|university/.test(value)) return 96;
  if (/destination marketing|visitor|museum|aquarium|nonprofit/.test(value)) return 91;
  if (/chamber|historic visitor district|tour operator/.test(value)) return 86;
  return 78;
}

/**
 * Exposes the six prioritization factors requested for TexasDefined source outreach.
 * The seed target's existing score remains a compatibility signal; this scorecard
 * makes the actual relationship-first reasons visible and comparable.
 */
export function scoreEditorialOutreachTarget(target: EditorialOutreachTarget): EditorialOutreachScorecard {
  const pageStrength = clamp(target.score);
  const authority = organizationAuthority(target.organizationType);
  const relationshipLikelihood = target.status === "existing-relationship" ? 100 : target.status === "ready" ? 92 : 70;
  const officialAssetsOpportunity = textBand(target.photoOpportunity, /very high/i, /high/i, /medium/i.test(target.photoOpportunity) ? 70 : 55);
  const recurringUpdateOpportunity = textBand(target.updateOpportunity, /very high/i, /high/i, /medium/i.test(target.updateOpportunity) ? 70 : 55);
  const legitimateReferenceOpportunity = /optional|if .*useful|useful/i.test(target.referenceAsk) ? 88 : 68;

  // Relationship quality is weighted above backlink potential by design.
  const total = clamp(
    pageStrength * 0.24 +
    authority * 0.18 +
    relationshipLikelihood * 0.2 +
    officialAssetsOpportunity * 0.14 +
    recurringUpdateOpportunity * 0.16 +
    legitimateReferenceOpportunity * 0.08,
  );

  return {
    pageStrength,
    organizationAuthority: authority,
    relationshipLikelihood,
    officialAssetsOpportunity,
    recurringUpdateOpportunity,
    legitimateReferenceOpportunity,
    total,
  };
}
