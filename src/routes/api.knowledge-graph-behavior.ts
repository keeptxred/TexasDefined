import { createFileRoute } from '@tanstack/react-router';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { auditKnowledgeGraphBehavior, GRAPH_BEHAVIOR_THRESHOLDS } from '@/platform/knowledge-graph-behavior';
import { auditKnowledgeGraphRegression, GRAPH_REGRESSION_THRESHOLDS } from '@/platform/knowledge-graph-regression';

export const Route = createFileRoute('/api/knowledge-graph-behavior')({
  server: {
    handlers: {
      GET: async () => {
        const graph = await loadTexasKnowledgeGraph();
        const report = auditKnowledgeGraphBehavior(graph);
        const regression = auditKnowledgeGraphRegression(graph);
        const healthy = report.healthy && regression.healthy;
        return Response.json({
          generatedAt: new Date().toISOString(),
          thresholds: {
            behavior: GRAPH_BEHAVIOR_THRESHOLDS,
            regression: GRAPH_REGRESSION_THRESHOLDS,
          },
          report,
          regression,
        }, {
          status: healthy ? 200 : 503,
          headers: {
            'cache-control': 'no-store',
            'x-robots-tag': 'noindex, nofollow',
          },
        });
      },
    },
  },
});
