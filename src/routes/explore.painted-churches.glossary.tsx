import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchGlossary } from "@/data/painted-church-glossary";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/glossary";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "A source-aware architectural glossary for understanding Texas Painted Churches, including nave, apse, sanctuary, reredos, transept, groin vault, lancet windows, Gothic Revival and trompe-l'œil.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Church Architecture Glossary", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Painted Church architecture glossary", description, mainEntity: { "@id": `${pageUrl}#terms` } },
      { "@type": "DefinedTermSet", "@id": `${pageUrl}#terms`, name: "Texas Painted Church architecture terms", hasDefinedTerm: paintedChurchGlossary.map((term) => ({ "@type": "DefinedTerm", name: term.name, description: term.definition, url: `${pageUrl}/${term.slug}` })) },
    ] })],
  }),
  component: GlossaryHub,
});

function GlossaryHub() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Glossary</li></ol></nav><p className="eyebrow mt-8 text-primary">Architecture field guide</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The words you need to understand a Painted Church.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Each architectural term has its own canonical explanation and links to churches where the feature helps explain what a visitor is seeing.</p></Container></section><Container className="py-14 sm:py-18"><section className="grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchGlossary.map((term) => <article key={term.slug} className="bg-background p-7"><p className="eyebrow text-primary">{term.churchSlugs.length} church example{term.churchSlugs.length === 1 ? "" : "s"}</p><h2 className="mt-3 font-display text-3xl"><Link to="/explore/painted-churches/glossary/$slug" params={{ slug: term.slug }} className="hover:text-primary">{term.name}</Link></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{term.definition}</p><Link to="/explore/painted-churches/glossary/$slug" params={{ slug: term.slug }} className="eyebrow mt-5 inline-block border-b border-primary text-primary">Read glossary entry</Link></article>)}</section></Container></main>;
}
