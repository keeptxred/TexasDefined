import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { loadDogHubData } from '@/data/texas-dogs';
import { buildMeta, canonicalLink } from '@/lib/seo';

const DogsHubPage = lazy(() => import('@/components/dogs/DogsHubPage'));
const canonicalPath = '/dogs';
const description = 'Texas Dogs Defined is the playful dog-life department of Texas Defined: breed personalities, Texas dog culture and breed-specific shirt ideas built for dog people.';

export const Route = createFileRoute('/dogs')({
  loader: () => loadDogHubData(),
  head: ({ loaderData }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Dogs Defined — Breeds, Dog Life & Funny Shirt Ideas',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: loaderData?.head.scripts ?? [],
  }),
  component: DogsRouteComponent,
});

function DogsRouteComponent() {
  return <Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" />}><DogsHubPage /></Suspense>;
}
