import { createServerFn } from '@tanstack/react-start';

const loadChampionshipHistory = createServerFn({ method: 'GET' }).handler(async () => {
  const { loadFootballChampionshipHistory } = await import('./football-championship-history.server');
  return loadFootballChampionshipHistory();
});

export function getFootballChampionshipHistoryPage() {
  return loadChampionshipHistory();
}
