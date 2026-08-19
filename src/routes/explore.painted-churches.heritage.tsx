import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchHeritage } from "@/data/painted-church-heritage";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/heritage";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Explore the Czech, Moravian, German, Wendish, Polish, Silesian and Italian POW histories connected to the Texas Painted Churches.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Immigrant Heritage Behind the Texas Painted Churches", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Immigrant heritage behind the Texas Painted Churches", description, mainEntity: { "@id": `${pageUrl}#heritage` } },
      { "@type": "ItemList", "@id": `${pageUrl}#heritage`, numberOfItems: paintedChurchHeritage.length, itemListElement: paintedChurchHeritage.map((item, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "WebPage", name: item.name, url: `${pageUrl}/${item.slug}`, description: item.answer } })) },
    ] })],
  }),
  component: HeritageHub,
});

function HeritageHub() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Heritage</li></ol></nav><p className="eyebrow mt-8 text-primary">Communities behind the interiors</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The Painted Churches are also immigration history.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Church decoration cannot be separated from the people who built the parishes. These authority pages connect the churches to Czech and Moravian, German, Wendish, Polish and Silesian communities—and distinguish Umbarger's Italian POW chapter from immigrant-settlement histories.</p></Container></section><Container className="py-14 sm:py-18"><section className="grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchHeritage.map((item) => <article key={item.slug} className="bg-background p-7"><p className="eyebrow text-primary">{item.churchSlugs.length} connected church{item.churchSlugs.length === 1 ? "" : "es"}</p><h2 className="mt-3 font-display text-3xl"><Link to="/explore/painted-churches/heritage/$slug" params={{ slug: item.slug }} className="hover:text-primary">{item.name}</Link></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.answer}</p><Link to="/explore/painted-churches/heritage/$slug" params={{ slug: item.slug }} className="eyebrow mt-5 inline-block border-b border-primary text-primary">Open heritage guide</Link></article>)}</section></Container></main>;
}
