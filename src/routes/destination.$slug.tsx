import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { AutoEntityLinks } from "@/components/content/AutoEntityLinks";
import { MapPreview } from "@/components/editorial/MapPreview";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { articlesQuery, destinationQuery, regionsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";
import { INTERNAL_LINK_POLICIES, policyForSurface } from '@/platform/internal-link-policies';

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/destination/$slug")({
  loader: async ({ context, params }) => {
    const destination = await context.queryClient.ensureQueryData(destinationQuery(params.slug));
    if (!destination) throw notFound();
    const [graph] = await Promise.all([
      loadTexasKnowledgeGraph(),
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ category: destination.category, limit: 3 })),
    ]);
    return { destination, graph };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { destination } = loaderData;
    const canonicalPath = `/destination/${params.slug}`;
    const url = `${siteUrl}${canonicalPath}`;
    const attractionSchema = {
      "@type": "TouristAttraction",
      "@id": `${url}#attraction`,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      name: destination.name,
      description: destination.summary,
      image: [{ "@type": "ImageObject", url: absoluteUrl(texasDefinedBrand, destination.hero.src), caption: destination.hero.alt, width: destination.hero.width, height: destination.hero.height }],
      geo: { "@type": "GeoCoordinates", latitude: destination.coordinates.lat, longitude: destination.coordinates.lng },
      address: { "@type": "PostalAddress", addressRegion: "TX", addressLocality: destination.nearestTown, addressCountry: "US" },
      containedInPlace: { "@type": "State", name: "Texas" },
      touristType: destination.category,
      isAccessibleForFree: !/fee|ticket|admission|entry/i.test(destination.entryNote),
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
        { "@type": "ListItem", position: 3, name: destination.category.replace(/-/g, " "), item: `${siteUrl}/explore/${destination.category}` },
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
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [attractionSchema, breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><h1 className="font-display text-3xl">We haven't mapped that one yet</h1></Container>,
  component: DestinationPage,
});

function DestinationPage() {
  const { slug } = Route.useParams();
  const { graph } = Route.useLoaderData();
  const { data: destination } = useSuspenseQuery(destinationQuery(slug));
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const { data: related } = useSuspenseQuery(articlesQuery(destination ? { category: destination.category, limit: 3 } : { limit: 3 }));
  if (!destination) return null;
  const region = regions.find((item) => item.id === destination.region);
  const categoryName = destination.category.replace(/-/g, " ");
  const excludedEntityIds = [`${destination.category}:${destination.slug}`, `attraction:${destination.slug}`];
  const surfacePolicy = INTERNAL_LINK_POLICIES.destination;
  const destinationPolicy = policyForSurface('destination', { excludedEntityIds, region: destination.region });
  let remainingLinks = surfacePolicy.pageBudget;
  const limit = (requested: number) => Math.max(0, Math.min(requested, surfacePolicy.blockBudget, remainingLinks));
  const spend = (requested: number) => { const value = limit(requested); remainingLinks -= value; return value; };

  return <>
    <Container className="pt-24">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-foreground">Home</Link></li><li aria-hidden="true">/</li>
          <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden="true">/</li>
          <li><Link to="/explore/$category" params={{ category: destination.category }} className="capitalize hover:text-foreground">{categoryName}</Link></li><li aria-hidden="true">/</li>
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
      </Container>
    </section>

    <Container className="grid gap-12 py-14 lg:grid-cols-[1.6fr_1fr]">
      <div className="editorial-body max-w-2xl">
        <section aria-labelledby="what-is-it">
          <h2 id="what-is-it" className="font-display text-2xl">What is {destination.name}?</h2>
          {destination.body.map((paragraph) => <p key={paragraph} className="mt-5"><AutoEntityLinks text={paragraph} entities={graph} maxLinks={spend(4)} policy={destinationPolicy} /></p>)}
        </section>
        <section aria-labelledby="plan-your-visit" className="mt-10">
          <h2 id="plan-your-visit" className="font-display text-2xl">Plan your visit</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div><dt className="eyebrow text-muted-foreground">Where is it?</dt><dd className="mt-1">Near <AutoEntityLinks text={destination.nearestTown} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} />, Texas.</dd></div>
            <div><dt className="eyebrow text-muted-foreground">Best time to go</dt><dd className="mt-1">{destination.bestSeason}</dd></div>
            <div className="sm:col-span-2"><dt className="eyebrow text-muted-foreground">Entry and reservations</dt><dd className="mt-1">{destination.entryNote}</dd></div>
          </dl>
        </section>
        <h2 className="mt-10 font-display text-2xl">Don't miss</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">{destination.highlights.map((highlight) => <li key={highlight}><AutoEntityLinks text={highlight} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} /></li>)}</ul>
      </div>
      <aside className="space-y-6">
        <dl className="border border-border p-6 text-sm">
          <dt className="eyebrow text-muted-foreground">Nearest town</dt><dd className="mt-1"><AutoEntityLinks text={destination.nearestTown} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} /></dd>
          <dt className="eyebrow mt-4 text-muted-foreground">Best season</dt><dd className="mt-1">{destination.bestSeason}</dd>
          <dt className="eyebrow mt-4 text-muted-foreground">Entry</dt><dd className="mt-1">{destination.entryNote}</dd>
        </dl>
        <MapPreview markers={[{ id: destination.id, label: destination.name, point: destination.coordinates }]} directionsLabel={`${destination.name}, Texas`} />
      </aside>
    </Container>

    <Section tone="surface"><Container><SectionHeader eyebrow="Nearby reading" title="Stories from this corner of Texas" /><ul className="mt-10 grid gap-10 sm:grid-cols-3">{related.map((article) => <li key={article.id}><ArticleCard article={article} size="compact" /></li>)}</ul></Container></Section>
  </>;
}
