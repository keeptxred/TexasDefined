import { createFileRoute } from '@tanstack/react-router';

const canonicalPath = '/texas-high-school-football-teams';

export const Route = createFileRoute(canonicalPath)({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === 'string' ? search.q.trim().replace(/\s+/g, ' ').slice(0, 100) : '',
  }),
  head: () => ({
    meta: [
      { title: 'Texas High School Football Team Finder: UIL Class, District & ISD' },
      { name: 'description', content: 'Look up Texas high school football programs by school, ISD, city or county. See current 2026–28 UIL classification, division, district and six-man or 11-man placement.' },
    ],
    links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
  }),
});
