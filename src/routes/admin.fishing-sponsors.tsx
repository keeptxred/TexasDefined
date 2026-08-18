import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/fishing-sponsors')({
  head: () => ({ meta: [{ title: 'Fishing Sponsorships | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow,noarchive' }] }),
});
