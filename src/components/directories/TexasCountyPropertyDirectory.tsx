import { Link } from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';
import { useMemo, useState } from 'react';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { findTexasPlaces } from '@/data/texas-places';

export const countyPropertyAnchor = (slug: string) => `county-${slug}`;

export function TexasCountyPropertyDirectory({ verifiedPropertySlugs }: { verifiedPropertySlugs: string[] }) {
  const [query, setQuery] = useState('');
  const counties = useMemo(() => findTexasPlaces(query).counties, [query]);
  const verified = useMemo(() => new Set(verifiedPropertySlugs), [verifiedPropertySlugs]);

  return (
    <>
      <DepartmentHero
        current="County property-tax guides"
        eyebrow="All 254 counties"
        title="The Texas county property guide"
        description="Find any Texas county. Local property-tax guides open directly when available; otherwise, use the main county guide while the local tax research is completed."
        tone="surface"
      />

      <Container className="py-10 sm:py-12">
        <label className="flex max-w-2xl border-b-2 border-foreground transition-colors focus-within:border-primary">
          <span className="sr-only">Search for a Texas county</span>
          <input className="w-full bg-transparent px-0 py-4 text-base outline-none placeholder:text-muted-foreground/70" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by county name" />
          <span className="eyebrow px-2 py-4 text-primary">Search</span>
        </label>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div><p className="eyebrow text-primary">County directory</p><h2 className="mt-2 font-display text-3xl">{query ? `Matches for “${query}”` : 'Every Texas county'}</h2></div>
          <p className="text-sm text-muted-foreground" role="status">{counties.length.toLocaleString('en-US')} {counties.length === 1 ? 'county' : 'counties'}</p>
        </div>

        {counties.length ? (
          <ul className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-3">
            {counties.map((county, index) => {
              const hasVerifiedPropertyGuide = verified.has(county.slug);
              return (
                <li id={countyPropertyAnchor(county.slug)} key={county.code} className={`border-b border-border py-7 sm:px-6 ${index % 3 === 0 ? 'lg:pl-0' : ''} ${index % 3 !== 2 ? 'lg:border-r' : ''}`}>
                  <p className="eyebrow text-primary">{hasVerifiedPropertyGuide ? 'Property-tax guide' : 'County guide'}</p>
                  <h3 className="mt-3 font-display text-3xl leading-tight">{county.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{hasVerifiedPropertyGuide ? 'Appraisal records, exemptions, protest steps, taxing units, calculators and official local resources.' : 'A full local property-tax guide is not available yet. Use the county guide and official directory for current local information.'}</p>
                  <div className="mt-5 flex flex-col items-start gap-3">
                    {hasVerifiedPropertyGuide ? (
                      <Link className="eyebrow border-b border-primary pb-1 text-primary" to="/property-tax/county/$county" params={{ county: county.slug }}>Open property-tax guide →</Link>
                    ) : (
                      <Link className="eyebrow border-b border-primary pb-1 text-primary" to="/$kind/$slug" params={{ kind: 'county', slug: county.slug }}>Open county guide →</Link>
                    )}
                    <a className="inline-flex items-center gap-2 text-xs text-muted-foreground underline underline-offset-4" href={county.officialDirectoryUrl} target="_blank" rel="noreferrer noopener">Official county directory <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="border-b border-border py-12"><p className="font-display text-3xl">No county matched that search.</p><p className="mt-3 text-sm text-muted-foreground">Check the spelling and try again.</p></div>
        )}
      </Container>
    </>
  );
}
