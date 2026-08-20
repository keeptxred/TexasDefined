import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/entity-import-review')({
  head: () => ({ meta: [{ title: 'Entity import review | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
});
