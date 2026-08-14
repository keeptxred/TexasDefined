import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { TEXAS_SYMBOLS_SOURCE_NAME, TEXAS_SYMBOLS_SOURCE_URL, featuredTexasSymbols, getTexasSymbol } from "@/data/texas-symbols";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/texas-symbols/$slug")({
  loader: ({ params }) => {
    const symbol = getTexasSymbol(params.slug);
    if (!symbol?.featured) throw notFound();
    return symbol;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    const symbol = loaderData;
    const canonicalPath = `/texas-symbols/${symbol.slug}`;
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const title = `Texas State ${symbol.category}: ${symbol.symbol}`;
    const description = symbol.summary ?? `${symbol.symbol} is the official Texas state ${symbol.category.toLowerCase()}, designated in ${symbol.year}.`;
    return {
      meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: `${origin}${canonicalPath}`, about: { "@type": "Thing", name: symbol.symbol, description: `Official Texas state ${symbol.category.toLowerCase()}` }, citation: TEXAS_SYMBOLS_SOURCE_URL },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: origin },
          { "@type": "ListItem", position: 2, name: "Official Texas Symbols", item: `${origin}/texas-symbols` },
          { "@type": "ListItem", position: 3, name: symbol.symbol, item: `${origin}${canonicalPath}` },
        ] },
      ]) }],
    };
  },
  component: TexasSymbolProfile,
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Texas symbol guide not found</h1><p className="mt-4 text-muted-foreground">The complete verified designation may still appear in the Official Texas Symbols directory even when TexasDefined has not published a full profile yet.</p><a href="/texas-symbols" className="mt-6 inline-block border-b border-primary pb-1 font-semibold text-primary">Browse Official Texas Symbols →</a></div>,
});

function TexasSymbolProfile() {
  const symbol = Route.useLoaderData();
  const related = featuredTexasSymbols.filter((item) => item.slug !== symbol.slug).filter((item) => relatedGroup(item.category) === relatedGroup(symbol.category)).slice(0, 4);
  const fallbacks = related.length >= 3 ? related : featuredTexasSymbols.filter((item) => item.slug !== symbol.slug).slice(0, 4);

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-14 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><Link to="/texas-symbols" className="hover:text-foreground">Official Texas Symbols</Link><span className="mx-2">/</span><span className="text-foreground">{symbol.symbol}</span></nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Official Texas State {symbol.category}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">{symbol.symbol}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{symbol.summary}</p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
            <article className="max-w-3xl">
              <section>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">The official designation</p>
                <h2 className="mt-3 font-display text-4xl">Why {symbol.symbol} is an official Texas symbol</h2>
                <p className="mt-5 text-lg leading-8 text-foreground">The Texas Legislature designated <strong>{symbol.symbol}</strong> as the state's official {symbol.category.toLowerCase()} in {symbol.year}. The designation is recorded by the Texas State Library and Archives Commission, the state agency charged with maintaining the public list of Texas state symbols and place designations.</p>
                <p className="mt-5 leading-7 text-muted-foreground">Unlike an informal nickname or a popular cultural association, this entry has a specific legislative trail. That distinction matters on TexasDefined: we label something an official state symbol only when the designation appears in the state's authoritative symbol record.</p>
              </section>

              <section className="mt-12 border-y border-border py-10">
                <h2 className="font-display text-3xl">Designation at a glance</h2>
                <dl className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                  <Fact term="Category" value={`State ${symbol.category}`} />
                  <Fact term="Official symbol" value={symbol.symbol} />
                  <Fact term="Designation year" value={String(symbol.year)} />
                  <Fact term="Legislative citation" value={symbol.resolution} />
                </dl>
              </section>

              <section className="mt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas context</p>
                <h2 className="mt-3 font-display text-4xl">How it fits into the Texas story</h2>
                <p className="mt-5 leading-7 text-muted-foreground">Texas's symbol list is unusually broad. It includes native wildlife and plants, foods, music, ranching traditions, minerals, historic vessels, cultural objects and even modern designations. Looking at {symbol.symbol} alongside the rest of the list is useful because the collection shows how Texans have chosen to represent the state's natural landscape and cultural history over more than a century.</p>
                <p className="mt-5 leading-7 text-muted-foreground">The first state-symbol era began in 1901 with the bluebonnet. Since then, later Legislatures have continued adding designations. The result is less a single set of emblems than a growing record of what different generations considered distinctly Texan.</p>
              </section>

              <section className="mt-12 rounded-sm border border-border bg-muted/30 p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Primary source</p>
                <h2 className="mt-3 font-display text-3xl">Verify the designation</h2>
                <p className="mt-4 leading-7 text-muted-foreground">TexasDefined uses the Texas State Library and Archives Commission's official state-symbol directory as the source of record for the designation, year and legislative citation on this page.</p>
                <a href={TEXAS_SYMBOLS_SOURCE_URL} target="_blank" rel="noreferrer" className="mt-5 inline-block font-semibold text-primary underline-offset-4 hover:underline">Open {TEXAS_SYMBOLS_SOURCE_NAME} ↗</a>
              </section>
            </article>

            <aside>
              <div className="sticky top-24 border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Official record</p>
                <p className="mt-3 font-display text-2xl">State {symbol.category}</p>
                <p className="mt-2 text-sm text-muted-foreground">Designated {symbol.year}</p>
                <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">{symbol.resolution}</p>
                <Link to="/texas-symbols" className="mt-6 inline-block font-semibold text-primary">View all Texas symbols →</Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-muted/25 py-14 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Related symbols</p>
          <h2 className="mt-3 font-display text-4xl">Keep exploring what Texas made official</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fallbacks.map((item) => <Link key={item.slug} to="/texas-symbols/$slug" params={{ slug: item.slug }} className="group border border-border bg-background p-5"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">State {item.category}</p><p className="mt-2 font-display text-xl group-hover:text-primary">{item.symbol}</p><p className="mt-3 text-sm text-muted-foreground">Designated {item.year}</p></Link>)}
          </div>
        </Container>
      </section>
    </main>
  );
}

function Fact({ term, value }: { term: string; value: string }) {
  return <div className="bg-background p-5"><dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{term}</dt><dd className="mt-2 leading-6">{value}</dd></div>;
}

function relatedGroup(category: string) {
  if (/Bird|Amphibian|Bison|Fish|Mammal|Horse|Insect|Reptile|Turtle/i.test(category)) return "wildlife";
  if (/Flower|Tree|Grass|Plant|Pepper|Shrub|Fruit/i.test(category)) return "plants";
  if (/Dish|Bread|Cobbler|Cooking|Snack|Pie/i.test(category)) return "food";
  if (/Music|Song|Dance|Sport|Footwear|Hat|Vehicle|Fiber/i.test(category)) return "culture";
  return "general";
}
