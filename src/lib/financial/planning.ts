import { clamp, nonNegative } from './validation.ts';

export function calculateUtilities(input: { electricity: number; waterSewer: number; naturalGas: number; internet: number; trash: number; other?: number }) {
  const breakdown = {
    electricity: nonNegative(input.electricity),
    waterSewer: nonNegative(input.waterSewer),
    naturalGas: nonNegative(input.naturalGas),
    internet: nonNegative(input.internet),
    trash: nonNegative(input.trash),
    other: nonNegative(input.other ?? 0),
  };
  const monthly = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
  return { breakdown, monthly, annual: monthly * 12 };
}

export function calculateHomeInsurance(input: { replacementCost: number; baseRatePercent: number; windFloodAdditions: number; deductibleDiscountCredit: number }) {
  const basePremium = nonNegative(input.replacementCost) * clamp(input.baseRatePercent, 0, 100) / 100;
  const annual = Math.max(0, basePremium + nonNegative(input.windFloodAdditions) - nonNegative(input.deductibleDiscountCredit));
  return { basePremium, annual, monthly: annual / 12 };
}

export function calculateCostOfLiving(input: { currentMonthlySpending: number; currentAreaIndex: number; targetAreaIndex: number }) {
  const currentIndex = Math.max(0.01, nonNegative(input.currentAreaIndex));
  const equivalentMonthly = nonNegative(input.currentMonthlySpending) * nonNegative(input.targetAreaIndex) / currentIndex;
  return { equivalentMonthly, monthlyDifference: equivalentMonthly - nonNegative(input.currentMonthlySpending), annualDifference: (equivalentMonthly - nonNegative(input.currentMonthlySpending)) * 12 };
}

export function calculateSalaryPlanning(input: { annualGrossSalary: number; estimatedFederalPercent: number; benefitsRetirementPercent: number; otherDeductionsPercent: number; payrollTaxPercent?: number }) {
  const salary = nonNegative(input.annualGrossSalary);
  const payrollTaxPercent = clamp(input.payrollTaxPercent ?? 7.65, 0, 100);
  const totalRate = clamp(input.estimatedFederalPercent, 0, 100) + payrollTaxPercent + clamp(input.benefitsRetirementPercent, 0, 100) + clamp(input.otherDeductionsPercent, 0, 100);
  const deductions = Math.min(salary, salary * totalRate / 100);
  const annualTakeHome = Math.max(0, salary - deductions);
  return { deductions, annualTakeHome, monthlyTakeHome: annualTakeHome / 12, payrollTaxPercent, totalDeductionPercent: salary ? deductions / salary * 100 : 0 };
}

export function calculateMovingBudget(input: { distanceMiles: number; bedrooms: number; writtenEstimate: number; packing: number; travelLodging: number; storage: number; depositsSetup: number; contingencyPercent: number }) {
  const baselineTransport = 900 + nonNegative(input.distanceMiles) * 2.25 + nonNegative(input.bedrooms) * 650;
  const transportation = input.writtenEstimate > 0 ? nonNegative(input.writtenEstimate) : baselineTransport;
  const subtotal = transportation + nonNegative(input.packing) + nonNegative(input.travelLodging) + nonNegative(input.storage) + nonNegative(input.depositsSetup);
  const contingency = subtotal * clamp(input.contingencyPercent, 0, 100) / 100;
  return { baselineTransport, transportation, subtotal, contingency, total: subtotal + contingency, usesWrittenEstimate: input.writtenEstimate > 0 };
}


export function calculateBudget(input: { income: number; housing: number; transportation: number; food: number; utilities: number; debt: number; savings: number; other?: number }) {
  const plannedSpending = nonNegative(input.housing) + nonNegative(input.transportation) + nonNegative(input.food) + nonNegative(input.utilities) + nonNegative(input.debt) + nonNegative(input.savings) + nonNegative(input.other ?? 0);
  const income = nonNegative(input.income);
  return { plannedSpending, remaining: income - plannedSpending, savingsPercent: income > 0 ? nonNegative(input.savings) / income * 100 : 0 };
}

export function calculateSalaryComparison(input: { salary: number; currentIndex: number; targetIndex: number }) {
  const currentIndex = Math.max(0.01, nonNegative(input.currentIndex));
  const targetIndex = Math.max(0.01, nonNegative(input.targetIndex));
  const salary = nonNegative(input.salary);
  const equivalentSalary = salary * targetIndex / currentIndex;
  return { equivalentSalary, difference: equivalentSalary - salary, purchasingPowerChangePercent: currentIndex / targetIndex * 100 - 100 };
}
