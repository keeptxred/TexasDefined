import { createLazyFileRoute } from '@tanstack/react-router';

import { TransactionFinanceAuthorityPage } from '@/components/calculators/TransactionFinanceAuthorityPage';
import { CashToCloseCalculator } from '@/components/calculators/TexasTransactionCalculators';

export const Route = createLazyFileRoute('/texas-cash-to-close-calculator')({ component: Page });

function Page() {
  const { page } = Route.useLoaderData();
  return <TransactionFinanceAuthorityPage page={page} calculator={<CashToCloseCalculator />} />;
}
