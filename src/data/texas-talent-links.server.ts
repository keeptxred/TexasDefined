import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import {
  canonicalEntityPath,
  isIndexableEntityPage,
} from "@/data/knowledge-graph/relationships";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";
import type { LoadedTexasTalentProfile } from "@/data/texas-talent-launch";
import type { TexasTalentVerifiedInternalLink } from "@/data/texas-talent-readiness";

function normalizeLabel(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function linkKind(entity: TexasEntityRecord): TexasTalentVerifiedInternalLink["kind"] {
  if (entity.kind === "county") return "county";
  if (entity.kind === "city" || entity.kind === "census-place") return "city";
  if (entity.kind === "region") return "destination";
  return "destination";
}

function exactEntityMatch(label: string, graph: readonly TexasEntityRecord[]) {
  const normalized = normalizeLabel(label);
  if (!normalized) return undefined;

  const matches = graph.filter((entity) => {
    const names = [entity.name, entity.slug.replaceAll("-", " "), ...entity.aliases];
    return names.some((name) => normalizeLabel(name) === normalized);
  });

  if (matches.length !== 1) return undefined;
  return matches[0];
}

export async function resolveTexasTalentEntityLinks(
  profile: LoadedTexasTalentProfile,
): Promise<readonly TexasTalentVerifiedInternalLink[]> {
  const graph = await loadTexasKnowledgeGraph();
  const resolved = new Map<string, TexasTalentVerifiedInternalLink>();

  for (const link of profile.readiness.internalLinkReview.links) {
    resolved.set(link.href, link);
  }

  const labels = [...new Set([...profile.primaryPlaces, ...profile.plannedCrossLinks])];
  for (const label of labels) {
    const entity = exactEntityMatch(label, graph);
    if (!entity || !isIndexableEntityPage(entity)) continue;

    const href = canonicalEntityPath(entity);
    if (resolved.has(href)) continue;

    resolved.set(href, {
      label: entity.name,
      href,
      kind: linkKind(entity),
    });
  }

  return [...resolved.values()];
}
