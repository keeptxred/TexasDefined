import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchSymbolBySlug } from "@/data/painted-church-symbols";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/symbols/$slug")({
  loader: ({ params }) => {
    const symbol = paintedChurchSymbolBySlug.get(params.slug as any);
    if (!symbol) throw notFound();
    return { symbol };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Painted Church symbol unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { symbol } = loaderData;
    const canonicalPath = `/explore/painted-churches/symbols/${params.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const description = `${symbol.name} in Texas Painted Churches: meaning, interpretation, documented church examples, related symbols and source evidence.`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${symbol.name} in Texas Painted Churches`, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "DefinedTerm", "@id": `${pageUrl}#term`, name: symbol.name, description: symbol.shortDefinition, url: pageUrl, inDefinedTermSet: `${siteUrl}/explore/painted-churches/symbols#symbols`, subjectOf: [symbol.sourceUrl, ...symbol.churchSlugs.map((slug) => `${siteUrl}/explore/painted-churches/${slug}`)] },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
            { "@type": "ListItem", position: 3, name: "Symbols", item: `${siteUrl}/explore/painted-churches/symbols` },
            { "@type": "ListItem", position: 4, name: symbol.name, item: pageUrl },
          ] },
        ],
      })],
    };
  },
  component: SymbolPage,
});

function SymbolPage() {
  const { symbol } = Route.useLoaderData();
  const churches = expandedPaintedChurches.filter((church) => symbol.churchSlugs.includes(church.slug));
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches/symbols">Symbols</Link></li><li aria-hidden>·</li><li aria-current="page">{symbol.name}</li></ol></nav><p className="eyebrow mt-8 text-primary">Painted Church iconography</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{symbol.name}</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{symbol.shortDefinition}</p></Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">What does {symbol.name} mean?</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">{symbol.answer}</p></section><section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.55fr)]"><div><p className="eyebrow text-primary">Interpretation</p><h2 className="mt-3 font-display text-3xl">How to read the symbol</h2><ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">{symbol.whatItMeans.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="border-l border-border pl-6"><p className="eyebrow text-muted-foreground">Source trail</p><a href={symbol.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block font-display text-2xl text-primary hover:underline">{symbol.sourceLabel}</a><p className="mt-3 text-sm leading-7 text-muted-foreground">Church-specific evidence controls whether this symbol is linked to an individual church. General meaning alone is not enough. The source is modeled as evidence about the term, not as an identity-equivalent <code>sameAs</code> record.</p></div></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Documented examples</p><h2 className="mt-3 font-display text-4xl">Churches where this symbol is documented</h2><div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{churches.map((church) => <article key={church.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h3 className="mt-2 font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p></article>)}</div></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Related iconography</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">{symbol.related.map((slug) => <Link key={slug} to="/explore/painted-churches/symbols/$slug" params={{ slug }} className="border-b border-primary text-primary">{paintedChurchSymbolBySlug.get(slug)?.name ?? slug}</Link>)}</div></section></Container></main>;
}
