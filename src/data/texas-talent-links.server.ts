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

function indexableLinkContext(graph: readonly TexasEntityRecord[]) {
  const indexableEntities = graph.filter(isIndexableEntityPage);
  return {
    indexableEntities,
    indexableByPath: new Map(
      indexableEntities.map((entity) => [canonicalEntityPath(entity), entity] as const),
    ),
  };
}

export function resolveTexasTalentEntityLinksFromGraph(
  profile: LoadedTexasTalentProfile,
  graph: readonly TexasEntityRecord[],
): readonly TexasTalentVerifiedInternalLink[] {
  const { indexableEntities, indexableByPath } = indexableLinkContext(graph);
  const resolved = new Map<string, TexasTalentVerifiedInternalLink>();

  // Readiness records are editorial claims, not a permanent bypass around route
  // quality. Recheck every recorded entity link against the current indexable
  // graph before showing it in a Texas Talent preview or future public loader.
  for (const link of profile.readiness.internalLinkReview.links) {
    const entity = indexableByPath.get(link.href);
    if (!entity) continue;
    resolved.set(link.href, {
      label: entity.name,
      href: link.href,
      kind: linkKind(entity),
    });
  }

  const labels = [...new Set([...profile.primaryPlaces, ...profile.plannedCrossLinks])];
  for (const label of labels) {
    const entity = exactEntityMatch(label, indexableEntities);
    if (!entity) continue;

    const href = canonicalEntityPath(entity);
    if (resolved.has(href)) continue;

    resolved.set(href, {
      label: entity.name,
      href,
      kind: linkKind(entity),
    });
  }

  // Texas Music is now a public, canonical authority hub. Music profiles can
  // safely strengthen that pillar without exposing any hidden Talent profile.
  if (profile.category === "music") {
    resolved.set("/texas-music", {
      label: "Texas Music",
      href: "/texas-music",
      kind: "culture",
    });
  }

  return [...resolved.values()];
}

export async function resolveTexasTalentEntityLinks(
  profile: LoadedTexasTalentProfile,
): Promise<readonly TexasTalentVerifiedInternalLink[]> {
  return resolveTexasTalentEntityLinksFromGraph(profile, await loadTexasKnowledgeGraph());
}

export function auditTexasTalentEntityLinksFromGraph(
  profile: LoadedTexasTalentProfile,
  graph: readonly TexasEntityRecord[],
) {
  const resolvedLinks = resolveTexasTalentEntityLinksFromGraph(profile, graph);
  const resolvedPaths = new Set(resolvedLinks.map((link) => link.href));
  const unsafeRecordedLinks = profile.readiness.internalLinkReview.links.filter(
    (link) => !resolvedPaths.has(link.href),
  );
  const mechanicallyCertified = profile.readiness.internalLinkReview.status !== "pending"
    && resolvedLinks.length > 0
    && unsafeRecordedLinks.length === 0;
  const certificationCandidate = profile.readiness.internalLinkReview.status === "partial"
    && mechanicallyCertified;

  return {
    slug: profile.slug,
    name: profile.name,
    reviewStatus: profile.readiness.internalLinkReview.status,
    recordedLinkCount: profile.readiness.internalLinkReview.links.length,
    safeResolvedLinkCount: resolvedLinks.length,
    unsafeRecordedLinkCount: unsafeRecordedLinks.length,
    unsafeRecordedLinks,
    mechanicallyCertified,
    certificationCandidate,
  };
}

export function applyTexasTalentMechanicalLinkCertificationFromGraph(
  profile: LoadedTexasTalentProfile,
  graph: readonly TexasEntityRecord[],
): LoadedTexasTalentProfile {
  const resolvedLinks = resolveTexasTalentEntityLinksFromGraph(profile, graph);
  const resolvedPaths = new Set(resolvedLinks.map((link) => link.href));
  const unsafeRecordedLinks = profile.readiness.internalLinkReview.links.filter(
    (link) => !resolvedPaths.has(link.href),
  );
  const storedReview = profile.readiness.internalLinkReview;
  const canCertify = storedReview.status !== "pending"
    && resolvedLinks.length > 0
    && unsafeRecordedLinks.length === 0;

  if (canCertify) {
    return {
      ...profile,
      readiness: {
        ...profile.readiness,
        internalLinkReview: {
          status: "verified",
          links: resolvedLinks,
          note: `Mechanically certified against the current indexable Texas Defined knowledge graph. This certification never grants editorial approval or public publication. Stored review note: ${storedReview.note}`,
        },
      },
    };
  }

  // A previously stored "verified" claim is not allowed to outlive route
  // quality. If an indexed destination disappears or a recorded link becomes
  // unsafe, the derived preview is demoted until the link set is repaired.
  if (storedReview.status === "verified") {
    return {
      ...profile,
      readiness: {
        ...profile.readiness,
        internalLinkReview: {
          status: "partial",
          links: resolvedLinks,
          note: `Current route-quality checks could not preserve the stored verified link review. ${unsafeRecordedLinks.length} recorded link(s) failed the current indexability gate. Stored review note: ${storedReview.note}`,
        },
      },
    };
  }

  return profile;
}
