import { useMemo, useState } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { breweryCountySlug, breweryDestinationHref, breweryFieldGuides, texasBreweries, texasBrewerySnapshot } from '@/data/breweries/roster';

const description = 'Find active Texas brewer-licensed locations by city and county using Texas Alcoholic Beverage Commission records, plus independently researched guides to selected Texas breweries.';
const date = texasBrewerySnapshot.fetchedAt?.slice(0, 10);
const counties = [...new Set(texasBreweries.map((place) => place.county))].sort((a,b) => a.localeCompare(b));
const cities = new Set(texasBreweries.map((place) => place.city));

export const Route = createLazyFileRoute('/explore/breweries')({component: TexasBreweriesPage});

function TexasBreweriesPage() {
  const [query, setQuery] = useState('');
  const [county, setCounty] = useState('');
  const [visible, setVisible] = useState(60);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return texasBreweries.filter((place) =>
      (!county || place.county === county) &&
      (!search || [place.name, place.city, place.county, place.licenseId].some((part) => part.toLowerCase().includes(search)))
    );
  }, [query, county]);
  return <main>
    <section className="border-b border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm">
          <Link to="/" className="hover:underline">Home</Link><span aria-hidden="true"> / </span>
          <Link to="/explore" className="hover:underline">Explore</Link><span aria-hidden="true"> / </span>
          <span aria-current="page">Breweries</span>
        </nav>
        <p className="eyebrow mt-10 text-ink-foreground">Texas food & drink · Statewide reference</p>
        <h1 className="mt-5 max-w-5xl font-display text-5xl leading-tight sm:text-7xl">Texas breweries, from the Panhandle to the Gulf.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground">{description}</p>
        <div className="mt-9 grid max-w-4xl gap-6 border-t border-ink-foreground/25 pt-7 sm:grid-cols-3">
          <div><p className="font-display text-4xl">{texasBrewerySnapshot.fetchedAt ? texasBreweries.length.toLocaleString() : '—'}</p><p className="mt-1 text-sm">Active BW/BP locations</p></div>
          <div><p className="font-display text-4xl">{texasBrewerySnapshot.fetchedAt ? counties.length : '—'}</p><p className="mt-1 text-sm">Texas counties represented</p></div>
          <div><p className="font-display text-4xl">{texasBrewerySnapshot.fetchedAt ? cities.size : '—'}</p><p className="mt-1 text-sm">Cities with licenses</p></div>
        </div>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      <section aria-labelledby="visitor-guides-heading">
        <p className="eyebrow text-primary">Go beyond the license listing</p>
        <h2 id="visitor-guides-heading" className="mt-3 font-display text-3xl sm:text-4xl">Research-backed brewery visits</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">These Texas Defined destination guides contain more than a licensing record: local history, nearby attractions, and the visitor details published by the brewery.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {breweryFieldGuides.map((guide) => <article key={guide.href} className="border border-border bg-surface p-6">
            <p className="eyebrow text-primary">{guide.city} · {guide.county} County</p>
            <h3 className="mt-3 font-display text-2xl">{guide.name}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{guide.summary}</p>
            <a href={guide.href} className="mt-5 inline-block border-b border-primary font-semibold text-primary">Read brewery guide →</a>
          </article>)}
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-10" aria-labelledby="directory-heading">
        <p className="eyebrow text-primary">License-backed research · Texas statewide</p>
        <h2 id="directory-heading" className="mt-3 font-display text-4xl">Find a licensed Texas brewery</h2>
        <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">A Brewer’s License (BW) or Brewpub License (BP) identifies a Texas business licensed for qualifying malt beverage brewing activities. It does <strong>not</strong> confirm the site has a public taproom, offers tours, is open today, or operates a restaurant. Check directly before visiting.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)]">
          <div>
            <label htmlFor="brewery-search" className="mb-2 block text-sm font-semibold">Search by brewery, city, county or license ID</label>
            <input id="brewery-search" type="search" autoComplete="off" value={query} onChange={(event) => { setQuery(event.target.value); setVisible(60); }}
              placeholder="Example: Austin, Shiner, Houston…" className="w-full border border-border bg-background px-4 py-3 text-foreground outline-offset-4" />
          </div>
          <div>
            <label htmlFor="brewery-county" className="mb-2 block text-sm font-semibold">County</label>
            <select id="brewery-county" value={county} onChange={(event) => { setCounty(event.target.value); setVisible(60); }}
              className="w-full border border-border bg-background px-4 py-3 text-foreground">
              <option value="">All counties</option>
              {counties.map((name) => <option key={name} value={name}>{name} County</option>)}
            </select>
          </div>
        </div>
        {texasBrewerySnapshot.fetchedAt ? <p className="mt-5 text-sm text-muted-foreground" role="status">
          Showing {Math.min(visible,filtered.length).toLocaleString()} of {filtered.length.toLocaleString()} matching licenses · Snapshot generated {date}
        </p> : <p className="mt-5 border-l-4 border-primary bg-surface p-5 text-sm leading-7" role="status">
          The statewide TABC license snapshot is awaiting its initial automated import. Our independently researched destination guides are available above; the full roster will appear when the source job succeeds.
        </p>}
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, visible).map((place) => {
            const href = breweryDestinationHref(place);
            return <li key={place.licenseId} className="flex h-full flex-col border border-border p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{place.city} · {place.county} County</p>
              <h3 className="mt-2 font-display text-2xl leading-tight">{place.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{place.address || 'Address not available'}{place.zip ? ', TX ' + place.zip : ''}</p>
              <p className="mt-3 text-xs text-muted-foreground">TABC {place.licenseType === 'BP' ? 'BP subordinate (brewpub)' : 'BW brewer'} · {place.licenseStatus} · Visitor access unverified</p>
              <div className="mt-auto flex flex-wrap gap-4 pt-5 text-sm font-semibold">
                {href ? <a href={href} className="text-primary underline">Full visitor guide →</a> :
                  <Link to="/explore/breweries/$slug" params={{slug:place.slug}} className="text-primary underline">License & location →</Link>}
                <a href={'/county/' + breweryCountySlug(place.county)} className="text-primary underline">{place.county} County →</a>
              </div>
            </li>;
          })}
        </ul>
        {texasBrewerySnapshot.fetchedAt && filtered.length === 0 ? <p className="mt-8 text-muted-foreground">No currently listed licenses match those filters. Try another county or spelling.</p> : null}
        {filtered.length > visible ? <button type="button" onClick={() => setVisible((count) => count + 60)}
          className="mt-8 border border-primary px-7 py-3 font-semibold text-primary hover:bg-surface">Show more breweries</button> : null}
      </section>

      <section className="mt-16 border-t border-border pt-10" aria-labelledby="method-heading">
        <h2 id="method-heading" className="font-display text-3xl">Sources, scope & accuracy</h2>
        <div className="mt-5 grid gap-8 text-sm leading-7 text-muted-foreground lg:grid-cols-2">
          <div>
            <h3 className="font-semibold text-foreground">What is included?</h3>
            <p className="mt-2">Texas businesses with an active Brewer’s License (BW), or an active primary BG/MB/BE license showing subordinate Brewpub License (BP), in the Texas Alcoholic Beverage Commission’s public licensing dataset. A license is not proof of public access or a confirmed opening. Breweries in planning are not counted as operating facilities.</p>
            <p className="mt-3">We count licenses/locations, not brewery brands: multiple licensed premises operated by one company may appear separately. Retail-only bars without an identified BP subordinate license and out-of-state nonresident brewer licenses are excluded.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">How is it maintained?</h3>
            <p className="mt-2">A lightweight GitHub workflow checks the official TABC dataset daily. It keeps the last successful snapshot if the source is unavailable or the change looks suspicious. The site is redeployed only when the roster changes; hours, tours and food are never inferred from license data.</p>
            <p className="mt-3"><a className="text-primary underline" href="https://data.texas.gov/dataset/TABC-License-Information/7hf9-qc9f" target="_blank" rel="noopener noreferrer">Texas Alcoholic Beverage Commission license dataset ↗</a></p>
            <p className="mt-2"><a className="text-primary underline" href="https://texascraftbrewersguild.org/directory-brewery-members/" target="_blank" rel="noopener noreferrer">Texas Craft Brewers Guild member directory ↗</a> (membership directory, not a complete state license registry)</p>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">Adult beverages are intended for adults of legal drinking age. Visitor policies vary by business. <Link to="/explore/food-bbq" className="text-primary underline">Explore Texas food &amp; BBQ</Link> or <Link to="/explore/trip-planner" className="text-primary underline">plan a Texas road trip</Link>.</p>
      </section>
    </Container>
  </main>;
}
