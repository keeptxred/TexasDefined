import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { AutoEntityLinks } from "@/components/content/AutoEntityLinks";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationRelationships } from "@/components/editorial/DestinationRelationships";
import { MapPreview } from "@/components/editorial/MapPreview";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { buildDestinationRelationshipGroups } from "@/data/destination-relationships";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { articlesQuery, categoriesQuery, destinationQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";
import { INTERNAL_LINK_POLICIES, policyForSurface } from "@/platform/internal-link-policies";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function hasValidCoordinates(lat: number, lng: number) {
  return Number.isFinite(lat)
    && Number.isFinite(lng)
    && lat >= -90
    && lat <= 90
    && lng >= -180
    && lng <= 180
    && !(lat === 0 && lng === 0);
}

function validExternalUrl(value?: string) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

function checkedDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export const Route = createFileRoute("/destination/$slug")({
  loader: async ({ context, params }) => {
    const destination = await context.queryClient.ensureQueryData(destinationQuery(params.slug));
    if (!destination) throw notFound();

    const [graph, categories, catalog, regions, relatedArticles] = await Promise.all([
      loadTexasKnowledgeGraph(),
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ category: destination.category, limit: 3 })),
    ]);

    const relationshipGroups = buildDestinationRelationshipGroups(destination, catalog);
    return { destination, graph, categories, regions, relatedArticles, relationshipGroups };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { destination, categories, relationshipGroups } = loaderData;
    const canonicalPath = `/destination/${params.slug}`;
    const url = `${siteUrl}${canonicalPath}`;
    const imageUrl = absoluteUrl(texasDefinedBrand, destination.hero.src);
    const categoryName = categories.find((category) => category.slug === destination.category)?.name
      ?? destination.category.replace(/-/g, " ");
    const validGeo = hasValidCoordinates(destination.coordinates.lat, destination.coordinates.lng);
    const relatedPlaces = [...new Map(
      relationshipGroups.flatMap((group) => group.destinations).map((item) => [item.slug, item]),
    ).values()];

    const webPageSchema = {
      "@type": "WebPage",
      "@id": url,
      url,
      name: destination.name,
      description: destination.summary,
      isPartOf: { "@id": `${siteUrl}/#website` },
      primaryImageOfPage: { "@id": `${url}#primaryimage` },
      mainEntity: { "@id": `${url}#attraction` },
      ...(relatedPlaces.length > 0 ? { hasPart: { "@id": `${url}#related-places` } } : {}),
      ...(validExternalUrl(destination.officialUrl) ? { citation: destination.officialUrl } : {}),
      ...(destination.sourceCheckedAt ? { dateModified: destination.sourceCheckedAt } : {}),
    };
    const attractionSchema = {
      "@type": "TouristAttraction",
      "@id": `${url}#attraction`,
      url,
      mainEntityOfPage: { "@id": url },
      name: destination.name,
      description: destination.summary,
      image: [{
        "@type": "ImageObject",
        "@id": `${url}#primaryimage`,
        url: imageUrl,
        caption: destination.hero.alt,
        width: destination.hero.width,
        height: destination.hero.height,
        ...(destination.hero.credit ? { creditText: destination.hero.credit } : {}),
      }],
      ...(validGeo ? { geo: { "@type": "GeoCoordinates", latitude: destination.coordinates.lat, longitude: destination.coordinates.lng } } : {}),
      address: {
        "@type": "PostalAddress",
        addressRegion: "TX",
        addressLocality: destination.nearestTown,
        addressCountry: "US",
        ...(destination.address ? { streetAddress: destination.address } : {}),
      },
      containedInPlace: { "@type": "State", name: "Texas" },
      touristType: categoryName,
      ...(destination.managingAuthority ? { provider: { "@type": "Organization", name: destination.managingAuthority } } : {}),
      ...(validExternalUrl(destination.officialUrl) ? { sameAs: destination.officialUrl } : {}),
    };
    const relatedSchema = {
      "@type": "ItemList",
      "@id": `${url}#related-places`,
      name: `Places related to ${destination.name}`,
      numberOfItems: relatedPlaces.length,
      itemListElement: relatedPlaces.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristAttraction",
          name: item.name,
          description: item.summary,
          url: `${siteUrl}/destination/${item.slug}`,
          image: absoluteUrl(texasDefinedBrand, item.hero.src),
        },
      })),
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
        { "@type": "ListItem", position: 3, name: categoryName, item: `${siteUrl}/explore/${destination.category}` },
        { "@type": "ListItem", position: 4, name: destination.name, item: url },
      ],
    };

    return {
      meta: buildMeta(texasDefinedBrand, {
        title: destination.name,
        description: destination.summary,
        canonicalPath,
        image: destination.hero.src,
        imageAlt: destination.hero.alt,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, attractionSchema, ...(related.length > 0 ? [relatedSchema] : []), breadcrumbSchema] }),
      }],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24">
      <p className="eyebrow text-primary">Another road</p>
      <h1 className="mt-3 font-display text-3xl">We haven’t mapped that place yet</h1>
      <p className="mt-3 text-sm text-muted-foreground">Try another destination or head back to <Link to="/explore" className="text-primary underline">Explore</Link>.</p>
    </Container>
  ),
  component: DestinationPage,
});

function DestinationPage() {
  const { destination, graph, categories, regions, relatedArticles, relationshipGroups } = Route.useLoaderData();
  const region = regions.find((item) => item.id === destination.region);
  const categoryName = categories.find((category) => category.slug === destination.category)?.name
    ?? destination.category.replace(/-/g, " ");
  const excludedEntityIds = [`${destination.category}:${destination.slug}`, `attraction:${destination.slug}`];
  const surfacePolicy = INTERNAL_LINK_POLICIES.destination;
  const destinationPolicy = policyForSurface("destination", { excludedEntityIds, region: destination.region });
  let remainingLinks = surfacePolicy.pageBudget;
  const limit = (requested: number) => Math.max(0, Math.min(requested, surfacePolicy.blockBudget, remainingLinks));
  const spend = (requested: number) => {
    const value = limit(requested);
    remainingLinks -= value;
    return value;
  };
  const verifiedLabel = checkedDate(destination.sourceCheckedAt);

  return (
    <>
      <Container className="pt-24">
        <nav aria-label="You are here" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden="true">/</li>
            <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden="true">/</li>
            <li><Link to="/explore/$category" params={{ category: destination.category }} className="hover:text-foreground">{categoryName}</Link></li><li aria-hidden="true">/</li>
            <li aria-current="page" className="truncate text-foreground">{destination.name}</li>
          </ol>
        </nav>
      </Container>

      <section className="relative isolate mt-4 overflow-hidden bg-ink text-ink-foreground">
        <img src={destination.hero.src} alt={destination.hero.alt} width={destination.hero.width} height={destination.hero.height} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/20" />
        <Container className="relative flex min-h-[58vh] flex-col justify-end pb-14 pt-32">
          <p className="eyebrow text-ink-foreground/80">{region?.name ?? "Texas"}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">{destination.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-foreground/85">{destination.summary}</p>
          {destination.hero.credit && <p className="mt-5 text-xs text-ink-foreground/65">Photo: {destination.hero.credit}</p>}
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="editorial-body max-w-2xl">
          <section aria-labelledby="why-go">
            <p className="eyebrow text-primary">Why it’s worth the drive</p>
            <h2 id="why-go" className="mt-2 font-display text-2xl">What makes {destination.name} special</h2>
            {destination.body.map((paragraph) => (
              <p key={paragraph} className="mt-5"><AutoEntityLinks text={paragraph} entities={graph} maxLinks={spend(4)} policy={destinationPolicy} /></p>
            ))}
          </section>
          <section aria-labelledby="before-you-go" className="mt-10">
            <p className="eyebrow text-primary">Before you go</p>
            <h2 id="before-you-go" className="mt-2 font-display text-2xl">A few things worth knowing</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><dt className="eyebrow text-muted-foreground">Closest town</dt><dd className="mt-1">Near <AutoEntityLinks text={destination.nearestTown} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} />, Texas.</dd></div>
              <div><dt className="eyebrow text-muted-foreground">Best time to go</dt><dd className="mt-1">{destination.bestSeason}</dd></div>
              {destination.county && <div><dt className="eyebrow text-muted-foreground">County</dt><dd className="mt-1">{destination.county} County</dd></div>}
              {destination.address && <div><dt className="eyebrow text-muted-foreground">Address</dt><dd className="mt-1">{destination.address}</dd></div>}
              <div className="sm:col-span-2"><dt className="eyebrow text-muted-foreground">Tickets, entry and reservations</dt><dd className="mt-1">{destination.entryNote}</dd></div>
              {destination.accessibilityNotes && <div className="sm:col-span-2"><dt className="eyebrow text-muted-foreground">Accessibility</dt><dd className="mt-1">{destination.accessibilityNotes}</dd></div>}
              {destination.directions && <div className="sm:col-span-2"><dt className="eyebrow text-muted-foreground">Directions</dt><dd className="mt-1">{destination.directions}</dd></div>}
            </dl>
            <div className="mt-5 flex flex-wrap gap-5">
              {validExternalUrl(destination.reservationUrl) && <a href={destination.reservationUrl} target="_blank" rel="noreferrer noopener" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Check reservations</a>}
              {validExternalUrl(destination.officialUrl) && <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow inline-block border-b border-primary pb-1 text-primary">Official visitor information</a>}
            </div>
          </section>
          {destination.highlights.length > 0 && (
            <section aria-labelledby="destination-highlights" className="mt-10">
              <h2 id="destination-highlights" className="font-display text-2xl">Things to do and know</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                {destination.highlights.map((highlight) => <li key={highlight}><AutoEntityLinks text={highlight} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} /></li>)}
              </ul>
            </section>
          )}
        </div>
        <aside className="space-y-6">
          <dl className="border border-border p-6 text-sm">
            <dt className="eyebrow text-muted-foreground">Closest town</dt><dd className="mt-1"><AutoEntityLinks text={destination.nearestTown} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} /></dd>
            <dt className="eyebrow mt-4 text-muted-foreground">Best season</dt><dd className="mt-1">{destination.bestSeason}</dd>
            <dt className="eyebrow mt-4 text-muted-foreground">What to know before arrival</dt><dd className="mt-1">{destination.entryNote}</dd>
            {destination.managingAuthority && <><dt className="eyebrow mt-4 text-muted-foreground">Managed by</dt><dd className="mt-1">{destination.managingAuthority}</dd></>}
          </dl>
          {(validExternalUrl(destination.officialUrl) || verifiedLabel) && (
            <div className="border border-border bg-secondary/40 p-6 text-sm">
              <p className="eyebrow text-muted-foreground">Official information</p>
              {verifiedLabel && <p className="mt-2 text-muted-foreground">Source checked {verifiedLabel}.</p>}
              {validExternalUrl(destination.officialUrl) && <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Visit official source</a>}
            </div>
          )}
          <MapPreview markers={[{ id: destination.id, label: destination.name, point: destination.coordinates }]} directionsLabel={`${destination.name}, Texas`} />
        </aside>
      </Container>

      <DestinationRelationships destination={destination} groups={relationshipGroups} regionName={region?.name} />

      {relatedArticles.length > 0 && (
        <Section>
          <Container>
            <SectionHeader eyebrow="Keep reading" title="More from this corner of Texas" />
            <ul className="mt-10 grid gap-10 sm:grid-cols-3">
              {relatedArticles.map((article) => <li key={article.id}><ArticleCard article={article} size="compact" /></li>)}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}
