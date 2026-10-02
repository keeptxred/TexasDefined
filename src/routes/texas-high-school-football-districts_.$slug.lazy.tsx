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
    <article className="mx-auto max-w-7xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <a href="/texas-high-school-football-districts">Football districts</a><span className="mx-2">/</span>
        <span aria-current="page">{shortLabel}</span>
      </nav>

      <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-stretch">
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-primary">2026–28 UIL football alignment</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{districtTitle}</h1>
          <p className="mt-5 max-w-5xl text-base font-medium leading-7 text-foreground sm:text-lg">{teamLine}</p>
          <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground">Your district hub for the current UIL alignment, member schools, game-week resources, playoff context and official realignment data.</p>
        </div>
        <div className="relative overflow-hidden bg-foreground p-7 text-background">
          <div className="absolute -right-7 -top-10 text-[10rem] font-black leading-none opacity-10" aria-hidden="true">{district.district}</div>
          <div className="relative flex h-full min-h-64 flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">Friday night football</p>
              <p className="mt-5 font-display text-7xl leading-none">{district.district}</p>
              <p className="mt-2 text-lg font-semibold">{district.classification}{divisionRoman ? ` Division ${divisionRoman}` : ''}</p>
            </div>
            <div className="mt-8 border-t border-background/20 pt-5 text-sm leading-6 opacity-80">
              {district.programCount} teams · {district.footballType} · 2026–28 alignment
            </div>
          </div>
        </div>
      </header>

      <section aria-label="District summary" className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(district.programCount)} label="Teams" />
        <Stat value={district.classification} label="Classification" />
        <Stat value={divisionRoman ? `Division ${divisionRoman}` : 'Postseason split'} label="Division" />
        <Stat value={district.footballType} label="Football format" />
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[16rem_1fr]">
        <div>
          <p className="eyebrow text-primary">The teams</p>
          <h2 className="mt-2 font-display text-3xl">District {district.district} schools</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">Open any school for its dedicated TexasDefined football page.</p>
        </div>
        <div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {district.programs.map((program, index) => <a key={program.profilePath} href={program.profilePath} className="group flex min-h-52 flex-col justify-between border border-border bg-background p-5 transition-colors hover:bg-surface">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Team {String(index + 1).padStart(2, '0')}</span>
                  <span className="text-xs text-muted-foreground">{district.classification}{divisionRoman ? ` D${divisionRoman}` : ''}</span>
                </div>
                <h3 className="mt-5 font-display text-3xl leading-tight group-hover:text-primary">{program.schoolName}</h3>
              </div>
              <div className="mt-8 border-t border-border pt-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">UIL enrollment</p>
                    <p className="mt-1 font-semibold">{formatEnrollment(program.uilEnrollment)}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">Team page →</span>
                </div>
              </div>
            </a>)}
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">Teams are listed alphabetically. UIL enrollment figures are the 2026–28 realignment snapshot, not live campus enrollment or a ranking of the teams.</p>
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[16rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Game week</p>
          <h2 className="mt-2 font-display text-3xl">Scores, schedules & playoff path</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <ActionCard href="https://www.uiltexas.org/maxpreps/" external title="Current scores & schedules" body="Open the UIL Texas Scoreboard for the latest school-submitted scores and weekly schedules." cta="Open UIL scoreboard ↗" />
          <ActionCard href="/article/texas-high-school-football-2026-season-calendar" title="2026 season calendar" body="Keep track of district play, the playoff rounds and the December state championship dates." cta="View season calendar →" />
          <ActionCard href="/article/texas-high-school-football-playoffs-explained" title="How the playoffs work" body="See how district qualification advances into bi-district, regional rounds and the state championships." cta="See the playoff path →" />
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[16rem_1fr]">
        <div>
          <p className="eyebrow text-primary">District format</p>
          <h2 className="mt-2 font-display text-3xl">What this alignment means</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border-t-2 border-foreground pt-4">
            <h3 className="font-display text-2xl">Competition group</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">These schools share a UIL football district for regular-season competition during the 2026–28 alignment cycle. District results determine playoff qualification under UIL rules.</p>
          </div>
          <div className="border-t-2 border-foreground pt-4">
            <h3 className="font-display text-2xl">Enrollment context</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">The applicable UIL enrollment band is <strong className="text-foreground">{enrollmentBand?.label || conferenceBand}</strong>. Member schools on this page range from {formatEnrollment(enrollmentLow)} to {formatEnrollment(enrollmentHigh)} in the realignment snapshot.</p>
            <a href={UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE.url} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official UIL enrollment cutoffs ↗</a>
          </div>
          {district.classification === '6A'
            ? <div className="border-t-2 border-foreground pt-4 sm:col-span-2"><h3 className="font-display text-2xl">6A postseason split</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">6A schools are not assigned to Division I or Division II before the season. After four teams qualify, the two larger-enrollment qualifiers enter Division I and the two smaller-enrollment qualifiers enter Division II.</p></div>
            : <div className="border-t-2 border-foreground pt-4 sm:col-span-2"><h3 className="font-display text-2xl">Preassigned division</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">In {district.classification}, Division {divisionRoman} is set during realignment, so every school on this page competes in the same classification and football division before the season begins.</p></div>}
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[16rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Explore Texas football</p>
          <h2 className="mt-2 font-display text-3xl">More from TexasDefined</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Related href="/texas-high-school-football-teams" title="Find any UIL team" body="Search by school, ISD, city or county and compare programs side by side." />
          <Related href="/texas-high-school-football-districts" title="Browse all 192 districts" body="Move across every current UIL football district from 6A through 1A six-man." />
          <Related href="/article/texas-high-school-football-classifications-1a-6a" title="Understand 1A through 6A" body="See how enrollment, divisions and biennial realignment shape the statewide system." />
          <Related href="/texas-high-school-football-championship-history" title="Championship history" body="Explore UIL state titles and state-final appearances for current programs." />
          <Related href="/article/texas-high-school-football-scores-schedules" title="Scores & schedules guide" body="See the best sources for confirming current results, schedules and standings." />
          <Related href="/sports/friday-night-lights" title="Friday Night Lights, Defined" body="Explore the stadiums, traditions and culture around Texas high school football." />
        </div>
      </section>

      <section className="py-12">
        <p className="eyebrow text-primary">Official data</p>
        <h2 className="mt-2 font-display text-3xl">UIL alignment sources</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined builds this district roster from the current UIL 2026–28 football alignment and uses UIL’s 2026–28 Realignment Alphabetical Listing for the enrollment figures shown above. UIL remains the controlling source if an assignment or enrollment snapshot is corrected.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <a href={district.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official UIL district alignment ↗</a>
          <a href={district.enrollmentSourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official UIL enrollment listing ↗</a>
        </div>
      </section>
    </article>
  </Container>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="border-b border-border px-0 py-5 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"><p className="font-display text-3xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p></div>;
}

function ActionCard({ href, title, body, cta, external = false }: { href: string; title: string; body: string; cta: string; external?: boolean }) {
  return <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})} className="group border border-border p-5 hover:bg-surface"><h3 className="font-display text-2xl group-hover:text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p><p className="mt-6 text-sm font-semibold text-primary">{cta}</p></a>;
}

function Related({ href, title, body }: { href: string; title: string; body: string }) {
  return <a href={href} className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></a>;
}
