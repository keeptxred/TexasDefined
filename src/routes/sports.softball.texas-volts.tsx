import { createFileRoute } from '@tanstack/react-router';
const canonicalPath = '/sports/softball/texas-volts';
export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: 'Texas Volts: Round Rock Professional Softball & Dell Diamond' },
      { name: 'description', content: 'Texas Volts pro softball team, Dell Diamond in Round Rock, AUSL and Cat Osterman.' },
    ],
    links: [{ rel: 'canonical', href: 'https://texasdefined.com' + canonicalPath }],
  }),
});
