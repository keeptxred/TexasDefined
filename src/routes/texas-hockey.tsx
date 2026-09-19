import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import {
  TEXAS_HOCKEY_ACTIVE_TEAMS,
  TEXAS_HOCKEY_HISTORICAL_TEAMS,
  TEXAS_HOCKEY_LEAGUES,
  TEXAS_HOCKEY_REVIEWED_AT,
  TEXAS_HOCKEY_SEASON,
  TEXAS_HOCKEY_VENUES,
  hockeyVenuePathForTeam,
  texasHockeyLeaguePath,
  texasHockeyTeamPath,
  texasHockeyVenuePath,
} from '@/data/texas-hockey';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-hockey';
const siteUrl = 'https://texasdefined.com';
const description = 'Texas hockey directory for 2026–27: every current NHL, AHL, ECHL, NAHL, NA3HL and TCHC team, plus home rinks, league context, city and county links, and hockey-trip planning.';

export const Route = createFileRoute('/texas-hockey')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Hockey Teams: NHL, AHL, ECHL, NAHL, NA3HL & College',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': siteUrl + canonicalPath + '#page',
          url: siteUrl + canonicalPath,
          name: 'Texas Hockey Teams, Leagues and Arenas',
          description,
          dateModified: TEXAS_HOCKEY_REVIEWED_AT,
          isPartOf: { '@id': siteUrl + '/#website' },
          mainEntity: { '@id': siteUrl + canonicalPath + '#teams' },
        },
        {
          '@type': 'ItemList',
          '@id': siteUrl + canonicalPath + '#teams',
          numberOfItems: TEXAS_HOCKEY_ACTIVE_TEAMS.length,
          itemListElement: TEXAS_HOCKEY_ACTIVE_TEAMS.map((team, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: team.name,
            url: siteUrl + texasHockeyTeamPath(team.slug),
          })),
        },
      ],
    })],
  }),
  component: TexasHockeyPage,
});

function TexasHockeyPage() {
  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/">Front page</a><span className="mx-2">/</span><a href="/sports">Texas Sports</a><span className="mx-2">/</span><span aria-current="page">Texas hockey</span>
        </nav>

        <header className="border-b border-border py-10">
          <p className="eyebrow text-primary">Texas hockey authority</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas hockey teams, leagues and arenas</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{description}</p>
          <dl className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-4">
            <Stat label="Current teams/programs" value={String(TEXAS_HOCKEY_ACTIVE_TEAMS.length)} />
            <Stat label="Leagues/conferences" value={String(TEXAS_HOCKEY_LEAGUES.length)} />
            <Stat label="Hockey-specific venue guides" value={String(TEXAS_HOCKEY_VENUES.length)} />
            <Stat label="Roster season" value={TEXAS_HOCKEY_SEASON} />
          </dl>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">Current-team alignment reviewed {TEXAS_HOCKEY_REVIEWED_AT}. Team schedules, rosters, affiliations, ticketing and venue operations can change; official team, league and venue sources control current operations.</p>
        </header>

        <section className="border-b border-border py-12">
          <p className="eyebrow text-primary">The hockey ladder</p>
          <h2 className="mt-2 font-display text-3xl">From the NHL to junior and college club hockey</h2>
          <div className="mt-7 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {TEXAS_HOCKEY_LEAGUES.map((league) => (
              <a key={league.slug} href={texasHockeyLeaguePath(league.slug)} className="bg-background p-6 hover:bg-muted/40">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{league.abbreviation}</p>
                <h3 className="mt-2 font-display text-2xl">{league.name}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{league.description}</p>
                <p className="mt-4 text-sm font-semibold text-primary">See all Texas {league.abbreviation} teams →</p>
              </a>
            ))}
          </div>
        </section>

        {TEXAS_HOCKEY_LEAGUES.map((league) => {
          const teams = TEXAS_HOCKEY_ACTIVE_TEAMS.filter((team) => team.leagueSlug === league.slug);
          return (
            <section key={league.slug} className="border-b border-border py-12" aria-labelledby={'league-' + league.slug}>
              <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
                <div>
                  <p className="eyebrow text-primary">{league.abbreviation}</p>
                  <h2 id={'league-' + league.slug} className="mt-2 font-display text-3xl">{league.name}</h2>
                  <a href={texasHockeyLeaguePath(league.slug)} className="mt-4 inline-block text-sm font-semibold text-primary">League guide →</a>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {teams.map((team) => {
                    const venuePath = hockeyVenuePathForTeam(team);
                    return (
                      <article key={team.slug} className="border-t-2 border-foreground pt-4">
                        <h3 className="font-display text-2xl"><a href={texasHockeyTeamPath(team.slug)} className="hover:text-primary">{team.name}</a></h3>
                        <p className="mt-2 text-sm font-semibold">{team.city}{team.division ? ' · ' + team.division : ''}</p>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{team.overview}</p>
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                          <a href={texasHockeyTeamPath(team.slug)} className="text-primary">Team profile →</a>
                          {venuePath && <a href={venuePath} className="text-primary">{team.homeVenueName || 'Home venue'} →</a>}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        <section className="border-b border-border py-12">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Home ice</p><h2 className="mt-2 font-display text-3xl">Texas hockey venue guides</h2></div>
            <div>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">Dallas, Cedar Park and Allen already use TexasDefined’s full sports-venue guides. These additional rink pages close the junior-hockey venue gaps and connect teams to city, county and lodging research.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a href="/sports-venue/american-airlines-center" className="border-t border-border py-4 font-semibold hover:text-primary">American Airlines Center — Dallas Stars →</a>
                <a href="/sports-venue/heb-center-at-cedar-park" className="border-t border-border py-4 font-semibold hover:text-primary">H-E-B Center — Texas Stars →</a>
                <a href="/sports-venue/credit-union-of-texas-event-center" className="border-t border-border py-4 font-semibold hover:text-primary">Credit Union of Texas Event Center — Allen Americans →</a>
                {TEXAS_HOCKEY_VENUES.map((venue) => <a key={venue.slug} href={texasHockeyVenuePath(venue.slug)} className="border-t border-border py-4 font-semibold hover:text-primary">{venue.name} — {venue.city} →</a>)}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-12">
          <p className="eyebrow text-primary">How to use this directory</p>
          <h2 className="mt-2 font-display text-3xl">Team intent and venue intent stay separate</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <Explainer title="Team pages" body="Use these for league level, current alignment, affiliations, home ice, official sources and links into the team’s Texas location." />
            <Explainer title="Venue pages" body="Use these for the arena or rink itself, address, map, event-day planning, nearby-city context and places to stay." />
            <Explainer title="League pages" body="Use these to understand the level of hockey and see every current Texas club in that league without mixing historical teams into the active roster." />
          </div>
        </section>

        <section className="py-12">
          <p className="eyebrow text-primary">Historical names</p>
          <h2 className="mt-2 font-display text-3xl">Kept for disambiguation, not presented as current teams</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {TEXAS_HOCKEY_HISTORICAL_TEAMS.map((team) => (
              <article key={team.slug} className="border-t border-border py-4">
                <h3 className="font-display text-2xl"><a href={texasHockeyTeamPath(team.slug)} className="hover:text-primary">{team.name}</a></h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{team.currentNote || team.overview}</p>
              </article>
            ))}
          </div>
        </section>
      </article>
    </Container>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="bg-background p-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-2xl">{value}</dd></div>;
}

function Explainer({ title, body }: { title: string; body: string }) {
  return <article className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p></article>;
}
