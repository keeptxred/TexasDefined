import { createFileRoute } from '@tanstack/react-router';

import { getTexasHomebuyerJourney } from '@/data/texas-homebuyer-journey.functions';

const canonicalPath = '/buying-a-home-in-texas';
const title = 'Buying a Home in Texas | Costs, Mortgage, Taxes & Closing';
const description = 'Plan a Texas home purchase from affordability and mortgage payments through down payment, cash to close, property taxes, insurance, inspections, closing and post-closing reserves.';

export const Route = createFileRoute('/buying-a-home-in-texas')({
  loader: async () => getTexasHomebuyerJourney(),
  head: ({ loaderData }) => {
    void canonicalPath;
    void title;
    void description;
    return loaderData?.head ?? {};
  },
});
