import { internalLinkPolicyFingerprint } from '@/platform/internal-link-policies';

export type InternalLinkPolicyRelease = {
  version: string;
  reviewedAt: string;
  changeType: 'major' | 'minor' | 'patch';
  fingerprint: string;
  summary: string;
  changes: string[];
};

export const INTERNAL_LINK_POLICY_HISTORY: InternalLinkPolicyRelease[] = [
  {
    version: '2.0.0',
    reviewedAt: '2026-08-04',
    changeType: 'major',
    fingerprint: internalLinkPolicyFingerprint(),
    summary: 'Established the governed Phase 2 internal-link policy system.',
    changes: [
      'Centralized route-family budgets, topics, score thresholds, ambiguity margins, preferred kinds, and exclusions.',
      'Activated governed policies for articles, destinations, property-tax guides, and generated entity pages.',
      'Added policy validation, release metadata, policy APIs, Platform Health reporting, and CI release gates.',
    ],
  },
];

export function currentInternalLinkPolicyRelease(): InternalLinkPolicyRelease | undefined {
  return INTERNAL_LINK_POLICY_HISTORY[0];
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

    const parsed = release.version.split('.').map(Number) as [number, number, number];
    if (previous && compareVersions(previous, parsed) <= 0) errors.push(`${release.version}: history must be ordered newest to oldest.`);
    previous = parsed;
  }

  return { valid: errors.length === 0, errors, releases: INTERNAL_LINK_POLICY_HISTORY.length };
}

function compareVersions(left: [number, number, number], right: [number, number, number]) {
  return left[0] - right[0] || left[1] - right[1] || left[2] - right[2];
}
