import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { CANONICAL_PRIMARY_REGIONS, TEXAS_METROS, TEXAS_SUBREGIONS, canonicalPrimaryRegion, isCanonicalPrimaryRegionId } from "@/data/canonical-geography";
import { canonicalRegionPresentation } from "@/data/canonical-region-presentation";
import { TEXAS_PLACE_GEOGRAPHY, withCanonicalDestinationGeography } from "@/data/geography-knowledge-graph";
import { destinationsQuery } from "@/data/queries";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function destinationSchema(destination: Destination) {
  return {
    "@type": "TouristAttraction",
    name: destination.name,
    url: `${siteUrl}/destination/${destination.slug}`,
    description: destination.summary,
    containedInPlace: destination.county ? { "@type": "AdministrativeArea", name: `${destination.county} County, Texas` } : undefined,
  };
}

export const Route = createFileRoute("/regions/$region")({
  loader: async ({ context, params }) => {
    if (!isCanonicalPrimaryRegionId(params.region)) throw notFound();
    const region = canonicalPrimaryRegion(params.region);
    const presentation = canonicalRegionPresentation(region.id);
    const subregions = TEXAS_SUBREGIONS.filter((item) => item.primaryRegionId === region.id);
    const metros = TEXAS_METROS.filter((item) => item.primaryRegionId === region.id);
    const places = TEXAS_PLACE_GEOGRAPHY.filter((item) => item.primaryRegionId === region.id);
    const countySlugs = [...new Set(places.flatMap((place) => place.countySlugs ?? []))].sort();
    const catalog = await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 }));
    const destinations = catalog.map(withCanonicalDestinationGeography).filter((destination) => destination.geography?.primaryRegionId === region.id);
    return { region, presentation, subregions, metros, places, countySlugs, destinations };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData || !isCanonicalPrimaryRegionId(params.region)) return { meta: [{ title: "Texas region not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = `/regions/${loaderData.region.id}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const title = `${loaderData.region.name} | Texas Region Guide`;
    const description = `${loaderData.presentation.summary} Explore subregions, metros, cities, counties, destinations, travel planning and relocation context.`;
    const primaryImage = loaderData.destinations.find((destination) => destination.hero?.src)?.hero;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: primaryImage?.src, imageAlt: primaryImage?.alt }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${pageUrl}#page`,
              url: pageUrl,
              name: title,
              description,
              isPartOf: { "@id": `${siteUrl}/#website` },
              publisher: { "@id": `${siteUrl}/#organization` },
              breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
              mainEntity: { "@id": `${pageUrl}#region` },
            },
            {
              "@type": "Place",
              "@id": `${pageUrl}#region`,
              name: loaderData.region.name,
              description: loaderData.presentation.identity,
              containedInPlace: { "@type": "State", name: "Texas" },
              containsPlace: loaderData.places.slice(0, 30).map((place) => ({ "@type": "City", name: `${place.name}, Texas` })),
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#destinations`,
              name: `Places to explore in ${loaderData.region.name}`,
              numberOfItems: loaderData.destinations.length,
              itemListElement: loaderData.destinations.slice(0, 50).map((destination, index) => ({ "@type": "ListItem", position: index + 1, item: destinationSchema(destination) })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
                { "@type": "ListItem", position: 2, name: "Texas regions", item: `${siteUrl}/regions` },
                { "@type": "ListItem", position: 3, name: loaderData.region.name, item: pageUrl },
              ],
            },
          ],
        }),
      ],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Texas regions</p><h1 className="mt-3 font-display text-4xl">That canonical region is not part of the TexasDefined map.</h1><Link to="/regions" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">See all 7 regions →</Link></Container>,
  component: CanonicalRegionPage,
});

function CanonicalRegionPage() {
  const { region, presentation, subregions, metros, places, countySlugs, destinations } = Route.useLoaderData();
  const primaryImage = destinations.find((destination) => destination.hero?.src)?.hero;
  const adjacent = region.adjacentRegionIds.map((id) => canonicalPrimaryRegion(id));
  const categories = [...new Set(destinations.map((destination) => destination.category))].sort();
  const featured = destinations.slice(0, 9);

  return <>
    <Container className="pt-10 sm:pt-14">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/regions" className="hover:text-foreground">Texas regions</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-foreground">{region.name}</li></ol></nav>
    </Container>

    <section className="relative isolate mt-5 overflow-hidden bg-ink text-ink-foreground">
      {primaryImage && <img src={primaryImage.src} alt={primaryImage.alt} width={primaryImage.width} height={primaryImage.height} className="absolute inset-0 size-full object-cover opacity-45" />}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/82 to-ink/45" />
      <Container className="relative flex min-h-[58vh] flex-col justify-end pb-14 pt-32">
        <p className="eyebrow text-ink-foreground/70">1 of 7 canonical Texas regions</p>
        <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.95] sm:text-7xl">{region.name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/85">{presentation.summary}</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.72rem] uppercase tracking-[0.13em] text-ink-foreground/70"><span>{subregions.length} subregions</span><span>{metros.length} mapped metros</span><span>{places.length} mapped cities & towns</span><span>{countySlugs.length} represented counties</span></div>
      </Container>
    </section>

    <Container className="py-14 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div><p className="eyebrow text-primary">Identity</p><h2 className="mt-3 font-display text-4xl">What defines {region.name}</h2><p className="mt-5 text-base leading-8 text-muted-foreground">{presentation.identity}</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{presentation.signatures.map((signature) => <li key={signature} className="border-l-2 border-primary/35 pl-4 text-sm leading-6">{signature}</li>)}</ul></div>
        <div className="border border-border bg-muted/20 p-7"><p className="eyebrow text-primary">Map context</p><p className="mt-4 text-sm leading-7 text-muted-foreground">{presentation.mapContext}</p><p className="mt-5 text-xs leading-6 text-muted-foreground">These are editorial discovery boundaries, not legal or administrative borders. Gateway and adjacency relationships are preserved in the canonical graph for transition cities.</p></div>
      </div>
    </Container>

    <section className="border-y border-border bg-muted/20 py-14 sm:py-20"><Container>
      <div className="grid gap-12 lg:grid-cols-2">
        <div><p className="eyebrow text-primary">Subregions</p><h2 className="mt-3 font-display text-4xl">The parts inside {region.name}</h2><div className="mt-7 grid gap-4">{subregions.map((subregion) => <div key={subregion.id} className="border border-border bg-background p-5"><h3 className="font-display text-2xl">{subregion.name}</h3>{subregion.aliases.length > 0 && <p className="mt-2 text-sm text-muted-foreground">Also known as {subregion.aliases.join(", ")}</p>}<p className="mt-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">{subregion.metroIds.length ? `${subregion.metroIds.length} linked metro${subregion.metroIds.length === 1 ? "" : "s"}` : "Regional landscape / cultural subregion"}</p></div>)}</div></div>
        <div><p className="eyebrow text-primary">Metros</p><h2 className="mt-3 font-display text-4xl">Urban anchors</h2>{metros.length ? <div className="mt-7 grid gap-4">{metros.map((metro) => <div key={metro.id} className="border-b border-border pb-5"><h3 className="font-display text-2xl">{metro.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Linked to {metro.subregionIds.map((id) => subregions.find((item) => item.id === id)?.name ?? id).join(", ")}.</p></div>)}</div> : <p className="mt-6 text-sm leading-7 text-muted-foreground">This region is organized more by towns, landscapes and subregions than by a single TexasDefined metro anchor.</p>}</div>
      </div>
    </Container></section>

    <Container className="py-14 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div><p className="eyebrow text-primary">Cities & towns</p><h2 className="mt-3 font-display text-4xl">Mapped places in the graph</h2><div className="mt-7 flex flex-wrap gap-2">{places.map((place) => <a key={place.citySlug} href={`/browse/cities#city-${place.citySlug}`} className="border border-border px-3 py-2 text-sm hover:border-primary hover:text-primary">{place.name}</a>)}</div><Link to="/browse/cities" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Open the Texas city directory →</Link></div>
        <div><p className="eyebrow text-primary">Counties</p><h2 className="mt-3 font-display text-4xl">County relationships</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">These county links come from mapped cities and towns in the canonical graph; county boundaries can cross regional transition zones, so they are evidence of relationship rather than a claim that every square mile belongs exclusively to one region.</p><div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">{countySlugs.slice(0, 30).map((slug) => <a key={slug} href={`/county/${slug}`} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">{slug.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ")} County</a>)}</div></div>
      </div>
    </Container>

    <section className="border-y border-border bg-muted/20 py-14 sm:py-20"><Container>
      <p className="eyebrow text-primary">Travel & discovery</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Explore {region.name} through the places already in TexasDefined</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{presentation.travelLens}</p>
      {featured.length ? <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{featured.map((destination) => <Link key={destination.slug} to="/destination/$slug" params={{ slug: destination.slug }} className="group border border-border bg-background p-5 hover:border-primary/50"><p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{destination.category.replaceAll("-", " ")}</p><h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{destination.name}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{destination.summary}</p><span className="eyebrow mt-5 inline-block text-primary">Open guide →</span></Link>)}</div> : <p className="mt-8 text-sm text-muted-foreground">The canonical graph is ready; destination inventory for this region is still being expanded.</p>}
      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/explore/lakes-rivers" className="text-primary hover:underline">Lakes & rivers</Link><Link to="/explore/state-parks" className="text-primary hover:underline">State parks</Link><Link to="/explore/outdoors" className="text-primary hover:underline">Outdoors</Link><Link to="/explore/food-bbq" className="text-primary hover:underline">Food & barbecue</Link><Link to="/events" className="text-primary hover:underline">Events</Link><Link to="/explore/road-trips" className="text-primary hover:underline">Road trips</Link><Link to="/guides" className="text-primary hover:underline">Guides</Link></div>
      {categories.length > 0 && <p className="mt-7 text-xs leading-6 text-muted-foreground">Current mapped destination categories: {categories.map((category) => category.replaceAll("-", " ")).join(", ")}.</p>}
    </Container></section>

    <Container className="py-14 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-2">
        <article className="border border-border p-7"><p className="eyebrow text-primary">Relocation lens</p><h2 className="mt-3 font-display text-4xl">Living in {region.name}</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">{presentation.relocationLens}</p><p className="mt-5 text-sm font-semibold">Presentation: {region.relocationPresentationLabels.join(" · ")}</p><div className="mt-7 flex flex-wrap gap-x-5 gap-y-3"><Link to="/moving-to-texas" className="text-sm font-semibold text-primary hover:underline">Moving to Texas →</Link><Link to="/browse/cities" className="text-sm font-semibold text-primary hover:underline">Compare cities →</Link><Link to="/decide/financial-tools" className="text-sm font-semibold text-primary hover:underline">Money & property tools →</Link></div></article>
        <article className="border border-border p-7"><p className="eyebrow text-primary">Travel presentation</p><h2 className="mt-3 font-display text-4xl">Keep the familiar travel lenses</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Legacy Explore region URLs remain useful for trip planning and stay backward-compatible. They are cross-walked to this canonical region instead of becoming a second geography system.</p><div className="mt-7 flex flex-wrap gap-3">{region.travelRegionIds.map((travelRegionId) => <Link key={travelRegionId} to="/explore/region/$region" params={{ region: travelRegionId }} className="border border-border px-4 py-2 text-sm font-semibold text-primary hover:border-primary">Explore {travelRegionId.replaceAll("-", " ")} →</Link>)}</div></article>
      </div>
    </Container>

    <section className="border-y border-border bg-muted/20 py-14"><Container>
      <div className="grid gap-10 lg:grid-cols-2"><div><p className="eyebrow text-primary">Adjacent regions</p><h2 className="mt-3 font-display text-4xl">Where the map transitions</h2><div className="mt-6 flex flex-wrap gap-3">{adjacent.map((neighbor) => <Link key={neighbor.id} to="/regions/$region" params={{ region: neighbor.id }} className="border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">{neighbor.name} →</Link>)}</div></div><div><p className="eyebrow text-primary">Comparison path</p><h2 className="mt-3 font-display text-4xl">Compare before you choose</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The canonical IDs on this page are the same IDs that power the upcoming permanent region-comparison matrix and separate relocation and travel scoring models. For now, use the adjacent-region links and statewide directory without creating duplicate comparison URLs.</p><Link to="/regions" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Back to all 7 regions →</Link></div></div>
    </Container></section>

    <Container className="py-14 sm:py-20"><p className="eyebrow text-primary">Statewide region navigation</p><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{CANONICAL_PRIMARY_REGIONS.map((item) => item.id === region.id ? <div key={item.id} className="border border-primary bg-primary/5 p-4 font-semibold">{item.name}</div> : <Link key={item.id} to="/regions/$region" params={{ region: item.id }} className="border border-border p-4 font-semibold hover:border-primary hover:text-primary">{item.name} →</Link>)}</div></Container>
  </>;
}
