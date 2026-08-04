import { canonicalizeEntity, cloneEntity, type TexasEntityRecord } from './entities';
import { fingerprintEntities } from './fingerprint';

export type EntityImportDiff = {
  added: string[];
  changed: string[];
  removed: string[];
  unchanged: string[];
  changePercent: number;
  removalPercent: number;
};

export type PromotionPolicy = {
  maximumChangePercent: number;
  maximumRemovalPercent: number;
  allowedSourceConfidence: Array<TexasEntityRecord['sourceConfidence']>;
  requireOfficialUrl: boolean;
};

export const DEFAULT_PROMOTION_POLICY: PromotionPolicy = {
  maximumChangePercent: 20,
  maximumRemovalPercent: 5,
  allowedSourceConfidence: ['official', 'high'],
  requireOfficialUrl: false,
};

export function diffEntitySets(current: TexasEntityRecord[], proposed: TexasEntityRecord[]): EntityImportDiff {
  const currentById = new Map(current.map((entity) => [entity.id, entity]));
  const proposedById = new Map(proposed.map((entity) => [entity.id, entity]));
  const added: string[] = [];
  const changed: string[] = [];
  const removed: string[] = [];
  const unchanged: string[] = [];

  for (const [id, entity] of proposedById) {
    const existing = currentById.get(id);
    if (!existing) added.push(id);
    else if (JSON.stringify(canonicalizeEntity(existing)) !== JSON.stringify(canonicalizeEntity(entity))) changed.push(id);
    else unchanged.push(id);
  }
  for (const id of currentById.keys()) if (!proposedById.has(id)) removed.push(id);

  const changedTotal = added.length + changed.length + removed.length;
  return {
    added: added.sort(),
    changed: changed.sort(),
    removed: removed.sort(),
    unchanged: unchanged.sort(),
    changePercent: percent(changedTotal, Math.max(1, current.length)),
    removalPercent: percent(removed.length, Math.max(1, current.length)),
  };
}

export function quarantineEntity(entity: TexasEntityRecord, policy: PromotionPolicy = DEFAULT_PROMOTION_POLICY): string[] {
  const reasons: string[] = [];
  if (!entity.id || !entity.name || !entity.slug) reasons.push('missing-required-identity');
  if (!entity.sourceId) reasons.push('missing-source-id');
  if (!policy.allowedSourceConfidence.includes(entity.sourceConfidence)) reasons.push('insufficient-source-confidence');
  if (!entity.sourceCheckedAt) reasons.push('missing-source-check');
  if (!entity.reviewDueAt) reasons.push('missing-review-date');
  if (policy.requireOfficialUrl && !entity.officialUrl) reasons.push('missing-official-url');
  if (entity.officialUrl) {
    try { if (new URL(entity.officialUrl).protocol !== 'https:') reasons.push('official-url-not-https'); }
    catch { reasons.push('invalid-official-url'); }
  }
  return reasons;
}

export function createPromotionPreview(current: TexasEntityRecord[], proposed: TexasEntityRecord[], policy: PromotionPolicy = DEFAULT_PROMOTION_POLICY) {
  const quarantine = proposed.map((entity) => ({ entityId: entity.id, reasons: quarantineEntity(entity, policy) })).filter((item) => item.reasons.length);
  const quarantined = new Set(quarantine.map((item) => item.entityId));
  const promotable = proposed.filter((entity) => !quarantined.has(entity.id)).map(cloneEntity);
  const diff = diffEntitySets(current, promotable);
  const blockers: string[] = [];
  if (diff.changePercent > policy.maximumChangePercent) blockers.push(`change-rate:${diff.changePercent}`);
  if (diff.removalPercent > policy.maximumRemovalPercent) blockers.push(`removal-rate:${diff.removalPercent}`);
  if (!promotable.length && proposed.length) blockers.push('no-promotable-records');
  return {
    currentFingerprint: fingerprintEntities(current),
    proposedFingerprint: fingerprintEntities(promotable),
    diff,
    quarantine,
    promotable,
    safeToPromote: blockers.length === 0,
    blockers,
  };
}

function percent(value: number, total: number) {
  return total ? Math.round((value / total) * 1000) / 10 : 0;
}
