import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { loadDogHubData } from '@/data/texas-dogs';

const DogsHubPage = lazy(() => import('@/components/dogs/DogsHubPage'));

export const Route = createFileRoute('/dogs')({
  loader: () => loadDogHubData(),
  head: ({ loaderData }) => loaderData?.head ?? {},
  component: DogsRouteComponent,
});

function DogsRouteComponent() {
  return <Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" />}><DogsHubPage /></Suspense>;
}
