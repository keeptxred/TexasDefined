import {
  TEXAS_TOURNAMENTS,
  tournamentCountyName,
} from './texas-tournaments';
import {
  TEXAS_TOURNAMENT_CATEGORIES,
  type TexasTournamentCategory,
} from './texas-tournament-collections';
import { verifiedTournamentBySlug } from './tournaments/verified-profiles';

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

  return tournaments.map((tournament) => {
    const verified = verifiedTournamentBySlug(tournament.slug);
    return {
      slug: tournament.slug,
      href: verified ? `/tournament/${tournament.slug}` : category ? '/events/tournaments' : categoryPathBySlug.get(tournament.category) ?? '/events/tournaments',
      name: verified?.name ?? tournament.name,
      city: verified?.city ?? tournament.locationLabel,
      countyName: verified?.countyName ?? tournamentCountyName(tournament.countySlug),
      detail: verified ? `${verified.dateLabel} · ${verified.venue} · ${verified.summary}` : `${tournament.locationLabel} · ${tournament.summary}`,
      sourceCheckedAt: verified?.sourceCheckedAt,
    };
  });
}
