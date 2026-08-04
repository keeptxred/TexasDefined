import { createFileRoute } from '@tanstack/react-router';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { auditInternalLinkQuality, INTERNAL_LINK_QUALITY_THRESHOLDS, internalLinkSurfaceStatus } from '@/platform/internal-link-quality';

export const Route = createFileRoute('/api/internal-link-quality')({
  server: {
    handlers: {
      GET: async () => {
        const graph = await loadTexasKnowledgeGraph();
        const report = auditInternalLinkQuality(graph);
        return Response.json(
          { generatedAt: new Date().toISOString(), report, thresholds: INTERNAL_LINK_QUALITY_THRESHOLDS, surfaces: internalLinkSurfaceStatus() },
          { headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } },
        );
      },
    },
  },
});
