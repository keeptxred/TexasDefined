import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/texas-lighthouses.json')({
  server: {
    handlers: {
      GET: async () => {
        const [{ texasLighthouseMapPoints }, { lighthouseVisitorPlans }] = await Promise.all([
          import('@/data/texas-lighthouse-map-points'),
          import('@/data/lighthouse-visitor-planning'),
        ]);
        const plans = new Map(lighthouseVisitorPlans.map((plan) => [plan.slug, plan]));
        const lighthouses = texasLighthouseMapPoints.map((point) => ({
          ...point,
          ...(plans.get(point.slug) ?? {}),
          canonicalHub: 'https://texasdefined.com/explore/lighthouses',
          canonicalArticle: point.articleHref ? `https://texasdefined.com${point.articleHref}` : null,
          countyGuide: `https://texasdefined.com${point.countyHref}`,
        }));
        const payload = {
          schemaVersion: 1,
          publisher: 'Texas Defined',
          canonicalCollection: 'https://texasdefined.com/explore/lighthouses',
          visitorGuide: 'https://texasdefined.com/article/best-lighthouses-to-visit-in-texas',
          asOf: '2026-08-21',
          scope: 'Source-backed Texas lighthouse locations, status and visitor-planning context. Official managing agencies and property owners control current access, hours, closures and permissions.',
          geographicCaveat: 'Sabine Pass Lighthouse stands on the Louisiana side of the Sabine while remaining part of the maritime history of the Texas-Louisiana boundary and Texas-side Sabine-Neches approach.',
          fields: {
            status: 'TexasDefined classification: visit, view-only, relocated or historic.',
            sourceUrl: 'Primary or institutional source used for the mapped lighthouse record.',
            publicAccess: 'Editorial summary of current visitor-access context; verify current conditions with the controlling source before travel.',
            planningNote: 'TexasDefined trip-planning synthesis, not a promise of access.',
          },
          count: lighthouses.length,
          lighthouses,
        };

        return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
          headers: {
            'content-type': 'application/json; charset=utf-8',
            'content-disposition': 'attachment; filename="texasdefined-texas-lighthouses.json"',
            'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});
