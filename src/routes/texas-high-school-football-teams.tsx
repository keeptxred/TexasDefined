import { createFileRoute } from '@tanstack/react-router';

import { getFootballProgramDirectoryPage } from '@/data/high-school-football/football-program-profile.functions';
import { privateFootballProgramDirectoryEntries } from '@/data/high-school-football/football-sitemap.server';

const canonicalPath = '/texas-high-school-football-teams';

export const Route = createFileRoute(canonicalPath)({
  loader: async () => ({
    programs: await getFootballProgramDirectoryPage(),
    privatePrograms: privateFootballProgramDirectoryEntries(),
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === 'string' ? search.q.trim().replace(/\s+/g, ' ').slice(0, 100) || undefined : undefined,
  }),
  head: () => ({
    meta: [
      { title: 'Texas High School Football Teams: All 1,268 UIL Programs' },
      { name: 'description', content: 'Browse all 1,268 current UIL Texas high school football programs, plus separately identified private-school football profiles, or search by school, ISD, city or county.' },
    ],
    links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
  }),
});
