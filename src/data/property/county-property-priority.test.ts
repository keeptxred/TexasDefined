import { describe, expect, it } from 'vitest';

import { getCountyPropertyRecordBySlug } from './county-property-data';
import { isCountyPropertyIndexReady } from './county-property-schema';

const priorityCounties = ['bexar', 'travis', 'comal', 'denton', 'bell'] as const;

describe('priority county property-tax verification', () => {
  it('opens the existing indexability gate for every verified priority county', () => {
    for (const slug of priorityCounties) {
      const record = getCountyPropertyRecordBySlug(slug);
      expect(record, slug).not.toBeNull();
      expect(isCountyPropertyIndexReady(record!), slug).toBe(true);
      expect(record!.lastVerifiedAt).toBe('2026-08-21');
    }
  });

  it('uses Bell CAD for Bell County property-tax search and payment', () => {
    const bell = getCountyPropertyRecordBySlug('bell');
    expect(bell?.links.propertySearchUrl).toBe('https://esearch.bellcad.org/');
    expect(bell?.links.paymentUrl).toBe('https://bellcad.org/pay-property-taxes/');
  });
});
