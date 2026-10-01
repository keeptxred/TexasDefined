import { createFileRoute } from '@tanstack/react-router';

import {
  getFootballProgramDirectoryPage,
  getPrivateFootballProgramDirectoryPage,
} from '@/data/high-school-football/football-program-profile.functions';

const canonicalPath = '/texas-high-school-football-teams';

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const [programs, privatePrograms] = await Promise.all([
      getFootballProgramDirectoryPage(),
      getPrivateFootballProgramDirectoryPage(),
    ]);
    return { programs, privatePrograms };
  },
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === 'string' ? search.q.trim().replace(/\s+/g, ' ').slice(0, 100) || undefined : undefined,
  }),
  head: () => ({
    meta: [
      { title: 'Texas High School Football Teams: All 1,268 UIL Programs' },
      { name: 'description', content: 'Browse all 1,268 current UIL Texas high school football programs, ordered from 6A through 1A, plus source-backed private and non-UIL program guides.' },
    ],
    links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
  }),
});