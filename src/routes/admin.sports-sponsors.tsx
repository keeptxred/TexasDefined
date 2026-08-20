import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/sports-sponsors')({
  head: () => ({
    meta: [
      { title: 'Sports Sponsorships | TexasDefined' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
    ],
  }),
});
