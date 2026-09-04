import {
  TEXAS_TOURNAMENT_ENTITIES,
  TEXAS_TOURNAMENTS,
  tournamentCategoryLabel,
  tournamentCountyName,
  tournamentsForCounty,
  type TexasTournamentCategory,
} from './texas-tournaments';

export interface CountyTournamentSeed {
  slug: string;
  name: string;
  categoryLabel: string;
  locationLabel: string;
  summary: string;
}

export interface TournamentCollectionItem {
  slug: string;
  href: string;
  name: string;
  city: string;
  countyName?: string;
  detail: string;
  sourceCheckedAt?: string;
}

export function loadCountyTournamentSeedsServer(countySlug: string): CountyTournamentSeed[] {
  return tournamentsForCounty(countySlug).map((tournament) => ({
    slug: tournament.slug,
    name: tournament.name,
    categoryLabel: tournamentCategoryLabel(tournament.category),
    locationLabel: tournament.locationLabel,
    summary: tournament.summary,
  }));
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
