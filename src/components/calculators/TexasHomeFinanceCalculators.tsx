import { lazy, Suspense, type ComponentType } from 'react';

type FinanceCalculatorModule = typeof import('./TexasHomeFinanceCalculators.impl');
type FinanceCalculatorName = keyof FinanceCalculatorModule;

function createLazyCalculator(name: FinanceCalculatorName) {
  const Component = lazy(async () => {
    const calculatorModule = await import('./TexasHomeFinanceCalculators.impl');
    return { default: calculatorModule[name] as ComponentType };
  });

  return function LazyFinanceCalculator() {
    return (
      <Suspense fallback={<p className="mt-10 text-sm text-muted-foreground">Loading calculator…</p>}>
        <Component />
      </Suspense>
    );
  };
}

export const DownPaymentCalculator = createLazyCalculator('DownPaymentCalculator');
export const ClosingCostCalculator = createLazyCalculator('ClosingCostCalculator');
export const HomeEquityCalculator = createLazyCalculator('HomeEquityCalculator');
export const HomeEquityGrowthCalculator = createLazyCalculator('HomeEquityGrowthCalculator');
export const MortgagePayoffCalculator = createLazyCalculator('MortgagePayoffCalculator');
export const RefinanceCalculator = createLazyCalculator('RefinanceCalculator');
export const HomeownershipCostCalculator = createLazyCalculator('HomeownershipCostCalculator');
export const BudgetCalculator = createLazyCalculator('BudgetCalculator');
export const DownPaymentAssistanceCalculator = createLazyCalculator('DownPaymentAssistanceCalculator');
export const SalaryComparisonCalculator = createLazyCalculator('SalaryComparisonCalculator');
