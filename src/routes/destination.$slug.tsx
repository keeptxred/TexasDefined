import { lazy, Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { isPrimaryTripPlannerDestination } from "@/data/destination-availability";
import { auditDestination } from "@/data/destination-audit";
import { articlesQuery, categoriesQuery, destinationQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const DestinationPageContent = lazy(() =>
  import("@/components/editorial/DestinationPageContent").then((module) => ({
    default: module.DestinationPageContent,
  })),
);

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function hasValidCoordinates(lat: number, lng: number) {
  return Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && !(lat === 0 && lng === 0);
}

function validExternalUrl(value?: string) {
  return Boolean(value && /^https?:\/\//i.test(value));
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
    const [
      { getCampingProfilesForDestination },
      { buildDestinationRelationshipGroups },
      { loadTexasKnowledgeGraph },
      { isTopTexasAttraction },
    ] = await Promise.all([
      import("@/data/camping/camping-profiles"),
      import("@/data/destination-relationships"),
      import("@/data/knowledge-graph"),
      import("@/data/top-texas-attractions"),
    ]);
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
  return <Suspense fallback={null}><DestinationPageContent /></Suspense>;
}
