export type TexasPlanningScenario = {
  homePrice?: number;
  downPayment?: number;
  annualInterestRate?: number;
  loanTermYears?: number;
  annualPropertyTaxRate?: number;
  annualHomeInsurance?: number;
  annualPmi?: number;
  monthlyHoa?: number;
  monthlySpecialDistrict?: number;
  monthlyUtilities?: number;
  monthlyMaintenance?: number;
  monthlyPrincipalInterest?: number;
  annualHouseholdIncome?: number;
  monthlyNonHousingDebt?: number;
};

export const TEXAS_PLANNING_SCENARIO_KEY = 'texasdefined:planning-scenario';

export function readTexasPlanningScenario(): TexasPlanningScenario {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(TEXAS_PLANNING_SCENARIO_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as TexasPlanningScenario;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function mergeTexasPlanningScenario(patch: TexasPlanningScenario) {
  if (typeof window === 'undefined') return false;
  try {
    const current = readTexasPlanningScenario();
    localStorage.setItem(TEXAS_PLANNING_SCENARIO_KEY, JSON.stringify({ ...current, ...patch }));
    return true;
  } catch {
    return false;
  }
}
