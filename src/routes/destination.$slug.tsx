import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { MapPreview } from "@/components/editorial/MapPreview";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, destinationQuery, regionsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/destination/$slug")({
  loader: async ({ context, params }) => {
    const destination = await context.queryClient.ensureQueryData(destinationQuery(params.slug));
    if (!destination) throw notFound();
    await Promise.all([
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(
        articlesQuery({ category: destination.category, limit: 3 }),
      ),
    ]);
    return { destination };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { destination } = loaderData;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: destination.name,
        description: destination.summary,
      }),
      links: [canonicalLink(texasDefinedBrand, `/destination/${params.slug}`)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: destination.name,
            description: destination.summary,
            geo: {
              "@type": "GeoCoordinates",
              latitude: destination.coordinates.lat,
              longitude: destination.coordinates.lng,
            },
            address: {
              "@type": "PostalAddress",
              addressRegion: "TX",
              addressLocality: destination.nearestTown,
              addressCountry: "US",
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24">
      <h1 className="font-display text-3xl">We haven't mapped that one yet</h1>
    </Container>
  ),
  component: DestinationPage,
});

function DestinationPage() {
  const { slug } = Route.useParams();
  const { data: destination } = useSuspenseQuery(destinationQuery(slug));
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const { data: related } = useSuspenseQuery(
    articlesQuery(destination ? { category: destination.category, limit: 3 } : { limit: 3 }),
  );

  if (!destination) return null;
  const region = regions.find((item) => item.id === destination.region);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={destination.hero.src}
          alt={destination.hero.alt}
          width={destination.hero.width}
          height={destination.hero.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/20" />
        <Container className="relative flex min-h-[58vh] flex-col justify-end pb-14 pt-32">
          <p className="eyebrow text-ink-foreground/80">{region?.name ?? "Texas"}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">
            {destination.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-foreground/85">
            {destination.summary}
          </p>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="editorial-body max-w-2xl">
          {destination.body.map((paragraph) => (
            <p key={paragraph} className="mt-5 first:mt-0">
              {paragraph}
            </p>
          ))}
          <h2 className="mt-10 font-display text-2xl">Don't miss</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
            {destination.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <aside className="space-y-6">
          <dl className="border border-border p-6 text-sm">
            <dt className="eyebrow text-muted-foreground">Nearest town</dt>
            <dd className="mt-1">{destination.nearestTown}</dd>
            <dt className="eyebrow mt-4 text-muted-foreground">Best season</dt>
            <dd className="mt-1">{destination.bestSeason}</dd>
            <dt className="eyebrow mt-4 text-muted-foreground">Entry</dt>
            <dd className="mt-1">{destination.entryNote}</dd>
          </dl>
          <MapPreview
            markers={[
              { id: destination.id, label: destination.name, point: destination.coordinates },
            ]}
            directionsLabel={`${destination.name}, Texas`}
          />
        </aside>
      </Container>

      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="Nearby reading" title="Stories from this corner of Texas" />
          <ul className="mt-10 grid gap-10 sm:grid-cols-3">
            {related.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} size="compact" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
