import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/network-applications')({
  head: () => ({ meta: [{ title: 'Network Applications | TexasDefined Admin' }, { name: 'robots', content: 'noindex,nofollow,noarchive' }] }),
});
