import { createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { HighSchoolFootballLookup } from '@/components/sports/HighSchoolFootballLookup';
import { UilFootballProgramDirectory } from '@/components/sports/UilFootballProgramDirectory';

export const Route = createLazyFileRoute('/texas-high-school-football-teams')({ component: Page });

const comparisonPoints = [
  {
    title: 'Current UIL level',
    body: 'Classification, football division and district tell you the size of the school and the competitive neighborhood it is assigned to for the current alignment cycle.',
  },
  {
    title: 'Program trajectory',
    body: 'A useful football comparison should look at several seasons, playoff advancement and district results rather than treating one hot year or one preseason ranking as the whole program.',
  },
  {
    title: 'Development path',
    body: 'Varsity success matters, but families may also care about freshman and JV opportunities, roster depth, coaching continuity and whether younger players have a realistic path to meaningful snaps.',
  },
  {
    title: 'Whole-school fit',
    body: 'Football is only one part of the decision. Confirm the attendance zone, academics, programs, commute, transfer rules and the student’s overall fit before choosing a home or campus.',
  },
] as const;

function Page() {
  const { q } = Route.useSearch();
  const { programs } = Route.useLoaderData();
  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <a href="/">Front page</a><span className="mx-2">/</span><a href="/sports">Texas Sports</a><span className="mx-2">/</span><span aria-current="page">High school football team finder</span>
      </nav>

      <header className="border-b border-border py-10">
        <p className="eyebrow text-primary">Texas football research</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Find a Texas high school football team</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Search by high school, ISD, city or county. TexasDefined connects current UIL football alignment with Texas Education Agency school-directory context so a family can see where a program fits before researching the deeper football and school picture.</p>
      </header>

      <HighSchoolFootballLookup initialQuery={q} />

      <UilFootballProgramDirectory programs={programs} />

      <section className="border-b border-border py-12">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">For families moving to Texas</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">What “good football fit” should mean</h2>
          </div>
          <div>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">There is no single objective “best high school for football.” The right program for an established varsity starter can be different from the right program for a developing freshman. TexasDefined will build the comparison around transparent facts rather than an unexplained school score.</p>
            <div className="mt-7 grid gap-px bg-border md:grid-cols-2">
              {comparisonPoints.map((point) => <article key={point.title} className="bg-background p-6">
                <h3 className="font-display text-2xl">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{point.body}</p>
              </article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Connect the move</p><h2 className="mt-2 font-display text-3xl">Research the school and the address together</h2></div>
        <div className="grid gap-5 sm:grid-cols-2">
          <RelatedLink href="/find-my-school-district" title="Find the school district" body="Verify which district and campus serve the exact address before relying on a city name, ZIP code or listing." />
          <RelatedLink href="/texas-high-school-football-districts" title="Browse all 192 UIL football districts" body="Open the current 2026–28 district directory and see every member program with a direct school-profile link." />
          <RelatedLink href="/article/texas-high-school-football-scores-schedules" title="Follow current scores & schedules" body="Use the UIL Texas Scoreboard and school sources for current results and weekly schedules without mistaking incomplete submissions for official standings." />
          <RelatedLink href="/texas-high-school-football-championship-history" title="Explore all-time championship history" body="Compare current UIL programs by actual state-title and state-final counts, with direct links back to every matched school profile." />
          <RelatedLink href="/article/texas-high-school-football-classifications-1a-6a" title="Understand 1A through 6A" body="See how enrollment, divisions, districts, realignment and six-man football fit together." />
          <RelatedLink href="/article/texas-high-school-football-playoffs-explained" title="Understand the playoff path" body="See who qualifies from each district, how 6A splits Division I and II, what bi-district means and how the bracket reaches the state finals." />
          <RelatedLink href="/article/texas-six-man-football-rules-explained" title="Learn six-man football" body="For 1A programs, see how the 80-yard field, exchange rule, scoring values and 45-point rule change the game." />
          <RelatedLink href="/sports-venues/high-school-football" title="Browse football stadiums" body="Connect programs with TexasDefined stadium, parking and game-day planning guides." />
          <RelatedLink href="/sports/friday-night-lights" title="Friday Night Lights, Defined" body="Understand the season, traditions and community culture around Texas high school football." />
        </div>
      </section>

      <section className="py-10">
        <p className="eyebrow text-primary">Current scope</p>
        <h2 className="mt-2 max-w-4xl font-display text-3xl">The finder starts with every current UIL football program</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">The finder and school directory use all 1,268 current UIL football programs as the authoritative school universe. Every UIL program receives the same profile structure and is eligible for the same ISD/county, enrollment, mascot, stadium and history layers. TexasDefined now provides a sourced current-season scores/schedules guide through the UIL Texas Scoreboard; certified district standings remain a future layer until they can be maintained from a complete controlling source. Directory order follows UIL enrollment classification—6A, 5A, 4A, 3A, 2A, 1A—with Division I before Division II inside split classifications; that ordering describes school size, not program quality. Official UIL all-time state-title and state-final totals, detailed recent state-final results from 2018–19 through 2025–26, and three-program comparison remain part of the finder.</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="https://realignment.uiltexas.org/" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">UIL 2026–28 realignment ↗</a>
          <a href="https://tea.texas.gov/texas-schools/general-information/askted" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">Texas Education Agency AskTED ↗</a>
        </div>
      </section>
    </article>
  </Container>;
}

function RelatedLink({ href, title, body }: { href: string; title: string; body: string }) {
  return <a href={href} className="border-t-2 border-foreground pt-4">
    <h3 className="font-display text-2xl hover:text-primary">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
  </a>;
}
