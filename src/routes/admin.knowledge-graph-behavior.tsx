import { Link, createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { KnowledgeGraphBehavior } from '@/components/admin/KnowledgeGraphBehavior';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';

export const Route = createFileRoute('/admin/knowledge-graph-behavior')({
  head: () => ({ meta: [{ title: 'Knowledge-graph behavior | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  loader: async () => ({ graph: await loadTexasKnowledgeGraph() }),
  component: Page,
});

function Page() {
  const { graph } = Route.useLoaderData();
  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">TexasDefined Operations</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">Knowledge-graph behavior</h1>
    <p className="mt-4 max-w-3xl text-muted-foreground">Graph-wide reachability, authority propagation, canonical paths, completeness, release thresholds, and AI retrieval benchmarks.</p>
    <p className="mt-4"><Link to="/admin/platform-health" className="underline">Return to Platform Health</Link></p>
    <KnowledgeGraphBehavior graph={graph} />
  </Container>;
}
