import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchCandidates, paintedChurchExclusions } from "@/data/painted-church-census";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/census";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Texas Defined's transparent Painted Churches census: verified churches, candidates under review and scope exclusions with reasons and source trails.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Master Census", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Painted Churches Master Census", description },
        { "@type": "ItemList", "@id": `${pageUrl}#verified`, numberOfItems: expandedPaintedChurches.length, itemListElement: expandedPaintedChurches.map((church, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Church", name: church.name, url: `${siteUrl}/explore/painted-churches/${church.slug}` } })) },
      ],
    })],
  }),
  component: PaintedChurchCensus,
});

function PaintedChurchCensus() {
  const grouped = {
    formal: expandedPaintedChurches.filter((church) => church.classification === "formal-national-register-group"),
    broader: expandedPaintedChurches.filter((church) => church.classification === "broader-historic-tradition"),
    modern: expandedPaintedChurches.filter((church) => church.classification === "modern-decorative-campaign"),
  };
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Master census</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Collection boundaries</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The Texas Painted Churches master census.</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">This page shows what Texas Defined counts, what it is still researching, and what it deliberately excludes. A church is not promoted because it appears in a travel list; it needs church-specific evidence and a defensible classification.</p>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="grid gap-6 md:grid-cols-4">
        <Stat label="Verified total" value={expandedPaintedChurches.length} />
        <Stat label="Formal NR group" value={grouped.formal.length} />
        <Stat label="Candidates" value={paintedChurchCandidates.length} />
        <Stat label="Scope exclusions" value={paintedChurchExclusions.length} />
      </section>

      <section className="mt-12 border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Verified collection</p><h2 className="mt-3 font-display text-4xl">Three classifications, not one inflated number.</h2><div className="mt-8 grid gap-8 lg:grid-cols-3"><VerifiedGroup title="Formal National Register decorative-interior group" churches={grouped.formal} /><VerifiedGroup title="Broader historic Painted Churches tradition" churches={grouped.broader} /><VerifiedGroup title="Modern documented decorative campaign" churches={grouped.modern} /></div></section>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Research queue</p><h2 className="mt-3 font-display text-4xl">Candidates under review</h2><div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchCandidates.map((entry) => <article key={entry.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{entry.city} · candidate</p><h3 className="mt-2 font-display text-2xl">{entry.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{entry.reason}</p><div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">{entry.sourceUrls.map((url) => <a key={url} href={url} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Research source</a>)}</div></article>)}</div></section>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Scope control</p><h2 className="mt-3 font-display text-4xl">Excluded examples and why</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">An exclusion does not mean a church lacks important art. It means the building belongs to a different historical/decorative tradition from the collection Texas Defined is defining here.</p><div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchExclusions.map((entry) => <article key={entry.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{entry.city} · excluded from this census</p><h3 className="mt-2 font-display text-2xl">{entry.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{entry.reason}</p>{entry.sourceUrls.map((url) => <a key={url} href={url} target="_blank" rel="noreferrer" className="mt-4 mr-4 inline-block border-b border-primary text-xs text-primary">Scope source</a>)}</article>)}</div></section>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Method</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Read inclusion and correction methodology</Link><Link to="/explore/painted-churches/how-many" className="border-b border-primary text-primary">Why public counts differ</Link><Link to="/explore/painted-churches/compare" className="border-b border-primary text-primary">Compare verified churches</Link></div></section>
    </Container>
  </main>;
}

function Stat({ label, value }: { label: string; value: number }) { return <div className="border-t border-border pt-5"><p className="font-display text-5xl">{value}</p><p className="eyebrow mt-2 text-muted-foreground">{label}</p></div>; }
function VerifiedGroup({ title, churches }: { title: string; churches: typeof expandedPaintedChurches }) { return <div><h3 className="font-display text-2xl">{title}</h3><ul className="mt-5 space-y-3 text-sm">{churches.map((church) => <li key={church.slug}><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="border-b border-border hover:border-primary hover:text-primary">{church.shortName}</Link><span className="ml-2 text-muted-foreground">· {church.city}</span></li>)}</ul></div>; }
