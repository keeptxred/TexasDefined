import type { TexasEntityRecord } from '@/data/knowledge-graph';
import { INTERNAL_LINK_SURFACES, internalLinkCoverageSummary } from '@/platform/internal-link-coverage';

export const INTERNAL_LINK_QUALITY_THRESHOLDS = {
  minimumCoveragePercent: 100,
  maximumAmbiguousAliasPercent: 5,
  maximumOrphanEntityPercent: 35,
  maximumUnverifiedEntityPercent: 60,
} as const;

export type InternalLinkQualityReport = {
  healthy: boolean;
  coveragePercent: number;
  ambiguousAliases: number;
  ambiguousAliasPercent: number;
  orphanEntities: number;
  orphanEntityPercent: number;
  unverifiedEntities: number;
  unverifiedEntityPercent: number;
  activeSurfaces: number;
  eligibleSurfaces: number;
  issues: string[];
};

export function auditInternalLinkQuality(graph: TexasEntityRecord[]): InternalLinkQualityReport {
  const coverage = internalLinkCoverageSummary();
  const aliasOwners = new Map<string, Set<string>>();
  for (const entity of graph) {
    for (const raw of [entity.name, ...entity.aliases]) {
      const alias = normalize(raw);
      if (alias.length < 4) continue;
      const owners = aliasOwners.get(alias) ?? new Set<string>();
      owners.add(entity.id);
      aliasOwners.set(alias, owners);
    }
  }

  const ambiguousAliases = [...aliasOwners.values()].filter((owners) => owners.size > 1).length;
  const totalAliases = Math.max(1, aliasOwners.size);
  const ids = new Set(graph.map((entity) => entity.id));
  const incoming = new Set(graph.flatMap((entity) => entity.relationships.map((relationship) => relationship.targetId)).filter((id) => ids.has(id)));
  const orphanEntities = graph.filter((entity) => entity.relationships.length === 0 && !incoming.has(entity.id)).length;
  const unverifiedEntities = graph.filter((entity) => entity.status === 'pending-source-verification' || entity.sourceConfidence === 'low').length;

  const ambiguousAliasPercent = percent(ambiguousAliases, totalAliases);
  const orphanEntityPercent = percent(orphanEntities, graph.length);
  const unverifiedEntityPercent = percent(unverifiedEntities, graph.length);
  const issues: string[] = [];

  if (coverage.coveragePercent < INTERNAL_LINK_QUALITY_THRESHOLDS.minimumCoveragePercent) issues.push(`Eligible route coverage is ${coverage.coveragePercent}%; minimum is ${INTERNAL_LINK_QUALITY_THRESHOLDS.minimumCoveragePercent}%.`);
  if (ambiguousAliasPercent > INTERNAL_LINK_QUALITY_THRESHOLDS.maximumAmbiguousAliasPercent) issues.push(`Ambiguous aliases are ${ambiguousAliasPercent}%; maximum is ${INTERNAL_LINK_QUALITY_THRESHOLDS.maximumAmbiguousAliasPercent}%.`);
  if (orphanEntityPercent > INTERNAL_LINK_QUALITY_THRESHOLDS.maximumOrphanEntityPercent) issues.push(`Orphan entities are ${orphanEntityPercent}%; maximum is ${INTERNAL_LINK_QUALITY_THRESHOLDS.maximumOrphanEntityPercent}%.`);
  if (unverifiedEntityPercent > INTERNAL_LINK_QUALITY_THRESHOLDS.maximumUnverifiedEntityPercent) issues.push(`Unverified entities are ${unverifiedEntityPercent}%; maximum is ${INTERNAL_LINK_QUALITY_THRESHOLDS.maximumUnverifiedEntityPercent}%.`);

  return {
    healthy: issues.length === 0,
    coveragePercent: coverage.coveragePercent,
    ambiguousAliases,
    ambiguousAliasPercent,
    orphanEntities,
    orphanEntityPercent,
    unverifiedEntities,
    unverifiedEntityPercent,
    activeSurfaces: coverage.activeSurfaces,
    eligibleSurfaces: coverage.eligibleSurfaces,
    issues,
  };
}

export function internalLinkSurfaceStatus() {
  return INTERNAL_LINK_SURFACES.map((surface) => ({
    id: surface.id,
    routePattern: surface.routePattern,
    status: surface.status,
    pageBudget: surface.pageBudget,
  }));
}

function normalize(value: string) { return value.trim().toLowerCase().replace(/\s+/g, ' '); }
function percent(value: number, total: number) { return Number(((value / Math.max(1, total)) * 100).toFixed(1)); }
