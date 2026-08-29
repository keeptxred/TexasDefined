import { resolveTexasTalentEntityLinksFromGraph } from "@/data/texas-talent-links.server";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";
import type { LoadedTexasTalentProfile } from "@/data/texas-talent-launch";
import type { TexasTalentVerifiedInternalLink } from "@/data/texas-talent-readiness";

export type TexasTalentRelatedProfile = {
  slug: string;
  name: string;
  texasConnection: string;
  sameCategory: boolean;
  sharedDestinations: readonly TexasTalentVerifiedInternalLink[];
};

function linkWeight(link: TexasTalentVerifiedInternalLink) {
  if (link.kind === "city") return 5;
  if (link.kind === "culture") return 4;
  if (link.kind === "county") return 3;
  return 2;
}

export function resolveTexasTalentRelatedProfilesFromGraph(
  target: LoadedTexasTalentProfile,
  profiles: readonly LoadedTexasTalentProfile[],
  graph: readonly TexasEntityRecord[],
  limit = 6,
): readonly TexasTalentRelatedProfile[] {
  const targetLinks = resolveTexasTalentEntityLinksFromGraph(target, graph);
  const targetPaths = new Set(targetLinks.map((link) => link.href));

  return profiles
    .filter((candidate) => candidate.slug !== target.slug)
    .map((candidate) => {
      const candidateLinks = resolveTexasTalentEntityLinksFromGraph(candidate, graph);
      const sharedDestinations = candidateLinks.filter((link) => targetPaths.has(link.href));
      const sameCategory = candidate.category === target.category;
      const score = sharedDestinations.reduce((sum, link) => sum + linkWeight(link), 0)
        + (sameCategory ? 2 : 0);

      return {
        slug: candidate.slug,
        name: candidate.name,
        texasConnection: candidate.texasConnection,
        sameCategory,
        score,
        sharedDestinations,
      };
    })
    .filter((candidate) => candidate.score > 0)
    .sort(
      (a, b) => b.score - a.score
        || b.sharedDestinations.length - a.sharedDestinations.length
        || a.name.localeCompare(b.name),
    )
    .slice(0, Math.max(1, Math.min(limit, 8)))
    .map(({ score: _score, ...candidate }) => candidate);
}
