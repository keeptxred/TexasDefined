import { LOCAL_PROPERTY_TAX_PROFILES } from '@/data/local-property-tax-calculators';

export type CountyCalculatorTarget = {
  href: string;
  kind: 'local' | 'statewide';
  follow: boolean;
};

const localCountyProfiles = LOCAL_PROPERTY_TAX_PROFILES.filter((profile) =>
  profile.defaultCountySlug
  && profile.counties.length === 1
  && profile.counties[0]?.slug === profile.defaultCountySlug
  && profile.name.endsWith(' County'),
);

const localCountyCalculatorBySlug = new Map(
  localCountyProfiles.map((profile) => [profile.defaultCountySlug, profile] as const),
);

export const MAJOR_COUNTY_PROPERTY_TAX_CALCULATORS = localCountyProfiles.map((profile) => ({
  countySlug: profile.defaultCountySlug,
  countyName: profile.name,
  calculatorPath: profile.path,
}));

export function countyPropertyTaxCalculatorTarget(countySlug: string): CountyCalculatorTarget {
  const normalized = countySlug.trim().toLowerCase();
  const local = localCountyCalculatorBySlug.get(normalized);
  if (local) return { href: local.path, kind: 'local', follow: true };

  return {
    href: `/texas-property-tax-estimator?county=${encodeURIComponent(normalized)}`,
    kind: 'statewide',
    follow: false,
  };
}

export function hasLocalCountyPropertyTaxCalculator(countySlug: string) {
  return localCountyCalculatorBySlug.has(countySlug.trim().toLowerCase());
}
