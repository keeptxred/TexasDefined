import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/analytics-quality')({
  head: () => ({
    meta: [
      { title: 'Analytics Quality | TexasDefined' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
    ],
  }),
});
