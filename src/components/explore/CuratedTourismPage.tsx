import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import type { CuratedTourismCollection } from "@/data/curated-tourism-collections";
import type { ImageRef } from "@/data/types";

type ExistingGuide = {
  slug: string;
  name: string;
  hero: ImageRef;
};

export function CuratedTourismPage({
  collection,
  existing,
}: {
  collection: CuratedTourismCollection;
  existing: ExistingGuide[];
}) {
  return (
    <main>
      <section className="border-b border-border bg-surface">
        <Container className="py-12 sm:py-20">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/explore" className="hover:text-primary">Explore Texas</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{collection.title}</span>
          </nav>
          <p className="eyebrow mt-9 text-primary">{collection.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-6xl">{collection.title}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{collection.intro}</p>
          <p className="mt-6 max-w-4xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">How we chose these places: </strong>{collection.selection}</p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <section aria-labelledby="curated-tourism-destinations">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-foreground pb-6">
            <div>
              <p className="eyebrow text-primary">Focused statewide shortlist</p>
              <h2 id="curated-tourism-destinations" className="mt-3 font-display text-3xl sm:text-4xl">{collection.items.length} places worth considering</h2>
            </div>
            <p className="text-xs text-muted-foreground">Official operator sites reviewed October 2026</p>
          </div>
          <ol className="mt-10 grid gap-10 lg:grid-cols-2">
            {collection.items.map((item, index) => {
              const slug = "destinationSlug" in item ? item.destinationSlug : undefined;
              const guide = slug ? existing.find((record) => record.slug === slug && record.name.toLowerCase() === item.name.toLowerCase()) : undefined;
              return (
                <li key={item.name} className="border-t border-border pt-5">
                  <p className="eyebrow text-muted-foreground">Stop {index + 1} · {item.town}</p>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl">{item.name}</h3>
                  {guide?.hero?.src && !guide.hero.src.includes("placeholder") ? (
                    <figure className="mt-5 overflow-hidden bg-surface">
                      <img src={guide.hero.src} alt={guide.hero.alt} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
                      {guide.hero.credit ? <figcaption className="px-1 pt-2 text-xs text-muted-foreground">Photo: {guide.hero.credit}</figcaption> : null}
                    </figure>
                  ) : null}
                  <p className="mt-4 text-base leading-7">{item.why}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Before you go: </strong>{item.plan}</p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                    {guide ? <Link to="/destination/$slug" params={{ slug: guide.slug }} className="text-primary underline underline-offset-4">Read our destination guide</Link> : null}
                    <a href={item.officialUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Official visitor information ↗</a>
                    <a href={`/county/${item.countySlug}`} className="underline underline-offset-4">Explore the county</a>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
        <section className="mt-16 border-t-2 border-foreground pt-8">
          <p className="eyebrow text-primary">Practical travel planning</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Before you book</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {collection.tips.map((tip) => <li key={tip} className="border-t border-border pt-4 text-sm leading-7 text-muted-foreground">{tip}</li>)}
          </ul>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-muted-foreground">These are editorial selections, not paid placements or booking guarantees. Prices, accessibility, activities and availability can change. Check each operator's official site before traveling.</p>
        </section>
        <section className="mt-16 border-t-2 border-foreground pt-8">
          <p className="eyebrow text-primary">More Texas experiences</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Explore another curated collection</h2>
          <ul className="mt-7 grid gap-4 md:grid-cols-2">
            <li><a href="/explore/scenic-trains" className="font-display text-xl hover:text-primary">Scenic trains & heritage railroads →</a></li>
            <li><a href="/explore/dude-ranches" className="font-display text-xl hover:text-primary">Dude ranches & cowboy vacations →</a></li>
            <li><a href="/explore/spa-retreats" className="font-display text-xl hover:text-primary">Spa resorts & wellness retreats →</a></li>
            <li><a href="/explore/wildlife-safaris" className="font-display text-xl hover:text-primary">Drive-through safari & wildlife parks →</a></li>
            <li><a href="/explore/botanical-gardens" className="font-display text-xl hover:text-primary">Botanical gardens & arboretums →</a></li>
          </ul>
        </section>
      </Container>
    </main>
  );
}
