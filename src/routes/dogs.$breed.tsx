import { createFileRoute, notFound } from '@tanstack/react-router';

import DogBreedPage from '@/components/dogs/DogBreedPage';
import { loadDogBreedPage } from '@/data/texas-dogs';

export const Route = createFileRoute('/dogs/$breed')({
  loader: async ({ params }) => {
    const data = await loadDogBreedPage(params.breed);
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
  component: DogBreedPage,
});
