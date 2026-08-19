import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchSymbols } from "@/data/painted-church-symbols";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/symbols";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "An authoritative guide to symbols in the Texas Painted Churches, including the All-Seeing Eye, IHS, Lamb of God, Holy Spirit dove, Maltese Cross, angels, Marian imagery and Eucharistic motifs.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Symbols in the Texas Painted Churches", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Symbols in the Texas Painted Churches", description, mainEntity: { "@id": `${pageUrl}#symbols` } },
        { "@type": "DefinedTermSet", "@id": `${pageUrl}#symbols`, name: "Texas Painted Church symbols and iconography", hasDefinedTerm: paintedChurchSymbols.map((symbol) => ({ "@type": "DefinedTerm", name: symbol.name, description: symbol.shortDefinition, url: `${pageUrl}/${symbol.slug}` })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
          { "@type": "ListItem", position: 3, name: "Symbols", item: pageUrl },
        ] },
      ],
    })],
  }),
  component: SymbolsHub,
});

function SymbolsHub() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Symbols</li></ol></nav><p className="eyebrow mt-8 text-primary">Iconography encyclopedia</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Learn to read the symbols in Texas Painted Churches.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The painted interiors are not just decoration. Their eyes, lambs, doves, crosses, angels, Marian scenes and Eucharistic motifs carry specific meanings. Texas Defined gives each recurring symbol its own source-backed authority page and links it only to churches where the evidence supports the relationship.</p></Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">The same symbol can mean the same doctrine but function differently in each church.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">Texas Defined separates general Christian meaning from church-specific interpretation. Austin PBS, parish histories and exact interior evidence control which symbols are assigned to which churches.</p></section><section className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchSymbols.map((symbol) => { const churches = expandedPaintedChurches.filter((church) => symbol.churchSlugs.includes(church.slug)); return <article key={symbol.slug} className="bg-background p-7"><p className="eyebrow text-primary">{churches.length} documented church{churches.length === 1 ? "" : "es"}</p><h2 className="mt-3 font-display text-3xl"><Link to="/explore/painted-churches/symbols/$slug" params={{ slug: symbol.slug }} className="hover:text-primary">{symbol.name}</Link></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{symbol.shortDefinition}</p>{churches.length ? <p className="mt-4 text-xs leading-6 text-muted-foreground">Documented at: {churches.map((church) => church.city).join(" · ")}</p> : null}<Link to="/explore/painted-churches/symbols/$slug" params={{ slug: symbol.slug }} className="eyebrow mt-5 inline-block border-b border-primary text-primary">Read the symbol guide</Link></article>; })}</section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Controlling source</p><h2 className="mt-3 font-display text-3xl">Austin PBS symbol research</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Austin PBS’s Painted Churches project directly documents the All-Seeing Eye at Praha, IHS at Ammannsville, Lamb of God and descending dove at High Hill, and the Maltese Cross at Fredericksburg. Parish and church-specific sources extend the entity graph where they document later programs.</p><a href="https://austinpbs.org/paintedchurches/symbols" target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-primary text-sm text-primary">Open the Austin PBS symbol source</a></section></Container></main>;
}
