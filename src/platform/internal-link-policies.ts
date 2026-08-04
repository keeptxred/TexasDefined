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
