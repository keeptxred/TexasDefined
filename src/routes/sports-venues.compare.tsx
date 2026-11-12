import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { SportsVenueLandingIndex } from '@/components/sports/SportsVenueLandingIndex';
import { Container } from '@/components/layout/Container';
import { buildMeta, canonicalLink } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';
const canonicalPath = '/sports-venues/compare';
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const csvUrl = `${siteUrl}/sports-venues/compare.csv`;
const description = 'Compare Texas sports venues by location, venue type, capacity and opening date where those details are available. Search the source-reviewed inventory and open individual visitor guides.';

export const Route = createFileRoute('/sports-venues/compare')({
  loader: async () => {
    const {
      SPORTS_VENUE_COMPARISON_LATEST_REVIEW,
      SPORTS_VENUE_COMPARISON_ROWS,
      SPORTS_VENUE_COMPARISON_WITH_CAPACITY,
      SPORTS_VENUE_COMPARISON_WITH_OPENED,
    } = await import('@/data/sports-venue-comparison');
    return {
      rows: SPORTS_VENUE_COMPARISON_ROWS,
      withCapacity: SPORTS_VENUE_COMPARISON_WITH_CAPACITY,
      withOpened: SPORTS_VENUE_COMPARISON_WITH_OPENED,
      latestReview: SPORTS_VENUE_COMPARISON_LATEST_REVIEW,
    };
  },
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Sports Venue Comparison: Stadiums, Arenas & More',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: SportsVenueComparisonPage,
});

function SportsVenueComparisonPage() {
  const { rows, withCapacity, withOpened, latestReview } = Route.useLoaderData();
  const [term, setTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'location' | 'type'>('name');
  const types = useMemo(() => [...new Set(rows.map((row) => row.type))].sort(), [rows]);
  const visibleRows = useMemo(() => {
    const query = term.trim().toLocaleLowerCase('en-US');
    const filtered = rows.filter((row) =>
      (typeFilter === 'all' || row.type === typeFilter)
      && (!query || [row.venue.name, row.city, row.county, row.type]
        .some((value) => value?.toLocaleLowerCase('en-US').includes(query))));
    return filtered.sort((a, b) => {
      const left = sortBy === 'location' ? a.city ?? a.county ?? '' : sortBy === 'type' ? a.type : a.venue.name;
      const right = sortBy === 'location' ? b.city ?? b.county ?? '' : sortBy === 'type' ? b.type : b.venue.name;
      return left.localeCompare(right) || a.venue.name.localeCompare(b.venue.name);
    });
  }, [rows, term, typeFilter, sortBy]);
  const quickAnswers = [
    {
      question: 'How many Texas sports venues are in this comparison?',
      answer: `TexasDefined currently compares ${rows.length} verified sports venue guides across professional, college, high-school, motorsports, golf, Western-sports, tournament and other destination categories.`,
    },
    {
      question: 'Does every Texas sports venue have a capacity listed?',
      answer: `No. Capacity is shown only when the verified venue profile contains a useful figure. ${withCapacity} of ${rows.length} venue records currently display capacity information; missing values are left blank rather than inferred.`,
    },
    {
      question: 'Are opening dates available for every venue?',
      answer: `No. ${withOpened} of ${rows.length} venue records currently include an opening year or opening-history note. TexasDefined leaves the field blank when the profile does not contain a verified value.`,
    },
    {
      question: 'Where should I verify current parking, ticketing and entry rules?',
      answer: 'Open the individual TexasDefined venue guide, then use its official planning links for current parking maps, tickets, gate times, entry rules and event-specific instructions. Those details can change after this comparison is reviewed.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: 'Texas Sports Venue Comparison',
        description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: { '@id': `${canonicalUrl}#dataset` },
      },
      {
        '@type': 'Dataset',
        '@id': `${canonicalUrl}#dataset`,
        name: 'Texas Sports Venue Comparison',
        description,
        url: canonicalUrl,
        creator: { '@id': `${siteUrl}/#organization` },
        publisher: { '@id': `${siteUrl}/#organization` },
        dateModified: latestReview,
        distribution: {
          '@type': 'DataDownload',
          encodingFormat: 'text/csv',
          contentUrl: csvUrl,
        },
        mainEntity: { '@id': `${canonicalUrl}#venues` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#venues`,
        name: 'Texas sports venues compared',
        numberOfItems: rows.length,
        itemListElement: rows.map(({ venue, canonicalPath: venuePath }, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: venue.name,
          url: `${siteUrl}${venuePath}`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#answers`,
        mainEntity: quickAnswers.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: `${siteUrl}/sports` },
          { '@type': 'ListItem', position: 3, name: 'Sports Venues', item: `${siteUrl}/sports-venues` },
          { '@type': 'ListItem', position: 4, name: 'Compare', item: canonicalUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <main className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Front page</a><span aria-hidden="true" className="mx-2">/</span>
          <a href="/sports" className="hover:text-foreground">Texas Sports</a><span aria-hidden="true" className="mx-2">/</span>
          <a href="/sports-venues" className="hover:text-foreground">Sports Venues</a><span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">Compare</span>
        </nav>

        <header className="border-b border-border py-10">
          <p className="eyebrow text-primary">Texas sports reference</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Compare Texas sports venues</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Venue guides" value={rows.length.toString()} />
            <Stat label="With capacity data" value={withCapacity.toString()} />
            <Stat label="With opening data" value={withOpened.toString()} />
            <Stat label="Latest profile review" value={latestReview ? formatDate(latestReview) : 'See venue guides'} />
          </dl>
          <a href="/sports-venues/compare.csv" className="mt-7 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Download comparison CSV ↓</a>
        </header>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="comparison-answers-heading">
          <div>
            <p className="eyebrow text-primary">Quick answers</p>
            <h2 id="comparison-answers-heading" className="mt-2 font-display text-3xl leading-tight">How to read the comparison</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Blank fields mean the verified profile does not currently contain that comparison value; TexasDefined does not fill gaps with guesses.</p>
          </div>
          <div className="grid gap-x-8 md:grid-cols-2">
            {quickAnswers.map((item) => <article key={item.question} className="border-t border-border py-5">
              <h3 className="font-display text-2xl leading-tight">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
            </article>)}
          </div>
        </section>

        <section className="border-b border-border py-12" aria-labelledby="comparison-table-heading">
          <form role="search" aria-label="Filter venue comparison" className="mb-8 grid gap-4 border-y border-border py-5 sm:grid-cols-3" onSubmit={(event) => event.preventDefault()}>
            <label className="block text-sm font-semibold" htmlFor="venue-search">Venue or location
              <input id="venue-search" type="search" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="e.g. Lubbock or ballpark" className="mt-2 block min-h-11 w-full border border-border bg-background px-3 py-2 text-foreground" />
            </label>
            <label className="block text-sm font-semibold" htmlFor="venue-type-filter">Venue type
              <select id="venue-type-filter" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="mt-2 block min-h-11 w-full border border-border bg-background px-3 py-2 text-foreground">
                <option value="all">All types</option>
                {types.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label className="block text-sm font-semibold" htmlFor="venue-sort">Sort by
              <select id="venue-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value as 'name' | 'location' | 'type')} className="mt-2 block min-h-11 w-full border border-border bg-background px-3 py-2 text-foreground">
                <option value="name">Venue name</option>
                <option value="location">Location</option>
                <option value="type">Venue type</option>
              </select>
            </label>
          </form>
          <p role="status" aria-live="polite" className="mb-6 text-sm text-muted-foreground">Showing {visibleRows.length} of {rows.length} venues. <button type="button" className="font-semibold text-primary underline underline-offset-4" onClick={() => { setTerm(''); setTypeFilter('all'); setSortBy('name'); }}>Reset filters</button></p>
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">All verified venues</p>
              <h2 id="comparison-table-heading" className="mt-2 font-display text-3xl leading-tight">Venue-by-venue comparison</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Capacity may vary by event configuration. Opening fields can include redevelopment context when a simple year would be misleading.</p>
            </div>
            <div className="min-w-0 overflow-x-auto border-t border-border">
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <caption className="sr-only">Comparison of {visibleRows.length} matching Texas sports venues by location, type, capacity and opening information.</caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    <th scope="col" className="py-4 pr-5 font-semibold">Venue</th>
                    <th scope="col" className="py-4 pr-5 font-semibold">Location</th>
                    <th scope="col" className="py-4 pr-5 font-semibold">Type</th>
                    <th scope="col" className="py-4 pr-5 font-semibold">Capacity</th>
                    <th scope="col" className="py-4 pr-5 font-semibold">Opened</th>
                    <th scope="col" className="py-4 pr-5 font-semibold">Official source</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row) => <tr key={row.venue.id} className="border-b border-border align-top">
                    <td className="py-4 pr-5"><a href={row.canonicalPath} className="font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">{row.venue.name}</a></td>
                    <td className="py-4 pr-5 text-muted-foreground">{row.city ?? row.county ?? 'Texas'}</td>
                    <td className="py-4 pr-5 text-muted-foreground">{row.type}</td>
                    <td className="py-4 pr-5 text-muted-foreground">{row.capacity ?? '—'}</td>
                    <td className="py-4 pr-5 text-muted-foreground">{row.opened ?? '—'}</td>
                    <td className="py-4 pr-5 text-muted-foreground">{row.officialUrl ? <a href={row.officialUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Venue site ↗</a> : '—'}</td>
                  </tr>)}
                  {!visibleRows.length ? <tr><td colSpan={6} className="py-8 text-muted-foreground">No venues match those filters. Try another sport or location.</td></tr> : null}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Source policy</p><h2 className="mt-2 font-display text-3xl">How to read this comparison</h2></div>
          <div className="max-w-4xl space-y-4 text-sm leading-7 text-muted-foreground">
            <p>This comparison and its CSV download use the same verified TexasDefined venue profiles that power the individual visitor guides. They are intended for durable comparison, not live event operations.</p>
            <p>Capacity, naming, event configuration, parking, entry, ticketing and operating details can change. Open the venue guide and follow its official source links before relying on a current event-day detail.</p>
            <p>TexasDefined does not rank venues by “best,” infer missing capacities or convert county-level context into a claim that two places are nearby.</p>
          </div>
        </section>

        <SportsVenueLandingIndex compact />
      </main>
    </Container>
  </>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="border-t border-border pt-3"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-2xl leading-tight">{value}</dd></div>;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}
