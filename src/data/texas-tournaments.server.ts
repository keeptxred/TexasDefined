import {
  TEXAS_TOURNAMENT_ENTITIES,
  TEXAS_TOURNAMENTS,
  tournamentCountyName,
  type TexasTournamentCategory,
} from './texas-tournaments';

export interface TournamentCollectionItem {
  slug: string;
  href: string;
  name: string;
  city: string;
  countyName?: string;
  detail: string;
  sourceCheckedAt?: string;
}

export function loadTournamentCollectionItemsServer(category?: TexasTournamentCategory): TournamentCollectionItem[] {
  const tournaments = category
    ? TEXAS_TOURNAMENTS.filter((tournament) => tournament.category === category)
    : TEXAS_TOURNAMENTS;

  return tournaments.map((tournament) => ({
    slug: tournament.slug,
    href: `/tournament/${tournament.slug}`,
    name: tournament.name,
    city: tournament.locationLabel,
    countyName: tournamentCountyName(tournament.countySlug),
    detail: `${tournament.locationLabel} · ${tournament.summary}`,
    sourceCheckedAt: undefined,
  }));
}

export function loadTournamentEntityServer(slug: string) {
  return TEXAS_TOURNAMENT_ENTITIES.find((entity) => entity.slug === slug) ?? null;
}
