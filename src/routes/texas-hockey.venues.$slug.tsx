import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { HockeyStayNearby } from '@/components/sports/HockeyStayNearby';
import {
  TEXAS_HOCKEY_REVIEWED_AT,
  findTexasHockeyVenue,
  texasHockeyTeamPath,
  texasHockeyTeamsForHockeyVenue,
  texasHockeyVenuePath,
} from '@/data/texas-hockey';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';

export const Route = createFileRoute('/texas-hockey/venues/$slug')({
  loader: ({ params }) => {
    const venue = findTexasHockeyVenue(params.slug);
    if (!venue) throw notFound();
    return { venue, teams: texasHockeyTeamsForHockeyVenue(venue.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { venue, teams } = loaderData;
    const canonicalPath = texasHockeyVenuePath(venue.slug);
    const description = venue.name + ' hockey guide in ' + venue.city + ', Texas: home teams, address, visitor planning, city/county links, official sources and nearby stay planning.';
    const url = siteUrl + canonicalPath;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: venue.name + ': Hockey, Teams & Visitor Guide', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SportsActivityLocation',
            '@id': url + '#venue',
            name: venue.name,
            sport: 'Ice hockey',
            url,
            sameAs: venue.officialUrl ? [venue.officialUrl] : undefined,
            address: { '@type': 'PostalAddress', streetAddress: venue.address.split(', ')[0], addressLocality: venue.city, addressRegion: 'TX', addressCountry: 'US' },
          },
          {
            '@type': 'ItemList',
            numberOfItems: teams.length,
            itemListElement: teams.map((team, index) => ({ '@type': 'ListItem', position: index + 1, name: team.name, url: siteUrl + texasHockeyTeamPath(team.slug) })),
          },
        ],
      })],
    };
  },
  component: VenuePage,
});

function VenuePage() {
  const { venue, teams } = Route.useLoaderData();
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue.address);

  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/">Front page</a><span className="mx-2">/</span><a href="/sports">Texas Sports</a><span className="mx-2">/</span><a href="/texas-hockey">Texas hockey</a><span className="mx-2">/</span><span aria-current="page">{venue.name}</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Texas hockey venue</p>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{venue.name}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">{venue.overview}</p>
          </div>
          <dl className="border-y border-border py-3 text-sm lg:border-y-0 lg:border-l lg:pl-6">
            <Fact label="City" value={venue.city + ', Texas'} />
            <Fact label="County" value={titleCounty(venue.countySlug)} />
            <Fact label="Address" value={venue.address} />
            <Fact label="Hockey teams" value={teams.map((team) => team.name).join(' · ')} />
          </dl>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Home ice</p><h2 className="mt-2 font-display text-3xl">Teams at this venue</h2></div>
          <div className="grid gap-5 md:grid-cols-2">
            {teams.map((team) => (
              <a key={team.slug} href={texasHockeyTeamPath(team.slug)} className="border-t-2 border-foreground pt-4">
                <h3 className="font-display text-2xl hover:text-primary">{team.name}</h3>
                <p className="mt-2 text-sm font-semibold">{team.division || team.leagueSlug.toUpperCase()}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{team.overview}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Plan the visit</p><h2 className="mt-2 font-display text-3xl">Use current event information</h2></div>
          <div>
            <p className="max-w-4xl text-sm leading-7 text-muted-foreground">{venue.planning}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Related href={mapUrl} external title="Open the venue in maps" body={venue.address} />
              <Related href={'/city/' + venue.citySlug} title={'Explore ' + venue.city} body="Pair the hockey game with the city guide and nearby visitor context." />
              <Related href={'/county/' + venue.countySlug} title={titleCounty(venue.countySlug)} body="Use the county guide for the surrounding Texas region and nearby places." />
              <Related href="/texas-hockey" title="All Texas hockey" body="Return to the statewide team, league and venue directory." />
            </div>
          </div>
        </section>

        <HockeyStayNearby city={venue.city} citySlug={venue.citySlug} />

        <section className="py-10">
          <p className="eyebrow text-primary">Official planning sources</p>
          <h2 className="mt-2 font-display text-3xl">Check the event before you go</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Game times, parking, tickets, gate procedures and rink operations can change. The linked team or venue source controls current event-day information.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {venue.officialUrl && <a href={venue.officialUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official venue site ↗</a>}
            <a href={venue.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{venue.sourceLabel} ↗</a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Reviewed {TEXAS_HOCKEY_REVIEWED_AT}.</p>
        </section>
      </article>
    </Container>
  );
}

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return <div className="border-b border-border py-2 last:border-0"><dt className="text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>;
}
function Related({ href, title, body, external = false }: { href: string; title: string; body: string; external?: boolean }) {
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer noopener' : undefined} className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></a>;
}
function titleCounty(slug: string) {
  return slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ') + ' County';
}
