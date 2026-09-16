import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/partner-referrals')({
  head: () => ({
    meta: [
      { title: 'Partner Referral Analytics | TexasDefined' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
    ],
  }),
});
