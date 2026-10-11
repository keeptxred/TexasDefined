import { createFileRoute, notFound } from '@tanstack/react-router';

// One optional-path authority route can host the statewide overview and every
// researched softball team. Team growth does not inflate the eager route tree.
const basePath = '/sports/softball';
const knownTeams = {
  'paris-junior-college': {
    title: 'Paris Junior College Lady Dragons Softball: Mr. Jack Butler & History',
    description: 'Paris JC Lady Dragons: 2026 NJCAA Final Four, 2025 NFCA regional coaching award and Mr. Jack Butler.',
  },
  'texas-volts': {
    title: 'Texas Volts: Round Rock Professional Softball & Dell Diamond',
    description: 'Texas Volts professional softball team in Round Rock: AUSL, Dell Diamond, Cat Osterman and team history.',
  },
} as const;
type TeamSlug = keyof typeof knownTeams;

export const Route = createFileRoute('/sports/softball/{-$team}')({
  beforeLoad: ({ params }) => {
    if (params.team && !(params.team in knownTeams)) throw notFound();
  },
  head: ({ params }) => {
    const team = params.team as TeamSlug | undefined;
    const profile = team ? knownTeams[team] : undefined;
    const canonicalPath = team ? basePath + '/' + team : basePath;
    return {
      meta: [
        { title: profile?.title ?? 'Texas Women’s Softball: Teams, Champions, Colleges & UIL Guide' },
        { name: 'description', content: profile?.description ?? 'Source-backed Texas women’s softball: UIL state champions, NCAA and NJCAA college teams, Texas Volts pro softball, youth leagues, records and history.' },
      ],
      links: [{ rel: 'canonical', href: 'https://texasdefined.com' + canonicalPath }],
    };
  },
});
