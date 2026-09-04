import { lazy, Suspense } from 'react';
import { createFileRoute, notFound } from '@tanstack/react-router';

import { loadDogBreedPage } from '@/data/texas-dogs';

const DogBreedPage = lazy(() => import('@/components/dogs/DogBreedPage'));

export const Route = createFileRoute('/dogs/$breed')({
  loader: async ({ params }) => {
    const data = await loadDogBreedPage(params.breed);
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
  component: DogBreedRouteComponent,
});

function DogBreedRouteComponent() {
  return <Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" />}><DogBreedPage /></Suspense>;
}
