import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/landscapes/$slug')({
  loader: async ({ params }) => {
    const { getTexasLandscapePage } = await import('@/data/texas-landscapes.functions');
    const result = await getTexasLandscapePage({ data: { slug: params.slug } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
  headers: ({ params }) => params.slug === 'rivers-and-river-valleys'
    ? {
        'Cache-Control': 'no-store, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Cloudflare-CDN-Cache-Control': 'no-store',
      }
    : {},
});
