import type { ContentHealthInput } from '@/platform/content-health';

export type AuthoritativeSource = {
  id: string;
  name: string;
  url: string;
  domain: string;
  topics: string[];
  reviewEveryDays: number;
  lastReviewed: string;
};

export const AUTHORITATIVE_SOURCES: AuthoritativeSource[] = [
  { id: 'tx-comptroller-property-tax', name: 'Texas Comptroller Property Tax Assistance', url: 'https://comptroller.texas.gov/taxes/property-tax/', domain: 'comptroller.texas.gov', topics: ['property taxes', 'appraisal districts', 'exemptions', 'protests', 'payments', 'collections'], reviewEveryDays: 60, lastReviewed: '2026-08-03' },
  { id: 'tx-comptroller-county-directory', name: 'Texas Appraisal District Directory', url: 'https://comptroller.texas.gov/taxes/property-tax/county-directory/', domain: 'comptroller.texas.gov', topics: ['counties', 'appraisal districts'], reviewEveryDays: 60, lastReviewed: '2026-08-03' },
  { id: 'texas-county-websites', name: 'Texas County Websites Directory', url: 'https://www.texas.gov/texas-county-websites.html', domain: 'texas.gov', topics: ['counties', 'local government'], reviewEveryDays: 90, lastReviewed: '2026-08-03' },
  { id: 'tx-dps-driver-license', name: 'Texas DPS Driver License', url: 'https://www.dps.texas.gov/section/driver-license', domain: 'dps.texas.gov', topics: ['driver license', 'moving'], reviewEveryDays: 60, lastReviewed: '2026-08-03' },
  { id: 'txdmv-registration', name: 'Texas DMV Vehicle Registration', url: 'https://www.txdmv.gov/motorists/register-your-vehicle', domain: 'txdmv.gov', topics: ['vehicle registration', 'moving'], reviewEveryDays: 60, lastReviewed: '2026-08-03' },
  { id: 'tx-sos-business', name: 'Texas Secretary of State Business Filings', url: 'https://www.sos.state.tx.us/corp/sosda/index.shtml', domain: 'sos.state.tx.us', topics: ['business', 'LLC'], reviewEveryDays: 90, lastReviewed: '2026-08-03' },
];

export const CONTENT_HEALTH_RESOURCES: ContentHealthInput[] = [
  { id: 'property-taxes', title: 'Texas Property Taxes', lastReviewed: '2026-08-03', reviewEveryDays: 90, officialUrl: AUTHORITATIVE_SOURCES[0].url, goldenRuleComplete: true, trustFramework: true, nextSteps: 8 },
  { id: 'property-tax-payments', title: 'Texas Property-Tax Payments and Collections', lastReviewed: '2026-08-03', reviewEveryDays: 60, officialUrl: AUTHORITATIVE_SOURCES[0].url, goldenRuleComplete: true, trustFramework: true, nextSteps: 9 },
  { id: 'property-tax-calculator', title: 'Texas Property Tax Calculator', lastReviewed: '2026-08-03', reviewEveryDays: 90, officialUrl: AUTHORITATIVE_SOURCES[0].url, goldenRuleComplete: true, trustFramework: true, nextSteps: 5 },
  { id: 'appraisal-districts', title: 'Texas Appraisal Districts', lastReviewed: '2026-08-03', reviewEveryDays: 60, officialUrl: AUTHORITATIVE_SOURCES[1].url, goldenRuleComplete: true, trustFramework: true, nextSteps: 6 },
  { id: 'homestead-exemption', title: 'Texas Homestead Exemption', lastReviewed: '2026-08-03', reviewEveryDays: 60, officialUrl: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/', goldenRuleComplete: true, trustFramework: true, nextSteps: 6 },
  { id: 'property-tax-protest', title: 'Texas Property Tax Protest', lastReviewed: '2026-08-03', reviewEveryDays: 60, officialUrl: 'https://comptroller.texas.gov/taxes/property-tax/protests/', goldenRuleComplete: true, trustFramework: true, nextSteps: 5 },
  { id: 'county-directory', title: 'Texas County Directory', lastReviewed: '2026-08-03', reviewEveryDays: 90, officialUrl: AUTHORITATIVE_SOURCES[2].url, goldenRuleComplete: true, trustFramework: true, nextSteps: 3 },
];

export function validateAuthoritativeSources() {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const source of AUTHORITATIVE_SOURCES) {
    if (ids.has(source.id)) errors.push(`Duplicate source id: ${source.id}`);
    ids.add(source.id);
    if (!source.url.startsWith('https://')) errors.push(`Source must use HTTPS: ${source.id}`);
    try {
      const hostname = new URL(source.url).hostname;
      if (hostname !== source.domain) errors.push(`Domain mismatch for ${source.id}: ${hostname} != ${source.domain}`);
    } catch {
      errors.push(`Invalid URL for ${source.id}`);
    }
    if (!source.topics.length) errors.push(`Source has no topics: ${source.id}`);
  }
  return { valid: errors.length === 0, errors };
}
