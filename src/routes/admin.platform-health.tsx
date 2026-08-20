import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/platform-health')({
  head: () => ({ meta: [{ title: 'Platform Health | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  loader: async () => {
    const [{ loadTexasKnowledgeGraph }, { auditTexasKnowledgeGraph }, { auditInternalLinkQuality }] = await Promise.all([
      import('@/data/knowledge-graph'),
      import('@/data/knowledge-graph/audit'),
      import('@/platform/internal-link-quality'),
    ]);
    const graph = await loadTexasKnowledgeGraph();
    return { graph, audit: auditTexasKnowledgeGraph(graph), linkQuality: auditInternalLinkQuality(graph) };
  },
});
