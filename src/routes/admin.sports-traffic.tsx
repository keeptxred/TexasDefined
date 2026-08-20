import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/sports-traffic')({
  head: () => ({ meta: [
    { title: 'Sports Traffic Readiness | TexasDefined' },
    { name: 'robots', content: 'noindex,nofollow,noarchive' },
  ] }),
});
