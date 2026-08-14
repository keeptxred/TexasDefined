import type { InternalLinkSurfacePolicy } from '@/platform/internal-link-policies';
import { INTERNAL_LINK_POLICIES, internalLinkPolicyFingerprint } from '@/platform/internal-link-policies';

export type InternalLinkPolicyRelease = {
  version: string;
  reviewedAt: string;
  changeType: 'major' | 'minor' | 'patch';
  fingerprint: string;
  summary: string;
  changes: string[];
  snapshot: Record<InternalLinkSurfacePolicy['id'], InternalLinkSurfacePolicy>;
};

const POLICY_2_0_0_SNAPSHOT: Record<InternalLinkSurfacePolicy['id'], InternalLinkSurfacePolicy> = {
  article: {
    id: 'article', topic: 'travel', pageBudget: 14, blockBudget: 4, minimumScore: 9, ambiguityMargin: 3,
    preferredKinds: ['state-park','national-park','national-forest','lake','river','beach','cavern','museum','historic-site','attraction','scenic-drive','city','festival','rodeo','fair'],
    excludedKinds: ['utility','tax-office','appraisal-district','county-clerk','dps-office'],
  },
  destination: {
    id: 'destination', topic: 'travel', pageBudget: 12, blockBudget: 4, minimumScore: 9, ambiguityMargin: 3,
    preferredKinds: ['city','county','region','state-park','national-park','lake','river','museum','historic-site','festival','attraction'],
    excludedKinds: ['utility','tax-office','appraisal-district','county-clerk','dps-office'],
  },
  'property-tax-guide': {
    id: 'property-tax-guide', topic: 'property-tax', pageBudget: 12, blockBudget: 2, minimumScore: 9, ambiguityMargin: 3,
    preferredKinds: ['county','city','appraisal-district','tax-office','agency','school-district'],
    excludedKinds: ['utility'],
  },
  'entity-page': {
    id: 'entity-page', topic: 'general', pageBudget: 8, blockBudget: 3, minimumScore: 8, ambiguityMargin: 3,
    preferredKinds: ['city','county','region','state-park','national-park','lake','river','museum','historic-site','festival','attraction'],
    excludedKinds: ['utility'],
  },
};

const POLICY_2_1_0_SNAPSHOT: Record<InternalLinkSurfacePolicy['id'], InternalLinkSurfacePolicy> = {
  article: {
    id: 'article', topic: 'travel', pageBudget: 14, blockBudget: 4, minimumScore: 9, ambiguityMargin: 3,
    preferredKinds: ['state-park','national-park','national-forest','lake','river','beach','cavern','museum','historic-site','attraction','scenic-drive','city','festival','rodeo','fair','sports-venue'],
    excludedKinds: ['utility','tax-office','appraisal-district','county-clerk','dps-office'],
  },
  destination: {
    id: 'destination', topic: 'travel', pageBudget: 12, blockBudget: 4, minimumScore: 9, ambiguityMargin: 3,
    preferredKinds: ['city','county','region','state-park','national-park','lake','river','museum','historic-site','festival','attraction'],
    excludedKinds: ['utility','tax-office','appraisal-district','county-clerk','dps-office'],
  },
  'property-tax-guide': {
    id: 'property-tax-guide', topic: 'property-tax', pageBudget: 12, blockBudget: 2, minimumScore: 9, ambiguityMargin: 3,
    preferredKinds: ['county','city','appraisal-district','tax-office','agency','school-district'],
    excludedKinds: ['utility'],
  },
  'entity-page': {
    id: 'entity-page', topic: 'general', pageBudget: 8, blockBudget: 3, minimumScore: 8, ambiguityMargin: 3,
    preferredKinds: ['city','county','region','state-park','national-park','lake','river','museum','historic-site','festival','attraction'],
    excludedKinds: ['utility'],
  },
};

export const INTERNAL_LINK_POLICY_HISTORY: InternalLinkPolicyRelease[] = [
  {
    version: '2.1.0',
    reviewedAt: '2026-08-14',
    changeType: 'minor',
    fingerprint: 'fnv1a-174e941d',
    summary: 'Expanded contextual editorial authority into verified sports-venue guides.',
    changes: [
      'Added sports-venue as a preferred entity kind for article internal linking.',
      'Kept the existing article page and block link budgets unchanged so venue links remain contextual rather than promotional.',
    ],
    snapshot: POLICY_2_1_0_SNAPSHOT,
  },
  {
    version: '2.0.0',
    reviewedAt: '2026-08-04',
    changeType: 'major',
    fingerprint: 'fnv1a-0b3e620e',
    summary: 'Established the governed Phase 2 internal-link policy system.',
    changes: [
      'Centralized route-family budgets, topics, score thresholds, ambiguity margins, preferred kinds, and exclusions.',
      'Activated governed policies for articles, destinations, property-tax guides, and generated entity pages.',
      'Added policy validation, release metadata, policy APIs, Platform Health reporting, and CI release gates.',
    ],
    snapshot: POLICY_2_0_0_SNAPSHOT,
  },
];

export function currentInternalLinkPolicyRelease(): InternalLinkPolicyRelease | undefined {
  return INTERNAL_LINK_POLICY_HISTORY[0];
}

export function policySnapshotForVersion(version: string) {
  const release = INTERNAL_LINK_POLICY_HISTORY.find((item) => item.version === version);
  return release ? cloneSnapshot(release.snapshot) : undefined;
}

export function rollbackContextForVersion(version: string) {
  const index = INTERNAL_LINK_POLICY_HISTORY.findIndex((item) => item.version === version);
  if (index < 0) return undefined;
  const release = INTERNAL_LINK_POLICY_HISTORY[index];
  const previous = INTERNAL_LINK_POLICY_HISTORY[index + 1];
  return {
    release,
    previous,
    canRollback: Boolean(previous),
    rollbackSnapshot: previous ? cloneSnapshot(previous.snapshot) : undefined,
  };
}

export function validateInternalLinkPolicyHistory() {
  const errors: string[] = [];
  const versions = new Set<string>();
  let previous: [number, number, number] | undefined;

  for (const release of INTERNAL_LINK_POLICY_HISTORY) {
    if (!/^\d+\.\d+\.\d+$/.test(release.version)) errors.push(`${release.version}: release version must use semantic versioning.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(release.reviewedAt)) errors.push(`${release.version}: review date must use YYYY-MM-DD.`);
    if (versions.has(release.version)) errors.push(`${release.version}: duplicate policy release.`);
    versions.add(release.version);
    if (!release.summary.trim()) errors.push(`${release.version}: release summary is required.`);
    if (!release.changes.length) errors.push(`${release.version}: at least one change is required.`);
    if (fingerprintSnapshot(release.snapshot) !== release.fingerprint) errors.push(`${release.version}: stored fingerprint does not match its immutable snapshot.`);

    const parsed = release.version.split('.').map(Number) as [number, number, number];
    if (previous && compareVersions(previous, parsed) <= 0) errors.push(`${release.version}: history must be ordered newest to oldest.`);
    previous = parsed;
  }

  const current = currentInternalLinkPolicyRelease();
  if (current && internalLinkPolicyFingerprint() !== current.fingerprint) {
    errors.push(`Current governed policies differ from release ${current.version}; create a new release instead of mutating history.`);
  }

  return { valid: errors.length === 0, errors, releases: INTERNAL_LINK_POLICY_HISTORY.length };
}

function fingerprintSnapshot(snapshot: Record<InternalLinkSurfacePolicy['id'], InternalLinkSurfacePolicy>) {
  const canonical = JSON.stringify(Object.fromEntries(Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b))));
  let hash = 2166136261;
  for (let index = 0; index < canonical.length; index += 1) {
    hash ^= canonical.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `fnv1a-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

function cloneSnapshot(snapshot: Record<InternalLinkSurfacePolicy['id'], InternalLinkSurfacePolicy>) {
  return Object.fromEntries(Object.entries(snapshot).map(([id, policy]) => [id, {
    ...policy,
    preferredKinds: [...policy.preferredKinds],
    excludedKinds: [...policy.excludedKinds],
  }])) as Record<InternalLinkSurfacePolicy['id'], InternalLinkSurfacePolicy>;
}

function compareVersions(left: [number, number, number], right: [number, number, number]) {
  return left[0] - right[0] || left[1] - right[1] || left[2] - right[2];
}
