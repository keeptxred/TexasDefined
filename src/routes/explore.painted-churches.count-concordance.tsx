import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchCountConcordance } from "@/data/painted-church-count-concordance";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/count-concordance";
const description = "Why Texas Painted Church counts range from 6 to 35: a source-by-source concordance separating the Schulenburg tour circuit, National Register study, current THC index and broader statewide research.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Count Concordance | Why the Numbers Differ", description, modifiedTime: "2026-08-19T23:00:00-05:00" }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Dataset", "@id": `${url}#dataset`, name: "Texas Painted Churches published-count concordance", description, url, dateModified: "2026-08-19", variableMeasured: ["published count", "scope", "date", "definition", "source"], creator: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` } },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: absoluteUrl(texasDefinedBrand, "/explore/painted-churches") },
            { "@type": "ListItem", position: 3, name: "Count concordance", item: url },
          ] },
        ],
      })],
    };
  },
  component: CountConcordance,
});

function CountConcordance() {
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Count concordance</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Source concordance</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Six, fourteen, fifteen, twenty, thirty-two or thirty-five?</h1>
      <p className="mt-6 max-w-5xl text-lg leading-8 text-muted-foreground">All of those numbers have appeared in credible Painted Churches sources because they answer different questions. This concordance records the source, date, scope and definition behind each number instead of pretending one count is universally correct.</p>
    </Container></section>
    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">Texas Defined currently verifies {expandedPaintedChurches.length} churches, but that is our evidence-backed collection—not a claim that only {expandedPaintedChurches.length} exist.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">The Schulenburg Chamber operates a six-church visitor circuit. The current THC Multiple Property Submission index surfaces fourteen associated entries. The original thematic study discussed fifteen churches, including St. Joseph's in Galveston, which had already been individually listed in 1976. Broader documentary, journalism and book research use wider definitions and report more than twenty, thirty-two, or potentially up to thirty-five surviving churches with comparable painted elements.</p></section>
      <div className="mt-14 space-y-8">{paintedChurchCountConcordance.map((entry) => <article key={entry.id} className="border-t border-border pt-7"><div className="grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)]"><div><p className="eyebrow text-primary">{entry.dateOrEra}</p><p className="mt-3 font-display text-4xl">{entry.countText}</p></div><div><h2 className="font-display text-3xl">{entry.label}</h2><p className="mt-3 text-sm font-semibold text-foreground">Scope: {entry.scope}</p><p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">{entry.interpretation}</p><a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-primary text-sm text-primary">{entry.sourceLabel}</a></div></div></article>)}</div>
      <section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Historical reconciliation</p><h2 className="mt-3 font-display text-3xl">Why fourteen and fifteen can both be historically defensible.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">The original decorative-interior thematic study treated fifteen churches together. St. Joseph's Church in Galveston was part of that study but was already individually listed on the National Register in 1976. Texas Defined therefore distinguishes the historical fifteen-church study from the current THC MPS index rather than erasing either record.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/national-register-study" className="border-b border-primary text-primary">Original thematic study</Link><Link to="/explore/painted-churches/how-many" className="border-b border-primary text-primary">How many Painted Churches?</Link><Link to="/explore/painted-churches/census" className="border-b border-primary text-primary">Master census</Link></div></section>
    </Container>
  </main>;
}
