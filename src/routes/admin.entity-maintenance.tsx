import { Link, createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const EntityMaintenanceHealth = lazy(() =>
  import('@/components/admin/EntityMaintenanceHealth').then((module) => ({ default: module.EntityMaintenanceHealth })),
);

export const Route = createFileRoute('/admin/entity-maintenance')({
  head: () => ({ meta: [{ title: 'Entity maintenance | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  loader: async () => {
    const { loadTexasKnowledgeGraph } = await import('@/data/knowledge-graph');
    return { graph: await loadTexasKnowledgeGraph() };
  },
  component: EntityMaintenancePage,
});

function EntityMaintenancePage() {
  const { graph } = Route.useLoaderData();
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Admin · Phase 3</p>
        <h1 className="mt-2 font-display text-4xl">Entity maintenance</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">Review source freshness and entity health before staging or approving authoritative data changes.</p>
        <nav className="mt-5 flex flex-wrap gap-4 text-sm" aria-label="Entity maintenance tools">
          <Link to="/admin/entity-import-review" className="underline underline-offset-4">Import review</Link>
          <Link to="/admin/platform-health" className="underline underline-offset-4">Platform health</Link>
        </nav>
      </header>
      <Suspense fallback={<div className="mt-12 min-h-64" aria-hidden="true" />}>
        <EntityMaintenanceHealth graph={graph} />
      </Suspense>
    </main>
  );
}
