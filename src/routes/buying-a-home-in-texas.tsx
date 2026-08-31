import { createFileRoute } from '@tanstack/react-router';

import { getTexasHomebuyerJourney } from '@/data/texas-homebuyer-journey.functions';

const canonicalPath = '/buying-a-home-in-texas';
const metadataContract = {
  canonicalPath,
  title: 'Buying a Home in Texas | Costs, Mortgage, Taxes & Closing',
  description: 'Plan a Texas home purchase from affordability and mortgage payments through down payment, cash to close, property taxes, insurance, inspections, closing and post-closing reserves.',
} as const;

export const Route = createFileRoute('/buying-a-home-in-texas')({
  loader: async () => getTexasHomebuyerJourney(),
  head: ({ loaderData }) => {
    void metadataContract;
    return loaderData?.head ?? {};
  },
});
