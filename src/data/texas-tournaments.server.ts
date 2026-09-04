import {
  TEXAS_TOURNAMENT_ENTITIES,
  tournamentCategoryLabel,
  tournamentsForCounty,
} from './texas-tournaments';

export interface CountyTournamentSeed {
  slug: string;
  name: string;
  categoryLabel: string;
  locationLabel: string;
  summary: string;
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

export function loadTournamentEntityServer(slug: string) {
  return TEXAS_TOURNAMENT_ENTITIES.find((entity) => entity.slug === slug) ?? null;
}
