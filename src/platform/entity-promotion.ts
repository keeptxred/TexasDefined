import type { TexasEntityRecord } from '@/data/knowledge-graph';
import { diffEntityImports, type ImportDiff } from '@/platform/entity-maintenance';

export const ENTITY_PROMOTION_POLICY = {
  requireExplicitApproval: true,
  requireRollbackSnapshot: true,
  maximumQuarantinedPercent: 10,
  maximumPendingVerificationPercent: 50,
  allowedSourceConfidence: ['official', 'high'] as const,
} as const;

export type EntityPromotionManifest = {
  id: string;
  generatedAt: string;
  currentFingerprint: string;
  proposedFingerprint: string;
  proposedRecords: number;
  promotableRecords: number;
  quarantinedRecords: number;
  quarantinedPercent: number;
  diff: ImportDiff;
  safeToPromote: boolean;
  approvalRequired: boolean;
  blockers: string[];
  warnings: string[];
  quarantine: Array<{ entityId: string; reasons: string[] }>;
};

export function buildEntityPromotionManifest(
  current: TexasEntityRecord[],
  proposed: TexasEntityRecord[],
  generatedAt = new Date().toISOString(),
): EntityPromotionManifest {
  const quarantine = proposed
    .map((entity) => ({ entityId: entity.id, reasons: quarantineReasons(entity) }))
    .filter((item) => item.reasons.length > 0);
  const quarantinedIds = new Set(quarantine.map((item) => item.entityId));
  const promotable = proposed.filter((entity) => !quarantinedIds.has(entity.id));
  const diff = diffEntityImports(current, promotable);
  const quarantinedPercent = percent(quarantine.length, proposed.length);
  const pendingPercent = percent(proposed.filter((entity) => entity.status === 'pending-source-verification').length, proposed.length);
  const blockers = [...diff.blockers];
  const warnings: string[] = [];

  if (quarantinedPercent > ENTITY_PROMOTION_POLICY.maximumQuarantinedPercent) {
    blockers.push(`Quarantine rate ${quarantinedPercent}% exceeds ${ENTITY_PROMOTION_POLICY.maximumQuarantinedPercent}%.`);
  } else if (quarantine.length) {
    warnings.push(`${quarantine.length} proposed records will remain quarantined.`);
  }
  if (pendingPercent > ENTITY_PROMOTION_POLICY.maximumPendingVerificationPercent) {
    blockers.push(`Pending-verification rate ${pendingPercent}% exceeds ${ENTITY_PROMOTION_POLICY.maximumPendingVerificationPercent}%.`);
  }
  if (!promotable.length && proposed.length) blockers.push('No proposed records remain after quarantine.');

  const currentFingerprint = fingerprintEntities(current);
  const proposedFingerprint = fingerprintEntities(promotable);
  const id = `entity-promotion-${generatedAt.slice(0, 10)}-${proposedFingerprint.replace('fnv1a-', '')}`;
  return {
    id,
    generatedAt,
    currentFingerprint,
    proposedFingerprint,
    proposedRecords: proposed.length,
    promotableRecords: promotable.length,
    quarantinedRecords: quarantine.length,
    quarantinedPercent,
    diff,
    safeToPromote: blockers.length === 0,
    approvalRequired: ENTITY_PROMOTION_POLICY.requireExplicitApproval,
    blockers,
    warnings,
    quarantine,
  };
}

export function promotableEntities(proposed: TexasEntityRecord[], manifest: EntityPromotionManifest) {
  const quarantined = new Set(manifest.quarantine.map((item) => item.entityId));
  return proposed.filter((entity) => !quarantined.has(entity.id)).map(cloneEntity);
}

export function validatePromotionApproval(manifest: EntityPromotionManifest, approvalToken?: string) {
  const errors: string[] = [];
  if (!manifest.safeToPromote) errors.push(...manifest.blockers);
  if (ENTITY_PROMOTION_POLICY.requireExplicitApproval && approvalToken !== manifest.id) {
    errors.push('Explicit approval token does not match the promotion manifest ID.');
  }
  return { valid: errors.length === 0, errors };
}

export function fingerprintEntities(entities: TexasEntityRecord[]) {
  const canonical = JSON.stringify(
    entities.map(canonicalEntity).sort((left, right) => left.id.localeCompare(right.id)),
  );
  let hash = 2166136261;
  for (let index = 0; index < canonical.length; index += 1) {
    hash ^= canonical.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `fnv1a-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

function quarantineReasons(entity: TexasEntityRecord) {
  const reasons: string[] = [];
  if (!entity.id || !entity.name || !entity.slug) reasons.push('missing-required-identity');
  if (!entity.sourceId) reasons.push('missing-source-id');
  if (!ENTITY_PROMOTION_POLICY.allowedSourceConfidence.includes(entity.sourceConfidence as 'official' | 'high')) reasons.push('insufficient-source-confidence');
  if (!entity.sourceCheckedAt) reasons.push('missing-source-check');
  if (!entity.reviewDueAt) reasons.push('missing-review-date');
  if (entity.status === 'retired' || entity.status === 'temporarily-closed') reasons.push(`non-promotable-status:${entity.status}`);
  if (entity.coordinates && (!Number.isFinite(entity.coordinates.latitude) || !Number.isFinite(entity.coordinates.longitude))) reasons.push('invalid-coordinates');
  if (entity.officialUrl) {
    try { if (new URL(entity.officialUrl).protocol !== 'https:') reasons.push('official-url-not-https'); }
    catch { reasons.push('invalid-official-url'); }
  }
  return reasons;
}

function canonicalEntity(entity: TexasEntityRecord) {
  return {
    ...entity,
    aliases: [...entity.aliases].sort(),
    relationships: [...entity.relationships].sort((a, b) => `${a.type}:${a.targetId}`.localeCompare(`${b.type}:${b.targetId}`)),
    tags: [...(entity.tags ?? [])].sort(),
  };
}
function cloneEntity(entity: TexasEntityRecord): TexasEntityRecord { return structuredClone(entity); }
function percent(value: number, total: number) { return total ? Math.round((value / total) * 1000) / 10 : 0; }
