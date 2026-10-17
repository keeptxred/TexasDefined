import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';
import { getFootballMatchup, footballTeamPath, footballMatchupPath, FOOTBALL_BRACKET_SOURCE } from '@/data/high-school-football/football-matchups';

const origin = 'https://texasdefined.com';

export const Route = createFileRoute('/texas-high-school-football-matchups/$slug')({
  loader: ({ params }) => {
    const game = getFootballMatchup(params.slug);
    if (!game) throw notFound();
    return game;
  },
  head: ({ loaderData: game }) => {
    if (!game) return { meta: [{ title: 'Matchup unavailable' }, { name: 'robots', content: 'noindex' }] };
    const canonicalPath = footballMatchupPath(game);
    const name = game.away.name + ' at ' + game.home.name;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: name + ': ' + game.date + ' Football Score & Game Guide',
        description: name + ' — ' + game.date + '. ' + (game.status === 'final' ? 'Reported final: ' + game.away.name + ' ' + game.awayScore + ', ' + game.home.name + ' ' + game.homeScore + '.' : 'Kickoff: ' + game.kickoff + '.') + ' Check game source and team profiles.',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org', '@type': 'SportsEvent',
        name, url: origin + canonicalPath, startDate: game.date,
        eventStatus: game.status === 'final' ? 'https://schema.org/EventCompleted' : 'https://schema.org/EventScheduled',
        homeTeam: { '@type': 'SportsTeam', name: game.home.name },
        awayTeam: { '@type': 'SportsTeam', name: game.away.name },
      })],
    };
  },
  component: Page,
});

function Page() {
  const game = Route.useLoaderData();
  const isFinal = game.status === 'final' && Number.isInteger(game.homeScore) && Number.isInteger(game.awayScore);
  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-5xl" data-football-matchup={game.slug}>
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/">Home</Link> / <Link to="/texas-high-school-football-matchups">Football matchups</Link> / {game.date}
      </nav>
      <header className="mt-10 border-b border-border pb-10">
        <p className="eyebrow text-primary">{game.classification} football · {game.district ? 'District ' + game.district : 'UIL'} · {game.date}</p>
        <h1 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">{game.away.name} vs. {game.home.name}</h1>
        <p className="mt-4 text-base text-muted-foreground">{isFinal ? 'Reported final score' : 'Upcoming game · ' + game.kickoff}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[{ team: game.away, score: game.awayScore, position: 'Away' }, { team: game.home, score: game.homeScore, position: 'Home' }].map(({ team, score, position }) => <div key={position} className="border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">{position}</p>
            <h2 className="mt-3 font-display text-3xl">{team.name} {team.mascot}</h2>
            <p className="mt-3 font-display text-5xl">{isFinal ? score : '—'}</p>
            {team.recordAtKickoff && <p className="mt-3 text-sm text-muted-foreground">Pre-game record: {team.recordAtKickoff}</p>}
            <a className="mt-5 inline-block text-sm font-semibold text-primary underline" href={footballTeamPath(team)}>Team profile →</a>
          </div>)}
        </div>
      </header>
      <section className="grid gap-8 border-b border-border py-9 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">Game-night details</h2>
          <dl className="mt-5 space-y-3 text-sm leading-7">
            <div><dt className="font-semibold">Date and listed kickoff</dt><dd>{game.date} · {game.kickoff}</dd></div>
            {game.venue && <div><dt className="font-semibold">Reported venue</dt><dd>{game.venue} — verify gates, parking and entry with the host</dd></div>}
            <div><dt className="font-semibold">Last source check</dt><dd>{game.verifiedAt}</dd></div>
          </dl>
        </div>
        <div>
          <h2 className="font-display text-3xl">Sources & corrections</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{game.sourceLabel}. TexasDefined is not an official school scoreboard or ticket reseller. Published sources can correct results after the game.</p>
          <a href={game.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block text-sm font-semibold text-primary underline">Game schedule / source ↗</a>
          {game.resultSourceUrl && <a href={game.resultSourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm font-semibold text-primary underline">Reported final source ↗</a>}
          {game.venueSourceUrl && <a href={game.venueSourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm font-semibold text-primary underline">Verify venue ↗</a>}
          <a href="https://www.uiltexas.org/maxpreps/" target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm font-semibold text-primary underline">UIL scoreboard ↗</a>
        </div>
      </section>
      <section className="py-9">
        <h2 className="font-display text-3xl">What happens next?</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">District games help decide playoff qualifiers, but a single result is not a certified district standing or a bracket placement. The official UIL bracket is maintained through its MaxPreps partnership.</p>
        <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold text-primary">
          <Link to="/texas-high-school-football-playoff-brackets">Follow 2026 playoff brackets →</Link>
          <a href={FOOTBALL_BRACKET_SOURCE} target="_blank" rel="noopener noreferrer">UIL bracket source ↗</a>
          <Link to="/texas-high-school-football-matchups">More games →</Link>
        </div>
      </section>
    </article>
  </Container>;
}
