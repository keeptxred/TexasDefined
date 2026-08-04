import { Link, createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { EntityMaintenanceHealth } from '@/components/admin/EntityMaintenanceHealth';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';

export const Route = createFileRoute('/admin/entity-maintenance')({
  head: () => ({ meta: [{ title: 'Entity maintenance | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  loader: async () => ({ graph: await loadTexasKnowledgeGraph() }),
  component: Page,
});

function Page() {
  const { graph } = Route.useLoaderData();
  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">TexasDefined Operations</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">Entity maintenance</h1>
    <p className="mt-4 max-w-3xl text-muted-foreground">Review stale records, authoritative source schedules, and Phase 3 promotion safety before updating the production graph.</p>
    <Link to="/admin/platform-health" className="mt-6 inline-flex text-sm font-medium text-primary underline underline-offset-4">Return to Platform Health</Link>
    <EntityMaintenanceHealth graph={graph} />
  </Container>;
}
