import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';

const UIL_SCOREBOARD_URL = 'https://www.uiltexas.org/maxpreps/scoreboard';
const UIL_MAXPREPS_URL = 'https://www.uiltexas.org/athletics/uil-maxpreps';
const UIL_FOOTBALL_URL = 'https://www.uiltexas.org/football';
const UIL_FOOTBALL_MANUAL_URL = 'https://www.uiltexas.org/football/manual/football-manual-regular-season';
const UIL_PLAYOFFS_URL = 'https://www.uiltexas.org/football/playoff-brackets';

export const Route = createLazyFileRoute('/texas-high-school-football-scores-schedules')({ component: Page });

const playingWeeks = [
  ['Week 1', 'Aug. 27–29'],
  ['Week 2', 'Sept. 3–5'],
  ['Week 3', 'Sept. 10–12'],
  ['Week 4', 'Sept. 17–19'],
  ['Week 5', 'Sept. 24–26'],
  ['Week 6', 'Oct. 1–3'],
  ['Week 7', 'Oct. 8–10'],
  ['Week 8', 'Oct. 15–17'],
  ['Week 9', 'Oct. 22–24'],
  ['Week 10', 'Oct. 29–31'],
  ['Week 11', 'Nov. 5–7'],
] as const;

const playoffWeeks = [
  ['Round 1', 'Nov. 12–14'],
  ['Round 2', 'Nov. 19–21'],
  ['Round 3', 'Nov. 26–28'],
  ['Round 4', 'Dec. 3–5'],
  ['Round 5', 'Dec. 10–12'],
  ['State championships', 'Dec. 16–19'],
] as const;

function Page() {
  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <Link to="/sports/friday-night-lights">Friday Night Lights</Link><span className="mx-2">/</span>
        <span aria-current="page">Scores & schedules</span>
      </nav>

      <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <p className="eyebrow text-primary">2026 Texas high school football</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Scores, schedules and the UIL season calendar</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Use TexasDefined to understand the season, school, district and playoff context. For the actual current weekly schedule and reported scores, use the UIL Texas Scoreboard—the UIL’s own scoreboard powered by MaxPreps submissions.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <a href={UIL_SCOREBOARD_URL} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Open the UIL Texas Scoreboard ↗</a>
            <a href="/texas-high-school-football-teams" className="text-primary">Find a school football profile →</a>
          </div>
        </div>
        <dl className="border-y border-border py-3 text-sm lg:border-y-0 lg:border-l lg:pl-6">
          <Fact label="Season" value="2026–27" />
          <Fact label="Regular-season window" value="Aug. 27–Nov. 7" />
          <Fact label="Max games" value="10 in 11 weeks" />
          <Fact label="State championships" value="Dec. 16–19" />
        </dl>
      </header>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Live source</p>
          <h2 className="mt-2 font-display text-3xl">Where current scores come from</h2>
        </div>
        <div className="space-y-5 text-sm leading-7 text-muted-foreground">
          <p>The University Interscholastic League partners with MaxPreps to collect team information and power the UIL Texas Scoreboard. UIL says the scoreboard currently includes scores and weekly schedules for football and several other sports.</p>
          <p>That makes the UIL Scoreboard the right first stop for a current matchup or result. TexasDefined does not copy a weekly score feed into an evergreen page, because a duplicated feed can become stale or disagree with the controlling source.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            <a href={UIL_SCOREBOARD_URL} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL Texas Scoreboard ↗</a>
            <a href={UIL_MAXPREPS_URL} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">How the UIL–MaxPreps partnership works ↗</a>
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Important limitation</p>
          <h2 className="mt-2 font-display text-3xl">A missing score is not proof a game was not played</h2>
        </div>
        <div className="space-y-5 text-sm leading-7 text-muted-foreground">
          <p>UIL explicitly says Scoreboard completeness depends on information submitted by schools and coaches to MaxPreps. During the regular season, UIL encourages programs to keep their pages current, but the public feed can still be incomplete.</p>
          <p>Postseason reporting is stricter: playoff teams are required to maintain complete season schedules and scores, and advancing teams must report playoff results promptly. For travel, tickets or a same-day kickoff, confirm the school or district athletics page as well as the UIL feed.</p>
          <p><strong className="text-foreground">This page does not publish district standings.</strong> UIL’s MaxPreps FAQ says standings and statistical leaderboards are planned additions to the Texas Scoreboard rather than a current Scoreboard feature. TexasDefined will not manufacture standings from a partial score feed.</p>
          <a href={UIL_FOOTBALL_MANUAL_URL} target="_blank" rel="noreferrer noopener" className="inline-block font-semibold text-primary underline underline-offset-4">UIL football regular-season rules and Scoreboard guidance ↗</a>
        </div>
      </section>

      <section className="border-b border-border py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">Regular season</p>
            <h2 className="mt-2 font-display text-4xl">2026 possible playing dates</h2>
          </div>
          <a href={UIL_FOOTBALL_URL} target="_blank" rel="noreferrer noopener" className="text-sm font-semibold text-primary underline underline-offset-4">Official UIL football calendar ↗</a>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">UIL gives schools 11 playing weeks to schedule a maximum of 10 games. Individual teams can have an open date, and kickoff days can vary within the allowed week.</p>
        <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {playingWeeks.map(([week, dates]) => <div key={week} className="bg-background p-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{week}</p><p className="mt-2 font-display text-2xl">{dates}</p></div>)}
        </div>
      </section>

      <section className="border-b border-border py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">Postseason</p>
            <h2 className="mt-2 font-display text-4xl">2026 playoff calendar</h2>
          </div>
          <a href={UIL_PLAYOFFS_URL} target="_blank" rel="noreferrer noopener" className="text-sm font-semibold text-primary underline underline-offset-4">Official UIL playoff brackets ↗</a>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">District certification is due Nov. 7. The playoff schedule then runs through December, with all classifications scheduled for state championships Dec. 16–19.</p>
        <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {playoffWeeks.map(([round, dates]) => <div key={round} className="bg-background p-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{round}</p><p className="mt-2 font-display text-2xl">{dates}</p></div>)}
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Research a matchup</p>
          <h2 className="mt-2 font-display text-3xl">Go from score to school context</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Related href="/texas-high-school-football-teams" title="Find the program" body="Open any of the 1,268 UIL program profiles for classification, exact UIL enrollment, district, school context, history and verified venue links where available." />
          <Related href="/texas-high-school-football-districts" title="Open the district" body="See every program in the current 2026–28 UIL football district and move between opponent profiles." />
          <Related href="/article/texas-high-school-football-playoffs-explained" title="Understand playoff qualification" body="See how district finish feeds the bracket and how the 6A Division I/II split works after qualification." />
          <Related href="/sports-venues/high-school-football" title="Plan the game night" body="Use TexasDefined stadium guides for verified venue, parking and arrival context, then confirm the current schedule before travel." />
        </div>
      </section>

      <section className="py-10">
        <p className="eyebrow text-primary">Source policy</p>
        <h2 className="mt-2 font-display text-3xl">Current results stay with the current source</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined uses durable school, district, alignment, enrollment, venue and championship-history data for its own football research pages. Fast-changing weekly scores stay linked to the UIL Texas Scoreboard so a reader can check the freshest available submission without mistaking an old cached score for the current record.</p>
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
