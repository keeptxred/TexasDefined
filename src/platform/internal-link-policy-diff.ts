import type { InternalLinkSurfacePolicy } from '@/platform/internal-link-policies';
import {
  currentInternalLinkPolicyRelease,
  policySnapshotForVersion,
  rollbackContextForVersion,
} from '@/platform/internal-link-policy-history';

export type InternalLinkPolicyFieldChange = {
  surface: string;
  field: keyof InternalLinkSurfacePolicy | 'surface';
  before: unknown;
  after: unknown;
};

export type InternalLinkPolicyRollbackPreview = {
  available: boolean;
  fromVersion?: string;
  toVersion?: string;
  changeCount: number;
  changes: InternalLinkPolicyFieldChange[];
  targetSnapshot?: Record<string, InternalLinkSurfacePolicy>;
};

export function diffInternalLinkPolicySnapshots(
  before: Record<string, InternalLinkSurfacePolicy>,
  after: Record<string, InternalLinkSurfacePolicy>,
): InternalLinkPolicyFieldChange[] {
  const changes: InternalLinkPolicyFieldChange[] = [];
  const surfaceIds = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
  for (const surface of surfaceIds) {
    const left = before[surface];
    const right = after[surface];
    if (!left || !right) {
      changes.push({ surface, field: 'surface', before: left ?? null, after: right ?? null });
      continue;
    }
    for (const field of ['topic','pageBudget','blockBudget','minimumScore','ambiguityMargin','preferredKinds','excludedKinds'] as const) {
      if (JSON.stringify(left[field]) !== JSON.stringify(right[field])) {
        changes.push({ surface, field, before: left[field], after: right[field] });
      }
    }
  }
  return changes;
}

export function previewInternalLinkPolicyRollback(targetVersion?: string): InternalLinkPolicyRollbackPreview {
  const current = currentInternalLinkPolicyRelease();
  if (!current) return { available: false, changeCount: 0, changes: [] };
  const fallback = rollbackContextForVersion(current.version);
  const targetSnapshot = targetVersion
    ? targetVersion === current.version
      ? undefined
      : policySnapshotForVersion(targetVersion)
    : fallback?.rollbackSnapshot;
  const toVersion = targetVersion ?? fallback?.previous?.version;
  if (!targetSnapshot || !toVersion) return { available: false, fromVersion: current.version, changeCount: 0, changes: [] };
  const changes = diffInternalLinkPolicySnapshots(current.snapshot, targetSnapshot);
  return {
    available: true,
    fromVersion: current.version,
    toVersion,
    changeCount: changes.length,
    changes,
    targetSnapshot: structuredClone(targetSnapshot),
  };

}
