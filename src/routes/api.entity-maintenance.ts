import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/entity-maintenance')({
  server: {
    handlers: {
      GET: async () => {
        const [{ loadTexasKnowledgeGraph }, { AUTHORITATIVE_SOURCES }, { auditEntityMaintenanceHealth, ENTITY_MAINTENANCE_THRESHOLDS }] = await Promise.all([
          import('@/data/knowledge-graph'),
          import('@/data/source-governance'),
          import('@/platform/entity-maintenance'),
        ]);
        const graph = await loadTexasKnowledgeGraph();
        const report = auditEntityMaintenanceHealth(graph, AUTHORITATIVE_SOURCES);
        return Response.json({ generatedAt: new Date().toISOString(), thresholds: ENTITY_MAINTENANCE_THRESHOLDS, report }, {
          status: report.healthy ? 200 : 503,
          headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' },
        });
      },
    },
  },
});
