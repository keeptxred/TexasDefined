import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/explore/breweries';
const description = 'Find active Texas brewer and brewpub licensed locations by city and county using Texas Alcoholic Beverage Commission records, plus independently researched guides to selected Texas breweries.';

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Breweries Directory | Find Breweries by City & County',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': absoluteUrl(texasDefinedBrand, canonicalPath) + '#page',
          url: absoluteUrl(texasDefinedBrand, canonicalPath), name: 'Texas Breweries Directory', description,
          about: { '@type': 'Thing', name: 'Texas licensed beer manufacturers' } },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(texasDefinedBrand, '/') },
          { '@type': 'ListItem', position: 2, name: 'Explore', item: absoluteUrl(texasDefinedBrand, '/explore') },
          { '@type': 'ListItem', position: 3, name: 'Breweries', item: absoluteUrl(texasDefinedBrand, canonicalPath) },
        ] },
      ],
    })],
  }),
});
