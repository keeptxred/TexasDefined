import { createFileRoute } from '@tanstack/react-router';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { auditKnowledgeGraphBehavior, GRAPH_BEHAVIOR_THRESHOLDS } from '@/platform/knowledge-graph-behavior';

export const Route = createFileRoute('/api/knowledge-graph-behavior')({
  server: {
    handlers: {
      GET: async () => {
        const graph = await loadTexasKnowledgeGraph();
        const report = auditKnowledgeGraphBehavior(graph);
        return Response.json({
          generatedAt: new Date().toISOString(),
          thresholds: GRAPH_BEHAVIOR_THRESHOLDS,
          report,
        }, {
          status: report.healthy ? 200 : 503,
          headers: {
            'cache-control': 'no-store',
            'x-robots-tag': 'noindex, nofollow',
          },
        });
      },
    },
  },
});
