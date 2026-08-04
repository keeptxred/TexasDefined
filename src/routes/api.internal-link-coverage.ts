import { createFileRoute } from '@tanstack/react-router';
import { INTERNAL_LINK_SURFACES, internalLinkCoverageSummary } from '@/platform/internal-link-coverage';

export const Route = createFileRoute('/api/internal-link-coverage')({
  server: {
    handlers: {
      GET: async () => Response.json({
        generatedAt: new Date().toISOString(),
        summary: internalLinkCoverageSummary(),
        surfaces: INTERNAL_LINK_SURFACES,
      }, {
        headers: {
          'cache-control': 'no-store',
          'x-robots-tag': 'noindex, nofollow',
        },
      }),
    },
  },
});
