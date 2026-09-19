import { lazy, Suspense } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { LazyRelocationServiceFinder } from '@/components/relocation/LazyRelocationServiceFinder';

const HighSchoolFootballLookup = lazy(() =>
  import('@/components/sports/HighSchoolFootballLookup').then((module) => ({ default: module.HighSchoolFootballLookup })),
);

const steps=['Start with the Texas Education Agency’s official school and district pages.','Enter the exact property address in an official district or county map.','Confirm the assigned campus directly with the district.','Ask about planned boundary changes, transfers or new-campus assignments.','Keep written confirmation when a home purchase or lease depends on the answer.'] as const;
const stepNames=['Start with the state school pages','Check the exact address','Confirm the assigned campus','Ask about boundary changes','Keep the answer in writing'] as const;

export const Route=createLazyFileRoute('/find-my-school-district')({component:Page});

function Page(){
  return <>
    <Container className="pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/moving-to-texas">Moving to Texas</Link><span className="mx-2">/</span><span aria-current="page">Find my school district</span>
      </nav>
    </Container>

    <LazyRelocationServiceFinder kind="school"/>

    <Container className="-mt-10 pb-16 sm:pb-24">
      <article className="mx-auto max-w-6xl border-t border-border pt-10">
        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Football & the move</p>
            <h2 className="mt-2 font-display text-3xl">Research the football program after you identify the ISD</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">A district boundary answers where a student may attend; it does not tell you whether a football program fits your son. Search the high school or ISD separately, then compare the program alongside the rest of the school decision.</p>
          </div>
          <Suspense fallback={<p className="py-6 text-sm text-muted-foreground">Loading the Texas high-school football finder…</p>}>
            <HighSchoolFootballLookup
              compact
              heading="Look up the high school or ISD"
              intro="See current UIL classification, football division, district and six-man or 11-man placement, plus TEA school/ISD/county context where available."
            />
          </Suspense>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Before you commit</p><h2 className="mt-2 font-display text-3xl">Verify the exact address in five steps</h2></div>
          <ol className="divide-y divide-border border-y border-border">
            {steps.map((step,index)=><li id={`school-step-${index + 1}`} key={step} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]">
              <span className="font-display text-3xl text-primary">{String(index+1).padStart(2,'0')}</span>
              <div><h3 className="font-display text-xl">{stepNames[index]}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{step}</p></div>
            </li>)}
          </ol>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Understand the system</p><h2 className="mt-2 font-display text-3xl">Put the lookup in context</h2></div>
          <div>
            <Link to="/article/texas-schools-family-life" className="font-display text-2xl hover:text-primary">Texas Schools and Family Life →</Link>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Understand ISDs, accountability, charters, homeschooling, Pre-K, school taxes and family logistics after identifying the correct district.</p>
            <a href="/texas-high-school-football-teams" className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open the statewide football team finder →</a>
          </div>
        </section>
      </article>
    </Container>
  </>;
}
