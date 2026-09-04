import { createServerFn } from '@tanstack/react-start';

const loadCountyTournamentSeeds = createServerFn({ method: 'GET' })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { tournamentCategoryLabel, tournamentsForCounty } = await import('./texas-tournaments');
    return tournamentsForCounty(data.countySlug).map((tournament) => ({
      slug: tournament.slug,
      name: tournament.name,
      categoryLabel: tournamentCategoryLabel(tournament.category),
      locationLabel: tournament.locationLabel,
      summary: tournament.summary,
    }));
  });

const loadTournamentEntity = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { TEXAS_TOURNAMENT_ENTITIES } = await import('./texas-tournaments');
    return TEXAS_TOURNAMENT_ENTITIES.find((entity) => entity.slug === data.slug) ?? null;
  });

export function getCountyTournamentSeeds(countySlug: string) {
  return loadCountyTournamentSeeds({ data: { countySlug } });
}

export function getTournamentEntity(slug: string) {
  return loadTournamentEntity({ data: { slug } });
}
