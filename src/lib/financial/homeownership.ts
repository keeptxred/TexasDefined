import { clamp, nonNegative } from './validation.ts';

export interface HomeownershipInputs {
  mortgage: number;
  propertyTaxes: number;
  insurance: number;
  pmi?: number;
  hoa?: number;
  specialDistricts?: number;
  maintenance?: number;
  utilities?: number;
  pool?: number;
  landscaping?: number;
  other?: number;
}

export function calculateHomeownershipCost(input: HomeownershipInputs) {
  const breakdown = {
    mortgage: nonNegative(input.mortgage),
    propertyTaxes: nonNegative(input.propertyTaxes),
    insurance: nonNegative(input.insurance),
    pmi: nonNegative(input.pmi ?? 0),
    hoa: nonNegative(input.hoa ?? 0),
    specialDistricts: nonNegative(input.specialDistricts ?? 0),
    maintenance: nonNegative(input.maintenance ?? 0),
    utilities: nonNegative(input.utilities ?? 0),
    pool: nonNegative(input.pool ?? 0),
    landscaping: nonNegative(input.landscaping ?? 0),
    other: nonNegative(input.other ?? 0),
  };
  const monthly = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
  return { breakdown, monthly, annual: monthly * 12 };
}

export function calculateHomeEquity(input: { homeValue: number; balance: number; maxLtvPercent: number }) {
  const value = nonNegative(input.homeValue);
  const balance = nonNegative(input.balance);
  return {
    equity: Math.max(0, value - balance),
    ltvPercent: value > 0 ? balance / value * 100 : 0,
    availableAtMaxLtv: Math.max(0, value * clamp(input.maxLtvPercent, 0, 100) / 100 - balance),
  };
}

export function calculateEquityGrowth(input: { homeValue: number; balance: number; annualAppreciationPercent: number; annualPrincipalPaydown: number; years: number }) {
  const years = clamp(input.years, 0, 100);
  const futureHomeValue = nonNegative(input.homeValue) * Math.pow(1 + Math.max(-99.9, input.annualAppreciationPercent) / 100, years);
  const futureLoanBalance = Math.max(0, nonNegative(input.balance) - nonNegative(input.annualPrincipalPaydown) * years);
  const equity = Math.max(0, futureHomeValue - futureLoanBalance);
  const currentEquity = Math.max(0, nonNegative(input.homeValue) - nonNegative(input.balance));
  return { futureHomeValue, futureLoanBalance, equity, equityGrowth: equity - currentEquity };
}
