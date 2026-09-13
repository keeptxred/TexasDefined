import { createFileRoute } from '@tanstack/react-router';

const photoRedirectHeaders = {
  'cache-control': 'public, max-age=86400, stale-while-revalidate=604800',
  'x-robots-tag': 'noindex, follow',
};

const missingHeroHeaders = {
  'cache-control': 'no-store',
  'x-robots-tag': 'noindex, nofollow',
};

export const Route = createFileRoute('/api/sports-venue-hero')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const slug = url.searchParams.get('slug')?.trim().toLowerCase();
        if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
          return new Response('Not found', { status: 404, headers: missingHeroHeaders });
        }

        const lookupSlug = slug === 'galaxy-stadium' ? 'jones-att-stadium' : slug;
        const [
          { findCompleteTexasEntity },
          { getSportsVenueEnrichmentAll },
          { getSportsVenuePhoto },
        ] = await Promise.all([
          import('@/data/knowledge-graph'),
          import('@/data/sports-venue-enrichment-all'),
          import('@/data/sports-venue-images-all'),
        ]);
        const entity = await findCompleteTexasEntity(lookupSlug);
        const enrichment = getSportsVenueEnrichmentAll(lookupSlug);
        if (!entity || entity.kind !== 'sports-venue' || !enrichment) {
          return new Response('Not found', { status: 404, headers: missingHeroHeaders });
        }

        const photo = getSportsVenuePhoto(lookupSlug);
        if (!photo) {
          return new Response('Not found', { status: 404, headers: missingHeroHeaders });
        }

        return new Response(null, {
          status: 302,
          headers: { ...photoRedirectHeaders, location: photo.imageUrl },
        });
      },
    },
  },
});
