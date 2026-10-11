import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { applyCurrentEntityCorrections } from '@/data/knowledge-graph/current-entity-corrections';
import { isIndexableEntityPage } from '@/data/knowledge-graph/relationships';
import { getActiveSportsSponsorPlacement } from '@/data/sports-sponsorship.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Browse major Texas stadiums, arenas, racetracks, golf courses, ballparks, high-school football landmarks, rodeo grounds and tournament complexes, including professional, college, motorsports and regional visitor draws.';

export const Route = createFileRoute('/sports-venues')({
  loader: async () => {
    const { entitiesByKind } = await import('@/data/knowledge-graph');
    return {
      venues: entitiesByKind('sports-venue')
        .filter(isIndexableEntityPage)
        .map(applyCurrentEntityCorrections)
        .sort((a, b) => a.name.localeCompare(b.name)),
      sponsorPlacement: await getActiveSportsSponsorPlacement({ data: { surfacePath: '/sports-venues' } }),
    };
  },
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: 'Texas Stadiums, Arenas, Racetracks, Golf & Sports Venues',
      description,
      canonicalPath: '/sports-venues',
    }),
    links: [canonicalLink(texasDefinedBrand, '/sports-venues')],
  }),
});

