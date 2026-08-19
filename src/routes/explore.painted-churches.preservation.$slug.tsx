import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchPreservationBySlug } from "@/data/painted-church-preservation";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/preservation/$slug")({
  loader: ({ params }) => {
    const topic = paintedChurchPreservationBySlug.get(params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Preservation topic unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { topic } = loaderData;
    const canonicalPath = `/explore/painted-churches/preservation/${params.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const description = `${topic.name} in the Texas Painted Churches: documented examples, preservation principles, church relationships and source evidence.`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${topic.name} | Texas Painted Churches`, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
        { "@type": "DefinedTerm", "@id": `${pageUrl}#term`, name: topic.name, description: topic.answer, url: pageUrl, inDefinedTermSet: `${siteUrl}/explore/painted-churches/preservation#topics`, subjectOf: topic.churchSlugs.map((slug) => `${siteUrl}/explore/painted-churches/${slug}`), citation: topic.sourceUrl },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
          { "@type": "ListItem", position: 3, name: "Preservation", item: `${siteUrl}/explore/painted-churches/preservation` },
          { "@type": "ListItem", position: 4, name: topic.name, item: pageUrl },
        ] },
      ] })],
    };
  },
  component: PreservationPage,
});

function PreservationPage() {
  const { topic } = Route.useLoaderData();
  const churches = expandedPaintedChurches.filter((church) => topic.churchSlugs.includes(church.slug));
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches/preservation">Preservation</Link></li><li aria-hidden>·</li><li aria-current="page">{topic.name}</li></ol></nav><p className="eyebrow mt-8 text-primary">Preservation authority guide</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{topic.name}</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{topic.answer}</p></Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">How Texas Defined uses this term</p><ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">{topic.principles.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Documented examples</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{churches.map((church) => <article key={church.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">Integrity: {church.interiorIntegrity.replace(/-/g, " ")}</p><h2 className="mt-2 font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{church.significance}</p></article>)}</div></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Source trail</p><a href={topic.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block font-display text-2xl text-primary hover:underline">{topic.sourceLabel}</a></section></Container></main>;
}
