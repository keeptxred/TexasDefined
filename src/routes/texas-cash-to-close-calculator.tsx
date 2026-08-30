import { createFileRoute } from '@tanstack/react-router';

import { getTransactionFinancePage } from '@/data/transaction-finance-pages';

export const Route = createFileRoute('/texas-cash-to-close-calculator')({
  loader: async () => ({ page: await getTransactionFinancePage('cash-to-close') }),
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});
