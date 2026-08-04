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

export const INTERNAL_LINK_POLICIES: Record<InternalLinkSurfacePolicy['id'], InternalLinkSurfacePolicy> = {
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

export function validateInternalLinkPolicies() {
  const issues: string[] = [];
  for (const policy of Object.values(INTERNAL_LINK_POLICIES)) {
    if (policy.pageBudget < 1 || policy.pageBudget > 25) issues.push(`${policy.id}: page budget must be between 1 and 25.`);
    if (policy.blockBudget < 1 || policy.blockBudget > policy.pageBudget) issues.push(`${policy.id}: block budget must be between 1 and the page budget.`);
    if (policy.minimumScore < 6 || policy.minimumScore > 20) issues.push(`${policy.id}: minimum score is outside the governed range.`);
    if (policy.ambiguityMargin < 2 || policy.ambiguityMargin > 8) issues.push(`${policy.id}: ambiguity margin is outside the governed range.`);
    if (!policy.preferredKinds.length) issues.push(`${policy.id}: at least one preferred entity kind is required.`);
    const overlap = policy.preferredKinds.filter((kind) => policy.excludedKinds.includes(kind));
    if (overlap.length) issues.push(`${policy.id}: preferred and excluded kinds overlap: ${overlap.join(', ')}.`);
    if (new Set(policy.preferredKinds).size !== policy.preferredKinds.length) issues.push(`${policy.id}: preferred kinds contain duplicates.`);
    if (new Set(policy.excludedKinds).size !== policy.excludedKinds.length) issues.push(`${policy.id}: excluded kinds contain duplicates.`);
  }
  return { valid: issues.length === 0, issues, policies: Object.values(INTERNAL_LINK_POLICIES) };
}
