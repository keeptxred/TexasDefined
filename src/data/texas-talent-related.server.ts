import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { resolveTexasTalentEntityLinksFromGraph } from "@/data/texas-talent-links.server";
import { loadTexasTalentProfilesServer } from "@/data/texas-talent.server";
import type { TexasTalentVerifiedInternalLink } from "@/data/texas-talent-readiness";

export type TexasTalentRelatedProfile = {
  slug: string;
  name: string;
  category: string;
  texasConnection: string;
  sameCategory: boolean;
  score: number;
  sharedDestinations: readonly TexasTalentVerifiedInternalLink[];
};

function linkWeight(link: TexasTalentVerifiedInternalLink) {
  if (link.kind === "city") return 5;
  if (link.kind === "culture") return 4;
  if (link.kind === "county") return 3;
  return 2;
}

export async function loadTexasTalentRelatedProfilesServer(
  slug: string,
  limit = 6,
): Promise<readonly TexasTalentRelatedProfile[]> {
  const profiles = loadTexasTalentProfilesServer();
  const target = profiles.find((profile) => profile.slug === slug);
  if (!target) return [];

  const graph = await loadTexasKnowledgeGraph();
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
        category: candidate.category,
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
    .slice(0, Math.max(1, Math.min(limit, 8)));
}
