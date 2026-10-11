import { createFileRoute } from '@tanstack/react-router';
const canonicalPath = '/sports/softball';
export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: 'Texas Women’s Softball: Teams, 2026 Champions, Colleges & UIL Guide' },
      { name: 'description', content: 'Texas women\'s softball guide: UIL champions, NCAA, NJCAA, pro Texas Volts, schedules and history.' },
    ],
    links: [{ rel: 'canonical', href: 'https://texasdefined.com' + canonicalPath }],
  }),
});
