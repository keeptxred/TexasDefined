import { createFileRoute } from '@tanstack/react-router';

import { getTransactionFinancePage } from '@/data/transaction-finance-pages';

export const Route = createFileRoute('/texas-seller-net-proceeds-calculator')({
  loader: async () => ({ page: await getTransactionFinancePage('seller-net-proceeds') }),
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});
