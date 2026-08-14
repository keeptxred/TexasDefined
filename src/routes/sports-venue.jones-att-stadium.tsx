import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { SponsoredSportsPlacement } from '@/components/sports/SponsoredSportsPlacement';
import { getActiveSportsSponsorPlacement } from '@/data/sports-sponsorship.functions';
import { getSportsVenueEnrichmentAll, sportsVenueMapUrl } from '@/data/sports-venue-enrichment-all';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/sports-venue/jones-att-stadium';
const venueName = 'Galaxy Stadium';
const description = 'Galaxy Stadium in Lubbock is the home of Texas Tech Red Raiders football and one of West Texas’s major college-sports destinations. The stadium adopted the Galaxy name beginning with the 2026 football season while retaining the history and game-day traditions generations of Red Raider fans know from Jones AT&T Stadium.';

export const Route = createFileRoute('/sports-venue/jones-att-stadium')({
  loader: async () => ({
    sponsorPlacement: await getActiveSportsSponsorPlacement({ data: { surfacePath: canonicalPath } }),
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Galaxy Stadium: Texas Tech Football & Visitor Guide',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: GalaxyStadiumPage,
});

function GalaxyStadiumPage() {
  const { sponsorPlacement } = Route.useLoaderData();
  const enrichment = getSportsVenueEnrichmentAll('jones-att-stadium');
  const mapUrl = sportsVenueMapUrl(venueName, 'lubbock');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'StadiumOrArena',
    name: venueName,
    alternateName: ['Jones AT&T Stadium', 'Jones Stadium'],
    description,
    url: `https://texasdefined.com${canonicalPath}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lubbock',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Front page</a><span className="mx-2">/</span>
          <a href="/sports" className="hover:text-foreground">Texas Sports</a><span className="mx-2">/</span>
          <a href="/sports-venues" className="hover:text-foreground">Sports Venues</a><span className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">Galaxy Stadium</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Texas College Football</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Galaxy Stadium</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          </div>
          <dl className="border-y border-border py-4 text-sm lg:border-y-0 lg:border-l lg:py-0 lg:pl-6">
            <Fact label="City" value="Lubbock" />
            <Fact label="County" value="Lubbock County" />
            <Fact label="Capacity" value={enrichment?.capacity} />
            <Fact label="Opened" value={enrichment?.opened} />
            <Fact label="Former name" value="Jones AT&T Stadium" />
            <Fact label="Current name began" value="2026 season" />
          </dl>
        </header>

        <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-border py-5 text-sm font-semibold">
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href="https://texastech.com/facilities/jones-at-t-stadium/2" target="_blank" rel="noreferrer">Official Galaxy Stadium information ↗</a>
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={mapUrl} target="_blank" rel="noreferrer">Open in maps ↗</a>
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href="/county/lubbock">Explore Lubbock County →</a>
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href="/sports-venues">All Texas sports venues →</a>
        </div>

        {sponsorPlacement ? <div className="border-b border-border py-8"><SponsoredSportsPlacement placement={sponsorPlacement} /></div> : null}

        {enrichment ? <section className="border-b border-border py-12">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Verified visitor details</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">Plan a Red Raider game weekend</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Current venue naming and visitor details reviewed against Texas Tech Athletics sources.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {enrichment.history && <GuideCard title="Venue story" body={enrichment.history} />}
              <GuideCard title="Parking and access" body={enrichment.parking} />
              <GuideCard title="Arrival strategy" body={enrichment.arrival} />
              <GuideCard title="Stay and eat" body={enrichment.stayAndEat} />
              <GuideCard title="Build the weekend" body={enrichment.nearby} />
              <div className="border-t border-border pt-4">
                <h3 className="font-display text-2xl">Primary sports and events</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                  {enrichment.primaryEvents.map((event) => <li key={event}>• {event}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section> : null}

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Name change</p>
            <h2 className="mt-2 font-display text-3xl">Jones history, Galaxy era</h2>
          </div>
          <div className="max-w-3xl text-base leading-8 text-muted-foreground">
            <p>Texas Tech announced the Galaxy Stadium name for the 2026 football season under a 15-year naming-rights agreement. Texas Defined keeps the established venue URL stable so older bookmarks and inbound links continue to reach the current guide.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="galaxy-collections-heading">
          <div>
            <p className="eyebrow text-primary">Explore the collection</p>
            <h2 id="galaxy-collections-heading" className="mt-2 font-display text-3xl leading-tight">More Texas Tech and football venue guides</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Continue from Galaxy Stadium into the matching Lubbock, football and college-sports collections.</p>
          </div>
          <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
            <CollectionLink href="/sports-venues/lubbock" eyebrow="Sports market" title="Lubbock and Texas Tech sports venues" />
            <CollectionLink href="/sports-venues/football" eyebrow="Sports collection" title="Texas football stadiums" />
            <CollectionLink href="/sports-venues/college-sports" eyebrow="Sports collection" title="Texas college sports venues" />
          </div>
        </section>

        <aside className="grid gap-7 border-b border-border py-10 lg:grid-cols-[1fr_auto] lg:items-center" aria-labelledby="galaxy-partnership-heading">
          <div>
            <p className="eyebrow text-primary">Local business partnerships</p>
            <h2 id="galaxy-partnership-heading" className="mt-2 font-display text-3xl">Serve visitors coming to Galaxy Stadium?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Local visitor businesses can ask about clearly disclosed sports-travel sponsorships. Paid relationships do not change Texas Defined’s editorial conclusions, factual coverage or venue ranking.</p>
          </div>
          <a href={`/partner-with-us?type=sports-travel&source=${encodeURIComponent(canonicalPath)}#partnership-form-heading`} className="inline-flex min-h-11 items-center justify-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Ask about local partnership options →</a>
        </aside>
      </article>
    </Container>
  </>;
}

function CollectionLink({ href, eyebrow, title }: { href: string; eyebrow: string; title: string }) {
  return <a href={href} className="group border-t border-border py-5">
    <span className="eyebrow text-primary">{eyebrow}</span>
    <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{title}</strong>
    <span className="mt-3 block text-sm font-semibold text-primary">Browse collection →</span>
  </a>;
}

function GuideCard({ title, body }: { title: string; body: string }) {
  return <div className="border-t border-border pt-4"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></div>;
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 last:border-b-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null;
}