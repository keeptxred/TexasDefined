import { createFileRoute } from '@tanstack/react-router';
const canonicalPath = '/sports/softball/paris-junior-college';
export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: 'Paris Junior College Lady Dragons Softball: Mr. Jack Butler & History' },
      { name: 'description', content: 'Paris JC Lady Dragons softball: 2026 Final Four, 2025 NFCA award, coaches and Mr. Jack Butler\'s legacy.' },
    ],
    links: [{ rel: 'canonical', href: 'https://texasdefined.com' + canonicalPath }],
  }),
});
