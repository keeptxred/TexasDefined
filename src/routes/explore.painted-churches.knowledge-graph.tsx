import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchKnowledgeEdges, paintedChurchKnowledgeNodes } from "@/data/painted-church-knowledge-graph";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/knowledge-graph";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Explore the Texas Painted Churches knowledge graph connecting churches, individual artworks and interior features, contributors, symbols, decorative techniques, heritage communities and preservation concepts.";

const groups = ["church", "feature", "contributor", "technique", "symbol", "heritage", "preservation"] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Knowledge Graph", description, modifiedTime: "2026-08-19T23:00:00-05:00" }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": `${pageUrl}#dataset`,
      name: "Texas Painted Churches knowledge graph",
      description,
      url: pageUrl,
      dateModified: "2026-08-19",
      variableMeasured: ["church", "interior feature", "contributor", "technique", "symbol", "heritage community", "preservation relationship"],
      creator: { "@id": `${siteUrl}/#organization` },
    })],
  }),
  component: KnowledgeGraphPage,
});

function KnowledgeGraphPage() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Knowledge graph</li></ol></nav><p className="eyebrow mt-8 text-primary">Entity relationships</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">One connected reference system, down to the artwork level.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The graph connects each verified church to individual murals, windows, inscriptions and furnishings as well as documented contributors, decorative techniques, symbols, cultural communities and preservation concepts. Typed relationships distinguish design, construction, decoration, restoration and research.</p></Container></section><Container className="py-14 sm:py-18"><section className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-7">{groups.map((type) => { const count = paintedChurchKnowledgeNodes.filter((node) => node.type === type).length; return <div key={type} className="bg-background p-5"><p className="font-display text-4xl">{count}</p><p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{type}</p></div>; })}</section><section className="mt-12 border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Graph size</p><h2 className="mt-3 font-display text-4xl">{paintedChurchKnowledgeNodes.length} entities · {paintedChurchKnowledgeEdges.length} documented relationships</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Relationships are evidence-aware. A church or interior object is not linked to a symbol, contributor, technique or heritage community merely because the relationship seems plausible; the corresponding source or canonical record must support it.</p></section>{groups.map((type) => { const nodes = paintedChurchKnowledgeNodes.filter((node) => node.type === type); return <section key={type} className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">{type}</p><div className="mt-6 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{nodes.map((node) => <article key={node.id} className="bg-background p-5"><h2 className="font-display text-2xl"><Link to={node.url as any} className="hover:text-primary">{node.name}</Link></h2><p className="mt-3 text-xs leading-6 text-muted-foreground">{paintedChurchKnowledgeEdges.filter((edge) => edge.from === node.id || edge.to === node.id).length} documented relationship(s)</p></article>)}</div></section>; })}</Container></main>;
}
