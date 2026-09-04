import { lazy, Suspense } from 'react';
import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const DogBreedPage = lazy(() => import('@/components/dogs/DogBreedPage'));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute('/dogs/$breed')({
  loader: async ({ params }) => {
    const { findDogBreed, relatedDogBreeds } = await import('@/data/texas-dogs');
    const breed = findDogBreed(params.breed);
    if (!breed) throw notFound();
    return { breed, related: relatedDogBreeds(breed.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { breed } = loaderData;
    const canonicalPath = `/dogs/${breed.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const description = `${breed.name} Defined: the breed personality, Texas-life angle and funny shirt directions that fit ${breed.shortName} people without turning the page into a generic product listing.`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${breed.name} Defined — Personality & Funny Shirt Ideas`,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${pageUrl}#page`,
              url: pageUrl,
              name: `${breed.name} Defined`,
              description,
              isPartOf: { '@id': `${siteUrl}/#website` },
              about: { '@type': 'Thing', name: breed.name },
              breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${pageUrl}#breadcrumbs`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
                { '@type': 'ListItem', position: 2, name: 'Texas Dogs Defined', item: `${siteUrl}/dogs` },
                { '@type': 'ListItem', position: 3, name: `${breed.name} Defined`, item: pageUrl },
              ],
            },
          ],
        }),
      }],
    };
  },
  component: DogBreedRouteComponent,
});

function DogBreedRouteComponent() {
  return <Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" />}><DogBreedPage /></Suspense>;
}
