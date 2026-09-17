import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/advertisers')({
  head: () => ({
    meta: [
      { title: 'Advertiser Operations | TexasDefined' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
    ],
  }),
});
