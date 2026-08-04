import type { TexasEntityRecord } from '@/data/knowledge-graph';
import {
  diffEntitySets,
  fingerprintEntities,
  quarantineEntity as sharedQuarantineEntity,
  type PromotionPolicy,
} from '@/shared/platform-core';

export const ENTITY_PROMOTION_POLICY = {
  requireExplicitApproval: true,
  requireRollbackSnapshot: true,
  maximumQuarantinedPercent: 10,
  maximumPendingVerificationPercent: 50,
  maximumChangePercent: 20,
  maximumRemovalPercent: 5,
  allowedSourceConfidence: ['official', 'high'] as const,
  requireOfficialUrl: false,
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
  diff: ReturnType<typeof diffEntitySets>;
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
  const sharedPolicy: PromotionPolicy = {
    maximumChangePercent: ENTITY_PROMOTION_POLICY.maximumChangePercent,
    maximumRemovalPercent: ENTITY_PROMOTION_POLICY.maximumRemovalPercent,
    allowedSourceConfidence: [...ENTITY_PROMOTION_POLICY.allowedSourceConfidence],
    requireOfficialUrl: ENTITY_PROMOTION_POLICY.requireOfficialUrl,
  };
  const quarantine = proposed
    .map((entity) => ({ entityId: entity.id, reasons: quarantineReasons(entity, sharedPolicy) }))
    .filter((item) => item.reasons.length > 0);
  const quarantinedIds = new Set(quarantine.map((item) => item.entityId));
  const promotable = proposed.filter((entity) => !quarantinedIds.has(entity.id));
  const diff = diffEntitySets(current, promotable);
  const quarantinedPercent = percent(quarantine.length, proposed.length);
  const pendingPercent = percent(proposed.filter((entity) => entity.status === 'pending-source-verification').length, proposed.length);
  const blockers: string[] = [];
  const warnings: string[] = [];

  if (diff.changePercent > sharedPolicy.maximumChangePercent) {
    blockers.push(`Change rate ${diff.changePercent}% exceeds ${sharedPolicy.maximumChangePercent}%.`);
  }
  if (diff.removalPercent > sharedPolicy.maximumRemovalPercent) {
    blockers.push(`Removal rate ${diff.removalPercent}% exceeds ${sharedPolicy.maximumRemovalPercent}%.`);
  }
  if (quarantinedPercent > ENTITY_PROMOTION_POLICY.maximumQuarantinedPercent) {
    blockers.push(`Quarantine rate ${quarantinedPercent}% exceeds ${ENTITY_PROMOTION_POLICY.maximumQuarantinedPercent}%.`);
  } else if (quarantine.length) {
    warnings.push(`${quarantine.length} proposed records will remain quarantined.`);
  }
  if (pendingPercent > ENTITY_PROMOTION_POLICY.maximumPendingVerificationPercent) {
    blockers.push(`Pending-verification rate ${pendingPercent}% exceeds ${ENTITY_PROMOTION_POLICY.maximumPendingVerificationPercent}%.`);
  }
  if (!promotable.length && proposed.length) blockers.push('No proposed records remain after quarantine.');
  if (!proposed.length && current.length) blockers.push('Proposed import is empty.');

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
  return proposed.filter((entity) => !quarantined.has(entity.id)).map((entity) => structuredClone(entity));
}

export function validatePromotionApproval(manifest: EntityPromotionManifest, approvalToken?: string) {
  const errors: string[] = [];
  if (!manifest.safeToPromote) errors.push(...manifest.blockers);
  if (ENTITY_PROMOTION_POLICY.requireExplicitApproval && approvalToken !== manifest.id) {
    errors.push('Explicit approval token does not match the promotion manifest ID.');
  }
  return { valid: errors.length === 0, errors };
}

export { fingerprintEntities };

function quarantineReasons(entity: TexasEntityRecord, policy: PromotionPolicy) {
  const reasons = sharedQuarantineEntity(entity, policy);
  if (entity.status === 'retired' || entity.status === 'temporarily-closed') reasons.push(`non-promotable-status:${entity.status}`);
  if (entity.coordinates && (
    !Number.isFinite(entity.coordinates.latitude)
    || !Number.isFinite(entity.coordinates.longitude)
    || entity.coordinates.latitude < -90
    || entity.coordinates.latitude > 90
    || entity.coordinates.longitude < -180
    || entity.coordinates.longitude > 180
  )) reasons.push('invalid-coordinates');
  return [...new Set(reasons)];
}

function percent(value: number, total: number) {
  return total ? Math.round((value / total) * 1000) / 10 : 0;
}
