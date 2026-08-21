import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { canonicalPaintedChurchContributorBySlug } from "@/data/painted-church-contributor-index";
import { canonicalPaintedChurchFeatures } from "@/data/painted-church-feature-index";
import { paintedChurchTechniqueBySlug } from "@/data/painted-church-techniques";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/people/$slug")({
  loader: ({ params }) => {
    const person = canonicalPaintedChurchContributorBySlug.get(params.slug);
    if (!person) throw notFound();
    return { person };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Painted Church contributor unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { person } = loaderData;
    const canonicalPath = `/explore/painted-churches/people/${params.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const description = `${person.name}: documented role in the Texas Painted Churches, connected churches, object-level work, techniques, sources and historical significance.`;
    const authorityEntity = {
      "@type": person.kind === "organization" ? "Organization" : "Person",
      "@id": `${pageUrl}#contributor`,
      name: person.name,
      url: pageUrl,
      description: person.answer,
      subjectOf: [
        ...person.sources.map((source) => ({ "@type": "CreativeWork", name: source.label, url: source.url })),
        ...person.churchSlugs.map((slug) => ({ "@type": "WebPage", url: `${siteUrl}/explore/painted-churches/${slug}` })),
      ],
      knowsAbout: person.techniqueSlugs?.map((slug) => `${siteUrl}/explore/painted-churches/techniques/${slug}`),
    };
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${person.name} | Texas Painted Churches`, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          authorityEntity,
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
            { "@type": "ListItem", position: 3, name: "People & studios", item: `${siteUrl}/explore/painted-churches/people` },
            { "@type": "ListItem", position: 4, name: person.name, item: pageUrl },
          ] },
        ],
      })],
    };
  },
  component: PersonPage,
});

function PersonPage() {
  const { person } = Route.useLoaderData();
  const churches = expandedPaintedChurches.filter((church) => person.churchSlugs.includes(church.slug));
  const features = canonicalPaintedChurchFeatures.filter((feature) => feature.contributorSlugs?.includes(person.slug));
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches/people">People & studios</Link></li><li aria-hidden>·</li><li aria-current="page">{person.name}</li></ol></nav><p className="eyebrow mt-8 text-primary">{person.kind} · {person.roles.join(" · ")}</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{person.name}</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{person.answer}</p>{person.attributionNote ? <p className="mt-6 max-w-4xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Attribution note:</strong> {person.attributionNote}</p> : null}</Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Why this contributor matters</p><ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">{person.significance.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Connected churches</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{churches.map((church) => <article key={church.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h2 className="mt-2 font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p></article>)}</div></section>{features.length ? <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Documented work</p><h2 className="mt-3 font-display text-4xl">Objects and interior features tied to this contributor</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">These are object- or campaign-level links in the evidence graph. A broad church attribution does not automatically assign every surviving feature to the contributor.</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{features.map((feature) => { const church = expandedPaintedChurches.find((item) => item.slug === feature.churchSlug); return <article key={feature.id} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{church?.shortName ?? feature.churchSlug} · {feature.kind.replaceAll("-", " ")}</p><h3 className="mt-2 font-display text-2xl">{feature.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.location}: {feature.description}</p><p className="mt-3 text-xs leading-6 text-muted-foreground">Integrity: {feature.integrity.replaceAll("-", " ")}</p><a href={feature.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block border-b border-primary text-xs text-primary">{feature.sourceLabel}</a></article>; })}</div></section> : null}{person.techniqueSlugs?.length ? <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Related techniques</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">{person.techniqueSlugs.map((slug) => <Link key={slug} to="/explore/painted-churches/techniques/$slug" params={{ slug }} className="border-b border-primary text-primary">{paintedChurchTechniqueBySlug.get(slug)?.name ?? slug}</Link>)}</div></section> : null}<section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Source trail</p><h2 className="mt-3 font-display text-3xl">Evidence for the attribution</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{person.sources.map((source) => <article key={`${source.url}-${source.use}`} className="border border-border p-5"><a href={source.url} target="_blank" rel="noreferrer" className="font-display text-xl text-primary hover:underline">{source.label}</a><p className="mt-2 text-sm leading-6 text-muted-foreground">Used for {source.use}.</p></article>)}</div><p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined distinguishes original authorship, architecture, construction, later restoration and research roles. A name or firm is connected to a church only when a source supports the relationship; unresolved initials and conflicting records remain visible.</p></section></Container></main>;
}
