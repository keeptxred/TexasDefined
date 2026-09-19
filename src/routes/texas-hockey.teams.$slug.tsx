import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { HockeyStayNearby } from '@/components/sports/HockeyStayNearby';
import {
  TEXAS_HOCKEY_REVIEWED_AT,
  findTexasHockeyLeague,
  findTexasHockeyTeam,
  hockeyVenuePathForTeam,
  texasHockeyLeaguePath,
  texasHockeyTeamPath,
} from '@/data/texas-hockey';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';

export const Route = createFileRoute('/texas-hockey/teams/$slug')({
  loader: ({ params }) => {
    const team = findTexasHockeyTeam(params.slug);
    if (!team) throw notFound();
    const league = findTexasHockeyLeague(team.leagueSlug);
    if (!league) throw notFound();
    return { team, league };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: 'Texas hockey team not found' }, { name: 'robots', content: 'noindex' }] };
    const { team, league } = loaderData;
    const canonicalPath = texasHockeyTeamPath(team.slug);
    const description = team.name + ' hockey guide: ' + league.abbreviation + ', ' + team.city + ', home venue, league level, official sources, city/county links and Texas hockey trip planning.';
    const url = siteUrl + canonicalPath;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: team.name + ': League, Home Rink & Texas Hockey Guide',
        description,
        robots: team.status === 'historical' ? 'noindex, follow, max-image-preview:large' : undefined,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SportsTeam',
            '@id': url + '#team',
            name: team.name,
            sport: 'Ice hockey',
            url,
            sameAs: team.officialUrl ? [team.officialUrl] : undefined,
            memberOf: { '@type': 'SportsOrganization', name: league.name, url: siteUrl + texasHockeyLeaguePath(league.slug) },
            location: { '@type': 'Place', name: team.city + ', Texas' },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
              { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: siteUrl + '/sports' },
              { '@type': 'ListItem', position: 3, name: 'Texas Hockey', item: siteUrl + '/texas-hockey' },
              { '@type': 'ListItem', position: 4, name: team.name, item: url },
            ],
          },
        ],
      })],
    };
  },
  component: TeamPage,
});

function TeamPage() {
  const { team, league } = Route.useLoaderData();
  const venuePath = hockeyVenuePathForTeam(team);
  const levelLabel = team.level === 'professional' ? 'Professional hockey' : team.level === 'junior' ? 'Junior hockey' : 'College club hockey';

  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/">Front page</a><span className="mx-2">/</span><a href="/sports">Texas Sports</a><span className="mx-2">/</span><a href="/texas-hockey">Texas hockey</a><span className="mx-2">/</span><span aria-current="page">{team.name}</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">{levelLabel}</p>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{team.name}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">{team.overview}</p>
            {team.status === 'historical' && <p className="mt-5 border-l-4 border-primary pl-4 text-sm leading-7"><strong>Historical record:</strong> {team.currentNote}</p>}
            {team.status === 'active' && team.seasonNote && <p className="mt-5 border-l-4 border-primary pl-4 text-sm leading-7"><strong>{team.seasonLabel} note:</strong> {team.seasonNote}</p>}
          </div>
          <dl className="border-y border-border py-3 text-sm lg:border-y-0 lg:border-l lg:pl-6">
            <Fact label="League" value={league.abbreviation} />
            <Fact label="Season status" value={team.status === 'active' ? team.seasonLabel : 'Historical'} />
            <Fact label="Division" value={team.division} />
            <Fact label="City" value={team.city + ', Texas'} />
            <Fact label="Home ice" value={team.homeVenueName || 'Verify current schedule'} />
          </dl>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Team snapshot</p><h2 className="mt-2 font-display text-3xl">Where this team fits</h2></div>
          <div>
            <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              <Snapshot label="Level" value={levelLabel} />
              <Snapshot label="League / conference" value={league.name} />
              <Snapshot label="Governing body" value={league.governingBody} />
              <Snapshot label="Division" value={team.division || 'Conference-wide / not listed'} />
              <Snapshot label="City" value={team.city} />
              <Snapshot label="County" value={titleCounty(team.countySlug)} />
            </dl>
            {team.affiliation && <p className="mt-5 text-sm leading-7"><strong>Affiliation:</strong> {team.affiliation}</p>}
            <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">{league.description}</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Home ice & travel</p><h2 className="mt-2 font-display text-3xl">Plan the hockey trip</h2></div>
          <div>
            <p className="max-w-4xl text-sm leading-7 text-muted-foreground">{team.travelNote}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {venuePath && <Related href={venuePath} title={team.homeVenueName || 'Home venue'} body="Open the venue guide for rink or arena context, maps, planning details and related travel links." />}
              {team.secondaryVenuePath && <Related href={team.secondaryVenuePath} title={team.secondaryVenueName || 'Additional current-season venue'} body="This team has a current-season game or venue relationship here; check the specific game listing before travel." />}
              <Related href={'/city/' + team.citySlug} title={'Explore ' + team.city} body="Connect the game with the city guide, local attractions and broader visitor context." />
              <Related href={'/county/' + team.countySlug} title={titleCounty(team.countySlug)} body="Use the county guide for regional context, nearby places and practical Texas research." />
              <Related href={texasHockeyLeaguePath(league.slug)} title={league.abbreviation + ' in Texas'} body="See every current Texas team in this league or conference." />
            </div>
          </div>
        </section>

        {team.status === 'active' && venuePath ? <HockeyStayNearby city={team.city} citySlug={team.citySlug} /> : null}

        <section className="py-10">
          <p className="eyebrow text-primary">Official sources</p>
          <h2 className="mt-2 font-display text-3xl">Verify changing details before game day</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined uses the current {team.seasonLabel} alignment as the directory baseline. Schedules, rosters, affiliations, tickets, parking and venue operations can change after publication. Official team, league and venue sources control those details.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {team.officialUrl && <a href={team.officialUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official team site ↗</a>}
            <a href={team.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{team.sourceLabel} ↗</a>
            <a href={league.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{league.sourceLabel} ↗</a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Texas hockey directory reviewed {TEXAS_HOCKEY_REVIEWED_AT}.</p>
        </section>
      </article>
    </Container>
  );
}

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return <div className="border-b border-border py-2 last:border-0"><dt className="text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>;
}
function Snapshot({ label, value }: { label: string; value: string }) {
  return <div className="bg-background p-5"><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</dt><dd className="mt-2 font-semibold">{value}</dd></div>;
}
function Related({ href, title, body }: { href: string; title: string; body: string }) {
  return <a href={href} className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></a>;
}
function titleCounty(slug: string) {
  return slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ') + ' County';
}
