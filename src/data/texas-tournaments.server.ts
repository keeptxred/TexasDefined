import {
  TEXAS_TOURNAMENTS,
  tournamentCountyName,
} from './texas-tournaments';
import {
  TEXAS_TOURNAMENT_CATEGORIES,
  type TexasTournamentCategory,
} from './texas-tournament-collections';

export interface TournamentCollectionItem {
  slug: string;
  href: string;
  name: string;
  city: string;
  countyName?: string;
  detail: string;
  sourceCheckedAt?: string;
}

const categoryPathBySlug = new Map(
  TEXAS_TOURNAMENT_CATEGORIES.map((category) => [category.slug, category.path]),
);

export function loadTournamentCollectionItemsServer(category?: TexasTournamentCategory): TournamentCollectionItem[] {
  const tournaments = category
    ? TEXAS_TOURNAMENTS.filter((tournament) => tournament.category === category)
    : TEXAS_TOURNAMENTS;

  return tournaments.map((tournament) => ({
    slug: tournament.slug,
    href: category ? '/events/tournaments' : categoryPathBySlug.get(tournament.category) ?? '/events/tournaments',
    name: tournament.name,
    city: tournament.locationLabel,
    countyName: tournamentCountyName(tournament.countySlug),
    detail: `${tournament.locationLabel} · ${tournament.summary}`,
    sourceCheckedAt: undefined,
  }));
}
