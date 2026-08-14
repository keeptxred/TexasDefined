import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import type { loadLargemouthBassPageDataServer } from "@/data/fishing/largemouth-bass-page-data.server";

type PageData = Awaited<ReturnType<typeof loadLargemouthBassPageDataServer>>;

const seasonLabel: Record<string, string> = { spring: "Spring", summer: "Summer", fall: "Fall", winter: "Winter" };

export function FishSpeciesGuide({ pageData }: { pageData: PageData }) {
  const { species, profile, rankedLakes, recommendedTechniques, relatedSpecies, verifiedGuides, sponsoredPlacements, regions } = pageData;

  return (
    <>
      <Container className="pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/fishing" className="hover:text-foreground">Fishing</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/fishing/species" className="hover:text-foreground">Fish species</Link></li>
            <li aria-hidden>·</li>
            <li aria-current="page">{species.commonName}</li>
          </ol>
        </nav>
      </Container>

      <section className="mt-5 border-b border-border bg-ink text-ink-foreground">
        <Container className="py-16 sm:py-24">
          <p className="eyebrow text-ink-foreground/70">Texas species fishing guide</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Largemouth bass fishing in Texas.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/82">{species.summary}</p>
          <dl className="mt-8 grid max-w-4xl gap-5 border-t border-ink-foreground/20 pt-6 text-sm sm:grid-cols-3">
            <div><dt className="eyebrow text-ink-foreground/55">Scientific name</dt><dd className="mt-2 text-ink-foreground">{species.scientificName}</dd></div>
            <div><dt className="eyebrow text-ink-foreground/55">Texas regions represented</dt><dd className="mt-2 text-ink-foreground">{regions.length ? regions.map((row) => row.replaceAll("-", " ")).join(", ") : "Statewide"}</dd></div>
            <div><dt className="eyebrow text-ink-foreground/55">Source review</dt><dd className="mt-2 text-ink-foreground">{profile.verifiedAt}</dd></div>
          </dl>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
          <div>
            <p className="eyebrow text-primary">Overview</p>
            <h2 className="mt-3 font-display text-4xl">Why largemouth bass define Texas freshwater fishing</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">{profile.overview}</p>
            <h3 className="mt-8 font-display text-2xl">Texas distribution</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{profile.texasDistribution}</p>
            <h3 className="mt-8 font-display text-2xl">Habitat</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{profile.habitat}</p>
          </div>
          <aside className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="eyebrow text-primary">Official source</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Core biology and statewide identity are anchored to the Texas Parks & Wildlife Department species fact sheet.</p>
            <a href={profile.sources[0].url} target="_blank" rel="noreferrer noopener" className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">TPWD largemouth bass fact sheet →</a>
          </aside>
        </section>

        <section className="mt-16 border-t border-border pt-10" aria-labelledby="seasonal-patterns">
          <p className="eyebrow text-primary">Seasonal behavior</p>
          <h2 id="seasonal-patterns" className="mt-3 font-display text-4xl">How the Texas bass year changes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {profile.seasonalBehavior.map((season) => (
              <article key={season.season} className="border border-border p-6">
                <p className="eyebrow text-primary">{seasonLabel[season.season] ?? season.season}</p>
                <h3 className="mt-2 font-display text-2xl">{season.heading}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{season.summary}</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div><p className="eyebrow text-muted-foreground">Look around</p><ul className="mt-2 space-y-1 text-xs leading-5 text-muted-foreground">{season.habitats.map((item) => <li key={item}>• {item}</li>)}</ul></div>
                  <div><p className="eyebrow text-muted-foreground">Try</p><ul className="mt-2 space-y-1 text-xs leading-5 text-muted-foreground">{season.approaches.map((item) => <li key={item}>• {item}</li>)}</ul></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-10" aria-labelledby="techniques">
          <p className="eyebrow text-primary">Techniques</p>
          <h2 id="techniques" className="mt-3 font-display text-4xl">Core largemouth approaches already connected to Texas lakes</h2>
          <div className="mt-8 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {recommendedTechniques.map((technique) => <article key={technique.id} className="border-b border-border py-6 sm:px-5 sm:first:pl-0"><h3 className="font-display text-xl">{technique.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{technique.summary}</p></article>)}
          </div>
        </section>

        <section className="mt-16 grid gap-10 border-t border-border pt-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">Tackle</p>
            <h2 className="mt-3 font-display text-3xl">Build around the cover, not a single universal setup</h2>
            <div className="mt-6 space-y-6">{profile.tackle.map((item) => <div key={item.heading}><h3 className="font-display text-xl">{item.heading}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{item.summary}</p></div>)}</div>
          </div>
          <div>
            <p className="eyebrow text-primary">Baits & lures</p>
            <h2 className="mt-3 font-display text-3xl">A practical Texas starting box</h2>
            <div className="mt-6 space-y-6">{profile.baitsAndLures.map((item) => <div key={item.name}><h3 className="font-display text-xl">{item.name}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{item.summary}</p></div>)}</div>
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-10" aria-labelledby="best-lakes">
          <p className="eyebrow text-primary">Best foundation lakes</p>
          <h2 id="best-lakes" className="mt-3 font-display text-4xl">Texas lakes ranked from the fishing data, not sponsorship</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{profile.rankingMethod}</p>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {rankedLakes.map((row, index) => (
              <article key={row.relation.id} className="grid gap-4 py-6 sm:grid-cols-[70px_1fr_auto] sm:items-start">
                <p className="font-display text-3xl text-primary">#{index + 1}</p>
                <div>
                  <h3 className="font-display text-2xl"><a href={row.href} className="hover:text-primary">{row.lake.name}</a></h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.lake.summary}</p>
                  {row.relation.seasonalPatterns.length > 0 && <p className="mt-3 text-xs leading-5 text-muted-foreground">{row.relation.seasonalPatterns.map((pattern) => `${pattern.season}: ${pattern.summary}`).join(" ")}</p>}
                </div>
                <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground"><p>{row.relation.quality}</p><p className="mt-1">{row.relation.prominence}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 border-t border-border pt-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">Regulations</p>
            <h2 className="mt-3 font-display text-3xl">Check the current rule before the first cast</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{profile.regulationNote}</p>
            <a href={profile.regulationSource.url} target="_blank" rel="noreferrer noopener" className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Current TPWD freshwater limits →</a>
          </div>
          <div>
            <p className="eyebrow text-primary">Guide specialists</p>
            <h2 className="mt-3 font-display text-3xl">Verified Texas bass guides</h2>
            {verifiedGuides.length > 0 ? <div className="mt-5 space-y-5">{verifiedGuides.map((guide) => <article key={guide.id}><h3 className="font-display text-xl">{guide.businessName}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{guide.bio ?? "Verified TexasDefined fishing guide listing."}</p>{guide.bookingUrl && <a href={guide.bookingUrl} target="_blank" rel="noreferrer noopener sponsored" className="mt-3 inline-block border-b border-primary pb-1 text-sm text-primary">Booking information →</a>}</article>)}</div> : <><p className="mt-4 text-sm leading-7 text-muted-foreground">No largemouth-bass guide has cleared the TexasDefined verified-listing gate yet. We do not fabricate or scrape guide profiles just to fill the page.</p><Link to="/partner-with-us" className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Guide businesses: partner with TexasDefined →</Link></>}
          </div>
        </section>

        {sponsoredPlacements.length > 0 && <section className="mt-16 border-t border-border pt-10"><p className="eyebrow text-primary">Sponsored</p><h2 className="mt-3 font-display text-3xl">Largemouth bass partners</h2><div className="mt-6 grid gap-5 sm:grid-cols-2">{sponsoredPlacements.map(({ placement, advertiser }) => <article key={placement.id} className="border border-border p-5"><p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">Sponsored placement</p><h3 className="mt-2 font-display text-xl">{advertiser?.name}</h3><a href={placement.destinationUrl} target="_blank" rel="noreferrer noopener sponsored" className="mt-4 inline-block border-b border-primary pb-1 text-sm text-primary">Visit sponsor →</a></article>)}</div></section>}

        <section className="mt-16 grid gap-10 border-t border-border pt-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">Related species</p>
            <h2 className="mt-3 font-display text-3xl">Keep exploring black bass</h2>
            <div className="mt-5 space-y-4">{relatedSpecies.map((row) => <article key={row.id}><a href={`/fishing/species#species-${row.slug}`} className="font-display text-xl hover:text-primary">{row.commonName}</a><p className="mt-1 text-sm leading-6 text-muted-foreground">{row.summary}</p></article>)}</div>
          </div>
          <div>
            <p className="eyebrow text-primary">Related reading</p>
            <h2 className="mt-3 font-display text-3xl">Understand the water behind the fishery</h2>
            <div className="mt-5 space-y-4">{profile.articleLinks.map((article) => <article key={article.href}><a href={article.href} className="font-display text-xl hover:text-primary">{article.title}</a><p className="mt-1 text-sm leading-6 text-muted-foreground">{article.summary}</p></article>)}</div>
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">Sources</p>
          <h2 className="mt-3 font-display text-3xl">Source-backed, not folklore-backed</h2>
          <ul className="mt-5 space-y-3 text-sm">{profile.sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer noopener" className="border-b border-border pb-1 hover:border-primary hover:text-primary">{source.name}</a> <span className="text-muted-foreground">· checked {source.checkedAt}</span></li>)}</ul>
        </section>
      </Container>
    </>
  );
}
