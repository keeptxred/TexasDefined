import { describe, expect, it } from 'vitest';

import { getCountyPropertyRecordBySlug } from './county-property-data';
import { isCountyPropertyIndexReady } from './county-property-schema';

const verifiedCounties = {
  bexar: '2026-08-21',
  travis: '2026-08-21',
  comal: '2026-08-21',
  denton: '2026-08-21',
  bell: '2026-08-21',
  polk: '2026-08-25',
  mason: '2026-08-25',
  haskell: '2026-08-25',
} as const;

describe('priority county property-tax verification', () => {
  it('opens the existing indexability gate for every verified priority county', () => {
    for (const [slug, expectedVerificationDate] of Object.entries(verifiedCounties)) {
      const record = getCountyPropertyRecordBySlug(slug);
      expect(record, slug).not.toBeNull();
      expect(isCountyPropertyIndexReady(record!), slug).toBe(true);
      expect(record!.lastVerifiedAt, slug).toBe(expectedVerificationDate);
    }
  });

  it('uses Bell CAD for Bell County property-tax search and payment', () => {
    const bell = getCountyPropertyRecordBySlug('bell');
    expect(bell?.links.propertySearchUrl).toBe('https://esearch.bellcad.org/');
    expect(bell?.links.paymentUrl).toBe('https://bellcad.org/pay-property-taxes/');
  });

  it('keeps the three locally re-verified counties behind authoritative local sources', () => {
    const polk = getCountyPropertyRecordBySlug('polk');
    expect(polk?.links.appraisalDistrictUrl).toBe('https://polkcad.org');
    expect(polk?.links.propertySearchUrl).toBe('https://esearch.polkcad.org/');
    expect(polk?.links.taxOfficeUrl).toContain('polk.County.Assessor.Collector');

    const mason = getCountyPropertyRecordBySlug('mason');
    expect(mason?.links.appraisalDistrictUrl).toBe('https://masoncad.org');
    expect(mason?.links.propertySearchUrl).toBe('https://esearch.masoncad.org/');
    expect(mason?.links.taxOfficeUrl).toContain('co.mason.tx.us/page/mason.County.Assessor.Collector');

    const haskell = getCountyPropertyRecordBySlug('haskell');
    expect(haskell?.links.appraisalDistrictUrl).toBe('https://www.haskellcad.com');
    expect(haskell?.links.taxOfficeUrl).toContain('haskellcountytx.gov/page/haskell.County.Assessor.Collector');
  });
});
