import type { TexasEntityRecord } from '@/data/knowledge-graph';
import { canonicalPathsForGraph, simulateKnowledgeGraph } from '@/platform/knowledge-graph-behavior';

export const GRAPH_REGRESSION_THRESHOLDS = {
  minimumDensity: 0.0005,
  maximumNavigationDepth: 8,
  maximumDuplicateIds: 0,
  maximumBrokenRelationships: 25,
  maximumMissingCanonicalPaths: 0,
} as const;

export function auditKnowledgeGraphRegression(entities: TexasEntityRecord[]) {
  const simulation = simulateKnowledgeGraph(entities);
  const possibleDirectedEdges = entities.length > 1 ? entities.length * (entities.length - 1) : 0;
  const graphDensity = possibleDirectedEdges ? round(simulation.relationshipCount / possibleDirectedEdges, 6) : 0;
  const duplicateEntityIds = duplicateIds(entities);
  const maximumNavigationDepth = calculateMaximumNavigationDepth(entities);
  const missingCanonicalPaths = canonicalPathsForGraph(entities).filter((path) => !path.complete).map((path) => path.entityId);
  const issues: string[] = [];
  if (graphDensity < GRAPH_REGRESSION_THRESHOLDS.minimumDensity) issues.push(`Graph density ${graphDensity} is below ${GRAPH_REGRESSION_THRESHOLDS.minimumDensity}.`);
  if (maximumNavigationDepth > GRAPH_REGRESSION_THRESHOLDS.maximumNavigationDepth) issues.push(`Maximum navigation depth ${maximumNavigationDepth} exceeds ${GRAPH_REGRESSION_THRESHOLDS.maximumNavigationDepth}.`);
  if (duplicateEntityIds.length > GRAPH_REGRESSION_THRESHOLDS.maximumDuplicateIds) issues.push(`${duplicateEntityIds.length} duplicate entity IDs found.`);
  if (simulation.brokenRelationshipCount > GRAPH_REGRESSION_THRESHOLDS.maximumBrokenRelationships) issues.push(`${simulation.brokenRelationshipCount} broken relationships exceed ${GRAPH_REGRESSION_THRESHOLDS.maximumBrokenRelationships}.`);
  if (missingCanonicalPaths.length > GRAPH_REGRESSION_THRESHOLDS.maximumMissingCanonicalPaths) issues.push(`${missingCanonicalPaths.length} entities lack canonical paths.`);
  return {
    healthy: issues.length === 0,
    issues,
    graphDensity,
    averageRelationshipCount: simulation.averageRelationships,
    connectedComponents: simulation.connectedComponents,
    orphanCount: simulation.orphanCount,
    maximumNavigationDepth,
    duplicateEntityIds,
    brokenRelationshipCount: simulation.brokenRelationshipCount,
    missingCanonicalPaths,
  };
}

function duplicateIds(entities: TexasEntityRecord[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const entity of entities) {
    if (seen.has(entity.id)) duplicates.add(entity.id);
    seen.add(entity.id);
  }
  return [...duplicates].sort();
}

function calculateMaximumNavigationDepth(entities: TexasEntityRecord[]) {
  const graph = new Map<string, Set<string>>(entities.map((entity) => [entity.id, new Set()]));
  for (const entity of entities) for (const relationship of entity.relationships) {
    if (!graph.has(relationship.targetId)) continue;
    graph.get(entity.id)?.add(relationship.targetId);
    graph.get(relationship.targetId)?.add(entity.id);
  }
  const roots = entities.filter((entity) => entity.kind === 'region' || entity.kind === 'county').map((entity) => entity.id);
  if (!roots.length) return entities.length ? Number.POSITIVE_INFINITY : 0;
  const distance = new Map<string, number>();
  const queue = roots.map((id) => ({ id, depth: 0 }));
  for (const root of roots) distance.set(root, 0);
  while (queue.length) {
    const current = queue.shift()!;
    for (const neighbor of graph.get(current.id) ?? []) {
      if (distance.has(neighbor)) continue;
      distance.set(neighbor, current.depth + 1);
      queue.push({ id: neighbor, depth: current.depth + 1 });
    }
  }
  const finiteDepths = [...distance.values()];
  const unreachable = entities.length - distance.size;
  return unreachable ? GRAPH_REGRESSION_THRESHOLDS.maximumNavigationDepth + 1 : Math.max(0, ...finiteDepths);
}

function round(value: number, places: number) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}
