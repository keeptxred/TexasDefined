import type { TexasEntityRecord } from '@/data/knowledge-graph';
import type { AuthoritativeSource } from '@/data/source-governance';

export const ENTITY_MAINTENANCE_THRESHOLDS = {
  sourceDueSoonDays: 14,
  maximumStaleEntityPercent: 25,
  maximumMissingOfficialUrlPercent: 40,
  maximumPromotionChangePercent: 20,
  maximumRemovalPercent: 5,
} as const;

export type SourceMaintenanceState = 'current' | 'due-soon' | 'overdue' | 'invalid-date';
export type SourceMaintenanceRecord = AuthoritativeSource & {
  state: SourceMaintenanceState;
  nextReviewAt?: string;
  daysUntilReview?: number;
};

export type EntityMaintenanceRecord = {
  entityId: string;
  stale: boolean;
  overdueDays: number;
  missingOfficialUrl: boolean;
  missingVerificationDate: boolean;
  reviewDueAt?: string;
  priority: number;
  reasons: string[];
};

export type ImportDiff = {
  added: string[];
  changed: string[];
  removed: string[];
  unchanged: string[];
  changePercent: number;
  removalPercent: number;
  safeToPromote: boolean;
  blockers: string[];
};

export function auditAuthoritativeSourceFreshness(sources: AuthoritativeSource[], now = new Date()): SourceMaintenanceRecord[] {
  const records: SourceMaintenanceRecord[] = sources.map((source) => {
    const lastReviewed = parseDate(source.lastReviewed);
    if (!lastReviewed) return { ...source, state: 'invalid-date' as const };
    const nextReview = new Date(lastReviewed.getTime() + source.reviewEveryDays * 86400000);
    const daysUntilReview = Math.ceil((nextReview.getTime() - now.getTime()) / 86400000);
    const state: SourceMaintenanceState =
      daysUntilReview < 0 ? 'overdue' : daysUntilReview <= ENTITY_MAINTENANCE_THRESHOLDS.sourceDueSoonDays ? 'due-soon' : 'current';
    return { ...source, state, nextReviewAt: nextReview.toISOString(), daysUntilReview };
  });
  return records.sort((a, b) => statePriority(a.state) - statePriority(b.state) || (a.daysUntilReview ?? Number.NEGATIVE_INFINITY) - (b.daysUntilReview ?? Number.NEGATIVE_INFINITY));

}

export function auditEntityMaintenance(entities: TexasEntityRecord[], now = new Date()) {
  const queue: EntityMaintenanceRecord[] = entities.map((entity) => {
    const reviewDue = parseDate(entity.reviewDueAt);
    const missingVerificationDate = !parseDate(entity.sourceCheckedAt);
    const stale = !reviewDue || reviewDue.getTime() < now.getTime();
    const overdueDays = reviewDue ? Math.max(0, Math.floor((now.getTime() - reviewDue.getTime()) / 86400000)) : 9999;
    const missingOfficialUrl = !entity.officialUrl;
    const reasons: string[] = [];
    let priority = 0;
    if (stale) { priority += Math.min(50, 15 + Math.floor(overdueDays / 30)); reasons.push(reviewDue ? `review-overdue:${overdueDays}` : 'missing-review-date'); }
    if (missingVerificationDate) { priority += 20; reasons.push('missing-source-check'); }
    if (missingOfficialUrl) { priority += 15; reasons.push('missing-official-url'); }
    if (entity.status === 'pending-source-verification') { priority += 20; reasons.push('pending-verification'); }
    if (entity.sourceConfidence === 'low') { priority += 20; reasons.push('low-confidence'); }
    return { entityId: entity.id, stale, overdueDays, missingOfficialUrl, missingVerificationDate, reviewDueAt: entity.reviewDueAt, priority, reasons };
  }).sort((a, b) => b.priority - a.priority || b.overdueDays - a.overdueDays || a.entityId.localeCompare(b.entityId));

  const staleCount = queue.filter((item) => item.stale).length;
  const missingOfficialUrlCount = queue.filter((item) => item.missingOfficialUrl).length;
  return {
    queue,
    staleCount,
    stalePercent: percent(staleCount, entities.length),
    missingOfficialUrlCount,
    missingOfficialUrlPercent: percent(missingOfficialUrlCount, entities.length),
    pendingVerificationCount: entities.filter((entity) => entity.status === 'pending-source-verification').length,
  };
}

export function diffEntityImports(current: TexasEntityRecord[], proposed: TexasEntityRecord[]): ImportDiff {
  const currentById = new Map(current.map((entity) => [entity.id, entity]));
  const proposedById = new Map(proposed.map((entity) => [entity.id, entity]));
  const added: string[] = [];
  const changed: string[] = [];
  const removed: string[] = [];
  const unchanged: string[] = [];
  for (const [id, entity] of proposedById) {
    const existing = currentById.get(id);
    if (!existing) added.push(id);
    else if (canonicalEntity(existing) !== canonicalEntity(entity)) changed.push(id);
    else unchanged.push(id);
  }
  for (const id of currentById.keys()) if (!proposedById.has(id)) removed.push(id);
  const changedTotal = added.length + changed.length + removed.length;
  const changePercent = percent(changedTotal, Math.max(1, current.length));
  const removalPercent = percent(removed.length, Math.max(1, current.length));
  const blockers: string[] = [];
  if (changePercent > ENTITY_MAINTENANCE_THRESHOLDS.maximumPromotionChangePercent) blockers.push(`Change rate ${changePercent}% exceeds ${ENTITY_MAINTENANCE_THRESHOLDS.maximumPromotionChangePercent}%.`);
  if (removalPercent > ENTITY_MAINTENANCE_THRESHOLDS.maximumRemovalPercent) blockers.push(`Removal rate ${removalPercent}% exceeds ${ENTITY_MAINTENANCE_THRESHOLDS.maximumRemovalPercent}%.`);
  if (proposed.length === 0 && current.length > 0) blockers.push('Proposed import is empty.');
  return { added: added.sort(), changed: changed.sort(), removed: removed.sort(), unchanged: unchanged.sort(), changePercent, removalPercent, safeToPromote: blockers.length === 0, blockers };
}

export function auditEntityMaintenanceHealth(entities: TexasEntityRecord[], sources: AuthoritativeSource[], now = new Date()) {
  const entityHealth = auditEntityMaintenance(entities, now);
  const sourceHealth = auditAuthoritativeSourceFreshness(sources, now);
  const issues: string[] = [];
  if (entityHealth.stalePercent > ENTITY_MAINTENANCE_THRESHOLDS.maximumStaleEntityPercent) issues.push(`Stale entity rate ${entityHealth.stalePercent}% exceeds ${ENTITY_MAINTENANCE_THRESHOLDS.maximumStaleEntityPercent}%.`);
  if (entityHealth.missingOfficialUrlPercent > ENTITY_MAINTENANCE_THRESHOLDS.maximumMissingOfficialUrlPercent) issues.push(`Missing official URL rate ${entityHealth.missingOfficialUrlPercent}% exceeds ${ENTITY_MAINTENANCE_THRESHOLDS.maximumMissingOfficialUrlPercent}%.`);
  const overdueSources = sourceHealth.filter((source) => source.state === 'overdue' || source.state === 'invalid-date').length;
  if (overdueSources) issues.push(`${overdueSources} authoritative sources require review.`);
  return { healthy: issues.length === 0, issues, entityHealth, sourceHealth, overdueSources };
}

function canonicalEntity(entity: TexasEntityRecord) {
  return JSON.stringify({ ...entity, aliases: [...entity.aliases].sort(), relationships: [...entity.relationships].sort((a, b) => `${a.type}:${a.targetId}`.localeCompare(`${b.type}:${b.targetId}`)), tags: [...(entity.tags ?? [])].sort() });
}
function parseDate(value?: string) { if (!value) return undefined; const date = new Date(value); return Number.isNaN(date.getTime()) ? undefined : date; }
function percent(value: number, total: number) { return total ? Math.round((value / total) * 1000) / 10 : 0; }
function statePriority(state: SourceMaintenanceState) { return { overdue: 0, 'invalid-date': 1, 'due-soon': 2, current: 3 }[state]; }
