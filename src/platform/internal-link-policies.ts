import type { TexasEntityKind } from '@/data/knowledge-graph';
import type { InternalLinkPolicy, InternalLinkTopic } from '@/platform/internal-linking';

export type InternalLinkSurfacePolicy = {
  id: 'article' | 'destination' | 'property-tax-guide' | 'entity-page';
  topic: InternalLinkTopic;
  pageBudget: number;
  blockBudget: number;
  minimumScore: number;
  ambiguityMargin: number;
  preferredKinds: TexasEntityKind[];
  excludedKinds: TexasEntityKind[];
};

export const INTERNAL_LINK_POLICY_VERSION = '2.1.0';
export const INTERNAL_LINK_POLICY_REVIEWED_AT = '2026-08-14';

export const INTERNAL_LINK_POLICIES: Record<InternalLinkSurfacePolicy['id'], InternalLinkSurfacePolicy> = {
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

export type InternalLinkPolicyValidation = {
  valid: boolean;
  errors: string[];
  fingerprint: string;
  version: string;
  reviewedAt: string;
};

export function policyForSurface(id: InternalLinkSurfacePolicy['id'], overrides: Partial<InternalLinkPolicy> = {}): Partial<InternalLinkPolicy> {
  const policy = INTERNAL_LINK_POLICIES[id];
  return {
    topic: policy.topic,
    minimumScore: policy.minimumScore,
    ambiguityMargin: policy.ambiguityMargin,
    preferredKinds: [...policy.preferredKinds],
    excludedKinds: [...policy.excludedKinds],
    ...overrides,
  };
}

export function validateInternalLinkPolicies(): InternalLinkPolicyValidation {
  const errors: string[] = [];
  for (const policy of Object.values(INTERNAL_LINK_POLICIES)) {
    if (policy.pageBudget < 1 || policy.pageBudget > 25) errors.push(`${policy.id}: page budget must be between 1 and 25.`);
    if (policy.blockBudget < 1 || policy.blockBudget > policy.pageBudget) errors.push(`${policy.id}: block budget must be between 1 and the page budget.`);
    if (policy.minimumScore < 1 || policy.minimumScore > 30) errors.push(`${policy.id}: minimum score must be between 1 and 30.`);
    if (policy.ambiguityMargin < 1 || policy.ambiguityMargin > 10) errors.push(`${policy.id}: ambiguity margin must be between 1 and 10.`);
    if (!policy.preferredKinds.length) errors.push(`${policy.id}: at least one preferred entity kind is required.`);
    const preferred = new Set(policy.preferredKinds);
    const excluded = new Set(policy.excludedKinds);
    if (preferred.size !== policy.preferredKinds.length) errors.push(`${policy.id}: preferred entity kinds contain duplicates.`);
    if (excluded.size !== policy.excludedKinds.length) errors.push(`${policy.id}: excluded entity kinds contain duplicates.`);
    for (const kind of preferred) if (excluded.has(kind)) errors.push(`${policy.id}: ${kind} cannot be both preferred and excluded.`);
  }
  if (!/^\d+\.\d+\.\d+$/.test(INTERNAL_LINK_POLICY_VERSION)) errors.push('Policy version must use semantic versioning.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(INTERNAL_LINK_POLICY_REVIEWED_AT)) errors.push('Policy review date must use YYYY-MM-DD format.');
  return {
    valid: errors.length === 0,
    errors,
    fingerprint: internalLinkPolicyFingerprint(),
    version: INTERNAL_LINK_POLICY_VERSION,
    reviewedAt: INTERNAL_LINK_POLICY_REVIEWED_AT,
  };
}

export function internalLinkPolicyFingerprint(): string {
  const canonical = JSON.stringify(Object.fromEntries(Object.entries(INTERNAL_LINK_POLICIES).sort(([a], [b]) => a.localeCompare(b))));
  let hash = 2166136261;
  for (let index = 0; index < canonical.length; index += 1) {
    hash ^= canonical.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `fnv1a-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}
