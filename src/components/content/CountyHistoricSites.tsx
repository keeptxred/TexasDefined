import { useSuspenseQuery } from '@tanstack/react-query';

import { destinationsQuery } from '@/data/queries';
import { historicChurches } from '@/data/historic-churches';

export function CountyHistoricSites({ countyName }: { countyName: string }) {
  const { data: destinations } = useSuspenseQuery(destinationsQuery({ category: 'historic-sites' }));
  const county = countyName.replace(/\s+County$/i, '').trim().toLowerCase();
  const sites = destinations
    .filter((destination) => destination.county?.replace(/\s+County$/i, '').trim().toLowerCase() === county)
    .sort((left, right) => left.name.localeCompare(right.name));
  const churchSites = historicChurches.filter(church => church.county.toLowerCase().split(/\s*\/\s*|\s+and\s+/).includes(county) || (county === 'dewitt' && church.slug === 'yoakum-st-joseph-catholic-church'));
  if (!sites.length && !churchSites.length) return null;

  return <section className="border-t border-border pt-5">
    <p className="eyebrow text-primary">Historic places in this county</p>
    <h3 className="mt-2 font-display text-2xl">History you can visit in {countyName}</h3>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">Texas Defined currently connects {sites.length} {sites.length === 1 ? 'historic destination' : 'historic destinations'} to this county guide.</p>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">{sites.map((site) => <a key={site.slug} href={`/destination/${site.slug}`} className="group border-t border-border pt-4"><span className="eyebrow text-primary">{site.nearestTown}</span><strong className="mt-1 block font-display text-xl leading-tight group-hover:text-primary">{site.name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{site.summary}</span></a>)}</div>
    {churchSites.length>0 ? <div className="mt-8 border-t border-border pt-5"><p className="eyebrow text-primary">Historic Churches of Texas</p><h4 className="mt-2 font-display text-xl">Parish history and architecture</h4><div className="mt-4 grid gap-4 sm:grid-cols-2">{churchSites.map(church=><a key={church.slug} href={"/explore/historic-churches/"+church.slug} className="border-t border-border pt-3"><strong className="block text-lg font-semibold text-primary">{church.shortName}</strong><span className="mt-1 block text-sm leading-6 text-muted-foreground">{church.quickAnswer}</span></a>)}</div></div> : null}
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold"><a href="/explore/historic-sites" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">All Texas historic sites</a><a href="/explore/historic-churches" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Historic Churches of Texas</a><a href="/texas-history" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas History hub</a></div>
  </section>;
}
