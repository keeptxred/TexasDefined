import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { resolveTexasTalentEntityLinksFromGraph } from "@/data/texas-talent-links.server";
import { resolveTexasTalentRelatedProfilesFromGraph } from "@/data/texas-talent-related.server";
import { loadTexasTalentProfilesServer } from "@/data/texas-talent.server";

export type TexasTalentExperienceStatus = "experience-linked" | "context-only" | "unlinked";

export type TexasTalentNetworkAuditRow = {
  slug: string;
  name: string;
  category: string;
  relatedCount: number;
  relatedWithSharedContext: number;
  categoryOnlyFallback: boolean;
  sharedDestinationCount: number;
  safeInternalLinkCount: number;
  experienceLinkCount: number;
  experienceStatus: TexasTalentExperienceStatus;
};

export async function loadTexasTalentNetworkCoverageAuditServer() {
  const profiles = loadTexasTalentProfilesServer();
  const graph = await loadTexasKnowledgeGraph();

  const rows: TexasTalentNetworkAuditRow[] = profiles.map((profile) => {
    const related = resolveTexasTalentRelatedProfilesFromGraph(profile, profiles, graph, 6);
    const sharedContextRelated = related.filter((candidate) => candidate.sharedDestinations.length > 0);
    const sharedDestinationPaths = new Set(
      sharedContextRelated.flatMap((candidate) => candidate.sharedDestinations.map((destination) => destination.href)),
    );
    const safeInternalLinks = resolveTexasTalentEntityLinksFromGraph(profile, graph);
    const experienceLinks = safeInternalLinks.filter(
      (link) => link.kind === "city" || link.kind === "destination",
    );
    const experienceStatus: TexasTalentExperienceStatus = experienceLinks.length > 0
      ? "experience-linked"
      : safeInternalLinks.length > 0
        ? "context-only"
        : "unlinked";

    return {
      slug: profile.slug,
      name: profile.name,
      category: profile.category,
      relatedCount: related.length,
      relatedWithSharedContext: sharedContextRelated.length,
      categoryOnlyFallback: related.length > 0 && sharedContextRelated.length === 0,
      sharedDestinationCount: sharedDestinationPaths.size,
      safeInternalLinkCount: safeInternalLinks.length,
      experienceLinkCount: experienceLinks.length,
      experienceStatus,
    };
  });

  const relationshipBacklog = rows
    .filter((row) => row.relatedCount === 0 || row.relatedWithSharedContext === 0)
    .sort((a, b) => a.relatedWithSharedContext - b.relatedWithSharedContext || a.relatedCount - b.relatedCount || a.name.localeCompare(b.name));
  const experienceBacklog = rows
    .filter((row) => row.experienceStatus !== "experience-linked")
    .sort((a, b) => a.experienceLinkCount - b.experienceLinkCount || a.safeInternalLinkCount - b.safeInternalLinkCount || a.name.localeCompare(b.name));

  return {
    totalProfiles: rows.length,
    profilesWithRelatedProfiles: rows.filter((row) => row.relatedCount > 0).length,
    profilesWithSharedContextRelationships: rows.filter((row) => row.relatedWithSharedContext > 0).length,
    categoryOnlyFallbackProfiles: rows.filter((row) => row.categoryOnlyFallback).length,
    profilesWithoutRelatedProfiles: rows.filter((row) => row.relatedCount === 0).length,
    profilesWithExperienceLinks: rows.filter((row) => row.experienceStatus === "experience-linked").length,
    contextOnlyExperienceProfiles: rows.filter((row) => row.experienceStatus === "context-only").length,
    profilesWithoutSafeInternalLinks: rows.filter((row) => row.experienceStatus === "unlinked").length,
    relationshipBacklog,
    experienceBacklog,
    rows,
  };
}
