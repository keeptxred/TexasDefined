import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/sports-partners')({
  head: () => ({
    meta: [
      { title: 'Sports Partner Leads | TexasDefined' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
    ],
  }),
});
