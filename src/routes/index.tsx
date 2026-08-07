import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";

import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { EventCard } from "@/components/editorial/EventCard";
import { FeatureHero } from "@/components/editorial/FeatureHero";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import {
  articlesQuery,
  collectionsQuery,
  destinationsQuery,
  eventsQuery,
  guidesQuery,
  regionsQuery,
} from "@/data/queries";
import { formatReadingTime } from "@/domain/utils/format";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Stories, places and practical advice for making the most of life in Texas — from two-lane roads and swimming holes to barbecue, homes and small-town weekends.";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const [featured, latest, destinations, roadTrips, regions, guides, events] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ featured: true, limit: 5 })),
      context.queryClient.ensureQueryData(articlesQuery({ limit: 12 })),
      context.queryClient.ensureQueryData(destinationsQuery({})),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "road-trips" })),
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(guidesQuery()),
      context.queryClient.ensureQueryData(eventsQuery({ limit: 4 })),
    ]);
    return { featured, latest, destinations, roadTrips, regions, guides, events };
  },
  head: ({ loaderData }) => {
    const featured = loaderData?.featured ?? [];
    const destinations = loaderData?.destinations ?? [];
    const homepageDestinations = destinations.some((item) => item.featured)
      ? destinations.filter((item) => item.featured).slice(0, 4)
      : destinations.slice(0, 4);
    const curatedItems = [
      ...featured.slice(0, 4).map((article) => ({
        "@type": "Article",
        name: article.title,
        url: `${siteUrl}/article/${article.slug}`,
        image: absoluteUrl(texasDefinedBrand, article.hero.src),
      })),
      ...homepageDestinations.map((destination) => ({
        "@type": "TouristAttraction",
        name: destination.name,
        description: destination.summary,
        url: `${siteUrl}/destination/${destination.slug}`,
        image: absoluteUrl(texasDefinedBrand, destination.hero.src),
        sameAs: destination.officialUrl,
        dateModified: destination.sourceCheckedAt,
        provider: destination.managingAuthority ? { "@type": "Organization", name: destination.managingAuthority } : undefined,
      })),
    ];
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${siteUrl}/#homepage`,
          url: `${siteUrl}/`,
          name: "The Places, Stories & Life of Texas",
          description,
          isPartOf: { "@id": `${siteUrl}/#website` },
          about: { "@id": `${siteUrl}/#organization` },
          mainEntity: { "@id": `${siteUrl}/#editorial-picks` },
        },
        {
          "@type": "ItemList",
          "@id": `${siteUrl}/#editorial-picks`,
          name: "Stories and places worth knowing",
          numberOfItems: curatedItems.length,
          itemListElement: curatedItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item,
          })),
        },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: "The Places, Stories & Life of Texas",
        description,
        canonicalPath: "/",
      }),
      links: [canonicalLink(texasDefinedBrand, "/")],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
    };
  },
  component: HomePage,
});

function HomePage() {
  const brand = useBrand();
  const { data: featured } = useSuspenseQuery(articlesQuery({ featured: true, limit: 5 }));
  const { data: latest } = useSuspenseQuery(articlesQuery({ limit: 12 }));
  const { data: destinations } = useSuspenseQuery(destinationsQuery({}));
  const { data: roadTrips } = useSuspenseQuery(destinationsQuery({ category: "road-trips" }));
  const { data: regions } = useSuspenseQuery(regionsQuery());
  
  const { data: guides } = useSuspenseQuery(guidesQuery());
  const { data: events } = useSuspenseQuery(eventsQuery({ limit: 4 }));

  const hero = featured[0];
  const editorPicks = featured.slice(1, 4);
  const explicitlyFeatured = destinations.filter((item) => item.featured);
  const featuredDestinations = (explicitlyFeatured.length ? explicitlyFeatured : destinations).slice(0, 4);
  const featuredIds = new Set(featuredDestinations.map((item) => item.id));
  const hiddenGems = destinations.filter((item) => !featuredIds.has(item.id)).slice(0, 3);
  const worthTheDrive = roadTrips[0] ?? destinations[0];
  const regionName = (id: string) => regions.find((region) => region.id === id)?.name;

  return (
    <>
      {hero && (
        <FeatureHero variant="split" eyebrow="The cover story" title={hero.title} dek={hero.dek} image={hero.hero} to="/article/$slug" params={{ slug: hero.slug }} meta={formatReadingTime(hero.readingMinutes)} />
      )}

      {featuredDestinations.length > 0 && <Section><Container><SectionHeader eyebrow="Start here" title="Four places we'd send a friend" description="No endless list. Just four places that explain this state better than any brochure could." actionLabel="Find more places" actionTo="/explore" /><ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featuredDestinations.map((destination) => <li key={destination.id}><DestinationCard destination={destination} tone="overlay" regionLabel={regionName(destination.region)} /></li>)}</ul></Container></Section>}

      {editorPicks.length > 0 && <Section tone="surface"><Container><SectionHeader eyebrow="Editor's picks" title="Stories worth slowing down for" description="The pieces we'd leave open on the kitchen table for someone else to read." /><div className="mt-12 grid gap-10 lg:grid-cols-[1.45fr_1fr]"><ArticleCard article={editorPicks[0]} size="feature" /><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">{editorPicks.slice(1).map((article) => <ArticleCard key={article.id} article={article} size="compact" />)}</div></div></Container></Section>}

      {brand.features.events && events.length > 0 && <Section><Container><SectionHeader eyebrow="This weekend" title="Good reasons to leave the house" description="Fairs, festivals, rodeos and the kind of local plans that make a Saturday feel longer." actionLabel="Plan the weekend" actionTo="/events" /><div className="mt-8 grid gap-x-12 md:grid-cols-2">{events.map((event) => <EventCard key={event.id} event={event} regionLabel={regionName(event.region)} />)}</div></Container></Section>}

      {worthTheDrive && <Section tone="surface"><Container><div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]"><img src={worthTheDrive.hero.src} alt={worthTheDrive.hero.alt} width={worthTheDrive.hero.width} height={worthTheDrive.hero.height} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" /><div><p className="eyebrow text-primary">Worth the drive</p><h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{worthTheDrive.name}</h2><p className="mt-5 text-base leading-7 text-muted-foreground">{worthTheDrive.summary}</p><Link to="/destination/$slug" params={{ slug: worthTheDrive.slug }} className="eyebrow mt-7 inline-block border-b-2 border-primary pb-1 text-primary">Plan the trip</Link></div></div></Container></Section>}

      {hiddenGems.length > 0 && <Section><Container><SectionHeader eyebrow="Hidden Texas" title="Places the highway skipped" description="Quieter corners, overlooked stops and places that reward taking the long way." /><ul className="mt-12 grid gap-10 md:grid-cols-[1.15fr_0.85fr]"><li className="md:row-span-2"><DestinationCard destination={hiddenGems[0]} tone="overlay" regionLabel={regionName(hiddenGems[0].region)} /></li>{hiddenGems.slice(1).map((destination) => <li key={destination.id}><DestinationCard destination={destination} regionLabel={regionName(destination.region)} /></li>)}</ul></Container></Section>}

      {brand.features.guides && guides.length > 0 && <Section tone="surface"><Container><SectionHeader eyebrow="Front porch" title="The practical side of living here" description="Homes, moving, money and the everyday questions that come with putting down roots." actionLabel="Find a helpful guide" actionTo="/guides" /><ul className="mt-10 grid gap-6 md:grid-cols-3">{guides.slice(0, 3).map((guide) => <li key={guide.id}><GuideCard guide={guide} /></li>)}</ul></Container></Section>}

      

      <Section tone="surface"><Container><SectionHeader eyebrow="New this week" title="The latest from Texas Defined" description="Fresh stories, useful guides and another reason to keep exploring." /><ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{latest.slice(0, 8).map((article) => <li key={article.id}><ArticleCard article={article} size="compact" /></li>)}</ul></Container></Section>
    </>
  );
}
