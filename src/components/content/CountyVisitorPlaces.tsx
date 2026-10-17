import { countyVisitorPlaces } from '@/data/county-visitor-places';

/** Complements existing county state-park, museum, lake, and coastal directories. */
export function CountyVisitorPlaces({ countySlug, countyName }: { countySlug: string; countyName: string }) {
  const places = countyVisitorPlaces(countySlug);
  if (!places.length) return null;
  return (
    <section className="border-b border-border py-10" aria-labelledby="county-visitor-places-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Local places to visit</p>
          <h2 id="county-visitor-places-heading" className="mt-2 font-display text-3xl">More to explore in {countyName}</h2>
        </div>
        <div>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            These additional local places complement the park, museum, beach and other destination guides on this county page. They are not ranked. For events, swimming, tours or restricted properties, always check current visitor information before traveling.
          </p>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
            {places.map((place) => (
              <li key={place.name} className="border-t border-border py-5">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{place.category}</span>
                <h3 className="mt-2 font-display text-xl">{place.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{place.description}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                  {place.relatedGuideHref ? (
                    <a href={place.relatedGuideHref} className="text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary">
                      Texas Defined guide →
                    </a>
                  ) : null}
                  <a href={place.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary">
                    Official information and research source ↗
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
