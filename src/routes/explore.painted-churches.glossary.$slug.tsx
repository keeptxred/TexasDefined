import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchGlossaryBySlug } from "@/data/painted-church-glossary";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/glossary/$slug")({
  loader: ({ params }) => {
    const term = paintedChurchGlossaryBySlug.get(params.slug);
    if (!term) throw notFound();
    return { term };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Glossary term unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { term } = loaderData;
    const canonicalPath = `/explore/painted-churches/glossary/${params.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const description = `${term.name} in Texas Painted Churches: definition, why it matters, church examples and related architectural terms.`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${term.name} | Painted Church Glossary`, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
        { "@type": "DefinedTerm", "@id": `${pageUrl}#term`, name: term.name, description: term.definition, url: pageUrl, inDefinedTermSet: `${siteUrl}/explore/painted-churches/glossary#terms`, subjectOf: term.churchSlugs.map((slug) => `${siteUrl}/explore/painted-churches/${slug}`) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
          { "@type": "ListItem", position: 3, name: "Glossary", item: `${siteUrl}/explore/painted-churches/glossary` },
          { "@type": "ListItem", position: 4, name: term.name, item: pageUrl },
        ] },
      ] })],
    };
  },
  component: GlossaryTermPage,
});

function GlossaryTermPage() {
  const { term } = Route.useLoaderData();
  const churches = expandedPaintedChurches.filter((church) => term.churchSlugs.includes(church.slug));
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches/glossary">Glossary</Link></li><li aria-hidden>·</li><li aria-current="page">{term.name}</li></ol></nav><p className="eyebrow mt-8 text-primary">Painted Church glossary</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{term.name}</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{term.definition}</p></Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Why it matters here</p><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">{term.whyItMatters}</p></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Church examples</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{churches.map((church) => <article key={church.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h2 className="mt-2 font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p></article>)}</div></section>{term.related?.length ? <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Related terms</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">{term.related.map((slug) => <Link key={slug} to="/explore/painted-churches/glossary/$slug" params={{ slug }} className="border-b border-primary text-primary">{paintedChurchGlossaryBySlug.get(slug)?.name ?? slug}</Link>)}</div></section> : null}</Container></main>;
}
