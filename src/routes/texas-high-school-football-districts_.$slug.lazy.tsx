import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import {
  UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE,
  uilFootballConferenceBand,
  uilFootballEnrollmentBand,
} from '@/data/high-school-football/enrollment-bands';

export const Route = createLazyFileRoute('/texas-high-school-football-districts/$slug')({ component: Page });

function Page() {
  const district = Route.useLoaderData();
  const divisionLabel = district.division ? ` Division ${district.division === 1 ? 'I' : 'II'}` : '';
  const label = `${district.classification}${divisionLabel} District ${district.district}`;
  const enrollmentBand = uilFootballEnrollmentBand(district.classification, district.division);
  const conferenceBand = uilFootballConferenceBand(district.classification);
  const reportedEnrollments = district.programs.map((program) => program.uilEnrollment);
  const enrollmentLow = Math.min(...reportedEnrollments);
  const enrollmentHigh = Math.max(...reportedEnrollments);
  const formatEnrollment = (value: number) => value.toLocaleString('en-US', { maximumFractionDigits: 1 });

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <a href="/texas-high-school-football-districts">UIL football districts</a><span className="mx-2">/</span>
        <span aria-current="page">{label}</span>
      </nav>

      <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <p className="eyebrow text-primary">2026–28 UIL football alignment</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{label}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The current UIL football district contains {district.programCount} {district.programCount === 1 ? 'program' : 'programs'}. Every school below links to its TexasDefined football research profile.</p>
        </div>
        <dl className="border-y border-border py-3 text-sm lg:border-y-0 lg:border-l lg:pl-6">
          <Fact label="Classification" value={district.classification} />
          <Fact label="Division" value={district.division ? `Division ${district.division === 1 ? 'I' : 'II'}` : '6A postseason split'} />
          <Fact label="UIL district" value={String(district.district)} />
          <Fact label="Enrollment band" value={enrollmentBand?.label || conferenceBand} />
          <Fact label="Reported enrollment range" value={`${formatEnrollment(enrollmentLow)}–${formatEnrollment(enrollmentHigh)}`} />
          <Fact label="Format" value={district.footballType} />
          <Fact label="Programs" value={String(district.programCount)} />
        </dl>
      </header>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">District members</p>
          <h2 className="mt-2 font-display text-3xl">Every current program</h2>
        </div>
        <div>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {district.programs.map((program) => <a key={program.profilePath} href={program.profilePath} className="group bg-background p-5 hover:bg-surface">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{label}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{program.schoolName}</h3>
              <p className="mt-2 text-xs text-muted-foreground">UIL reported enrollment: <strong className="text-foreground">{formatEnrollment(program.uilEnrollment)}</strong></p>
              <p className="mt-1 text-xs text-muted-foreground">Submitted conference: {program.submittedConference}</p>
              <p className="mt-3 text-xs text-muted-foreground">Open school football profile →</p>
            </a>)}
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">Member order is alphabetical for research usability; it is not a ranking, projected finish, or statement about team quality.</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">Enrollment figures are the UIL 2026–28 realignment snapshot used for classification. They are not live campus headcounts and should not be treated as a team-strength ranking.</p>
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">How to read this page</p>
          <h2 className="mt-2 font-display text-3xl">District is a competition group</h2>
        </div>
        <div className="space-y-5 text-sm leading-7 text-muted-foreground">
          <p>UIL classification reflects school enrollment, while the district groups schools for regular-season competition. District results determine playoff qualification under the current UIL postseason rules.</p>
          {district.classification === '6A'
            ? <p>In 6A, schools are not pre-assigned to Division I or Division II for football. After four teams qualify from the district, the two larger-enrollment qualifiers enter Division I and the two smaller-enrollment qualifiers enter Division II.</p>
            : <p>For {district.classification}, Division {district.division === 1 ? 'I' : 'II'} is assigned before the season as part of realignment, so every school on this page competes in the same classification and football division.</p>}
          <p>For the 2026–28 cycle, this district’s classification{district.division ? ' and football division' : ''} corresponds to an enrollment band of <strong className="text-foreground">{enrollmentBand?.label || conferenceBand}</strong>. UIL realignment runs on a two-year cycle, so this page should not be used as a historical district list.</p>
          <a href={UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE.url} target="_blank" rel="noreferrer noopener" className="inline-block font-semibold text-primary underline underline-offset-4">Official UIL 2026–28 enrollment cutoffs ↗</a>
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Current season</p>
          <h2 className="mt-2 font-display text-3xl">Scores & weekly schedules</h2>
        </div>
        <div>
          <p className="max-w-4xl text-sm leading-7 text-muted-foreground">For current UIL football scores and weekly schedules, use the UIL Texas Scoreboard, which is powered by information submitted through MaxPreps. UIL says completeness depends on school and coach submissions, and the scoreboard is not currently an official district-standings table.</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <a href="https://www.uiltexas.org/maxpreps/" target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL Texas Scoreboard gateway ↗</a>
            <a href="/article/texas-high-school-football-scores-schedules" className="text-primary underline underline-offset-4">How to verify scores, schedules & standings →</a>
            <a href="/article/texas-high-school-football-2026-season-calendar" className="text-primary underline underline-offset-4">2026 UIL season calendar →</a>
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Research next</p>
          <h2 className="mt-2 font-display text-3xl">Put the district in context</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Related href="/texas-high-school-football-teams" title="Search all UIL programs" body="Search by school, ISD, city or county and compare up to three programs side by side." />
          <Related href="/article/texas-high-school-football-scores-schedules" title="Follow scores & weekly schedules" body="Use the UIL Texas Scoreboard and school sources for current results without turning incomplete submissions into an unofficial standings table." />
          <Related href="/article/texas-high-school-football-classifications-1a-6a" title="Understand 1A through 6A" body="See how enrollment, divisions and biennial realignment shape the statewide system." />
          <Related href="/article/texas-high-school-football-playoffs-explained" title="Understand the playoff path" body="See how district qualification becomes bi-district, regional rounds and the state championships." />
          <Related href="/texas-high-school-football-championship-history" title="Browse championship history" body="Compare all-time UIL state titles and state-final appearances for current programs across classifications." />
          <Related href="/sports/friday-night-lights" title="Friday Night Lights, Defined" body="Explore the wider culture, stadiums and traditions around Texas high school football." />
        </div>
      </section>

      <section className="py-10">
        <p className="eyebrow text-primary">Official source</p>
        <h2 className="mt-2 font-display text-3xl">University Interscholastic League</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined derives district membership from the current UIL 2026–28 football alignment and each displayed enrollment from UIL’s 2026–28 Realignment Alphabetical Listing. The UIL documents remain the controlling sources if an assignment or enrollment snapshot is corrected.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <a href={district.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Open official UIL alignment ↗</a>
          <a href={district.enrollmentSourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Open UIL enrollment listing ↗</a>
        </div>
      </section>
    </article>
  </Container>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0"><dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>;
}

function Related({ href, title, body }: { href: string; title: string; body: string }) {
  return <a href={href} className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></a>;
}
