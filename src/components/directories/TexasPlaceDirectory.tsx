import { useMemo, useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { findTexasPlaces } from '@/data/texas-places';

export function TexasPlaceDirectory({ mode }: { mode: 'counties' | 'cities' }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => findTexasPlaces(query), [query]);
  const items = mode === 'counties' ? results.counties : results.cities;
  const title = mode === 'counties' ? 'All 254 Texas Counties' : 'Texas City Directory';
  const intro = mode === 'counties'
    ? 'Browse every Texas county and continue to official county, appraisal, election, and local-government resources.'
    : 'Browse major and regional Texas cities by county and region.';

  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">Browse Texas</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">{title}</h1>
    <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>
    <label className="mt-8 flex max-w-xl items-center gap-3 rounded-md border border-border px-4 py-3">
      <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      <span className="sr-only">Search {mode}</span>
      <input className="w-full bg-transparent outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${mode}`} />
    </label>
    <p className="mt-4 text-sm text-muted-foreground">{items.length} results</p>
    <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {mode === 'counties' ? results.counties.map((county) => <li key={county.code} className="rounded-md border border-border p-5"><p className="eyebrow text-primary">County {county.code}</p><h2 className="mt-2 font-display text-2xl">{county.name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">County government, appraisal district, elections, services, and local resources.</p><a className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline" href={county.officialDirectoryUrl} target="_blank" rel="noreferrer">Official county directory <ExternalLink className="h-4 w-4" /></a></li>) : results.cities.map((city) => <li key={city.slug} className="rounded-md border border-border p-5"><p className="eyebrow text-primary">{city.region}</p><h2 className="mt-2 font-display text-2xl">{city.name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{city.county} County · Local services, moving information, costs, destinations, and nearby resources.</p><a className="mt-5 inline-block text-sm font-medium underline" href={`/search?q=${encodeURIComponent(city.name)}`}>Search TexasDefined for {city.name}</a></li>)}
    </ul>
  </Container>;
}
