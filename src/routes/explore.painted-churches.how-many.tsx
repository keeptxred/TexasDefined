import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/how-many";
const formalCount = expandedPaintedChurches.filter((church) => church.nationalRegister?.multipleProperty).length;
const clusterCount = expandedPaintedChurches.filter((church) => church.schulenburgCluster).length;
const description = "How many Painted Churches are in Texas? The answer depends on whether you mean the Schulenburg tour cluster, the National Register decorative-interior group or the broader statewide tradition.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "How Many Painted Churches Are in Texas?", description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${url}#page`, url, name: "How Many Painted Churches Are in Texas?", description, isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, about: { "@id": `${absoluteUrl(texasDefinedBrand, "/explore/painted-churches")}#collection` }, publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` } },
          { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: absoluteUrl(texasDefinedBrand, "/explore/painted-churches") },
            { "@type": "ListItem", position: 3, name: "How many?", item: url },
          ] },
        ],
      })],
    };
  },
  component: PaintedChurchCountExplainer,
});

function PaintedChurchCountExplainer() {
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">How many?</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Answering the confusing question</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">How many Painted Churches are there in Texas?</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">There is no single universally accepted modern count because different sources use “Painted Churches” for different groups. Texas Defined currently documents <strong className="text-foreground">{expandedPaintedChurches.length} verified church profiles</strong>, while the narrower National Register decorative-interior group contains {formalCount} entries in this collection and the Schulenburg-area touring cluster contains {clusterCount} communities.</p>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">The count changes with the definition.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">If someone says “the Painted Churches,” they may mean the six communities promoted around Schulenburg, the narrower historic churches grouped under the National Register theme “Churches with Decorative Interior Painting,” or the broader statewide tradition that includes additional historic and later painted interiors. Those are related groups, not identical lists.</p></section>

      <section className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
        <article className="bg-background p-7"><p className="eyebrow text-primary">Local touring cluster</p><p className="mt-3 font-display text-5xl">{clusterCount}</p><h2 className="mt-4 font-display text-2xl">Schulenburg-area communities</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Ammannsville, Dubina, High Hill, Praha, Moravia and St. John form the best-known local touring circuit.</p></article>
        <article className="bg-background p-7"><p className="eyebrow text-primary">Formal historic group</p><p className="mt-3 font-display text-5xl">{formalCount}</p><h2 className="mt-4 font-display text-2xl">National Register decorative-interior entries</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Texas Defined labels this narrower historic group separately so readers do not confuse formal designation with the broader travel term.</p></article>
        <article className="bg-background p-7"><p className="eyebrow text-primary">Texas Defined verified set</p><p className="mt-3 font-display text-5xl">{expandedPaintedChurches.length}</p><h2 className="mt-4 font-display text-2xl">Broader statewide profiles</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">The collection includes formally designated churches plus separately documented historic or later painted interiors that meet the published verification standard.</p></article>
      </section>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Why lists disagree</p><h2 className="mt-3 font-display text-4xl">Travel labels and historic designations answer different questions.</h2><div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-muted-foreground"><p>A tourism list is usually designed to help visitors plan a route. A National Register thematic group is designed to document historic significance. A documentary or scholarly project may include churches that share techniques, immigrant traditions or decorative programs even when they were not nominated under the same formal historic-property framework.</p><p>Texas Defined therefore keeps the labels visible instead of forcing all churches into one category. The statewide total can grow when a candidate is independently verified, but the historical designation attached to a church does not change merely because the site adds it to the broader guide.</p></div></section>

      <section className="mt-14 border-y border-border py-9"><p className="eyebrow text-primary">Verify the definitions</p><div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm"><Link to="/explore/painted-churches" className="border-b border-primary text-primary">Browse all verified churches</Link><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Read the inclusion methodology</Link><Link to="/explore/painted-churches/compare" className="border-b border-primary text-primary">Compare churches side by side</Link></div></section>
    </Container>
  </main>;
}
