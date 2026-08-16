import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/fishing-review')({
  head: () => ({
    meta: [
      { title: 'Fishing Editorial Review | TexasDefined' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
    ],
  }),
});
