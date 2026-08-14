import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import type { loadFishSpeciesDirectoryDataServer } from "@/data/fishing/species-directory-data.server";

type DirectoryData = Awaited<ReturnType<typeof loadFishSpeciesDirectoryDataServer>>;

export function FishSpeciesDirectory({ pageData }: { pageData: DirectoryData }) {
  return (
    <>
      <Container className="pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/fishing" className="hover:text-foreground">Fishing</Link></li>
            <li aria-hidden>·</li>
            <li aria-current="page">Fish species</li>
          </ol>
        </nav>
      </Container>

      <section className="mt-5 border-b border-border bg-ink text-ink-foreground">
        <Container className="py-16 sm:py-24">
          <p className="eyebrow text-ink-foreground/70">Texas fish species</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] sm:text-7xl">Fish Texas by species.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/82">Start with the fish, then move to the lakes, seasons, techniques, regulations and local specialists that define how Texans actually target it.</p>
          <div className="mt-8 flex flex-wrap gap-5 text-sm">
            <Link to="/fishing/species/largemouth-bass" className="border-b border-ink-foreground pb-1 font-semibold text-ink-foreground">Open the largemouth bass guide →</Link>
            <Link to="/fishing" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Back to all Texas fishing →</Link>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Statewide catalog</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">{pageData.totalSpecies} published fishing records, grouped for real angler intent.</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">The catalog separates true species from practical fishing groups so lake pages can say “crappie” or “catfish” while deeper species pages distinguish black from white crappie and blue from channel or flathead catfish.</p>
        </div>

        <div className="mt-12 space-y-14">
          {pageData.groups.map((group) => (
            <section key={group.id} aria-labelledby={`family-${group.id}`} className="border-t border-border pt-8">
              <div className="max-w-3xl">
                <h2 id={`family-${group.id}`} className="font-display text-3xl">{group.name}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p>
              </div>
              <div className="mt-7 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
                {group.species.map((row) => {
                  const hasFullGuide = row.slug === "largemouth-bass";
                  return (
                    <article id={`species-${row.slug}`} key={row.id} className="scroll-mt-28 border-b border-border py-6 sm:px-5 sm:first:pl-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="eyebrow text-primary">{row.taxonKind === "group" ? "Fishing group" : "Fish species"}</p>
                        {hasFullGuide && <span className="border border-primary px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.12em] text-primary">Full guide</span>}
                      </div>
                      <h3 className="mt-2 font-display text-2xl">{hasFullGuide ? <Link to="/fishing/species/largemouth-bass" className="hover:text-primary">{row.commonName}</Link> : row.commonName}</h3>
                      {row.scientificName && <p className="mt-1 text-xs italic text-muted-foreground">{row.scientificName}</p>}
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{row.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-4">
                        {hasFullGuide && <Link to="/fishing/species/largemouth-bass" className="eyebrow border-b border-primary pb-1 text-primary">Species guide →</Link>}
                        {row.sources[0] && <a href={row.sources[0].url} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-border pb-1 text-muted-foreground hover:text-foreground">Official source →</a>}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">How this grows</p>
          <h2 className="mt-3 font-display text-3xl">One reusable species template, then statewide depth.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Largemouth bass is the first complete species page. The same model is ready for Guadalupe bass, smallmouth, crappie, catfish, striped bass, alligator gar, sunfish and seasonal trout without creating thin lake-by-species pages just for search volume.</p>
          <p className="mt-6 text-xs leading-6 text-muted-foreground">Species catalog sources checked August 13, 2026. Regulations, stockings and waterbody conditions can change; always confirm current TPWD information before fishing.</p>
        </section>
      </Container>
    </>
  );
}
