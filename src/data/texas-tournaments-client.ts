import { createServerFn } from '@tanstack/react-start';

const loadTournamentEntity = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadTournamentEntityServer } = await import('./texas-tournaments.server');
    return loadTournamentEntityServer(data.slug);
  });

export function getTournamentEntity(slug: string) {
  return loadTournamentEntity({ data: { slug } });
}
