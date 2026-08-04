import type { TexasEntityKind, TexasEntityRecord } from '@/data/knowledge-graph';

export const GRAPH_BEHAVIOR_THRESHOLDS = {
  maximumOrphanPercent: 35,
  maximumBrokenRelationshipPercent: 2,
  maximumLargestComponentSharePercent: 95,
  minimumAverageRelationships: 0.5,
  minimumAverageCompleteness: 45,
  minimumBenchmarkPassPercent: 80,
} as const;

export type GraphSimulation = {
  entityCount: number;
  relationshipCount: number;
  averageRelationships: number;
  orphanCount: number;
  orphanPercent: number;
  deadEndCount: number;
  brokenRelationshipCount: number;
  brokenRelationshipPercent: number;
  connectedComponents: number;
  largestComponentSize: number;
  largestComponentSharePercent: number;
  averageReachableWithinThreeHops: number;
  highlyConcentratedHubs: Array<{ entityId: string; degree: number }>;
};

export type EntityAuthority = {
  entityId: string;
  score: number;
  reasons: string[];
};

export type EntityCompleteness = {
  entityId: string;
  score: number;
  present: string[];
  missing: string[];
};

export type CanonicalPath = {
  entityId: string;
  path: string[];
  complete: boolean;
};

export type RetrievalBenchmarkCase = {
  id: string;
  query: string;
  expectedEntityIds: string[];
  kinds?: TexasEntityKind[];
};

export const AI_RETRIEVAL_BENCHMARK: RetrievalBenchmarkCase[] = [
  { id: 'caddo-lake', query: 'Caddo Lake', expectedEntityIds: ['lake:caddo-lake'] },
  { id: 'austin-parks', query: 'state parks near Austin', expectedEntityIds: ['city:austin'], kinds: ['state-park', 'city'] },
  { id: 'travis-property-tax', query: 'property taxes in Travis County', expectedEntityIds: ['county:travis'], kinds: ['county', 'appraisal-district', 'tax-office'] },
  { id: 'texas-caverns', query: 'best caverns in Texas', expectedEntityIds: [], kinds: ['cavern'] },
];

export function simulateKnowledgeGraph(entities: TexasEntityRecord[]): GraphSimulation {
  const byId = new Map(entities.map((entity) => [entity.id, entity]));
  const undirected = new Map<string, Set<string>>(entities.map((entity) => [entity.id, new Set()]));
  let relationships = 0;
  let broken = 0;
  for (const entity of entities) {
    for (const relationship of entity.relationships) {
      relationships += 1;
      if (!byId.has(relationship.targetId)) { broken += 1; continue; }
      undirected.get(entity.id)?.add(relationship.targetId);
      undirected.get(relationship.targetId)?.add(entity.id);
    }
  }
  const degrees = entities.map((entity) => ({ entityId: entity.id, degree: undirected.get(entity.id)?.size ?? 0 }));
  const orphanCount = degrees.filter((item) => item.degree === 0).length;
  const deadEndCount = degrees.filter((item) => item.degree === 1).length;
  const components = connectedComponents(undirected);
  const largestComponentSize = Math.max(0, ...components.map((component) => component.length));
  const reachableSamples = entities.slice(0, 250).map((entity) => reachableWithin(undirected, entity.id, 3));
  const averageReachableWithinThreeHops = reachableSamples.length ? round(reachableSamples.reduce((sum, count) => sum + count, 0) / reachableSamples.length) : 0;
  const concentrationLimit = Math.max(10, Math.ceil(entities.length * 0.02));
  return {
    entityCount: entities.length,
    relationshipCount: relationships,
    averageRelationships: entities.length ? round(relationships / entities.length) : 0,
    orphanCount,
    orphanPercent: percent(orphanCount, entities.length),
    deadEndCount,
    brokenRelationshipCount: broken,
    brokenRelationshipPercent: percent(broken, relationships),
    connectedComponents: components.length,
    largestComponentSize,
    largestComponentSharePercent: percent(largestComponentSize, entities.length),
    averageReachableWithinThreeHops,
    highlyConcentratedHubs: degrees.filter((item) => item.degree >= concentrationLimit).sort((a, b) => b.degree - a.degree).slice(0, 25),
  };
}

export function scoreEntityAuthority(entities: TexasEntityRecord[]): EntityAuthority[] {
  const incoming = new Map<string, number>();
  for (const entity of entities) for (const relationship of entity.relationships) incoming.set(relationship.targetId, (incoming.get(relationship.targetId) ?? 0) + 1);
  return entities.map((entity) => {
    let score = 0;
    const reasons: string[] = [];
    const sourcePoints = { official: 35, high: 25, medium: 15, low: 5 }[entity.sourceConfidence];
    score += sourcePoints; reasons.push(`source:${sourcePoints}`);
    if (entity.officialUrl) { score += 15; reasons.push('official-url:15'); }
    if (entity.sourceCheckedAt) { score += 10; reasons.push('verified:10'); }
    if (entity.status === 'active' || entity.status === 'seasonal') { score += 10; reasons.push('active:10'); }
    const relationshipPoints = Math.min(15, entity.relationships.length * 2); score += relationshipPoints; reasons.push(`outgoing:${relationshipPoints}`);
    const incomingPoints = Math.min(15, (incoming.get(entity.id) ?? 0) * 2); score += incomingPoints; reasons.push(`incoming:${incomingPoints}`);
    return { entityId: entity.id, score: Math.min(100, score), reasons };
  }).sort((a, b) => b.score - a.score || a.entityId.localeCompare(b.entityId));
}

export function scoreEntityCompleteness(entity: TexasEntityRecord): EntityCompleteness {
  const checks: Array<[string, boolean, number]> = [
    ['name', Boolean(entity.name), 10], ['slug', Boolean(entity.slug), 10], ['description', Boolean(entity.description), 10],
    ['officialUrl', Boolean(entity.officialUrl), 12], ['sourceCheckedAt', Boolean(entity.sourceCheckedAt), 10],
    ['relationships', entity.relationships.length > 0, 12], ['aliases', entity.aliases.length > 0, 6],
    ['tags', Boolean(entity.tags?.length), 5], ['coordinates', Boolean(entity.coordinates), 10],
    ['countyOrRegion', Boolean(entity.countySlug || entity.region), 10], ['reviewDueAt', Boolean(entity.reviewDueAt), 5],
  ];
  const present = checks.filter(([, ok]) => ok).map(([name]) => name);
  const missing = checks.filter(([, ok]) => !ok).map(([name]) => name);
  return { entityId: entity.id, score: checks.reduce((sum, [, ok, weight]) => sum + (ok ? weight : 0), 0), present, missing };
}

export function scoreGraphCompleteness(entities: TexasEntityRecord[]) {
  const entitiesWithScores = entities.map(scoreEntityCompleteness).sort((a, b) => a.score - b.score || a.entityId.localeCompare(b.entityId));
  return {
    averageScore: entitiesWithScores.length ? round(entitiesWithScores.reduce((sum, item) => sum + item.score, 0) / entitiesWithScores.length) : 0,
    weakest: entitiesWithScores.slice(0, 100),
    entities: entitiesWithScores,
  };
}

export function canonicalPathForEntity(entity: TexasEntityRecord, entities: TexasEntityRecord[]): CanonicalPath {
  const byId = new Map(entities.map((item) => [item.id, item]));
  const path = ['texas'];
  const regionId = entity.region ? `region:${entity.region}` : undefined;
  const countyId = entity.countySlug ? `county:${entity.countySlug}` : undefined;
  if (regionId && byId.has(regionId)) path.push(regionId);
  if (countyId && byId.has(countyId)) path.push(countyId);
  if ((entity.kind === 'city' || entity.kind === 'census-place') && entity.id !== countyId) path.push(entity.id);
  else if (entity.id !== regionId && entity.id !== countyId) path.push(entity.id);
  return { entityId: entity.id, path, complete: path[path.length - 1] === entity.id && path.length >= 2 };
}

export function canonicalPathsForGraph(entities: TexasEntityRecord[]) {
  return entities.map((entity) => canonicalPathForEntity(entity, entities));
}

export function runAiRetrievalBenchmark(entities: TexasEntityRecord[]) {
  const results = AI_RETRIEVAL_BENCHMARK.map((test) => {
    const ranked = rankForQuery(entities, test.query, test.kinds).slice(0, 10);
    const actualIds = ranked.map((entity) => entity.id);
    const passed = test.expectedEntityIds.length
      ? test.expectedEntityIds.every((id) => actualIds.includes(id))
      : ranked.some((entity) => !test.kinds?.length || test.kinds.includes(entity.kind));
    return { ...test, actualIds, passed };
  });
  const passed = results.filter((result) => result.passed).length;
  return { total: results.length, passed, failed: results.length - passed, passPercent: percent(passed, results.length), results };
}

export function auditKnowledgeGraphBehavior(entities: TexasEntityRecord[]) {
  const simulation = simulateKnowledgeGraph(entities);
  const completeness = scoreGraphCompleteness(entities);
  const benchmark = runAiRetrievalBenchmark(entities);
  const canonicalPaths = canonicalPathsForGraph(entities);
  const missingCanonicalPaths = canonicalPaths.filter((item) => !item.complete).length;
  const issues: string[] = [];
  if (simulation.orphanPercent > GRAPH_BEHAVIOR_THRESHOLDS.maximumOrphanPercent) issues.push(`Orphan rate ${simulation.orphanPercent}% exceeds ${GRAPH_BEHAVIOR_THRESHOLDS.maximumOrphanPercent}%.`);
  if (simulation.brokenRelationshipPercent > GRAPH_BEHAVIOR_THRESHOLDS.maximumBrokenRelationshipPercent) issues.push(`Broken relationship rate ${simulation.brokenRelationshipPercent}% exceeds ${GRAPH_BEHAVIOR_THRESHOLDS.maximumBrokenRelationshipPercent}%.`);
  if (simulation.averageRelationships < GRAPH_BEHAVIOR_THRESHOLDS.minimumAverageRelationships) issues.push(`Average relationships ${simulation.averageRelationships} is below ${GRAPH_BEHAVIOR_THRESHOLDS.minimumAverageRelationships}.`);
  if (completeness.averageScore < GRAPH_BEHAVIOR_THRESHOLDS.minimumAverageCompleteness) issues.push(`Average completeness ${completeness.averageScore} is below ${GRAPH_BEHAVIOR_THRESHOLDS.minimumAverageCompleteness}.`);
  if (benchmark.passPercent < GRAPH_BEHAVIOR_THRESHOLDS.minimumBenchmarkPassPercent) issues.push(`AI retrieval benchmark ${benchmark.passPercent}% is below ${GRAPH_BEHAVIOR_THRESHOLDS.minimumBenchmarkPassPercent}%.`);
  return { healthy: issues.length === 0, issues, simulation, completeness, benchmark, missingCanonicalPaths, canonicalPaths, authority: scoreEntityAuthority(entities) };
}

function rankForQuery(entities: TexasEntityRecord[], query: string, kinds?: TexasEntityKind[]) {
  const normalized = query.toLowerCase();
  const tokens = normalized.split(/\W+/).filter((token) => token.length > 2);
  return entities.map((entity) => {
    const haystack = [entity.name, entity.slug, ...entity.aliases, entity.kind, entity.countySlug, entity.region, ...(entity.tags ?? [])].filter(Boolean).join(' ').toLowerCase();
    let score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 2 : 0), 0);
    if (normalized.includes(entity.name.toLowerCase())) score += 10;
    if (kinds?.includes(entity.kind)) score += 5;
    if (entity.sourceConfidence === 'official') score += 2;
    return { entity, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.entity.name.localeCompare(b.entity.name)).map((item) => item.entity);
}

function connectedComponents(graph: Map<string, Set<string>>) {
  const visited = new Set<string>();
  const components: string[][] = [];
  for (const id of graph.keys()) {
    if (visited.has(id)) continue;
    const component: string[] = [];
    const stack = [id];
    visited.add(id);
    while (stack.length) {
      const current = stack.pop()!;
      component.push(current);
      for (const neighbor of graph.get(current) ?? []) if (!visited.has(neighbor)) { visited.add(neighbor); stack.push(neighbor); }
    }
    components.push(component);
  }
  return components;
}

function reachableWithin(graph: Map<string, Set<string>>, start: string, maxDepth: number) {
  const visited = new Set([start]);
  let frontier = [start];
  for (let depth = 0; depth < maxDepth; depth += 1) {
    const next: string[] = [];
    for (const id of frontier) for (const neighbor of graph.get(id) ?? []) if (!visited.has(neighbor)) { visited.add(neighbor); next.push(neighbor); }
    frontier = next;
    if (!frontier.length) break;
  }
  return Math.max(0, visited.size - 1);
}

function percent(value: number, total: number) { return total ? round((value / total) * 100) : 0; }
function round(value: number) { return Math.round(value * 10) / 10; }
