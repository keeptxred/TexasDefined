import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/newsletter')({
  head: () => ({
    meta: [
      { title: 'Newsletter Operations | TexasDefined' },
      { name: 'robots', content: 'noindex, nofollow, noarchive' },
    ],
  }),
});
