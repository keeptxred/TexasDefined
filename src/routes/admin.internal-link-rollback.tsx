import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/internal-link-rollback')({
  head: () => ({ meta: [{ title: 'Internal-link rollback | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
});
