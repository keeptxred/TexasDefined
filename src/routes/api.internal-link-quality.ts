import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/internal-link-quality')({
  server: {
    handlers: {
      GET: async () => {
        const [{ loadTexasKnowledgeGraph }, { auditInternalLinkQuality, INTERNAL_LINK_QUALITY_THRESHOLDS, internalLinkSurfaceStatus }] = await Promise.all([
          import('@/data/knowledge-graph'),
          import('@/platform/internal-link-quality'),
        ]);
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
