import { lazy, Suspense, type ComponentType } from 'react';

type TransactionCalculatorModule = typeof import('./TexasTransactionCalculators.impl');
type TransactionCalculatorName = keyof TransactionCalculatorModule;

function createLazyCalculator(name: TransactionCalculatorName) {
  const Component = lazy(async () => {
    const calculatorModule = await import('./TexasTransactionCalculators.impl');
    return { default: calculatorModule[name] as ComponentType };
  });

  return function LazyTransactionCalculator() {
    return <Suspense fallback={<p className="mt-10 text-sm text-muted-foreground">Loading calculator…</p>}><Component /></Suspense>;
  };
}

export const CashToCloseCalculator = createLazyCalculator('CashToCloseCalculator');
export const SellerNetProceedsCalculator = createLazyCalculator('SellerNetProceedsCalculator');
