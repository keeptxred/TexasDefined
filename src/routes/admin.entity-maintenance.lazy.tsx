import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { EntityMaintenanceHealth } from '@/components/admin/EntityMaintenanceHealth';

export const Route = createLazyFileRoute('/admin/entity-maintenance')({ component: Page });

function Page() {
  const { graph } = Route.useLoaderData();
  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">TexasDefined Operations</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">Entity maintenance</h1>
    <p className="mt-4 max-w-3xl text-muted-foreground">Review stale records, authoritative source schedules, URL health, quarantine rules, and promotion safety before updating the production graph.</p>
    <div className="mt-6 flex flex-wrap gap-4 text-sm">
      <Link to="/admin/entity-import-review" className="font-medium text-primary underline underline-offset-4">Review an import</Link>
      <Link to="/admin/platform-health" className="font-medium text-primary underline underline-offset-4">Return to Platform Health</Link>
    </div>
    <EntityMaintenanceHealth graph={graph} />
  </Container>;
}
