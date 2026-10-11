import { createFileRoute, notFound } from '@tanstack/react-router';
const base = '/sports/softball';
const teamNames = {
  'paris-junior-college': 'Paris Junior College Lady Dragons',
  'texas-volts': 'Texas Volts',
  'schools': '2026–27 UIL Softball Schools and Districts',
} as const;
export const Route = createFileRoute('/sports/softball/{-$team}')({
  beforeLoad: ({ params }) => {
    if (params.team && !(params.team in teamNames)) throw notFound();
  },
  head: ({ params }) => {
    const team = params.team;
    const canonicalPath = base + (team ? '/' + team : '');
    return {
      meta: [
        { title: team === 'paris-junior-college'
          ? 'Paris Junior College Lady Dragons Softball: History and Jack Butler'
          : team === 'schools'
            ? 'Texas UIL Softball Schools and Districts: Complete 2026–27 Directory'
          : team === 'texas-volts'
            ? 'Texas Volts: Round Rock Professional Softball'
            : 'Texas Women’s Softball: Teams, Champions and College Guide' },
        { name: 'description', content: team === 'paris-junior-college'
          ? 'PJC Lady Dragons: NJCAA postseason history, 2025 NFCA regional award, and Mr. Jack Butler.'
          : team === 'schools'
            ? 'Search all 1,192 official UIL softball alignment listings, 160 districts and five conference documents, with free source-linked CSV.'
          : team === 'texas-volts'
            ? 'Texas Volts softball, Dell Diamond, Round Rock, AUSL and Cat Osterman.'
            : 'Texas UIL softball champions, NCAA and NJCAA college teams, professional leagues and official records.' },
      ],
      links: [{ rel: 'canonical', href: 'https://texasdefined.com' + canonicalPath }],
    };
  },
});
