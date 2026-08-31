import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'Explore Texas-made and Texas-processed products, homegrown brands, headquarters and major operations by category, city and county.';
const canonicalPath = '/made-in-texas';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: 'Made in Texas — Products, Brands & Companies by City and County',
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
          name: 'Made, Built & Born in Texas',
          description,
          isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
          publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(texasDefinedBrand, '/') },
            { '@type': 'ListItem', position: 2, name: 'Made in Texas', item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
