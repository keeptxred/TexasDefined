import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import type { WeddingVenue } from '@/data/wedding-venues';

export function CountyWeddingVenues({ county, venues }: { county: TexasEntityRecord; venues: WeddingVenue[] }) {
  if (!venues.length) return null;

  const regionLinks = [...new Map(venues.map((venue) => [venue.regionSlug, { slug: venue.regionSlug, name: venue.regionName }])).values()];
  const countyName = / County$/i.test(county.name) ? county.name : `${county.name} County`;

  return <section className="border-b border-border py-12" aria-labelledby="county-wedding-venues-heading">
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Weddings in Texas</p>
        <h2 id="county-wedding-venues-heading" className="mt-2 font-display text-3xl leading-tight">Wedding venues in {countyName}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">A TexasDefined starting shortlist of wedding and event venues associated with this county. Venue availability, pricing, capacity and policies change, so confirm current details directly with each property before booking.</p>
        <a href="/wedding-venues" className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">Explore top Texas wedding venues →</a>
      </div>

      <div>
        <div className="grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
          {venues.map((venue) => <a key={venue.slug} href={`/wedding-venue/${venue.slug}`} className="group border-t border-border py-5">
            <span className="eyebrow text-primary">{venue.city ?? countyName}</span>
            <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{venue.name}</strong>
            <span className="mt-3 block text-sm font-semibold text-primary">Open venue profile →</span>
          </a>)}
        </div>

        {regionLinks.length ? <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-5 text-sm">
          <span className="font-semibold">Regional guides:</span>
          {regionLinks.map((region) => <a key={region.slug} href={`/wedding-venues/region/${region.slug}`} className="text-primary hover:underline">{region.name}</a>)}
        </div> : null}
      </div>
    </div>
  </section>;
}
