import { Link } from '@tanstack/react-router';
import { ExternalLink, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { findTexasPlaces } from '@/data/texas-places';

export const countyPropertyAnchor = (slug: string) => `county-${slug}`;

export function TexasCountyPropertyDirectory() {
  const [query, setQuery] = useState('');
  const counties = useMemo(() => findTexasPlaces(query).counties, [query]);

  return (
    <Container className="py-16 sm:py-24">
      <p className="eyebrow text-primary">All 254 counties</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">Find your Texas county</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
        Open a county property-tax guide first, then continue to official county and appraisal-district resources.
      </p>

      <label className="mt-8 flex max-w-xl items-center gap-3 rounded-md border border-border px-4 py-3">
        <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">Search for a Texas county</span>
        <input
          className="w-full bg-transparent outline-none"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type a county name"
        />
      </label>

      <p className="mt-4 text-sm text-muted-foreground" role="status">
        {query ? `${counties.length} good match${counties.length === 1 ? '' : 'es'}` : 'All 254 counties'}
      </p>

      {counties.length ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {counties.map((county) => (
            <li id={countyPropertyAnchor(county.slug)} key={county.code} className="rounded-md border border-border p-5">
              <p className="eyebrow text-primary">County property-tax guide</p>
              <h2 className="mt-2 font-display text-2xl">{county.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Appraisal records, exemptions, protest steps, taxing units, calculators and official local resources.
              </p>
              <div className="mt-5 flex flex-col items-start gap-3">
                <Link
                  className="text-sm font-medium text-primary underline"
                  to="/property-tax/county/$county"
                  params={{ county: county.slug }}
                >
                  Open the {county.name} property-tax guide
                </Link>
                <a
                  className="inline-flex items-center gap-2 text-sm font-medium underline"
                  href={county.officialDirectoryUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Visit the official county directory <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 border-t border-border py-8 text-sm text-muted-foreground">
          No county matched that search. Check the spelling and try again.
        </p>
      )}
    </Container>
  );
}
