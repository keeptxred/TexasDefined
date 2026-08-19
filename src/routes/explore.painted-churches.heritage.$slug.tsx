import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchHeritageBySlug } from "@/data/painted-church-heritage";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/heritage/$slug")({
  loader: ({ params }) => {
    const heritage = paintedChurchHeritageBySlug.get(params.slug);
    if (!heritage) throw notFound();
    return { heritage };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Painted Church heritage unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { heritage } = loaderData;
    const canonicalPath = `/explore/painted-churches/heritage/${params.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const description = `${heritage.name} and the Texas Painted Churches: migration context, connected churches, documented cultural history and authoritative sources.`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${heritage.name} & the Texas Painted Churches`, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
        { "@type": "WebPage", "@id": `${pageUrl}#page`, url: pageUrl, name: heritage.name, description: heritage.answer, about: heritage.churchSlugs.map((slug) => ({ "@id": `${siteUrl}/explore/painted-churches/${slug}#church` })), citation: heritage.sourceUrl },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
          { "@type": "ListItem", position: 3, name: "Heritage", item: `${siteUrl}/explore/painted-churches/heritage` },
          { "@type": "ListItem", position: 4, name: heritage.name, item: pageUrl },
        ] },
      ] })],
    };
  },
  component: HeritagePage,
});

function HeritagePage() {
  const { heritage } = Route.useLoaderData();
  const churches = expandedPaintedChurches.filter((church) => heritage.churchSlugs.includes(church.slug));
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches/heritage">Heritage</Link></li><li aria-hidden>·</li><li aria-current="page">{heritage.name}</li></ol></nav><p className="eyebrow mt-8 text-primary">Painted Churches heritage</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{heritage.name}</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{heritage.answer}</p></Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Historical context</p><ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">{heritage.context.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Connected churches</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{churches.map((church) => <article key={church.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h2 className="mt-2 font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p></article>)}</div></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Authority source</p><a href={heritage.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block font-display text-2xl text-primary hover:underline">{heritage.sourceLabel}</a><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined uses community, parish and heritage-organization sources to keep migration history distinct from assumptions based only on church names or modern geography.</p></section></Container></main>;
}
