import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { RelocationServiceFinder } from '@/components/relocation/RelocationServiceFinder';

export const Route = createLazyFileRoute('/find-my-school-district')({
  component: Page,
});

function Page() {
  return <>
    <RelocationServiceFinder kind="school" />
    <Container className="-mt-10 pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl border-t border-border pt-6 text-sm">
        <Link to="/moving-to-texas/tools" className="font-semibold text-primary underline underline-offset-4">Open the complete Texas relocation toolkit →</Link>
      </div>
    </Container>
  </>;
}
