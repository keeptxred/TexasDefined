import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { RelocationServiceFinder } from '@/components/relocation/RelocationServiceFinder';
import { stepNames, steps } from './find-my-school-district';

export const Route = createLazyFileRoute('/find-my-school-district')({
  component: Page,
});

function Page() {
  return <>
    <RelocationServiceFinder kind="school" />

    <Container className="-mt-10 pb-16 sm:pb-24">
      <section className="mx-auto max-w-6xl border-t border-border pt-10" aria-labelledby="school-verification-heading">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link to="/moving-to-texas">Moving to Texas</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">School district verification</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Before you commit</p>
            <h2 id="school-verification-heading" className="mt-2 font-display text-3xl">Verify the exact address in five steps</h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {steps.map((text, index) => (
              <section id={`school-step-${index + 1}`} key={stepNames[index]} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr]">
                <span className="font-display text-2xl text-primary">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-xl">{stepNames[index]}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-sm">
          <Link to="/moving-to-texas/tools" className="font-semibold text-primary underline underline-offset-4">Open the complete Texas relocation toolkit →</Link>
        </div>
      </section>
    </Container>
  </>;
}
