import { Container } from '@/components/layout/Container';
import type { WeddingVenue, WeddingVenueRegion } from '@/data/wedding-venues.types';

const siteUrl = 'https://texasdefined.com';

export type WeddingVenueDirectoryStats = {
  submittedRows: number;
  uniqueVenues: number;
  duplicateRowsRemoved: number;
  countyCurated: number;
  regionOnly: number;
};

export function WeddingVenueDirectoryPage({
  regions,
  stats,
  venues: allVenues,
}: {
  regions: WeddingVenueRegion[];
  stats: WeddingVenueDirectoryStats;
  venues: WeddingVenue[];
}) {
  const canonicalPath = '/wedding-venues';
  const description = 'Explore a TexasDefined starting shortlist of wedding venues across Austin and the Hill Country, Dallas–Fort Worth, Houston and the Gulf Coast, San Antonio and South Texas, East Texas, West Texas and the Panhandle.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}${canonicalPath}#page`,
        url: `${siteUrl}${canonicalPath}`,
        name: 'Top Wedding Venues in Texas',
        description,
        about: { '@type': 'Thing', name: 'Texas wedding venues' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}${canonicalPath}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Wedding Venues', item: `${siteUrl}${canonicalPath}` },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <main className="mx-auto max-w-6xl">
        <header className="border-b border-border pb-10">
          <p className="eyebrow text-primary">Texas Weddings, Defined</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Top wedding venues in Texas</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">This is a discovery shortlist, not a paid ranking or a claim that one venue is objectively better than another. Start here, compare regions and styles, then confirm availability, capacity, pricing, lodging, accessibility, vendor rules and ceremony options directly with the venue.</p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Unique venues" value={stats.uniqueVenues} />
            <Stat label="Texas regions" value={regions.length} />
            <Stat label="County-linked" value={stats.countyCurated} />
            <Stat label="Submitted rows" value={stats.submittedRows} />
          </dl>
        </header>

        <section className="border-b border-border py-10" aria-labelledby="choose-region-heading">
          <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Choose a region</p>
              <h2 id="choose-region-heading" className="mt-2 font-display text-4xl">Where in Texas are you planning?</h2>
            </div>
            <div className="grid gap-x-7 sm:grid-cols-2">
              {regions.map((region) => {
                const count = allVenues.filter((venue) => venue.regionSlug === region.slug).length;
                return <a key={region.slug} href={`/wedding-venues/region/${region.slug}`} className="group border-t border-border py-6">
                  <span className="eyebrow text-primary">{count} venues</span>
                  <strong className="mt-2 block font-display text-3xl leading-tight group-hover:text-primary">{region.name}</strong>
                  <span className="mt-3 block text-sm leading-6 text-muted-foreground">{region.shortLabel}</span>
                  <span className="mt-4 block text-sm font-semibold text-primary">Browse the regional shortlist →</span>
                </a>;
              })}
            </div>
          </div>
        </section>

        {regions.map((region) => {
          const venues = allVenues.filter((venue) => venue.regionSlug === region.slug);
          const preview = venues.slice(0, 12);
          return <section key={region.slug} className="border-b border-border py-12 last:border-b-0">
            <div className="flex flex-col gap-5 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-primary">Texas wedding venues</p>
                <h2 className="mt-2 font-display text-4xl">{region.name}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{region.description}</p>
              </div>
              <a href={`/wedding-venues/region/${region.slug}`} className="shrink-0 text-sm font-semibold text-primary hover:underline">See all {venues.length} →</a>
            </div>

            <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
              {preview.map((venue) => <a key={venue.slug} href={`/wedding-venue/${venue.slug}`} className="group border-b border-border py-5">
                <span className="eyebrow text-primary">{venue.city ?? region.name}</span>
                <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{venue.name}</strong>
                {venue.countySlug ? <span className="mt-2 block text-sm text-muted-foreground">{title(venue.countySlug)} County</span> : <span className="mt-2 block text-sm text-muted-foreground">Location verification in progress</span>}
              </a>)}
            </div>
          </section>;
        })}

        <aside className="mt-12 grid gap-7 border-y border-border py-8 lg:grid-cols-[1fr_auto] lg:items-center" aria-labelledby="wedding-partnership-heading">
          <div>
            <p className="eyebrow text-primary">Wedding-industry partnerships</p>
            <h2 id="wedding-partnership-heading" className="mt-2 font-display text-3xl">Operate a Texas wedding venue or serve wedding travelers?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined is building destination-style wedding planning pages by region and county. Venue owners and wedding-travel businesses can submit factual corrections or ask about clearly disclosed partnership opportunities. Paid relationships do not determine editorial inclusion or placement.</p>
          </div>
          <a href="/partner-with-us?type=weddings&source=%2Fwedding-venues#partnership-form-heading" className="inline-flex min-h-11 items-center justify-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Explore partnership options →</a>
        </aside>
      </main>
    </Container>
  </>;
}

export function WeddingVenueRegionPage({ region, venues }: { region: WeddingVenueRegion; venues: WeddingVenue[] }) {
  const canonicalPath = `/wedding-venues/region/${region.slug}`;
  const countyCount = new Set(venues.flatMap((venue) => venue.countySlug ? [venue.countySlug] : [])).size;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}${canonicalPath}#page`,
        url: `${siteUrl}${canonicalPath}`,
        name: `Top Wedding Venues in ${region.name}`,
        description: region.description,
        mainEntity: { '@id': `${siteUrl}${canonicalPath}#venues` },
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}${canonicalPath}#venues`,
        name: `Wedding venues in ${region.name}`,
        numberOfItems: venues.length,
        itemListElement: venues.map((venue, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: venue.name,
          url: `${siteUrl}/wedding-venue/${venue.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}${canonicalPath}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Wedding Venues', item: `${siteUrl}/wedding-venues` },
          { '@type': 'ListItem', position: 3, name: region.name, item: `${siteUrl}${canonicalPath}` },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <main className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Front page</a><span aria-hidden="true" className="mx-2">/</span><a href="/wedding-venues" className="hover:text-foreground">Wedding venues</a><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">{region.name}</span>
        </nav>

        <header className="border-b border-border py-10">
          <p className="eyebrow text-primary">Texas Weddings, Defined</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Top wedding venues in {region.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{region.description}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined treats this as a discovery shortlist rather than a numerical ranking. Verify current pricing, availability, capacity, curfews, vendor policies, accessibility, rain plans and lodging directly with each venue before making a booking decision.</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3"><Stat label="Venues" value={venues.length} /><Stat label="County-linked" value={venues.filter((venue) => venue.countySlug).length} /><Stat label="Counties represented" value={countyCount} /></dl>
        </header>

        <section className="py-10" aria-labelledby="venue-list-heading">
          <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
            <div><p className="eyebrow text-primary">Regional shortlist</p><h2 id="venue-list-heading" className="mt-2 font-display text-4xl">Compare the starting field</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Locations with a curated county association also appear on the corresponding TexasDefined county guide, strengthening local discovery without assigning uncertain venues to the wrong county.</p></div>
            <ol className="grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
              {venues.map((venue) => <li key={venue.slug} className="border-t border-border py-5"><a href={`/wedding-venue/${venue.slug}`} className="group block"><span className="eyebrow text-primary">{venue.city ?? 'Regional location'}</span><strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{venue.name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{venue.countySlug ? `${title(venue.countySlug)} County` : 'County verification in progress'}</span><span className="mt-3 block text-sm font-semibold text-primary">Open venue profile →</span></a></li>)}
            </ol>
          </div>
        </section>

        <aside className="mt-8 border-y border-border py-8"><p className="eyebrow text-primary">Keep comparing</p><h2 className="mt-2 font-display text-3xl">See wedding venues across Texas</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">The statewide wedding venue guide connects this regional shortlist with Austin and the Hill Country, Dallas–Fort Worth, Houston and the Gulf Coast, San Antonio and South Texas, East Texas, West Texas and the Panhandle.</p><a href="/wedding-venues" className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">Back to all Texas wedding venues →</a></aside>
      </main>
    </Container>
  </>;
}

export function WeddingVenueProfilePage({ venue, region }: { venue: WeddingVenue; region: WeddingVenueRegion }) {
  const canonicalPath = `/wedding-venue/${venue.slug}`;
  const regionPath = `/wedding-venues/region/${region.slug}`;
  const countyName = venue.countySlug ? `${title(venue.countySlug)} County` : undefined;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Place',
        '@id': `${siteUrl}${canonicalPath}#venue`,
        name: venue.name,
        url: `${siteUrl}${canonicalPath}`,
        containedInPlace: countyName ? { '@type': 'AdministrativeArea', name: countyName } : { '@type': 'Place', name: region.name },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}${canonicalPath}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Wedding Venues', item: `${siteUrl}/wedding-venues` },
          { '@type': 'ListItem', position: 3, name: region.name, item: `${siteUrl}${regionPath}` },
          { '@type': 'ListItem', position: 4, name: venue.name, item: `${siteUrl}${canonicalPath}` },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <main className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><a href="/" className="hover:text-foreground">Front page</a><span aria-hidden="true" className="mx-2">/</span><a href="/wedding-venues" className="hover:text-foreground">Wedding venues</a><span aria-hidden="true" className="mx-2">/</span><a href={regionPath} className="hover:text-foreground">{region.name}</a><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">{venue.name}</span></nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div><p className="eyebrow text-primary">Texas Wedding Venue</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{venue.name}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">TexasDefined has added {venue.name} to the {region.name} wedding-venue shortlist. This first-pass profile is intentionally limited while venue-specific details are checked against current first-party information.</p></div>
          <dl className="border-y border-border py-4 text-sm lg:border-y-0 lg:border-l lg:py-0 lg:pl-6"><Fact label="Region" value={region.name} /><Fact label="Area" value={venue.city} /><Fact label="County" value={countyName} /><Fact label="Profile status" value="Venue details in verification" /></dl>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
          <div><p className="eyebrow text-primary">Before you book</p><h2 className="mt-2 font-display text-3xl">What to confirm with the venue</h2></div>
          <div><p className="max-w-3xl text-base leading-7 text-muted-foreground">Wedding venue policies and packages can change quickly. TexasDefined will expand this profile as current first-party details are verified. In the meantime, these are the practical questions worth asking every venue on a serious shortlist.</p><ul className="mt-7 grid gap-x-8 sm:grid-cols-2">{PLANNING_CHECKLIST.map((item) => <li key={item} className="border-t border-border py-4 text-sm leading-6">{item}</li>)}</ul></div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
          <div><p className="eyebrow text-primary">Continue comparing</p><h2 className="mt-2 font-display text-3xl">See more venues nearby and statewide</h2></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={regionPath} className="border border-border p-5 hover:border-primary"><span className="eyebrow text-primary">Regional guide</span><strong className="mt-2 block font-display text-2xl">Wedding venues in {region.name}</strong><span className="mt-3 block text-sm font-semibold text-primary">Compare the region →</span></a>
            {venue.countySlug ? <a href={`/county/${venue.countySlug}`} className="border border-border p-5 hover:border-primary"><span className="eyebrow text-primary">County guide</span><strong className="mt-2 block font-display text-2xl">Explore {countyName}</strong><span className="mt-3 block text-sm font-semibold text-primary">Open the county guide →</span></a> : <a href="/wedding-venues" className="border border-border p-5 hover:border-primary"><span className="eyebrow text-primary">Statewide guide</span><strong className="mt-2 block font-display text-2xl">All Texas wedding venues</strong><span className="mt-3 block text-sm font-semibold text-primary">Compare Texas →</span></a>}
          </div>
        </section>

        <aside className="mt-10 border-y border-border py-7 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">This venue profile is still growing:</strong> TexasDefined is expanding this page with current venue details and editorially verified guidance. Confirm pricing, availability, capacity, policies and booking terms directly with the venue while we complete that verification.</aside>
      </main>
    </Container>
  </>;
}

const PLANNING_CHECKLIST = [
  'Current availability and minimum-spend or rental requirements for your date.',
  'Guest capacity for the ceremony, cocktail hour and reception layout you want.',
  'Indoor backup space and weather procedures for outdoor ceremonies or receptions.',
  'Catering, bar, cake and outside-vendor rules, including required or preferred vendor lists.',
  'Rental hours, setup and teardown windows, curfews and overtime charges.',
  'Tables, chairs, linens, sound, lighting and other rentals included in the venue package.',
  'Parking, rideshare access, shuttle staging and accessibility for guests with mobility needs.',
  'On-site suites, lodging, nearby hotel blocks and travel time for out-of-town guests.',
  'Décor restrictions, open-flame rules, send-off rules and cleanup responsibilities.',
  'Cancellation, rescheduling, deposit, insurance and force-majeure terms in the current contract.',
] as const;

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="border-t border-border pt-3"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd className="mt-1 font-display text-3xl">{value}</dd></div>;
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0 lg:last:pb-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null;
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
