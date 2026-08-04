import { Link, createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { InternalLinkRollbackPreview } from '@/components/admin/InternalLinkRollbackPreview';

export const Route = createFileRoute('/admin/internal-link-rollback')({
  head: () => ({ meta: [{ title: 'Internal-link rollback | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  component: Page,
});

function Page() {
  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">TexasDefined Operations</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">Policy rollback</h1>
    <p className="mt-4 max-w-3xl text-muted-foreground">Review the exact governed policy differences before preparing any future rollback release. This page is read-only.</p>
    <div className="mt-6"><Link to="/admin/platform-health" className="text-sm font-medium underline underline-offset-4">Return to Platform Health</Link></div>
    <InternalLinkRollbackPreview />
  </Container>;
}
