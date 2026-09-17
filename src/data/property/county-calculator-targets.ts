export type CountyCalculatorTarget = {
  href: string;
  kind: 'local' | 'statewide';
  follow: boolean;
};

export const MAJOR_COUNTY_PROPERTY_TAX_CALCULATORS = [
  { countySlug: 'harris', countyName: 'Harris County', calculatorPath: '/property-tax-calculator/harris-county' },
  { countySlug: 'dallas', countyName: 'Dallas County', calculatorPath: '/property-tax-calculator/dallas-county' },
  { countySlug: 'tarrant', countyName: 'Tarrant County', calculatorPath: '/property-tax-calculator/tarrant-county' },
  { countySlug: 'bexar', countyName: 'Bexar County', calculatorPath: '/property-tax-calculator/bexar-county' },
  { countySlug: 'travis', countyName: 'Travis County', calculatorPath: '/property-tax-calculator/travis-county' },
  { countySlug: 'collin', countyName: 'Collin County', calculatorPath: '/property-tax-calculator/collin-county' },
  { countySlug: 'denton', countyName: 'Denton County', calculatorPath: '/property-tax-calculator/denton-county' },
  { countySlug: 'fort-bend', countyName: 'Fort Bend County', calculatorPath: '/property-tax-calculator/fort-bend-county' },
  { countySlug: 'montgomery', countyName: 'Montgomery County', calculatorPath: '/property-tax-calculator/montgomery-county' },
  { countySlug: 'williamson', countyName: 'Williamson County', calculatorPath: '/property-tax-calculator/williamson-county' },
  { countySlug: 'el-paso', countyName: 'El Paso County', calculatorPath: '/property-tax-calculator/el-paso-county' },
  { countySlug: 'hidalgo', countyName: 'Hidalgo County', calculatorPath: '/property-tax-calculator/hidalgo-county' },
] as const;

const localCountyCalculatorBySlug = new Map(
  MAJOR_COUNTY_PROPERTY_TAX_CALCULATORS.map((profile) => [profile.countySlug, profile] as const),
);

export function countyPropertyTaxCalculatorTarget(countySlug: string): CountyCalculatorTarget {
  const normalized = countySlug.trim().toLowerCase();
  const local = localCountyCalculatorBySlug.get(normalized);
  if (local) return { href: local.calculatorPath, kind: 'local', follow: true };

  return {
    href: `/texas-property-tax-estimator?county=${encodeURIComponent(normalized)}`,
    kind: 'statewide',
    follow: false,
  };
}

export function hasLocalCountyPropertyTaxCalculator(countySlug: string) {
  return localCountyCalculatorBySlug.has(countySlug.trim().toLowerCase());
}
