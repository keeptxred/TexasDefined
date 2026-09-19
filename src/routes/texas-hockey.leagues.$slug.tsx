import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import {
  TEXAS_HOCKEY_REVIEWED_AT,
  TEXAS_HOCKEY_SEASON,
  findTexasHockeyLeague,
  hockeyVenuePathForTeam,
  texasHockeyLeaguePath,
  texasHockeyTeamPath,
  texasHockeyTeamsForLeague,
} from '@/data/texas-hockey';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';

export const Route = createFileRoute('/texas-hockey/leagues/$slug')({
  loader: ({ params }) => {
    const league = findTexasHockeyLeague(params.slug);
    if (!league) throw notFound();
    return { league, teams: texasHockeyTeamsForLeague(league.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { league, teams } = loaderData;
    const canonicalPath = texasHockeyLeaguePath(league.slug);
    const description = league.abbreviation + ' hockey in Texas for ' + TEXAS_HOCKEY_SEASON + ': ' + teams.length + ' current Texas team' + (teams.length === 1 ? '' : 's') + ', cities, home venues, official sources and team profiles.';
    const url = siteUrl + canonicalPath;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: league.abbreviation + ' Hockey in Texas: Teams, Cities & Home Rinks', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'SportsOrganization', '@id': url + '#league', name: league.name, sport: 'Ice hockey', url, sameAs: [league.sourceUrl] },
          { '@type': 'ItemList', numberOfItems: teams.length, itemListElement: teams.map((team, index) => ({ '@type': 'ListItem', position: index + 1, name: team.name, url: siteUrl + texasHockeyTeamPath(team.slug) })) },
        ],
      })],
    };
  },
  component: LeaguePage,
});

function LeaguePage() {
  const { league, teams } = Route.useLoaderData();
  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/">Front page</a><span className="mx-2">/</span><a href="/sports">Texas Sports</a><span className="mx-2">/</span><a href="/texas-hockey">Texas hockey</a><span className="mx-2">/</span><span aria-current="page">{league.abbreviation}</span>
        </nav>
        <header className="border-b border-border py-10">
          <p className="eyebrow text-primary">{league.level} hockey · {TEXAS_HOCKEY_SEASON}</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{league.abbreviation} hockey in Texas</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{league.description}</p>
          <p className="mt-4 text-sm font-semibold">{teams.length} current Texas {teams.length === 1 ? 'team/program' : 'teams/programs'} in this directory.</p>
        </header>

        <section className="border-b border-border py-12">
          <div className="grid gap-5 md:grid-cols-2">
            {teams.map((team) => {
              const venuePath = hockeyVenuePathForTeam(team);
              return (
                <article key={team.slug} className="border-t-2 border-foreground pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{team.city}{team.division ? ' · ' + team.division : ''}</p>
                  <h2 className="mt-2 font-display text-3xl"><a href={texasHockeyTeamPath(team.slug)} className="hover:text-primary">{team.name}</a></h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{team.overview}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                    <a href={texasHockeyTeamPath(team.slug)} className="text-primary">Team profile →</a>
                    {venuePath && <a href={venuePath} className="text-primary">{team.homeVenueName || 'Home venue'} →</a>}
                    <a href={'/city/' + team.citySlug} className="text-primary">{team.city} guide →</a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Source & scope</p><h2 className="mt-2 font-display text-3xl">Current roster policy</h2></div>
          <div>
            <p className="max-w-4xl text-sm leading-7 text-muted-foreground">This page treats the official {TEXAS_HOCKEY_SEASON} league/conference alignment as the current roster. TexasDefined does not carry an older club forward just because it appeared in a prior-season list. Historical names are kept separately on the statewide hockey hub when they remain useful for search and disambiguation.</p>
            <a href={league.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4">{league.sourceLabel} ↗</a>
            <p className="mt-3 text-xs text-muted-foreground">Reviewed {TEXAS_HOCKEY_REVIEWED_AT}.</p>
          </div>
        </section>
      </article>
    </Container>
  );
}
