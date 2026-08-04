import { Link, createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { EntityImportReview } from '@/components/admin/EntityImportReview';

export const Route = createFileRoute('/admin/entity-import-review')({
  head: () => ({ meta: [{ title: 'Entity import review | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  component: Page,
});

function Page() {
  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">TexasDefined Operations</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">Entity import review</h1>
    <p className="mt-4 max-w-3xl text-muted-foreground">Review proposed authoritative-source changes, quarantine unsafe records, and inspect promotion blockers before any governed write.</p>
    <EntityImportReview />
    <div className="mt-8 flex flex-wrap gap-4 text-sm">
      <Link to="/admin/entity-maintenance" className="font-medium text-primary">Entity maintenance</Link>
      <Link to="/admin/platform-health" className="font-medium text-primary">Platform Health</Link>
    </div>
  </Container>;
}
