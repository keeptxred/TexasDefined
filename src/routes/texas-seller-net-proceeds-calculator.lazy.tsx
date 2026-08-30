import { createLazyFileRoute } from '@tanstack/react-router';

import { TransactionFinanceAuthorityPage } from '@/components/calculators/TransactionFinanceAuthorityPage';
import { SellerNetProceedsCalculator } from '@/components/calculators/TexasTransactionCalculators';

export const Route = createLazyFileRoute('/texas-seller-net-proceeds-calculator')({ component: Page });

function Page() {
  const { page } = Route.useLoaderData();
  return <TransactionFinanceAuthorityPage page={page} calculator={<SellerNetProceedsCalculator />} />;
}
