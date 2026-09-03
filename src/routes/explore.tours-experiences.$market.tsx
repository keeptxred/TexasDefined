import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getViatorCategory, getViatorMarket, VIATOR_TEXAS_MARKETS } from "@/data/viator-experiences";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";
import { buildViatorAffiliateUrl, buildViatorSearchUrl, isViatorAffiliateConfigured } from "@/lib/viator-affiliate";

export const Route = createFileRoute("/explore/tours-experiences/$market")({
  loader: ({ params }) => {
    const market = getViatorMarket(params.market);
    if (!market) throw notFound();
    return market;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Texas Tours | Texas Defined" }, { name: "robots", content: "noindex, nofollow" }] };
    const canonicalPath = `/explore/tours-experiences/${params.market}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const description = `${loaderData.summary} Compare the TexasDefined planning context with current Viator tours and activities.`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${loaderData.name} Tours & Experiences | Texas Defined`,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: `${loaderData.name} tours and experiences`,
            description,
            about: loaderData.categories.map((id) => ({ "@type": "Thing", name: getViatorCategory(id)?.label ?? id })),
            mainEntity: { "@id": `${pageUrl}#anchors` },
            dateModified: loaderData.sourceCheckedAt,
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#anchors`,
            name: `${loaderData.name} experience anchors`,
            numberOfItems: loaderData.anchorAttractions.length,
            itemListElement: loaderData.anchorAttractions.map((name, index) => ({ "@type": "ListItem", position: index + 1, name })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Tours & Experiences", item: absoluteUrl(texasDefinedBrand, "/explore/tours-experiences") },
              { "@type": "ListItem", position: 4, name: loaderData.name, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Texas experiences</p><h1 className="mt-3 font-display text-4xl">That experience market is not mapped yet</h1><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Browse the statewide <Link to="/explore/tours-experiences" className="border-b border-primary text-primary">Texas tours and experiences directory</Link>.</p></Container>,
  component: ViatorMarketPage,
});

function ViatorMarketPage() {
  const market = Route.useLoaderData();
  const affiliateConfigured = isViatorAffiliateConfigured();
  const marketUrl = market.viatorDestinationUrl
    ? buildViatorAffiliateUrl(market.viatorDestinationUrl, `texasdefined-${market.slug}`)
    : buildViatorSearchUrl(market.searchQuery, `texasdefined-${market.slug}`);
  const nearby = (market.nearbyMarkets ?? []).flatMap((slug) => {
    const item = VIATOR_TEXAS_MARKETS.find((candidate) => candidate.slug === slug);
    return item ? [item] : [];
  });

  return <>
    <Container className="pb-8 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore/tours-experiences">Tours & experiences</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">{market.name}</span>
      </nav>
      <header className="py-10 sm:py-14">
        <p className="eyebrow text-primary">{market.regionLabel}</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Tours and experiences in {market.name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{market.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={marketUrl} target="_blank" rel="sponsored noopener noreferrer" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">See current Viator options ↗</a>
          <Link to="/explore/trip-planner" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Add stops in Trip Planner →</Link>
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-5 text-muted-foreground">{affiliateConfigured ? "Affiliate disclosure: TexasDefined may earn a commission from qualifying bookings made through Viator links, at no additional cost to you. Availability, prices and product details are controlled by Viator and its suppliers." : "TexasDefined is completing Viator enrollment. These links currently provide booking discovery; affiliate tracking can be activated centrally once the approved Viator parameters are available."}</p>
      </header>
    </Container>

    <section className="border-y border-border bg-surface py-14 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Best booking lanes</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl leading-tight">What to look for around {market.name}</h2>
        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {market.categories.map((id) => {
            const category = getViatorCategory(id);
            if (!category) return null;
            const url = buildViatorSearchUrl(`${market.name} ${category.label}`, `texasdefined-${market.slug}-${id}`);
            return <article key={id} className="bg-background p-5">
              <h3 className="font-display text-2xl">{category.label}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>
              <a href={url} target="_blank" rel="sponsored noopener noreferrer" className="mt-5 inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Browse current options ↗</a>
            </article>;
          })}
        </div>
      </Container>
    </section>

    <section className="py-14 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Experience anchors</p>
        <h2 className="mt-3 font-display text-4xl">Places and themes worth checking for bookable inventory</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">These are durable Texas travel anchors, not promises that a particular ticket or tour is always available. Each link checks current Viator inventory for that experience rather than hard-coding a product that may later disappear.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {market.anchorAttractions.map((anchor) => <a key={anchor} href={buildViatorSearchUrl(`${anchor} ${market.name} Texas`, `texasdefined-${market.slug}-anchor`)} target="_blank" rel="sponsored noopener noreferrer" className="group border border-border bg-background p-5 transition-colors hover:border-primary"><span className="font-display text-2xl group-hover:text-primary">{anchor}</span><span className="mt-2 block text-sm text-muted-foreground">Check current tours, tickets or related activities on Viator ↗</span></a>)}
        </div>
      </Container>
    </section>

    {nearby.length > 0 && <section className="border-t border-border bg-surface py-14 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Build a Texas route</p>
        <h2 className="mt-3 font-display text-4xl">Pair {market.name} with nearby experience markets</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nearby.map((item) => <Link key={item.slug} to="/explore/tours-experiences/$market" params={{ market: item.slug }} className="group border border-border bg-background p-5"><p className="eyebrow text-primary">{item.regionLabel}</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">{item.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p></Link>)}
        </div>
      </Container>
    </section>}

    <section className="border-t border-border py-12">
      <Container className="text-sm leading-6 text-muted-foreground">
        <p><strong className="text-foreground">Editorial rule:</strong> TexasDefined destination guidance remains independent of affiliate relationships. We use first-party or authoritative sources for operational travel facts; Viator links are a booking layer for tours and activities, not the authority source for whether a public site is open or how it is managed.</p>
        <p className="mt-3">Inventory reviewed for this market directory: {market.sourceCheckedAt}.</p>
      </Container>
    </section>
  </>;
}
