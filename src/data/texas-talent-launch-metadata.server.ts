import type { TexasTalentProfile } from "@/data/texas-talent";

export const TEXAS_TALENT_FUTURE_BASE_PATH = "/texas-talent";

const DESCRIPTION_MAX = 158;
const DESCRIPTION_MIN = 110;

export function texasTalentFutureCanonicalPath(slug: string) {
  return `${TEXAS_TALENT_FUTURE_BASE_PATH}/${slug}`;
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function truncateAtWordBoundary(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const candidate = value.slice(0, Math.max(0, maxLength - 1)).trimEnd();
  const boundary = candidate.lastIndexOf(" ");
  const trimmed = boundary >= Math.floor(maxLength * 0.7)
    ? candidate.slice(0, boundary)
    : candidate;
  return `${trimmed.replace(/[,:;\-–—]+$/, "")}…`;
}

function buildDescription(profile: Pick<TexasTalentProfile, "dek" | "texasConnection">) {
  const dek = normalizeWhitespace(profile.dek);
  const texasConnection = normalizeWhitespace(profile.texasConnection);
  const candidate = dek.length >= DESCRIPTION_MIN
    ? dek
    : `${dek} ${texasConnection}`;
  return truncateAtWordBoundary(candidate, DESCRIPTION_MAX);
}

export function buildTexasTalentLaunchMetadata(
  profile: Pick<TexasTalentProfile, "slug" | "name" | "dek" | "texasConnection">,
) {
  const canonicalPath = texasTalentFutureCanonicalPath(profile.slug);
  const title = `${profile.name}: Texas Talent | Texas Defined`;
  const description = buildDescription(profile);

  return {
    canonicalPath,
    title,
    description,
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      description,
      url: `https://texasdefined.com${canonicalPath}`,
      mainEntityOfPage: `https://texasdefined.com${canonicalPath}`,
    } as const,
  };
}
