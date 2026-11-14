import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { getFootballBracketGames, officialFootballBracketUrl, footballMatchupPath, footballSnapshotUpdatedAt, FOOTBALL_BRACKET_SOURCE } from '@/data/high-school-football/football-matchups';
import { approvedMaxPrepsJsTournamentWidget, approvedMaxPrepsTournamentEmbedUrl } from '@/data/high-school-football/maxpreps-bracket-embeds';
import { MaxPrepsTournamentWidget } from '@/components/sports/MaxPrepsTournamentWidget';
import { officialMaxPrepsTournament2026 } from '@/data/high-school-football/maxpreps-2026-uil-tournaments';

const canonicalPath = '/texas-high-school-football-playoff-brackets';
const classes = ['1A','2A','3A','4A','5A','6A'] as const;
const rounds = ['bi-district','area','regional','quarterfinal','semifinal','final'] as const;
const officialBrackets = classes.flatMap((classification) => ([1,2] as const).map((division) => ({ classification, division, href: officialFootballBracketUrl(classification, division) })));
const roundTitle = (round: string) => round === 'final' ? 'State championship' : round.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join('-');

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: '2026 Texas High School Football Playoff Brackets | 1A–6A',
      description: 'Find all twelve official 2026 UIL Texas high school football playoff brackets for 1A–6A, Division I and II, with direct MaxPreps-powered source links.',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: Page,
});

function Page() {
  const [classification,setClassification] = useState<(typeof classes)[number]>('6A');
  const [division,setDivision] = useState<1|2>(1);
  const games = getFootballBracketGames(classification,division);
  const officialUrl = officialFootballBracketUrl(classification,division);
  const maxPrepsTournament = officialMaxPrepsTournament2026(classification,division);
  const authorizedEmbedUrl = approvedMaxPrepsTournamentEmbedUrl(classification,division);
  const authorizedJsWidget = approvedMaxPrepsJsTournamentWidget(classification,division);
  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl" data-football-brackets="2026">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/">Home</Link> / <Link to="/sports">Texas Sports</Link> / 2026 football brackets
      </nav>
      <header className="border-b border-border py-9">
        <p className="eyebrow text-primary">2026 UIL postseason</p>
        <h1 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">Texas high school football playoff brackets</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">Select any of the 12 UIL playoff paths and follow its official MaxPreps-powered bracket. Bracket updates are maintained by UIL and MaxPreps; TexasDefined never invents playoff winners or scores.</p>
        <p className="mt-4 text-sm text-muted-foreground">UIL and MaxPreps publish the current tournament matchups, round assignments and reported results. Our own individually verified playoff-game records appear below when available.</p>
        <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
          <a href={FOOTBALL_BRACKET_SOURCE} target="_blank" rel="noopener noreferrer" className="text-primary">Open all official UIL brackets ↗</a>
          <Link to="/texas-high-school-football-matchups" className="text-primary">Football scores & matchups →</Link>
          <Link to="/article/texas-high-school-football-playoffs-explained" className="text-primary">How the UIL playoff rounds work →</Link>
        </div>
      </header>
      <section className="py-9" aria-labelledby="bracket-picker">
        <h2 id="bracket-picker" className="font-display text-3xl">Choose your bracket</h2>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose UIL classification">
          {classes.map((value) => <button key={value} type="button" onClick={() => {setClassification(value); setDivision(1);}} aria-pressed={classification === value} className={'min-h-11 border px-5 py-3 font-semibold '+(classification === value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-surface hover:border-primary')}>{value}{value === '1A' ? ' six-man' : ''}</button>)}
        </div>
        <div className="mt-4 flex gap-2" role="group" aria-label="Choose playoff division">
          {([1,2] as const).map((value) => <button key={value} type="button" onClick={() => setDivision(value)} aria-pressed={division === value} className={'min-h-11 border px-6 py-3 font-semibold '+(division === value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-surface hover:border-primary')}>Division {value === 1 ? 'I' : 'II'}</button>)}
        </div>
      </section>
      <section className="border-y border-border py-8" aria-live="polite">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-primary">Selected state championship path</p>
            <h2 className="mt-2 font-display text-4xl">{classification}{classification === '1A' ? ' six-man' : ''} Division {division === 1 ? 'I' : 'II'}</h2>
          </div>
          <a className="text-sm font-semibold text-primary underline" href={officialUrl} target="_blank" rel="noopener noreferrer">UIL official {classification} D{division} bracket ↗</a>
        </div>
        <div className="mt-7 border border-border bg-surface p-5 sm:p-6" data-official-playoff-bracket={classification + 'D' + division}>
          <h3 className="font-display text-2xl">Official UIL / MaxPreps tournament bracket</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            UIL publishes and MaxPreps maintains this tournament bracket. The official source is the most current view of matchups, results and advancement.
          </p>
          {authorizedJsWidget ? <MaxPrepsTournamentWidget widget={authorizedJsWidget} /> : authorizedEmbedUrl ? <div className="mt-5">
            <iframe
              key={classification + 'D' + division}
              src={authorizedEmbedUrl}
              title={`Official 2026 UIL ${classification} Division ${division === 1 ? 'I' : 'II'} football playoff bracket, via MaxPreps`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              height={800}
              className="w-full border border-border bg-background"
            />
            <p className="mt-3 text-xs text-muted-foreground">Embedded bracket provided by MaxPreps. If it does not load, open the source directly.</p>
          </div> : <div className="mt-5">
            <a href={officialUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              View official {classification} Division {division === 1 ? 'I' : 'II'} bracket ↗
            </a>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Opens the official 2026 bracket maintained by UIL and MaxPreps. Scores and advancement shown there come from their published tournament, not our separate editorial game snapshot.
            </p>
          </div>}
          {maxPrepsTournament && <p className="mt-4 text-sm">
            <a href={maxPrepsTournament.tournamentUrl} target="_blank" rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-4">
              Or view this 2026 tournament directly on MaxPreps ↗
            </a>
          </p>}
        </div>
        {games.length > 0 && <div className="mt-7">
          <h3 className="font-display text-2xl">Separately verified TexasDefined playoff matchups</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Our editorial game snapshot was last reviewed {footballSnapshotUpdatedAt}. Use the official UIL / MaxPreps bracket above for source-managed advancement and corrections.</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rounds.map((round) => {
            const entries=games.filter((game)=>game.round===round);
            return <section key={round} className="border border-border bg-surface p-5">
              <h3 className="font-display text-2xl">{roundTitle(round)}</h3>
              {entries.length === 0 ? <p className="mt-3 text-sm text-muted-foreground">No verified result in this round</p> : <ul className="mt-4 space-y-3">{entries.map((game)=><li key={game.slug} className="border-t border-border pt-3">
                <Link to={footballMatchupPath(game)} className="font-semibold text-primary underline">{game.away.name} at {game.home.name}</Link>
                <p className="mt-1 text-sm">{game.status === 'final' ? 'Reported final: '+game.awayScore+'–'+game.homeScore : 'Scheduled · '+game.date}</p>
              </li>)}</ul>}
            </section>;
          })}
          </div>
        </div>}
      </section>
      <section className="border-b border-border py-9" aria-labelledby="all-uil-brackets">
        <h2 id="all-uil-brackets" className="font-display text-3xl">All 12 official UIL brackets</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">Each link opens that conference and division's 2026 tournament bracket published by UIL using MaxPreps. These source links do not require a scores API.</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {officialBrackets.map(({ classification: schoolClass, division: bracketDivision, href }) =>
            <a key={schoolClass + 'D' + bracketDivision} href={href} target="_blank" rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-between gap-3 border border-border bg-surface px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
              <span>{schoolClass}{schoolClass === '1A' ? ' six-man' : ''} · Division {bracketDivision === 1 ? 'I' : 'II'}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </section>
      <section className="grid gap-6 py-9 md:grid-cols-2">
        <div><h2 className="font-display text-3xl">How teams qualify</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">1A six-man sends two schools per district. 2A–5A send four. In 6A, the four qualifiers split by enrollment into Division I and II. Advancement occurs only through verified postseason wins.</p></div>
        <div><h2 className="font-display text-3xl">Freshness and accuracy</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">UIL and MaxPreps maintain the official postseason brackets. TexasDefined separately verifies any game results it publishes; its editorial snapshot is not a live score feed. Always check the official bracket for current pairings or corrections.</p></div>
      </section>
    </main>
  </Container>;
}
