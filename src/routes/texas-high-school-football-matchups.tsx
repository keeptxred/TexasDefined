import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { footballMatchups, footballMatchupPath, footballSnapshotUpdatedAt } from '@/data/high-school-football/football-matchups';

const canonicalPath = '/texas-high-school-football-matchups';

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas High School Football Matchups & Verified Scores | 2026',
      description: 'Follow individually sourced Texas high school football matchups, kickoff times, records and final scores, with team pages and a clear last-verified date.',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: Page,
});

function Page() {
  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl" data-football-matchups="2026">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/">Home</Link> / <Link to="/sports">Sports</Link> / High school football matchups
      </nav>
      <header className="border-b border-border py-9">
        <p className="eyebrow text-primary">2026 Texas high school football</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-tight sm:text-7xl">Friday night matchups & scores</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Game-specific schedules, verified scores and links to each program. This is an expanding, sourced game directory—not a comprehensive live statewide scoreboard.</p>
        <p className="mt-4 text-sm text-muted-foreground">Snapshot reviewed {footballSnapshotUpdatedAt}. Results can arrive after games conclude and may be corrected by their sources.</p>
        <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
          <Link to="/texas-high-school-football-playoff-brackets" className="text-primary">2026 playoff brackets →</Link>
          <a href="https://www.uiltexas.org/maxpreps/" target="_blank" rel="noopener noreferrer" className="text-primary">UIL's latest scores ↗</a>
          <Link to="/texas-high-school-football-teams" className="text-primary">Find a school →</Link>
        </div>
      </header>
      <section aria-labelledby="matchup-list" className="py-10">
        <h2 id="matchup-list" className="font-display text-3xl">Documented games</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {footballMatchups.map((game) => <Link key={game.slug} to={footballMatchupPath(game)} className="block border border-border bg-surface p-6 hover:border-primary">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">{game.date} · {game.classification}{game.district ? ' · District ' + game.district : ''}</p>
            <h3 className="mt-3 font-display text-2xl">{game.away.name} at {game.home.name}</h3>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
              <span>{game.status === 'final' ? 'Reported final' : 'Scheduled · ' + game.kickoff}</span>
              <strong>{game.status === 'final' ? String(game.awayScore) + '–' + String(game.homeScore) : 'Game details →'}</strong>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Checked {game.verifiedAt} · View sources and teams →</p>
          </Link>)}
        </div>
      </section>
      <p className="border-t border-border py-8 text-sm leading-7 text-muted-foreground">Scores are shown only after a named source reports a final. No estimates, automated win predictions or unofficial district standings are published.</p>
    </main>
  </Container>;
}
