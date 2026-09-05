import { describe, expect, it } from 'vitest';

import { COUNTY_PROPERTY_RECORDS, getCountyPropertyRecordBySlug } from './county-property-data';
import { isCountyPropertyIndexReady } from './county-property-schema';

const verifiedCounties = {
  bexar: '2026-08-30',
  travis: '2026-08-30',
  dallas: '2026-08-30',
  collin: '2026-08-30',
  comal: '2026-08-21',
  denton: '2026-08-21',
  bell: '2026-08-21',
  polk: '2026-08-25',
  mason: '2026-08-25',
  haskell: '2026-08-25',
} as const;

const august30LocalSources = {
  travis: ['traviscad.org', 'tax-office.traviscountytx.gov'],
  bexar: ['bcad.org', 'bexar.org'],
  dallas: ['dallascad.org', 'dallascounty.org'],
  collin: ['collincad.org', 'collincountytx.gov'],
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

  it('keeps the August 30 high-demand overlays backed by distinct appraisal and tax-office authorities', () => {
    for (const [slug, expectedHosts] of Object.entries(august30LocalSources)) {
      const record = getCountyPropertyRecordBySlug(slug);
      expect(record, slug).not.toBeNull();
      expect(record!.lastVerifiedAt, slug).toBe('2026-08-30');
      expect(isCountyPropertyIndexReady(record!), slug).toBe(true);

      const localUrls = [
        record!.links.appraisalDistrictUrl,
        record!.links.propertySearchUrl,
        record!.links.taxOfficeUrl,
        record!.links.paymentUrl,
        record!.links.protestUrl,
        record!.links.exemptionUrl,
      ].filter((value): value is string => Boolean(value));
      const hosts = new Set(localUrls.map((value) => new URL(value).hostname.replace(/^www\./, '')));
      for (const host of expectedHosts) expect([...hosts].some((value) => value === host || value.endsWith(`.${host}`)), `${slug}:${host}`).toBe(true);
      expect(hosts.size, slug).toBeGreaterThanOrEqual(2);
    }
  });

  it('reports the exact governed statewide property-guide readiness cohort', () => {
    const ready = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady).map((record) => record.slug).sort();
    console.log(`COUNTY_PROPERTY_READY count=${ready.length} slugs=${ready.join(',')}`);
    for (const slug of Object.keys(verifiedCounties)) expect(ready, slug).toContain(slug);
    expect(ready.length).toBeLessThan(254);
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
