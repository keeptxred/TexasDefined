import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/knowledge-graph-behavior')({
  head: () => ({ meta: [{ title: 'Knowledge-graph behavior | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  loader: async () => {
    const { loadTexasKnowledgeGraph } = await import('@/data/knowledge-graph');
    return { graph: await loadTexasKnowledgeGraph() };
  },
});
