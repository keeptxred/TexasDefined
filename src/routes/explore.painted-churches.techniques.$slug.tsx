import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getPaintedChurchTechnique, paintedChurchTechniqueBySlug } from "@/data/painted-church-techniques";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/techniques/$slug")({
  loader: ({ params }) => {
    const technique = getPaintedChurchTechnique(params.slug);
    if (!technique) throw notFound();
    const churches = expandedPaintedChurches.filter((church) => technique.churchSlugs.includes(church.slug));
    return { technique, churches };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Technique unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { technique, churches } = loaderData;
    const canonicalPath = `/explore/painted-churches/techniques/${params.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${technique.name} in Texas Painted Churches`,
        description: `${technique.answer} See documented Texas Painted Church examples, what to look for, related techniques and source evidence.`,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "DefinedTerm",
            "@id": `${pageUrl}#term`,
            name: technique.name,
            description: technique.answer,
            url: pageUrl,
            inDefinedTermSet: { "@id": `${siteUrl}/explore/painted-churches/techniques#terms` },
            subjectOf: churches.map((church) => ({ "@type": "Church", name: church.name, url: `${siteUrl}/explore/painted-churches/${church.slug}` })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
              { "@type": "ListItem", position: 2, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
              { "@type": "ListItem", position: 3, name: "Techniques", item: `${siteUrl}/explore/painted-churches/techniques` },
              { "@type": "ListItem", position: 4, name: technique.name, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Painted Church techniques</p><h1 className="mt-3 font-display text-4xl">That technique guide isn’t available.</h1><Link to="/explore/painted-churches/techniques" className="mt-5 inline-block border-b border-primary text-primary">Return to all techniques</Link></Container>,
  component: TechniqueDetail,
});

function TechniqueDetail() {
  const { technique, churches } = Route.useLoaderData();
  const related = technique.related.map((slug) => paintedChurchTechniqueBySlug.get(slug)).filter(Boolean);
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches/techniques">Techniques</Link></li><li aria-hidden>·</li><li aria-current="page">{technique.name}</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Decorative technique</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{technique.name}</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{technique.shortDefinition}</p>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">What is {technique.name.toLowerCase()}?</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">{technique.answer}</p></section>

      <section className="mt-12 grid gap-10 border-t border-border pt-8 md:grid-cols-2">
        <div><p className="eyebrow text-primary">Process</p><h2 className="mt-3 font-display text-3xl">How the technique works</h2><ol className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">{technique.howItWorks.map((step, index) => <li key={step}><span className="mr-3 font-semibold text-foreground">{index + 1}.</span>{step}</li>)}</ol></div>
        <div><p className="eyebrow text-primary">Field guide</p><h2 className="mt-3 font-display text-3xl">What to look for in a church</h2><ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">{technique.whatToLookFor.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="mt-12 border-t border-border pt-8"><p className="eyebrow text-primary">Documented examples</p><h2 className="mt-3 font-display text-4xl">Churches connected to this technique</h2>{churches.length ? <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{churches.map((church) => <article key={church.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h3 className="mt-2 font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{church.summary}</p><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="mt-4 inline-block border-b border-primary text-sm text-primary">Open church guide</Link></article>)}</div> : <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">Texas decorative-painting literature documents this technique, but Texas Defined has not yet assigned it to an individual verified church without church-specific evidence.</p>}</section>

      <section className="mt-12 border-t border-border pt-8"><p className="eyebrow text-primary">Source evidence</p><h2 className="mt-3 font-display text-3xl">Why Texas Defined uses this definition</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Technique definitions are grounded in a named decorative-painting source. Church relationships are a separate evidence claim and are withheld when a specific attribution is not strong enough.</p><a href={technique.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-primary text-sm text-primary">{technique.sourceLabel}</a></section>

      {related.length ? <section className="mt-12 border-t border-border pt-8"><p className="eyebrow text-primary">Related techniques</p><div className="mt-5 flex flex-wrap gap-3">{related.map((item) => item ? <Link key={item.slug} to="/explore/painted-churches/techniques/$slug" params={{ slug: item.slug }} className="border border-border px-4 py-3 text-sm hover:border-foreground">{item.name}</Link> : null)}</div></section> : null}
    </Container>
  </main>;
}
