import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { description, stepNames, steps } from './find-my-school-district';

export const Route = createLazyFileRoute('/find-my-school-district')({
  component: Page,
});

function Page() {
  return (
    <>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <article className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/moving-to-texas">Moving Here</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">School districts</span>
          </nav>

          <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <p className="eyebrow text-primary">Schools and communities</p>
              <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Find the district that serves your address</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
            </div>
            <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">City limits, ZIP codes, district boundaries and attendance zones do not always line up. The exact address is what matters.</p>
          </header>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">The safest check</p><h2 className="mt-2 font-display text-3xl">Verify it in five steps</h2></div>
            <ol className="divide-y divide-border border-y border-border">
              {steps.map((step, index) => <li id={`school-step-${index + 1}`} key={step} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]"><span className="font-display text-3xl text-primary">{String(index + 1).padStart(2, '0')}</span><div><h3 className="font-display text-xl">{stepNames[index]}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{step}</p></div></li>)}
            </ol>
          </section>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Understand the system</p><h2 className="mt-2 font-display text-3xl">Put the address lookup in context</h2></div>
            <div className="border-y border-border py-6">
              <Link to="/article/texas-schools-family-life" className="group block">
                <span className="font-display text-2xl group-hover:text-primary">Texas Schools and Family Life</span>
                <span className="mt-2 block max-w-3xl text-sm leading-6 text-muted-foreground">Understand ISDs, STAAR, A–F ratings, charters, homeschooling, Pre-K, UIL, school taxes and the family logistics that matter after you identify the correct district.</span>
                <span className="mt-3 block text-sm font-semibold text-primary">Read the guide →</span>
              </Link>
            </div>
          </section>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Official sources</p><h2 className="mt-2 font-display text-3xl">Start with the people who draw the lines</h2></div>
            <div className="grid sm:grid-cols-2">
              <a className="group border-t border-border py-5 sm:px-5" href="https://tea.texas.gov/texas-schools" target="_blank" rel="noreferrer noopener"><span className="font-display text-xl group-hover:text-primary">Texas Education Agency</span><span className="ml-2 text-sm">↗</span></a>
              <a className="group border-t border-border py-5 sm:px-5" href="https://txschools.gov/" target="_blank" rel="noreferrer noopener"><span className="font-display text-xl group-hover:text-primary">TXschools.gov</span><span className="ml-2 text-sm">↗</span></a>
              <Link className="group border-t border-border py-5 sm:px-5" to="/browse/cities"><span className="font-display text-xl group-hover:text-primary">Find a city</span><span className="ml-2 text-sm">→</span></Link>
              <Link className="group border-t border-border py-5 sm:px-5" to="/browse/counties"><span className="font-display text-xl group-hover:text-primary">Find your county</span><span className="ml-2 text-sm">→</span></Link>
            </div>
          </section>

          <aside className="py-6 text-sm leading-6 text-muted-foreground">Before you sign a lease or contract, confirm the address directly with the district. The district has the final word on campus assignments and boundary changes.</aside>
        </article>
      </Container>
    </>
  );
}
