import type { TexasEntityRecord } from '@/data/knowledge-graph';
import { resolveInternalEntityLinks, type InternalLinkTopic } from '@/platform/internal-linking';

export type InternalLinkGoldenCase = {
  id: string;
  description: string;
  text: string;
  topic?: InternalLinkTopic;
  preferredKinds?: TexasEntityRecord['kind'][];
  excludedEntityIds?: string[];
  entityExposureWeights?: Record<string, number>;
  minimumScore?: number;
  ambiguityMargin?: number;
  expectedEntityIds: string[];
  expectedRejectedAmbiguous?: number;
  expectedReason?: string;
};

const entity = (input: Partial<TexasEntityRecord> & Pick<TexasEntityRecord, 'id' | 'kind' | 'name' | 'slug'>): TexasEntityRecord => ({
  aliases: [],
  sourceId: 'phase-two-golden-corpus',
  sourceConfidence: 'official',
  status: 'active',
  relationships: [],
  ...input,
});

export const INTERNAL_LINK_GOLDEN_ENTITIES: TexasEntityRecord[] = [
  entity({ id: 'lake:caddo-lake', kind: 'lake', name: 'Caddo Lake', slug: 'caddo-lake', aliases: ['Caddo'], region: 'piney-woods' }),
  entity({ id: 'county:travis', kind: 'county', name: 'Travis County', slug: 'travis', aliases: ['Travis'] }),
  entity({ id: 'city:travis', kind: 'city', name: 'Travis', slug: 'travis-city', aliases: ['Travis'] }),
  entity({ id: 'county:harris', kind: 'county', name: 'Harris County', slug: 'harris', aliases: ['Harris'] }),
  entity({ id: 'museum:harris', kind: 'museum', name: 'Harris Museum', slug: 'harris-museum', aliases: ['Harris'] }),
  entity({ id: 'city:spring', kind: 'city', name: 'Spring', slug: 'spring', aliases: [] }),
  entity({ id: 'festival:spring', kind: 'festival', name: 'Spring', slug: 'spring-festival', aliases: [] }),
  entity({ id: 'museum:texas-history', kind: 'museum', name: 'Texas History Museum', slug: 'texas-history-museum', aliases: [] }),
];

export const INTERNAL_LINK_GOLDEN_CASES: InternalLinkGoldenCase[] = [
  {
    id: 'canonical-travel-place',
    description: 'Canonical travel place names resolve to the matching governed entity.',
    text: 'Paddling through Caddo Lake at sunrise is one of East Texas’s defining experiences.',
    topic: 'travel',
    expectedEntityIds: ['lake:caddo-lake'],
  },
  {
    id: 'county-context-disambiguation',
    description: 'County and appraisal context resolves a shared alias to the county entity.',
    text: 'Travis appraisal notices are issued before the county protest deadline.',
    topic: 'property-tax',
    preferredKinds: ['county', 'appraisal-district', 'tax-office'],
    minimumScore: 8,
    expectedEntityIds: ['county:travis'],
  },
  {
    id: 'topic-priority',
    description: 'Property-tax policies prefer county entities over travel entities with the same alias.',
    text: 'Harris property owners should verify the appraisal record before filing a protest.',
    topic: 'property-tax',
    preferredKinds: ['county', 'appraisal-district', 'tax-office'],
    minimumScore: 8,
    expectedEntityIds: ['county:harris'],
  },
  {
    id: 'unsafe-ambiguity-rejected',
    description: 'An unresolved equal-score alias is rejected instead of linked.',
    text: 'Spring remains a popular name across Texas.',
    topic: 'general',
    minimumScore: 1,
    ambiguityMargin: 3,
    expectedEntityIds: [],
    expectedRejectedAmbiguous: 1,
  },
  {
    id: 'self-link-prevention',
    description: 'The current entity is excluded from its own generated page content.',
    text: 'Caddo Lake includes bayous, cypress groves, and marked paddling trails.',
    topic: 'travel',
    excludedEntityIds: ['lake:caddo-lake'],
    expectedEntityIds: [],
  },
  {
    id: 'exposure-penalty',
    description: 'Bounded exposure weights reduce an overexposed entity score and record the reason.',
    text: 'The Texas History Museum preserves artifacts and oral histories.',
    topic: 'history',
    entityExposureWeights: { 'museum:texas-history': 4 },
    minimumScore: 1,
    expectedEntityIds: ['museum:texas-history'],
    expectedReason: 'exposure-penalty:4',
  },
];

export function runInternalLinkGoldenCorpus() {
  const cases = INTERNAL_LINK_GOLDEN_CASES.map((testCase) => {
    const result = resolveInternalEntityLinks(testCase.text, INTERNAL_LINK_GOLDEN_ENTITIES, {
      maxLinks: 5,
      topic: testCase.topic ?? 'general',
      preferredKinds: testCase.preferredKinds ?? [],
      excludedEntityIds: testCase.excludedEntityIds ?? [],
      entityExposureWeights: testCase.entityExposureWeights ?? {},
      minimumScore: testCase.minimumScore ?? 8,
      ambiguityMargin: testCase.ambiguityMargin ?? 3,
    });
    const actualEntityIds = result.matches.map((match) => match.entity.id);
    const entityMatch = sameValues(actualEntityIds, testCase.expectedEntityIds);
    const ambiguityMatch = testCase.expectedRejectedAmbiguous === undefined || result.diagnostics.rejectedAmbiguous === testCase.expectedRejectedAmbiguous;
    const reasonMatch = testCase.expectedReason === undefined || result.matches.some((match) => match.reasons.includes(testCase.expectedReason!));
    return {
      id: testCase.id,
      description: testCase.description,
      passed: entityMatch && ambiguityMatch && reasonMatch,
      expectedEntityIds: testCase.expectedEntityIds,
      actualEntityIds,
      expectedRejectedAmbiguous: testCase.expectedRejectedAmbiguous,
      actualRejectedAmbiguous: result.diagnostics.rejectedAmbiguous,
      expectedReason: testCase.expectedReason,
      reasons: result.matches.flatMap((match) => match.reasons),
      diagnostics: result.diagnostics,
    };
  });
  return {
    passed: cases.every((testCase) => testCase.passed),
    total: cases.length,
    passedCount: cases.filter((testCase) => testCase.passed).length,
    failedCount: cases.filter((testCase) => !testCase.passed).length,
    cases,
  };
}

function sameValues(actual: string[], expected: string[]) {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}
