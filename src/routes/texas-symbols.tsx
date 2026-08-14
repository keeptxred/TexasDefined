import { Link, createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { TEXAS_SYMBOLS_SOURCE_NAME, TEXAS_SYMBOLS_SOURCE_URL, currentTexasSymbols, featuredTexasSymbols, texasSymbols } from "@/data/texas-symbols";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Explore the official symbols of Texas, from the mockingbird and bluebonnet to the pecan tree, Guadalupe bass, rodeo, chili, cowboy boots and dozens more verified state designations.";

export const Route = createFileRoute("/texas-symbols")({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Official Texas Symbols — Complete State Symbol Guide", description, canonicalPath: "/texas-symbols" }),
      links: [canonicalLink(texasDefinedBrand, "/texas-symbols")],
      scripts: [{ type: "application/ld+json", children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "CollectionPage", name: "Official Texas Symbols", description, url: `${origin}/texas-symbols`, about: { "@type": "Thing", name: "Texas state symbols" } },
        { "@context": "https://schema.org", "@type": "ItemList", name: "Official symbols of Texas", numberOfItems: currentTexasSymbols.length, itemListElement: featuredTexasSymbols.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: `Texas State ${item.category}: ${item.symbol}`, url: `${origin}/texas-symbols/${item.slug}` })) },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: origin },
          { "@type": "ListItem", position: 2, name: "Texas History", item: `${origin}/texas-history` },
          { "@type": "ListItem", position: 3, name: "Official Texas Symbols", item: `${origin}/texas-symbols` },
        ] },
      ]) }],
    };
  },
  component: TexasSymbolsPage,
});

function TexasSymbolsPage() {
  const historical = texasSymbols.filter((item) => item.historical);

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><Link to="/texas-history" className="hover:text-foreground">Texas History</Link><span className="mx-2">/</span><span className="text-foreground">Official Texas Symbols</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What defines Texas?</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Official Texas Symbols</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Texas has officially designated far more than a bird and a flower. This directory brings the state's legislatively recognized symbols into one readable guide, with deeper TexasDefined profiles for the symbols that connect most strongly to Texas wildlife, food, history, culture and travel.</p>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            <Stat value={String(currentTexasSymbols.length)} label="Current listings" />
            <Stat value={String(featuredTexasSymbols.length)} label="Deep guides" />
            <Stat value="1901" label="First symbol era" />
          </div>
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
            <a href={TEXAS_SYMBOLS_SOURCE_URL} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Verify with {TEXAS_SYMBOLS_SOURCE_NAME} ↗</a>
          </div>
          <div className="mt-10 overflow-x-auto border border-border bg-background">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-[0.14em] text-muted-foreground"><tr><th className="px-5 py-4">Category</th><th className="px-5 py-4">Official symbol</th><th className="px-5 py-4">Year</th><th className="px-5 py-4">Legislative designation</th></tr></thead>
              <tbody>
                {currentTexasSymbols.map((item) => (
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
          {historical.length > 0 && <div className="mt-8 border-l-4 border-primary bg-background p-5"><p className="font-semibold">Historical designation</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{historical[0].symbol} were designated as state pastries in {historical[0].year}, but that designation was explicitly limited through January 31, 2005. TexasDefined keeps it separate so an expired designation is not presented as current.</p></div>}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">How this works</p>
              <h2 className="mt-3 font-display text-4xl">What makes a Texas symbol official?</h2>
              <p className="mt-5 leading-7 text-muted-foreground">These aren't crowdsourced nicknames. The directory is based on the Texas State Library and Archives Commission's legislatively designated state-symbol list. TSLAC is charged by state law with preparing and making available a complete list of state symbols and place designations.</p>
              <p className="mt-4 leading-7 text-muted-foreground">TexasDefined records the category, official symbol, legislative citation and year from that source. We use deeper profile pages only where we can add useful context without inventing facts or padding the site with repetitive thin content.</p>
            </div>
            <aside className="border border-border bg-muted/30 p-7">
              <h2 className="font-display text-3xl">Keep exploring Texas</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
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
