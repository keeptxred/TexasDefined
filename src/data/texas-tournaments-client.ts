import { createServerFn } from '@tanstack/react-start';

const loadCountyTournamentSeeds = createServerFn({ method: 'GET' })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { loadCountyTournamentSeedsServer } = await import('./texas-tournaments.server');
    return loadCountyTournamentSeedsServer(data.countySlug);
  });

const loadTournamentEntity = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadTournamentEntityServer } = await import('./texas-tournaments.server');
    return loadTournamentEntityServer(data.slug);
  });

export function getCountyTournamentSeeds(countySlug: string) {
  return loadCountyTournamentSeeds({ data: { countySlug } });
}

export function getTournamentEntity(slug: string) {
  return loadTournamentEntity({ data: { slug } });
}
