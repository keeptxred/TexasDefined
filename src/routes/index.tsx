import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { EventCard } from "@/components/editorial/EventCard";
import { FeatureHero } from "@/components/editorial/FeatureHero";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { CollectionStrip } from "@/components/commerce/CollectionStrip";
import { Container } from "@/components/layout/Container";
import { texasDefinedBrand } from "@/brand/texasdefined";
import {
  articlesQuery,
  categoriesQuery,
  collectionsQuery,
  destinationsQuery,
  eventsQuery,
  guidesQuery,
  regionsQuery,
} from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "A premium Texas lifestyle publication: lakes and cypress bayous, state parks, two-lane road trips, barbecue worth the wait, small towns, history, home and garden, and Texas-made goods.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: "Discover, Explore & Live Texas",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/")],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: texasDefinedBrand.identity.name,
              url: `https://${texasDefinedBrand.identity.domain}`,
              slogan: texasDefinedBrand.identity.tagline,
            },
            {
              "@type": "WebSite",
              name: texasDefinedBrand.identity.name,
              url: `https://${texasDefinedBrand.identity.domain}`,
              description,
            },
          ],
        }),
      },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ featured: true, limit: 5 })),
      context.queryClient.ensureQueryData(articlesQuery({ limit: 12 })),
      context.queryClient.ensureQueryData(destinationsQuery({})),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "lakes-rivers" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "state-parks" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "road-trips" })),
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(collectionsQuery()),
      context.queryClient.ensureQueryData(guidesQuery()),
      context.queryClient.ensureQueryData(eventsQuery({ limit: 4 })),
    ]);
  },

  component: HomePage,
});

function HomePage() {
  const brand = useBrand();
  const { data: featured } = useSuspenseQuery(articlesQuery({ featured: true, limit: 5 }));
  const { data: latest } = useSuspenseQuery(articlesQuery({ limit: 12 }));
  const { data: destinations } = useSuspenseQuery(destinationsQuery({}));
  const { data: lakes } = useSuspenseQuery(destinationsQuery({ category: "lakes-rivers" }));
  const { data: parks } = useSuspenseQuery(destinationsQuery({ category: "state-parks" }));
  const { data: roadTrips } = useSuspenseQuery(destinationsQuery({ category: "road-trips" }));
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const { data: collections } = useSuspenseQuery(collectionsQuery());
  const { data: guides } = useSuspenseQuery(guidesQuery());
  const { data: events } = useSuspenseQuery(eventsQuery({ limit: 4 }));

  const hero = featured[0];
  const regionName = (id: string) => regions.find((region) => region.id === id)?.name;
  const bbq = latest.find((article) => article.category === "food-bbq");
  const wildlife = latest.find((article) => article.category === "outdoors");
  const secondary = featured.slice(1, 4);
  const featuredDestinations = destinations.filter((item) => item.featured).slice(0, 4);
  const weekend = destinations.slice(0, 3);
  const hiddenGems = destinations.slice(3, 6);


  return (
    <>
      {hero && (
        <FeatureHero
          eyebrow={brand.identity.tagline}
          title={hero.title}
          dek={hero.dek}
          image={hero.hero}
          to="/article/$slug"
          params={{ slug: hero.slug }}
          meta={`${hero.readingMinutes} min read`}
        />
      )}

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Featured"
            title="The stories defining Texas right now"
            actionLabel={brand.copy.viewAll}
            actionTo="/explore"
          />
          <ul className="mt-10 grid gap-12 md:grid-cols-3">
            {secondary.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader
            eyebrow="Featured destinations"
            title="Where we'd point you first"
            description="Four places that answer the question better than any brochure could."
            actionLabel={brand.copy.viewAll}
            actionTo="/explore"
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((destination) => (
              <li key={destination.id}>
                <DestinationCard
                  destination={destination}
                  tone="overlay"
                  regionLabel={regionName(destination.region)}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>



      <Section tone="surface">
        <Container>
          <SectionHeader
            eyebrow="Explore"
            title="Pick a direction"
            description="Seven regions, eighty-nine state parks, and more two-lane road than any other state. Start where your weekend is."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  to="/explore/$category"
                  params={{ category: category.slug }}
                  className="group relative block overflow-hidden"
                >
                  {category.image && (
                    <img
                      src={category.image.src}
                      alt={category.image.alt}
                      width={category.image.width}
                      height={category.image.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[5/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-ink-foreground">
                    <p className="eyebrow opacity-80">{category.eyebrow}</p>
                    <h3 className="mt-1 font-display text-2xl">{category.name}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Weekend getaways"
            title="Three places worth the drive"
            actionLabel={brand.copy.viewAll}
            actionTo="/explore/road-trips"
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {weekend.map((destination) => (
              <li key={destination.id}>
                <DestinationCard
                  destination={destination}
                  tone="overlay"
                  regionLabel={regionName(destination.region)}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {bbq && (
        <Section tone="ink">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <img
                src={bbq.hero.src}
                alt={bbq.hero.alt}
                width={bbq.hero.width}
                height={bbq.hero.height}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div>
                <p className="eyebrow text-ink-foreground/70">Food &amp; barbecue</p>
                <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                  {bbq.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-foreground/85">{bbq.dek}</p>
                <Link
                  to="/article/$slug"
                  params={{ slug: bbq.slug }}
                  className="eyebrow mt-7 inline-block border-b-2 border-ink-foreground pb-1"
                >
                  {brand.copy.readMore}
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      )}


      <Section>
        <Container>
          <SectionHeader eyebrow="Hidden gems" title="Places the highway skipped" />
          <ul className="mt-10 grid gap-10 sm:grid-cols-3">
            {hiddenGems.map((destination) => (
              <li key={destination.id}>
                <DestinationCard
                  destination={destination}
                  regionLabel={regionName(destination.region)}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {wildlife && (
        <Section tone="surface">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
              <div>
                <p className="eyebrow text-primary">Wild Texas</p>
                <h2 className="mt-3 font-display text-4xl leading-tight">{wildlife.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {wildlife.dek}
                </p>
                <Link
                  to="/article/$slug"
                  params={{ slug: wildlife.slug }}
                  className="eyebrow mt-7 inline-block border-b-2 border-primary pb-1 text-primary"
                >
                  {brand.copy.readMore}
                </Link>
              </div>
              <img
                src={wildlife.hero.src}
                alt={wildlife.hero.alt}
                width={wildlife.hero.width}
                height={wildlife.hero.height}
                loading="lazy"
                decoding="async"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
          </Container>
        </Section>
      )}

      {brand.features.events && (
        <Section>
          <Container>
            <SectionHeader
              eyebrow="Seasonal"
              title="On the Texas calendar"
              actionLabel={brand.copy.viewAll}
              actionTo="/events"
            />
            <div className="mt-8 grid gap-x-12 md:grid-cols-2">
              {events.map((event) => (
                <EventCard key={event.id} event={event} regionLabel={regionName(event.region)} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {brand.features.guides && (
        <Section tone="surface">
          <Container>
            <SectionHeader
              eyebrow="Guides &amp; tools"
              title="Practical Texas"
              actionLabel={brand.copy.viewAll}
              actionTo="/guides"
            />
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {guides.slice(0, 3).map((guide) => (
                <li key={guide.id}>
                  <GuideCard guide={guide} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {brand.features.shop && (
        <Section>
          <Container>
            <SectionHeader
              eyebrow="Shop"
              title="Made here, built to last"
              actionLabel={brand.copy.viewAll}
              actionTo="/shop"
            />
            <div className="mt-10">
              <CollectionStrip collections={collections} />
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <SectionHeader eyebrow="Latest" title="Everything new" />
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {latest.slice(0, 8).map((article) => (
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
