import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { loadDogHubData } from '@/data/texas-dogs';
import { buildMeta, canonicalLink } from '@/lib/seo';

const DogsHubPage = lazy(() => import('@/components/dogs/DogsHubPage'));
const description = 'Texas Dogs Defined is the playful dog-life department of Texas Defined: breed personalities, Texas dog culture and breed-specific shirt ideas built for dog people.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/dogs`;

export const Route = createFileRoute('/dogs')({
  loader: () => loadDogHubData(),
  head: ({ loaderData }) => {
    const breeds = loaderData?.breeds ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: '/dogs',
        title: 'Texas Dogs Defined — Breeds, Dog Life & Funny Shirt Ideas',
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, '/dogs')],
      scripts: [{
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `${pageUrl}#page`,
              url: pageUrl,
              name: 'Texas Dogs Defined',
              description,
              isPartOf: { '@id': `${siteUrl}/#website` },
              mainEntity: { '@id': `${pageUrl}#breeds` },
              breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
            },
            {
              '@type': 'ItemList',
              '@id': `${pageUrl}#breeds`,
              name: 'Dog breeds covered by Texas Dogs Defined',
              numberOfItems: breeds.length,
              itemListElement: breeds.map((breed, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'WebPage',
                  name: `${breed.name} Defined`,
                  description: breed.deck,
                  url: `${siteUrl}/dogs/${breed.slug}`,
                },
              })),
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${pageUrl}#breadcrumbs`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
                { '@type': 'ListItem', position: 2, name: 'Texas Life', item: `${siteUrl}/texas-living` },
                { '@type': 'ListItem', position: 3, name: 'Texas Dogs Defined', item: pageUrl },
              ],
            },
          ],
        }),
      }],
    };
  },
  component: DogsRouteComponent,
});

function DogsRouteComponent() {
  return <Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" />}><DogsHubPage /></Suspense>;
}
