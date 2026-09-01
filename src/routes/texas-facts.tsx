import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getTexasFactsData } from '@/data/texas-facts.functions';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const description = 'A source-backed guide to essential Texas facts covering the Republic, geography, symbols, culture, industry and government.';

const canonicalPath = '/texas-facts';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute(canonicalPath)({
  loader: () => getTexasFactsData(),
  head: ({ loaderData }) => {
    const factItems = (loaderData?.facts ?? []).map((item) => ({
      '@type': 'ListItem',
      position: item.id,
      item: {
        '@type': 'CreativeWork',
        '@id': `${pageUrl}#fact-${item.id}`,
        name: item.title,
        text: item.fact,
        citation: item.sources.map((source) => source.url),
      },
    }));

    return {
      meta: buildMeta(texasDefinedBrand, {
        title: '100 Essential Texas Facts — History, Geography, Culture & Industry',
        description,
        canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#page`,
            url: pageUrl,
            name: '100 Essential Facts About Texas',
            description,
            isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            mainEntity: { '@id': `${pageUrl}#facts` },
            breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
          },
          {
            '@type': 'ItemList',
            '@id': `${pageUrl}#facts`,
            name: '100 source-backed facts about Texas',
            numberOfItems: factItems.length,
            itemListElement: factItems,
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Facts', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
});
