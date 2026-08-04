import { Link, createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { InternalLinkGoldenCorpus } from '@/components/admin/InternalLinkGoldenCorpus';

export const Route = createFileRoute('/admin/internal-link-tests')({
  head: () => ({ meta: [{ title: 'Internal-link tests | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  component: Page,
});

function Page() {
  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">TexasDefined Operations</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">Internal-link tests</h1>
    <p className="mt-4 max-w-3xl text-muted-foreground">Run the deterministic Phase 2 golden corpus against the production resolver. This page is diagnostic and read-only.</p>
    <p className="mt-5"><Link to="/admin/platform-health" className="font-medium underline underline-offset-4">Return to Platform Health</Link></p>
    <InternalLinkGoldenCorpus />
  </Container>;
}
