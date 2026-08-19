import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/cite";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "How to cite, share and reuse Texas Defined's Painted Churches reference collection, datasets, methodology, church pages and source trails without confusing Texas Defined synthesis with controlling primary records.";

const referenceTargets = [
  ["Statewide collection", "/explore/painted-churches", "Use for the verified statewide scope and collection-level definitions."],
  ["Master census", "/explore/painted-churches/census", "Use when discussing verified, candidate or excluded churches and why the lists differ."],
  ["Comparison dataset", "/explore/painted-churches/compare", "Use for side-by-side classification, integrity, dates, people, symbols and techniques."],
  ["Research methodology", "/explore/painted-churches/methodology", "Use for inclusion standards, source precedence, corrections and image-rights policy."],
  ["Knowledge graph", "/explore/painted-churches/knowledge-graph", "Use for documented entity relationships among churches, people, techniques, symbols, heritage and preservation."],
  ["Harwood archive guide", "/explore/painted-churches/harwood-archive", "Use as an orientation to the UT archival finding aid and its Painted Churches research material."],
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "How to Cite the Texas Painted Churches Collection", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#page`,
      name: "How to cite the Texas Painted Churches collection",
      description,
      url: pageUrl,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/explore/painted-churches#collection` },
    })],
  }),
  component: CitePaintedChurches,
});

function CitePaintedChurches() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Cite & share</li></ol></nav><p className="eyebrow mt-8 text-primary">Research use & attribution</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Cite the collection without losing the source trail.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Texas Defined is a synthesis and reference layer. When an individual claim comes from a parish, National Register record, Texas Historical Commission record, archival photograph or heritage institution, preserve that underlying source alongside the Texas Defined page when the distinction matters.</p></Container></section><Container className="py-14 sm:py-18"><section className="grid gap-5 md:grid-cols-3"><article className="border-t border-border pt-5"><h2 className="font-display text-2xl">Canonical URL first</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Use the clean TexasDefined page URL rather than a search result, tracking URL or image redirect.</p></article><article className="border-t border-border pt-5"><h2 className="font-display text-2xl">Preserve the primary record</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">For designation, architecture, current access and archival evidence, keep the controlling NPS, THC, parish or archive source attached.</p></article><article className="border-t border-border pt-5"><h2 className="font-display text-2xl">Keep scope labels intact</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Do not turn “broader historic tradition” or “modern decorative campaign” into formal National Register membership.</p></article></section><section className="mt-14 border-y border-border py-8"><p className="eyebrow text-primary">Suggested citation</p><h2 className="mt-3 font-display text-3xl">Simple web format</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-foreground/90"><strong>Texas Defined, “Painted Churches of Texas,” https://texasdefined.com/explore/painted-churches, collection reviewed August 18, 2026, accessed [your date].</strong></p><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">For an individual church, substitute its canonical church-page title and URL and retain the visible primary-source link for the fact you are using.</p></section><section className="mt-14"><p className="eyebrow text-primary">Best citation target by use</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{referenceTargets.map(([label, href, note]) => <article key={href} className="bg-background p-6"><h2 className="font-display text-2xl"><Link to={href as any} className="hover:text-primary">{label}</Link></h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{note}</p></article>)}</div></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Machine-readable resources</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href="/painted-churches.csv" className="border-b border-primary text-primary">Comparison CSV</a><a href="/painted-churches.json" className="border-b border-primary text-primary">Reference JSON</a><a href="/painted-churches-checklist.txt" className="border-b border-primary text-primary">Field checklist</a><Link to="/explore/painted-churches/print-guide" className="border-b border-primary text-primary">Printable guide</Link></div></section><section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">For parishes, museums and heritage organizations</p><h2 className="mt-3 font-display text-3xl">Corrections and reciprocal source credit are welcome.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Texas Defined links back to official organizations whenever they control parish history, visitor policy or community heritage. If your organization maintains a more current or more precise primary record, the methodology favors that record over a weaker secondary source.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Methodology & corrections</Link><Link to="/about" className="border-b border-primary text-primary">Editorial accountability</Link><Link to="/partner-with-us" className="border-b border-primary text-primary">Partner with Texas Defined</Link></div></section><section className="mt-14 border-t border-border pt-8"><p className="text-xs leading-6 text-muted-foreground">Current verified collection size: {expandedPaintedChurches.length} churches. Machine-readable distributions are generated from the same shared records as the public comparison and church pages.</p></section></Container></main>;
}
