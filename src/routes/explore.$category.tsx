import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { isExploreCategoryIndexReady } from "@/data/explore-category-indexability";
import { foodDestinationCardsQuery } from "@/data/food-destination-cards-query";
import { articlesQuery, categoriesQuery, destinationQuery, destinationsQuery } from "@/data/queries";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const legacyExploreRedirects: Record<string, string> = {
  "scenic-rivers": "/article/texas-rivers-explained",
  "texas-dark-sky-stargazing": "/texas-stargazing-guide",
};
const authorityCategorySlugs = new Set(["outdoors", "caverns", "lakes-rivers", "beaches-coast", "small-towns"]);
const categorySeoOverrides: Partial<Record<string, { title: string; description: string }>> = {
  outdoors: {
    title: "Texas Outdoors & Wildlife: Parks, Trails, Birding & Wild Places",
    description: "Explore Texas outdoors by region, from state parks and hiking trails to wildlife, birding, dark skies, rivers and public lands, with seasonal access and safety guidance.",
  },
  "lakes-rivers": {
    title: "Texas Lakes & Rivers: Swimming, Paddling, Fishing & Water Trips",
    description: "Explore Texas lakes and rivers for swimming, paddling, fishing and camping, with river flows, reservoir conditions, public access, water quality and safety planning.",
  },
  "beaches-coast": {
    title: "Texas Beaches & Gulf Coast: Islands, Wildlife, Fishing & Beach Trips",
    description: "Explore the Texas Gulf Coast by beaches, barrier islands, bays and marshes, with public access, water quality, rip-current safety, birding, fishing and trip-planning guidance.",
  },
  "small-towns": {
    title: "Texas Small Towns: Downtown Squares, Local Shopping & Road Trips",
    description: "Explore Texas small towns through courthouse squares, Main Street districts, local shopping, antiques, markets, food, festivals and practical road-trip planning.",
  },
};

function validCoordinates(destination: Destination) {
  const { lat, lng } = destination.coordinates;
  return Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && !(lat === 0 && lng === 0);
}

function destinationSchema(destination: Destination) {
  return {
    "@type": "TouristAttraction",
    name: destination.name,
    description: destination.summary,
    url: `${siteUrl}/destination/${destination.slug}`,
    image: absoluteUrl(texasDefinedBrand, destination.hero.src),
    sameAs: destination.officialUrl || undefined,
    dateModified: destination.sourceCheckedAt || undefined,
    provider: destination.managingAuthority ? { "@type": "Organization", name: destination.managingAuthority } : undefined,
    containedInPlace: destination.county ? { "@type": "AdministrativeArea", name: `${destination.county} County` } : destination.nearestTown ? { "@type": "City", name: destination.nearestTown } : undefined,
    geo: validCoordinates(destination) ? { "@type": "GeoCoordinates", latitude: destination.coordinates.lat, longitude: destination.coordinates.lng } : undefined,
  };
}

export const Route = createFileRoute("/explore/$category")({
  beforeLoad: ({ params, location }) => {
    const target = legacyExploreRedirects[params.category];
    if (target) {
      throw redirect({ href: `${target}${location.searchStr || ""}`, statusCode: 301 });
    }
  },
  loader: async ({ context, params }) => {
    const categories = await context.queryClient.ensureQueryData(categoriesQuery());
    const category = categories.find((item) => item.slug === params.category);
    if (!category) {
      const destination = await context.queryClient.ensureQueryData(destinationQuery(params.category));
      if (destination) throw redirect({ href: `/destination/${destination.slug}`, statusCode: 301 });
      throw notFound();
    }
    const authorityPath = authorityCategorySlugs.has(category.slug) ? `/content/explore-category-authority/${category.slug}.html` : null;
    const [articles, destinations, authorityHtml] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: category.slug })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: category.slug })),
      authorityPath ? fetch(import.meta.env.SSR ? `${siteUrl}${authorityPath}` : authorityPath).then((response) => response.ok ? response.text() : null) : null,
    ]);
    if (category.slug === "food-bbq") {
      await context.queryClient.ensureQueryData(foodDestinationCardsQuery());
    }
    return { category, articles, destinations, authorityHtml };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = `/explore/${params.category}`;
    const categoryUrl = `${siteUrl}${canonicalPath}`;
    const hasWildlifeGuide = loaderData.articles.some((article) => article.slug === "texas-wildlife-guide");
    const featuredCollectionItems = params.category === "food-bbq"
      ? [{ "@type": "ListItem", position: 1, item: { "@type": "CollectionPage", name: "Texas Food History", description: "The history behind barbecue, chili, chicken-fried steak, breakfast tacos, Czech and German foodways and Dr Pepper.", url: `${siteUrl}/texas-food-history` } }]
      : params.category === "outdoors" && !hasWildlifeGuide
        ? [{ "@type": "ListItem", position: 1, item: { "@type": "Article", name: "Texas Wildlife Guide: Animals & Habitats", description: "A statewide guide to Texas wildlife and the habitats that shape where animals live, from East Texas forests and Gulf wetlands to Hill Country rivers, prairie and desert country.", url: `${siteUrl}/article/texas-wildlife-guide` } }]
        : [];
    const indexReady = isExploreCategoryIndexReady(
      loaderData.category.slug,
      loaderData.articles.length + loaderData.destinations.length + featuredCollectionItems.length,
    );
    const categorySeo = categorySeoOverrides[loaderData.category.slug];
    const metaTitle = categorySeo?.title ?? loaderData.category.name;
    const metaDescription = categorySeo?.description ?? loaderData.category.description;
    const itemListElement = [
      ...featuredCollectionItems,
      ...loaderData.articles.map((article, index) => ({ "@type": "ListItem", position: featuredCollectionItems.length + index + 1, item: { "@type": "Article", name: article.title, url: `${siteUrl}/article/${article.slug}`, image: absoluteUrl(texasDefinedBrand, article.hero.src) } })),
      ...loaderData.destinations.map((destination, index) => ({ "@type": "ListItem", position: featuredCollectionItems.length + loaderData.articles.length + index + 1, item: destinationSchema(destination) })),
    ];
    const collectionSchema = {
      "@type": "CollectionPage", "@id": `${categoryUrl}#collection`, url: categoryUrl, name: metaTitle, description: metaDescription,
      image: loaderData.category.image ? { "@type": "ImageObject", url: absoluteUrl(texasDefinedBrand, loaderData.category.image.src), caption: loaderData.category.image.alt, width: loaderData.category.image.width, height: loaderData.category.image.height } : undefined,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@type": "ItemList", "@id": `${categoryUrl}#items`, numberOfItems: itemListElement.length, itemListElement },
    };
    const breadcrumbSchema = { "@type": "BreadcrumbList", "@id": `${categoryUrl}#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
      { "@type": "ListItem", position: 3, name: loaderData.category.name, item: categoryUrl },
    ] };
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: metaTitle, description: metaDescription, image: loaderData.category.image?.src, imageAlt: loaderData.category.image?.alt, robots: indexReady ? undefined : "noindex, follow, max-image-preview:large" }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [collectionSchema, breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: CategoryNotFound,
});

function CategoryNotFound() {
  return <Container className="py-24">
    <p className="eyebrow text-primary">A different road</p>
    <h1 className="mt-3 font-display text-3xl">We haven't made that list yet</h1>
    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">The page may have moved, but there are still plenty of places worth the drive.</p>
    <Link to="/explore" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Find another road →</Link>
  </Container>;
}
