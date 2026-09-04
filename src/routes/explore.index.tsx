import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { articlesQuery, categoriesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Category, Destination, Region } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

export const EXPLORE_CATEGORIES = ["lakes-rivers", "major-springs", "swimming-holes-river-tubing", "state-parks", "national-parks", "caverns", "beaches-coast", "historic-sites", "road-trips", "small-towns", "food-bbq", "outdoors"] as const;
export const description = "Cold rivers, canyon trails, two-lane roads, small-town main streets and barbecue worth waiting for — a curated guide to exploring Texas well.";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/explore`;

function validCoordinates(destination: Destination) { const { lat, lng } = destination.coordinates; return Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0); }
function destinationSchema(destination: Destination) { return { "@type": "TouristAttraction", "@id": `${siteUrl}/destination/${destination.slug}#attraction`, name: destination.name, description: destination.summary, url: `${siteUrl}/destination/${destination.slug}`, image: absoluteUrl(texasDefinedBrand, destination.hero.src), sameAs: destination.officialUrl, dateModified: destination.sourceCheckedAt, provider: destination.managingAuthority ? { "@type": "Organization", name: destination.managingAuthority } : undefined, containedInPlace: destination.county || destination.nearestTown ? { "@type": destination.county ? "AdministrativeArea" : "City", name: destination.county ?? destination.nearestTown } : undefined, geo: validCoordinates(destination) ? { "@type": "GeoCoordinates", latitude: destination.coordinates.lat, longitude: destination.coordinates.lng } : undefined }; }

export const Route = createFileRoute("/explore/")({
  head: ({ loaderData }: { loaderData?: { categories: Category[]; regions: Region[]; destinations: Destination[]; articles: Article[] } }) => {
    const categories = (loaderData?.categories ?? []).filter((category) => (EXPLORE_CATEGORIES as readonly string[]).includes(category.slug));
    const regions = loaderData?.regions ?? [];
    const destinations = loaderData?.destinations ?? [];
    const articles = loaderData?.articles ?? [];
    const items = [
      ...categories.map((category) => ({ "@type": "WebPage" as const, name: category.name, description: category.description, url: `${siteUrl}/explore/${category.slug}`, image: category.image?.src ? absoluteUrl(texasDefinedBrand, category.image.src) : undefined })),
      { "@type": "CollectionPage" as const, name: "Texas Aquariums & Marine Life", description: "Texas aquarium, marine-life, coastal-science and aquatic zoo-exhibit guides with county context and current official visitor sources.", url: `${siteUrl}/explore/aquariums` },
      { "@type": "CollectionPage" as const, name: "Painted Churches of Texas", description: "Source-checked statewide reference collection with church guides, map, routes, history, artists, techniques and archival comparisons.", url: `${siteUrl}/explore/painted-churches` },
      ...regions.map((region) => ({ "@type": "WebPage" as const, name: `${region.name} Guide`, description: region.blurb, url: `${siteUrl}/explore/region/${region.id}` })),
      ...destinations.map(destinationSchema),
      ...articles.map((article) => ({ "@type": "Article" as const, name: article.title, description: article.dek, url: `${siteUrl}/article/${article.slug}`, image: absoluteUrl(texasDefinedBrand, article.hero.src) })),
    ];
    const itemListElement = items.map((item, index) => ({ "@type": "ListItem", position: index + 1, item }));
    return { meta: buildMeta(texasDefinedBrand, { canonicalPath: "/explore", title: "Explore Texas", description }), links: [canonicalLink(texasDefinedBrand, "/explore")], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Explore Texas", description, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${pageUrl}#items` }, breadcrumb: { "@id": `${pageUrl}#breadcrumbs` } }, { "@type": "ItemList", "@id": `${pageUrl}#items`, name: "Places, regions and stories worth knowing", numberOfItems: itemListElement.length, itemListElement }, { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Explore", item: pageUrl }] }] }) }] };
  },
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[]; categories: Category[]; regions: Region[] }> => {
    const [categories, regions, destinations, articles] = await Promise.all([context.queryClient.ensureQueryData(categoriesQuery()), context.queryClient.ensureQueryData(regionsQuery()), context.queryClient.ensureQueryData(destinationsQuery({ featured: true })), context.queryClient.ensureQueryData(articlesQuery({ limit: 6 }))]);
    return { categories, regions, destinations, articles };
  },
});
