import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { homepageFaqs } from "@/content/homepage";
import { articlesQuery, destinationsQuery, eventsQuery, guidesQuery, regionsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const pageTitle = "Texas Travel, Culture & Practical Living Guides";
const description = "Stories, places and practical advice for making the most of life in Texas — from two-lane roads and swimming holes to barbecue, homes and small-town weekends.";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const HOMEPAGE_DESTINATION_LIMIT = 24;
const HOMEPAGE_ROAD_TRIP_LIMIT = 8;

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const [featured, latest, destinations, roadTrips, regions, guides, events] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ featured: true, limit: 5 })),
      context.queryClient.ensureQueryData(articlesQuery({ limit: 16 })),
      context.queryClient.ensureQueryData(destinationsQuery({ limit: HOMEPAGE_DESTINATION_LIMIT })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "road-trips", limit: HOMEPAGE_ROAD_TRIP_LIMIT })),
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(guidesQuery()),
      context.queryClient.ensureQueryData(eventsQuery({ limit: 4 })),
    ]);
    return { featured, latest, destinations, roadTrips, regions, guides, events };
  },
  head: ({ loaderData }) => {
    const featured = loaderData?.featured ?? [];
    const destinations = loaderData?.destinations ?? [];
    const heroImage = featured[0]?.hero?.src;
    const homepageDestinations = destinations.some((item) => item.featured) ? destinations.filter((item) => item.featured).slice(0, 4) : destinations.slice(0, 4);
    const curatedItems = [
      ...featured.slice(0, 4).map((article) => ({ "@type": "Article", name: article.title, url: `${siteUrl}/article/${article.slug}`, image: absoluteUrl(texasDefinedBrand, article.hero.src) })),
      ...homepageDestinations.map((destination) => ({ "@type": "TouristAttraction", name: destination.name, description: destination.summary, url: `${siteUrl}/destination/${destination.slug}`, image: absoluteUrl(texasDefinedBrand, destination.hero.src), sameAs: destination.officialUrl, dateModified: destination.sourceCheckedAt, provider: destination.managingAuthority ? { "@type": "Organization", name: destination.managingAuthority } : undefined })),
    ];
    const structuredData = { "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${siteUrl}/#homepage`, url: `${siteUrl}/`, name: pageTitle, description, isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${siteUrl}/#organization` }, mainEntity: { "@id": `${siteUrl}/#editorial-picks` }, hasPart: [{ "@id": `${siteUrl}/#editorial-picks` }, { "@id": `${siteUrl}/#faq` }] },
      { "@type": "ItemList", "@id": `${siteUrl}/#editorial-picks`, name: "Stories and places worth knowing", numberOfItems: curatedItems.length, itemListElement: curatedItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, item })) },
      { "@type": "FAQPage", "@id": `${siteUrl}/#faq`, mainEntity: homepageFaqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ] };
    return {
      meta: buildMeta(texasDefinedBrand, { title: pageTitle, description, canonicalPath: "/" }),
      links: [
        canonicalLink(texasDefinedBrand, "/"),
        ...(heroImage ? [{ rel: "preload", as: "image", href: absoluteUrl(texasDefinedBrand, heroImage), fetchPriority: "high" as const }] : []),
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
    };
  },
});
