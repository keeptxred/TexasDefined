import { createFileRoute } from '@tanstack/react-router';

import { getFootballProgramDirectoryPage } from '@/data/high-school-football/football-program-profile.functions';

const canonicalPath = '/texas-high-school-football-teams';

export const Route = createFileRoute(canonicalPath)({
  loader: async () => ({
    programs: await getFootballProgramDirectoryPage(),
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === 'string' ? search.q.trim().replace(/\s+/g, ' ').slice(0, 100) : '',
  }),
  head: () => ({
    meta: [
      { title: 'Texas High School Football Teams: All 1,268 UIL Programs' },
      { name: 'description', content: 'Browse all 1,268 current UIL Texas high school football programs, ordered from 6A through 1A, or search by school, ISD, city or county.' },
    ],
    links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
  }),
});
