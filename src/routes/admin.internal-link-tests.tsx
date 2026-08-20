import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/internal-link-tests')({
  head: () => ({ meta: [{ title: 'Internal-link tests | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
});
