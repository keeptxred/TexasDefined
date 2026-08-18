import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getPaintedChurchDetail } from "@/data/painted-churches.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/$slug")({
  loader: async ({ params }) => {
    const data = await getPaintedChurchDetail({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Painted church unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { church } = loaderData;
    const canonicalPath = `/explore/painted-churches/${params.slug}`;
    const url = `${siteUrl}${canonicalPath}`;
    const churchSchema = {
      "@type": "Church",
      "@id": `${url}#church`,
      name: church.name,
      description: church.summary,
      url,
      address: { "@type": "PostalAddress", addressLocality: church.city, addressRegion: "TX", addressCountry: "US", ...(church.address ? { streetAddress: church.address } : {}) },
      ...(church.image ? { image: church.image.src } : {}),
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
        { "@type": "ListItem", position: 3, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
        { "@type": "ListItem", position: 4, name: church.shortName, item: url },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${church.shortName} | Texas Painted Church Guide`, description: `${church.summary} Location, designation, visitor planning, sources and photography for ${church.shortName}.` }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [churchSchema, breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Painted Churches of Texas</p><h1 className="mt-3 font-display text-4xl">That church guide isn’t available.</h1><p className="mt-4 text-muted-foreground"><Link to="/explore/painted-churches" className="border-b border-primary text-primary">Return to the painted churches guide.</Link></p></Container>,
  component: PaintedChurchDetail,
});

function PaintedChurchDetail() {
  const { church, related } = Route.useLoaderData();
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address ?? `${church.name}, ${church.city}, Texas`)}`;

  return (
    <main>
      <Container className="pt-10 sm:pt-14"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches" className="hover:text-foreground">Painted Churches</Link></li></ol></nav></Container>

      <section className="mt-5 border-y border-border bg-ink text-ink-foreground">
        <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(340px,.72fr)] lg:items-center">
          <div><p className="eyebrow text-ink-foreground/65">{church.city} · {church.county} County</p><h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{church.name}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{church.summary}</p><div className="mt-7 flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-[0.12em] text-ink-foreground/65">{church.nationalRegister?.multipleProperty && <span className="border border-ink-foreground/30 px-2 py-1">NR decorative interior</span>}{church.schulenburgCluster && <span className="border border-ink-foreground/30 px-2 py-1">Schulenburg cluster</span>}{church.recordedTexasHistoricLandmark && <span className="border border-ink-foreground/30 px-2 py-1">Recorded Texas Historic Landmark</span>}</div></div>
          {church.image ? <figure><img src={church.image.src} alt={church.image.alt} width={church.image.width} height={church.image.height} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full object-cover" /><figcaption className="mt-3 text-xs leading-5 text-ink-foreground/60">{church.image.credit} · {church.image.license} · <a href={church.image.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-ink-foreground/40">source</a></figcaption></figure> : <div className="flex aspect-[4/3] items-end border border-ink-foreground/20 p-7"><div><p className="eyebrow text-ink-foreground/55">Texas painted church</p><p className="mt-3 font-display text-4xl">{church.city}</p></div></div>}
        </Container>
      </section>

      <Container className="grid gap-14 py-14 sm:py-18 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.65fr)]">
        <div>
          <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Why it matters</p><h2 className="mt-3 font-display text-4xl">Part of the painted-church story</h2><p className="mt-6 max-w-3xl text-base leading-8 text-foreground/90">{church.significance}</p></section>
          <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Plan the visit</p><h2 className="mt-3 font-display text-3xl">What to know before you go</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{church.visitNote}</p><dl className="mt-8 grid border-y border-border sm:grid-cols-2"><div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Community</dt><dd className="mt-2 text-base">{church.city}, Texas</dd></div><div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">County</dt><dd className="mt-2 text-base">{church.county} County</dd></div><div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Tradition</dt><dd className="mt-2 text-base">{church.denomination}</dd></div><div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Location</dt><dd className="mt-2 text-base">{church.address ?? `${church.city}, Texas`}</dd></div></dl><div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href={mapUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Open in Maps</a><a href={church.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Primary historic source</a>{church.secondarySourceUrl && <a href={church.secondarySourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Visitor / supporting source</a>}</div></section>
        </div>
        <aside className="space-y-8">
          <section className="border-t-2 border-foreground pt-6"><p className="eyebrow text-primary">Build the day</p><h2 className="mt-3 font-display text-3xl">Keep this stop in context</h2><Link to="/explore/painted-churches" className="mt-5 inline-block border-b border-primary pb-1 text-sm text-primary">Painted Churches route guide</Link><br /><Link to="/explore/trip-planner" className="mt-4 inline-block border-b border-primary pb-1 text-sm text-primary">Texas Trip Planner</Link></section>
          <section className="border-t border-border pt-6"><p className="eyebrow text-muted-foreground">Nearby in the collection</p><div className="mt-5 divide-y divide-border">{related.map((candidate) => <article key={candidate.slug} className="py-5 first:pt-0"><p className="eyebrow text-primary">{candidate.city} · {candidate.county} County</p><h3 className="mt-2 font-display text-2xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: candidate.slug }} className="hover:text-primary">{candidate.shortName}</Link></h3></article>)}</div></section>
          <section className="border-t border-border pt-6"><p className="eyebrow text-muted-foreground">Source check</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Historic and visitor information checked {new Date(`${church.sourceCheckedAt}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}. Re-check time-sensitive access before traveling.</p></section>
        </aside>
      </Container>
    </main>
  );
}
