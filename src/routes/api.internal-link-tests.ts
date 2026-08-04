import { createFileRoute } from '@tanstack/react-router';
import { runInternalLinkGoldenCorpus } from '@/platform/internal-link-test-corpus';

export const Route = createFileRoute('/api/internal-link-tests')({
  server: {
    handlers: {
      GET: async () => {
        const report = runInternalLinkGoldenCorpus();
        return Response.json({ generatedAt: new Date().toISOString(), ...report }, {
          status: report.passed ? 200 : 503,
          headers: {
            'cache-control': 'no-store',
            'x-robots-tag': 'noindex, nofollow',
          },
        });
      },
    },
  },
});
