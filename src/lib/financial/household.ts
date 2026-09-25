import { monthlyMortgagePayment } from './mortgage.ts';
import { nonNegative, uniqueIssues, validateNonNegative, validatePercent, type ValidationIssue } from './validation.ts';

export function estimateDownPayment(input: { homePrice: number; downPaymentPercent: number; closingCostPercent: number; reserve: number }) {
  const issues = uniqueIssues([
    ...validateNonNegative('homePrice', 'Home price', input.homePrice),
    ...validatePercent('downPaymentPercent', 'Down payment', input.downPaymentPercent, 100),
    ...validatePercent('closingCostPercent', 'Closing costs', input.closingCostPercent, 20),
    ...validateNonNegative('reserve', 'Emergency cushion', input.reserve),
  ]);
  const price = nonNegative(input.homePrice);
  const downPayment = price * Math.min(100, nonNegative(input.downPaymentPercent)) / 100;
  const closingCosts = price * nonNegative(input.closingCostPercent) / 100;
  return { downPayment, closingCosts, cashNeeded: downPayment + closingCosts + nonNegative(input.reserve), loanAmount: Math.max(0, price - downPayment), issues };
}

export function estimateHomeEquity(input: { homeValue: number; loanBalance: number; maxLtvPercent: number }) {
  const issues: ValidationIssue[] = [
    ...validateNonNegative('homeValue', 'Home value', input.homeValue),
    ...validateNonNegative('loanBalance', 'Loan balance', input.loanBalance),
    ...validatePercent('maxLtvPercent', 'Maximum LTV', input.maxLtvPercent, 100),
  ];
  const value = nonNegative(input.homeValue);
  const balance = nonNegative(input.loanBalance);
  return { equity: Math.max(0, value - balance), ltvPercent: value ? balance / value * 100 : 0, availableEquity: Math.max(0, value * nonNegative(input.maxLtvPercent) / 100 - balance), issues: uniqueIssues(issues) };
}

export function estimateHomeEquityGrowth(input: { homeValue: number; loanBalance: number; annualAppreciationPercent: number; annualPaydown: number; years: number }) {
  const value = nonNegative(input.homeValue);
  const years = Math.max(0, Math.min(50, nonNegative(input.years)));
  const futureHomeValue = value * Math.pow(1 + nonNegative(input.annualAppreciationPercent) / 100, years);
  const futureLoanBalance = Math.max(0, nonNegative(input.loanBalance) - nonNegative(input.annualPaydown) * years);
  const currentEquity = Math.max(0, value - nonNegative(input.loanBalance));
  const futureEquity = Math.max(0, futureHomeValue - futureLoanBalance);
  return { futureHomeValue, futureLoanBalance, futureEquity, equityGained: futureEquity - currentEquity, issues: [] as ValidationIssue[] };
}

export function estimateMortgagePayoff(input: { loanBalance: number; annualInterestRate: number; regularPayment: number; extraPayment: number }) {
  const balance = nonNegative(input.loanBalance);
  const monthlyRate = nonNegative(input.annualInterestRate) / 1200;
  const totalPayment = nonNegative(input.regularPayment) + nonNegative(input.extraPayment);
  const issues: ValidationIssue[] = [];
  if (balance > 0 && totalPayment <= balance * monthlyRate) issues.push({ field: 'regularPayment', message: 'Payment must exceed the first month of interest to pay the loan down.' });
  let remaining = balance;
  let months = 0;
  let interestPaid = 0;
  while (remaining > 0.005 && months < 1200 && !issues.length) {
    const interest = remaining * monthlyRate;
    interestPaid += interest;
    remaining = Math.max(0, remaining + interest - totalPayment);
    months += 1;
  }
  return { payoffMonths: issues.length ? Infinity : months, interestPaid: issues.length ? Infinity : interestPaid, issues };
}

export function estimateRefinance(input: { loanBalance: number; currentRate: number; newRate: number; newTermYears: number; refinanceCosts: number }) {
  const currentPayment = monthlyMortgagePayment(input.loanBalance, input.currentRate, input.newTermYears);
  const newPayment = monthlyMortgagePayment(input.loanBalance, input.newRate, input.newTermYears);
  const monthlySavings = currentPayment - newPayment;
  return { currentPayment, newPayment, monthlySavings, breakEvenMonths: monthlySavings > 0 ? nonNegative(input.refinanceCosts) / monthlySavings : Infinity, issues: [] as ValidationIssue[] };
}

export function estimateBudget(input: { monthlyIncome: number; housing: number; transportation: number; food: number; utilities: number; debt: number; savings: number }) {
  const plannedSpending = nonNegative(input.housing) + nonNegative(input.transportation) + nonNegative(input.food) + nonNegative(input.utilities) + nonNegative(input.debt) + nonNegative(input.savings);
  const monthlyIncome = nonNegative(input.monthlyIncome);
  return { plannedSpending, remaining: monthlyIncome - plannedSpending, savingsRatePercent: monthlyIncome ? nonNegative(input.savings) / monthlyIncome * 100 : 0, issues: [] as ValidationIssue[] };
}

export function estimateDownPaymentAssistance(input: { homePrice: number; requiredDownPercent: number; assistancePercent: number; closingCostPercent: number; cashAvailable: number }) {
  const price = nonNegative(input.homePrice);
  const requiredDown = price * nonNegative(input.requiredDownPercent) / 100;
  const assistance = price * nonNegative(input.assistancePercent) / 100;
  const closingCosts = price * nonNegative(input.closingCostPercent) / 100;
  const totalCashNeed = requiredDown + closingCosts;
  return { requiredDown, assistance, closingCosts, totalCashNeed, remainingCashGap: Math.max(0, totalCashNeed - assistance - nonNegative(input.cashAvailable)), issues: [] as ValidationIssue[] };
}

export function estimateSalaryComparison(input: { salary: number; currentIndex: number; targetIndex: number }) {
  const currentIndex = Math.max(1, nonNegative(input.currentIndex));
  const targetIndex = Math.max(1, nonNegative(input.targetIndex));
  const comparableSalary = nonNegative(input.salary) * targetIndex / currentIndex;
  return { comparableSalary, salaryDifference: comparableSalary - nonNegative(input.salary), purchasingPowerChangePercent: (currentIndex / targetIndex - 1) * 100, issues: [] as ValidationIssue[] };
}

export function estimateCostOfLiving(input: { currentMonthlySpending: number; currentIndex: number; targetIndex: number }) {
  const currentIndex = Math.max(1, nonNegative(input.currentIndex));
  const targetIndex = Math.max(1, nonNegative(input.targetIndex));
  const equivalentMonthlySpending = nonNegative(input.currentMonthlySpending) * targetIndex / currentIndex;
  return { equivalentMonthlySpending, monthlyDifference: equivalentMonthlySpending - nonNegative(input.currentMonthlySpending), annualDifference: (equivalentMonthlySpending - nonNegative(input.currentMonthlySpending)) * 12, issues: [] as ValidationIssue[] };
}

export function estimateSalaryScenario(input: { annualSalary: number; effectiveFederalRate: number; benefitsRetirementRate: number; otherDeductionRate: number }) {
  const payrollTaxRate = 7.65;
  const gross = nonNegative(input.annualSalary);
  const deductions = gross * (nonNegative(input.effectiveFederalRate) + payrollTaxRate + nonNegative(input.benefitsRetirementRate) + nonNegative(input.otherDeductionRate)) / 100;
  const annualTakeHome = Math.max(0, gross - deductions);
  return { deductions, annualTakeHome, monthlyTakeHome: annualTakeHome / 12, payrollTaxRate, issues: [] as ValidationIssue[] };
}

export function estimateMovingCost(input: { distanceMiles: number; bedrooms: number; packing: number; travel: number; deposits: number; storage?: number; writtenEstimate?: number; contingencyPercent?: number }) {
  const baselineTransport = 900 + nonNegative(input.distanceMiles) * 2.25 + nonNegative(input.bedrooms) * 650;
  const transportation = nonNegative(input.writtenEstimate ?? 0) > 0 ? nonNegative(input.writtenEstimate ?? 0) : baselineTransport;
  const subtotal = transportation + nonNegative(input.packing) + nonNegative(input.travel) + nonNegative(input.deposits) + nonNegative(input.storage ?? 0);
  const contingencyAmount = subtotal * nonNegative(input.contingencyPercent ?? 15) / 100;
  return { baselineTransport, transportation, subtotal, contingencyAmount, total: subtotal + contingencyAmount, issues: [] as ValidationIssue[] };
}


export type HouseholdBudgetCategories = {
  housing: number;
  transportation: number;
  utilities: number;
  insurance: number;
  foodHousehold: number;
  healthcare: number;
  childcareEducation: number;
  otherRecurring: number;
};

const BUDGET_LABELS: Array<[keyof HouseholdBudgetCategories, string]> = [
  ['housing', 'Housing'],
  ['transportation', 'Transportation'],
  ['utilities', 'Utilities'],
  ['insurance', 'Insurance'],
  ['foodHousehold', 'Food & household'],
  ['healthcare', 'Healthcare'],
  ['childcareEducation', 'Childcare & education'],
  ['otherRecurring', 'Other recurring costs'],
];

export function estimateCostOfLivingBudget(input: { current: HouseholdBudgetCategories; target: HouseholdBudgetCategories }) {
  const issues: ValidationIssue[] = [];
  const normalize = (budget: HouseholdBudgetCategories, prefix: string) => {
    const normalized = {} as HouseholdBudgetCategories;
    for (const [key, label] of BUDGET_LABELS) {
      const value = budget[key];
      issues.push(...validateNonNegative(prefix + String(key), prefix + ' ' + label, value));
      normalized[key] = nonNegative(value);
    }
    return normalized;
  };
  const current = normalize(input.current, 'Current');
  const target = normalize(input.target, 'Target');
  const currentTotal = BUDGET_LABELS.reduce((sum, [key]) => sum + current[key], 0);
  const targetTotal = BUDGET_LABELS.reduce((sum, [key]) => sum + target[key], 0);
  const monthlyDifference = targetTotal - currentTotal;
  return {
    current,
    target,
    currentTotal,
    targetTotal,
    monthlyDifference,
    annualDifference: monthlyDifference * 12,
    percentDifference: currentTotal > 0 ? monthlyDifference / currentTotal * 100 : 0,
    categoryDeltas: BUDGET_LABELS.map(([key, label]) => ({ label, current: current[key], target: target[key], delta: target[key] - current[key] })),
    issues: uniqueIssues(issues),
  };
}
