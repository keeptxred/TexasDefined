import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/stay-monetization')({
  head: () => ({ meta: [
    { title: 'Stay Monetization Readiness | TexasDefined' },
    { name: 'robots', content: 'noindex,nofollow,noarchive' },
  ] }),
});
