import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wedding-venues')({
  loader: async () => {
    const { getWeddingVenueDirectory } = await import('@/data/wedding-venues.functions');
    return getWeddingVenueDirectory();
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});