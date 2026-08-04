import type { TexasEntityRecord } from './types';

export type GraphAuditIssue = { severity: 'error' | 'warning'; code: string; entityId?: string; message: string };

export function auditTexasKnowledgeGraph(graph: TexasEntityRecord[], now = new Date()) {
  const issues: GraphAuditIssue[] = [];
  const ids = new Set(graph.map((entity) => entity.id));
  const aliases = new Map<string, string[]>();
  for (const entity of graph) {
    if (!entity.officialUrl) issues.push({ severity: 'warning', code: 'missing-official-url', entityId: entity.id, message: `${entity.name} has no official URL.` });
    if (!entity.coordinates && !['agency','region','county','appraisal-district','tax-office'].includes(entity.kind)) issues.push({ severity: 'warning', code: 'missing-coordinates', entityId: entity.id, message: `${entity.name} has no coordinates.` });
    if (!entity.relationships.length && !['agency','region'].includes(entity.kind)) issues.push({ severity: 'warning', code: 'missing-relationships', entityId: entity.id, message: `${entity.name} has no graph relationships.` });
    if (entity.reviewDueAt && new Date(entity.reviewDueAt).getTime() < now.getTime()) issues.push({ severity: 'warning', code: 'review-overdue', entityId: entity.id, message: `${entity.name} is overdue for source review.` });
    if (entity.coordinates && (Math.abs(entity.coordinates.latitude) > 90 || Math.abs(entity.coordinates.longitude) > 180)) issues.push({ severity: 'error', code: 'invalid-coordinates', entityId: entity.id, message: `${entity.name} has invalid coordinates.` });
    for (const relationship of entity.relationships) if (!ids.has(relationship.targetId)) issues.push({ severity: 'warning', code: 'unresolved-relationship', entityId: entity.id, message: `${entity.name} points to missing ${relationship.targetId}.` });
    for (const alias of [entity.name, entity.slug, ...entity.aliases]) {
      const key = alias.trim().toLowerCase();
      if (!key) continue;
      aliases.set(key, [...(aliases.get(key) ?? []), entity.id]);
    }
  }
  for (const [alias, entityIds] of aliases) if (new Set(entityIds).size > 1) issues.push({ severity: 'warning', code: 'duplicate-alias', message: `Alias “${alias}” resolves to ${[...new Set(entityIds)].join(', ')}.` });
  return {
    generatedAt: now.toISOString(), total: graph.length,
    errors: issues.filter((issue) => issue.severity === 'error'),
    warnings: issues.filter((issue) => issue.severity === 'warning'),
    missingOfficialUrls: issues.filter((issue) => issue.code === 'missing-official-url').length,
    missingCoordinates: issues.filter((issue) => issue.code === 'missing-coordinates').length,
    missingRelationships: issues.filter((issue) => issue.code === 'missing-relationships').length,
    overdueReviews: issues.filter((issue) => issue.code === 'review-overdue').length,
    duplicateAliases: issues.filter((issue) => issue.code === 'duplicate-alias').length,
    issues,
  };
}
