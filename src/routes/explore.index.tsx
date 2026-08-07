import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, categoriesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Category, Destination, Region } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const EXPLORE_CATEGORIES = ["lakes-rivers", "major-springs", "state-parks", "national-parks", "caverns", "beaches-coast", "historic-sites", "road-trips", "small-towns", "food-bbq", "outdoors"] as const;
const description = "Cold rivers, canyon trails, two-lane roads, small-town main streets and barbecue worth waiting for — a curated guide to exploring Texas well.";
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
      ...regions.map((region) => ({ "@type": "WebPage" as const, name: `${region.name} Guide`, description: region.blurb, url: `${siteUrl}/explore/region/${region.id}` })),
      ...destinations.map(destinationSchema),
      ...articles.map((article) => ({ "@type": "Article" as const, name: article.title, description: article.dek, url: `${siteUrl}/article/${article.slug}`, image: absoluteUrl(texasDefinedBrand, article.hero.src) })),
    ];
    const itemListElement = items.map((item, index) => ({ "@type": "ListItem", position: index + 1, item }));
    return { meta: buildMeta(texasDefinedBrand, { canonicalPath: "/explore", title: "Explore Texas", description }), links: [canonicalLink(texasDefinedBrand, "/explore")], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Explore Texas", description, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${pageUrl}#items` }, breadcrumb: { "@id": `${pageUrl}#breadcrumbs` } }, { "@type": "ItemList", "@id": `${pageUrl}#items`, name: "Places, regions and stories worth knowing", numberOfItems: itemListElement.length, itemListElement }, { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Explore", item: pageUrl }] }] }) }] };
  },
  loader: async ({ context }): Promise<{ categories: Category[]; regions: Region[]; destinations: Destination[]; articles: Article[] }> => {
    const [categories, regions, destinations, articles] = await Promise.all([context.queryClient.ensureQueryData(categoriesQuery()), context.queryClient.ensureQueryData(regionsQuery()), context.queryClient.ensureQueryData(destinationsQuery({ featured: true })), context.queryClient.ensureQueryData(articlesQuery({ limit: 6 }))]);
    return { categories, regions, destinations, articles };
  },
  component: ExplorePage,
});

function ExplorePage() {
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const { data: destinations } = useSuspenseQuery(destinationsQuery({ featured: true }));
  const { data: articles } = useSuspenseQuery(articlesQuery({ limit: 6 }));
  const exploreCategories = categories.filter((category) => (EXPLORE_CATEGORIES as readonly string[]).includes(category.slug));

  return <>
    <Container className="pb-10 pt-16 sm:pt-24">
      <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.1em] text-muted-foreground"><ol className="flex items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-foreground">Explore</li></ol></nav>
      <div className="mt-10 max-w-4xl border-t border-border pt-8">
        <p className="eyebrow text-primary">The Texas guide</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.025em] sm:text-7xl">Explore Texas, one good road at a time</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
    </Container>

    <Section>
      <Container>
        <SectionHeader eyebrow="Choose your Texas" title="Where do you want to go next?" description="Rivers, parks, caverns, beaches, historic places, small towns and road trips — organized for browsing, not endless scrolling." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{exploreCategories.map((category) => <li key={category.slug}><Link to="/explore/$category" params={{ category: category.slug }} className="group relative block overflow-hidden bg-surface">{category.image ? <img src={category.image.src} alt={category.image.alt} width={category.image.width} height={category.image.height} loading="lazy" decoding="async" className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" /> : <div className="aspect-[5/4] w-full bg-gradient-to-br from-primary/25 via-surface to-accent/25" aria-hidden="true" />}<div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground"><p className="eyebrow opacity-75">{category.eyebrow}</p><h2 className="mt-2 font-display text-[2rem] leading-none">{category.name}</h2><p className="mt-3 text-sm leading-6 text-ink-foreground/82">{category.description}</p></div></Link></li>)}</ul>
      </Container>
    </Section>

    <Section tone="surface"><Container><SectionHeader eyebrow="Texas by region" title="Seven distinct sides of the state" description="From Gulf Coast marshes to High Plains horizons, each region has its own rhythm, landscape and reasons to linger." /><ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{regions.map((region) => <li key={region.id} className="border-t border-border pt-5"><Link to="/explore/region/$region" params={{ region: region.id }} className="group block"><h3 className="font-display text-[1.7rem] leading-tight transition-colors group-hover:text-primary">{region.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{region.blurb}</p><span className="eyebrow mt-4 inline-block text-primary">Explore the region →</span></Link></li>)}</ul></Container></Section>

    {destinations.length > 0 && <Section><Container><SectionHeader eyebrow="Featured places" title="Destinations worth making time for" description="A rotating selection of places that show Texas at its most memorable." /><ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{destinations.map((destination) => <li key={destination.id}><DestinationCard destination={destination} regionLabel={regions.find((r) => r.id === destination.region)?.name} /></li>)}</ul></Container></Section>}

    <Section tone="surface"><Container><SectionHeader eyebrow="Field notes" title="Stories from across Texas" description="Read before you go, or save one for the road." /><ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <li key={article.id}><ArticleCard article={article} size="compact" /></li>)}</ul></Container></Section>
  </>;
}
