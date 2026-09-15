import { createFileRoute, notFound } from '@tanstack/react-router';

import { ADVERTISING_TIER_BY_ID, type AdvertisingTierId } from '@/data/advertising-program';

export const Route = createFileRoute('/partner-with-us/contract/$tier')({
  beforeLoad: ({ params }) => {
    if (!(params.tier in ADVERTISING_TIER_BY_ID)) throw notFound();
  },
  head: ({ params }) => {
    const tier = ADVERTISING_TIER_BY_ID[params.tier as AdvertisingTierId] ?? ADVERTISING_TIER_BY_ID.local;
    return {
      meta: [
        { title: `${tier.name} Advertising Agreement | Texas Defined` },
        { name: 'description', content: `Review the Texas Defined ${tier.name} advertising and sponsorship agreement template.` },
        { name: 'robots', content: 'noindex,follow' },
      ],
    };
  },
});
