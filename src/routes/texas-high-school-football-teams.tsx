import { createFileRoute } from '@tanstack/react-router';

const canonicalPath = '/texas-high-school-football-teams';

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: 'Texas High School Football Team Finder: UIL Class, District & ISD' },
      { name: 'description', content: 'Look up Texas high school football programs by school, ISD, city or county. See current 2026–28 UIL classification, division, district and six-man or 11-man placement.' },
    ],
    links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
  }),
});
