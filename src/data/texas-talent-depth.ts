import type { TexasTalentProfile } from "@/data/texas-talent";

export type TexasTalentDepthStatus = "thin" | "adequate" | "strong";

export type TexasTalentDepthAudit = {
  slug: string;
  name: string;
  narrativeWords: number;
  structuredWords: number;
  totalWords: number;
  status: TexasTalentDepthStatus;
};

function countWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function countMany(values: readonly string[]) {
  return values.reduce((total, value) => total + countWords(value), 0);
}

/**
 * This is an editorial audit, not a publication gate. It measures the amount
 * of meaningful profile copy a reader would encounter and helps prioritize
 * expansion work without granting launch approval or changing stored readiness.
 */
export function auditTexasTalentDepth(profile: TexasTalentProfile): TexasTalentDepthAudit {
  const narrativeWords = countMany([
    profile.dek,
    profile.texasConnection,
    ...profile.overview,
    ...profile.legacy,
    ...profile.texasPlaces.map((place) => place.context),
  ]);
  const structuredWords = countMany([
    ...profile.timeline.map((item) => item.event),
    ...profile.definingWorks,
    ...profile.primaryPlaces,
  ]);
  const totalWords = narrativeWords + structuredWords;

  const status: TexasTalentDepthStatus = narrativeWords >= 350
    ? "strong"
    : narrativeWords >= 250
      ? "adequate"
      : "thin";

  return {
    slug: profile.slug,
    name: profile.name,
    narrativeWords,
    structuredWords,
    totalWords,
    status,
  };
}
