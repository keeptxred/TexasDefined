import { aquariumMarineLinksForCounty } from "@/data/aquarium-marine-county-links";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";

export function CountyAquariumDestinations({ county }: { county: TexasEntityRecord }) {
  const destinations = aquariumMarineLinksForCounty(county.slug);
  if (destinations.length === 0) return null;

  const countyName = / County$/i.test(county.name) ? county.name : `${county.name} County`;
  const destinationLabel = destinations.length === 1 ? "this marine-life destination" : "these marine-life destinations";

  return <section className="border-b border-border py-10">
    <div className="flex flex-col gap-5 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow text-primary">Aquariums & marine life</p>
        <h2 className="mt-2 max-w-3xl font-display text-4xl">Aquariums and marine-life stops in {countyName}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">TexasDefined has dedicated visit guides for {destinationLabel} in the county, with current official visitor sources and trip-planning context.</p>
      </div>
      <a href="/explore/aquariums" className="shrink-0 border-b border-primary pb-1 text-sm font-semibold text-primary">Browse statewide guide →</a>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination, index) => <a key={destination.slug} href={`/destination/${destination.slug}`} className={`group border-b border-border py-6 sm:px-5 ${index % 3 !== 0 ? "lg:border-l" : ""}`}>
        <span className="eyebrow text-primary">{destination.nearestTown}</span>
        <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{destination.name}</strong>
        <small className="mt-3 block text-sm leading-6 text-muted-foreground">Open aquarium & marine-life guide →</small>
      </a>)}
    </div>
  </section>;
}
