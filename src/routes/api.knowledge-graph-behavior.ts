import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/knowledge-graph-behavior')({
  server: {
    handlers: {
      GET: async () => {
        const [
          { loadTexasKnowledgeGraph },
          { auditKnowledgeGraphBehavior, GRAPH_BEHAVIOR_THRESHOLDS },
          { auditKnowledgeGraphRegression, GRAPH_REGRESSION_THRESHOLDS },
        ] = await Promise.all([
          import('@/data/knowledge-graph'),
          import('@/platform/knowledge-graph-behavior'),
          import('@/platform/knowledge-graph-regression'),
        ]);
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
