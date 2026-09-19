import type { SearchDocument } from './types';
import {
  TEXAS_HOCKEY_ACTIVE_TEAMS,
  TEXAS_HOCKEY_LEAGUES,
  TEXAS_HOCKEY_VENUES,
  findTexasHockeyLeague,
  texasHockeyLeaguePath,
  texasHockeyTeamPath,
  texasHockeyVenuePath,
} from './texas-hockey';

export function buildTexasHockeySearchDocuments(): SearchDocument[] {
  const hub: SearchDocument = {
    id: 'sports-collection:texas-hockey',
    brandId: 'texasdefined',
    kind: 'sports-collection',
    title: 'Texas Hockey Teams, Leagues and Arenas',
    summary: 'Statewide TexasDefined directory of current NHL, AHL, ECHL, NAHL, NA3HL and college hockey teams, home ice and hockey travel context.',
    keywords: ['Texas hockey', 'Texas hockey teams', 'Texas ice hockey', 'hockey teams in Texas', 'Texas hockey arenas', 'Texas junior hockey', 'Texas college hockey'],
    href: '/texas-hockey',
  };

  const leagues: SearchDocument[] = TEXAS_HOCKEY_LEAGUES.map((league) => ({
    id: `hockey-league:${league.slug}`,
    brandId: 'texasdefined',
    kind: 'sports-collection',
    title: `${league.abbreviation} Hockey in Texas`,
    summary: league.description,
    keywords: [league.abbreviation, league.name, `${league.abbreviation} Texas`, 'Texas hockey league', league.level + ' hockey'],
    href: texasHockeyLeaguePath(league.slug),
  }));

  const teams: SearchDocument[] = TEXAS_HOCKEY_ACTIVE_TEAMS.map((team) => {
    const league = findTexasHockeyLeague(team.leagueSlug);
    return {
      id: `hockey-team:${team.slug}`,
      brandId: 'texasdefined',
      kind: 'sports-team',
      title: team.name,
      summary: team.overview,
      keywords: [...new Set([
        team.name,
        team.city,
        team.countySlug.replaceAll('-', ' '),
        team.homeVenueName,
        team.secondaryVenueName,
        league?.abbreviation,
        league?.name,
        team.division,
        'Texas hockey team',
        'ice hockey',
      ].filter((value): value is string => Boolean(value)))],
      href: texasHockeyTeamPath(team.slug),
    };
  });

  const venues: SearchDocument[] = TEXAS_HOCKEY_VENUES.map((venue) => ({
    id: `hockey-venue:${venue.slug}`,
    brandId: 'texasdefined',
    kind: 'sports-venue',
    title: venue.name,
    summary: venue.overview,
    keywords: [...new Set([
      venue.name,
      venue.city,
      venue.countySlug.replaceAll('-', ' '),
      ...venue.teamSlugs,
      'Texas hockey venue',
      'ice rink',
      'hockey arena',
    ])],
    href: texasHockeyVenuePath(venue.slug),
  }));

  return [hub, ...leagues, ...teams, ...venues];
}

export default buildTexasHockeySearchDocuments;
