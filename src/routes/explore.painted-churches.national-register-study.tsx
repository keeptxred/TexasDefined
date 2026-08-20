import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchThematicNomination, thematicNominationEvidence } from "@/data/painted-church-thematic-nomination";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/national-register-study";
const description = "Texas Defined's source-by-source analysis of the 1982 National Register thematic nomination for Churches in Texas with Decorative Interior Painting, including the historical 15th church, techniques, architecture, iconography and survey methodology.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "The Original 1982 Texas Painted Churches National Register Study", description, modifiedTime: "2026-08-19T22:00:00-05:00" }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "ScholarlyArticle", "@id": `${url}#analysis`, headline: "The Original 1982 Texas Painted Churches National Register Study", description, url, dateModified: "2026-08-19", isBasedOn: paintedChurchThematicNomination.sourceUrl, about: { "@id": `${absoluteUrl(texasDefinedBrand, "/explore/painted-churches")}#collection` }, publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` } },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: absoluteUrl(texasDefinedBrand, "/explore/painted-churches") },
            { "@type": "ListItem", position: 3, name: "1982 National Register study", item: url },
          ] },
        ],
      })],
    };
  },
  component: NationalRegisterStudy,
});

function NationalRegisterStudy() {
  const categories = ["scope", "methodology", "technique", "architecture", "iconography", "significance", "bibliography"] as const;
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">1982 National Register study</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Primary-source research</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">What the original Texas Painted Churches nomination actually says.</h1>
      <p className="mt-6 max-w-5xl text-lg leading-8 text-muted-foreground">Prepared in 1982 for the Texas Historical Commission and National Park Service, <em>Churches in Texas with Decorative Interior Painting</em> is the foundational statewide document behind the historic group. Texas Defined has converted its most important claims into structured, church-linked evidence rather than relying on later tourism shorthand.</p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href={paintedChurchThematicNomination.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Open the original nomination</a><Link to="/explore/painted-churches/how-many" className="border-b border-primary text-primary">See the 14-vs-15 count concordance</Link></div>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">The study used 15 churches, five decorative techniques and a statewide field-survey method.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">The nomination was prepared by {paintedChurchThematicNomination.preparedBy.join(", ")} and dated May 13, 1982. It explicitly describes 15 decorated churches, documents stenciling, freehand, infill, graining and marbling, compares architecture and subject matter across the group, and says future churches could be added as the statewide survey continued.</p></section>

      <section className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-3"><article className="bg-background p-7"><p className="eyebrow text-primary">Original comparative corpus</p><p className="mt-3 font-display text-5xl">15</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Includes St. Joseph's Church in Galveston, already individually listed in 1976.</p></article><article className="bg-background p-7"><p className="eyebrow text-primary">Current THC MPS interface</p><p className="mt-3 font-display text-5xl">14</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Current properties surfaced under the Multiple Property Listing interface.</p></article><article className="bg-background p-7"><p className="eyebrow text-primary">Texas Defined verified collection</p><p className="mt-3 font-display text-5xl">{expandedPaintedChurches.length}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">The broader statewide evidence-backed collection, with historical categories kept distinct.</p></article></section>

      {categories.map((category) => {
        const items = thematicNominationEvidence.filter((item) => item.category === category);
        if (!items.length) return null;
        return <section key={category} className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">{category}</p><h2 className="mt-3 font-display text-4xl">{category === "methodology" ? "How the statewide survey was built" : category === "technique" ? "Technique evidence from the nomination" : category === "architecture" ? "Architectural relationships in the original study" : category === "iconography" ? "What the nomination records about subject matter" : category === "bibliography" ? "Sources behind the original research" : category === "significance" ? "Why the nomination said the churches matter" : "Scope and count evidence"}</h2><div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{items.map((item) => <article key={item.id} className="bg-background p-6"><p className="eyebrow text-muted-foreground">Nomination pages {item.sourcePages.join(", ")}</p><h3 className="mt-2 font-display text-2xl">{item.title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p>{item.churchSlugs?.length ? <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">{item.churchSlugs.map((slug) => { const church = expandedPaintedChurches.find((entry) => entry.slug === slug); return church ? <Link key={slug} to="/explore/painted-churches/$slug" params={{ slug }} className="border-b border-primary text-primary">{church.shortName}</Link> : null; })}</div> : null}</article>)}</div></section>;
      })}

      <section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Research rule</p><h2 className="mt-3 font-display text-3xl">The nomination is evidence, not the last word.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Texas Defined uses the thematic nomination as a controlling source for what the 1982 survey documented. Later parish records, conservation work, archival findings and scholarship can refine construction dates, authorship or condition. Where later evidence conflicts with the nomination, both records should be exposed rather than silently replacing one with the other.</p></section>
    </Container>
  </main>;
}
