import { createFileRoute } from '@tanstack/react-router';

import { getFootballIsdDirectoryPage } from '@/data/high-school-football/football-isds.functions';

const canonicalPath = '/texas-high-school-football-isds';

export const Route = createFileRoute(canonicalPath)({
  loader: async () => getFootballIsdDirectoryPage(),
  head: () => ({
    meta: [
      { title: 'Texas High School Football by ISD: District Football Program Directory' },
      {
        name: 'description',
        content: 'Browse Texas ISDs with current UIL football programs, then open each district to see its high schools ordered from 6A through 1A with enrollment and school-profile links.',
      },
    ],
    links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
  }),
});
