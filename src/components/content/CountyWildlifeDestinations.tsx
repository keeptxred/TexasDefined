import { nationalWildlifeRefugeDestinations } from '@/data/wildlife-destinations';

function normalizeCounty(value: string) {
  return value.replace(/\s+County$/i, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function CountyWildlifeDestinations({ countyName }: { countyName: string }) {
  const countySlug = normalizeCounty(countyName);
  const destinations = nationalWildlifeRefugeDestinations
    .filter((destination) => destination.county && normalizeCounty(destination.county) === countySlug)
    .sort((left, right) => left.name.localeCompare(right.name));

  if (!destinations.length) return null;

  return (
    <section className="mt-8 border-t border-border pt-6" aria-labelledby={`county-wildlife-${countySlug}`}>
      <p className="eyebrow text-primary">Wildlife & public lands</p>
      <h3 id={`county-wildlife-${countySlug}`} className="mt-2 font-display text-3xl">Wildlife refuges in {countyName}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        These TexasDefined destination guides are tied to {countyName} through verified location data and use the managing agency as the controlling visitor source.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {destinations.map((destination) => (
          <a key={destination.slug} href={`/destination/${destination.slug}`} className="group border-t border-border pt-4">
            <span className="eyebrow text-primary">National Wildlife Refuge</span>
            <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{destination.name}</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">{destination.summary}</span>
            <span className="mt-3 inline-block text-sm font-semibold text-primary">Open wildlife guide →</span>
          </a>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <a href="/explore/wildlife" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas wildlife destinations</a>
        <a href="/texas-birds-guide" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas birds guide</a>
        <a href="/explore/outdoors" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Outdoors & wildlife</a>
      </div>
    </section>
  );
}
