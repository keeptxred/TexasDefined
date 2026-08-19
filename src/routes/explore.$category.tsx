import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { TopAttractionCollectionLinks } from "@/components/editorial/TopAttractionCollectionLinks";
import { ExploreDestinationComparison, type ExploreComparisonKind } from "@/components/explore/ExploreDestinationComparison";
import { Container } from "@/components/layout/Container";
import { articlesQuery, categoriesQuery, destinationQuery, destinationsQuery } from "@/data/queries";
import type { CategorySlug, Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const COMPARISON_CATEGORIES = new Set<ExploreComparisonKind>(['state-parks', 'lakes-rivers', 'small-towns', 'road-trips']);
const PAINTED_CHURCH_CROSS_LINK_CATEGORIES = new Set(['historic-sites', 'road-trips', 'small-towns']);

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
    provider: destination.managingAuthority
      ? { "@type": "Organization", name: destination.managingAuthority }
      : undefined,
    containedInPlace: destination.county
      ? { "@type": "AdministrativeArea", name: `${destination.county} County` }
      : destination.nearestTown
        ? { "@type": "City", name: destination.nearestTown }
        : undefined,
    geo: validCoordinates(destination)
      ? {
          "@type": "GeoCoordinates",
          latitude: destination.coordinates.lat,
          longitude: destination.coordinates.lng,
        }
      : undefined,
  };
}

export const Route = createFileRoute("/explore/$category")({
  loader: async ({ context, params }) => {
    const categories = await context.queryClient.ensureQueryData(categoriesQuery());
    const category = categories.find((item) => item.slug === params.category);
    if (!category) {
      const destination = await context.queryClient.ensureQueryData(destinationQuery(params.category));
      if (destination) {
        throw redirect({ href: `/destination/${destination.slug}`, statusCode: 301 });
      }
      throw notFound();
    }
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: category.slug })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: category.slug })),
    ]);
    return { category, articles, destinations };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const canonicalPath = `/explore/${params.category}`;
    const categoryUrl = `${siteUrl}${canonicalPath}`;
    const featuredCollectionItems = params.category === "food-bbq"
      ? [{
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CollectionPage",
            name: "Texas Food History",
            description: "The history behind barbecue, chili, chicken-fried steak, breakfast tacos, Czech and German foodways and Dr Pepper.",
            url: `${siteUrl}/texas-food-history`,
          },
        }]
      : [];
    const itemListElement = [
      ...featuredCollectionItems,
      ...loaderData.articles.map((article, index) => ({
        "@type": "ListItem",
        position: featuredCollectionItems.length + index + 1,
        item: {
          "@type": "Article",
          name: article.title,
          url: `${siteUrl}/article/${article.slug}`,
          image: absoluteUrl(texasDefinedBrand, article.hero.src),
        },
      })),
      ...loaderData.destinations.map((destination, index) => ({
        "@type": "ListItem",
        position: featuredCollectionItems.length + loaderData.articles.length + index + 1,
        item: destinationSchema(destination),
      })),
    ];
    const collectionSchema = {
      "@type": "CollectionPage",
      "@id": `${categoryUrl}#collection`,
      url: categoryUrl,
      name: loaderData.category.name,
      description: loaderData.category.description,
      image: loaderData.category.image
        ? {
            "@type": "ImageObject",
            url: absoluteUrl(texasDefinedBrand, loaderData.category.image.src),
            caption: loaderData.category.image.alt,
            width: loaderData.category.image.width,
            height: loaderData.category.image.height,
          }
        : undefined,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: {
        "@type": "ItemList",
        "@id": `${categoryUrl}#items`,
        numberOfItems: itemListElement.length,
        itemListElement,
      },
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${categoryUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
        { "@type": "ListItem", position: 3, name: loaderData.category.name, item: categoryUrl },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: loaderData.category.name,
        description: loaderData.category.description,
        image: loaderData.category.image?.src,
        imageAlt: loaderData.category.image?.alt,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [collectionSchema, breadcrumbSchema],
          }),
        },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: ExploreCategoryPage,
});

function CategoryNotFound() {
  return (
    <Container className="py-24">
      <p className="eyebrow text-primary">A different road</p>
      <h1 className="mt-3 font-display text-3xl">We haven't made that list yet</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        The page may have moved, but there are still plenty of places worth the drive.
      </p>
      <Link
        to="/explore"
        className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary"
      >
        Find another road →
      </Link>
    </Container>
  );
}

function ExploreCategoryPage() {
  const { category } = Route.useParams();
  const { destinations } = Route.useLoaderData();
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const match = categories.find((item) => item.slug === category);
  if (!match) return <CategoryNotFound />;
  const comparisonKind = COMPARISON_CATEGORIES.has(match.slug as ExploreComparisonKind)
    ? match.slug as ExploreComparisonKind
    : null;
  const showPaintedChurches = PAINTED_CHURCH_CROSS_LINK_CATEGORIES.has(match.slug);
  const showFoodHistory = match.slug === "food-bbq";

  return (
    <>
      <CategoryPage
        category={match.slug as CategorySlug}
        eyebrow={match.eyebrow}
        title={match.name}
        intro={match.description}
        image={match.image}
      />
      {showFoodHistory ? (
        <Container className="pb-10 sm:pb-14">
          <section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div>
              <p className="eyebrow text-primary">The stories behind the Texas table</p>
              <h2 className="mt-2 font-display text-3xl">Texas Food History</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                Go beyond restaurant lists with the history behind barbecue, San Antonio chili, chicken-fried steak, breakfast tacos, German and Czech foodways and Dr Pepper's Waco origin.
              </p>
            </div>
            <Link to="/texas-food-history" className="eyebrow inline-block border-b border-primary pb-1 text-primary">
              Explore Texas food history →
            </Link>
          </section>
        </Container>
      ) : null}
      {showPaintedChurches ? (
        <Container className="pb-10 sm:pb-14">
          <section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div>
              <p className="eyebrow text-primary">Texas heritage route</p>
              <h2 className="mt-2 font-display text-3xl">Painted Churches of Texas</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                Explore 18 historic church guides with church-by-church history, architecture, interior paintings, preservation context, visitor guidance and a Schulenburg driving route.
              </p>
            </div>
            <Link to="/explore/painted-churches" className="eyebrow inline-block border-b border-primary pb-1 text-primary">
              Explore the painted churches →
            </Link>
          </section>
        </Container>
      ) : null}
      <TopAttractionCollectionLinks destinations={destinations} contextLabel={match.name} />
      {comparisonKind ? <ExploreDestinationComparison destinations={destinations} kind={comparisonKind} /> : null}
    </>
  );
}