import { useState } from "react";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-symbols")({
  component: TexasSymbolsPage,
});

function TexasSymbolsPage() {
  const { currentTexasSymbols, featuredTexasSymbols, historicalTexasSymbols, sourceName, sourceUrl } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleSymbols = normalizedQuery
    ? currentTexasSymbols.filter((item) =>
        `${item.category} ${item.symbol} ${item.year} ${item.resolution}`.toLowerCase().includes(normalizedQuery),
      )
    : currentTexasSymbols;

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><Link to="/texas-history" className="hover:text-foreground">Texas History</Link><span className="mx-2">/</span><span className="text-foreground">Official Texas Symbols</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What defines Texas?</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Official Texas Symbols</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Texas has officially designated far more than a bird and a flower. This directory brings the state's legislatively recognized symbols into one readable guide, with dedicated TexasDefined profiles for the symbols that connect most strongly to Texas wildlife, food, history, culture and travel.</p>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            <Stat value={String(currentTexasSymbols.length)} label="Current listings" />
            <Stat value={String(featuredTexasSymbols.length)} label="Symbol profiles" />
            <Stat value="1901" label="First designation" />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-10 sm:py-12" aria-labelledby="texas-flag-symbol-guide">
        <Container>
          <div className="grid gap-7 border border-border bg-card p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.7fr)] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">The Lone Star flag</p>
              <h2 id="texas-flag-symbol-guide" className="mt-3 font-display text-4xl sm:text-5xl">Texas's best-known symbol has a Republic-era story of its own.</h2>
              <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">The state flag is governed separately in the Texas Flag Code rather than being forced into this legislatively designated-symbol directory. Follow the documented path from the Burnet flag to the 1839 Lone Star design, then use the practical guide for display, half-staff, the pledge and position with the U.S. flag.</p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              <RelatedLink to="/texas-flag" title="Texas flag: complete guide" text="History, meaning, statutory design rules, display guidance and the Lone Star in one search-focused hub." />
              <RelatedLink to="/article/history-of-the-texas-flag" title="History of the Texas flag" text="From revolution-era proposals and the Burnet flag through the Republic's 1839 Lone Star design." />
              <RelatedLink to="/article/texas-flag-etiquette-display-guide" title="Texas flag display & etiquette" text="Position with the U.S. flag, vertical display, half-staff, folding, the pledge and retirement." />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-12 sm:py-16" aria-labelledby="symbols-comparison">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Reading the legal record</p>
            <h2 id="symbols-comparison" className="mt-3 font-display text-4xl sm:text-5xl">A state symbol is not just something Texans recognize</h2>
            <p className="mt-5 leading-8 text-muted-foreground">The mockingbird, bluebonnet and pecan tree are official symbols because Texas adopted them through specific legislative acts. Other things may feel no less Texan—barbecue, Buc-ee's or the San Antonio River Walk—but cultural recognition alone does not turn them into state symbols. This directory follows the legal record rather than an informal popularity test.</p>
            <p className="mt-4 leading-8 text-muted-foreground">The designation year is not necessarily the year a custom began. The official state bird was adopted in 1927, while the bluebonnet's original state-flower designation dates to 1901; the Legislature later clarified which bluebonnet species are covered. Reading an official year therefore tells you when the state acted, not when Texans first encountered the bird or flower.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="border border-border p-6"><h3 className="font-display text-2xl">Symbol</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A named plant, animal, food or other emblem adopted by legislative action. This directory supplies its category, year and official reference where available.</p><a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline">Official State Library symbol list ↗</a></article>
            <article className="border border-border p-6"><h3 className="font-display text-2xl">Place designation</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A legislative title such as a city's fishing or pie capital designation. Modern place titles are generally subject to a ten-year rule, unlike the ordinary state-symbol entries here.</p><Link to="/texas-capital-designations" className="mt-4 inline-block text-sm font-semibold text-primary underline">Compare official capital designations →</Link></article>
            <article className="border border-border p-6"><h3 className="font-display text-2xl">Cultural icon</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Something associated with Texas through history, geography or daily life, even when it has no formal designation. A cultural list must not borrow the authority of the statute.</p><Link to="/things-unique-to-texas" className="mt-4 inline-block text-sm font-semibold text-primary underline">Browse Texas culture →</Link></article>
          </div>
          <p className="mt-7 max-w-4xl text-sm leading-7 text-muted-foreground">For newly adopted or amended symbols, verify the enrolled act or resolution and the current state-library compilation. Featured TexasDefined profiles add context only where a separate researched article is useful; every minor designation does not need a near-identical standalone page.</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Start here</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">The Texas symbols most people know — and a few they don't</h2>
            <p className="mt-5 leading-7 text-muted-foreground">These profiles go beyond the official designation itself, connecting each symbol to the places, landscapes, traditions and other TexasDefined coverage that give it context.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTexasSymbols.map((item) => (
              <Link key={item.slug} to="/texas-symbols/$slug" params={{ slug: item.slug }} className="group border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-muted/30">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">State {item.category}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight group-hover:text-primary">{item.symbol}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                <p className="mt-5 text-sm font-semibold">Explore the symbol <span aria-hidden="true">→</span></p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/25 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Official directory</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">Every current designation in the source list</h2>
            </div>
            <a href={sourceUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Verify with {sourceName} ↗</a>
          </div>

          <div className="mt-8 max-w-2xl">
            <label htmlFor="symbol-search" className="text-sm font-semibold">Find a Texas symbol</label>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">Search by symbol, category, year or legislative designation.</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                id="symbol-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try bluebonnet, mammal, 1995…"
                className="min-h-11 w-full border border-border bg-background px-4 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="min-h-11 shrink-0 border border-border bg-background px-4 py-2 text-sm font-semibold hover:border-primary/50">
                  Clear search
                </button>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
              Showing {visibleSymbols.length} of {currentTexasSymbols.length} current designations.
            </p>
          </div>

          {visibleSymbols.length > 0 ? (
            <>
              <div className="mt-8 grid gap-3 md:hidden">
                {visibleSymbols.map((item) => (
                  <article key={item.slug} className="border border-border bg-background p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">State {item.category}</p>
                        <h3 className="mt-2 font-display text-2xl leading-tight">
                          {item.featured ? <Link to="/texas-symbols/$slug" params={{ slug: item.slug }} className="text-primary underline-offset-4 hover:underline">{item.symbol}</Link> : item.symbol}
                        </h3>
                      </div>
                      <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{item.year}</span>
                    </div>
                    <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">{item.resolution}</p>
                  </article>
                ))}
              </div>

              <div className="mt-8 hidden overflow-x-auto border border-border bg-background md:block">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-[0.14em] text-muted-foreground"><tr><th className="px-5 py-4">Category</th><th className="px-5 py-4">Official symbol</th><th className="px-5 py-4">Year</th><th className="px-5 py-4">Legislative designation</th></tr></thead>
                  <tbody>
                    {visibleSymbols.map((item) => (
                      <tr key={item.slug} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-4 font-semibold">{item.category}</td>
                        <td className="px-5 py-4">{item.featured ? <Link to="/texas-symbols/$slug" params={{ slug: item.slug }} className="text-primary underline-offset-4 hover:underline">{item.symbol}</Link> : item.symbol}</td>
                        <td className="px-5 py-4 tabular-nums text-muted-foreground">{item.year}</td>
                        <td className="px-5 py-4 text-sm text-muted-foreground">{item.resolution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="mt-8 border border-border bg-background p-8 text-center">
              <p className="font-display text-2xl">No symbols match “{query.trim()}”</p>
              <p className="mt-2 text-sm text-muted-foreground">Try a broader term such as bird, food, mammal or a designation year.</p>
              <button type="button" onClick={() => setQuery("")} className="mt-5 text-sm font-semibold text-primary underline-offset-4 hover:underline">Show all symbols</button>
            </div>
          )}

          {historicalTexasSymbols.length > 0 && <div className="mt-8 border-l-4 border-primary bg-background p-5"><p className="font-semibold">Historical designation</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{historicalTexasSymbols[0].symbol} were designated as state pastries in {historicalTexasSymbols[0].year}, but that designation was explicitly limited through January 31, 2005. TexasDefined keeps it separate so an expired designation is not presented as current.</p></div>}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">How this works</p>
              <h2 className="mt-3 font-display text-4xl">What makes a Texas symbol official?</h2>
              <p className="mt-5 leading-7 text-muted-foreground">These aren't crowdsourced nicknames. The directory is based on the Texas State Library and Archives Commission's legislatively designated state-symbol list. TSLAC is charged by state law with preparing and making available a complete list of state symbols and place designations.</p>
              <p className="mt-4 leading-7 text-muted-foreground">TexasDefined records the category, official symbol, legislative citation and year from that source. We use dedicated profile pages only where we can add useful context without inventing facts or padding the site with repetitive thin content.</p>
            </div>
            <aside className="border border-border bg-muted/30 p-7">
              <h2 className="font-display text-3xl">Keep exploring Texas</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                <RelatedLink to="/texas-flag" title="Texas flag" text="The Lone Star flag's history, meaning, rules and display guides." />
                <RelatedLink to="/article/history-of-the-texas-flag" title="History of the Texas flag" text="The Republic-era story behind the Lone Star design." />
                <RelatedLink to="/texas-history" title="Texas History" text="The people, places and turning points behind the state." />
                <RelatedLink to="/texas-explained" title="Texas Explained" text="Plain-English guides to why Texas looks and works the way it does." />
                <RelatedLink to="/explore" title="Explore Texas" text="Move from the symbols into parks, rivers, towns and road trips." />
                <RelatedLink to="/fishing" title="Texas Fishing" text="Follow the Guadalupe bass and red drum into statewide fishing coverage." />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="bg-background p-5"><p className="font-display text-3xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p></div>;
}

function RelatedLink({ to, title, text }: { to: string; title: string; text: string }) {
  return <Link to={to} className="group block py-5"><span className="font-semibold group-hover:text-primary">{title} →</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{text}</span></Link>;
}