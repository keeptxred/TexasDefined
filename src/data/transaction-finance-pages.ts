import { createServerFn } from '@tanstack/react-start';
import type { TransactionFinancePageKind } from './transaction-finance-pages.server';

const loadTransactionFinancePage = createServerFn({ method: 'GET' })
  .inputValidator((data: { kind: TransactionFinancePageKind }) => data)
  .handler(async ({ data }) => {
    const { loadTransactionFinancePageServer } = await import('./transaction-finance-pages.server');
    return loadTransactionFinancePageServer(data.kind);
  });

export function getTransactionFinancePage(kind: TransactionFinancePageKind) {
  return loadTransactionFinancePage({ data: { kind } });
}
