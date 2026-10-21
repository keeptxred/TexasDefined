import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { getProTeamsIndex } from '@/data/pro-teams.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

export const Route = createFileRoute('/sports/teams')({
  loader: () => getProTeamsIndex(),
  head: () => ({ meta: buildMeta(texasDefinedBrand, { title: 'Texas Pro Teams: Tickets & Game Weekend Guides', description: 'Plan a Texas sports trip around NFL, NBA, MLB, NHL, MLS, WNBA and NWSL teams: home games, tickets, team history, hotels and weekend ideas.', canonicalPath: '/sports/teams' }), links: [canonicalLink(texasDefinedBrand, '/sports/teams')] }),
});
