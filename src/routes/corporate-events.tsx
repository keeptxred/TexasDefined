import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/corporate-events';
const description = 'Find and compare real Texas corporate event venues, team-building activities and private group experiences by city, headcount and budget. Start with Houston and build a shareable event shortlist.';

export const Route = createFileRoute('/corporate-events')({
  // Keep the verified venue catalog out of the global route bundle.
  // Dynamic import only runs when this specific page is visited.
  loader: async () => {
    const { corporateEventProviders } = await import('@/data/corporate-events');
    return {
      providers: corporateEventProviders.map(({ name, officialUrl }) => ({ name, officialUrl })),
    };
  },
  head: ({ loaderData }) => {
    const providers = loaderData?.providers ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Corporate Events & Team Building Finder', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': 'https://texasdefined.com/corporate-events#page',
          name: 'Texas Corporate Events & Team Building Finder',
          url: 'https://texasdefined.com/corporate-events',
          description,
          isPartOf: { '@id': 'https://texasdefined.com/#website' },
          mainEntity: {
            '@type': 'ItemList',
            name: 'Houston corporate group event providers',
            numberOfItems: providers.length,
            itemListElement: providers.map((provider, index) => ({
              '@type': 'ListItem', position: index + 1,
              name: provider.name, url: provider.officialUrl,
            })),
          },
        }),
      }],
    };
  },
});
