import { createFileRoute } from '@tanstack/react-router';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { AUTHORITATIVE_SOURCES } from '@/data/source-governance';
import { auditEntityMaintenanceHealth, ENTITY_MAINTENANCE_THRESHOLDS } from '@/platform/entity-maintenance';

export const Route = createFileRoute('/api/entity-maintenance')({
  server: {
    handlers: {
      GET: async () => {
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
