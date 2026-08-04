import { createFileRoute } from '@tanstack/react-router';
import { INTERNAL_LINK_POLICIES } from '@/platform/internal-link-policies';

export const Route = createFileRoute('/api/internal-link-policies')({
  server: {
    handlers: {
      GET: async () => Response.json({
        generatedAt: new Date().toISOString(),
        policies: Object.values(INTERNAL_LINK_POLICIES),
      }, {
        headers: {
          'cache-control': 'no-store',
          'x-robots-tag': 'noindex, nofollow',
        },
      }),
    },
  },
});
