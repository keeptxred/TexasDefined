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
  const divisionRoman = district.division ? (district.division === 1 ? 'I' : 'II') : null;
  const districtTitle = divisionRoman
    ? `District ${district.district}-${district.classification} Division ${divisionRoman} Football`
    : `District ${district.district}-${district.classification} Football`;
  const shortLabel = `${district.classification}${divisionRoman ? ` Division ${divisionRoman}` : ''} District ${district.district}`;
  const enrollmentBand = uilFootballEnrollmentBand(district.classification, district.division);
  const conferenceBand = uilFootballConferenceBand(district.classification);
  const reportedEnrollments = district.programs.map((program) => program.uilEnrollment);
  const enrollmentLow = Math.min(...reportedEnrollments);
  const enrollmentHigh = Math.max(...reportedEnrollments);
  const teamLine = district.programs.map((program) => program.schoolName).join(' • ');
  const formatEnrollment = (value: number) => value.toLocaleString('en-US', { maximumFractionDigits: 1 });

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl" data-football-district-hub="v2">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <a href="/texas-high-school-football-districts">Football districts</a><span className="mx-2">/</span>
        <span aria-current="page">{shortLabel}</span>
      </nav>

      <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <p className="eyebrow text-primary">2026–28 UIL football alignment</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{districtTitle}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-foreground">{teamLine}</p>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">Your district hub for the current UIL alignment, every member school, game-week resources, playoff context and official realignment data.</p>
        </div>
        <dl className="border-y border-border py-3 text-sm lg:border-y-0 lg:border-l lg:pl-6" aria-label="District summary">
          <Fact label="Teams" value={String(district.programCount)} />
          <Fact label="Classification" value={district.classification} />
          <Fact label="Division" value={divisionRoman ? `Division ${divisionRoman}` : '6A postseason split'} />
          <Fact label="UIL district" value={String(district.district)} />
          <Fact label="Format" value={district.footballType} />
        </dl>
      </header>

      <section data-football-district-section="teams" className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">The teams</p>
          <h2 className="mt-2 font-display text-3xl">District {district.district} schools</h2>
        </div>
        <div>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {district.programs.map((program, index) => <a key={program.profilePath} href={program.profilePath} className="group bg-background p-5 hover:bg-surface">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Team {String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{program.schoolName}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{district.classification}{divisionRoman ? ` Division ${divisionRoman}` : ''}</p>
              <p className="mt-1 text-xs text-muted-foreground">UIL reported enrollment: <strong className="text-foreground">{formatEnrollment(program.uilEnrollment)}</strong></p>
              <p className="mt-3 text-xs text-muted-foreground">Team page →</p>
            </a>)}
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">Member order is alphabetical for research usability; it is not a ranking, projected finish, or statement about team quality.</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">Enrollment figures are the UIL 2026–28 realignment snapshot used for classification. They are not live campus headcounts.</p>
        </div>
      </section>

      <section data-football-district-section="game-week" className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Game week</p>
          <h2 className="mt-2 font-display text-3xl">Scores, schedules & playoff path</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Related href="https://www.uiltexas.org/maxpreps/" title="Current scores & schedules" body="Open the UIL Texas Scoreboard for the latest school-submitted scores and weekly schedules. It is not an official district-standings table." external />
          <Related href="/article/texas-high-school-football-2026-season-calendar" title="2026 season calendar" body="Track district play, playoff rounds and the December state championship dates." />
          <Related href="/article/texas-high-school-football-playoffs-explained" title="How the playoffs work" body="See how district qualification advances into bi-district, regional rounds and the state championships." />
          <Related href="/article/texas-high-school-football-scores-schedules" title="Verify scores & standings" body="Use the UIL scoreboard and school sources without turning incomplete submissions into an unofficial table." />
        </div>
      </section>

      <section data-football-district-section="alignment" className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">District format</p>
          <h2 className="mt-2 font-display text-3xl">What this alignment means</h2>
        </div>
        <div className="space-y-5 text-sm leading-7 text-muted-foreground">
          <p>These schools share a UIL football district for regular-season competition during the 2026–28 alignment cycle. District results determine playoff qualification under UIL rules.</p>
          <p><strong className="text-foreground">Enrollment band:</strong> {enrollmentBand?.label || conferenceBand}. <strong className="text-foreground">District snapshot:</strong> {formatEnrollment(enrollmentLow)}–{formatEnrollment(enrollmentHigh)}.</p>
          {district.classification === '6A'
            ? <p>6A schools are not assigned to Division I or Division II before the season. After four teams qualify, the two larger-enrollment qualifiers enter Division I and the two smaller-enrollment qualifiers enter Division II.</p>
            : <p>In {district.classification}, Division {divisionRoman} is set during realignment, so every school on this page competes in the same classification and football division before the season begins.</p>}
          <a href={UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE.url} target="_blank" rel="noreferrer noopener" className="inline-block font-semibold text-primary underline underline-offset-4">Official UIL 2026–28 enrollment cutoffs ↗</a>
        </div>
      </section>

      <section data-football-district-section="explore" className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Explore Texas football</p>
          <h2 className="mt-2 font-display text-3xl">More from TexasDefined</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Related href="/texas-high-school-football-teams" title="Find any UIL team" body="Search by school, ISD, city or county and compare programs side by side." />
          <Related href="/texas-high-school-football-districts" title="Browse all 192 districts" body="Move across every current UIL football district from 6A through 1A six-man." />
          <Related href="/article/texas-high-school-football-classifications-1a-6a" title="Understand 1A through 6A" body="See how enrollment, divisions and biennial realignment shape the statewide system." />
          <Related href="/texas-high-school-football-championship-history" title="Championship history" body="Explore UIL state titles and state-final appearances for current programs." />
          <Related href="/article/texas-high-school-football-scores-schedules" title="Follow scores & weekly schedules" body="See the best sources for confirming current results, schedules and standings." />
          <Related href="/sports/friday-night-lights" title="Friday Night Lights, Defined" body="Explore the stadiums, traditions and culture around Texas high school football." />
        </div>
      </section>

      <section data-football-district-section="official-sources" className="py-10">
        <p className="eyebrow text-primary">Official data</p>
        <h2 className="mt-2 font-display text-3xl">University Interscholastic League sources</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined builds this district roster from the current UIL 2026–28 football alignment and uses UIL’s 2026–28 Realignment Alphabetical Listing for the enrollment figures shown above. UIL remains the controlling source if an assignment or enrollment snapshot is corrected.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <a href={district.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL alignment source ↗</a>
          <a href={district.enrollmentSourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL enrollment source ↗</a>
        </div>
      </section>
    </article>
  </Container>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0"><dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>;
}

function Related({ href, title, body, external = false }: { href: string; title: string; body: string; external?: boolean }) {
  return <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})} className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></a>;
}
