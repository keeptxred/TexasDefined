import type { TexasEntityKind, TexasEntityRecord } from '@/data/knowledge-graph/types';

const KTR = 'https://keeptxred.com';

export const TEXAS_DEFINED_STATIC_GOVERNMENT_REDIRECTS: Readonly<Record<string, string>> = {
  '/texas-attorney-general': `${KTR}/texas-government/attorney-general`,
  '/texas-secretary-of-state': `${KTR}/texas-government/secretary-of-state`,
  '/texas-comptroller': `${KTR}/texas-government/comptroller`,
  '/texas-dps': `${KTR}/texas-government/agencies/texas-department-public-safety`,
  '/texas-unemployment': `${KTR}/guides/texas-unemployment-benefits-eligibility-law`,
};

const KTR_AGENCY_PATHS: Readonly<Record<string, string>> = {
  'texas-comptroller': '/texas-government/comptroller',
  'texas-secretary-of-state': '/texas-government/secretary-of-state',
  'texas-dps': '/texas-government/agencies/texas-department-public-safety',
  'texas-parks-wildlife': '/texas-government/agencies/texas-parks-wildlife',
  'texas-workforce-commission': '/texas-government/agencies/texas-workforce-commission',
  'texas-education-agency': '/texas-government/agencies/texas-education-agency',
  'public-utility-commission': '/texas-government/agencies/public-utility-commission',
  'texas-commission-environmental-quality': '/texas-government/agencies/texas-commission-environmental-quality',
  'texas-general-land-office': '/texas-government/land-commissioner',
  'texas-department-insurance': '/texas-government/agencies/texas-department-insurance',
  'texas-health-human-services': '/texas-government/agencies/health-human-services-commission',
};

const GOVERNMENT_REFERENCE_KINDS = new Set<TexasEntityKind>(['agency', 'appraisal-district', 'tax-office', 'county-clerk', 'dps-office']);

export function texasDefinedEntityRedirect(entity: Pick<TexasEntityRecord, 'kind' | 'slug' | 'countySlug'>): string | undefined {
  if (entity.kind === 'agency') {
    if (entity.slug === 'texas-dmv') return '/texas-dmv';
    const ktrPath = KTR_AGENCY_PATHS[entity.slug];
    return ktrPath ? `${KTR}${ktrPath}` : `${KTR}/texas-government/agencies`;
  }
  if ((entity.kind === 'appraisal-district' || entity.kind === 'tax-office') && entity.countySlug) {
    return `/property-tax/county/${entity.countySlug}`;
  }
  if (entity.kind === 'county-clerk' && entity.countySlug) return `/county/${entity.countySlug}`;
  if (entity.kind === 'dps-office') return '/texas-drivers-license';
  return undefined;
}

export function isTexasDefinedOwnedEntity(entity: Pick<TexasEntityRecord, 'kind'>) {
  return !GOVERNMENT_REFERENCE_KINDS.has(entity.kind);
}

export function isTexasDefinedOwnedStaticPath(path: string) {
  return !(path in TEXAS_DEFINED_STATIC_GOVERNMENT_REDIRECTS);
}
