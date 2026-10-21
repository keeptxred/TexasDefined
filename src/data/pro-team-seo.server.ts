import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

export function proTeamsIndexMetadata() {
  return { title: 'Texas Pro Teams: Tickets & Game Weekend Guides', description: 'Plan a Texas sports trip around NFL, NBA, MLB, NHL, MLS, WNBA and NWSL teams: home games, tickets, team history, hotels and weekend ideas.', canonicalPath: '/sports/teams' };
}
export function proTeamGuideHead(team: { slug: string; name: string; sport: string; league: string; city: string; officialUrl: string }, photo: { imageUrl: string; alt: string } | null) {
  const path = `/sports/teams/${team.slug}`;
  const url = `https://texasdefined.com${path}`;
  return { meta: buildMeta(texasDefinedBrand, { title: `${team.name}: Tickets, History & Weekend Guide`, description: `Plan a ${team.name} trip: home games and tickets, season record, team history, where to stay and a ${team.city} game-weekend itinerary.`, canonicalPath: path, image: photo?.imageUrl, imageAlt: photo?.alt }), links: [canonicalLink(texasDefinedBrand, path)], scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'SportsTeam', '@id': `${url}#team`, name: team.name, sport: team.sport, url, sameAs: team.officialUrl, memberOf: { '@type': 'SportsOrganization', name: team.league } },
    { '@type': 'WebPage', '@id': `${url}#page`, url, name: `${team.name} game weekend guide`, mainEntity: { '@id': `${url}#team` } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Texas Sports', item: 'https://texasdefined.com/sports' }, { '@type': 'ListItem', position: 2, name: 'Pro teams', item: 'https://texasdefined.com/sports/teams' }, { '@type': 'ListItem', position: 3, name: team.name, item: url }] },
  ] }) }] };
}
