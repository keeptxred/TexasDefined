import { Link } from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { findTexasPlaces } from '@/data/texas-places';

export const countyPropertyAnchor = (slug: string) => `county-${slug}`;

export function TexasCountyPropertyDirectory() {
  const [query, setQuery] = useState('');
  const counties = useMemo(() => findTexasPlaces(query).counties, [query]);

  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <p className="eyebrow text-primary">All 254 counties</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">The Texas county property guide</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Find a county, open its property-tax guide and continue to the official local records and offices behind the numbers.</p>
          <label className="mt-9 flex max-w-2xl border-b-2 border-foreground">
            <span className="sr-only">Search for a Texas county</span>
            <input className="w-full bg-transparent px-0 py-4 text-base outline-none placeholder:text-muted-foreground/70" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by county name" />
            <span className="eyebrow px-2 py-4 text-primary">Search</span>
          </label>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div><p className="eyebrow text-primary">County directory</p><h2 className="mt-2 font-display text-3xl">{query ? `Matches for “${query}”` : 'Every Texas county'}</h2></div>
          <p className="text-sm text-muted-foreground" role="status">{counties.length.toLocaleString('en-US')} {counties.length === 1 ? 'county' : 'counties'}</p>
        </div>

        {counties.length ? (
          <ul className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-3">
            {counties.map((county, index) => (
              <li id={countyPropertyAnchor(county.slug)} key={county.code} className={`border-b border-border py-7 sm:px-6 ${index % 3 === 0 ? 'lg:pl-0' : ''} ${index % 3 !== 2 ? 'lg:border-r' : ''}`}>
                <p className="eyebrow text-primary">County guide</p>
                <h3 className="mt-3 font-display text-3xl leading-tight">{county.name}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Appraisal records, exemptions, protest steps, taxing units, calculators and official local resources.</p>
                <div className="mt-5 flex flex-col items-start gap-3">
                  <Link className="eyebrow border-b border-primary pb-1 text-primary" to="/property-tax/county/$county" params={{ county: county.slug }}>Open the guide →</Link>
                  <a className="inline-flex items-center gap-2 text-xs text-muted-foreground underline underline-offset-4" href={county.officialDirectoryUrl} target="_blank" rel="noreferrer noopener">Official county directory <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-b border-border py-12"><p className="font-display text-3xl">No county matched that search.</p><p className="mt-3 text-sm text-muted-foreground">Check the spelling and try again.</p></div>
        )}
      </Container>
    </>
  );
}
