import { createFileRoute } from '@tanstack/react-router';

import { getTexasHomebuyerJourney } from '@/data/texas-homebuyer-journey.functions';

export const Route = createFileRoute('/buying-a-home-in-texas')({
  loader: async () => getTexasHomebuyerJourney(),
  head: ({ loaderData }) => loaderData?.head ?? {},
});
