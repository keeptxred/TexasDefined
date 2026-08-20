import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/entity-maintenance')({
  head: () => ({ meta: [{ title: 'Entity maintenance | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  loader: async () => {
    const { loadTexasKnowledgeGraph } = await import('@/data/knowledge-graph');
    return { graph: await loadTexasKnowledgeGraph() };
  },
});
