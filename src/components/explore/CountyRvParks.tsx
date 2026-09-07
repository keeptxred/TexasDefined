import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import { loadCountyRvParksSnapshot } from '@/data/rv-parks/county-index';
import type { Destination } from '@/data/types';

const siteUrl = 'https://texasdefined.com';

export function CountyRvParks({ county, rvParks }: { county: TexasEntityRecord; rvParks: Destination[] }) {
  // The route loader normally preloads these rows. Keep a synchronous render-time
  // lookup from the lightweight seed snapshot so SSR cannot silently lose county
  // RV discovery if a loader/runtime chunk returns an empty payload in production.
  // County display names (for example, "Randall County") normalize through the
  // same exact county matcher as the route slug and avoid any route-shape coupling.
  const resolvedRvParks = rvParks.length ? rvParks : loadCountyRvParksSnapshot(county.name);
  if (!resolvedRvParks.length) return null;

  const displayedRvParks = resolvedRvParks.slice(0, 12);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}/county/${county.slug}#rv-parks`,
    name: `RV parks and campgrounds in ${county.name}`,
    numberOfItems: resolvedRvParks.length,
    itemListElement: resolvedRvParks.map((park, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@type': 'Campground', name: park.name, url: `${siteUrl}/destination/${park.slug}` },
    })),
  };

  return <section className="border-b border-border py-12" aria-labelledby="county-rv-parks-heading">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">RV parks & campgrounds</p>
        <h2 id="county-rv-parks-heading" className="mt-2 font-display text-4xl">RV camping around {county.name}</h2>
      </div>
      <div>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined currently connects {resolvedRvParks.length} RV park or campground director{resolvedRvParks.length === 1 ? 'y entry' : 'y entries'} to this county. Verify hookups, rig limits, rates and reservations with the operator before travel.</p>
        <ul className="mt-6 grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
          {displayedRvParks.map((park) => <li key={park.slug} className="border-t border-border py-4">
            <a href={`/destination/${park.slug}`} className="group">
              <strong className="block font-display text-xl group-hover:text-primary">{park.name}</strong>
              <span className="mt-1 block text-sm text-muted-foreground">{park.nearestTown}, Texas</span>
            </a>
          </li>)}
        </ul>
        {resolvedRvParks.length > displayedRvParks.length ? <p className="mt-4 text-sm text-muted-foreground">More entries are available in the statewide directory.</p> : null}
        <a href="/explore/rv-parks" className="mt-6 inline-block text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">Browse all Texas RV parks & campgrounds →</a>
      </div>
    </div>
  </section>;
}

export default CountyRvParks;
