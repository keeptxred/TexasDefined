import { lazy, Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCampingDetails } from "@/components/camping/DestinationCampingDetails";
import { AutoEntityLinks } from "@/components/content/AutoEntityLinks";
import { AnswerSummary } from "@/components/content/AnswerSummary";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationRelationships } from "@/components/editorial/DestinationRelationships";
import { DestinationVisitPlanner } from "@/components/editorial/DestinationVisitPlanner";
import { MapPreview } from "@/components/editorial/MapPreview";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { getCampingProfilesForDestination } from "@/data/camping/camping-profiles";
import { isPrimaryTripPlannerDestination } from "@/data/destination-availability";
import { auditDestination } from "@/data/destination-audit";
import { buildDestinationRelationshipGroups } from "@/data/destination-relationships";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { articlesQuery, categoriesQuery, destinationQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { isTopTexasAttraction } from "@/data/top-texas-attractions";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";
import { INTERNAL_LINK_POLICIES, policyForSurface } from "@/platform/internal-link-policies";

const DestinationViatorBooking = lazy(() =>
  import("@/components/editorial/DestinationViatorBooking").then((module) => ({
    default: module.DestinationViatorBooking,
  })),
);

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function hasValidCoordinates(lat: number, lng: number) {
  return Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && !(lat === 0 && lng === 0);
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

function destinationSeoTitle(name: string, categoryName: string) {
  const category = categoryName.toLowerCase();
  if (category.includes("state park") || category.includes("natural area")) return `${name} | Texas State Park Guide`;
  if (category.includes("lake") || category.includes("river")) return `${name} | Texas Lake & River Guide`;
  if (category.includes("historic")) return `${name} | Texas Historic Site Guide`;
  return `${name} | Texas Travel Guide`;
}

export const Route = createFileRoute("/destination/$slug")({
  loader: async ({ context, params }) => {
    let destination = await context.queryClient.ensureQueryData(destinationQuery(params.slug));
    if (!destination) throw notFound();
    if (isTopTexasAttraction(destination.slug)) {
      const { resolveTopAttractionAuthority } = await import("@/data/top-attraction-authority-resolver");
      destination = resolveTopAttractionAuthority(destination);
    }
    const [graph, categories, catalog, regions, relatedArticles, campingProfiles] = await Promise.all([
      loadTexasKnowledgeGraph(),
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ category: destination.category, limit: 3 })),
      getCampingProfilesForDestination(destination.slug),
    ]);
    const relationshipGroups = buildDestinationRelationshipGroups(destination, catalog);
    return { destination, graph, categories, regions, relatedArticles, relationshipGroups, campingProfiles };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { destination, categories, relationshipGroups, campingProfiles } = loaderData;
    const authorityGuide = destination.authorityGuide;
    const topAttractionCitations = authorityGuide?.sources.map((source) => source.url).filter(validExternalUrl) ?? [];
    const campingCitations = campingProfiles.flatMap((profile) => profile.sources.map((source) => source.url)).filter(validExternalUrl);
    const authorityCitations = [...new Set([...topAttractionCitations, ...campingCitations])];
    const dateModified = [destination.sourceCheckedAt, ...campingProfiles.map((profile) => profile.verifiedAt)]
      .filter((value): value is string => Boolean(value))
      .sort()
      .at(-1);
    const audit = auditDestination(destination);
    const indexable = audit.readyForIndexing && isPrimaryTripPlannerDestination(destination);
    const hasUsableHero = !audit.issues.some((issue) => issue.code === "hero-placeholder");
    const canonicalPath = `/destination/${params.slug}`;
    const url = `${siteUrl}${canonicalPath}`;
    const imageUrl = hasUsableHero ? absoluteUrl(texasDefinedBrand, destination.hero.src) : undefined;
    const categoryName = categories.find((category) => category.slug === destination.category)?.name ?? destination.category.replace(/-/g, " ");
    const validGeo = hasValidCoordinates(destination.coordinates.lat, destination.coordinates.lng);
    const relatedPlaces = [...new Map(relationshipGroups.flatMap((group) => group.destinations).map((item) => [item.slug, item])).values()];
    const webPageSchema = { "@type": "WebPage", "@id": url, url, name: destination.name, description: destination.summary, isPartOf: { "@id": `${siteUrl}/#website` }, ...(hasUsableHero ? { primaryImageOfPage: { "@id": `${url}#primaryimage` } } : {}), mainEntity: { "@id": `${url}#attraction` }, breadcrumb: { "@id": `${url}#breadcrumbs` }, ...(relatedPlaces.length > 0 ? { hasPart: { "@id": `${url}#related-places` } } : {}), ...(authorityCitations.length > 0 ? { citation: authorityCitations } : validExternalUrl(destination.officialUrl) ? { citation: destination.officialUrl } : {}), ...(authorityGuide ? { author: { "@type": "Organization", "@id": `${siteUrl}/authors/a-hollis#desk`, name: "Texas Defined Editorial Desk", url: `${siteUrl}/authors/a-hollis` }, isBasedOn: `${siteUrl}/explore/top-attractions/methodology` } : {}), ...(destination.sourceCheckedAt ? { dateModified: destination.sourceCheckedAt } : {}), ...(dateModified ? { dateModified } : {}) };
    const attractionSchema = { "@type": "TouristAttraction", "@id": `${url}#attraction`, url, mainEntityOfPage: { "@id": url }, name: destination.name, description: destination.summary, ...(hasUsableHero && imageUrl ? { image: [{ "@type": "ImageObject", "@id": `${url}#primaryimage`, url: imageUrl, caption: destination.hero.alt, width: destination.hero.width, height: destination.hero.height, ...(destination.hero.credit ? { creditText: destination.hero.credit } : {}) }] } : {}), ...(validGeo ? { geo: { "@type": "GeoCoordinates", latitude: destination.coordinates.lat, longitude: destination.coordinates.lng } } : {}), address: { "@type": "PostalAddress", addressRegion: "TX", addressLocality: destination.nearestTown, addressCountry: "US", ...(destination.address ? { streetAddress: destination.address } : {}) }, containedInPlace: { "@type": "State", name: "Texas" }, touristType: categoryName, ...(destination.managingAuthority ? { provider: { "@type": "Organization", name: destination.managingAuthority } } : {}), ...(validExternalUrl(destination.officialUrl) ? { sameAs: destination.officialUrl } : {}), ...(campingProfiles.length > 0 ? { subjectOf: { "@type": "CollectionPage", "@id": `${siteUrl}/best-places-to-go-camping-in-texas` } } : {}) };
    const relatedSchema = { "@type": "ItemList", "@id": `${url}#related-places`, name: `Places related to ${destination.name}`, numberOfItems: relatedPlaces.length, itemListElement: relatedPlaces.map((item, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "TouristAttraction", name: item.name, description: item.summary, url: `${siteUrl}/destination/${item.slug}`, image: absoluteUrl(texasDefinedBrand, item.hero.src) } })) };
    const breadcrumbSchema = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` }, { "@type": "ListItem", position: 3, name: categoryName, item: `${siteUrl}/explore/${destination.category}` }, { "@type": "ListItem", position: 4, name: destination.name, item: url }] };
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: destinationSeoTitle(destination.name, categoryName),
        description: destination.summary,
        canonicalPath,
        robots: indexable ? undefined : "noindex, follow",
        ...(hasUsableHero ? { image: destination.hero.src, imageAlt: destination.hero.alt } : {}),
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, attractionSchema, ...(relatedPlaces.length > 0 ? [relatedSchema] : []), breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Destination guide</p><h1 className="mt-3 font-display text-4xl">This place isn’t in our guide yet</h1><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Browse the places we have mapped in <Link to="/explore" className="border-b border-primary text-primary">Explore Texas</Link>.</p></Container>,
  component: DestinationPage,
});

function DestinationPage() {
  const { destination, graph, categories, regions, relatedArticles, relationshipGroups, campingProfiles } = Route.useLoaderData();
  const region = regions.find((item) => item.id === destination.region);
  const categoryName = categories.find((category) => category.slug === destination.category)?.name ?? destination.category.replace(/-/g, " ");
  const excludedEntityIds = [`${destination.category}:${destination.slug}`, `attraction:${destination.slug}`];
  const surfacePolicy = INTERNAL_LINK_POLICIES.destination;
  const destinationPolicy = policyForSurface("destination", { excludedEntityIds, region: destination.region });
  let remainingLinks = surfacePolicy.pageBudget;
  const limit = (requested: number) => Math.max(0, Math.min(requested, surfacePolicy.blockBudget, remainingLinks));
  const spend = (requested: number) => { const value = limit(requested); remainingLinks -= value; return value; };
  const verifiedLabel = checkedDate(destination.sourceCheckedAt);
  const countySlug = destination.county?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return <>
    <Container className="pt-10 sm:pt-14"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden>·</li><li><Link to="/explore/$category" params={{ category: destination.category }} className="hover:text-foreground">{categoryName}</Link></li></ol></nav></Container>

    <section className="relative isolate mt-5 overflow-hidden bg-ink text-ink-foreground">
      <img src={destination.hero.src} alt={destination.hero.alt} width={destination.hero.width} height={destination.hero.height} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover opacity-65" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/15" />
      <Container className="relative flex min-h-[64vh] flex-col justify-end pb-14 pt-40 sm:pb-16">
        <p className="eyebrow text-ink-foreground/80">{region?.name ?? "Texas"} · {categoryName}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{destination.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-foreground/88">{destination.summary}</p>
        {destination.hero.credit && <p className="mt-6 text-[0.7rem] uppercase tracking-[0.12em] text-ink-foreground/60">Photography: {destination.hero.credit}</p>}
      </Container>
    </section>

    <AnswerSummary
      eyebrow="Plan the visit"
      title={`${destination.name} at a glance`}
      items={[
        { question: `Where is ${destination.name}?`, answer: `${destination.name} is near ${destination.nearestTown}, Texas${destination.county ? `, in ${destination.county} County` : ""}.` },
        { question: `When is the best time to visit ${destination.name}?`, answer: destination.bestSeason },
        { question: `Do I need to plan ahead for ${destination.name}?`, answer: destination.entryNote },
        ...(destination.managingAuthority ? [{ question: `Who manages ${destination.name}?`, answer: destination.managingAuthority }] : []),
      ]}
    />

    <Container className="grid gap-14 py-16 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,.75fr)] lg:py-20">
      <div className="max-w-[44rem]">
        <section aria-labelledby="why-go" className="border-t border-border pt-8">
          <p className="eyebrow text-primary">The place</p>
          <h2 id="why-go" className="mt-3 font-display text-4xl leading-tight">Why {destination.name} belongs on the list</h2>
          <div className="editorial-body mt-7 text-foreground/90">{destination.body.map((paragraph) => <p key={paragraph} className="mt-6 first:mt-0"><AutoEntityLinks text={paragraph} entities={graph} maxLinks={spend(4)} policy={destinationPolicy} /></p>)}</div>
        </section>
        <section aria-labelledby="before-you-go" className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">The details</p>
          <h2 id="before-you-go" className="mt-3 font-display text-3xl">Plan the visit</h2>
          <dl className="mt-8 grid border-y border-border sm:grid-cols-2">
            <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Nearest town</dt><dd className="mt-2 text-base">Near <AutoEntityLinks text={destination.nearestTown} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} />, Texas</dd></div>
            <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Best season</dt><dd className="mt-2 text-base">{destination.bestSeason}</dd></div>
            {destination.county && <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">County</dt><dd className="mt-2 text-base">{countySlug ? <Link to="/$kind/$slug" params={{ kind: "county", slug: countySlug }} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{destination.county} County</Link> : `${destination.county} County`}</dd></div>}
            {destination.address && <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Address</dt><dd className="mt-2 text-base">{destination.address}</dd></div>}
            <div className="py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Entry & reservations</dt><dd className="mt-2 text-base leading-7">{destination.entryNote}</dd></div>
            {destination.accessibilityNotes && <div className="border-t border-border py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Accessibility</dt><dd className="mt-2 text-base leading-7">{destination.accessibilityNotes}</dd></div>}
            {destination.directions && <div className="border-t border-border py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Getting there</dt><dd className="mt-2 text-base leading-7">{destination.directions}</dd></div>}
          </dl>
          <div className="mt-7 flex flex-wrap gap-6">{validExternalUrl(destination.reservationUrl) && <a href={destination.reservationUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Reservations</a>}{validExternalUrl(destination.officialUrl) && <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official visitor information</a>}</div>
        </section>
        <DestinationCampingDetails destinationSlug={destination.slug} destinationName={destination.name} profiles={campingProfiles} />
        <Suspense fallback={null}><DestinationViatorBooking destination={destination} /></Suspense>
        <div className="mt-14"><DestinationVisitPlanner destination={destination} /></div>
      </div>

      <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
        <div className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">At a glance</p><dl className="mt-5 divide-y divide-border text-sm"><div className="pb-4"><dt className="text-muted-foreground">Nearest town</dt><dd className="mt-1 font-medium"><AutoEntityLinks text={destination.nearestTown} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} /></dd></div><div className="py-4"><dt className="text-muted-foreground">Best season</dt><dd className="mt-1 font-medium">{destination.bestSeason}</dd></div><div className="py-4"><dt className="text-muted-foreground">Before arrival</dt><dd className="mt-1 leading-6">{destination.entryNote}</dd></div>{destination.managingAuthority && <div className="pt-4"><dt className="text-muted-foreground">Managed by</dt><dd className="mt-1 font-medium">{destination.managingAuthority}</dd></div>}</dl></div>
        {(validExternalUrl(destination.officialUrl) || verifiedLabel) && <div className="border-t border-border pt-5 text-sm"><p className="eyebrow text-muted-foreground">Source notes</p>{verifiedLabel && <p className="mt-3 leading-6 text-muted-foreground">Visitor information checked {verifiedLabel}.</p>}{validExternalUrl(destination.officialUrl) && <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Official source</a>}</div>}
        <MapPreview markers={[{ id: destination.id, label: destination.name, point: destination.coordinates }]} directionsLabel={`${destination.name}, Texas`} />
      </aside>
    </Container>

    <DestinationRelationships destination={destination} groups={relationshipGroups} regionName={region?.name} />
    {relatedArticles.length > 0 && <Section><SectionHeader eyebrow="Read next" title={`More from ${categoryName}`} /><div className="mt-8 grid gap-6 lg:grid-cols-3">{relatedArticles.map((article) => <ArticleCard key={article.id} article={article} />)}</div></Section>}
  </>;
}
